var panelGlobal = this;

// COMPRENAMER
// ===========
var compReNamer = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette"); 
    if ( !(panelGlobal instanceof Panel) ) compReNamer.text = "Comp Find and Replace"; 
    compReNamer.orientation = "column"; 
    compReNamer.alignChildren = ["center","top"]; 
    compReNamer.spacing = 10; 
    compReNamer.margins = 16; 

// FROMGROUP
// =========
var fromGroup = compReNamer.add("group", undefined, {name: "fromGroup"}); 
    fromGroup.orientation = "row"; 
    fromGroup.alignChildren = ["left","center"]; 
    fromGroup.spacing = 10; 
    fromGroup.margins = 0; 

var from = fromGroup.add("statictext", undefined, undefined, {name: "from"}); 
    from.text = "From:"; 

var fromEditText = fromGroup.add('edittext {properties: {name: "fromEditText"}}'); 
    //fromEditText.text = "EditText"; 
    fromEditText.preferredSize.width = 100;

// TOGROUP
// =======
var toGroup = compReNamer.add("group", undefined, {name: "toGroup"}); 
    toGroup.orientation = "row"; 
    toGroup.alignChildren = ["left","center"]; 
    toGroup.spacing = 10; 
    toGroup.margins = 0; 

var to = toGroup.add("statictext", undefined, undefined, {name: "to"}); 
    to.text = "To:"; 
    to.preferredSize.width = 36; 
    to.justify = "right"; 

var toEditText = toGroup.add('edittext {properties: {name: "toEditText"}}'); 
    //toEditText.text = "EditText"; 
    toEditText.preferredSize.width = 100;
// COMPRENAMER
// ===========
var runButton = compReNamer.add("button", undefined, undefined, {name: "runButton"}); 
    runButton.text = "Run"; 
    runButton.preferredSize.width = 110; 
    runButton.onClick = function(){main()}

compReNamer.layout.layout(true);
compReNamer.layout.resize();
compReNamer.onResizing = compReNamer.onResize = function () { this.layout.resize(); }

if ( compReNamer instanceof Window ) compReNamer.show();



function main(){

    app.beginUndoGroup("Comp Rename");

    var items = app.project.items;
    var toChange = [];
    var from = fromEditText.text;
    var to = toEditText.text;
    
    for(i = 1; i <= items.length; i++){
            if(items[i].name.indexOf(from) != -1 && items[i].typeName == "Composition" && items[i].selected == true){
                        toChange.push(items[i]);
                    }
            }
    if(toChange.length > 0){
            for(i = 0; i < toChange.length; i++){
                    toChange[i].name = toChange[i].name.replace(from, to);
                }
        }else alert("No Compositions with the name \""+from+"\" found ")

    app.endUndoGroup();
}