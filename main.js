// var ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/'

// function getData() {
//     var getJson = {
//         apikey: '6m1NAjVcdP4FZrAj7JShG7KDuGN6FlAN',
//         keyword: '',
//         currency: ''
//     }
// }

// state.genres[i].comedians

// let availableTags = [];

// var availableTags = state.map(function(x){
//     for(var i = 0; i < x.genres.length; i++){
//         return x.genres[i].comedians; 
//     }
// })

var availableTags = []; 

function getTags() {
    for (var i = 0; i < state.genres.length; i++){
       availableTags.push(state.genres[i].comedians)
    }
}

$



// function auto() {
//     $('.searchTerm').autocomplete({
//         source: availableTags
//     });
// }






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