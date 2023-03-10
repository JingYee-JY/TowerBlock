const play = document.getElementById("play");
const start = document.getElementById("start");
const again = document.getElementById("again");
const home = document.getElementById("home");

const startPage = document.getElementById("startPage");
const instructionPage = document.getElementById("instructionPage");
const gamePage = document.getElementById("gamePage");
const popUp = document.getElementById("popUp");
const finalPage = document.getElementById("finalPage");

const clickSound = document.getElementById("click")
const clap = document.getElementById("clap")
const completed = document.getElementById("correct")
const wrong = document.getElementById("wrong")
const lose = document.getElementById("lose")

const scoreCount = document.getElementById("score-count")
const questionCount = document.getElementById("question-count")
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const mark = document.getElementById("mark")
const checkAnswer = document.getElementById("checkAnswer")
const showAnswer = document.getElementById("showAnswer")
const correctAnswer = document.getElementById("correctAnswer")
const medal = document.getElementById("medal")
const words1 = document.getElementById("words1")
const words2 = document.getElementById("words2")
const scoreText = document.getElementById("scoreText")

let current;
let addscore = 1
let total = 5;
let score;

let tempoArray = [];

let scrollCounter, cameraY, mode, xSpeed;
let ySpeed = 3;
let height = 80;
let boxes = [];

let blockMovement;

boxes[0] = {
    x: 100,
    y: 330,
    width: 400
};
let debris = {
    x: 200,
    width: 0
};

//here is finalV2
const group1 = document.querySelector(".group1");

play.addEventListener("click", () => {
    playClickSound()
    setTimeout(() => {
        startPage.classList.add("hide")
        instructionPage.classList.remove("hide")
    }, 200);
})

start.addEventListener("click", () => {
    playClickSound()
    setTimeout(() => {
        instructionPage.classList.add("hide")
        gamePage.classList.remove("hide")
        ready()
        Question()
    }, 200);
})

again.addEventListener("click", () => {
  playClickSound()
  //controls amd buttons visibility
  let delay = setTimeout(() => {
    startPage.classList.remove("hide");
    finalPage.classList.add("hide")
  }, 200);
});

home.addEventListener("click", () => {
  playClickSound()
  let delay = setTimeout(() => {
    location.assign('https://gimme.sg/activations/minigames/main.html');
  }, 200);
})


function ready(){
    //code here to get UI ready 
    //like number of point to zero and others
    current = 0;
    questionCount.textContent = current + "/" + total

    score = 0;
    scoreCount.textContent = score

    //resetArray()
}

function resetArray(){
    tempoArray = []

    for(let i = 0; i < numbers.length; i++){
        tempoArray.push(numbers[i])
    }
}

function Question(){
    //game that starts the game like showing question and stuff
    
    restart();
    animate();
}

function newBox() {
    boxes[current] = {
      x: 0,
      y: (current + 6) * height,
      width: boxes[current - 1].width
    };
}

function gameOver() {
    //alert("GAME OVER! Try again");
    mode = 'gameOver';
    endGame();
      
}

function animate() {
    if (mode != 'gameOver') {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let n = 0; n < boxes.length; n++) {
        let box = boxes[n];
        //check if the box number is even
        if(n % 2==0){
            context.fillStyle = '#08AEAD';
         }
         //else the box number is odd
         else {
            context.fillStyle = '#2F3F90';
         }
        context.fillRect(box.x, 1250 - box.y + cameraY, box.width, height); 
      }
      context.fillRect(debris.x, 1250 - height + cameraY, debris.width, height);
      if (mode == 'bounce') {
        boxes[current].x = boxes[current].x + xSpeed;
        if (xSpeed > 0 && boxes[current].x + boxes[current].width > canvas.width)
          xSpeed = -xSpeed;
        if (xSpeed < 0 && boxes[current].x < 0)
          xSpeed = -xSpeed;
      }
      if (mode == 'fall') {
        boxes[current].y = boxes[current].y - ySpeed;
        if (boxes[current].y == boxes[current - 1].y + height) {
          mode = 'bounce';
          let difference = boxes[current].x - boxes[current - 1].x;
          if (Math.abs(difference) >= boxes[current].width) {
            window.cancelAnimationFrame(blockMovement);
            gameOver();
            return
          }
          debris = {
            y: boxes[current].y,
            width: difference
          };
          if (boxes[current].x > boxes[current - 1].x) {
            boxes[current].width = boxes[current].width - difference;
            debris.x = boxes[current].x + boxes[current].width;
          } else {
            debris.x = boxes[current].x - difference;
            boxes[current].width = boxes[current].width + difference;
            boxes[current].x = boxes[current - 1].x;
          }
          if (xSpeed > 0)
            xSpeed+=0.5;
          else
            xSpeed--;
          current++;
          if(current > 8)
          scrollCounter = height;

          score++;
          scoreCount.innerHTML = score
          newBox();
        }
      }
      debris.y = debris.y - ySpeed;
      if (scrollCounter) {
        cameraY++;
        scrollCounter--;
      }
    }
    blockMovement = window.requestAnimationFrame(animate);
  }

function restart() {
    boxes.splice(1, boxes.length - 1);
    mode = 'bounce';
    cameraY = 0;
    scrollCounter = 0;
    xSpeed = 2;
    current = 1;
    newBox();
    debris.y = 0;
}

function playClickSound(){
    clickSound.currentTime = 0
    clickSound.play()
}

canvas.onpointerdown = function() {
    if (mode == 'gameOver'){
      restart();
    }else {
      if (mode == 'bounce')
        mode = 'fall';
    }
  };

function endGame(){
    finalPage.classList.remove("hide")

    let pass = 5;

    //this is for second version
        //change the star image according the score;
        if(score < pass * 3){
            lose.currentTime = 0
            lose.play()
            if(score > pass * 2)
                    medal.src = "./img/youTried.png"
                else if(score > pass) // score < 2 && score >= 1
                    medal.src = "./img/youTried1.png"
                else
                    medal.src = "./img/youTried2.png"
        
            group1.classList.add("group1V2")
            scoreText.textContent = "Good try!"
            scoreText.classList.add("scoreTextV2")
            words1.classList.add("words1V2")
            words2.classList.add("words2V2")
            words1.innerHTML = "Your score"
        }
        else{
            clap.currentTime = 0
            clap.play()
            if(score >= pass * 5) // score = 5
                medal.src = "./img/excellent.png"
            else if(score > pass * 4) // score < 5 && score >= 4
                medal.src = "./img/wellDone.png"
            else if(score > pass * 3) // score < 4 && score >= 3
                medal.src = "./img/wellDone1.png"
        
            group1.classList.add("group1V2")
            words1.classList.add("words1V2")
            words2.classList.add("words2V2")
        
            scoreText.classList.add("scoreTextV2")
        
            if(score == total){
                scoreText.textContent = "Superstar!"
            }
            else if(score > pass){
                scoreText.textContent = "Well done!"
            }
            else{
                scoreText.textContent = "Good try!"
            }
        
            setTimeout(function(){
                confetti.start()
                setTimeout(function(){
                    confetti.stop()
                }, 2000)
            }, 500)
        }
        words1.innerHTML = ""
        words2.textContent = score + " LEVELS"
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });

/*prevent right click*/
document.addEventListener('contextmenu', event =>
 event.preventDefault());
