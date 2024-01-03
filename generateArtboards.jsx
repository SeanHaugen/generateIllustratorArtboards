var newArtboardPrompt = new Window("dialog", "Artboards", undefined, { resizable: false });
newArtboardPrompt.size = [400, 150];

var promptGroup = newArtboardPrompt.add("group");
promptGroup.add("statictext", undefined, "Number of Artboards?");


var promptInput = promptGroup.add("edittext", [0, 0, 50, 20], " ");

var nextBtn = newArtboardPrompt.add("button", undefined, "Next");

var artboardSizePrompt = new Window("dialog", "Artboard Sizes", undefined, { resizable: false });
artboardSizePrompt.size = [600, 400];
var sizeInputGroup = artboardSizePrompt.add("group");
sizeInputGroup.orientation = "column"; 

var lengthInputs = [];
var widthInputs = [];

function generateArtboards() {
    var doc = app.documents.add();
    
    for (var i = 0; i < lengthInputs.length; i++) {
        var length = parseInt(lengthInputs[i].text);
        var width = parseInt(widthInputs[i].text);

        var lengthInches = length * 72;
        var widtInches = width * 72;


        var artboardRect = [0, 0, lengthInches, -widtInches];
        doc.artboards.add(artboardRect);
    }

    doc.artboards[0].remove();
}


function generateSizeInputGroup () {
    var numArtboards = parseInt(promptInput.text, 10);

    for (var i = 0; i < numArtboards; i++) {
        var artboardSizeGroup = sizeInputGroup.add("group"); // Create a new group for each artboard
        artboardSizeGroup.add("statictext", undefined, "Artboard " + (i + 1) + " (inches): ");

        artboardSizeGroup.add("statictext", undefined, "Length (horizontal): ");
        var lengthInput = artboardSizeGroup.add("edittext", [0, 0, 50, 20], " ");

        artboardSizeGroup.add("statictext", undefined,  " Width (Vertical): ");
        var widthInput = artboardSizeGroup.add("edittext", [0, 0, 50, 20], " ");

        lengthInputs.push(lengthInput);
        widthInputs.push(widthInput);
        
    }

    var nextBtn2 = artboardSizePrompt.add("button", undefined, "Next");
    

    nextBtn2.onClick = function() {
        artboardSizePrompt.close();
        generateArtboards();
    }
    artboardSizePrompt.show();
}


nextBtn.onClick = function () {
    newArtboardPrompt.close();
    generateSizeInputGroup();
    
};

newArtboardPrompt.show();



