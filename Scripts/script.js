// get the elements for all the buttons

var question= document.querySelector('.question');
var yesButton= document.querySelector('.Yes');
var noButton= document.querySelector('.No');
var buttons = document.querySelectorAll('.buttonHover');
var questioncontent = document.querySelector('.question-content');
var answercontent = document.querySelector('.answer-content');
var answerHeading = document.querySelector('.answer-heading');
var reasoningContent = document.querySelector('.reasoning-content');
var regenerate =  document.querySelector('.regenerate');
const text = document.querySelector('.text');
const answertext= document.querySelector('.answertext');



//fetch the question and responses
fetch('./json/texts.json')
  .then(response => response.json())
  .then(data => {
    //Display a question from the data set
    var prompt = randomize(data.prompts);
    var questionPrompt =prompt.question;
    var yesAnswer= prompt.yesResponse;
    var noAnswer = prompt.noResponse;
    question.innerHTML= questionPrompt.toUpperCase();
    //split text content into letters
    text.innerHTML = text.textContent.replace(/\S/g,"<span>$&</span>");
    var spans = document.querySelectorAll('span');
    // Loop through each span element and assign animation delay
// spans.forEach((span, index) => {
//   // Calculate the animation delay based on index
//   const animationDelay = (index + 1) * 0.1 + 's';
//   // Apply the animation delay to the current span element
//   span.style.animationDelay = animationDelay;
// });
    //Display texts while hovering on a button
    buttons.forEach(button=>{
    const originalText= button.textContent;
    button.addEventListener('mouseover', function() {
        var buttonText = randomize(data.buttontexts);
        button.textContent = buttonText.text;
      });
      
    button.addEventListener('mouseout', function() {
        button.textContent = originalText;
      });
    button.addEventListener('click',function(){
        questioncontent.style.display='none';
        answercontent.style.display='block';
        var compliments = randomize(data.compliments);
        answerHeading.innerHTML = compliments.text.toUpperCase();
        //split text content into letters
        answertext.innerHTML = answertext.textContent.replace(/\S/g,"<span>$&</span>");
        // Loop through each span element and assign animation delay
        answertext.querySelectorAll('span').forEach((span, index) => {
        // Calculate the animation delay based on index
        const animationDelay = (index + 1) * 0.1 + 's';
        // Apply the animation delay to the current span element
        span.style.animationDelay = animationDelay;
    });
    });
    })

    yesButton.addEventListener('click',function(){
        reasoningContent.innerHTML= yesAnswer;
    })
    noButton.addEventListener('click',function(){
        reasoningContent.innerHTML = noAnswer;
    })
    regenerate.addEventListener('click',function(){
        location.reload();
    })
    regenerate.addEventListener('mouseover',function(){
        regenerate.textContent = "You Nasty";
    })
    regenerate.addEventListener('mouseout',function(){
        regenerate.textContent = "Ask me more";
    })



  console.log(data);

  })

  let lastRandomNumber = -1; // Initialize lastRandomNumber to an invalid value

  function randomize(array) {
      const count = array.length;
      let randomNumber;
      
      do {
          randomNumber = Math.floor(Math.random() * count);
      } while (randomNumber === lastRandomNumber); // Repeat until a different number is generated
  
      lastRandomNumber = randomNumber; // Update lastRandomNumber
      return array[randomNumber];
  }

