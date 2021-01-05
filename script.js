const D = window.document;
const element = selector => D.querySelector(selector);

const videoSearch = (key, search, maxResults) => {
			$.get("https://www.googleapis.com/youtube/v3/search?key="+ key
			+"&type=video&part=snippet&maxResult=" + maxResults + "&q=" + search, function(data) {
				console.log(data);
		
				data.items.forEach(item => {
					video = `
						<iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="1" allowfullscreen></iframe>
					` 
					$("#videos").append(video)
				});
			});
		};

const weatherData = (key, cityName) => {
	$.get("api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid="+ key, function(data){
		console.log(data);
	})
};

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

var input = document.getElementById("question");

input.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById("wrtBtn").click();
  }
});

recognition.onresult = (e) => {
	const Main = document.querySelector('main');
	const transcript = e.results[0][0].transcript;
	const words = transcript.split(" ");
	console.log(words);
	addQuestion(Main, transcript);

	if(transcript == 'hello'){
		const utter = new SpeechSynthesisUtterance("Hi, How are you");
		synth.speak(utter);
		addAnswer(Main, utter.text);
	} 
	else if(
		words.includes('video')
		// words.forEach((word)=>{
		// 	word == 'video';
		// })
	){
		console.log("HEllo");
		// $(document).ready(function(){
		// 	const API_KEY = "AIzaSyA7qnrGy4J8JaB6Op-2ib1la5_MaUwVqUU"
		
		// 	var video = '';
		// 	var videos = $("#videos");
		// 	$("#form").submit(function (event) {
		// 		event.preventDefault();
		// 		var search = $("#search").val()
		// 		videoSearch(API_KEY, search, 100);
		// 	});
		// });
		
	}
	// else if()
	// {
	// 	const api_key = "668e95bfc9414269499a7ba975a1f2db"
	// }
};

D.addEventListener("DOMContentLoaded",()=>{
    const Main = element("main");
    const Askbtn = element("button");
		const Question = element("input");
		Askbtn.addEventListener("click",function(){
			const Text = Question.value;
			if(Text.length)
			{
				addQuestion(Main, Text);
				if(Question.value == 'hello'){
					const utter = new SpeechSynthesisUtterance("Hi, How are you");
					synth.speak(utter);
					addAnswer(Main, "Hi, How are you");
				}
				Question.value = "";
			}	
	});
});
