var ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events'

function getData(comedian) {
    var cities = $('.cities').val();
    var options = {
        apikey: '6RHHrGQF6fP9uLmG6AHEdjhkORlIzKzM',
        keyword: comedian,
        city: cities,
        classificationName: "Comedy",
        radius: "40",
        unit: "miles",
    }

    return Promise.resolve($.getJSON(ticketmasterUrl, options));
}


function saveEvents(data) {
    if (data["_embedded"]) {
        state.events = data["_embedded"].events;
        // } else {
        //     state.currentComedianIndex += 1
        //     var nextComedian = state.getComedianPool[state.currentComedianIndex];
        //     getData(nextComedian).then(saveEvents);
    } else {
        noMatch();
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
    comedians = comedians.map(function (x, index) {
        return `<a data-index=${index} href=#> ${x} </a>`;

    }).join(", ")
    //e.target
    // comedians = comedians.join(", ")
    //     .split("  ");
    $('.sameGenre').html(comedians);
    $('.description').html(sameGenre);
}

function clickComedians() {
    $('a').click(function (x) {
        console.log(x.findIndex());
    })
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

function noMatch() {
    if (state.events === undefined) {
        const noEvents = "<p class='noEvent'>Sorry No Events At The Moment, But Check This Event Out!</p>"
        $('.venues').html(noEvents);
        $('#loader').hide();
        const altSearch = $('.cities').val();
        getData(altSearch).then(saveEvents)
    }
}

function render() {
    if ($('.searchTerm').val() !== undefined) {

        $('#formData').submit(function (e) {
            const newComedian = $('.searchTerm').val();
            $('h1').hide();
            e.preventDefault();
            load();
            getData(newComedian).then(saveEvents);
            $('.noEvent').hide();
        });
        $('.searchTerm').autocomplete({
            source: complete(),
            select: onComedianSelected
        })
        //      if (state.getComedianPool) {
        //     $('.searchTerm').val(state.getComedianPool[state.currentComedianIndex]);
        //     renderRelatedComedians(state.getComedianPool.slice(state.currentComedianIndex + 1));
        // }
        // renderRelatedComedians
        if (state.events) {
            state.events.map(renderTemplate);
        }
    }
}

function renderEvent(x) {
    var url = state.events[0]._embedded.attractions[0].url;
    return x.name.link(url) + "<br/>" + " ";
}

function renderCity(x) {
    return x._embedded.venues[0].city.name + "<br/>" + " ";
}

var leafletMap = null;

function renderMap(x) {
    const lat = parseFloat(x._embedded.venues[0].location.latitude);
    const lng = parseFloat(x._embedded.venues[0].location.longitude);
    const venueName = x._embedded.venues[0].name;

    // Remove old map instance if it exists
    if (leafletMap) {
        leafletMap.remove();
    }

    leafletMap = L.map('mapid').setView([lat, lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(leafletMap);
    L.marker([lat, lng]).addTo(leafletMap)
        .bindPopup(venueName)
        .openPopup();

    setTimeout(function () {
        leafletMap.invalidateSize();
    }, 100);
}


function renderEvents(events) {
    return events.map(renderEvent)
}

function renderVenue(x) {
    return x._embedded.venues[0].name + "<br/>" + " ";
}

// function renderPrices(x) {
//     return x.priceRanges[0].min + "<br/>" + " " +
//         "Max Ticket Price: $" + x.priceRanges[0].max;
// }

function renderVenues(events) {
    return events.map(renderVenue)
}

function renderDate(x) {
    return x.dates.start.localDate + "<br/>" + " ";
}

function renderTemplate(event) {
    $('#loader').hide();
    $('.venues').html("Event Name: " + renderEvent(event) + "Venue: " + renderVenue(event) + " City: " + renderCity(event) +
        "Event Date: " + renderDate(event)) /*+ "Min Ticket Price: $" + renderPrices(event)*/ ;
    $('.venues')[0].scrollIntoView();
    renderMap(state.events[0]);
}

render();