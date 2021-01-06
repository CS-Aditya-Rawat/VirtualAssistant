var words = [
    'america',
    'animal',
    'apple',
    'bag',
    'barack obama',
    'basket',
    'bat',
    'boat',
    'box',
    'camera',
    'candle',
    'car',
    'cat',
    'china',
    'christmas',
    'clouds',
    'cobweb',
    'codepen',
    'coding',
    'computer',
    'cowboy',
    'cup',
    'denmark',
    'disney',
    'dog',
    'donald duck',
    'door',
    'drawing',
    'drums',
    'ears',
    'easter egg',
    'egg',
    'elon musk',
    'england',
    'europe',
    'eyes',
    'face',
    'facebook',
    'football',
    'fortnite',
    'france',
    'galaxy',
    'game',
    'germany',
    'google',
    'great britain',
    'guitar',
    'hacker',
    'hangman',
    'head',
    'headphones',
    'holiday',
    'horse',
    'house',
    'india',
    'italy',
    'jelly',
    'jigsaw',
    'kitchen',
    'lamp',
    'lemon',
    'letter',
    'light',
    'lightbulb',
    'mail',
    'mario',
    'melody',
    'mickey mouse',
    'microwave',
    'minecraft',
    'minigame',
    'mouse',
    'mouth',
    'movie',
    'music',
    'norway',
    'nose',
    'orange',
    'oxygen',
    'painting',
    'pants',
    'paper',
    'peace',
    'pen',
    'pencil',
    'pet',
    'pewdiepie',
    'piano',
    'plane',
    'poland',
    'present',
    'program',
    'programmer',
    'quiz',
    'radio',
    'remote control',
    'rocket',
    'russia',
    'school',
    'scotland',
    'screen',
    'seat',
    'shoes',
    'sky',
    'smartphone',
    'snake',
    'spaceship',
    'speakers',
    'star wars',
    'suitcase',
    'summer',
    'sun',
    'superhero',
    'sweater',
    'sweden',
    'television',
    'tools',
    'united states of america',
    'universe',
    'usain bolt',
    'vampire',
    'video',
    'village',
    'wales',
    'water bottle',
    'wind',
    'windmill',
    'window',
    'winter',
    'wizard',
    'word',
    'xylophone',
    'youtube',
    'zombie'
  ];
  var hangman = [
      {from: [70, 38], to: [72, 46]},
      {from: [70, 38], to: [68, 46]},
      {from: [70, 45], to: [72, 55]},
      {from: [70, 45], to: [68, 55]},
      {from: [70, 35], to: [70, 45]},
      {circle: [70, 30], radius: 2},
      {from: [70, 5], to: [70, 25]},
      {from: [30, 5], to: [70, 5]},
      {from: [30, 95], to: [30, 5]},
      {from: [1, 95], to: [99, 95]},
  ];
  
  //GET STATS
  
  var stats = {streak :0, scores:[]};
  
  if (typeof(Storage) !== "undefined") {
      if (localStorage.hangman !== undefined) {
          stats = JSON.parse(localStorage.hangman);
          setScore();
      }
  }
  
  var word, currentWord, guessesLeft, guessed;
  generateWord();
  function generateWord() {
      currentWord = [], guessesLeft = 10, guessed=[];
      document.querySelector('.guessesLeft').querySelector('span').innerHTML = guessesLeft;
      document.querySelector('.guessed').querySelector('span').innerHTML = '';
      document.querySelector('input').style.display = null;
      document.querySelector('button').style.display = 'none';
      document.querySelector('.hangman').innerHtml ='';
  
      word = words[Math.floor(Math.random() * words.length)];
      console.log(word);
      let html = '';
  
      for(let i=0; i<word.length;i++) {
          if(word[i] == ''){
              currentWord[i] = word[i];
              html += `<span class="hidden" style="border:none;"></span>`;
          } else html += `<span class="hidden"></span>`;
      }
      document.querySelector('.word').innerHTML = html;
      }
      //Check input
      document.querySelector('input').addEventListener('change', function() {
          if(this.value !== "" && this.value !== " "){
              if(this.value.length > 1){
                 if(this.value.length !== word.length) alert ('your Guess is not the same length as the word!');
                 else if (this.value == word){
                     for(let i=0; i< word.length; i++){
                         document.querySelector('.word').querySelectorAll('span')[i].innerHTML=word[i];
                     }
                     finish();
                 } 
                 else {
                     drawHangman();
                     drawHangman();
                     fadeColor('#ff2929');
                 }
              }
              else if (this.value.match(/^[A-Za-z]+$/)) {
                  let alreadyGuessed = false;
                  for(let i=0; i<guessed.length; i++){
                      if(guessed[i] == this.value.toLowerCase()){
                          alreadyGuessed = true;
                          break;
                      }
                  }
                  if (!alreadyGuessed) {
                      guessed.push(this.value.toLowerCase());
                      let wordHasLetter = false;
                      for(let i=0; i<word.length; i++){
                          if (word[i] == this.value.toLowerCase()){
                              wordHasLetter = true;
  
                              document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
                              currentWord[i] = word[i];
                          }
                      }
                      if(!wordHasLetter){
                          fadeColor('#ff2929');
                          drawHangman();
                          let guessedElem = document.querySelector('.guessed').querySelector('span');
                          if(guessedElem.innerHTML == '') guessedElem.innerHTML = this.value.toUpperCase();
                          else guessedElem += ', '+this.value.toUpperCase();
                      }
                      else fadeColor('#35c435');
                  }
                  else alert('You Have already guessed that letter!');
                  if (currentWord.join('') === word) finish();
              }else alert('Please guess letter only');
              this.value = '';
              if(guessesLeft <= 0){
                  guessesLeft = 0;
                  for(let i=0; i<word.length; i++){
                      if(document.querySelector('.word').querySelectorAll('span')[i].innerHTML == ''){
                          document.querySelector('.word').querySelectorAll('span')[i].style.color='red';
                          document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
                      }
                  }
  
                  alert('You lost!');
                  document.querySelector('input').style.display = 'none';
                  document.querySelector('button').style.display = null;
  
                  status.streak = 0;
                  stats.scores.push(0);
                  setScore();
              }
              document.querySelector('.guessesLeft').querySelector('span').innerHTML = guessesLeft;
          }
      });
  
      const fadeColor = (color) => {
          document.body.style.background = color;
          setTimeout(function() {
              document.body.style.background = null;
          }, 200);
      }
  
      const finish = () => {
          var wrongGuesses = (10-guessesLeft);
          var rightGuesses = word.length;
          let score = Math.floor((rightGuesses / (wrongGuesses+rightGuesses)) * 100) || 100 ;
          alert('Congratultions! Score '+ score+'%');
          stats.scores.push(score);
          setScore();
          fadeColor('lightblue');
          document.querySelector('input').style.display = 'none';
          document.querySelector('button').style.display = null;
      }
  
      document.querySelector('button').addEventListener('click', generateWord);
  
      function setScore() {
          let score = '-';
          for(let i=0; i<stats.scores.length; i++){
              if(score == '-') score =0;
              score += stats.scores[i];
          }
  
          if(score !== '-') score = Math.floor(score/stats.scores.length)+'%';
          document.querySelector('.streak').innerHTML = stats.streak;
          localStorage.hangman = JSON.stringify(stats);
      }
      const drawHangman = () => {
          guessesLeft--;
          let part = hangman[guessesLeft];
          let hangmanLines = document.querySelector('.hangman').querySelectorAll('svg');
          for(let i=0; i<hangmanLines.length; i++){
              hangmanLines[i].children[0].classList.remove('draw');
          }
          let svg ;
          if(part.circle == undefined){
              svg= '<svg><line class="draw" x1="'+ part.from[0] + '%" y1="' + part.from[1] + '%" x2="' + part.to[0] + '%" y2="' + part.to[1] + '%"/></svg>';
              
          }else {
              svg = '<svg><circle class="draw" cx="' +part.circle[0] + '%" cy="' +part.circle[1] + '%" r="' + part.radius + '%"/></svg>';
          }
          document.querySelector('.hangman').innerHTML+= svg;
      }