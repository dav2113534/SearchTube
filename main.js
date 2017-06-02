// var ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/'

// function getData() {
//     var getJson = {
//         apikey: '6m1NAjVcdP4FZrAj7JShG7KDuGN6FlAN',
//         keyword: '',
//         currency: ''
//     }
// }


// Your goal is to display list of related comedians(based on genre) 
//for comedian they have selected. If you complete it go ahead 
//and try to call Ticketmaster api with selected comedian.




/* 
Create a function that finds a comedian that is similar genre if 
the comedian selected is not within the 50 mile radius
Also, give them recommendations 
*/

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

/* 
This should list comics that are in the same genres as 
the one selected in the search bar 
*/
// var saveChoices = state.choices.push($('.searchTerm'));
// function saveChoices(){
//     var string = state.choices; 
//     $('.searchTerm').submit().html(string)
// }

// function saveChoice() {
//     // var choice = state.choices.push("$('.searchTerm')")
//     if (state.choices !== undefined) {
//         return choice
//     }
// }



function getSearchTerm() {
    return $('.searchTerm').val();

}

function displayList() {
    $('.searchTerm').submit(state)
}



function render() {
    $('.searchTerm').autocomplete({
        source: complete(),
        select: function (e, selected) {
            console.log(state.getRelatedComedians(selected.item.value));
        }
    })
}

render();