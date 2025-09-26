document.addEventListener("DOMContentLoaded", function () {
  const cake = document.querySelector(".cake");
  const candleCountDisplay = document.getElementById("candleCount");
  let candles = [];
  let audio = new Audio('hbd.mp3');

  // Add default candles when page loads
  function addDefaultCandles() {
    // Add 5 candles positioned across the top of the cake (250px wide)
      // Fine-tuned positioning on the exact cake edge perimeter
      // Adjusted to match the actual cake oval shape precisely
      const candlePositions = [
        { left: 125, top: -23 },      // Top center - on cake surface
        { left: 180, top: -10 },      // Top right curve
        { left: 220, top: 5 },     // Right side upper
        { left: 200, top: 30 },     // Right side lower
        { left: 165, top: 40 },     // Bottom right curve
        { left: 125, top: 45 },     // Bottom center - on cake bottom
        { left: 88, top: 40 },      // Bottom left curve
        { left: 50, top: 30 },      // Left side lower
        { left: 35, top: 5 },      // Left side upper
        { left: 70, top: -10 },       // Top left curve
      ];
    
    candlePositions.forEach(pos => {
      addCandle(pos.left, pos.top);
    });
  }


  function updateCandleCount() {
    const activeCandles = candles.filter(
      (candle) => !candle.classList.contains("out")
    ).length;
    candleCountDisplay.textContent = activeCandles;
  }

  function addCandle(left, top) {
    const candle = document.createElement("div");
    candle.className = "candle";
    candle.style.left = left + "px";
    candle.style.top = top + "px";

    const flame = document.createElement("div");
    flame.className = "flame";
    candle.appendChild(flame);

    cake.appendChild(candle);
    candles.push(candle);
    updateCandleCount();
  }

  cake.addEventListener("click", function (event) {
    const rect = cake.getBoundingClientRect();
    const left = event.clientX - rect.left;
    const top = event.clientY - rect.top;
    addCandle(left, top);
  });

  // Removed microphone-based blowing detection for a click-only experience

  // Add click handler to blow out all candles and start celebration
  const headerText = document.querySelector('.candle-count-display-1');
  let celebrationStarted = false;
  let endlessConfettiStarted = false;
  if (headerText) {
    headerText.addEventListener('click', function () {
      if (candles.length === 0) return;

      const allAlreadyOut = candles.every((candle) => candle.classList.contains('out'));

      if (!allAlreadyOut) {
        candles.forEach((candle) => {
          if (!candle.classList.contains('out')) {
            candle.classList.add('out');
          }
        });
        updateCandleCount();

        // Start celebration only once
        if (!celebrationStarted) {
          triggerConfetti();
          if (!endlessConfettiStarted) {
            endlessConfetti();
            endlessConfettiStarted = true;
          }
          audio.play();
          celebrationStarted = true;
        }

        headerText.textContent = 'Press for more confetti 🥳';
      } else {
        // Candles already out: more confetti on demand
        headerText.textContent = 'Press for more confetti 🥳';
        triggerConfetti();
      }
    });
  }

  // Add default candles when page loads
  addDefaultCandles();
});

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function endlessConfetti() {
  setInterval(function() {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0 }
    });
  }, 1000);
}

