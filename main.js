// var ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/'

// function getData() {
//     var getJson = {
//         apikey: '6m1NAjVcdP4FZrAj7JShG7KDuGN6FlAN',
//         keyword: '',
//         currency: ''
//     }
// }



function complete() {
    var comedians =
        state.genres.map(function (x) {
            return x.comedians;
        })
    //This will combine every array into a single array
    //Refer to this repl https://repl.it/I0hd/0
    return Array.prototype.concat.apply([], comedians);
}



function render() {
    $('.searchTerm').autocomplete({
        source: complete(),
        select: console.log
    })
    
}

render();




















//add a zip code search bar to find events near a 50 mile
//radius 

/* 
Keep each comedian to one genre(most popular genre)
use to split strings 

json file format
[
  { genre: "Spoof", comedians: ["Mel Brooks", "French and Saunders"] }
]
"Richard Pryor, Jeff Foxworthy, Gorge Lopez, Jerrod Guillory, Bill Engvall, Gabriel Iglesias".split(',').map((c) => c.trim())
*/