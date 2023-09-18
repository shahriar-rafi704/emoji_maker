let emoji = document.querySelector(".emoji");
let colors = ["#4bff81", "#4bb4ff", "#ff702e", "#b88cff", "#ffd21f"];
let eyes = document.querySelector(".eyes");
let eyebrows = document.querySelector(".eyebrows");
let mouth = document.querySelector(".mouth");
let colorBtn = document.getElementById("color");
let eyesBtn = document.getElementById("eyes");
let eyebrowsBtn = document.getElementById("eyebrows");
let mouthBtn = document.getElementById("mouth");
let undoBtn = document.getElementById("undo");
let redoBtn = document.getElementById("redo");
let shareBtn = document.getElementById("share");
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 0;

let stateStack = [];
let currentState = -1;

let totalCounts = {
  eyeCount: 5,
  eyebrowsCount: 4,
  mouthCount: 5,
};

function saveState() {
  currentState++;
  stateStack.splice(currentState);
  stateStack.push({
    backgroundColor: emoji.style.backgroundColor,
    eyesSrc: eyes.getAttribute("src"),
    eyebrowsSrc: eyebrows.getAttribute("src"),
    mouthSrc: mouth.getAttribute("src"),
  });
}

function undo() {
  if (currentState > 0) {
    currentState--;
    applyState(stateStack[currentState]);
  }
}

function redo() {
  if (currentState < stateStack.length - 1) {
    currentState++;
    applyState(stateStack[currentState]);
  }
}

function applyState(state) {
  emoji.style.backgroundColor = state.backgroundColor;
  eyes.setAttribute("src", state.eyesSrc);
  eyebrows.setAttribute("src", state.eyebrowsSrc);
  mouth.setAttribute("src", state.mouthSrc);
}

colorBtn.addEventListener("click", () => {
  saveState();
  emoji.style.backgroundColor = colors[counter1];
  counter1 = counter1 < colors.length - 1 ? counter1 + 1 : 0;
});

eyesBtn.addEventListener("click", () => {
  saveState();
  eyes.setAttribute("src", `eye-${counter2}.svg`);
  counter2 = counter2 < totalCounts.eyeCount - 1 ? counter2 + 1 : 0;
});

eyebrowsBtn.addEventListener("click", () => {
  saveState();
  eyebrows.setAttribute("src", `eyebrow-${counter3}.svg`);
  counter3 = counter3 < totalCounts.eyebrowsCount - 1 ? counter3 + 1 : 0;
});

mouthBtn.addEventListener("click", () => {
  saveState();
  mouth.setAttribute("src", `mouth-${counter4}.svg`);
  counter4 = counter4 < totalCounts.mouthCount - 1 ? counter4 + 1 : 0;
});

undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);

// Social sharing function
function shareEmoji() {
  if (navigator.share) {
    navigator
      .share({
        title: "Check out my emoji!",
        text: "I created this awesome emoji using Emoji Maker.",
        url: window.location.href, 
      })
      .then(() => {
        console.log("Emoji shared successfully.");
      })
      .catch((error) => {
        console.error("Error sharing emoji:", error);
      });
  } else {
    alert("Sorry, your browser does not support sharing.");
  }
}

shareBtn.addEventListener("click", shareEmoji);