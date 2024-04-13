function display_quiz_detail() {
  const quizDetailsContainer = $("#quiz_details");
  quizDetailsContainer.empty();

  if (!quiz) return;

  //   const quizName = $("<span>").text(quiz.name).html();
  //   const quizInfo = $("<span>").text(quiz.info).html();
  //   const correctImage = quiz.correct ? "check" : "unchecked";
  //   const quizImageName = quizName.replace(/ /g, "_");

  // Append the quiz details to the container
  quizDetailsContainer.append(`
    <div class='detailcard' data-id='${quiz.id}'>
    <div class="row">
        <div class="col-md-7">
        <h2>${quiz["name"]}</h2>
        <p>${quiz["info"]}</p>
        </div>
        <div class="col-md-5">
            <img src='/static/images/${
              quiz["correct"] ? "check" : "unchecked"
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
        <img src='/static/images/empty_cup.png' alt='useranswer'>
      </div>
    </div>

    <div class='answer-detail col-md-4' data-id='${quiz.id}'>
      <div class="row">
        <h2>Correct Answer</h2>
      </div>
      <div class="row">
        <img src='/static/images/empty_cup.png' alt='correctanswer'>
      </div>
    </div>
    `);
}

// Run the function when the document is fully loaded
$(function () {
  display_quiz_detail();
});
