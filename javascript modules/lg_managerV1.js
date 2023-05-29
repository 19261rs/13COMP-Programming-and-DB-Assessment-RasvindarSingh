MODULENAME = "lg_manager.js"
var lg_logit = true; 
lg_console(MODULENAME + "\n---------------", "blue");
p_debug.textContent = lg_logit;

function lg_console (_text, _colour) {
  if (lg_logit == true) {
    console.log("%c" + _text, "colour:" + _colour);
  }
}