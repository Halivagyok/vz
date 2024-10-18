let index = 1; // Current slide
const slides = document.querySelectorAll(".slider");

setInterval(function() {
  document.getElementById('radio ' + index).checked = true;
  index++;
  if(index > slides.length){
    index = 1
  }

}, 4000);
function chang(a){
  index += a
  if(index > slides.length) index = 1;
  if(index == 0) index = 1;

}