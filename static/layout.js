const ingred2color = {
    'milk': '#FDFFF5',
    'milk foam': '#F6FFE8',
    'espresso': '#844637',
    'water': '#DEF4FC',
    'whiskey': '#FFCB85',
    'hot chocolate': '#7B3F00',
    'ice cream': '#FDF5C9'
}

function updateCup(ingreds) {
    for (let i = 1; i <= 6; i++) { 
        let curr = $('.portion' + i.toString())
        let color = i <= ingreds.length ? 
                    ingred2color[ingreds[i - 1]] : 
                    $('.cup').css("background-color")
        curr.css("background-color", color) 
    }
}
  