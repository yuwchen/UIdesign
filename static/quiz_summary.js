function display_quiz_summary() {
  $("#all-quizzes").empty();

  if (!Array.isArray(quizzes)) {
    console.error("Quizzes data is not an array or is undefined");
    return;
  }

  quizzes.forEach(function (q, index) {
    let $card = $(`
      <div class='quizsummarycard col-md-3' data-id=${q["id"]}>
          <div class="row">
            <div class="col-7">
                <h2>Quiz ${q["id"]}</h2>
            </div>
            <div class="col-5">
              <img src='/static/images/${
                q["correct"] ? "checked" : "unchecked"
              }.png' alt='correct'>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <p>Could you make me a cup of ${q["name"]}?</p>
            </div>
          </div>
      </div>
    `);

    $("#all-quizzes").append($card);

    $card.on(
      "click",
      (function (quizId) {
        return function () {
          window.location.href = `/quiz/summary/${quizId}`;
        };
      })(q["id"])
    );
  });
}

$(document).ready(function () {
  document.getElementById("correctCount").textContent = count;
  display_quiz_summary();
});
