var ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events'

function getData(comedian) {
    var cities = $('.cities').val();
    var options = {
        apikey: '6m1NAjVcdP4FZrAj7JShG7KDuGN6FlAN',
        keyword: comedian,
        city: cities,
    }

    return Promise.resolve($.getJSON(ticketmasterUrl, options));
}


function saveEvents(data) {
    if (data["_embedded"]) {
        state.events = data["_embedded"].events;
    } else {
        var nextComedian = state.getComedianPool.shift()
        getData(nextComedian).then(saveEvents);
    }
    render();
}



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

function sameGenre() {
    var message = "<p> Here is a list of similar comedians </p>"
    return message;
}

function renderRelatedComedians(comedians) {
    comedians = comedians.join(", ")
        .split("  ");
    $('.sameGenre').html(comedians);
    $('.description').html(sameGenre);

}

function onComedianSelected(e, selected) {
    var relatedComedians = state.getRelatedComedians(selected.item.value)
    //pool is a pool of comedians 
    state.getComedianPool = [];
    state.getComedianPool.push(selected.item.value);
    state.getComedianPool = state.getComedianPool.concat(relatedComedians);


    renderRelatedComedians(relatedComedians);
}

function load() {
    var search = '<p> Searching for events!! </p>';
    $('.venues').html(search);
}

function render() {
    //makes autocomplete possible 
    $('.searchTerm').autocomplete({
        source: complete(),
        select: onComedianSelected
    })
    $('#formData').submit(function (e) {
        $('h1').hide(); 
        e.preventDefault();
        load();
        getData(state.getComedianPool.shift()).then(saveEvents);
    });
    if (state.events) {
        state.events.map(renderTemplate);
    }
}




function renderEvent(x) {
    var url = state.events[0]._embedded.attractions[0].url;
    return x.name.link(url) + "<br/>" + " ";
}

function renderCity(x) {
    return x._embedded.venues[0].city.name + "<br/>" + " ";
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
    return $('.venues').html("Event Name: " + renderEvent(event) + "Venue: " + renderVenue(event) + " City: " + renderCity(event));
}

render();