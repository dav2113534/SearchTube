var ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events'

function getData(comedian, zipCode) {
    var getJson = {
        apikey: '6m1NAjVcdP4FZrAj7JShG7KDuGN6FlAN',
        keyword: comedian,
        postalCode: zipCode,
        unit: "miles"

    }

    $.getJSON(ticketmasterUrl, getJson, findMatch)
}

function displayData(data) {
    if (data._embedded) {
        var result = data._embedded.map(function (x) {
            var events = x.events[0]
        }).join('');
    } else {
        "<p> No Events </p>";
    }
    $('.events').html(result);
}

function findMatch(data) {
    var eventData = data["_embedded"];
    if (eventData === undefined) {
        console.log("search more");
    } else {
        console.log("event:", eventData);
    }
}

//render events with the api 

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
    //pool is a pool of functions 
    state.getComedianPool = [];
    state.getComedianPool.push(selected.item.value);
    state.getComedianPool = state.getComedianPool.concat(relatedComedians);


    renderRelatedComedians(relatedComedians);
    // console.log(state.getRelatedComedians(selected.item.value));
}
// 
function render() {
    $('.searchTerm').autocomplete({
        source: complete(),
        select: onComedianSelected
    })
    $('#formData').submit(function (e) {
        e.preventDefault();
        getData(state.getComedianPool.shift());
    });
    // $('#formData').submit(function (e) {
    //     e.preventDefault();
    //     // getData(displayData)
    //     console.log("Im not doing anything")
    // })
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