function search() {
  const query = document.querySelector('.search-bar input').value;
  window.location.href = `search-results.html?query=${query}`;
}

function login(event) {
  event.preventDefault();
  alert('로그인되었습니다.');
  window.location.href = 'index.html';
}

function signup(event) {
  event.preventDefault();
  alert('회원가입이 완료되었습니다.');
  window.location.href = 'login.html';
}

// 질문 목록을 동적 추가 함수
function submitQuestion(event) {
event.preventDefault();

// 제목과 내용 가져오기
const title = document.getElementById("questionTitle").value;
const content = document.getElementById("questionContent").value;

// 새로운 질문 요소 생성
const questionList = document.getElementById("questions");
const questionItem = document.createElement("li");
questionItem.innerHTML = `<strong>${title}</strong><p>${content}</p>`;
questionList.appendChild(questionItem);

// 입력 필드 초기화
document.getElementById("questionTitle").value = '';
document.getElementById("questionContent").value = '';
}


// 지역명과 행정동 코드 매핑 객체
const locationCodeMap = {
"서울": "1100000000",
"부산": "2600000000",
"대구": "2700000000",
// 필요한 다른 지역과 행정동 코드 추가
};

// 링크와 iframe 업데이트 함수
function updateWeatherLink() {
const locationInput = document.getElementById("location-input").value.trim();
const weatherIframe = document.getElementById("weather-iframe");
const weatherLink = document.getElementById("weather-link");

// 입력한 지역명에 해당하는 행정동 코드 찾기
const code = locationCodeMap[locationInput];

if (code) {
  // 행정동 코드가 있는 경우 새 URL 생성
  const newUrl = `https://www.weather.go.kr/w/obs-climate/land/city-obs.do?code=${code}`;
  
  // 링크와 iframe의 src 업데이트
  weatherLink.href = newUrl;
  weatherIframe.src = newUrl;
} else {
  // 코드가 없는 경우 기본 URL로 유지
  alert("해당 지역의 정보를 찾을 수 없습니다. 다른 지역명을 입력하세요.");
  weatherLink.href = "https://www.weather.go.kr/w/index.do";
  weatherIframe.src = "https://www.weather.go.kr/w/index.do";
}
}

/// 퀴즈 데이터 및 정답 추가
const quizzes = {
love: [
  { question: "사랑이란 무엇인가?", options: ["감정", "의무", "친절"], answer: "감정" },
  { question: "사랑의 다른 말은?", options: ["증오", "우정", "호감"], answer: "호감" },
  { question: "첫사랑에 대한 당신의 생각은?", options: ["아련함", "무관심", "분노"], answer: "아련함" }
],
friendship: [
  { question: "진정한 친구란 무엇인가?", options: ["이익", "신뢰", "사치"], answer: "신뢰" },
  { question: "우정을 유지하기 위한 방법은?", options: ["경쟁", "이기심", "소통"], answer: "소통" },
  { question: "친구를 사귀는 방법은?", options: ["배려", "독점", "무시"], answer: "배려" }
],
history: [
  { question: "가장 오래된 문명은?", options: ["이집트", "그리스", "메소포타미아"], answer: "메소포타미아" },
  { question: "고대 이집트의 주요 강은?", options: ["나일강", "황하", "아마존강"], answer: "나일강" },
  { question: "세계대전의 시작 년도는?", options: ["1914", "1939", "1945"], answer: "1914" }
]
};

let currentQuiz = quizzes.love; // 기본 퀴즈
let questionIndex = 0;
let userAnswers = []; // 사용자가 선택한 답변 저장

// 퀴즈 선택
function selectQuiz(quizName) {
currentQuiz = quizzes[quizName];
questionIndex = 0;
userAnswers = [];
displayQuestion();
}

// 질문 표시
function displayQuestion() {
const questionData = currentQuiz[questionIndex];
document.getElementById("quizQuestion").textContent = questionData.question;

// 보기 항목 표시
const answerOptions = document.getElementById("answerOptions");
answerOptions.innerHTML = "";
questionData.options.forEach(option => {
  const button = document.createElement("button");
  button.textContent = option;
  button.onclick = () => selectAnswer(option);
  answerOptions.appendChild(button);
});

// 마지막 질문일 때 제출 버튼 표시
document.querySelector(".next-btn").style.display = questionIndex < currentQuiz.length - 1 ? "inline" : "none";
document.querySelector(".submit-btn").style.display = questionIndex === currentQuiz.length - 1 ? "inline" : "none";
}

// 답변 선택 저장
function selectAnswer(answer) {
userAnswers[questionIndex] = answer;
}

// 다음 질문 표시
function nextQuestion() {
if (questionIndex < currentQuiz.length - 1) {
  questionIndex++;
  displayQuestion();
}
}

// 퀴즈 제출 후 채점
function submitQuiz() {
let score = 0;
currentQuiz.forEach((questionData, index) => {
  if (userAnswers[index] === questionData.answer) {
    score++;
  }
});

alert(`총 점수: ${score}점 / ${currentQuiz.length}점`);
}

// 검색 기능
function search() {
const query = document.querySelector('.search-bar input').value;
window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
}