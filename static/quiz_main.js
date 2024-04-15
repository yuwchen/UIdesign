function display_question_on_quiz_page(quiz, quiz_id) {
  if (quiz_id == 1) {
    $("#main_button_container").empty();
    var row = $(
      '<button id="quiz_reset_button" class="btn btn-primary main_btn">Reset</button><button id="quiz_next_button" class="btn btn-primary main_btn">Next</button>'
    );
    $("#main_button_container").append(row);
  } else if (quiz_id > 1 && quiz_id < 6) {
    console.log("load data in view!WQEKWKLFJKLFJWELWEFJ");
    $("#main_button_container").empty();
    var row = $(
      '<button id="quiz_reset_button" class="btn btn-primary main_btn">Reset</button> <button id="quiz_previous_button" class="btn btn-primary main_btn">Previous</button> <button id="quiz_next_button" class="btn btn-primary main_btn">Next</button>'
    );
    $("#main_button_container").append(row);
  } else if (quiz_id == 6) {
    $("#main_button_container").empty();
    var row = $(
      '<button id="quiz_reset_button" class="btn btn-primary main_btn">Reset</button> <button id="quiz_previous_button" class="btn btn-primary main_btn">Previous</button> <button id="quiz_submit_button" class="btn btn-primary main_btn">Submit</a>'
    );
    $("#main_button_container").append(row);
  }

  console.log("load data in view!", quiz, "quiz_id:", quiz_id);
  $("#description").empty();

  var row = $(
    '<div class="inline_block centering">' +
      '<img class="resize_img" src="' +
      quiz["image"] +
      '">' +
      "</div>" +
      '<div class="inline_block ">' +
      quiz["name"] +
      "</div>" +
      '<div class="inline_block">' +
      quiz["info"] +
      "</div>" +
      '<div class="row" id="question_id">' +
      '<div class="centering">' +
      "<a>Quiz: " +
      quiz_id +
      "</a>" +
      "</div>" +
      "</div>" +
      '<div class="row" id="question">' +
      "Could you make me a cup of " +
      quiz["name"] +
      "?" +
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
      data: JSON.stringify({ quiz_id: quiz_id, input: ingredient_selection }),
      success: function (newQuiz) {
        ingredient_selection = [];
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
      data: JSON.stringify({ quiz_id: quiz_id, input: ingredient_selection }),
      success: function (newQuiz) {
        ingredient_selection = [];
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
      data: JSON.stringify({ quiz_id: quiz_id, input: ingredient_selection }),
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
  display_question_on_quiz_page(quiz, quiz_id);
});
