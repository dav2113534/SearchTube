var ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events'

function getData(comedian) {
    var getJson = {
        apikey: '6m1NAjVcdP4FZrAj7JShG7KDuGN6FlAN',
        keyword: comedian,
    }
    console.log(comedian)

    $.getJSON(ticketmasterUrl, getJson, findMatch, comedian)
}




function findMatch(data) {
    console.log(data)
    var next = state.getComedianPool[0] + 1
    if (data !== state.length - 1) {
        return next
    }
}

// Your goal is to display list of related comedians(based on genre) 
//for comedian they have selected. If you complete it go ahead 
//and try to call Ticketmaster api with selected comedian.


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


function getSearchTerm() {
    return $('.searchTerm').val();

}


function renderRelatedComedians(comedians) {
    comedians = comedians.join(", ")
        .split("  ");
    $('.sameGenre').html(comedians);
}

function getDataForComedian(comedian) {
    return function () {
        console.log(comedian)
        return getData(comedian)
    };
}
// 
function render() {
    $('.searchTerm').autocomplete({
        source: complete(),
        select: function (e, selected) {
            var relatedComedians = state.getRelatedComedians(selected.item.value)
            //pool is a pool of functions 
            state.getComedianPool = [];
            state.getComedianPool.push(getDataForComedian(selected.item.value));
            state.getComedianPool = state.getComedianPool.concat(
                relatedComedians.map(function (related) {
                    return getDataForComedian(related)
                }));


            renderRelatedComedians(relatedComedians);
            // console.log(state.getRelatedComedians(selected.item.value));
        }
    })
}

render();