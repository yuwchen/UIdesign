function display_coffees() {
    $('#all-coffees').empty();
    if (!coffees) return;
    
    var learned = 0;
    coffees.forEach(function (c, _) { 
        $("#all-coffees").append(`
            <div class='card row' data-id=${c["id"]}>
                <div class="col-7">
                    <h2>${c["name"]}</h2>
                    <p>${c["info"]}</p>
                </div>
                <div class="col-5">
                    <img src='static/images/${c["learned"] ? "checked" : "blank"}.png' alt='learned'>
                    <img src='static/images/${c["name"].replace(" ", "_")}.png' alt='${c["name"]}'>
                </div>
            </div>
        `);

        learned += c["learned"] ? 1 : 0;
    });

    $(".card").click(function(e) {
        window.location.href = "/learn/" + $(this).data('id')
    });

    // only show the quiz button if all coffees have been learned
    if (learned == coffees.length) {
        $('#btn-quiz').show();
    } else  {
        $('#btn-quiz').hide();
    }
}

$(function() {
    display_coffees();
});