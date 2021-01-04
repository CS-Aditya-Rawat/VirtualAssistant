const addAnswer = (Main, text) =>
{
    Main.innerHTML += `
    <div class="row">
        <div class="chat answer">${text}</div>
    </div>
    `;
};

const addQuestion = (Main,text) =>
{
    Main.innerHTML += `
        <div class="row">
            <div class="chat question">${text}</div>
        </div>
    `;
};

const voice_btn = document.querySelector('#btn');
const write_btn = document.querySelector('#question');

var recognition = new webkitSpeechRecognition();
recognition.continous = false;
recognition.lang = 'en-us';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const synth = window.speechSynthesis;

voice_btn.addEventListener("click", () => {
	recognition.start();
});

write_btn.addEventListener("keypress", (e) => {
	
	if(e.key == 'Enter'){
		var content = document.querySelector(".command").innerText;
		console.log(content);
	// 	recognition.start();
	}
	
});

recognition.onresult = (e) => {
	const Main = document.querySelector('main');
	const transcript = e.results[0][0].transcript;
	addQuestion(Main, transcript);
	if(transcript == 'hello'){
		const utter = new SpeechSynthesisUtterance("Hi, How are you");
		synth.speak(utter);
		addAnswer(Main, utter.text);
	}
};
