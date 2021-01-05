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

		
const currTime = () => {
	let hours = addZero(today.getHours());
	let minutes = addZero(today.getMinutes());
	let seconds = addZero(today.getSeconds());

	let curr_time = `${hours}:${minutes}:${seconds}`;
}

function addZero(num){
	return num < 10 ? `0${num}`:num;
}

const weatherData = (key, cityName) => {
	$.get("api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid="+ key, function(data){
		console.log(data);
	})
};

const giveWeather = (Main, text,temp,disc,icon) => {
	Main.innerHtml += `
	<div class="row">
        <div class="chat answer">${text}<br><b>${temp}</b><br><b>${disc}</b><img src="${icon}"></div>
    </div>
	`
}

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

	//--------------------Greeting
	if(transcript == 'hello'){
		const utter = new SpeechSynthesisUtterance("Hi, How are you");
		synth.speak(utter);
		addAnswer(Main, utter.text);
	} 

	//----------------------Youtube Videos
	else if(words.includes('play' && 'video'))
	{
		let utter = new SpeechSynthesisUtterance("Result From Youtube are :")
		//Show Youtube videos
		stringWithCommas = (words.slice(2)).toString();
		var stringWithoutCommas = stringWithCommas.replace(/,/g, '+');
		console.log(stringWithoutCommas);
		const API_KEY = "AIzaSyA7qnrGy4J8JaB6Op-2ib1la5_MaUwVqUU";
		synth.speak(utter);
		addAnswer(Main, "For more click below", videoSearch(API_KEY, stringWithoutCommas, 10));

		//URL for search on youtube main Page
		let url = "https://www.youtube.com/results?search_query="+stringWithoutCommas;

		let utter2 = new SpeechSynthesisUtterance("For more click me ")
		synth.speak(utter2);
		
		
		
	}

	// --------------------WEATHER API
	else if(words.includes('weather' && 'at'))
	{
		cityName = words[2];
		function weatherBalloon( cityName ) {
			var key = '668e95bfc9414269499a7ba975a1f2db';
			fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName+'&units=imperial&appid=' + key)  
			.then(function(resp) { return resp.json() }) // Convert data to json
			.then(function(data) {
			  let temp = data.main.temp;
			  let disc = data.weather[0].main;
			  let icon = data.weather[0].icon;
			  console.log(temp)
			  console.log(disc)
			  giveWeather(Main, 'The temperature is', temp, disc, icon);
			})
			.catch(function() {
			  // catch any errors
			});
		  }
		  weatherBalloon(cityName);
	}
	else if(words.includes('joke'))
	{
		async function getJoke(){
			const jokedata = await fetch('https://icanhazdadjoke.com/', {
				headers: {
					'Accept': 'application/json'
				}
			});
			const jokeObj = await jokedata.json();
			console.log(jokeObj.joke);
		}
		getJoke();
	}
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
