import random
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
        "recipe": ["espresso", "espresso", "milk","milk","milk","milk foam"]
    },
    {
        "id": 2,
        "name": "Flat White",
        "image": "static/images/flat_white.png",
        "learned": True,
        "info": "A bold espresso shot with a smooth layer of microfoam, creating a velvety texture and strong coffee taste.",
        "recipe": ["espresso", "milk","milk"],
    },
    {
        "id": 3, 
        "name": "Americano",
        "image": "static/images/americano.png",
        "learned": True,
        "info": "Hot water added to espresso for a lighter coffee experience, maintaining the espresso's robust flavor.",
        "recipe": ["espresso",  "water"]
    },
    {
        "id": 4, 
        "name": "Mocha",
        "image": "static/images/mocha.png",
        "learned": True,
        "info": "Rich espresso infused with decadent chocolate syrup and creamy steamed milk, offering a delightful blend of bitter and sweet notes.",
        "recipe": ["espresso", "hot chocolate", "milk", "milk", "whipped cream"]
    },
    {
        "id": 5, 
        "name": "Cappuccino",
        "image": "static/images/cappuccino.png",
        "learned": True,
        "info": "A harmonious combination of espresso, steamed milk, and frothed milk, resulting in a creamy texture and bold coffee flavor.",
        "recipe": ["espresso", "milk", "milk foam"]
    },
    {
        "id": 6, 
        "name": "Espresso",
        "image": "static/images/espresso.png",
        "learned": False,
        "info": "A strong coffee brewed by forcing hot water through finely-ground beans, resulting in a fragrant drink topped with crema.",
        "recipe": ["espresso","espresso","espresso"]
    },
    {
        "id": 7, 
        "name": "Irish Coffee",
        "image": "static/images/irish_coffee.png",
        "learned": True,
        "info": "Whiskey-spiked coffee topped with cream; a cozy, spirited treat with a caffeine kick.",
        "recipe": ["espresso","espresso","whiskey", "whipped cream"]
    },
    {
        "id": 8, 
        "name": "Macchiato",
        "image": "static/images/macchiato.png",
        "learned": True,
        "info": "Espresso \"stained\" with a dollop of frothy milk; a bold, balanced coffee indulgence.",
        "recipe": ["espresso", "milk foam", "milk foam"]
    },
    {
        "id": 9, 
        "name": "Affogato",
        "image": "static/images/affogato.png",
        "learned": True,
        "info": "Hot espresso poured over cold gelato; a delightful contrast of temperatures and flavors.",
        "recipe": ["espresso","espresso", "ice cream","ice cream","ice cream"]
    }
]

def get_new_quizzes():
    new_quizzes = []
    coffee_q_idx = random.sample(range(9), k=6)

    for q_idx, coffee_idx in enumerate(coffee_q_idx):
        the_question = {}
        the_question['id'] = q_idx+1
        the_question['name'] = coffees[coffee_idx]['name']
        the_question['image'] = coffees[coffee_idx]['image']
        the_question['info'] = coffees[coffee_idx]['info']
        the_question['recipe'] = coffees[coffee_idx]['recipe']
        the_question['input'] = []
        the_question['correct'] = False
        new_quizzes.append(the_question)

    return new_quizzes 

quizzes = get_new_quizzes()

current_quiz = 0 


@app.route('/')
def home():
   return render_template('home.html')

@app.route('/exploration')
def exploration():
   return render_template("exploration.html", coffees=coffees)

@app.route('/quiz_summary')
def quiz_summary():
    def count_correct(quizzes):
        count = 0
        for quiz in quizzes:
            if quiz['correct']:
                count+=1
        return count

    return render_template('quiz_summary.html', quizzes=quizzes, count=count_correct(quizzes))

@app.route('/quiz_summary/<quiz_id>')
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

@app.route('/quiz_main_reset')
def quiz_main_reset():
    global current_quiz
    global quizzes
    current_quiz=0
    quizzes = get_new_quizzes()

    return render_template("quiz_main.html", quiz=quizzes[current_quiz], quiz_id=quizzes[current_quiz]['id'] )


@app.route('/next_question', methods=['POST'])
def next_question():
    data = request.get_json() 
    quiz_id = data['quiz_id']
    input = data['input']  
    next_idx = int(quiz_id)+1-1

    # update data first
    current_quiz_index = int(quiz_id)-1
    quizzes[current_quiz_index]['input'] = input
    print(quizzes[current_quiz_index]['input'])
    
    quizzes[current_quiz_index]['correct'] = (input == quizzes[current_quiz_index]['recipe'])

    return jsonify(quizzes[next_idx])

@app.route('/previous_question', methods=['POST'])
def previous_question():

    data = request.get_json()  
    quiz_id = data['quiz_id']
    input = data['input']
    previous_idx = int(quiz_id)-1-1

    # update data first
    current_quiz_index = int(quiz_id)-1
    quizzes[current_quiz_index]['input'] = input
    quizzes[current_quiz_index]['correct'] = (input == quizzes[current_quiz_index]['recipe'])

    return jsonify(quizzes[previous_idx])

@app.route('/update_quiz', methods=['POST'])
def update_quiz():
    data = request.get_json()  
    quiz_id = data['quiz_id']
    input = data['input']
    
    for quiz in quizzes:
        if quiz['id'] == quiz_id:
            quiz['input'] = input
            # update correctness
            quiz['correct'] = (quiz['input'] == quiz['recipe'])
            break

    print(quizzes)
    return jsonify({"message": "Quiz updated successfully"})

@app.route('/learn/<index>')
def learn(index=None):

    for i in range (len(coffees)):
        if coffees[i]['id']==int(index):
            the_coffee = coffees[i]

    return render_template('learn.html', coffee=the_coffee)

@app.route('/submit_learn', methods=['POST'])
def submit_learn():

    data = request.get_json()  
    input = data['input']
    the_coffee = data['coffee']
    
    correct_recipe = the_coffee['recipe']

    finished = True
    if len(correct_recipe) != len(input):
        finished = False
    for i in range(len(input)):
        if input[i] != correct_recipe[i]:
            finished = False

    if finished is True:
        print(finished)
        for i in range (len(coffees)):
            if coffees[i]['id']==int(the_coffee['id']):
                coffees[i]['learned']=True
        
    return jsonify({"finished": finished})

if __name__ == '__main__':
   app.run(debug = True)