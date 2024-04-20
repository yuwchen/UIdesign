function display_question_on_quiz_page(quiz) {
  $("#main_button_container").empty();

  row = ""
  var reset = '<button id="quiz_reset_button">Empty Cup</button>'
  var prev = '<button id="quiz_previous_button">Previous</button>'
  var next = '<button id="quiz_next_button">Next</button>'
  var submit = '<button id="quiz_submit_button">Submit</button>'

  if (quiz['id'] == 1) {
    row = reset + next;
  } else if (quiz['id'] > 1 && quiz['id'] < 6) {
    row = reset + prev + next;
  } else if (quiz['id'] == 6) { 
    row = reset + prev + submit;
  } else {
    console.log("quiz id cannot be more than 6!")
  }
  
  $("#main_button_container").append(row);

  console.log("load data in view!", quiz, "quiz_id:", quiz['id']);
  $("#description").empty();

  var row = $(
    '<div class="info_block">'+
    '<div class="centering coffee_name">' +
    quiz["name"] +
    "</div>" +
    '<div class="row coffee_info_row"> <div class="coffee_image">'+
      '<img class="resize_img" src="' +
      quiz["image"] +
      '">' + '</div class=" centering coffee_info">'+
      quiz["info"] +
      "</div></div>" +
      '<div id="question_id">' +
      '<div class="centering">' +
      "<a'>Quiz: " +
      quiz['id'] +
      "</a>" +
      "</div>" +
      "</div>" +
      '<div id="question">' +
      "Could you make me a cup of <span class='question_coffee'>" + 
      quiz["name"] +
      "</span>?" +
      "</div>"
  );

  $("#description").append(row);

  $("#quiz_reset_button").click(function () {
    ingredient_selection = [];
    updateCup(ingredient_selection);
    console.log("Ingredient selection has been reset.");
  });

  $("#quiz_next_button").click(function () {
    $.ajax({
      url: "/next_question",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ quiz_id: quiz['id'], input: ingredient_selection }),
      success: function (newQuiz) {
        ingredient_selection = newQuiz["input"];
        updateCup(ingredient_selection);
        console.log("current key in view return", newQuiz["id"]);
        display_question_on_quiz_page(newQuiz, newQuiz["id"]);
      },
      error: function () {
        console.log("No result found.");
      },
    });
  });

  $("#quiz_previous_button").click(function () {
    $.ajax({
      url: "/previous_question",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ quiz_id: quiz['id'], input: ingredient_selection }),
      success: function (newQuiz) {
        console.log("Hello", newQuiz)
        ingredient_selection = newQuiz["input"];
        updateCup(ingredient_selection);
        console.log("current key in view return", newQuiz["id"]);
        display_question_on_quiz_page(newQuiz, newQuiz["id"]);
      },
      error: function () {
        console.log("No result found.");
      },
    });
  });

  $("#quiz_submit_button").click(function () {
    $.ajax({
      url: "/update_quiz",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ quiz_id: quiz['id'], input: ingredient_selection }),
      success: function () {
        window.location.href = "/quiz_summary";
      },
      error: function () {
        console.error("Failed to update quiz");
      },
    });
  });
}

let ingredient_selection = [];

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
  display_question_on_quiz_page(quiz);
});
