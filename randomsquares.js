var fieldSize = 0;
var fieldRoot = [ 0 , 0 ];
var counter = 0;

function show(id) {
  document.getElementById(id).style.visibility = "visible";
}

function hide(id) {
  document.getElementById(id).style.visibility = "hidden";
}

function init(){
  var maxX=window.innerWidth;
  var maxY=window.innerHeight;
  fieldSize = 0.95 * Math.min( maxX , maxY );
  if ( maxX > maxY ) {
    fieldRoot = [ (maxX - fieldSize)/2 , fieldSize/40 ]
  } else {
    fieldRoot = [ fieldSize/40 , (maxX - fieldSize)/2 ]
  } 
  submitChoice();
}

function drawRandomSquare(){
}

function submitChoice(inp){
  if (counter == 0){
    addSquare(); 
  }
  var svgObject=document.getElementById("svg");

  while (svgObject.firstChild) {
    svgObject.removeChild(svgObject.firstChild);
  }
 
  border = document.createElementNS("http://www.w3.org/2000/svg", 'rect'); 
  border.setAttribute("width",fieldSize);
  border.setAttribute("height",fieldSize);
  border.setAttribute("x",fieldRoot[0]);
  border.setAttribute("y",fieldRoot[1]);
  border.setAttribute("style","fill:rgb(255,255,255);stroke-width:1;stroke:rgb(230,230,230)"); 
  svgObject.appendChild(border);

  sizes = [];
  maxSize = 10;
  for (let i = 0; i < counter; i++){
    sizes.push(parseInt(document.getElementById("sqrSize"+i).value));
  }
  maxSize = Math.max(...sizes);
  
  sqrFieldSize = fieldSize - (2 * maxSize);
  sqrFieldRoot = [ fieldRoot[0] + maxSize / 2 , fieldRoot[1] + maxSize /2 ];  
 
  for (i = 0; i < counter; i++){
    sqrFieldSize = fieldSize - (1 * parseInt(document.getElementById("sqrSize"+i).value)+20);
    // sqrFieldRoot = [ fieldRoot[0] + parseInt(document.getElementById("sqrSize"+i).value) / 2 , fieldRoot[1] + parseInt(document.getElementById("sqrSize"+i).value) /2 ];  
    sqrFieldRoot = [ fieldRoot[0] + 10, fieldRoot[1] + 10];  
    for(j = 0; j < parseInt(document.getElementById("sqrNumber"+i).value); j++){
      square = document.createElementNS("http://www.w3.org/2000/svg", 'rect'); 
      square.setAttribute("width",parseInt(document.getElementById("sqrSize"+i).value));
      square.setAttribute("height",parseInt(document.getElementById("sqrSize"+i).value));
      square.setAttribute("x",sqrFieldRoot[0] + Math.random() * sqrFieldSize);
      square.setAttribute("y",sqrFieldRoot[1] + Math.random() * sqrFieldSize);
      square.setAttribute("rx",parseInt(document.getElementById("sqrRounding"+i).value));
      square.setAttribute("style","fill:rgb(255,255,255);stroke-width:"
        +parseFloat(document.getElementById("sqrWidth"+i).value)+";stroke:rgb("
        +document.getElementById("sqrColorRGB"+i).value+");fill-opacity:0%;stroke-opacity:"
        +parseInt(document.getElementById("sqrTransparency"+i).value)+"%");
      svgObject.appendChild(square);
    }
  }

  return(false);
}

function addSquare() {
  var anchor = document.getElementById("squaresList");
  anchor.insertAdjacentHTML('beforeend','<div id="requestLine'+counter+'" class="grid-squares"><input value="50" type="number" id="sqrNumber'+counter+'" step="1" min="1" max="10000"><input value="80" type="number" id="sqrSize'+counter+'" step="1" min="5" max="300"><input value="2" type="number" id="sqrWidth'+counter+'" step=".1" min=".1" max="10"><input value="0,0,0" type="text" id="sqrColorRGB'+counter+'"><input value="80" type="number" id="sqrTransparency'+counter+'" step="5" min="5" max="100"><input value="0" type="number" id="sqrRounding'+counter+'" step="1" min="0" max="20"></div>');
  counter++;
}

function removeSquare(){
  if (counter > 1){
    anchor = document.getElementById("squaresList");
    anchor.removeChild(anchor.lastElementChild);
    counter--;
  }
}


