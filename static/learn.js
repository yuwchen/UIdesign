let ingredient_selection = [];

function display_learn_page(coffee) {
  console.log("load data in view!", coffee);
  $("#description").empty();

  var row = $(
    '<div class="inline_block centering">' +
      '<img class="resize_img" src="../' +
      coffee["image"] +
      '">' +
      "</div>" +
      '<div class="inline_block centering">' +
      coffee["name"] +
      "</div>" +
      '<div class="inline_block">' +
      coffee["info"] +
      "</div>" +
      '<div class="row " id="learn_answer">' +
      '<img class="resize_img " src="../' +
      coffee["image"] +
      '">' +
      "</div>"
  );

  $("#description").append(row);

  $("#learn_submit_button").click(function () {
    $.ajax({
      url: "/submit_learn",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ coffee: coffee, input: ingredient_selection}),
      success: function (result) {

      console.log("current key in view return", result['finished']);

      if (result['finished'] === true) {
          console.log("result['finished'] is true");
          $("#learn_button_container").empty();

          var row = $(
            '<div id="learn_response_container">' +
              '<img id="learn_correct_image" src="../static/images/checked.png">' +
              "</div>" +
              '<button id="learn_next_button" class="btn btn-primary main_btn">Next</button>'
          );
          $("#learn_button_container").append(row);
      
          $("#learn_next_button").click(function () {
            console.log("Next button click!");
            window.location.href = "../exploration";
          });

      }else {
          console.log("result['finished'] is false");

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

  // update cup layout by user selection
  for (let i = 1; i <= 6; i++) { 
    let curr = $('.portion' + i.toString())
    let color = i <= ingredient_selection.length ? ingred2color[ingredient_selection[i - 1]] : $('.cup').css("background-color")
    curr.css("background-color", color) 
  }
}

$(document).ready(function () {
  display_learn_page(coffee);
});
