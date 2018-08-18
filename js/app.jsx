import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component{
    render(){
        return <div>
            <Game/>
        </div>
    }
}


class Cell extends React.Component{
    cellWidth = 100;
    cellHeight = 100;
    styles = [
        {backgroundColor: "lightgrey" , float: "left", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box", border: "5px solid black", borderRadius: "50px"},
        {backgroundImage: 'url("./img/1gr3.png")' , float: "left",backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box", borderRadius: "50px"},
        {float: "left", backgroundImage: 'url("./img/2gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/5gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/10gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/20gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/50gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/1zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/2zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/5zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/10zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/20zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/50zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/100zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/200zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
        {float: "left", backgroundImage: 'url("./img/500.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: this.cellWidth + "px", height: this.cellHeight + "px", boxSizing: "border-box"},
    ];

    render(){
        let cellStyle = this.styles[this.props.level];
        if (typeof this.props.oldLevel === "number"){
            cellStyle = this.styles[this.props.oldLevel];
        }

        return <div className={this.props.class} key={this.props.number} style={cellStyle}> </div>;
    }
}

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
            topPlayers: []

        }
    };

    restartGame = () => {
        this.setState({cells: this.createBoard()}, () => this.addNewCells());
    };

    magicWand = () => {
        let emptyCells = [];
        this.state.cells.forEach(e => {
           if (e.level === 0)
               emptyCells.push(e);
        });
            if ((this.state.wands > 0) && (emptyCells.length > 0)){
                let wandedCells = this.state.cells.map(cell => {
                    if (cell.level === 1)
                        return {level: 0, key: cell.key};
                    else return cell;
                });

                this.setState({
                    cells: wandedCells,
                    wands: this.state.wands - 1,
                }, () => this.setState({points: this.countMoney()}));
            }
    };

    createBoard = () => {

        let start =[];
        for (let i = 0; i < 25; i++){
            start[i] = {level: 0, key: i, class: "static"}
        }

        return start;
    };

    gameOverCheck = () => {

        let emptyCells = [];
        this.state.cells.forEach(e => {
            if (e.level < 1)
                emptyCells.push(e);
        });
        if (emptyCells.length < 2){
            let newName = prompt("Podaj swoje imię");
            let list = this.state.topPlayers;
            console.log(list);
            list.push([newName, this.state.points]);
            console.log(list);
            list.sort((a, b) => a[1] - b[1]);
            console.log(list);
            this.setState({hideGameOver: false, topPlayers: list}, console.log("Game over"))
        }


    };

    moveBack = () => {

        if (this.state.points > 2) {
            if ((this.state.movesBack > 0) && (this.state.previousCells !== this.state.cells)){
                let previousCells = this.state.previousCells;
                previousCells.forEach((cell, index) => cell.key = index);
                this.setState({cells: previousCells, movesBack: this.state.movesBack - 1, points: this.countMoney()});
            }

        }
    };

    addNewCells = () => {

        this.gameOverCheck();

        if (this.state.hideGameOver === false) return;

        let newCell1 = -1;
        let newCell2 = -1;

        let arrayOfEmptyCells = [];

        this.state.cells.forEach( (cell, index) => {
            if (cell.level === 0) arrayOfEmptyCells.push(index);
        });

        while(arrayOfEmptyCells.indexOf(newCell1) < 0){
            newCell1 = Math.round(Math.random() * 24);
        }
        while((newCell1 === newCell2) || (arrayOfEmptyCells.indexOf(newCell2) < 0)){
            newCell2 = Math.round(Math.random() * 24);
        }

        let newCells = this.state.cells;
        // //
        // newCell1 = 1;
        // newCell2 = 3;

        newCells[newCell1] = {level: 1, key: newCell1, class: "newCell"};
        newCells[newCell2] = {level: 1, key: newCell2, class: "newCell"};

        this.setState({cells: newCells, points: this.countMoney()});

    };

    componentDidMount = () => {
        document.addEventListener("keyup", this.handleKeys);
        this.addNewCells();

        let arr = [];
        for (let i = 0 ; i < 25; i ++){
            arr.push(i);
        }

        // console.log(arr);
        // arr = this.changePlane(arr);
        // console.log(arr);
        // arr = [...arr[0], ...arr[1], ...arr[2], ...arr[3], ...arr[4]];
        // arr = this.changePlane(arr);
        // console.log(arr)


    };

    levelValues = [0, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000];

    countMoney = () => {
        let moneyCounter = 0;
        for (let i = 0; i < this.state.cells.length; i++){
            moneyCounter += this.levelValues[this.state.cells[i].level];
        }
        return moneyCounter;
    };


    changePlane = (cells) => {

        let col1 = [];
        let col2 = [];
        let col3 = [];
        let col4 = [];
        let col5 = [];

       cells.forEach((cell, index) => {
            if (index % 5 === 0)
                col1.push(cell);
            if (index % 5 === 1)
                col2.push(cell);
            if (index % 5 === 2)
                col3.push(cell);
            if (index % 5 === 3)
                col4.push(cell);
            if (index % 5 === 4)
                col5.push(cell);
        });
       return [col1, col2, col3, col4, col5];
    };

    moveCells = (direction, cells) => {

        let row1 = cells.slice(0, 5);
        let row2 = cells.slice(5, 10);
        let row3 = cells.slice(10, 15);
        let row4 = cells.slice(15, 20);
        let row5 = cells.slice(20, 25);

        let removeEmptyAndFixKeysLeft = cells => {

            let fullCellsOnly = [];

            for (let i = 0; i < 5; i++)
                cells[i].key1 = i;

            cells.forEach(cell => {
                if (cell.level > 0)
                    fullCellsOnly.push(cell);

            });

            for (let i = 0; i < 5; i++)
                if (fullCellsOnly.length < 5)
                    fullCellsOnly.push({level: 0});


            fullCellsOnly.forEach((e, i) => {
                e.oldLevel = cells[i].level;
            });

            return fullCellsOnly;
        };

        let removeEmptyAndFixKeysRight = cells => {

            let fullCellsOnly = [];

            for (let i = 0; i < 5; i++)
                cells[i].key1 = i;

            cells.forEach((cell) => {
                if (cell.level > 0)
                    fullCellsOnly.push(cell);
            });

            for (let i = 0; i < 5; i++)
                if (fullCellsOnly.length < 5)
                    fullCellsOnly.unshift({level: 0});

            fullCellsOnly.forEach((e,i) => {
                e.oldLevel = cells[i].level;
            });

            return fullCellsOnly;
        };

        let removeEmptyLeft = (cells, oldLevels) => {

            let fullCellsOnly = [];

            cells.forEach(cell => {
                if (cell.level > 0)
                    fullCellsOnly.push(cell);
            });

            for (let i = 0; i < 5; i++)
                if (!fullCellsOnly[i])
                    fullCellsOnly.push({level: 0, oldLevel: oldLevels[i]});

            for (let i = 0; i < 5; i++) {
                fullCellsOnly[i].oldLevel = oldLevels[i] || 0;
            }

            return fullCellsOnly;
        };

        let removeEmptyRight = (cells, oldLevels) => {

            let fullCellsOnly = [];

            cells.forEach(cell => {
                if (cell.level > 0)
                    fullCellsOnly.push(cell);
            });

            for (let i = 0; i < 5; i++)
                if (!fullCellsOnly[i])
                    fullCellsOnly.unshift({level: 0});

            for (let i = 0; i < 5; i++) {
                fullCellsOnly[i].oldLevel = oldLevels[i] || 0;
            }

            return fullCellsOnly;
        };

        let mergeLeft = (cells) => {

            let oldLevels = [];

            cells.forEach((e, i) => {
                if (e.oldLevel)
                    oldLevels[i] = e.oldLevel;
            });

            for (let i = 0; i < 5; i++){
                if ((cells[i].level > 0) && (cells[i + 1]))
                    if (cells[i].level === cells[i + 1].level){
                        cells[i].level++;
                        cells[i].class = "lvlUp";
                        cells[i].key2 = cells[i + 1].key1;
                        cells[i + 1].level = 0;
                    }
            }

            return removeEmptyLeft(cells, oldLevels);
        };

        let mergeRight = (cells) => {

            let oldLevels = [];

            cells.forEach((e, i) => {
                if (e.oldLevel)
                    oldLevels[i] = e.oldLevel;
            });

            for (let i = 4; i > -1; i--){
                if ((cells[i].level > 0) && (cells[i - 1])){
                    if (cells[i].level === cells[i - 1].level){
                        cells[i].level++;
                        cells[i].key2 = cells[i - 1].key1;
                        cells[i - 1].level = 0;
                    }
                }
            }

            return removeEmptyRight(cells, oldLevels);
        };

        if (direction === "left"){

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

        if (direction === "right"){

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

        if (direction === "up"){

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


            console.log("rotated board after remove and fix");
            console.log([...col1, ...col2, ...col3, ...col4, ...col5]);

            col1 = mergeLeft(col1);
            col2 = mergeLeft(col2);
            col3 = mergeLeft(col3);
            col4 = mergeLeft(col4);
            col5 = mergeLeft(col5);


            console.log("rotated board after merge");
            console.log([...col1, ...col2, ...col3, ...col4, ...col5]);

            cells = [...col1, ...col2, ...col3, ...col4, ...col5];

            return this.changePlane(cells);
        }

        if (direction === "down"){

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

    calculateClass = (row, direction) => {

        let classes = ["static", "static", "static", "static", "static"];

        if (direction === "left"){
            let defineClass = count => {
                if (count === 1) return "moveLeft1";
                if (count === 2) return "moveLeft2";
                if (count === 3) return "moveLeft3";
                if (count === 4) return "moveLeft4";
            };

            row.forEach((e, i) => {

                if (e.key1 && !e.key2){
                    classes[e.key1] = defineClass(e.key1 - i);
                }

                if (e.key2){
                    classes[e.key1] = defineClass(e.key1 - i);
                    classes[e.key2] = defineClass(e.key2 - i);
                    classes[i] = "lvl+";   ///////////////////////
                }
            });
        }

        if (direction === "right"){

            let defineClass = count => {
                if (count === 1) return "moveRight1";
                if (count === 2) return "moveRight2";
                if (count === 3) return "moveRight3";
                if (count === 4) return "moveRight4";
            };

            row.forEach((e, i) => {
                if (e.key1 && !e.key2){
                    classes[e.key1] = defineClass(i - e.key1);
                }

                if (e.key2){
                    classes[e.key1] = defineClass(i - e.key1);
                    classes[e.key2] = defineClass(i - e.key2);
                }
            });
        }

        if (direction === "up"){

            let defineClass = count => {
                if (count === 1) return "moveUp1";
                if (count === 2) return "moveUp2";
                if (count === 3) return "moveUp3";
                if (count === 4) return "moveUp4";
            };

            row.forEach((e, i) => {
                if (e.key1 && !e.key2){
                    classes[e.key1] = defineClass(e.key1 - i);  ///////////////////
                }

                if (e.key2){
                    classes[e.key1] = defineClass(e.key1 - i);
                    classes[e.key2] = defineClass(e.key2 - i);
                }
            });
        }

        if (direction === "down"){

            let defineClass = count => {
                if (count === 1) return "moveDown1";
                if (count === 2) return "moveDown2";
                if (count === 3) return "moveDown3";
                if (count === 4) return "moveDown4";
            };

            row.forEach((e, i) => {
                if (e.key1 && !e.key2){
                    classes[e.key1] = defineClass(i - e.key1);
                }

                if (e.key2){
                    classes[e.key1] = defineClass(i - e.key1);
                    classes[e.key2] = defineClass(i - e.key2);
                }
            });
        }

        return classes;
    };

    handleKeys = (key) => {

        this.setState({previousCells: this.state.cells.slice(0)});

        let leftArrow = 37;
        if (key.which === leftArrow) {

            let oldCells = [];
            for (let i = 0; i < 25; i++){
                oldCells[i] = Object.assign({}, this.state.cells[i]);
            }

            let newCells = this.moveCells("left", oldCells);

            newCells = newCells[0].concat(newCells[1], newCells[2], newCells[3], newCells[4]);

            newCells.forEach((e, i) => e.key = i);

            let row1 = newCells.slice(0, 5);
            let row2 = newCells.slice(5, 10);
            let row3 = newCells.slice(10, 15);
            let row4 = newCells.slice(15, 20);
            let row5 = newCells.slice(20, 25);

            row1.forEach((e, i) => {
                e.class = this.calculateClass(row1, "left")[i];
            });

            row2.forEach((e, i) => {
                e.class = this.calculateClass(row2, "left")[i];
            });

            row3.forEach((e, i) => {
                e.class = this.calculateClass(row3, "left")[i];
            });

            row4.forEach((e, i) => {
                e.class = this.calculateClass(row4, "left")[i];
            });

            row5.forEach((e, i) => {
                e.class = this.calculateClass(row5, "left")[i];
            });

            let animatedCells = [...row1, ...row2, ...row3, ...row4, ...row5];

            animatedCells.forEach((e, i) => {
                e.key = i;
                if (e.class === "lvl+")
                    newCells[i].class = "lvlUp";
            });

            this.setState({cells: animatedCells}, () => {
                for (let i = 0; i < 25; i++){
                    animatedCells[i].key = i;
                    animatedCells[i].class = "static"; //////////////////////////
                    animatedCells[i].key1 = 0;
                    animatedCells[i].key2 = 0;
                    animatedCells[i].oldLevel = false;
                }

                let timer = setTimeout(() => {
                    this.setState({cells: newCells});
                    this.addNewCells();
                }, 500);
            });

        }

        let rightArrow = 39;
        if (key.which === rightArrow){

            let oldCells = [];
            for (let i = 0; i < 25; i++){
                oldCells[i] = Object.assign({}, this.state.cells[i]);
            }

            let newCells = this.moveCells("right", oldCells);

            newCells = newCells[0].concat(newCells[1], newCells[2], newCells[3], newCells[4]);

            newCells.forEach((e, i) => e.key = i);

            let row1 = newCells.slice(0, 5);
            let row2 = newCells.slice(5, 10);
            let row3 = newCells.slice(10, 15);
            let row4 = newCells.slice(15, 20);
            let row5 = newCells.slice(20, 25);

            row1.forEach((e, i) => {
                e.class = this.calculateClass(row1, "right")[i];
            });

            row2.forEach((e, i) => {
                e.class = this.calculateClass(row2, "right")[i];
            });

            row3.forEach((e, i) => {
                e.class = this.calculateClass(row3, "right")[i];
            });

            row4.forEach((e, i) => {
                e.class = this.calculateClass(row4, "right")[i];
            });

            row5.forEach((e, i) => {
                e.class = this.calculateClass(row5, "right")[i];
            });

            let animatedCells = [...row1, ...row2, ...row3, ...row4, ...row5];

            animatedCells.forEach((e, i) => {
                e.key = i;
                if (e.class === "lvl+")
                    newCells[i].class = "lvlUp";
            });

            this.setState({cells: animatedCells}, () => {
                for (let i = 0; i < 25; i++){
                    animatedCells[i].key = i;
                    animatedCells[i].class = "static";
                    animatedCells[i].key1 = 0;
                    animatedCells[i].key2 = 0;
                    animatedCells[i].oldLevel = false;
                }

                let timer = setTimeout(() => {
                    this.setState({cells: newCells});
                    this.addNewCells();
                }, 500);
            });
        }

        let upArrow = 38;
        if (key.which === upArrow){

            let oldCells = [];
            for (let i = 0; i < 25; i++){
                oldCells[i] = Object.assign({}, this.state.cells[i]);
            }

            let newCells = this.moveCells("up", oldCells);

            newCells = newCells[0].concat(newCells[1], newCells[2], newCells[3], newCells[4]);

            newCells.forEach((e, i) => e.key = i);

            newCells = this.changePlane(newCells);

            let row1 = newCells[0];
            let row2 = newCells[1];
            let row3 = newCells[2];
            let row4 = newCells[3];
            let row5 = newCells[4];

            // let row1 = newCells.slice(0, 5);
            // let row2 = newCells.slice(5, 10);
            // let row3 = newCells.slice(10, 15);
            // let row4 = newCells.slice(15, 20);
            // let row5 = newCells.slice(20, 25);

            row1.forEach((e, i) => {
                e.class = this.calculateClass(row1, "up")[i];
            });

            row2.forEach((e, i) => {
                e.class = this.calculateClass(row2, "up")[i];
            });

            row3.forEach((e, i) => {
                e.class = this.calculateClass(row3, "up")[i];
            });

            row4.forEach((e, i) => {
                e.class = this.calculateClass(row4, "up")[i];
            });

            row5.forEach((e, i) => {
                e.class = this.calculateClass(row5, "up")[i];
            });

            let animatedCells = [...row1, ...row2, ...row3, ...row4, ...row5];

            animatedCells = this.changePlane(animatedCells);

            animatedCells = animatedCells[0].concat(animatedCells[1], animatedCells[2], animatedCells[3], animatedCells[4]);

            animatedCells.forEach((e, i) => {
                e.key = i;
                if (e.class === "lvl+")
                    newCells[i].class = "lvlUp";
            });


            newCells = newCells[0].concat(newCells[1], newCells[2], newCells[3], newCells[4]);
            newCells = this.changePlane(newCells);

            newCells = newCells[0].concat(newCells[1], newCells[2], newCells[3], newCells[4]);

            newCells.forEach((e, i) => e.key = i);


            console.log("new cells");
            console.log(newCells);

            this.setState({cells: animatedCells}, () => {
                for (let i = 0; i < 25; i++){
                    animatedCells[i].key = i;
                    animatedCells[i].class = "static";
                    animatedCells[i].key1 = 0;
                    animatedCells[i].key2 = 0;
                    animatedCells[i].oldLevel = false;
                }

                let timer = setTimeout(() => {
                    this.setState({cells: newCells});
                    this.addNewCells();
                }, 500);
            });
        }

        let downArrow = 40;
        if (key.which === downArrow){

            let oldCells = [];
            for (let i = 0; i < 25; i++){
                oldCells[i] = Object.assign({}, this.state.cells[i]);
            }

            let newCells = this.moveCells("down", oldCells);

            newCells = newCells[0].concat(newCells[1], newCells[2], newCells[3], newCells[4]);

            newCells.forEach((e, i) => e.key = i);

            newCells = this.changePlane(newCells);

            let row1 = newCells[0];
            let row2 = newCells[1];
            let row3 = newCells[2];
            let row4 = newCells[3];
            let row5 = newCells[4];

            // let row1 = newCells.slice(0, 5);
            // let row2 = newCells.slice(5, 10);
            // let row3 = newCells.slice(10, 15);
            // let row4 = newCells.slice(15, 20);
            // let row5 = newCells.slice(20, 25);

            row1.forEach((e, i) => {
                e.class = this.calculateClass(row1, "down")[i];
            });

            row2.forEach((e, i) => {
                e.class = this.calculateClass(row2, "down")[i];
            });

            row3.forEach((e, i) => {
                e.class = this.calculateClass(row3, "down")[i];
            });

            row4.forEach((e, i) => {
                e.class = this.calculateClass(row4, "down")[i];
            });

            row5.forEach((e, i) => {
                e.class = this.calculateClass(row5, "down")[i];
            });

            let animatedCells = [...row1, ...row2, ...row3, ...row4, ...row5];

            animatedCells = this.changePlane(animatedCells);

            animatedCells = animatedCells[0].concat(animatedCells[1], animatedCells[2], animatedCells[3], animatedCells[4]);

            animatedCells.forEach((e, i) => {
                e.key = i;
                if (e.class === "lvl+")
                    newCells[i].class = "lvlUp";
            });


            newCells = newCells[0].concat(newCells[1], newCells[2], newCells[3], newCells[4]);
            newCells = this.changePlane(newCells);

            newCells = newCells[0].concat(newCells[1], newCells[2], newCells[3], newCells[4]);

            newCells.forEach((e, i) => e.key = i);


            console.log("new cells");
            console.log(newCells);

            this.setState({cells: animatedCells}, () => {
                for (let i = 0; i < 25; i++){
                    animatedCells[i].key = i;
                    animatedCells[i].class = "static"; //////////////////////////
                    animatedCells[i].key1 = 0;
                    animatedCells[i].key2 = 0;
                    animatedCells[i].oldLevel = false;
                }

                let timer = setTimeout(() => {
                    this.setState({cells: newCells});
                    this.addNewCells();
                }, 500);
            });
        }

    };

    render(){
        let countZl = 0;
        if ((this.state.points / 100) > 1)
            countZl = Math.floor(this.state.points / 100);
        let countGr = this.state.points % 100;



        if (this.state.cells.length === 0) return null;
        let cells = this.state.cells.map(element => <Cell key={element.key} oldLevel={element.oldLevel} level={element.level} class={element.class}/>);
        let list = this.state.topPlayers.map((e, i) => <li key={i}>{e[0]} - {e[1]}</li>);

        return <div style={{backgroundImage: 'url("./img/money.png")', backgroundSize: "cover", width: "100%", height: "900px"}}>

            <h1 style={{textAlign: "center", fontSize: "70px", background: "lightgrey", opacity: "0.8"}}>Super Zbieracz - THE GAME !!!</h1>
            <div style={{height: "100%", width: "100%", margin: "0 auto", backgroundColor: "transparent"}}>
                <div style={{margin: "5px auto", width: "300px", height: "100px", boxSizing: "borderBox", padding: "10px"}}>
                    <div style={{width: "100px", height: "100px", float: "left", borderRadius: "50px", border: "10px solid black", boxSizing: "border-box",background: "mediumseagreen", backgroundImage: 'url("./img/restart.png")', backgroundSize: "contain"}} onClick={this.restartGame}> </div>
                    <div style={{width: "100px", height: "100px", float: "left", border: "1px solid black", borderRadius:"50px", boxSizing: "border-box", background: "mediumseagreen", backgroundImage: 'url("./img/back.svg")', backgroundSize: "contain"}} onClick={this.moveBack}><span style={{fontSize: "20px", fontWeight: "bold", position: "relative", top: "25px", left: "20px"}}>{this.state.movesBack}</span></div>
                    <div style={{width: "100px", height: "100px", float: "left", border: "1px solid black", borderRadius:"50px", boxSizing: "border-box", background: "mediumseagreen", backgroundImage: 'url("./img/wand.svg")', backgroundSize: "contain"}} onClick={this.magicWand}><span style={{fontSize: "20px", fontWeight: "bold", position: "relative", top: "25px", left: "20px"}}>{this.state.wands}</span></div>
                </div>
                <div style={{width: "500px", height: "500px", margin: "0 auto", position: "relative"}}>
                    <div className={"fadeIn"} style={{boxSizing: "border-box", height: "100px", width: "100px", float: "left", position: "absolute", top: "200px", left: "-180px", padding: "3px", overflow: "hidden", backgroundColor: "mediumseagreen", borderRadius: "75px", border: "10px solid black", backgroundImage: 'url("./img/4arrows.png")', backgroundSize: "contain"}}>

                    </div>{cells}<div style={{display: "inline-lock", height: "400px", width: "200px", backgroundColor: "mediumseagreen", position: "absolute", left: "550px", top: "50px", borderRadius: "50px", border: "10px solid black", textAlign: "center", fontSize: "20px", paddingTop: "20px"}}>Najlepsze wyniki: <ol>{list}</ol></div></div>

                <div hidden={this.state.hideGameOver} style={{textAlign: "center", color: "red", backgroundColor: "mediumseagreen", fontSize: "60px", fontWeight: "bold", marginBottom: "-50px"}}>Koniec Gry!</div>
                <h2 style={{textAlign: "center", fontSize: "70px", background: "lightgrey", opacity: "0.8"}}>Uzbierałeś: {countZl} zł i {countGr} gr! </h2>
            </div>
        </div>
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <Game/>,
        document.getElementById('app')
    );
});
