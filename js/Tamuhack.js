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

  var temp_space = document.createElement("temporary");
  temp_space.innerHTML = " ";
  document.body.appendChild(temp_space);
  space_rect = temp_space.getBoundingClientRect();
  var space = {
    x_range: space_rect.right - space_rect.left,
    y_range: space_rect.bottom - space_rect.top
  };
  var el = document.getElementById('prompt');
  var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  var lineHeight = Math.floor(parseFloat(style)*1.5); 

  document.body.removeChild(temp_space);

  $(textbox).val("Type the phrase below");

  //Get coordinates of text
  var prompt_txt = prompt.innerHTML;
  var word_dict = [];
  var char_dict = [];
  var cur_x_position = prompt_x_pos;
  var cur_y_position = prompt_y_pos;
  //keep track of word, create temp element for that. This is to know when a new line occurs
  var i = 0;
  var flag = 0;
  while (i < prompt_txt.length) {
        var temp_word = {
          word: prompt_txt.substr(0,prompt_txt.indexOf(' ')),
          char_dict: []
        };
        i = prompt_txt.indexOf(' ');
        prompt_txt = prompt_txt.substr(prompt_txt.indexOf(' ')+1);

        //for new lines, need to keep track of word width. If the total width exceeds bounding box width, it moves to a new line
        var temp_word_el = document.createElement("word_len");
        temp_word_el.innerHTML = temp_word;
        document.body.appendChild(temp_word_el);
        var temp_word_rect = temp_word_el.getBoundingClientRect();

        if (cur_x_position + (temp_word_rect.right - temp_word_rect.left) > prompt.getBoundingClientRect().right) {
          flag = 1;
        }

        document.body.removeChild(temp_word_el);
        //keep track of character, create temp element for each one
        var a = 0;
        while (a < temp_word.word.length) {
          //create element
          var temp_char_el = document.createElement("temporary");
          temp_char_el.innerHTML = temp_word.word[a];
          document.body.appendChild(temp_char_el);

          var rect = temp_char_el.getBoundingClientRect();
          var temp_char = {
            character: temp_word.word[a],
            x_start: cur_x_position,
            x_range: rect.right - rect.left,
            y_start: cur_y_position,
            y_range: rect.bottom - rect.top
          };

          //get boundingrect
          //create temp object with char value, char x_start, char x_range, char y_start, char y_range, 
          //push object into char_dict
          temp_word.char_dict.push(temp_char);
          cur_x_position += temp_char.x_range;
          //delete element
          document.body.removeChild(temp_char_el);
          a++;
        }

        if (flag == 1) {
          cur_x_position = prompt_x_pos;
          cur_y_position += (temp_word_rect.bottom - temp_word_rect.top + lineHeight);
          flag = 0;
        }
        cur_x_position += space.x_range;
        word_dict.push(temp_word);

        //check if position exceeds box dimensions
  }
});

var pressed = {};

window.onkeydown = function(e) {
  if ( pressed[e.which] ) return;
  pressed[e.which] = e.timeStamp;
};
    
window.onkeyup = function(e) {
  var output = document.getElementById('test');
  if ( !pressed[e.which] ) return;
  var duration = ( e.timeStamp - pressed[e.which] ) / 1000;
  output.innerHTML += '<p>Key ' + String.fromCharCode(e.which)  + ' was pressed for ' + duration + ' seconds</p>';
  pressed[e.which] = 0;
};

    

