const STORE = [
    {id: 1, src: "https://media1.giphy.com/media/nffC6gCh4xWDe/giphy.gif?cid=790b7611479f57e2985999925bb4d724b23f243ff6b6de78&rid=giphy.gif", 
    alt: "Vic Vega, Harvey Keitel and Steve Buscemi stand above a car trunk dressed in black suits.",
    answer: "Reservoir Dogs", options: ['Fargo','Mr. Deeds','Reservoir Dogs','Boondock Saints']},
    {id: 2, src: "https://media1.giphy.com/media/lBNRDuYdS9DAQ/giphy.gif?cid=790b761118778f0b1c5a3590f80a836eb38475138710ef30&rid=giphy.gif",
    alt: "A monkey wielding a femur as a weapon swings down upon an animal skull, shattering the skull in the process.",
    answer: "2001: A Space Odyssey", options: ['2001: A Space Odyssey', 'Planet of the Apes','Rise of the Planet of the Apes','The Lion King']},
    {id: 3, src: "https://i.imgur.com/3GzNNdh.gif", alt: "A man kneels before a turning engine turbine while Ed Harris sits against a wall.",
    answer: "Snowpiercer", options: ['Apollo 13','Snowpiercer','League of Extraordinary Gentlemen','Das Boot']},
    {id: 4, src: "https://thumbs.gfycat.com/UnrulyInbornCivet-size_restricted.gif", 
    alt: `Nicolas Cage covered in blood standing in his underwear, liquor in hand, appears to be having a full-on Cage moment as he screams at 
    nothing and everything.`,
    answer: "Mandy", options: ['Con Air','Snake Eyes','Face/Off','Mandy']},
    {id: 5, src: "https://i.imgur.com/mse8Jin.gif", alt: `Ben Affleck at a press conference with the photo of a missing woman appearing behind 
    him as camera flashes illuminate the room.`,
    answer: "Gone Girl", options: ['The Accountant','Gone Baby Gone','Argo','Gone Girl']},
    {id: 6, src: "https://derekmcdonnellblog.files.wordpress.com/2018/03/751d1-21121.gif?w=677&h=298",
    alt: "Five armed women carrying large gear packs approach a wall of moving and distorted colors.",
    answer: "Annihilation", options: ['Annihilation','Ghostbusters (2016)','Arrival','Prometheus']},
    {id: 7, src: "https://media2.giphy.com/media/3o7TKxsQPpJky5CtWw/giphy.gif",
    alt: "Ocar Isaac in a bathrobe and one of his creations disco dancing in a red-lit room.",
    answer: "Ex Machina", options: ['Pulp Fiction','La La Land','Silver Linings Playbook','Ex Machina']},
    {id: 8, src: "http://giphygifs.s3.amazonaws.com/media/JUeIDM3K7TcWc/giphy.gif",
    alt: "Ryan Gosling, Carey Mulligan and an unknown person in an elevator.",
    answer: "Drive", options: ['Blade Runner 2049','Drive','The Nice Guys','Leon: the Professional']}
]

function handleBeginQuiz(){
  $('.js-begin-quiz').on('click','button',function(event){
    $(this).parent().addClass('hidden');
    const parentSect = $(this).parent();
    parentSect.prev().toggleClass('hidden'); //toggleScore
    parentSect.next().toggleClass('hidden'); //toggleGifs
    parentSect.nextAll('.js-multiple-choice').toggleClass('hidden'); //toggleMultipleChoice
  })
}

function findIndex(answer){
  for (let i=0;i < STORE.length;i++){
    if (STORE[i].options.includes(answer)){
      return i;
    } 
  } 
} 

function handleAnswerSelected(){
  $('.js-multiple-choice').on('click','button',function(event){
    $(this).parent().toggleClass('hidden');
    $(this).parent().next().toggleClass('hidden');

    let userAnswer = $(this).text();
    let currentIndex = findIndex(userAnswer);

    if (userAnswer === STORE[currentIndex].answer){
      $('img').attr('src', 
      'https://media2.giphy.com/media/diUKszNTUghVe/giphy.gif?cid=790b7611755ded025c0b37b0745cbbd99fb4e5b23b2a752a&rid=giphy.gif');
      $('img').attr('alt', 'Robert Downey Jr. approves of your answer.');
    } else {
      $('img').attr('src',
      'https://media0.giphy.com/media/iJxHzcuNcCJXi/giphy.gif?cid=790b76110d26002ef11d4c8cfeeb74abddad659b09488d42&rid=giphy.gif');
      $('img').attr('alt', 'Lucius Aurelius Commodus (Joaquin Phoenix) disapproves of your answer.')
    }
  })
}

function handleOnNext(){
  $('.js-next-button').on('click','.js-next',function(event){
    let parentSect = $(this).parent();
    let scoreBox = parentSect.prevAll('.js-score');
    let currentQuestion = scoreBox.find('.js-question-number').text();
    let currentQuestionNum = parseInt(currentQuestion, 10);
    let nextQuestion = currentQuestionNum + 1;

    if (currentQuestionNum === 8){   // makes the quiz end after the 8th question
      $('.js-next-button').toggleClass('hidden');
      $('.js-retake-quiz').toggleClass('hidden');
      return;
    }

    $('.js-question-number').text(nextQuestion); // this updates the <span> holding our question number
    $('img').attr('src', STORE[nextQuestion - 1].src);
    $('.js-answer-span1').text(STORE[nextQuestion - 1].options[0]); 
    $('.js-answer-span2').text(STORE[nextQuestion - 1].options[1]);
    $('.js-answer-span3').text(STORE[nextQuestion - 1].options[2]);
    $('.js-answer-span4').text(STORE[nextQuestion - 1].options[3]);


    parentSect.toggleClass('hidden');
    parentSect.prev().toggleClass('hidden');


  })
}

function handleUpdateScore(){
  $('.js-multiple-choice').on('click','button',function(event){ 
    let userAnswer = $(this).text();
    let currentIndex = findIndex(userAnswer);

    let parentSect = $(this).parent();
    let scoreBox = parentSect.prevAll('.js-score');

    if (userAnswer === STORE[currentIndex].answer){
      let currentScore = scoreBox.find('.js-score-percentage').text();
      let parsedScore = parseInt(currentScore);
      let newScore = parsedScore + 12.5;
      $('.js-score-percentage').text(newScore);
    }
  })
}

function handleRetakeQuiz(){
  $('.js-retake-quiz').on('click','.js-retake',function(event){
    location.reload(true);
  })
}

$(handleBeginQuiz());
$(handleAnswerSelected());
$(handleOnNext());
$(handleUpdateScore());
$(handleRetakeQuiz());