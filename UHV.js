let currentQuestionIndex = 0;
let score = 0;
let stressScore = 0;
let bodyHealthScore = 0;
let mindfulnessScore = 0;
let relationshipScore = 0;

const categories = {
    stress: 0,
    bodyHealth: 0,
    mindfulness: 0,
    relationships: 0
};

const questions = [{
        question: "How do you feel when you wake up in the morning?",
        options: [
            "Energized",
            "Tired but I push through",
            "I feel sluggish and don't want to get up."
        ],
        answer: 0,
        category: 'bodyHealth' // Question related to body health
    },
    {
        question: "How do you react when you feel physically stressed?",
        options: [
            "I take a break and relax.",
            "I keep going and ignore the discomfort.",
            "I feel frustrated and anxious."
        ],
        answer: 0,
        category: 'stress' // Question related to stress
    },
    {
        question: "How do you take care of your body?",
        options: [
            "I exercise and eat healthy most of the time.",
            "I occasionally make healthy choices, but it's not a priority.",
            "I don’t pay much attention to my body."
        ],
        answer: 0,
        category: 'bodyHealth' // Question related to body health
    },
    {
        question: "How do you react to physical discomfort (e.g., headache)?",
        options: [
            "I take a break and take care of it.",
            "I try to ignore it and keep going.",
            "I feel irritated and don’t know how to manage it."
        ],
        answer: 0,
        category: 'stress' // Question related to stress
    },
    {
        question: "When you're upset, how do you handle it?",
        options: [
            "I talk to someone about it.",
            "I keep it to myself and try to move on.",
            "I bottle up my emotions and feel worse."
        ],
        answer: 0,
        category: 'relationships' // Question related to relationships
    },
    {
        question: "How often do you take a moment to relax or meditate?",
        options: [
            "Daily, I make time for it.",
            "Occasionally, when I remember.",
            "I don’t usually make time for relaxation."
        ],
        answer: 0,
        category: 'mindfulness' // Question related to mindfulness
    },
    {
        question: "When you're feeling overwhelmed, what do you do?",
        options: [
            "I take a break and regroup.",
            "I push through without stopping.",
            "I panic and don’t know what to do."
        ],
        answer: 0,
        category: 'stress' // Question related to stress
    },
    {
        question: "How do you feel about your relationships with others?",
        options: [
            "They are positive and supportive.",
            "They are okay, but I don’t feel fully connected.",
            "They cause me stress or discomfort."
        ],
        answer: 0,
        category: 'relationships' // Question related to relationships
    },
    {
        question: "When you're having a disagreement, how do you react?",
        options: [
            "I listen calmly and try to understand the other person.",
            "I become defensive and argue.",
            "I avoid the situation or leave the conversation"
        ],
        answer: 0,
        category: 'relationships' // Question related to relationships
    },
    {
        question: "When you're alone, how do you feel?",
        options: [
            "Comfortable and at peace with myself.",
            "I feel a bit lonely but manage.",
            "I feel disconnected and uncomfortable."
        ],
        answer: 0,
        category: 'mindfulness' // Question related to mindfulness
    }
];

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="question${currentQuestionIndex}" value="${index}"> ${option}`;
        optionsContainer.appendChild(label);
    });

    document.getElementById('question-number').textContent = currentQuestionIndex + 1;

    const progress = (currentQuestionIndex / (questions.length - 1)) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function handleNextQuestion() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);

    if (selectedOption) {
        if (parseInt(selectedOption.value) === questions[currentQuestionIndex].answer) {
            score++;
        }

        // Increment the category score based on selected answer
        const category = questions[currentQuestionIndex].category;
        if (parseInt(selectedOption.value) === 0) {
            categories[category]++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    } else {
        alert("Please select an answer!");
    }
}

function showResult() {
    document.querySelector('.question-container').style.display = 'none';
    const resultSection = document.getElementById('result-section');
    resultSection.style.display = 'block';

    document.getElementById('score').textContent = `Your score: ${score} out of ${questions.length}`;
    const percentage = (score / questions.length) * 100;
    document.getElementById('score-fill').style.width = percentage + '%';

    let resultMessage = '';
    if (score === questions.length) {
        resultMessage = "Excellent! You have a strong mindfulness practice, and you are in good balance with your body, mind, and relationships.";
    } else if (score >= 7) {
        resultMessage = "Good! You have a solid understanding of mindfulness and are doing well in managing your body, mind, and relationships.";
    } else if (score >= 4) {
        resultMessage = "Okay! You're doing alright, but there are some areas where you can improve your mindfulness practices and your connection with others.";
    } else {
        resultMessage = "Try to incorporate more mindfulness practices into your routine. Focus on being present in your body and relationships, and give more attention to self-reflection.";
    }

    document.getElementById('result').textContent = resultMessage;

    // Draw a single donut chart for all categories
    drawSingleCategoryChart();
}

function drawSingleCategoryChart() {
    const stressPercentage = (categories.stress / 5) * 100;
    const bodyHealthPercentage = (categories.bodyHealth / 5) * 100;
    const mindfulnessPercentage = (categories.mindfulness / 5) * 100;
    const relationshipPercentage = (categories.relationships / 5) * 100;

    const ctx = document.createElement('canvas');
    document.getElementById('result').appendChild(ctx);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Stress', 'Body Health', 'Mindfulness', 'Relationships'],
            datasets: [{
                data: [stressPercentage, bodyHealthPercentage, mindfulnessPercentage, relationshipPercentage],
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            cutoutPercentage: 60,
            plugins: {
                tooltip: {
                    enabled: true
                },
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

function restartGame() {
    score = 0;
    categories.stress = 0;
    categories.bodyHealth = 0;
    categories.mindfulness = 0;
    categories.relationships = 0;
    currentQuestionIndex = 0;
    document.querySelector('.question-container').style.display = 'block';
    document.getElementById('result-section').style.display = 'none';
    displayQuestion();
}

document.getElementById('next-button').addEventListener('click', handleNextQuestion);

displayQuestion();