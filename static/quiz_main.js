



function display_question_on_quiz_page(quiz, quiz_id){

    

    
    if (quiz_id == 1) {
        $("#main_button_container").empty();
        var row = $('<button id="quiz_next_button" class="btn btn-primary main_btn">Next</button>');
        $("#main_button_container").append(row);
    
    } else if (quiz_id > 1 && quiz_id < 6) {
        console.log("load data in view!WQEKWKLFJKLFJWELWEFJ")
        $("#main_button_container").empty();
        var row = $('<button id="quiz_previous_button" class="btn btn-primary main_btn">Previous</button> <button id="quiz_next_button" class="btn btn-primary main_btn">Next</button>');
        $("#main_button_container").append(row);
    }else if (quiz_id == 6) {
        $("#main_button_container").empty();
        var row = $('<button id="quiz_previous_button" class="btn btn-primary main_btn">Previous</button> <button id="quiz_submit_button" class="btn btn-primary main_btn">Submit</button>');
        $("#main_button_container").append(row);

    }

    console.log("load data in view!", quiz, 'quiz_id:', quiz_id)
    $("#description").empty();

    var row = $(
        '<div class="inline_block centering">' +
            '<img class="resize_img" src="' + quiz['image'] + '">' +
        '</div>' +
        '<div class="inline_block ">' +
            quiz['name'] +
        '</div>' +
        '<div class="inline_block">' +
            quiz['info'] +
        '</div>' +
        '<div class="row" id="question_id">' +
            '<div class="centering">' +
                '<a>Quiz: ' + quiz_id + '</a>' +
            '</div>' +
        '</div>' +
        '<div class="row" id="question">' +
            'Could you make me a cup of ' + quiz['name'] + '?' +
        '</div>'
    );

    $("#description").append(row);

    $("#quiz_next_button").click(function() {
        // Send the data['price'] information to the server
        $.ajax({
            url: '/next_question',
            type: 'POST',
            data: { quiz_id: quiz_id},
            success: function(newQuiz) {
                // Replace the existing data with the new data
                console.log('current key in view return', newQuiz['id'])
                display_question_on_quiz_page(newQuiz, newQuiz['id']);
            },
            error: function() {
                console.log("No result found.");
            }
        });
    });


    $("#quiz_previous_button").click(function() {
        // Send the data['price'] information to the server
        $.ajax({
            url: '/previous_question',
            type: 'POST',
            data: {quiz_id: quiz_id},
            success: function(newQuiz) {
                // Replace the existing data with the new data
                console.log('current key in view return', newQuiz['id'])
                display_question_on_quiz_page(newQuiz, newQuiz['id']);
            },
            error: function() {
                console.log("No result found.");
            }
        });
    });

}



$(document).ready(function(){
    display_question_on_quiz_page(quiz, quiz_id)

})