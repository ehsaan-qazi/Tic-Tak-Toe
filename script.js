(() => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  /** @type {HTMLDivElement} */
  let boardElement;
  /** @type {NodeListOf<HTMLButtonElement>} */
  let cellButtons;
  /** @type {HTMLParagraphElement} */
  let statusText;
  /** @type {HTMLButtonElement} */
  let newRoundButton;
  /** @type {HTMLButtonElement} */
  let resetGameButton;
  /** @type {HTMLElement} */
  let scoreXElement;
  /** @type {HTMLElement} */
  let scoreOElement;
  /** @type {HTMLElement} */
  let scoreDrawElement;

  /** @type {("X"|"O"|null)[]} */
  let boardState = Array(9).fill(null);
  /** @type {"X"|"O"} */
  let currentPlayer = "X";
  let isGameActive = true;

  let scoreX = 0;
  let scoreO = 0;
  let scoreDraw = 0;

  function initialize() {
    boardElement = document.getElementById("board");
    cellButtons = boardElement.querySelectorAll(".cell");
    statusText = document.getElementById("statusText");
    newRoundButton = document.getElementById("newRoundBtn");
    resetGameButton = document.getElementById("resetGameBtn");
    scoreXElement = document.getElementById("scoreX");
    scoreOElement = document.getElementById("scoreO");
    scoreDrawElement = document.getElementById("scoreDraw");

    cellButtons.forEach((cell) => {
      cell.addEventListener("click", onCellClick);
    });

    newRoundButton.addEventListener("click", startNewRound);
    resetGameButton.addEventListener("click", resetAll);

    updateStatus();
  }

  function onCellClick(event) {
    const cell = event.currentTarget;
    const index = Number(cell.getAttribute("data-cell-index"));

    if (!isGameActive || boardState[index]) {
      return;
    }

    boardState[index] = currentPlayer;
    updateCellUI(cell, currentPlayer);
    cell.setAttribute("aria-label", `Cell ${index + 1}, ${currentPlayer}`);

    const winningLine = getWinningLine();
    if (winningLine) {
      isGameActive = false;
      highlightWinningCells(winningLine);
      updateScores(currentPlayer);
      statusText.textContent = `${currentPlayer} wins!`;
      return;
    }

    if (boardState.every((v) => v !== null)) {
      isGameActive = false;
      scoreDraw += 1;
      updateScoreboard();
      statusText.textContent = "It's a draw.";
      return;
    }

    togglePlayer();
    updateStatus();
  }

  function updateCellUI(cell, player) {
    cell.textContent = player;
    cell.classList.add(player === "X" ? "mark-x" : "mark-o");
    cell.disabled = true;
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function updateStatus() {
    statusText.textContent = `${currentPlayer} to move`;
  }

  function getWinningLine() {
    for (const [a, b, c] of winningCombinations) {
      const va = boardState[a];
      if (va && va === boardState[b] && va === boardState[c]) {
        return [a, b, c];
      }
    }
    return null;
  }

  function highlightWinningCells(indices) {
    indices.forEach((i) => {
      const cell = cellButtons[i];
      cell.classList.add("win");
    });
  }

  function updateScores(winner) {
    if (winner === "X") {
      scoreX += 1;
    } else {
      scoreO += 1;
    }
    updateScoreboard();
  }

  function updateScoreboard() {
    scoreXElement.textContent = String(scoreX);
    scoreOElement.textContent = String(scoreO);
    scoreDrawElement.textContent = String(scoreDraw);
  }

  function startNewRound() {
    boardState = Array(9).fill(null);
    isGameActive = true;
    currentPlayer = "X";
    statusText.textContent = "X to move";

    cellButtons.forEach((cell, index) => {
      cell.textContent = "";
      cell.classList.remove("mark-x", "mark-o", "win");
      cell.disabled = false;
      cell.setAttribute("aria-label", `Cell ${index + 1}, empty`);
    });
  }

  function resetAll() {
    scoreX = 0;
    scoreO = 0;
    scoreDraw = 0;
    updateScoreboard();
    startNewRound();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
