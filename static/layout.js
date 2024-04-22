const ingred2color = {
    'milk': '#FDFFF5',
    'milk foam': '#F6FFE8',
    'espresso': '#844637',
    'water': '#DEF4FC',
    'whiskey': '#FFCB85',
    'hot chocolate': '#7B3F00',
    'ice cream': '#FDF5C9'
};

function isColorDark(color) {
    let match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (!match) return null; 

    let [, r, g, b] = match.map(component => parseInt(component, 16));
    let luminance = 0.2126 * r / 255 + 0.7152 * g / 255 + 0.0722 * b / 255;
    return luminance < 0.5;
}

function updateCup(ingreds) {
    var count = 0;

    for (let i = 1; i <= 6; i++) { 
        count += 1;

        let curr = $('.portion' + i);
        if (i <= ingreds.length) {
            curr.css("background-color", ingred2color[ingreds[i - 1]]);
            curr.css("color", isColorDark(ingred2color[ingreds[i - 1]]) ? "white" : "black");

            if (i == ingreds.length || ingreds[i] != ingreds[i - 1]) {
                curr.text(ingreds[i - 1] + "+" + count);
                count = 0;
            } else {
                curr.text("")
            }
        } else {
            curr.css("background-color", $('.cup').css("background-color"));
            curr.text("")
        } 
    }
}
  