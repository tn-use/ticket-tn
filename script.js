function openScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function closeScreen() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('home').classList.add('active');
}

// TTS 기능 (웹 Speech API)
function speakText() {
  const text = document.getElementById('ttsInput').value;
  const lang = document.getElementById('langSelect').value;
  if (!text) return alert("텍스트를 입력하세요!");
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = lang;
  window.speechSynthesis.speak(msg);
}

function resetTTS() {
  document.getElementById("ttsInput").value = "";
  window.speechSynthesis.cancel();
  document.getElementById("ttsPlayer").src = "";
}

// 디데이 계산기
function calcDDay() {
  const year = parseInt(document.getElementById("yearInput").value);
  const month = parseInt(document.getElementById("monthInput").value) - 1;
  const day = parseInt(document.getElementById("dayInput").value);
  if (!year || !month || !day) return alert("년, 월, 일을 모두 입력하세요!");

  const today = new Date();
  const target = new Date(year, month, day);
  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  document.getElementById("ddayResult").innerText = `D-${diffDays}`;
  document.getElementById("resetDDay").disabled = false;
}

function resetDDay() {
  document.getElementById("yearInput").value = "";
  document.getElementById("monthInput").value = "";
  document.getElementById("dayInput").value = "";
  document.getElementById("ddayResult").innerText = "";
  document.getElementById("resetDDay").disabled = true;
}

// 발권 끊기
function generateTicket() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("ticketResult").innerText = randomNum;
}

// STT 기능 (웹 SpeechRecognition API)
function startSTT() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "ko-KR";
  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("sttResult").innerText = transcript;
  };
}

function copySTT() {
  const text = document.getElementById("sttResult").innerText;
  if (!text) return alert("복사할 텍스트가 없습니다.");
  navigator.clipboard.writeText(text);
  alert("복사되었습니다!");
}