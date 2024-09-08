function vsComputer() {
  const playSpaceButtons = document.querySelectorAll(".playSpace");
  const message = document.querySelector(".winnerMessage");
  const resetButton = document.querySelector(".resetGame");

  let counter = 0;
  let endGame = false;
  function playerMove(index) {
    // if (endGame === true) return;
    if (counter === 0) {
      playSpaceButtons[index].textContent = "X";
      playSpaceButtons[index].disabled = true;
      counter = 1;
      message.textContent = "Computer's turn";

      setTimeout(computerMove, 500);
    }
  }
  function computerMove() {
    // if (endGame === true) return;
    const freeCells = Array.from(playSpaceButtons).filter(
      (button) => button.textContent === ""
    );
    if (freeCells.length > 0 && counter === 1) {
      const randomCell =
        freeCells[Math.floor(Math.random() * freeCells.length)];
      randomCell.textContent = "O";
      randomCell.disabled = true;
      counter = 0;
      message.textContent = "Player's turn";
      noughtAndCrosses();
    }
  }

  function noughtAndCrosses(index) {
    // if (endGame === true) return;
    function checkWinner(player) {
      const b1 = playSpaceButtons[0].textContent;
      const b2 = playSpaceButtons[1].textContent;
      const b3 = playSpaceButtons[2].textContent;
      const b4 = playSpaceButtons[3].textContent;
      const b5 = playSpaceButtons[4].textContent;
      const b6 = playSpaceButtons[5].textContent;
      const b7 = playSpaceButtons[6].textContent;
      const b8 = playSpaceButtons[7].textContent;
      const b9 = playSpaceButtons[8].textContent;

      return (
        (b1 === b2 && b2 === b3 && b3 === player) ||
        (b6 === b4 && b4 === b5 && b5 === player) ||
        (b9 === b7 && b7 === b8 && b8 === player) ||
        (b1 === b4 && b4 === b7 && b7 === player) ||
        (b2 === b5 && b5 === b8 && b8 === player) ||
        (b3 === b6 && b6 === b9 && b9 === player) ||
        (b1 === b5 && b5 === b9 && b9 === player) ||
        (b3 === b5 && b5 === b7 && b7 === player)
      );
    }

    function declareWinner(player) {
      message.innerHTML = `${player} is the winner`;
      for (const button of playSpaceButtons) {
        button.disabled = true;
      }
      endGame = true;
    }

    if (checkWinner("X")) {
      declareWinner("Player");
    } else if (checkWinner("O")) {
      declareWinner("Computer");
    } else {
      const freeCells = Array.from(playSpaceButtons).filter(
        (button) => button.textContent === ""
      );
      if (freeCells.length === 0) {
        message.innerHTML = `Match is a tie`;
      }
    }

    for (const button of playSpaceButtons) {
      console.log(button.textContent);
    }
  }
  for (const [index, button] of playSpaceButtons.entries()) {
    button.addEventListener("click", () => playerMove(index));
  }
  for (const [index, button] of playSpaceButtons.entries()) {
    button.addEventListener("click", () => noughtAndCrosses(index));
  }

  resetButton.addEventListener("click", function () {
    for (const button of playSpaceButtons) {
      button.textContent = "";
      console.log("fools");
      button.disabled = false;
    }
    counter = 0;
    message.textContent = "Player's turn";
  });
}
