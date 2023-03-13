//1. firstly i need to depot some money
//2. then i need to determine number of line to bet on
//3. collect a bet amount
//4. Spin the slot machine
//5. check if the user won
//6. check the user their winnings
//7. play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// first way of making a function
// function deposite(){// making of a function
//     return 1

// }
//deposite()//calling a function

//second way of making a function
const deposite = () => {
  while (true) {
    const depositeAmount = prompt("Enter a deposit amount: ");
    // now need to convert amount of string into the number
    const numberDepositeAmount = parseFloat(depositeAmount);

    if (isNaN(numberDepositeAmount) || numberDepositeAmount <= 0) {
      console.log("invalid deposite amount, try again");
    } else {
      return numberDepositeAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    // now need to convert amount of string into the number
    const numberOflines = parseFloat(lines);

    if (isNaN(numberOflines) || numberOflines <= 0 || numberOflines > 3) {
      console.log("invalid number of lines, try again");
    } else {
      return numberOflines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    // now need to convert amount of string into the number
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("invalid bet, try again");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  //    console.log(symbols)

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != rows.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposite();

  while (true) {
    console.log("you have a balance of $ " + balance);
    const numberOflines = getNumberOfLines();
    const bet = getBet(balance, numberOflines);
    balance -= bet * numberOflines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOflines);
    balance += winnings;
    console.log("you won, $" + winnings.toString());

    if (balance <= 0) {
      console.log("you ran of money");
      break;
    }

    const playAgain = prompt("do u want to  play again (y/n)");
    {
      if (playAgain != "y") break;
    }
  }
};
game();
