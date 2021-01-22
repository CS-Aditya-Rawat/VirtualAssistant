const D = window.document;
const element = (selector) => D.querySelector(selector);

const Main = document.querySelector("main");
const newsApi = "12855d62b27b40339cb86cc21f36112b";
// hello => Hi, how are you?
// Youtube Video
// Take a Screenshot
// Weather
// News
// Games
// Quotes

//Modal Popup

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn2 = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn2.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
const videoSearch = (key, search, maxResults) => {
	$.get(
		"https://www.googleapis.com/youtube/v3/search?key=" +
		key +
		"&type=video&part=snippet&maxResult=" +
		maxResults +
		"&q=" +
		search,
		function (data) {
			console.log(data);

			data.items.forEach((item) => {
				video = `
						<iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="1" allowfullscreen></iframe>
					`;
				$("#videos").append(video);
			});
		}
	);
};

// D.addEventListener("DOMContentLoaded", () => {
// 	const Main = element("main");
// 	const Askbtn = element("button");
// 	const Question = element("input");
// 	Askbtn.addEventListener("click", function () {
// 		const Text = Question.value;
// 		if (Text.length) {
// 			Question.value = "";
// 		}
// 		addQuestion(Main, Text);
// 		if (Question.value == "hello") {
// 			const utter = new SpeechSynthesisUtterance("Hi, How are you");
// 			synth.speak(utter);
// 			addAnswer(Main, "Hi, How are you");
// 		}
// 	});
// });

async function downloadScreenshot() {
	var URL = $("#ssurl").val();
	console.log(URL);
	const Token = "LAWCQV7YTKNT7PTFJXVSPR3IDT28BDJP";
	var url =
		"https://screenshotapi.net/api/v1/screenshot?token=" +
		Token +
		"&url=" +
		URL;
	$("#ssimg").css("display", "block");
	$.get(url, function (data) {
		console.log(data);
		$("#ssimg").attr("src", data.screenshot);
	});
	$("#ssform").css("display", "none");
}

const currTime = () => {
	let hours = addZero(today.getHours());
	let minutes = addZero(today.getMinutes());
	let seconds = addZero(today.getSeconds());

	let curr_time = `${hours}:${minutes}:${seconds}`;
};

function addZero(num) {
	return num < 10 ? `0${num}` : num;
}

const weatherData = (key, cityName) => {
	$.get(
		"api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key,
		function (data) {
			console.log(data);
		}
	);
};

const giveWeather = (Main, text, temp, disc, icon) => {
	Main.innerHtml += `
	<div class="row">
        <div class="chat answer">${text}<br><b>${temp}</b><br><b>${disc}</b><img src="${icon}"></div>
    </div>
	`;
};

const addAnswer = (Main, text) => {
	Main.innerHTML += `
    <div class="row">
        <div class="chat answer">${text}</div>
    </div>
    `;
};

const addQuestion = (Main, text) => {
	Main.innerHTML += `
        <div class="row">
            <div class="chat question">${text}</div>
        </div>
    `;
};
// async function showNews() {
// 	var query = $("#newsQuery").val();


// }
const voice_btn = document.querySelector("#btn");
const write_btn = document.querySelector("#question");

var recognition = new webkitSpeechRecognition();
recognition.continous = false;
recognition.lang = "en-us";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const synth = window.speechSynthesis;

voice_btn.addEventListener("click", () => {
	recognition.start();
});

var input = document.getElementById("question");

// input.addEventListener("keyup", function (event) {
// 	if (event.key === "Enter") {
// 		event.preventDefault();
// 		document.getElementById("btn").click();
// 	}
// });
document.onkeypress = function (e) {
    if (e.keyCode == 32) {
        e.preventDefault();
		document.getElementById("btn").click();
    }
}

function newsballon2() {
	fetch(
		"https://gnews.io/api/v4/top-headlines?lang=en&country=in&token=86b49fc2afe26b20fdf037ede41c2676"
	)
		.then(function (resp) {
			return resp.json();
		})
		.then(function (data) {
			console.log(data);
			var i;
			for (i = 5; i < 10; i++) {

				let title2 = data.articles[i].title;
				let descrip2 = data.articles[i].description;
				let img2 = data.articles[i].image;
				let URL = data.articles[i].url;
						addAnswer(
							Main,
							"<img src='" + img2 + "' width='200px' height='100px' class='img'>"+
							"<b><a href='"+URL+"' target='_blank'>" +
							title2 +"</a>"+
							"</b><br><br>" + descrip2 + "<br><br>"
						);
				let utter5 = new SpeechSynthesisUtterance(title2);
				synth.speak(utter5);
			}

		})
		.catch(function () {
			// catch any errors
		});
}
recognition.onresult = (e) => {
	const Main = document.querySelector("main");
	const transcript = e.results[0][0].transcript;
	const words = transcript.split(" ");
	console.log(words);
	addQuestion(Main, transcript);

	//--------------------Greeting
	if (transcript == "hello") {
		const utter = new SpeechSynthesisUtterance("Hi, How are you");
		synth.speak(utter);
		addAnswer(Main, utter.text);
	}

	//----------------------Youtube Videos
	else if (words.includes("play" && "video")) {
		let utter = new SpeechSynthesisUtterance("Result From Youtube are :");
		//Show Youtube videos
		stringWithCommas = words.slice(2).toString();
		var stringWithoutCommas = stringWithCommas.replace(/,/g, "+");
		console.log(stringWithoutCommas);
		const API_KEY = "AIzaSyA7qnrGy4J8JaB6Op-2ib1la5_MaUwVqUU";
		synth.speak(utter);

		//URL for search on youtube main Page
		let url =
			"https://www.youtube.com/results?search_query=" + stringWithoutCommas;
		addAnswer(
			Main,
			"<a href=" + url + " target='_blank'>For more click below</a>",
			videoSearch(API_KEY, stringWithoutCommas, 10)
		);

		let utter2 = new SpeechSynthesisUtterance("For more click me");
		synth.speak(utter2);
	}

	// --------------------WEATHER API
	else if (words.includes("weather" && "at")) {
		cityName = words[2];
		function weatherBalloon(cityName) {
			var key = "668e95bfc9414269499a7ba975a1f2db";
			fetch(
				"https://api.openweathermap.org/data/2.5/weather?q=" +
				cityName +
				"&units=imperial&appid=" +
				key
			)
				.then(function (resp) {
					return resp.json();
				})
				// Convert data to json
				.then(function (data) {
					let temp = data.main.temp;
					let disc = data.weather[0].main;
					var iconcode = data.weather[0].icon;
					var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
					addAnswer(
						Main,
						"The temperature is <br><b>" +
						temp +
						" F</b><br><b>" +
						disc +
						"</b><br><img src='" +
						iconurl +
						"'>"
					);
					let utter4 = new SpeechSynthesisUtterance(
						"The temperature is " +
						parseFloat(((temp - 32) * 5) / 9).toFixed(2) +
						"degree celsius and climate is" +
						disc
					);
					synth.speak(utter4);
				})
				.catch(function () {
					// catch any errors
				});
		}
		weatherBalloon(cityName);
	}

	// --------------------JOKES API
	else if (words.includes("tell" && "joke")) {
		async function getJoke() {
			const jokedata = await fetch("https://icanhazdadjoke.com/", {
				headers: {
					Accept: "application/json",
				},
			});
			const jokeObj = await jokedata.json();
			addAnswer(Main, jokeObj.joke);
			let utter3 = new SpeechSynthesisUtterance(jokeObj.joke);
			synth.speak(utter3);
		}
		getJoke();
	}

	// --------------------SCREENSHOT API
	else if (words.includes("take" && "screenshot")) {
		let utter3 = new SpeechSynthesisUtterance("Please Enter the Url");
		synth.speak(utter3);
		const screenShotPopup = () => {
			$("#ssform").css("display", "block");
		};

		screenShotPopup();
	}

	// --------------------NEWS API
	else if (words.includes("tell" && "news")) {
		// let utter4 = new SpeechSynthesisUtterance("Please Enter some topic for me");
		// synth.speak(utter4);
		// const newsFormPopup = () => {
		// 	$("#newsform").css("display", "block");
		// };
		// newsFormPopup();
		function newsBallon() {
			fetch(
				"https://gnews.io/api/v4/top-headlines?lang=en&country=in&token=86b49fc2afe26b20fdf037ede41c2676"
			)
				.then(function (resp) {
					return resp.json();
				})
				.then(function (data) {
					console.log(data);
					var i;
					for (i = 0; i < 5; i++) {

						let title2 = data.articles[i].title;
						let descrip2 = data.articles[i].description;
						let img2 = data.articles[i].image;
						let URL = data.articles[i].url;
						addAnswer(
							Main,
							"<img src='" + img2 + "' width='200px' height='100px' class='img'>"+
							"<b><a href='"+URL+"' target='_blank'>" +
							title2 +"</a>"+
							"</b><br><br>" + descrip2 + "<br><br>"
						);
						let utter5 = new SpeechSynthesisUtterance(title2);
						synth.speak(utter5);
					}
					addAnswer(
						Main,
						"<button type='button' onclick='newsballon2()'>READ MORE</button>"
					);

				})
				.catch(function () {
					// catch any errors
				});
		}
		newsBallon();


	}
	//----------------DIRECTION ROUTES
	else if (words.includes("direction")) {
		var recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.lang = "en-US";
		recognition.maxAlternatives = 1;

		startPos = words[3];
		desPos = words[5];


		initMap();
	}

	//----------------GAMES
	else if (words.includes("play" && "2048")) {
		window.open( 
			"./2048/game.html", "_blank"); 
	}
	else if (words.includes("play" && "Hangman")) {
		window.open( 
			"./Hangman/hangman.html", "_blank"); 
	}
	else if (words.includes("play" && "stone")) {
		window.open( 
			"./rock-paper-scissor-master/SPS.html", "_blank"); 
	}

	//-------------------QUOTES
	else if (words.includes("tell" && "quotes")) {
		random_number = Math.floor(Math.random() * 1000);

		fetch("https://type.fit/api/quotes")
		  .then(function (response) {
			return response.json();
		  })
		  .then(function (data) {
			console.log(data[random_number].text);
			console.log(data[random_number].author);

			addAnswer(
				Main,
				data[random_number].text+"<br><br>By:-"+data[random_number].author
			);
			let utter6 = new SpeechSynthesisUtterance(data[random_number].text+"By"+data[random_number].author);
			synth.speak(utter6);
		  });
	}
};



