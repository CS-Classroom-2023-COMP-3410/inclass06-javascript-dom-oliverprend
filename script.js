const randIndex = function(lastIndex) {
  return Math.floor(Math.random() * (lastIndex + 1))
}

let allCards = [
  "&#127136;", "&#127137;","&#127138;","&#127139;","&#127140;",
  "&#127141;","&#127142;","&#127143;","&#127144;","&#127145;",
  "&#127146;","&#127147;","&#127148;","&#127149;","&#127150;",

  "&#127153;","&#127154;","&#127155;","&#127156;","&#127157;",
  "&#127158;","&#127159;","&#127160;","&#127161;","&#127162;",
  "&#127163;","&#127164;","&#127165;","&#127166;",

  "&#127169;","&#127170;","&#127171;","&#127172;","&#127173;",
  "&#127174;","&#127175;","&#127176;","&#127177;","&#127178;",
  "&#127179;","&#127180;","&#127181;","&#127182;",

  "&#127185;","&#127186;","&#127187;","&#127188;","&#127189;",
  "&#127190;","&#127191;","&#127192;","&#127193;","&#127194;",
  "&#127195;","&#127196;","&#127197;","&#127198;"
]

let moves = 0;
let time = 0;
let timerStarted = false;


let cardBack = allCards[0]
allCards.shift();



let gameDeck = [];
for(let i = 0; i < 8; i++) {
  let lastIndex = allCards.length - 1;
  let r = randIndex(lastIndex)
  gameDeck.push(allCards[r]);
  allCards.splice(r, 1);
}

gameDeck = gameDeck.concat(gameDeck);

console.log(gameDeck);



let first = null;
let busy = false;

const handleClick = function(event) {
  if (busy) {
    return;
  }

  let card = event.target

  let index = card.id.slice(5);

  card.innerHTML = gameDeck[index];

  if (first === null) {
    
    if (timerStarted === false) {
      timerStarted = true;

      setInterval(function () {
        time++;
        document.querySelector("#time").innerHTML = time;
      }, 1000);
    }

    first = card;
    return;
  }

  moves++;
  document.querySelector("#movecount").innerHTML = moves;


  let firstIndex = first.id.slice(5);

  if (gameDeck[firstIndex] !== gameDeck[index]) {
    busy = true;

    setTimeout(function () {
      first.innerHTML = cardBack;
      card.innerHTML = cardBack;

      first = null;
      busy = false;
    }, 1000);

  } else {
    first = null;
  }

}

for(let i = 0; i < 16; i++) {
  document.querySelector('#card-'+i).onclick = handleClick;
}


document.querySelector("#resetButton").onclick = function () {
  location.reload();
}
