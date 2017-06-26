var ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events'

function getData(comedian, cities) {
    var cities = $('.cities').val();
    var getJson = {
        apikey: '6m1NAjVcdP4FZrAj7JShG7KDuGN6FlAN',
        keyword: comedian,
        city: cities,
    }

    $.getJSON(ticketmasterUrl, getJson, saveEvents)
}


function saveEvents(data) {
    if (data["_embedded"]) {
        state.events = data["_embedded"].events;
    } else {
        console.log("be lazy")
    }
    render();
}

/* input.cities has our city text   */
/*      _embedded.events.place.city.name     */
/*      state.events[0]._embedded.venues[0].city.name     */


// function findMatch(data) {
//     var eventData = data["_embedded"];
//     if (eventData === undefined) {
//         console.log("search more");
//     } else {
//         console.log("event:", eventData);
//     }
// }



//Complete gathers up the arrays 
function complete() {
    var comedians =
        state.genres.map(function (x) {
            return x.comedians;
        })
    //This will combine every array into a single array
    //Refer to this repl https://repl.it/I0hd/0
    return Array.prototype.concat.apply([], comedians);
}



function renderRelatedComedians(comedians) {
    comedians = comedians.join(", ")
        .split("  ");
    $('.sameGenre').html(comedians);
}

function onComedianSelected(e, selected) {
    var relatedComedians = state.getRelatedComedians(selected.item.value)
    //pool is a pool of comedians 
    state.getComedianPool = [];
    state.getComedianPool.push(selected.item.value);
    state.getComedianPool = state.getComedianPool.concat(relatedComedians);


    renderRelatedComedians(relatedComedians);
}



function render() {
    $('.searchTerm').autocomplete({
        source: complete(),
        select: onComedianSelected
    })
    $('#formData').submit(function (e) {
        e.preventDefault();
        getData(state.getComedianPool.shift());
    });
    if (state.events) {
        state.events.map(renderTemplate);
    }
}


function renderEvent(x) {
    return x.name + "<br/>" + " ";
}

function renderEvents(events) {
    return events.map(renderEvent)
}

function renderVenue(x) {
    return x._embedded.venues[0].name + "<br/>" + " ";
}


function renderVenues(events) {
    return events.map(renderVenue)
}

function renderTemplate(event) {
    return $('.venues').html("Event Name: " + renderEvent(event) + "Venue: " + renderVenue(event));
}


function getRandomColor() {
    var letters = '123456789ABCDEF'
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color;
}

function setRandomColor() {
    $('#colorpad').css('background-color', getRandomColor());
}

setRandomColor();


render();