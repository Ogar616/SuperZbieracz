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
            oldLevel: this.props.oldLevel
        }
    }

    componentWillReceiveProps = (props) => {
        if (this.state.level !== props.level)
            this.setState({level: props.level})
    };

    render(){
            const cellWidth = 100;
            const cellHeight = 100;
            let styles = [
                {backgroundColor: "lightgrey" , float: "left", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box", border: "5px solid black", borderRadius: "50px"},
                {backgroundImage: 'url("./img/1gr3.png")' , float: "left",backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box", border: "5px solid black", borderRadius: "50px"},
                {float: "left", backgroundImage: 'url("./img/2gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/5gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/10gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/20gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/50gr.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/1zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/2zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/5zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/10zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/20zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/50zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/100zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/200zl.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
                {float: "left", backgroundImage: 'url("./img/500.png")', backgroundSize: "contain", backgroundRepeat: "no-repeat", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box"},
            ];
            let cellStyle = styles[this.state.level];
            if (this.state.oldLevel)
                cellStyle = styles[this.state.oldLevel];

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
                        return {level: 0, key: cell.key};
                    else return cell;

                });

                (this.setState({
                    cells: wandedCells,
                    wands: this.state.wands - 1,
                }, () => console.log("callback in wand")));
                this.setState({points: this.countMoney()}, () => console.log("ddd")) /// nie zmienia punktow
            }
    };  //// nie zmienia punktow

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
        if (emptyCells.length < 2) {
            if (this.handleKeys){
                console.log("GAME OVER  !!! ");

            }



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

        newCells[newCell1] = {level: 1, key: newCell1, class: "static"};
        newCells[newCell2] = {level: 1, key: newCell2, class: "static"};

        this.setState({cells: newCells, points: this.countMoney()});

    };

    componentDidMount = () => {
        document.addEventListener("keyup", this.handleKeys);
        this.addNewCells();

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

        let removeEmptyAndFixKeysLeft = (cells) => {

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


                fullCellsOnly.forEach((e,i) => {
                   e.oldLevel = cells[i].level;
               });

            return fullCellsOnly;
        };

        let removeEmptyAndFixKeysRight = (cells) => {
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

            return fullCellsOnly;
        };

        let removeEmptyLeft = (cells) => {

            let fullCellsOnly = [];

            cells.forEach((cell) => {
                    if (cell.level > 0)
                        fullCellsOnly.push(cell);
            });

            for (let i = 0; i < 5; i++)
                if (!fullCellsOnly[i])
                    fullCellsOnly.push({level: 0});

            // fullCellsOnly.forEach((e,i) => {
            //     e.oldLevel = cells[i].level;
            // });

            return fullCellsOnly;
        };

        let removeEmptyRight = (cells) => {
            let fullCellsOnly = [];

            cells.forEach((cell) => {
                if (cell)
                    if (cell.level > 0)
                        fullCellsOnly.push(cell);
            });

            for (let i = 0; i < 5; i++)
                if (!fullCellsOnly[i])
                    fullCellsOnly.unshift({level: 0});

            return fullCellsOnly;
        };

        let mergeLeft = (cells) => {
            let oldLevels = [0, 0, 0, 0, 0];
            cells.forEach((e, i) => {
                if (e.oldLevel)
                    oldLevels[i] = e.oldLevel;
            });
            console.log("oldLevcels;   :  ");
            console.log(oldLevels);
            for (let i = 0; i < 5; i++){
                if ((cells[i].level > 0) && (cells[i + 1]))
                    if (cells[i].level === cells[i + 1].level){
                        // cells[i].oldLevel = cells[i].level;
                        cells[i].level++;
                        cells[i].key2 = cells[i + 1].key1;
                        cells[i + 1].level = 0;
                    }
            }

            cells = removeEmptyLeft(cells);

            for (let i = 0; i < 5; i++){
                if (!cells[i])
                    cells.push({level: 0});
            }
            oldLevels.forEach((e, i) => {
                if (e.oldLevel && (e.oldLevel > 0))
                    e.oldLevel = cells[i].level;
            });


            return cells;
        };

        let mergeRight = (cells) => {
            for (let i = 4; i > -1; i--){
                if ((cells[i].level > 0) && (cells[i - 1])){
                    if (cells[i].level === cells[i - 1].level){
                        cells[i].level++;
                        cells[i].key2 = cells[i - 1].key1;
                        cells[i - 1].level = 0;
                    }
                }
            }

            cells = removeEmptyRight(cells);

            for (let i = 5; i = 0; i--){
                if (!cells[i])
                    cells.unshift({level: 0});
            }

            return cells;
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

            col1 = mergeLeft(col1);
            col2 = mergeLeft(col2);
            col3 = mergeLeft(col3);
            col4 = mergeLeft(col4);
            col5 = mergeLeft(col5);

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

    calculateAnimations = (cells, direction) => {

        let coordinates = [];

        if (direction = "left"){

            cells.forEach((e, i) => {
                if (e.level !== 0){
                    if ((e.key1 !== i) && e.key1 && (!e.key2)){
                        coordinates.push({toIndex: i, index1: e.key1});
                    }


                }

                if (e.key2){
                    if ((i !== e.key1) && (i !== e.key2))
                        coordinates.push({toIndex: i, index1: e.key1, index2: e.key2});
                    if ((i !== e.key1) && (i === e.key2))
                        coordinates.push({toIndex: i, index1: e.key1});
                    if ((i === e.key1) && (i !== e.key2))
                        coordinates.push({toIndex: i, index1: e.key2});

                }


            });
        }

        return coordinates;
    };

    calculateClass = (row) => {

        let defineClass = (count) => {
            if (count === 1) return "moveLeft1";
            if (count === 2) return "moveLeft2";
            if (count === 3) return "moveLeft3";
            if (count === 4) return "moveLeft4";
        };

        let classes = ["static", "static", "static", "static", "static"];

        row.forEach((e, index) => {
            if (e.key1 && !e.key2){
                classes[e.key1] = defineClass(e.key1 - index);
                console.log(index, e.key1);
            }

            if (e.key2){
                classes[e.key1] = defineClass(e.key1 - index);
                classes[e.key2] = defineClass(e.key2 - index);
            }
        });

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
                e.class = this.calculateClass(row1)[i];
            });

            row2.forEach((e, i) => {
                e.class = this.calculateClass(row2)[i];
            });

            row3.forEach((e, i) => {
                e.class = this.calculateClass(row3)[i];
            });

            row4.forEach((e, i) => {
                e.class = this.calculateClass(row4)[i];
            });

            row5.forEach((e, i) => {
                e.class = this.calculateClass(row5)[i];
            });

            let animatedCells = [...row1, ...row2, ...row3, ...row4, ...row5];

            animatedCells.forEach((e, i) => e.key = i);

            console.log(animatedCells);


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

        let rightArrow = 39;
        if (key.which === rightArrow){

            let allCells = this.moveCells("right", this.state.cells);

            let row1Animations = this.calculateAnimations(allCells[0]);
            let row2Animations = this.calculateAnimations(allCells[1]);
            let row3Animations = this.calculateAnimations(allCells[2]);
            let row4Animations = this.calculateAnimations(allCells[3]);
            let row5Animations = this.calculateAnimations(allCells[4]);

            console.log(row1Animations);
            console.log(row2Animations);
            console.log(row3Animations);
            console.log(row4Animations);
            console.log(row5Animations);

            allCells = allCells[0].concat(allCells[1], allCells[2], allCells[3], allCells[4]);

            let newCells = [];

            for (let i = 0; i < allCells.length; i++)
                newCells.push({level: allCells[i].level, key: i});

            this.setState({cells: newCells});

            this.addNewCells();
        }

        let upArrow = 38;
        if (key.which === upArrow){

            let allCells = this.moveCells("up", this.state.cells);

            let col1Animations = this.calculateAnimations(allCells[0]);
            let col2Animations = this.calculateAnimations(allCells[1]);
            let col3Animations = this.calculateAnimations(allCells[2]);
            let col4Animations = this.calculateAnimations(allCells[3]);
            let col5Animations = this.calculateAnimations(allCells[4]);

            console.log(col1Animations);
            console.log(col2Animations);
            console.log(col3Animations);
            console.log(col4Animations);
            console.log(col5Animations);

            allCells = allCells[0].concat(allCells[1], allCells[2], allCells[3], allCells[4]);

            for (let i = 0; i < allCells.length; i++)
                allCells[i].key = i;

            this.setState({cells: allCells});

            this.addNewCells();

        }

        let downArrow = 40;
        if (key.which === downArrow){

            let allCells = this.moveCells("down", this.state.cells);

            let col1Animations = this.calculateAnimations(allCells[0]);
            let col2Animations = this.calculateAnimations(allCells[1]);
            let col3Animations = this.calculateAnimations(allCells[2]);
            let col4Animations = this.calculateAnimations(allCells[3]);
            let col5Animations = this.calculateAnimations(allCells[4]);

            console.log(col1Animations);
            console.log(col2Animations);
            console.log(col3Animations);
            console.log(col4Animations);
            console.log(col5Animations);

            allCells = allCells[0].concat(allCells[1], allCells[2], allCells[3], allCells[4]);

            for (let i = 0; i < allCells.length; i++)
                allCells[i].key = i;

            this.setState({cells: allCells});

            this.addNewCells();
            }

        };

    render(){
        let countZl = 0;
        if ((this.state.points / 100) > 1)
            countZl = Math.floor(this.state.points / 100);
        let countGr = this.state.points % 100;

        if (this.state.cells.length === 0) return null;
        let cells = this.state.cells.map((element, index) => <Cell key={this.state.cells[index].key} oldLevel={this.state.cells[index].oldLevel} level={this.state.cells[index].level} class={this.state.cells[index].class}/>);

        return <div style={{backgroundImage: 'url("./img/money.png")', backgroundSize: "cover", width: "100%", height: "900px"}}>

                    <h1 style={{textAlign: "center", fontSize: "70px", background: "lightgrey", opacity: "0.8"}}>Super Zbieracz - THE GAME !!!</h1>
                    <div style={{height: "100%", width: "100%", margin: "0 auto", backgroundColor: "transparent"}}>
                        <div style={{margin: "5px auto", width: "300px", height: "100px", boxSizing: "borderBox", padding: "10px"}}>
                            <div style={{width: "100px", height: "100px", float: "left", borderRadius: "50px", border: "10px solid black", boxSizing: "border-box",background: "mediumseagreen", backgroundImage: 'url("./img/restart.png")', backgroundSize: "contain"}} onClick={this.restartGame}> </div>
                            <div style={{width: "100px", height: "100px", float: "left", border: "1px solid black", borderRadius:"50px", boxSizing: "border-box", background: "mediumseagreen", backgroundImage: 'url("./img/back.svg")', backgroundSize: "contain"}} onClick={this.moveBack}><span style={{fontSize: "20px", fontWeight: "bold", position: "relative", top: "25px", left: "20px"}}>{this.state.movesBack}</span></div>
                            <div style={{width: "100px", height: "100px", float: "left", border: "1px solid black", borderRadius:"50px", boxSizing: "border-box", background: "mediumseagreen", backgroundImage: 'url("./img/wand.svg")', backgroundSize: "contain"}} onClick={this.magicWand}><span style={{fontSize: "20px", fontWeight: "bold", position: "relative", top: "25px", left: "20px"}}>{this.state.wands}</span></div>
                        </div>
                    <div style={{width: "500px", height: "500px", margin: "0 auto", position: "relative"}}>
                        <div className={"container"} style={{height: "400px", width: "100px", float: "left", position: "absolute", top: "50px", left: "-150px", padding: "3px", overflow: "hidden"}}>
                            <div className={"marquee"}>
                                <div style={{height: "100px", width: "100px", backgroundImage: 'url("./img/up.png")'}}> </div>
                                <div style={{height: "100px", width: "100px", backgroundImage: 'url("./img/down.png")'}}> </div>
                                <div style={{height: "100px", width: "100px", backgroundImage: 'url("./img/left.png")'}}> </div>
                                <div style={{height: "100px", width: "100px", backgroundImage: 'url("./img/right.png")'}}> </div>
                            </div>
                        </div>{cells}</div>
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

