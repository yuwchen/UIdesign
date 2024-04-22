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

  var row = ` <div class="info-block">
                <div class='card row' id="info" data-id=${quiz["id"]}>
                    <div class="col-7">
                        <h2>${quiz["name"]}</h2>
                        <p>${quiz["info"]}</p>
                    </div>
                    <div class="col-5">
                        <img src='../static/images/blank.png' alt='blank'>
                        <img src='../${quiz["image"]}' alt='${quiz["name"]}'>
                    </div>
                </div>
                <div id="question_id">
                    <a'>Quiz: ${quiz["id"]}/6 </a>
                </div>
                <div id="question">
                  Could you make me a cup of <span class='question_coffee'>${quiz["name"]}</span>?
                </div>
              <div> `;

  $("#description").append(row);

  $("#quiz_reset_button").click(function () {
    ingredient_selection = [];
    updateCup(ingredient_selection, "#user_cup");
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
        updateCup(ingredient_selection, "#user_cup");
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
        updateCup(ingredient_selection, "#user_cup");
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

  updateCup(ingredient_selection, "#user_cup");
}

$(document).ready(function () {
  display_question_on_quiz_page(quiz);
});
