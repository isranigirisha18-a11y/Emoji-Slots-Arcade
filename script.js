const symbolSet = ["🍓", "🌈", "🍋", "🦋", "🍉", "⭐"];
const reelTiles = [
  document.getElementById("reel-1"),
  document.getElementById("reel-2"),
  document.getElementById("reel-3")
];
const balanceText = document.getElementById("balance");
const messageText = document.getElementById("message");
const spinControl = document.getElementById("spinBtn");

let points = 100;
let spinning = false;
let spinInterval = null;
let stopTimeout = null;

function pickSymbol() {
  return symbolSet[Math.floor(Math.random() * symbolSet.length)];
}

function showPoints() {
  balanceText.textContent = points;
}

function showGameOver() {
  messageText.textContent = "That's the end of this round. Thanks for playing! ✦";
  spinControl.disabled = true;
  spinControl.innerHTML = "<span>ROUND OVER</span><b>✦</b>";
}

function spinReels() {
  if (spinning) return;
  if (points < 10) {
    showGameOver();
    return;
  }

  spinning = true;
  points -= 10;
  showPoints();
  spinControl.disabled = true;
  spinControl.innerHTML = "<span>SPINNING</span><b>…</b>";
  messageText.textContent = "A little sparkle is on its way...";
  reelTiles.forEach(tile => tile.classList.add("rolling"));

  spinInterval = setInterval(() => {
    reelTiles.forEach(tile => { tile.textContent = pickSymbol(); });
  }, 85);

  stopTimeout = setTimeout(() => {
    clearInterval(spinInterval);
    spinInterval = null;

    reelTiles.forEach(tile => {
      tile.classList.remove("rolling");
      tile.textContent = pickSymbol();
    });

    const [one, two, three] = reelTiles.map(tile => tile.textContent);
    if (one === two && two === three) {
      points += 100;
      messageText.textContent = "TRIPLE MATCH! You collected 100 bonus points! ✨";
    } else {
      messageText.textContent = "A colourful try! No match this time — spin again.";
    }

    showPoints();
    spinning = false;

    if (points < 10) {
      showGameOver();
    } else {
      spinControl.disabled = false;
      spinControl.innerHTML = "<span>SPIN AGAIN</span><b>↗</b>";
    }
  }, 1550);
}

spinControl.addEventListener("click", spinReels);
showPoints();
