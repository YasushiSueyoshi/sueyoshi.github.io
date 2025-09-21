document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const menuButtons = document.querySelectorAll('.menu-btn');
    const nextButton = document.getElementById('next-button');
    const restartButton = document.getElementById('restart-button');

    const questionCounter = document.getElementById('question-counter');
    const questionCategory = document.getElementById('question-category');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const feedbackText = document.getElementById('feedback-text');
    const feedbackExplanation = document.getElementById('feedback-explanation');
    const feedbackSource = document.getElementById('feedback-source');
    const scoreText = document.getElementById('score-text');
    const resultMessage = document.getElementById('result-message');

    const backToMenuButton = document.getElementById('back-to-menu-btn');

    let allQuestions = [];
    let currentQuizQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // Load questions from JSON
    fetch('questions.json')
        .then(res => res.json())
        .then(data => {
            allQuestions = data;
        })
        .catch(err => {
            console.error('Error loading questions:', err);
            alert('問題の読み込みに失敗しました。');
        });

    // Add event listeners to menu buttons
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            startQuiz(category);
        });
    });

    function startQuiz(category) {
        score = 0;
        currentQuestionIndex = 0;

        if (category === 'all') {
            currentQuizQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
        } else {
            currentQuizQuestions = allQuestions
                .filter(q => q.category === category)
                .sort(() => Math.random() - 0.5);
        }
        
        if (currentQuizQuestions.length === 0) {
            alert('このカテゴリの問題はありません。');
            return;
        }

        startScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        if (currentQuestionIndex < currentQuizQuestions.length) {
            showQuestion(currentQuizQuestions[currentQuestionIndex]);
        } else {
            showResults();
        }
    }

    function showQuestion(question) {
        questionCounter.innerText = `問題 ${currentQuestionIndex + 1} / ${currentQuizQuestions.length}`;
        questionCategory.innerText = question.category;
        questionText.innerText = question.question;

        question.answers.forEach(answerText => {
            const button = document.createElement('button');
            button.innerText = answerText;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => selectAnswer(button, question));
            answerButtons.appendChild(button);
        });
    }

    function resetState() {
        nextButton.classList.add('hidden');
        feedbackText.innerText = '';
        feedbackExplanation.innerText = '';
        feedbackSource.innerText = '';
        feedbackText.classList.remove('correct', 'wrong');
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(selectedButton, question) {
        const isCorrect = selectedButton.innerText === question.correctAnswer;

        if (isCorrect) {
            score++;
            feedbackText.innerText = '正解！';
            feedbackText.classList.add('correct');
        } else {
            feedbackText.innerText = `不正解... 正解は「${question.correctAnswer}」`;
            feedbackText.classList.add('wrong');
        }

        feedbackExplanation.innerText = question.explanation;
        feedbackSource.innerText = `出題元: ${question.source}`;

        Array.from(answerButtons.children).forEach(button => {
            if (button.innerText === question.correctAnswer) {
                button.classList.add('correct');
            } else if (button === selectedButton) {
                button.classList.add('wrong');
            }
            button.disabled = true;
        });

        nextButton.classList.remove('hidden');
    }

    function showResults() {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        scoreText.innerText = `${currentQuizQuestions.length}問中 ${score}問正解`;

        const percentage = (score / currentQuizQuestions.length) * 100;
        if (percentage >= 90) {
            resultMessage.innerText = '素晴らしい！完璧です。自信を持って試験に臨みましょう！';
        } else if (percentage >= 70) {
            resultMessage.innerText = '良い調子です！合格圏内です。間違えた問題を復習して完璧を目指しましょう。';
        } else {
            resultMessage.innerText = 'お疲れ様でした。合格まであと一歩。繰り返し挑戦して知識を定着させましょう。';
        }
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    restartButton.addEventListener('click', goToStartScreen);

    backToMenuButton.addEventListener('click', goToStartScreen);

    function goToStartScreen() {
        resultScreen.classList.add('hidden');
        quizScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }
});