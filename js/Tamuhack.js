$(document).ready(function(){
  var prompt = document.getElementById('prompt');
  var textbox = document.getElementById('textbox');
  prompt.style.width = ($(textbox).width()).toString() + "px";
  $(prompt).css("padding-top", "10px");
  $(prompt).css("padding-bottom", "10px");
  $(prompt).css("padding-left", "4px");



  var prompt_x_pos = window.innerWidth/2 - $(prompt).width()/2;
  var prompt_y_pos = window.innerHeight/2 - $(prompt).height()/2 + 65;
  var text_x_pos = window.innerWidth/2 - $(textbox).width()/2;
  var text_y_pos = window.innerHeight/2 - $(textbox).height()/2 - 65;


  //Set initial position of prompt and text box
  prompt.style.left = (prompt_x_pos).toString() + "px";
  prompt.style.top = (prompt_y_pos).toString() + "px";
  textbox.style.left = (text_x_pos).toString() + "px";
  textbox.style.top = (text_y_pos).toString() + "px";


  $(textbox).val($(prompt).textWidth());

  //Get coordinates of text

});


$.fn.textWidth = function(){
  var html_org = $(this).html();
  var html_calc = '<span>' + html_org + '</span>';
  $(this).html(html_calc);
  var width = $(this).find('span:first').width();
  $(this).html(html_org);
  return width;
};


