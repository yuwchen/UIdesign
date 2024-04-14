function display_coffees() {
    $('#all-coffees').empty();

    if (!coffees) return;

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
    });

    $(".card").click(function(e) {
        window.location.href = "/learn/" + $(this).data('id')
    });

}

$(function() {
    display_coffees();
});