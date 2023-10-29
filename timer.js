let minute = 10
var seconds = 6 * minute;
let second;

function tick() {
    console.log("tick called")
    let time = setInterval(() => {
        if(seconds > 0) {
          seconds--
        }
        else {
          seconds = 6 * minute
          
        }
        second = seconds
        // return second
    }, 1000)
    
}

module.exports = { tick, second: seconds};