const D = window.document;
const element = (selector) => D.querySelector(selector);

const Main = document.querySelector("main");
const newsApi = "12855d62b27b40339cb86cc21f36112b";
// hello => Hi, how are you?
// Youtube Video
// Take a Screenshot
// Weather
// News
// breaking-news, world, nation, business, technology, entertainment, sports, science and health.
// Games
// Quotes
// Books

//Modal Popup

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn2 = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn2.onclick = function () {
	modal.style.display = "block";
	mainNav.classList.remove('active');
	btn.classList.remove('fa-close');
	btn.classList.add('fa-bars');
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
}

// form.onclick = function () {
// 	form.style.display = "none";
// }

// formn.onclick = function () {
// 	formn.style.display = "none";
// }


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
		// formn.style.display = "none";
	}
}



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
function calculateRouteFromAtoB(
	platform,
	originLat,
	originLon,
	destinationLat,
	destinationLon
  ) {
	var router = platform.getRoutingService(null, 8),
	  routeRequestParams = {
		routingMode: "fast",
		transportMode: "car",
		origin: originLat + "," + originLon,
		destination: destinationLat + "," + destinationLon,
		return: "polyline,turnByTurnActions,actions,instructions,travelSummary",
	  };
	router.calculateRoute(routeRequestParams, onSuccess, onError);
  }
//   /**
//    * This function will be called once the Routing REST API provides a response
//    * @param  {Object} result          A JSONP object representing the calculated route
//    *
//    * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
//    */
  function onSuccess(result) {
	var route = result.routes[0];
	console.log(route);
	/*
	 * The styling of the route response on the map is entirely under the developer's control.
	 * A representitive styling can be found the full JS + HTML code of this example
	 * in the functions below:
	 */
	addRouteShapeToMap(route);
	addManueversToMap(route);
	addWaypointsToPanel(route);
	addManueversToPanel(route);
	addSummaryToPanel(route);
	// ... etc.
  }
  
//   /**
//    * This function will be called if a communication error occurs during the JSON-P request
//    * @param  {Object} error  The error message received.
//    */
  function onError(error) {
	alert("Can't reach the remote server");
  }
  
//   /**
//    * Boilerplate map initialization code starts below:
//    */
  
//   // set up containers for the map  + panel
  var mapContainer = document.getElementById("map"),
	routeInstructionsContainer = document.getElementById("panel");
  
//   //Step 1: initialize communication with the platform
//   // In your own code, replace variable window.apikey with your own apikey
  var platform = new H.service.Platform({
	apikey: "8j2a68P55bGbQmuKNsT08BlTea8EZ15TdTYTwVqMOI0",
  });
  
  var defaultLayers = platform.createDefaultLayers();
  
//   //Step 2: initialize a map - this map is centered over Berlin
  var map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
	center: { lat: 52.516, lng: 13.3779 },
	zoom: 13,
	pixelRatio: window.devicePixelRatio || 1,
  });
//   // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener("resize", () => map.getViewPort().resize());
  
//   //Step 3: make the map interactive
//   // MapEvents enables the event system
//   // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
//   // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  
//   // Hold a reference to any infobubble opened
  var bubble;
  
//   /**
//    * Opens/Closes a infobubble
//    * @param  {H.geo.Point} position     The location on the map.
//    * @param  {String} text              The contents of the infobubble.
//    */
  function openBubble(position, text) {
	if (!bubble) {
	  bubble = new H.ui.InfoBubble(
		position,
		// The FO property holds the province name.
		{ content: text }
	  );
	  ui.addBubble(bubble);
	} else {
	  bubble.setPosition(position);
	  bubble.setContent(text);
	  bubble.open();
	}
  }
  
//   /**
//    * Creates a H.map.Polyline from the shape of the route and adds it to the map.
//    * @param {Object} route A route as received from the H.service.RoutingService
//    */
  function addRouteShapeToMap(route) {
	route.sections.forEach((section) => {
	  // decode LineString from the flexible polyline
	  let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
  
	  // Create a polyline to display the route:
	  let polyline = new H.map.Polyline(linestring, {
		style: {
		  lineWidth: 4,
		  strokeColor: "rgba(0, 128, 255, 0.7)",
		},
	  });
  
// 	  // Add the polyline to the map
	  map.addObject(polyline);
// 	  // And zoom to its bounding rectangle
	  map.getViewModel().setLookAtData({
		bounds: polyline.getBoundingBox(),
	  });
	});
  }
  
//   /**
//    * Creates a series of H.map.Marker points from the route and adds them to the map.
//    * @param {Object} route  A route as received from the H.service.RoutingService
//    */
  function addManueversToMap(route) {
	var svgMarkup =
		'<svg width="18" height="18" ' +
		'xmlns="http://www.w3.org/2000/svg">' +
		'<circle cx="8" cy="8" r="8" ' +
		'fill="#1b468d" stroke="white" stroke-width="1"  />' +
		"</svg>",
	  dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } }),
	  group = new H.map.Group(),
	  i,
	  j;
	route.sections.forEach((section) => {
	  let poly = H.geo.LineString.fromFlexiblePolyline(
		section.polyline
	  ).getLatLngAltArray();
  
	  let actions = section.actions;
	  // Add a marker for each maneuver
	  for (i = 0; i < actions.length; i += 1) {
		let action = actions[i];
		var marker = new H.map.Marker(
		  {
			lat: poly[action.offset * 3],
			lng: poly[action.offset * 3 + 1],
		  },
		  { icon: dotIcon }
		);
		marker.instruction = action.instruction;
		group.addObject(marker);
	  }
  
	  group.addEventListener(
		"tap",
		function (evt) {
		  map.setCenter(evt.target.getGeometry());
		  openBubble(evt.target.getGeometry(), evt.target.instruction);
		},
		false
	  );
  
// 	  // Add the maneuvers group to the map
	  map.addObject(group);
	});
  }
  
//   /**
//    * Creates a series of H.map.Marker points from the route and adds them to the map.
//    * @param {Object} route  A route as received from the H.service.RoutingService
//    */
  function addWaypointsToPanel(route) {
	var nodeH3 = document.createElement("h3"),
	  labels = [];
  
	route.sections.forEach((section) => {
	  labels.push(section.turnByTurnActions[0].nextRoad.name[0].value);
	  labels.push(
		section.turnByTurnActions[section.turnByTurnActions.length - 1]
		  .currentRoad.name[0].value
	  );
	});
  
	nodeH3.textContent = labels.join(" - ");
	routeInstructionsContainer.innerHTML = "";
	routeInstructionsContainer.appendChild(nodeH3);
  }
  
//   /**
//    * Creates a series of H.map.Marker points from the route and adds them to the map.
//    * @param {Object} route  A route as received from the H.service.RoutingService
//    */
  function addSummaryToPanel(route) {
	let duration = 0,
	  distance = 0;
  
	route.sections.forEach((section) => {
	  distance += section.travelSummary.length;
	  duration += section.travelSummary.duration;
	});
  
	var summaryDiv = document.createElement("div"),
	  content = "";
	content += "<b>Total distance</b>: " + distance + "m. <br/>";
	content +=
	  "<b>Travel Time</b>: " + duration.toMMSS() + " (in current traffic)";
  
	summaryDiv.style.fontSize = "small";
	summaryDiv.style.marginLeft = "5%";
	summaryDiv.style.marginRight = "5%";
	summaryDiv.innerHTML = content;
	routeInstructionsContainer.appendChild(summaryDiv);
  }
  
//   /**
//    * Creates a series of H.map.Marker points from the route and adds them to the map.
//    * @param {Object} route  A route as received from the H.service.RoutingService
//    */
  function addManueversToPanel(route) {
	var nodeOL = document.createElement("ol");
  
	nodeOL.style.fontSize = "small";
	nodeOL.style.marginLeft = "5%";
	nodeOL.style.marginRight = "5%";
	nodeOL.className = "directions";
  
	route.sections.forEach((section) => {
	  section.actions.forEach((action, idx) => {
		var li = document.createElement("li"),
		  spanArrow = document.createElement("span"),
		  spanInstruction = document.createElement("span");
  
		spanArrow.className = "arrow " + (action.direction || "") + action.action;
		spanInstruction.innerHTML = section.actions[idx].instruction;
		li.appendChild(spanArrow);
		li.appendChild(spanInstruction);
  
		nodeOL.appendChild(li);
	  });
	});
  
	routeInstructionsContainer.appendChild(nodeOL);
  }
  
  Number.prototype.toMMSS = function () {
	return Math.floor(this / 60) + " minutes " + (this % 60) + " seconds.";
  };
  
//   //MY Location Function
  function getCoordintes() {
	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0,
	};
  
	function success(pos) {
	  var crd = pos.coords;
	  var lat = crd.latitude.toString();
	  var lng = crd.longitude.toString();
	  var coordinates = [lat, lng];
	  addAnswer(
		Main,
		"Your Latitude is <br><b>" + lat + " </b>Longitude<br><b>" + lng
	  );
  
	  getCity(coordinates);
	  return;
	}
  
	function error(err) {
	  console.warn(`ERROR(${err.code}): ${err.message}`);
	}
  
	navigator.geolocation.getCurrentPosition(success, error, options);
  }
  
//   // Step 2: Get Country name
  function getCity(coordinates) {
	var xhr = new XMLHttpRequest();
	var lat = coordinates[0];
	var lng = coordinates[1];
  
	xhr.open(
	  "GET",
	  "https://us1.locationiq.com/v1/reverse.php?key=pk.e61de8f8675accd3fd88866e1f92e31b&lat=" +
		lat +
		"&lon=" +
		lng +
		"&format=json",
	  true
	);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	xhr.addEventListener("readystatechange", processRequest, false);
  
	function processRequest(e) {
	  if (xhr.readyState == 4 && xhr.status == 200) {
		var response = JSON.parse(xhr.responseText);
		var city = response.address.country;
		addAnswer(Main, "Your City is <br> <b>" + city);
		return;
	  }
	}
  }
//   //Get origin and destination for map
  async function getLocationDetails() {
	$("#map__form").css("display", "none");
	$("#justcheck").css("display", "block");
	origin = document.getElementById("origin").value;
	destination = document.getElementById("destination").value;
  
	$.ajax({
	  url: "http://api.positionstack.com/v1/forward",
	  data: {
		access_key: "83e725837df6ea6bafe0a9d495ad800f",
		query: origin,
		limit: 1,
	  },
	}).done(function (data) {
	  originLat = data.data[0].latitude;
	  originLon = data.data[0].longitude;
	  console.log(originLat);
	  console.log(originLon);
	});
  
	$.ajax({
	  url: "http://api.positionstack.com/v1/forward",
	  data: {
		access_key: "83e725837df6ea6bafe0a9d495ad800f",
		query: destination,
		limit: 1,
	  },
	}).done(function (data) {
	  destinationLat = data.data[0].latitude;
	  destinationLon = data.data[0].longitude;
	  console.log(destinationLat);
	  console.log(destinationLon);
	});
	setTimeout(function () {
	  calculateRouteFromAtoB(
		platform,
		originLat,
		originLon,
		destinationLat,
		destinationLon
	  );
	}, 4000);
	setTimeout(function () {
	  console.log(destinationLat);
	  console.log(originLat);
	  console.log(originLon);
	  console.log(destinationLon);
	}, 2000);
  }
  
// async function downloadScreenshot() {
// 	var URL = $("#ssurl").val();
// 	console.log(URL);
// 	const Token = "LAWCQV7YTKNT7PTFJXVSPR3IDT28BDJP";
// 	var url =
// 		"https://screenshotapi.net/api/v1/screenshot?token=" +
// 		Token +
// 		"&url=" +
// 		URL;
// 	$("#ssimg").css("display", "block");
// 	$.get(url, function (data) {
// 		console.log(data);
// 		$("#ssimg").attr("src", data.screenshot);
// 	});
// 	$("#ssform").css("display", "none");
// }

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
        <div class="chat answer" id="videos">${text}</div>
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
					"<img src='" + img2 + "' width='200px' height='100px' class='img'>" +
					"<b><a href='" + URL + "' target='_blank'>" +
					title2 + "</a>" +
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

function newsBallon() {
	var URL = $("newsQuery").val();
	$("#newsform").css("display", "none");
	fetch(
		"https://gnews.io/api/v4/top-headlines?lang=en&topic=" + URL + "&country=in&token=86b49fc2afe26b20fdf037ede41c2676"
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
					"<img src='" + img2 + "' width='200px' height='100px' class='img'>" +
					"<b><a href='" + URL + "' target='_blank'>" +
					title2 + "</a>" +
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
async function downloadScreenshot() {
	var URL = $("#ssurl").val();
	console.log(URL);
	const Token = "LAWCQV7YTKNT7PTFJXVSPR3IDT28BDJP";
	var url =
		"https://screenshotapi.net/api/v1/screenshot?token=" +
		Token +
		"&url=" +
		URL;
	$.get(url, function (data) {
		console.log(data);
		addAnswer(
			Main, "<img id='ssimg'>"
		);

		$("#ssimg").css("display", "block");
		$("#ssimg").attr("src", data.screenshot);
	});
	$("#ssform").css("display", "none");
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
		let url = "https://www.youtube.com/results?search_query=" + stringWithoutCommas;
		// videoSearch(API_KEY, stringWithoutCommas, 10, url);
		function videoS() {
			fetch(
				"https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&type=video&part=snippet&maxResult=" +
				10 +
				"&q=" +
				stringWithoutCommas
			)
				.then(function (resp) {
					return resp.json();
				})
				.then(function (data) {
					console.log(data);
					var i;
					for (i = 0; i < 5; i++) {
						let URL = data.items[i].id.videoId;
						addAnswer(
							Main,
							"<iframe width='420' height='315' src='http://www.youtube.com/embed/" + URL + "' frameborder='1' allowfullscreen></iframe>"
						);
					}

					addAnswer(
						Main,
						"<a href='" + url + "'>For more click me</a>"
					);

				})
				.catch(function () {
					// catch any errors
				});

		}
		videoS();
		// videoSearch(API_KEY, stringWithoutCommas,10);

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
		let utter4 = new SpeechSynthesisUtterance("Please Enter some topic for me");
		synth.speak(utter4);
		const newsFormPopup = () => {
			$("#newsform").css("display", "block");
		};
		newsFormPopup();


		// newsBallon();


	}
	//----------------DIRECTION ROUTES
	else if (words.includes("direction")) {
		let utter3 = new SpeechSynthesisUtterance(
			"Please Enter your starting and... destination points"
		  );
		  synth.speak(utter3);
		  const getOriginandDestination = () => {
			$("#map__form").css("display", "block");
		  };
		  getOriginandDestination();
	  }

	//----------------GAMES
	else if (words.includes("play" && "games")) {
		let utter6 = new SpeechSynthesisUtterance("Which game will you like to play");
		synth.speak(utter6);
		addAnswer(
			Main,
			"<a href='./2048/game.html' class='btn-first' target='_blank'>2048</a><br><a href='./rock-paper-scissor-master/SPS.html' target='_blank' class='btn-first'>Stone Paper Scissor</a><br><a href='./Hangman/hangman.html' class='btn-first' target='_blank'>Hangman</a><br>"
		);

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
					data[random_number].text + "<br><br>By:-" + data[random_number].author
				);
				let utter6 = new SpeechSynthesisUtterance(data[random_number].text + "By" + data[random_number].author);
				synth.speak(utter6);
			});
	}

	else if (words.includes("search" && "book")) {
		var bookName = words.slice(2).toString();
		var stringWithoutCommas = bookName.replace(/,/g, "+");
		console.log(stringWithoutCommas);
		addAnswer(
			Main,
			"<div id='list-output' class=''><div class='row'></div></div>"
		);
		var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";

		var outputList = document.getElementById("list-output");

		$.ajax({
			url: bookUrl + stringWithoutCommas,
			dataType: "json",
			success: function (response) {
				console.log(response);
				displayResults(response);
			},
			error: function () {
				alert("Something went wrong.. <br>" + "Try again!");
			},
		});

		function displayResults(response) {
			for (var i = 0; i < response.items.length; i += 2) {
				item = response.items[i];
				title1 = item.volumeInfo.title;
				author1 = item.volumeInfo.authors;
				publisher1 = item.volumeInfo.publisher;
				bookLink1 = item.volumeInfo.previewLink;
				bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier;
				bookImg1 = item.volumeInfo.imageLinks
					? item.volumeInfo.imageLinks.thumbnail
					: placeHldr;

				item2 = response.items[i + 1];
				title2 = item2.volumeInfo.title;
				author2 = item2.volumeInfo.authors;
				publisher2 = item2.volumeInfo.publisher;
				bookLink2 = item2.volumeInfo.previewLink;
				bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier;
				bookImg2 = item2.volumeInfo.imageLinks
					? item2.volumeInfo.imageLinks.thumbnail
					: placeHldr;

				// in production code, item.text should have the HTML entities escaped.
				outputList.innerHTML +=
					'<div class="row mt-4">' +
					formatOutput(
						bookImg1,
						title1,
						author1,
						publisher1,
						bookLink1,
						bookIsbn
					) +
					formatOutput(
						bookImg2,
						title2,
						author2,
						publisher2,
						bookLink2,
						bookIsbn2
					) +
					"</div>";

				console.log(outputList);
			}
		}

		function formatOutput(
			bookImg,
			title,
			author,
			publisher,
			bookLink,
			bookIsbn
		) {
			console.log(title + "" + author + " " + publisher + " " + bookLink + " " + bookImg);
			var viewUrl = "book.html?isbn=" + bookIsbn; //constructing link for bookviewer
			var htmlCard = `
			   <div class="row2" style="width:auto;">
				 <div class="">
				   <img src="${bookImg}" class="img" alt="...">
				 </div>
					 <h3>${title}</h3>
					 <p class="card-text">Author: ${author}</p>
					 <p class="card-text">Publisher: ${publisher}</p><br>
					 <a target="_blank" href="${viewUrl}" class="btn-secondary">Read Book</a>
			 </div>`;
			return htmlCard;
		}
	}
};



