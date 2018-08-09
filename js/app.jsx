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
    constructor(props){
        super(props);
        this.state = {
            level: this.props.level,
        }
    }

    componentWillReceiveProps = (props) => {
        if (this.state.level !== props.level)
            this.setState({level: props.level})
    };

    render(){
        const cellWidth = 100;
        const cellHeight = 100;
        if (this.state.level === 0)
            return <div className="cell0" key={this.props.number} style={{backgroundColor: "lightgrey", float: "left", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box", border: "5px solid black", borderRadius: "50px"}}> </div>;
        if (this.state.level === 1)
            return <div className="cell1" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/1gr3.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 2)
            return <div className="cell2" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/2gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 3)
            return <div className="cell3" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/5gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", textAlign: "center", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 4)
            return <div className="cell4" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/10gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 5)
            return <div className="cell5" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/20gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 6)
            return <div className="cell6" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/50gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 7)
            return <div className="cell7" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/1zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 8)
            return <div className="cell8" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/2zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 9)
            return <div className="cell9" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/5zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 10)
            return <div className="cell10" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/10zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 11)
            return <div className="cell11" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/20zl.jpeg")', backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 12)
            return <div className="cell12" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/50zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 13)
            return <div className="cell13" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/100zl.jpeg")', backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 14)
            return <div className="cell14" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/200zl.jpeg")', backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;
        if (this.state.level === 15)
            return <div className="cell15" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/500zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"}}> </div>;

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
            previousCells: []

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
                        return {level: 0, number: cell.number, key: cell.key};
                    else return cell;

                });

                (this.setState({
                    cells: wandedCells,
                    wands: this.state.wands - 1,
                }, () => console.log("callback in wand")));
                this.setState({points: this.countMoney()}, () => console.log("ddd")) /// nie zmienia punktow
            }
    };

    createBoard = () => {
        let start =[];
        for (let i = 0; i < 25; i++){
            start[i] = {number: i, level: 0, key: i}
        }

        return start;
    };

    gameOverCheck = () => {
        let emptyCells = [];
        this.state.cells.forEach(e => {
            if (e.level < 1)
                emptyCells.push(e);
        });
        if (emptyCells.length < 2) {
            if (this.handleKeys){
                prompt("GAME OVER  !!! ");
                delete this.handleKeys();
            }



        }
    };   //co wstawić zamiast prompt

    moveBack = () => {
        if (this.state.points > 2) {
            if ((this.state.movesBack > 0) && (this.state.previousCells !== this.state.cells))
                this.setState({cells: this.state.previousCells, movesBack: this.state.movesBack - 1, points: this.countMoney()}); //liczenie kasy nie działa
        }
    };

    addNewCells = () => {
        this.gameOverCheck();

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

        newCells[newCell1] = {number: newCell1, level: 1, key: newCell1};
        newCells[newCell2] = {number: newCell2, level: 1, key: newCell2};

        this.setState({cells: newCells, points: this.countMoney()});

    };

    componentDidMount = () => {
        document.addEventListener("keyup", this.handleKeys);
        this.addNewCells();
        console.log("did mount")
    };

    countMoney = () => {
        let moneyCounter = 0;
        for (let i = 0; i < this.state.cells.length; i++){
            if (this.state.cells[i].level === 1)
                moneyCounter++;
            if (this.state.cells[i].level === 2)
                moneyCounter += 2;
            if (this.state.cells[i].level === 3)
                moneyCounter += 5;
            if (this.state.cells[i].level === 4)
                moneyCounter += 10;
            if (this.state.cells[i].level === 5)
                moneyCounter += 20;
            if (this.state.cells[i].level === 6)
                moneyCounter += 50;
            if (this.state.cells[i].level === 7)
                moneyCounter += 100;
            if (this.state.cells[i].level === 8)
                moneyCounter += 200;
            if (this.state.cells[i].level === 9)
                moneyCounter += 500;
            if (this.state.cells[i].level === 10)
                moneyCounter += 1000;
            if (this.state.cells[i].level === 11)
                moneyCounter += 2000;
            if (this.state.cells[i].level === 12)
                moneyCounter += 5000;
            if (this.state.cells[i].level === 13)
                moneyCounter += 10000;
            if (this.state.cells[i].level === 14)
                moneyCounter += 20000;
        }
            return moneyCounter;
    };

    checkMovement = (arr1,arr2, direction) => {
        let arr1Levels = arr1.map(e => e.level);
        let arr2Levels = arr2.map(e => e.level);

        console.log(arr1Levels);
        console.log(arr2Levels);

        let coordinatesArray = [];
        let usedIndexes = [];


        for (let i = 0; i < arr1Levels.length -1; i++){
            let coinsCounter = 0;
                for (let j = i + 1; j < arr1Levels.length; j++){
                    if ((((arr1Levels[i] === 0) || (arr1Levels[i] === arr1Levels[j])) && (arr1Levels[j] > 0)) || ((arr1Levels[i] === arr1Levels[j]) && arr1Levels[i] !== 0)){
                        if ((usedIndexes.indexOf(j) < 0)){
                            if (coinsCounter < 2){
                                coordinatesArray.push([i, j]);
                                usedIndexes.push(j);
                                coinsCounter++;

                            }
                            else {
                                coordinatesArray.push([i + 1, j]);
                                usedIndexes.push(j);

                            }
                        }
                    }
                }
        }

        console.log(coordinatesArray);
    };

    handleKeys = (key) => {

        let leftArrow = 37;
        if (key.which === leftArrow) {

            this.setState({previousCells: this.state.cells});

            let allCells = this.state.cells;

            let row1 = allCells.slice(0, 5);
            let row2 = allCells.slice(5, 10);
            let row3 = allCells.slice(10, 15);
            let row4 = allCells.slice(15, 20);
            let row5 = allCells.slice(20, 25);

            let moveLeft = arr => arr.filter(e => e > 0).concat([0, 0, 0, 0, 0]).slice(0, 5);

            let moveLeftAndIncrementLevels = arr => {

                let levels = arr.map(e => e.level);

                levels = moveLeft(levels);

                for (let i = 0; i < 4; i++){
                    if(levels[i] < 1)
                        continue;

                    if (levels[i] === levels[i + 1]) {
                        levels[i]++;
                        levels[i + 1] = 0;
                    }
                }

                levels = moveLeft(levels);

                return levels.map(e => {
                    return {level: e}
                });
            };

            let nextRow1 = moveLeftAndIncrementLevels(row1);
            let nextRow2 = moveLeftAndIncrementLevels(row2);
            let nextRow3 = moveLeftAndIncrementLevels(row3);
            let nextRow4 = moveLeftAndIncrementLevels(row4);
            let nextRow5 = moveLeftAndIncrementLevels(row5);

            this.checkMovement(row1, nextRow1);

            let nextAllCells = [...nextRow1, ...nextRow2, ...nextRow3, ...nextRow4, ...nextRow5];

            for (let i = 0; i < nextAllCells.length; i++){
                allCells[i].key = i;
                allCells[i].number = i;
            }

            this.setState({cells: nextAllCells, points: this.countMoney()});

            this.addNewCells();

        }

        let rightArrow = 39;
        if (key.which === rightArrow){

            this.setState({previousCells: this.state.cells});

            let allCells = this.state.cells;

            let row1 = allCells.slice(0, 5);
            let row2 = allCells.slice(5, 10);
            let row3 = allCells.slice(10, 15);
            let row4 = allCells.slice(15, 20);
            let row5 = allCells.slice(20, 25);

            let moveRight = arr => {

                let filtered = arr.filter(e => e > 0);

                if (filtered.length < 5) {
                    for (let i = filtered.length; i < 5; i++) {
                        filtered.unshift(0);
                    }
                }
                return filtered;
            };

            let moveRightAndIncrementLevels = arr => {

                let levels = arr.map(e => e.level);

                levels = moveRight(levels);

                for (let i = levels.length - 1; i > 0; i--){
                    if(levels[i] < 1)
                        continue;

                    if (levels[i] === levels[i - 1]) {
                        levels[i]++;
                        levels[i - 1] = 0;
                    }
                }

                levels = moveRight(levels);

                return levels.map(e => {
                    return {level: e}
                });
            };

            row1 = moveRightAndIncrementLevels(row1);
            row2 = moveRightAndIncrementLevels(row2);
            row3 = moveRightAndIncrementLevels(row3);
            row4 = moveRightAndIncrementLevels(row4);
            row5 = moveRightAndIncrementLevels(row5);

            allCells = [...row1, ...row2, ...row3, ...row4, ...row5];

            for (let i = 0; i < allCells.length; i++){
                allCells[i].key = i;
                allCells[i].number = i;
            }

            this.setState({cells: allCells, points: this.countMoney()});

            this.addNewCells();
        }

        let upArrow = 38;
        if (key.which === upArrow){

            this.setState({previousCells: this.state.cells});

            let col1 = [];
            let col2 = [];
            let col3 = [];
            let col4 = [];
            let col5 = [];

            this.state.cells.forEach(e => {
                if (e.key % 5 === 0)
                    col1.push(e);
                if (e.key % 5 === 1)
                    col2.push(e);
                if (e.key % 5 === 2)
                    col3.push(e);
                if (e.key % 5 === 3)
                    col4.push(e);
                if (e.key % 5 === 4)
                    col5.push(e);
            });

            let moveUp = arr => {

                let filtered = arr.filter(e => e > 0);

                if (filtered.length < 5) {
                    for (let i = filtered.length; i < 5; i++) {
                        filtered.push(0);
                    }
                }
                return filtered;
            };

            let moveUpAndIncrementLevels = arr => {

                let levels = arr.map(e => e.level);

                levels = moveUp(levels);

                for (let i = 0; i < levels.length -1; i++){
                    if(levels[i] < 1)
                        continue;

                    if (levels[i] === levels[i + 1]) {
                        levels[i]++;
                        levels[i + 1] = 0;
                    }
                }

                levels = moveUp(levels);

                return levels.map(e => {
                    return {level: e}
                });
            };

            col1 = moveUpAndIncrementLevels(col1);
            col2 = moveUpAndIncrementLevels(col2);
            col3 = moveUpAndIncrementLevels(col3);
            col4 = moveUpAndIncrementLevels(col4);
            col5 = moveUpAndIncrementLevels(col5);

            let allCells =[];

            for (let i = 0; i < 5; i++)
                allCells.push(col1[i], col2[i], col3[i], col4[i], col5[i])

            for (let i = 0; i < allCells.length; i++){
                allCells[i].number = i;
                allCells[i].key = i;
            }

            this.setState({cells: allCells, points: this.countMoney()});

            this.addNewCells();
        }

        let downArrow = 40;
        if (key.which === downArrow){

            this.setState({previousCells: this.state.cells});

            let col1 = [];
            let col2 = [];
            let col3 = [];
            let col4 = [];
            let col5 = [];

            this.state.cells.forEach(e => {
                if (e.key % 5 === 0)
                    col1.push(e);
                if (e.key % 5 === 1)
                    col2.push(e);
                if (e.key % 5 === 2)
                    col3.push(e);
                if (e.key % 5 === 3)
                    col4.push(e);
                if (e.key % 5 === 4)
                    col5.push(e);
                });

            let moveDown = arr => {

                let filtered = arr.filter(e => e > 0);

                if (filtered.length < 5) {
                    for (let i = filtered.length; i < 5; i++) {
                        filtered.unshift(0);
                    }
                }
                return filtered;
            };

            let moveDownAndIncrementLevels = arr => {

                let levels = arr.map(e => e.level);

                levels = moveDown(levels);

                for (let i = levels.length - 1; i > 0; i--){
                    if(levels[i] < 1)
                        continue;

                    if (levels[i] === levels[i - 1]) {
                        levels[i]++;
                        levels[i - 1] = 0;
                    }
                }

                levels = moveDown(levels);

                return levels.map(e => {
                    return {level: e}
                });
            };

            col1 = moveDownAndIncrementLevels(col1);
            col2 = moveDownAndIncrementLevels(col2);
            col3 = moveDownAndIncrementLevels(col3);
            col4 = moveDownAndIncrementLevels(col4);
            col5 = moveDownAndIncrementLevels(col5);

            let allCells = [];

            for (let i = 0; i < 5; i++)
                allCells.push(col1[i], col2[i], col3[i], col4[i], col5[i])

            for (let i = 0; i < allCells.length; i++){
                allCells[i].number = i;
                allCells[i].key = i;
            }

            this.setState({cells: allCells, points: this.countMoney()});

            this.addNewCells();
            }

        };

    render(){
        console.log("render")
        let countZl = 0;
        if ((this.state.points / 100) > 1)
            countZl = Math.floor(this.state.points / 100);
        let countGr = this.state.points % 100;

        if (this.state.cells.length === 0) return null;
        let cells = this.state.cells.map((element, index) => <Cell number={this.state.cells[index].number} key={this.state.cells[index].key} level={this.state.cells[index].level}/>);

        return <div style={{backgroundImage: 'url("./img/money.png")', backgroundSize: "cover", width: "100%", height: "900px"}}>
                    <h1 style={{textAlign: "center", fontSize: "70px", background: "lightgrey", opacity: "0.8"}}>Super Zbieracz - THE GAME !!!</h1>
                    <div style={{height: "100%", width: "100%", margin: "0 auto", backgroundColor: "transparent"}}>
                        <div style={{margin: "5px auto", width: "300px", height: "100px", boxSizing: "borderBox", padding: "10px"}}>
                            <div style={{width: "100px", height: "100px", float: "left", borderRadius: "50px", border: "10px solid black", boxSizing: "border-box",background: "mediumseagreen", backgroundImage: 'url("./img/restart.png")', backgroundSize: "contain"}} onClick={this.restartGame}> </div>
                            <div style={{width: "100px", height: "100px", float: "left", border: "1px solid black", borderRadius:"50px", boxSizing: "border-box", background: "mediumseagreen", backgroundImage: 'url("./img/back.svg")', backgroundSize: "contain"}} onClick={this.moveBack}><span style={{fontSize: "20px", fontWeight: "bold", position: "relative", top: "25px", left: "20px"}}>{this.state.movesBack}</span></div>
                            <div style={{width: "100px", height: "100px", float: "left", border: "1px solid black", borderRadius:"50px", boxSizing: "border-box", background: "mediumseagreen", backgroundImage: 'url("./img/wand.svg")', backgroundSize: "contain"}} onClick={this.magicWand}><span style={{fontSize: "20px", fontWeight: "bold", position: "relative", top: "25px", left: "20px"}}>{this.state.wands}</span></div>
                        </div>
                    <div style={{width: "500px", height: "500px", margin: "0 auto", position: "relative"}}>{cells}
                        {/*<div style={{width: "500px", height: "500px", margin: "0 auto", position: "relative"}}>{cells}</div>*/}
                    </div>
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