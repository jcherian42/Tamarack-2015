$(document).ready(function(){
  var prompt = document.getElementById('prompt');
  var textbox = document.getElementById('textbox');

  var prompt_x_pos = window.innerWidth/2 - $(prompt).width()/2;
  var prompt_y_pos = window.innerHeight/2 - $(prompt).height/2;
  var text_x_pos = window.innerWidth/2 - $(textbox).width()/2;
  var text_y_pos = window.innerHeight/2 - $(textbox).height/2;


  //Set initial position of prompt and text box
  textbox.setAttribute("style","left: " + (text_x_pos).toString() + "px");
  prompt.setAttribute("style","left: " + (prompt_x_pos).toString() + "px");


  //Get coordinates of text

});


