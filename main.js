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

Your goal is to a very simple output for 
events search based on related comedians.
*/

function getRandomColor(){
    var letters = '123456789ABCDEF'
    var color = '#';
    for(var i = 0; i < 6; i++){
        color+= letters[Math.floor(Math.random() * 16)]
    }
    return color; 
}

function setRandomColor(){
    $('#colorpad').css('background-color',getRandomColor());
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





function render() {
    $('.searchTerm').autocomplete({
        source: complete(),
        select: function (e, selected) {
            $('.searchButton').text(state.getRelatedComedians(selected.item.value))
            // console.log(state.getRelatedComedians(selected.item.value));
        }
    })
}

render();