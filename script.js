const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperloop Machine Language", "None"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: "Django"
  },
  {
    
  question: "Which tag is used for inserting a line break in HTML?",
  options: ["&lt;br&gt;", "&lt;lb&gt;", "&lt;break&gt;", "&lt;line&gt;"],
  answer: "&lt;br&gt;"


  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheet", "Colorful Style Structure"],
    answer: "Cascading Style Sheets"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const quizDiv = document.getElementById("quiz");
const resultP = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");

function loadQuestion(index) {
  quizDiv.innerHTML = "";
  const q = questions[index];
  const div = document.createElement("div");
  div.innerHTML = `<p><strong>Q${index + 1}. ${q.question}</strong></p>` +
    q.options.map(opt =>
      `<label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br>`
    ).join("");
  quizDiv.appendChild(div);
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      finishQuiz();
    }
  }, 1000);
}

function finishQuiz() {
  quizDiv.innerHTML = "";
  nextBtn.style.display = "none";
  let feedback = "";

  if (score === questions.length) {
    feedback = "🎉 Excellent! Perfect score!";
  } else if (score >= 3) {
    feedback = "👍 Good job!";
  } else {
    feedback = "💡 Needs improvement. Keep practicing!";
  }

  resultP.innerHTML = `You scored <strong>${score} out of ${questions.length}</strong>.<br>${feedback}`;
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
  if (selected && selected.value === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion(currentQuestion);
  } else {
    clearInterval(timer);
    finishQuiz();
  }
});

// Initial load
loadQuestion(currentQuestion);
startTimer();
