//ułożenie komórek


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
        this.state = {level: this.props.level}
    }

    componentWillReceiveProps = (props) => {
        if (this.state.level !== props.level){
            console.log("Cell will update - cell");
            this.setState({level: props.level})
        }

    };

    render(){
        const cellWidth = 100;
        const cellHeight = 100;
        if (this.state.level === 0)
            return <div className="cell" key={this.props.number} style={{backgroundColor: "green" , float: "left", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box", border: "1px solid grey", textAlign: "center", position: "relative", top: "-20px", borderRadius: "20px"}}> <h1>{this.props.number}</h1></div>;
        return <div className="cell" key={this.props.number} style={{float: "left", backgroundImage: 'url("./img/Fiat126p.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", textAlign: "center", boxSizing: "border-box", border: "1px solid gray"}}><h1>{this.state.level}</h1></div>;
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
            if (this.state.wands > 0){
                let wandedCells = this.state.cells.map((cell, index) => {
                    if (cell.level === 1)
                        return {level: 0, number: cell.number, key: cell.key};
                    else return cell;

                });
                this.setState({cells: wandedCells, wands: this.state.wands -1}, () => console.log("Callback in magicWand used"));
            }


    };

    createBoard = () => {
        let start =[];
        for (let i = 0; i < 25; i++){
            start[i] = {number: i, level: 0, key: i}
        }
        return start;
    };

    moveBack = () => {
        if (this.state.movesBack > 0)
        this.setState({cells: this.state.previousCells, movesBack: this.state.movesBack - 1});
    };

    addNewCells = () => {
        console.log("------ addNewCells");
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

        console.log('newCell1', newCell1);
        console.log('newCell2', newCell2);
        this.setState({cells: newCells}, () => console.log("Callback in addNewCells used"));

    };

    componentDidMount = () => {
        document.addEventListener("keyup", this.handleKeys);
        this.addNewCells();

        console.log("Component Did Mount...");

    };

    handleKeys = (e) => {

        // left arrow
        let leftArrow = 37;
        if (e.which === leftArrow) {
            console.log("left arrow key pressed");

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

            row1 = moveLeftAndIncrementLevels(row1);
            row2 = moveLeftAndIncrementLevels(row2);
            row3 = moveLeftAndIncrementLevels(row3);
            row4 = moveLeftAndIncrementLevels(row4);
            row5 = moveLeftAndIncrementLevels(row5);

            allCells = [...row1, ...row2, ...row3, ...row4, ...row5];

            for (let i = 0; i < allCells.length; i++){
                allCells[i].key = i;
                allCells[i].number = i;
            }

            this.setState({cells: allCells}, () => console.log("Callback in handleKeys used"));

            this.addNewCells();

        }

        //right arrow
        if (e.which === 39){
            console.log("right arrow key pressed");

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

            this.setState({cells: allCells}, () => console.log("Callback in handleKeys used"));

            this.addNewCells();
        }

        //up arrow
        if (e.which === 38){
            console.log("up arrow key pressed");

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

            let row1 = [];
            let row2 = [];
            let row3 = [];
            let row4 = [];
            let row5 = [];

            row1.push(col1[0]);
            row1.push(col2[0]);
            row1.push(col3[0]);
            row1.push(col4[0]);
            row1.push(col5[0]);

            row2.push(col1[1]);
            row2.push(col2[1]);
            row2.push(col3[1]);
            row2.push(col4[1]);
            row2.push(col5[1]);

            row3.push(col1[2]);
            row3.push(col2[2]);
            row3.push(col3[2]);
            row3.push(col4[2]);
            row3.push(col5[2]);

            row4.push(col1[3]);
            row4.push(col2[3]);
            row4.push(col3[3]);
            row4.push(col4[3]);
            row4.push(col5[3]);

            row5.push(col1[4]);
            row5.push(col2[4]);
            row5.push(col3[4]);
            row5.push(col4[4]);
            row5.push(col5[4]);

            let allCells = [...row1, ...row2, ...row3, ...row4, ...row5];

            for (let i = 0; i < allCells.length; i++){
                allCells[i].number = i;
                allCells[i].key = i;
            }

            this.setState({cells: allCells}, console.log("Callback in down arrow used"));
            this.addNewCells();
        }

        //down arrow
        if (e.which === 40){
            console.log("down arrow key pressed");

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

            let row1 = [];
            let row2 = [];
            let row3 = [];
            let row4 = [];
            let row5 = [];

            row1.push(col1[0]);
            row1.push(col2[0]);
            row1.push(col3[0]);
            row1.push(col4[0]);
            row1.push(col5[0]);

            row2.push(col1[1]);
            row2.push(col2[1]);
            row2.push(col3[1]);
            row2.push(col4[1]);
            row2.push(col5[1]);

            row3.push(col1[2]);
            row3.push(col2[2]);
            row3.push(col3[2]);
            row3.push(col4[2]);
            row3.push(col5[2]);

            row4.push(col1[3]);
            row4.push(col2[3]);
            row4.push(col3[3]);
            row4.push(col4[3]);
            row4.push(col5[3]);

            row5.push(col1[4]);
            row5.push(col2[4]);
            row5.push(col3[4]);
            row5.push(col4[4]);
            row5.push(col5[4]);

            let allCells = [...row1, ...row2, ...row3, ...row4, ...row5];

            for (let i = 0; i < allCells.length; i++){
                allCells[i].number = i;
                allCells[i].key = i;
            }

            this.setState({cells: allCells}, console.log("Callback in down arrow used"));

            this.addNewCells();
            }

        };

    countCoordinates = (x, y) => (x + y * 5) -6;

    countCoordinatesReverse = (i) => {
        let x;

        for (let i = 0; i <= 5; i++){
            if (i % 5 === i) x = i + 1;
        }

        let y;
        if (i < 5) y = 1;
        if ((i >= 5) && (i < 10)) y = 2;
        if ((i >= 10) && (i < 15)) y = 3;
        if ((i >= 15) && (i < 20)) y = 4;
        if (i >= 20) y = 5;

        return [x, y];
    };

    render(){
        console.log("Render Method...");
        if (this.state.cells.length === 0) return null;
        let cells = this.state.cells.map((element, index) => <Cell number={this.state.cells[index].number} key={this.state.cells[index].key} level={this.state.cells[index].level}/>);

        return <div style={{backgroundColor: "grey", width: "100%", height: "800px"}}>
            <h1 style={{textAlign: "center"}}>MY GAME !!</h1>
            <div style={{height: "500px", width: "500px", display: "inlineBlock", margin: "0 auto"}}>
                <div style={{margin: "5px auto", backgroundColor: "lightgrey", width: "150px", height: "50px", boxSizing: "borderBox", padding: "10px"}}>
                    <div style={{width: "50px", height: "50px", float: "left", border: "1px solid blue", boxSizing: "border-box"}} onClick={this.restartGame}>Restart game</div>
                    <div style={{width: "50px", height: "50px", float: "left", border: "1px solid blue", boxSizing: "border-box"}} onClick={this.moveBack}>Move back: {this.state.movesBack}</div>
                    <div style={{width: "50px", height: "50px", float: "left", border: "1px solid blue", boxSizing: "border-box"}} onClick={this.magicWand}>Magic wands: {this.state.wands}</div>
                </div>
                <div style={{marginTop: "25px", marginBottom: "45px"}}>{cells}</div>

                {/*<div style={{margin: "5px auto", backgroundColor: "lightgrey", width: "150px", height: "50px", padding: "5px"}}>*/}
                    <h2 style={{textAlign: "center"}}>Points: {this.state.points}</h2>
                {/*</div>*/}

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