document.addEventListener('DOMContentLoaded', () => {
    // HTML element references
    const quizContent = document.getElementById('quiz-content');
    const quizFinishedScreen = document.getElementById('quiz-finished-screen');
    const restartBtn = document.getElementById('restart-btn');
    const reviewContainer = document.getElementById('review-container');

    const questionNumberEl = document.getElementById('question-number');
    const questionEl = document.getElementById('question');
    const optionsContainerEl = document.getElementById('options-container');
    const skipBtn = document.getElementById('skip-btn');
    const nextBtn = document.getElementById('next-btn');
    const explanationContainer = document.getElementById('explanation-container');
    const resultEl = document.getElementById('result');
    const explanationEl = document.getElementById('explanation');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    let allQuestions = [];
    let shuffledQuestions = [];
    let currentQuestionIndex = 0;
    let selectedOption = null;
    let incorrectAnswers = []; // Array to store incorrect answers

    // Asynchronously load question data from the external JSON file
    async function loadQuestions() {
        try {
            const response = await fetch('data/questions.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allQuestions = await response.json();
            startGame();
        } catch (error) {
            console.error('Failed to load quiz data:', error);
            questionEl.textContent = 'クイズデータの読み込みに失敗しました。';
        }
    }

    // Start the quiz
    function startGame() {
        incorrectAnswers = []; // Reset incorrect answers
        quizContent.style.display = 'block';
        quizFinishedScreen.style.display = 'none';

        if (!allQuestions || allQuestions.length === 0) {
            questionEl.textContent = '問題データを読み込めませんでした。';
            return;
        }
        shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 60);
        
        if (shuffledQuestions.length < 60) {
             questionEl.textContent = `問題が60問に満たないため、開始できません。(全${allQuestions.length}問)`;
             optionsContainerEl.innerHTML = '';
             skipBtn.style.display = 'none';
             nextBtn.style.display = 'none';
             return;
        }

        currentQuestionIndex = 0;
        displayQuestion();
    }

    // Display a question or end screen
    function displayQuestion() {
        if (currentQuestionIndex >= shuffledQuestions.length) {
            quizContent.style.display = 'none';
            quizFinishedScreen.style.display = 'block';
            displayReview(); // Display the review section
            return;
        }

        explanationContainer.style.display = 'none';
        skipBtn.style.display = 'inline-block';
        nextBtn.style.display = 'inline-block';
        nextBtn.disabled = true;
        selectedOption = null;

        const questionData = shuffledQuestions[currentQuestionIndex];
        questionNumberEl.textContent = `問題 ${currentQuestionIndex + 1} / ${shuffledQuestions.length}`;
        questionEl.textContent = questionData.question;
        optionsContainerEl.innerHTML = '';

        questionData.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = `${['①', '②', '③', '④'][index]} ${option}`;
            button.dataset.index = index;
            button.addEventListener('click', handleOptionSelect);
            optionsContainerEl.appendChild(button);
        });
    }

    // Display the review of incorrect answers
    function displayReview() {
        reviewContainer.innerHTML = ''; // Clear previous review

        if (incorrectAnswers.length > 0) {
            const reviewTitle = document.createElement('h2');
            reviewTitle.textContent = '間違えた問題の復習';
            reviewTitle.style.textAlign = 'left';
            reviewContainer.appendChild(reviewTitle);

            incorrectAnswers.forEach((item, index) => {
                const reviewItem = document.createElement('div');
                reviewItem.style.borderTop = '1px solid #eee';
                reviewItem.style.padding = '15px 0';
                reviewItem.style.textAlign = 'left';

                const qText = document.createElement('p');
                qText.innerHTML = `<strong>問題 ${index + 1}:</strong> ${item.question}`;

                const userAnswerText = document.createElement('p');
                userAnswerText.innerHTML = `<strong>あなたの回答:</strong> <span style="color: #dc3545;">${['①', '②', '③', '④'][item.userAnswerIndex]} ${item.options[item.userAnswerIndex]}</span>`;

                const correctAnswerText = document.createElement('p');
                correctAnswerText.innerHTML = `<strong>正解:</strong> <span style="color: #28a745;">${['①', '②', '③', '④'][item.correctAnswerIndex]} ${item.options[item.correctAnswerIndex]}</span>`;

                const explanationText = document.createElement('p');
                explanationText.innerHTML = `<strong>解説:</strong><br>${item.explanation.replace(/\n/g, '<br>')}`;
                explanationText.style.backgroundColor = '#f8f9fa';
                explanationText.style.padding = '10px';
                explanationText.style.borderRadius = '5px';
                explanationText.style.marginTop = '10px';

                reviewItem.appendChild(qText);
                reviewItem.appendChild(userAnswerText);
                reviewItem.appendChild(correctAnswerText);
                reviewItem.appendChild(explanationText);

                reviewContainer.appendChild(reviewItem);
            });

            const bottomRestartBtn = document.createElement('button');
            bottomRestartBtn.textContent = 'もう一度チャレンジする';
            bottomRestartBtn.className = 'next-btn'; // Reuse existing style
            bottomRestartBtn.style.width = '250px';
            bottomRestartBtn.style.marginTop = '30px';
            bottomRestartBtn.addEventListener('click', startGame);
            reviewContainer.appendChild(bottomRestartBtn);
        }
    }

    // Handle option selection
    function handleOptionSelect(e) {
        Array.from(optionsContainerEl.children).forEach(btn => {
            btn.classList.remove('selected');
        });
        selectedOption = e.currentTarget;
        selectedOption.classList.add('selected');
        nextBtn.disabled = false;
    }

    // Show the answer and explanation
    function showAnswer(isSkipped = false) {
        const questionData = shuffledQuestions[currentQuestionIndex];
        
        Array.from(optionsContainerEl.children).forEach(btn => {
            btn.disabled = true;
        });

        if (isSkipped) {
            resultEl.textContent = 'スキップしました';
            resultEl.className = 'skipped';
        } else {
            const selectedIndex = parseInt(selectedOption.dataset.index, 10);
            if (selectedIndex === questionData.answer) {
                resultEl.textContent = '正解！';
                resultEl.className = 'correct';
                selectedOption.classList.add('correct');
            } else {
                resultEl.textContent = '不正解...';
                resultEl.className = 'wrong';
                selectedOption.classList.add('wrong');
                // Record incorrect answer
                incorrectAnswers.push({
                    question: questionData.question,
                    options: questionData.options,
                    explanation: questionData.explanation,
                    correctAnswerIndex: questionData.answer,
                    userAnswerIndex: selectedIndex
                });
            }
        }
        
        if (!optionsContainerEl.children[questionData.answer].classList.contains('correct')) {
            optionsContainerEl.children[questionData.answer].classList.add('correct');
        }
        
        const explanationQuestionEl = document.getElementById('explanation-question');
        if (explanationQuestionEl) {
            explanationQuestionEl.style.display = 'none';
        }
        
        explanationEl.innerHTML = ''; 

        const strong = document.createElement('strong');
        strong.textContent = `正解は ${['①', '②', '③', '④'][questionData.answer]} ${questionData.options[questionData.answer]}`;
        
        explanationEl.appendChild(strong);
        explanationEl.appendChild(document.createElement('br'));
        explanationEl.appendChild(document.createElement('br'));

        const explanationLines = questionData.explanation.split('\n');
        explanationLines.forEach((line, index) => {
            explanationEl.appendChild(document.createTextNode(line.trim()));
            if (index < explanationLines.length - 1) {
                explanationEl.appendChild(document.createElement('br'));
            }
        });
        
        skipBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        explanationContainer.style.display = 'block';
    }

    // Move to the next question
    function goToNextQuestion() {
        currentQuestionIndex++;
        displayQuestion();
    }

    // Set up event listeners
    nextBtn.addEventListener('click', () => showAnswer(false));
    skipBtn.addEventListener('click', () => showAnswer(true));
    nextQuestionBtn.addEventListener('click', goToNextQuestion);
    restartBtn.addEventListener('click', startGame);
    
    // Initial load
    loadQuestions();
});