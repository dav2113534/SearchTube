var ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events'

function getData(comedian) {
    var cities = $('.cities').val();
    var options = {
        apikey: '6RHHrGQF6fP9uLmG6AHEdjhkORlIzKzM',
        keyword: comedian,
        city: cities,
        classificationName: "Comedy",
        radius: "100",
        unit: "miles",
        includeLicensedContent: "yes"
    }

    return Promise.resolve($.getJSON(ticketmasterUrl, options));
}


function saveEvents(data) {
    if (data["_embedded"]) {
        state.events = data["_embedded"].events;
    } else {
        state.currentComedianIndex += 1
        var nextComedian = state.getComedianPool[state.currentComedianIndex];
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
    var message = "<p class='recom'> Here are some recommendations! </p>"
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
    state.getComedianPool.push(selected.item.value)
    state.getComedianPool = state.getComedianPool.concat(relatedComedians);


    renderRelatedComedians(relatedComedians);
}

function load() {
    $('#loader').show();
}

function render() {
    if (state.getComedianPool) {
        $('.searchTerm').val(state.getComedianPool[state.currentComedianIndex]);
        renderRelatedComedians(state.getComedianPool.slice(state.currentComedianIndex+1));
    } 
    renderRelatedComedians
    //makes autocomplete possible 
    $('.searchTerm').autocomplete({
        source: complete(),
        select: onComedianSelected
    })
    $('#formData').submit(function (e) {
        const currentComedian = state.getComedianPool[0]; 
        state.currentComedianIndex = 0;
        $('h1').hide();
        e.preventDefault();
        load();
        getData(currentComedian).then(saveEvents); 
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

function renderMap(x) {
    const lat = x._embedded.venues[0].location.latitude
    const long = x._embedded.venues[0].location.longitude
    const coordinates = lat + ',' + long;
    return '<img src="https://maps.google.com/maps/api/staticmap?center=' +
        coordinates +
        '&zoom=12&size=400x300&sensor=false" >'
}


function renderEvents(events) {
    return events.map(renderEvent)
}

function renderVenue(x) {
    return x._embedded.venues[0].name + "<br/>" + " ";
}

function renderPrices(x){
    return x.priceRanges[0].min + "<br/>" + " " +
    "Max Ticket Price: $" + x.priceRanges[0].max; 
}

function renderVenues(events) {
    return events.map(renderVenue)
}

function renderDate(x) {
    return x.dates.start.localDate + "<br/>" + " ";
}

function renderTemplate(event) {
    $('#loader').hide();
    $('.venues').html("Event Name: " + renderEvent(event) + "Venue: " + renderVenue(event) + " City: " + renderCity(event) +
        "Event Date: " + renderDate(event) + "Min Ticket Price: $" + renderPrices(event));
    $('.venues')[0].scrollIntoView();
    $('#map').html(renderMap(state.events[0]))
}

render();