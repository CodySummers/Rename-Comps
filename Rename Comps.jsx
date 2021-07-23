var panelGlobal = this;
var palette = (function () {

    // COMPRENAMER
    // ===========
    var compReNamer = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette", undefined, undefined, {borderless: false, resizeable: true});
    if (!(panelGlobal instanceof Panel)) compReNamer.text = "Comp Find and Replace";
    compReNamer.orientation = "column";
    compReNamer.alignChildren = ["fill", "top"];
    compReNamer.margins = 20;
    compReNamer.spacing = 10;

    // FROMGROUP
    // =========
    var fromGroup = compReNamer.add("group", undefined, { name: "fromGroup" });
    fromGroup.orientation = "row";
    fromGroup.alignChildren = ["fill", "center"];

    var from = fromGroup.add("statictext", undefined, undefined, { name: "from" });
    from.text = "From:";
    from.alignment = ["left","top"]; 

    var fromEditText = fromGroup.add('edittext {properties: {name: "fromEditText"}}');

    // TOGROUP
    // =======
    var toGroup = compReNamer.add("group", undefined, { name: "toGroup" });
    toGroup.orientation = "row";
    toGroup.alignChildren = ["fill", "center"];

    var to = toGroup.add("statictext", undefined, undefined, { name: "to" });
    to.text = "To:";
    to.alignment = ["left","top"]; 

    var toEditText = toGroup.add('edittext {properties: {name: "toEditText"}}');

    // COMPRENAMER
    // ===========
    var runButtonGroup = compReNamer.add("group")
    runButtonGroup.margins = 10;
    var runButton = runButtonGroup.add("button", undefined, undefined, { name: "runButton" });
    runButton.alignment = ["center", "top"];
    runButton.text = "Run";
    runButton.onClick = function () { main() }

    compReNamer.layout.layout(true);
    compReNamer.layout.resize();
    compReNamer.onResizing = compReNamer.onResize = function () { this.layout.resize(); }

    if (compReNamer instanceof Window) compReNamer.show();

    function main() {

        app.beginUndoGroup("Comp Rename");

        var items = app.project.items;
        var toChange = [];
        var from = fromEditText.text;
        var to = toEditText.text;

        for (i = 1; i <= items.length; i++) {
            if (items[i].name.indexOf(from) != -1 && items[i].typeName == "Composition" && items[i].selected == true) {
                toChange.push(items[i]);
            }
        }
        if (toChange.length > 0) {
            for (i = 0; i < toChange.length; i++) {
                toChange[i].name = toChange[i].name.replace(from, to);
            }
        } else alert("No Compositions with the name \"" + from + "\" found ")

        app.endUndoGroup();
    }

    return palette;

}());