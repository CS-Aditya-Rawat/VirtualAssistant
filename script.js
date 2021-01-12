const D = window.document;
const element = (selector) => D.querySelector(selector);

const newsApi = "12855d62b27b40339cb86cc21f36112b";
// hello => Hi, how are you?
// Youtube Video
// Take a Screenshot
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

D.addEventListener("DOMContentLoaded", () => {
  const Main = element("main");
  const Askbtn = element("button");
  const Question = element("input");
  Askbtn.addEventListener("click", function () {
    const Text = Question.value;
    if (Text.length) {
      Question.value = "";
    }
    addQuestion(Main, Text);
    if (Question.value == "hello") {
      const utter = new SpeechSynthesisUtterance("Hi, How are you");
      synth.speak(utter);
      addAnswer(Main, "Hi, How are you");
    }
  });
});

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
// headers: {
// 	"Access-Control-Allow-Origin": "*";
// }

async function showNews() {
  var query = $("#newsQuery").val();

  function newsBallon(query) {
    fetch(
      "http://newsapi.org/v2/top-headlines?country=us&category=" +
        query +
        "&apiKey=" +
        newsApi
    )
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function () {
        // catch any errors
      });
  }
  newsBallon(query);
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

input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("wrtBtn").click();
  }
});

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
    let utter4 = new SpeechSynthesisUtterance("Please Enter some topic for me");
    synth.speak(utter4);
    const newsFormPopup = () => {
      $("#newsform").css("display", "block");
    };
    newsFormPopup();
  }
  //----------------DIRECTION ROUTES
  else if (words.includes("tell" && "direction")) {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    let utterStartPoint = new SpeechSynthesisUtterance(
      "What is your starting location"
    );

    let utterDestinationPoint = new SpeechSynthesisUtterance(
      "What is your Destination"
    );

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    recognition.start(); //starting recognition continously
    synth.speak(utterStartPoint); //asking for starting point

    let i = 0;
    async function dest() {
      while (i < 1) {
        await sleep(2000);
        synth.speak(utterDestinationPoint); //asking for destination
        i++;
      }
    }
    dest();
    recognition.onresult = (e) => {
      var startPos = e.results[0][0].transcript;
      var desPos = e.results[1][0].transcript;
    };
  }
};
