//write the equivalent of the effect below using set Timeout
setInterval(function run() {
  console.log("hello");
}, 1000);


//Answer
function run() {
  console.log("hello");
  setTimeout(run, 1000); 
}
setTimeout(run, 1000); 


