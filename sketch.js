let radio;
let submitButton;
let questionIndex = 0;
let questions = [];
let correctAnswers = 0;
let wrongAnswers = 0;
let result = "";

function preload() {
  // Load the CSV file
  questions = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupQuestion();
}

function setupQuestion() {
  if (questionIndex < questions.getRowCount()) {
    let row = questions.getRow(questionIndex);
    let question = row.get('question');
    let options = row.get('options').split(';');
    let correctAnswer = row.get('correctAnswer');
    
    // 清除之前的選項和按鈕
    if (radio) radio.remove();
    if (submitButton) submitButton.remove();
    
    radio = createRadio();
    radio.style('font-size', '20px'); // 放大選項字體
    options.forEach(option => radio.option(option));
    radio.position(width / 2 - 50, height / 2 - 20);
    
    submitButton = createButton('Submit');
    submitButton.style('font-size', '20px'); // 放大按鈕字體
    submitButton.position(width / 2 - 20, height / 2 + 50);
    submitButton.mousePressed(() => checkAnswer(correctAnswer));
    
    result = "";
  } else {
    result = `測驗結束！答對: ${correctAnswers} 題，答錯: ${wrongAnswers} 題`;
  }
}

function draw() {
  background('#f5ebe0'); // 設置背景顏色
  textAlign(CENTER);
  textSize(24); // 放大問題和結果字體
  if (questionIndex < questions.getRowCount()) {
    let question = questions.getString(questionIndex, 'question');
    text(question, width / 2, height / 2 - 20);
  }
  text(result, width / 2, height / 2 + 100);
  
  // 顯示左上角的文字
  textAlign(LEFT);
  textSize(20); // 放大左上角的文字
  text("413730481 張瑋玲", 10, 20);
}

function checkAnswer(correctAnswer) {
  let selected = radio.value();
  if (selected === correctAnswer) {
    correctAnswers++;
    result = "Correct!";
  } else {
    wrongAnswers++;
    result = "Wrong!";
  }
  questionIndex++;
  setupQuestion();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
