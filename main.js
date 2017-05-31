// var ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/'

// function getData() {
//     var getJson = {
//         apikey: '6m1NAjVcdP4FZrAj7JShG7KDuGN6FlAN',
//         keyword: '',
//         currency: ''
//     }
// }

var availableTags= []; 

function getTags(){

}

function auto() {
    $('.searchTerm').autocomplete({
        source: availableTags
    });
}






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