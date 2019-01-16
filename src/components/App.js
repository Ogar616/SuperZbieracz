import React from "react";
import Cell from "./Cell.jsx";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: this.createBoard(),
      wands: 3,
      movesBack: 3,
      points: 0,
      previousCells: [],
      hideGameOver: true,
      topPlayers: [],
      bestHide: true,
      infoHide: true
    };
  }

  showHideInfo = () => {
    if (this.state.bestHide === true)
      this.setState({ infoHide: this.state.infoHide === true ? false : true });
  };

  showHideBestPlayers = () => {
    if (this.state.infoHide === true)
      this.setState({ bestHide: this.state.bestHide === true ? false : true });
  };

  restartGame = () => {
    this.setState({ cells: this.createBoard() }, () => this.addNewCells());
  };

  magicWand = () => {
    const emptyCells = [];
    this.state.cells.forEach(e => {
      if (e.level === 0) emptyCells.push(e);
    });
    if (this.state.wands > 0 && emptyCells.length > 0) {
      const wandedCells = this.state.cells.map(cell => {
        if (cell.level === 1) return { level: 0, key: cell.key };
        else return cell;
      });

      this.setState(
        {
          cells: wandedCells,
          wands: this.state.wands - 1
        },
        () => this.setState({ points: this.countMoney() })
      );
    }
  };

  createBoard = () => {
    const start = [];
    for (let i = 0; i < 25; i++) {
      start[i] = { level: 0, key: i };
    }
    return start;
  };

  gameOverCheck = () => {
    const emptyCells = [];
    this.state.cells.forEach(e => {
      if (e.level < 1) emptyCells.push(e);
    });

    if (emptyCells.length < 1) {
      const newName = prompt("Podaj swoje imię");
      const list = this.state.topPlayers;
      list.push([newName, this.state.points]);
      list.sort((a, b) => a[1] - b[1]);
      this.setState(
        { hideGameOver: false, topPlayers: list },
        console.log("Game over")
      );
    }
  };

  moveBack = () => {
    if (this.state.points > 2) {
      if (
        this.state.movesBack > 0 &&
        this.state.previousCells !== this.state.cells
      ) {
        const previousCells = this.state.previousCells;
        previousCells.forEach((cell, index) => (cell.key = index));
        this.setState({
          cells: previousCells,
          movesBack: this.state.movesBack - 1,
          points: this.countMoney()
        });
      }
    }
  };

  addNewCells = () => {
    this.gameOverCheck();

    // if (this.state.hideGameOver === false) return;

    const newCells = this.state.cells;

    newCells.forEach((cell, index) => (cell.key = index));

    const arrayOfEmptyCells = newCells.filter(cell => cell.level < 1);

    const newCell1 =
      arrayOfEmptyCells[Math.round(Math.random() * arrayOfEmptyCells.length)];

    arrayOfEmptyCells.splice(newCell1.key, 1);

    const newCell2 =
      arrayOfEmptyCells[Math.round(Math.random() * arrayOfEmptyCells.length)];

    newCells[newCell1.key] = { level: 1, key: newCell1.key, class: "newCell" };
    newCells[newCell2.key] = { level: 1, key: newCell2.key, class: "newCell" };

    this.setState({ cells: newCells, points: this.countMoney() });
  };

  componentDidMount = () => {
    document.addEventListener("keyup", this.handleKeys);
    this.addNewCells();
  };

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  };

  levelValues = [
    0,
    1,
    2,
    5,
    10,
    20,
    50,
    100,
    200,
    500,
    1000,
    2000,
    5000,
    10000,
    20000,
    50000
  ];

  countMoney = () => {
    let moneyCounter = 0;
    this.state.cells.forEach(
      (cell, index) =>
        (moneyCounter += this.levelValues[this.state.cells[index].level])
    );
    return moneyCounter;
  };

  changePlane = cells => {
    const col1 = [];
    const col2 = [];
    const col3 = [];
    const col4 = [];
    const col5 = [];

    cells.forEach((cell, index) => {
      if (index % 5 === 0) col1.push(cell);
      if (index % 5 === 1) col2.push(cell);
      if (index % 5 === 2) col3.push(cell);
      if (index % 5 === 3) col4.push(cell);
      if (index % 5 === 4) col5.push(cell);
    });

    return [col1, col2, col3, col4, col5];
  };

  moveCells = (direction, cells) => {
    let row1 = cells.slice(0, 5);
    let row2 = cells.slice(5, 10);
    let row3 = cells.slice(10, 15);
    let row4 = cells.slice(15, 20);
    let row5 = cells.slice(20, 25);

    const removeEmptyAndFixKeysLeft = cells => {
      let fullCellsOnly = cells.filter(cell => cell.level > 0);

      cells.forEach((cell, index) => (cells[index].key1 = index));

      for (let i = 0; i < 5; i++)
        if (!fullCellsOnly[i]) fullCellsOnly.push({ level: 0 });

      fullCellsOnly.forEach((cell, index) => (cell.oldLevel = cells[index].level));

      return fullCellsOnly;
    };

    const removeEmptyAndFixKeysRight = cells => {
      const fullCellsOnly = cells.filter(cell => cell.level > 0);

      cells.forEach((cell, index) => (cells[index].key1 = index));

      for (let i = 0; i < 5; i++)
        if (!fullCellsOnly[i]) fullCellsOnly.unshift({ level: 0 });

      fullCellsOnly.forEach((e, i) => (e.oldLevel = cells[i].level));

      return fullCellsOnly;
    };

    const removeEmptyLeft = (cells, oldLevels) => {
      const fullCellsOnly = cells.filter(cell => cell.level > 0);

      for (let i = 0; i < 5; i++)
        if (!fullCellsOnly[i])
          fullCellsOnly.push({ level: 0, oldLevel: oldLevels[i] });

      fullCellsOnly.forEach(
        (cell, index) => (fullCellsOnly[index].oldLevel = oldLevels[index] || 0)
      );

      return fullCellsOnly;
    };

    const removeEmptyRight = (cells, oldLevels) => {
      const fullCellsOnly = cells.filter(cell => cell.level > 0);

      for (let i = 0; i < 5; i++)
        if (!fullCellsOnly[i])
          fullCellsOnly.unshift({ level: 0, oldLevel: oldLevels[i] });

      fullCellsOnly.forEach(
        (cell, index) => (fullCellsOnly[index].oldLevel = oldLevels[index] || 0)
      );

      return fullCellsOnly;
    };

    const mergeLeft = cells => {
      const oldLevels = [];

      cells.forEach((cell, index) => {
        if (cell.oldLevel) oldLevels[index] = cell.oldLevel;
      });

      cells.forEach((cell, index) => {
        if (cells[index].level > 0 && cells[index + 1])
          if (cells[index].level === cells[index + 1].level) {
            cells[index].level++;
            cells[index].class = "lvl-up";
            cells[index].key2 = cells[index + 1].key1;
            cells[index + 1].level = 0;
          }
      });
      return removeEmptyLeft(cells, oldLevels);
    };

    const mergeRight = cells => {
      const oldLevels = [];

      cells.forEach((cell, index) => {
        if (cell.oldLevel) oldLevels[index] = cell.oldLevel;
      });

      cells.forEach((cell, index) => {
        if (cells[index].level > 0 && cells[index - 1]) {
          if (cells[index].level === cells[index - 1].level) {
            cells[index].level++;
            cells[index].key2 = cells[index - 1].key1;
            cells[index - 1].level = 0;
          }
        }
      });

      return removeEmptyRight(cells, oldLevels);
    };

    if (direction === "left") {
      row1 = removeEmptyAndFixKeysLeft(row1);
      row2 = removeEmptyAndFixKeysLeft(row2);
      row3 = removeEmptyAndFixKeysLeft(row3);
      row4 = removeEmptyAndFixKeysLeft(row4);
      row5 = removeEmptyAndFixKeysLeft(row5);

      row1 = mergeLeft(row1);
      row2 = mergeLeft(row2);
      row3 = mergeLeft(row3);
      row4 = mergeLeft(row4);
      row5 = mergeLeft(row5);

      return [row1, row2, row3, row4, row5];
    }

    if (direction === "right") {
      row1 = removeEmptyAndFixKeysRight(row1);
      row2 = removeEmptyAndFixKeysRight(row2);
      row3 = removeEmptyAndFixKeysRight(row3);
      row4 = removeEmptyAndFixKeysRight(row4);
      row5 = removeEmptyAndFixKeysRight(row5);

      row1 = mergeRight(row1);
      row2 = mergeRight(row2);
      row3 = mergeRight(row3);
      row4 = mergeRight(row4);
      row5 = mergeRight(row5);

      return [row1, row2, row3, row4, row5];
    }

    if (direction === "up") {
      cells = this.changePlane(cells);

      let col1 = cells[0];
      let col2 = cells[1];
      let col3 = cells[2];
      let col4 = cells[3];
      let col5 = cells[4];

      col1 = removeEmptyAndFixKeysLeft(col1);
      col2 = removeEmptyAndFixKeysLeft(col2);
      col3 = removeEmptyAndFixKeysLeft(col3);
      col4 = removeEmptyAndFixKeysLeft(col4);
      col5 = removeEmptyAndFixKeysLeft(col5);

      col1 = mergeLeft(col1);
      col2 = mergeLeft(col2);
      col3 = mergeLeft(col3);
      col4 = mergeLeft(col4);
      col5 = mergeLeft(col5);

      cells = [...col1, ...col2, ...col3, ...col4, ...col5];

      return this.changePlane(cells);
    }

    if (direction === "down") {
      cells = this.changePlane(cells);

      let col1 = cells[0];
      let col2 = cells[1];
      let col3 = cells[2];
      let col4 = cells[3];
      let col5 = cells[4];

      col1 = removeEmptyAndFixKeysRight(col1);
      col2 = removeEmptyAndFixKeysRight(col2);
      col3 = removeEmptyAndFixKeysRight(col3);
      col4 = removeEmptyAndFixKeysRight(col4);
      col5 = removeEmptyAndFixKeysRight(col5);

      col1 = mergeRight(col1);
      col2 = mergeRight(col2);
      col3 = mergeRight(col3);
      col4 = mergeRight(col4);
      col5 = mergeRight(col5);

      cells = [...col1, ...col2, ...col3, ...col4, ...col5];

      return this.changePlane(cells);
    }
  };

  concatRows = cells => {
    const allCells = [];

    cells.forEach(cells => {
      cells.forEach(cell => {
        allCells.push(cell);
      });
    });

    return allCells;
  };

  calculateClass = (row, direction) => {
    let classes = [];

    if (direction === "left") {
      const defineClass = count => {
        if (count === 1) return "moveLeft1";
        if (count === 2) return "moveLeft2";
        if (count === 3) return "moveLeft3";
        if (count === 4) return "moveLeft4";
      };

      row.forEach((cell, index) => {
        if (typeof cell.key1 === "number" && typeof cell.key2 !== "number") {
          classes[cell.key1] = defineClass(cell.key1 - index);
        }

        if (typeof cell.key2 === "number" && cell.key1 !== cell.key2) {
          classes[cell.key1] = defineClass(cell.key1 - index);
          classes[cell.key2] = defineClass(cell.key2 - index);
          classes[index] = "lvl+";
        }
      });
    }

    if (direction === "right") {
      const defineClass = count => {
        if (count === 1) return "moveRight1";
        if (count === 2) return "moveRight2";
        if (count === 3) return "moveRight3";
        if (count === 4) return "moveRight4";
      };

      row.forEach((cell, index) => {
        if (typeof cell.key1 === "number" && typeof cell.key2 !== "number") {
          classes[cell.key1] = defineClass(index - cell.key1);
        }

        if (typeof cell.key2 === "number" && cell.key1 !== cell.key2) {
          classes[cell.key1] = defineClass(index - cell.key1);
          classes[cell.key2] = defineClass(index - cell.key2);
          classes[index] = "lvl+";
        }
      });
    }

    if (direction === "up") {
      const defineClass = count => {
        if (count === 1) return "moveUp1";
        if (count === 2) return "moveUp2";
        if (count === 3) return "moveUp3";
        if (count === 4) return "moveUp4";
      };

      row.forEach((cell, index) => {
        if (typeof cell.key1 === "number" && typeof cell.key2 !== "number") {
          classes[cell.key1] = defineClass(cell.key1 - index);
        }

        if (typeof cell.key2 === "number" && cell.key1 !== cell.key2) {
          classes[cell.key1] = defineClass(cell.key1 - index);
          classes[cell.key2] = defineClass(cell.key2 - index);
          classes[index] = "lvl+";
        }
      });
    }

    if (direction === "down") {
      const defineClass = count => {
        if (count === 1) return "moveDown1";
        if (count === 2) return "moveDown2";
        if (count === 3) return "moveDown3";
        if (count === 4) return "moveDown4";
      };

      row.forEach((cell, index) => {
        if (typeof cell.key1 === "number" && typeof cell.key2 !== "number") {
          classes[cell.key1] = defineClass(index - cell.key1);
        }

        if (typeof cell.key2 === "number" && cell.key1 !== cell.key2) {
          classes[cell.key1] = defineClass(index - cell.key1);
          classes[cell.key2] = defineClass(index - cell.key2);
          classes[index] = "lvl+";
        }
      });
    }

    return classes;
  };

  handleKeys = key => {
    this.setState({ previousCells: this.state.cells.slice(0) });

    const oldCells = [];
    this.state.cells.forEach(
      (cell, index) =>
        (oldCells[index] = Object.assign({}, this.state.cells[index]))
    );

    const leftArrow = 37;
    const rightArrow = 39;
    const upArrow = 38;
    const downArrow = 40;

    let cellsBefore;
    let cellsAfter;

    if (key.which === leftArrow) {
      let newCells = this.moveCells("left", oldCells);

      newCells = this.concatRows(newCells);

      newCells.forEach((cell, index) => (cell.key = index));

      let row1 = newCells.slice(0, 5);
      let row2 = newCells.slice(5, 10);
      let row3 = newCells.slice(10, 15);
      let row4 = newCells.slice(15, 20);
      let row5 = newCells.slice(20, 25);

      row1.forEach((cell, index) => {
        cell.class = this.calculateClass(row1, "left")[index];
      });
      row2.forEach((cell, index) => {
        cell.class = this.calculateClass(row2, "left")[index];
      });
      row3.forEach((cell, index) => {
        cell.class = this.calculateClass(row3, "left")[index];
      });
      row4.forEach((cell, index) => {
        cell.class = this.calculateClass(row4, "left")[index];
      });
      row5.forEach((cell, index) => {
        cell.class = this.calculateClass(row5, "left")[index];
      });

      cellsBefore = JSON.parse(
        JSON.stringify([...row1, ...row2, ...row3, ...row4, ...row5])
      );

      cellsAfter = newCells;
    }

    if (key.which === rightArrow) {
      let newCells = this.moveCells("right", oldCells);

      newCells = this.concatRows(newCells);

      newCells.forEach((cell, index) => (cell.key = index));

      let row1 = newCells.slice(0, 5);
      let row2 = newCells.slice(5, 10);
      let row3 = newCells.slice(10, 15);
      let row4 = newCells.slice(15, 20);
      let row5 = newCells.slice(20, 25);

      row1.forEach((cell, index) => {
        cell.class = this.calculateClass(row1, "right")[index];
      });
      row2.forEach((cell, index) => {
        cell.class = this.calculateClass(row2, "right")[index];
      });
      row3.forEach((cell, index) => {
        cell.class = this.calculateClass(row3, "right")[index];
      });
      row4.forEach((cell, index) => {
        cell.class = this.calculateClass(row4, "right")[index];
      });
      row5.forEach((cell, index) => {
        cell.class = this.calculateClass(row5, "right")[index];
      });

      cellsBefore = JSON.parse(
        JSON.stringify([...row1, ...row2, ...row3, ...row4, ...row5])
      );

      cellsAfter = newCells;
    }

    if (key.which === upArrow) {
      let newCells = this.moveCells("up", oldCells);

      newCells = this.concatRows(newCells);

      newCells.forEach((e, i) => (e.key = i));

      newCells = this.changePlane(newCells);

      let row1 = newCells[0];
      let row2 = newCells[1];
      let row3 = newCells[2];
      let row4 = newCells[3];
      let row5 = newCells[4];

      row1.forEach((cell, index) => {
        cell.class = this.calculateClass(row1, "up")[index];
      });
      row2.forEach((cell, index) => {
        cell.class = this.calculateClass(row2, "up")[index];
      });
      row3.forEach((cell, index) => {
        cell.class = this.calculateClass(row3, "up")[index];
      });
      row4.forEach((cell, index) => {
        cell.class = this.calculateClass(row4, "up")[index];
      });
      row5.forEach((cell, index) => {
        cell.class = this.calculateClass(row5, "up")[index];
      });

      let animatedCells = JSON.parse(
        JSON.stringify([...row1, ...row2, ...row3, ...row4, ...row5])
      );

      animatedCells = this.changePlane(animatedCells);

      animatedCells = this.concatRows(animatedCells);

      newCells = this.concatRows(newCells);

      newCells = this.changePlane(newCells);

      newCells = this.concatRows(newCells);

      newCells.forEach((cell, index) => (cell.key = index));

      cellsBefore = animatedCells;
      cellsAfter = newCells;
    }

    if (key.which === downArrow) {
      let newCells = this.moveCells("down", oldCells);

      newCells = this.concatRows(newCells);

      newCells.forEach((cell, index) => (cell.key = index));

      newCells = this.changePlane(newCells);

      let row1 = newCells[0];
      let row2 = newCells[1];
      let row3 = newCells[2];
      let row4 = newCells[3];
      let row5 = newCells[4];

      row1.forEach((cell, index) => {
        cell.class = this.calculateClass(row1, "down")[index];
      });
      row2.forEach((cell, index) => {
        cell.class = this.calculateClass(row2, "down")[index];
      });
      row3.forEach((cell, index) => {
        cell.class = this.calculateClass(row3, "down")[index];
      });
      row4.forEach((cell, index) => {
        cell.class = this.calculateClass(row4, "down")[index];
      });
      row5.forEach((cell, index) => {
        cell.class = this.calculateClass(row5, "down")[index];
      });

      let animatedCells = JSON.parse(
        JSON.stringify([...row1, ...row2, ...row3, ...row4, ...row5])
      );

      animatedCells = this.changePlane(animatedCells);

      animatedCells = this.concatRows(animatedCells);

      newCells = this.concatRows(newCells);

      newCells = this.changePlane(newCells);

      newCells = this.concatRows(newCells);

      newCells.forEach((cell, index) => (cell.key = index));

      cellsBefore = animatedCells;
      cellsAfter = newCells;
    }

    cellsBefore.forEach((cell, index) => (cell.key = index));

    this.setState({ cells: cellsBefore }, () => {
      this.timer = setTimeout(() => {
        cellsAfter.forEach((cell, index) => {
          cellsAfter[index].key = index;
          cellsAfter[index].key1 = null;
          cellsAfter[index].key2 = null;
          cellsAfter[index].oldLevel = false;
        });

        cellsBefore.forEach((cell, index) => {
          if (cell.class === "lvl+") cellsAfter[index].class = "lvlUp";
        });

        this.setState({ cells: cellsAfter });
        this.addNewCells();
      }, 500);
    });
  };

  render() {
    if (this.state.cells.length === 0) return null;

    const cells = this.state.cells.map(element => (
      <Cell
        key={element.key}
        oldLevel={element.oldLevel}
        level={element.level}
        class={element.class}
      />
    ));
    // const list = this.state.topPlayers.map((player, index) => (
    //   <li key={index}>
    //     {player[0]} - {player[1]}
    //   </li>
    // ));

    let countZl = 0;
    if (this.state.points / 100 > 1)
      if (this.state.points / 100 > 1)
        countZl = Math.floor(this.state.points / 100);
    const countGr = this.state.points % 100;

    return (
      <div className="container">
        <h1>Super Zbieracz - THE GAME !!!</h1>
        <div className="control-buttons">
          <div className="info-button" onClick={this.showHideInfo}>
            INFO
          </div>
          <div className="restart-button" onClick={this.restartGame}>
            {" "}
          </div>
          <div className="back-button" onClick={this.moveBack}>
            <span className="back-span">{this.state.movesBack}</span>
          </div>
          <div className="magic-wand-button" onClick={this.magicWand}>
            <span className="wand-span">{this.state.wands}</span>
          </div>
          <div className="best-button" onClick={this.showHideBestPlayers}>
            Best Players
          </div>
        </div>
        <div className="board">
          {cells}
          <div className="best-players-panel" hidden={this.state.bestHide}>
            Najlepsze wyniki:{" "}
            <ol>
              <li />
              <li />
            </ol>
          </div>
          <div className="info-panel" hidden={this.state.infoHide}>
            <h3>Zasady gry:</h3>
            <br />
            <p>
              1. Używaj strzałek na klawiaturze, żeby przesunąć wszystkie monety
              w zadanym kierunku
            </p>
            <p>
              2. Łącz dwie monety o takim samym nominale - dostaniesz droższą
              monetę
            </p>
            <p>
              3. Po każdym ruchu dwie monety o nominale 1gr. pojawiają się na
              planszy
            </p>
            <p>4. Kiedy skończy się miejsce - przygrywasz!</p>
            <p>
              5. Uzbieraj jak największą ilość pieniędzy i baw się dobrze :)
            </p>
          </div>
        </div>
        <div className="game-over-panel" hidden={this.state.hideGameOver}>
          Koniec Gry!
        </div>

        <h2 className="money-counter">
          Uzbierałeś: {countZl} zł i {countGr} gr!{" "}
        </h2>
      </div>
    );
  }
}

export default Game;
