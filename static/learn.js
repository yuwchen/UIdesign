let ingredient_selection = [];

function display_learn_page(coffee) {
  console.log("load data in view!", coffee);
  $("#description").empty();

  var row = ` <div class="info-block">
                <div class='card row' id="info" data-id=${coffee["id"]}>
                    <div class="col-7">
                        <h2>${coffee["name"]}</h2>
                        <p>${coffee["info"]}</p>
                    </div>
                    <div class="col-5">
                        <img src='../static/images/${coffee["learned"] ? "checked" : "blank"}.png' alt='learned'>
                        <img src='../${coffee["image"]}' alt='${coffee["name"]}'>
                    </div>
                </div>
              <div> `;

  $("#description").append(row);

  $("#learn_reset_button").show();
  $("#learn_submit_button").show();
  $("#learn_next_button").hide();

  $("#learn_reset_button").click(function () {
    ingredient_selection = [];
    updateCup(ingredient_selection);
    console.log("Ingredient selection has been reset.");
  });

  $("#learn_submit_button").click(function () {
    $.ajax({
      url: "/submit_learn",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ coffee: coffee, input: ingredient_selection }),
      success: function (result) {
        console.log("current key in view return", result["finished"]);

        if (result["finished"] === true) {
          $("#learn_reset_button").hide();
          $("#learn_submit_button").hide();
          $("#learn_next_button").show();

          var correctImage = $("<img>", {
            id: "learn_correct_image",
            src: "../static/images/checked.png",
          });
          $("#learn_response_container").empty();
          $("#learn_response_container").append(correctImage);
          
        } else {
          ingredient_selection = [];
          updateCup(ingredient_selection);

          var errorImage = $("<img>", {
            id: "learn_incorrect_image",
            src: "../static/images/unchecked.png",
          });
          var tryAgainText = $("<p>", {
            text: "Try Again",
            class: "try-again-text",
          });

          $("#learn_response_container").empty();
          $("#learn_response_container").append(errorImage, tryAgainText);

          setTimeout(function () {
            $("#learn_incorrect_image").remove();
            $(".try-again-text").remove();
          }, 1000);
        }
      },
      error: function () {
        console.log("No result found.");
      },
    });
  });
}

function selectIngredient(ingredient_name) {
  if (ingredient_selection.length < 6) {
    ingredient_selection.push(ingredient_name);
    console.log(ingredient_selection);
  } else {
    console.log("You cannot add more than 6 ingredients.");
  }

  updateCup(ingredient_selection);
}

$(document).ready(function () {
  display_learn_page(coffee);
});
