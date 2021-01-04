const D = window.document;

const element = selector => D.querySelector(selector);

D.addEventListener("DOMContentLoaded",()=>{
    const Main = element("main");
    const Askbtn = element("button");
		const Question = element("input");
		Askbtn.addEventListener("click",function(){
			const Text = Question.value;
			if(Text.length)
			{
				addQuestion(Main, Text);
				Question.value = "";		
			}
			
	});
});

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

const srtbtn = document.querySelector('#btn');

var recognition = new webkitSpeechRecognition();
recognition.continous = false;
recognition.lang = 'en-us';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const synth = window.speechSynthesis;

srtbtn.addEventListener("click", (e) => {
	recognition.start();
});

recognition.onresult = (e) => {
	const transcript = e.results[0][0].transcript;
	addQuestion(transcript);
	if(transcript == 'hello'){
		const utter = new SpeechSynthesisUtterance("Hi, How are you");
		synth.speak(utter);
		addAnswer(Main, utter.text);
	}
};