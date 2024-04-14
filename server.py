from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

coffees = [
    {
        "id": 1,
        "name": "Latte",
        "image": "static/images/latte.png",
        "learned": True,
        "info": "Espresso blended with silky steamed milk for a creamy texture and balanced flavor profile.",
        "recipe": [("espresso", 2), 
                   ("steamed milk", 3), 
                   ("milk foam", 1)]
    },
    {
        "id": 2,
        "name": "Flat White",
        "image": "static/images/flat_white.png",
        "learned": True,
        "info": "A bold espresso shot with a smooth layer of microfoam, creating a velvety texture and strong coffee taste.",
        "recipe": [("espresso", 1), 
                   ("steamed milk", 2)],
    },
    {
        "id": 3, 
        "name": "Americano",
        "image": "static/images/americano.png",
        "learned": True,
        "info": "Hot water added to espresso for a lighter coffee experience, maintaining the espresso's robust flavor.",
        "recipe": [("espresso", 1), 
                   ("water", 1)]
    },
    {
        "id": 4, 
        "name": "Mocha",
        "image": "static/images/mocha.png",
        "learned": True,
        "info": "Rich espresso infused with decadent chocolate syrup and creamy steamed milk, offering a delightful blend of bitter and sweet notes.",
        "recipe": [("espresso", 1),
                   ("hot chocolate", 1),
                   ("steamed milk", 2), 
                   ("whipped cream", 1)]
    },
    {
        "id": 5, 
        "name": "Cappuccino",
        "image": "static/images/cappuccino.png",
        "learned": True,
        "info": "A harmonious combination of espresso, steamed milk, and frothed milk, resulting in a creamy texture and bold coffee flavor.",
        "recipe": [("espresso", 1), 
                   ("steamed milk", 1), 
                   ("milk foam", 1)]
    },
    {
        "id": 6, 
        "name": "Espresso",
        "image": "static/images/espresso.png",
        "learned": True,
        "info": "A concentrated coffee shot brewed by forcing hot water through finely-ground coffee beans, producing an aromatic beverage with a layer of crema on top.",
        "recipe": [("espresso", 3)]
    },
    {
        "id": 7, 
        "name": "Irish Coffee",
        "image": "static/images/irish_coffee.png",
        "learned": True,
        "info": "Whiskey-spiked coffee topped with cream; a cozy, spirited treat with a caffeine kick.",
        "recipe": [("espresso", 2), 
                   ("whiskey", 1), 
                   ("whipped cream", 1)]
    },
    {
        "id": 8, 
        "name": "Macchiato",
        "image": "static/images/macchiato.png",
        "learned": True,
        "info": "Espresso \"stained\" with a dollop of frothy milk; a bold, balanced coffee indulgence.",
        "recipe": [("espresso", 1), 
                   ("milk foam", 2)]
    },
    {
        "id": 9, 
        "name": "Affogato",
        "image": "static/images/affogato.png",
        "learned": True,
        "info": "Hot espresso poured over cold gelato; a delightful contrast of temperatures and flavors.",
        "recipe": [("espresso", 2), 
                   ("ice cream", 3)]
    }
]

quizzes = [
    {
        "id": 1,
        "name": "Latte",
        "image": "static/images/latte.png",
        "info": "Espresso blended with silky steamed milk for a creamy texture and balanced flavor profile.",
        "recipe": [("espresso", 2), 
                   ("steamed milk", 3), 
                   ("milk foam", 1)],
        "input": [("espresso", 2), 
                   ("steamed milk", 3), 
                   ("milk foam", 1)],
        "correct": True
    },
    {
        "id": 2,
        "name": "Flat White",
        "image": "static/images/flat_white.png",
        "learned": False,
        "info": "A bold espresso shot with a smooth layer of microfoam, creating a velvety texture and strong coffee taste.",
        "recipe": [("espresso", 1), 
                   ("steamed milk", 2)],
        "input": [("espresso", 1), 
                   ("steamed milk", 2)],
        "correct": True
    },
    {
        "id": 3, 
        "name": "Americano",
        "image": "static/images/americano.png",
        "learned": True,
        "info": "Hot water added to espresso for a lighter coffee experience, maintaining the espresso's robust flavor.",
        "recipe": [("espresso", 1), 
                   ("water", 1)],
        "input": [("espresso", 1), 
                   ("water", 1)],
        "correct": True
    },
    {
        "id": 4, 
        "name": "Mocha",
        "image": "static/images/mocha.png",
        "learned": False,
        "info": "Rich espresso infused with decadent chocolate syrup and creamy steamed milk, offering a delightful blend of bitter and sweet notes.",
        "recipe": [("espresso", 1),
                   ("hot chocolate", 1),
                   ("steamed milk", 2), 
                   ("whipped cream", 1)],
        "input": [("espresso", 1), 
                   ("steamed milk", 2)],
        "correct": False
    },
    {
        "id": 5, 
        "name": "Cappuccino",
        "image": "static/images/cappuccino.png",
        "learned": True,
        "info": "A harmonious combination of espresso, steamed milk, and frothed milk, resulting in a creamy texture and bold coffee flavor.",
        "recipe": [("espresso", 1), 
                   ("steamed milk", 1), 
                   ("milk foam", 1)],
        "input": [("espresso", 1), 
                   ("steamed milk", 2)],
        "correct": False
    },
    {
        "id": 6, 
        "name": "Espresso",
        "image": "static/images/espresso.png",
        "learned": False,
        "info": "A concentrated coffee shot brewed by forcing hot water through finely-ground coffee beans, producing an aromatic beverage with a layer of crema on top.",
        "recipe": [("espresso", 3)],
        "input": [("espresso", 3)],
        "correct": True
    }
]

current_quiz = 0 


@app.route('/')
def home():
   return render_template('home.html')

@app.route('/exploration')
def exploration():
   return render_template("exploration.html", coffees=coffees)

@app.route('/quiz/summary')
def quiz_summary():
    def count_correct(quizzes):
        count = 0
        for quiz in quizzes:
            if quiz['correct']:
                count+=1
        return count

    return render_template('quiz_summary.html', quizzes=quizzes, count=count_correct(quizzes))

@app.route('/quiz/summary/<quiz_id>')
def quiz_summary_detail(quiz_id):
    def find_quiz_by_id(quiz_id):
        for quiz in quizzes:
            if quiz['id'] == int(quiz_id):
                return quiz
        return None 

    quiz = find_quiz_by_id(quiz_id)
    if quiz:
        return render_template('quiz_summary_detail.html', quiz=quiz)
    else:
        return "Quiz not found", 404

@app.route('/quiz_main')
def quiz_main():
    global current_quiz
    return render_template("quiz_main.html", quiz=quizzes[current_quiz], quiz_id=quizzes[current_quiz]['id'] )

    
@app.route('/next_question', methods=['POST'])
def next_question():

    quiz_id = request.form.get('quiz_id')
    next_idx = int(quiz_id)+1-1

    return jsonify(quizzes[next_idx])

@app.route('/previous_question', methods=['POST'])
def previous_question():

    quiz_id = request.form.get('quiz_id')
    previous_idx = int(quiz_id)-1-1

    return jsonify(quizzes[previous_idx])

if __name__ == '__main__':
   app.run(debug = True)