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
// Jokes
// Directions
// Date
// Stock Market

// Stock Market

var modalb = document.getElementById("Stock");

var spanb = document.getElementsByClassName("closeb")[0];

spanb.onclick = function () {
  modalb.style.display = "none";
};

function about() {
  var modal = document.getElementById("myModal");
  // Get the button that opens the modal
  var btn2 = document.getElementById("myBtn");
  // console.log("Helloooooooooo");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn2.onclick = function () {
    modal.style.display = "block";
    mainNav.classList.remove("active");
    btn.classList.remove("fa-close");
    btn.classList.add("fa-bars");
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  var modalc = document.getElementById("Features");
  // Get the button that opens the modal
  var btn3 = document.getElementById("myBtn2");

  // Get the <span> element that closes the modal
  var spanc = document.getElementsByClassName("closec")[0];

  // When the user clicks the button, open the modal
  btn3.onclick = function () {
    modalc.style.display = "block";
    mainNav.classList.remove("active");
    btn.classList.remove("fa-close");
    btn.classList.add("fa-bars");
  };

  // When the user clicks on <span> (x), close the modal
  spanc.onclick = function () {
    modalc.style.display = "none";
  };
}

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

const voice_btn = document.querySelector("#btn");
const write_btn = document.querySelector("#question");

var recognition = new webkitSpeechRecognition();
recognition.continous = true;
recognition.lang = "en-us";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const synth = window.speechSynthesis;

document.onkeypress = function (e) {
  if (e.keyCode == 32) {
    e.preventDefault();
    document.getElementById("btn").click();
  }
};
var News;
var count;
function newsballon2() {
  fetch(
    "https://gnews.io/api/v4/top-headlines?lang=en&topic=" +
      News +
      "&country=" +
      count +
      "&token=86b49fc2afe26b20fdf037ede41c2676"
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
          "<img src='" +
            img2 +
            "' width='200px' height='100px' class='img'>" +
            "<b><a href='" +
            URL +
            "' target='_blank' style='text-decoration: none;'>" +
            title2 +
            "</a>" +
            "</b><br><br>" +
            descrip2 +
            "<br><br>"
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
  var e = document.getElementById("newsQuery");
  News = e.value;
  var e = document.getElementById("Country");
  count = e.value;
  // var URL = $("").val();
  $("#newsform").css("display", "none");
  fetch(
    "https://gnews.io/api/v4/top-headlines?lang=en&topic=" +
      News +
      "&country=" +
      count +
      "&token=86b49fc2afe26b20fdf037ede41c2676"
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
          "<img src='" +
            img2 +
            "' width='200px' height='100px' class='img'>" +
            "<b><a href='" +
            URL +
            "' target='_blank' style='text-decoration: none;'>" +
            title2 +
            "</a>" +
            "</b><br><br>" +
            descrip2 +
            "<br><br>"
        );
        let utter5 = new SpeechSynthesisUtterance(title2);
        synth.speak(utter5);
      }
      addAnswer(
        Main,
        "<input class='btn-first' type='button' onclick='newsballon2()' value='READ MORE'>"
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
    addAnswer(Main, "<img id='ssimg'>");

    $("#ssimg").css("display", "block");
    $("#ssimg").attr("src", data.screenshot);
  });
  $("#ssform").css("display", "none");
}
function currTime() {
  var today = new Date();

  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  var dateTime = date + " " + time;
  console.log(dateTime);
  addAnswer(Main, "Date : " + date + "<br><br>" + "Time : " + time);

  let utter2 = new SpeechSynthesisUtterance(
    "Date is " +
      today.getDate() +
      (today.getMonth() + 1) +
      today.getFullYear() +
      "and Time is" +
      today.getHours() +
      "hours and" +
      today.getMinutes() +
      "minutes"
  );
  synth.speak(utter2);
}
voice_btn.addEventListener("click", () => {
  recognition.start();
  var icon = document.getElementById("icon");
  icon.style.display = "block";
});

recognition.onresult = (e) => {
  var icon = document.getElementById("icon");
  icon.style.display = "none";
  const Main = document.querySelector("main");
  const transcript = e.results[0][0].transcript;
  const words = transcript.split(" ");
  //   console.log(words);
  //   console.log(transcript);
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
    // videoSearch(API_KEY, stringWithoutCommas, 10, url);
    function videoS() {
      fetch(
        "https://www.googleapis.com/youtube/v3/search?key=" +
          API_KEY +
          "&type=video&part=snippet&maxResult=" +
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
              "<iframe width='420' height='315' src='http://www.youtube.com/embed/" +
                URL +
                "' frameborder='1' allowfullscreen></iframe>"
            );
          }

          addAnswer(Main, "<a href='" + url + "'>For more click me</a>");
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
    let utter4 = new SpeechSynthesisUtterance(
      "Please select some topic for me"
    );
    synth.speak(utter4);
    const newsFormPopup = () => {
      $("#newsform").css("display", "block");
    };
    newsFormPopup();

    // newsBallon();
  }
  //----------------DIRECTION ROUTES
  else if (words.includes("directions")) {
    let utter3 = new SpeechSynthesisUtterance(
      "Please Enter your starting and... destination points"
    );
    synth.speak(utter3);
    window.open("map.html", "_blank");
  }

  //----------------GAMES
  else if (words.includes("play" && "games")) {
    let utter6 = new SpeechSynthesisUtterance(
      "Which game will you like to play"
    );
    synth.speak(utter6);
    addAnswer(
      Main,
      "<a href='./2048/game.html' class='btn-first' target='_blank'>2048</a><br><a href='./rock-paper-scissor-master/SPS.html' target='_blank' class='btn-first'>Stone Paper Scissor</a><br><a href='./Hangman/hangman.html' class='btn-first' target='_blank'>Hangman</a><br><a href='./Tic Tac Toe/index.html' class='btn-first' target='_blank'>Tic Tac Toe</a><br>"
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
        let utter6 = new SpeechSynthesisUtterance(
          data[random_number].text + "By" + data[random_number].author
        );
        synth.speak(utter6);
      });
  } else if (words.includes("tell" && "date")) {
    currTime();
  } else if (words.includes("search" && "book")) {
    var bookName = words.slice(2).toString();
    var stringWithoutCommas = bookName.replace(/,/g, "+");
    console.log(stringWithoutCommas);
    random_number = Math.floor(Math.random() * 1000);
    addAnswer(
      Main,
      "<div id='list-output" +
        random_number +
        "' class=''><div class='row'></div></div>"
    );
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";

    var outputList = document.getElementById("list-output" + random_number);

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
      console.log(
        title + "" + author + " " + publisher + " " + bookLink + " " + bookImg
      );
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
  } else if (words.includes("stocks")) {
    var modalb = document.getElementById("Stock");
    // Get the <span> element that closes the modal
    modalb.style.display = "block";

    var spanb = document.getElementsByClassName("closeb")[0];

    spanb.onclick = function () {
      modalb.style.display = "none";
    };
  } else {
    var icon = document.getElementById("icon");
    icon.style.display = "none";
    const utter = new SpeechSynthesisUtterance(
      "Sorry can you please say again"
    );
    synth.speak(utter);
  }
};
recognition.onerror = function () {
  var icon = document.getElementById("icon");
  icon.style.display = "none";
  const utter = new SpeechSynthesisUtterance("Sorry can you please say again");
  synth.speak(utter);
};
// start_position:
recognition.onend = function () {
  var modal = document.getElementById("myModal");
};
setInterval(function () {
  about();
}, 500);
