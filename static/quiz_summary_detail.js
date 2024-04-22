function display_quiz_detail() {
  const quizDetailsContainer = $("#quiz_details");
  quizDetailsContainer.empty();

  if (!quiz) return;

  // Append HTML content
  quizDetailsContainer.append(`
    <div class='detailcard' data-id='${quiz.id}'>
      <div class="row">
        <div class="col-md-7">
          <h2>${quiz["name"]}</h2>
          <p>${quiz["info"]}</p>
        </div>
        <div class="col-md-5">
          <img src='/static/images/${
            quiz["correct"] ? "checked" : "unchecked"
          }.png' alt='correct'>
          <img src='/static/images/${quiz["name"].replace(
            " ",
            "_"
          )}.png' alt='${quiz["name"]}'>
        </div>
      </div>
    </div>

    <div class='answer-detail col-md-4' data-id='${quiz.id}'>
      <div class="row">
        <h2>Your Answer</h2>
      </div>
      <div class="row">
      <div class="cup" id="user_cup">
          <div class="recipe">
            <div class="portion portion6"></div>
            <div class="portion portion5"></div>
            <div class="portion portion4"></div>
            <div class="portion portion3"></div>
            <div class="portion portion2"></div>
            <div class="portion portion1"></div>
          </div>
          <div class="handle"></div>
        </div>
      </div>
    </div>

    <div class='answer-detail col-md-4' data-id='${quiz.id}'>
      <div class="row">
        <h2>Correct Answer</h2>
      </div>
      <div class="row">
      <div class="cup" id="correct_cup">
          <div class="recipe">
            <div class="portion portion6"></div>
            <div class="portion portion5"></div>
            <div class="portion portion4"></div>
            <div class="portion portion3"></div>
            <div class="portion portion2"></div>
            <div class="portion portion1"></div>
          </div>
          <div class="handle"></div>
        </div>
      </div>
    </div>
  `);

  updateCup(quiz["input"], $("#user_cup"));
  updateCup(quiz["recipe"], $("#correct_cup"));
}

$(function () {
  display_quiz_detail();
});
