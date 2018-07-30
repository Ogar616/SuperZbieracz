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

    componentWillReceiveProps = () => {
        console.log("Cell will receive props");
        this.setState({level: this.props.level})
    };

    render(){
        const cellWidth = 100;
        const cellHeight = 100;
        if (this.state.level === 0)
            return <div className="cell" key={this.props.number} style={{backgroundColor: "green" , float: "left", width: cellWidth + "px", height: cellHeight + "px", boxSizing: "border-box", border: "1px solid grey", textAlign: "center"}}> <h1>{this.props.number}</h1></div>;
        return <div className="cell" key={this.props.number} style={{float: "left", backgroundColor: "blue", width: cellWidth + "px", height: cellHeight + "px", textAlign: "center", boxSizing: "border-box", border: "1px solid gray"}}><h1>{this.state.level}</h1></div>;
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.references;
        this.state = {
            cells: [],
            wands: 3,
            movesBack: 3,
            points: 0

        }
    }
    restartGame = () => {
        let restartedCells = [];
        this.state.cells.forEach((cell, index) => {
            restartedCells.push({number: index, key: index, level: 0});
        });
        this.setState({cells: restartedCells});
        this.addNewCells();
        //Przycisk po wystartowaniu gry dziala za drugim razem, a po pierwszym ruchu dodaje 4 komorki - nie 2
        //bez this.addNewCells wszystko komórki są puste
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
            //trzeba klikać 2 razy, żeby przerenderowalo, stan sie zmienia za oboma kliknieciami - nawet razem z callback


    };


    addNewCells = () => {
        const numberOfCells = 25;
        let newCell1 = 0;
        let newCell2 = 0;

        let arrayOfEmptyCells = [];

        this.state.cells.forEach( (cell, index) => {
            if (cell.level === 0) arrayOfEmptyCells.push(index);
        });

        while((newCell1 === newCell2) ){
            newCell1 = Math.round(Math.random() * 24);
            newCell2 = Math.round(Math.random() * 24);
        }


        let newCells = [];

        for (let i = 0; i < numberOfCells; i++) {
            if ((i === newCell1) || (i === newCell2))
                newCells.push({number: i, level: 1, key: i});
            else newCells.push({number: i, level: 0, key: i});
        }

        this.setState({cells: newCells}, () => console.log("Callback in addNewCells used"));

    };

    componentDidMount = () => {
        document.addEventListener("keyup", this.handleKeys);

        console.log(" ");

        console.log("Component Did Mount...");
        this.addNewCells();
    };

    handleKeys = (e) => {

        // left arrow
        if (e.which === 37) {
            console.log("left arrow key pressed");

            let allCells = this.state.cells;

            let row1 = allCells.slice(0, 5);
            let row2 = allCells.slice(5, 10);
            let row3 = allCells.slice(10, 15);
            let row4 = allCells.slice(15, 20);
            let row5 = allCells.slice(20, 25);

            // defining rows


            let row1FullCells = [];
            let row2FullCells = [];
            let row3FullCells = [];
            let row4FullCells = [];
            let row5FullCells = [];

            let row1CountKey = 0;
            row1.forEach(e => {
                if (e.level > 0) {
                    row1FullCells.push({level: e.level, number: row1CountKey, key: row1CountKey});
                    row1CountKey++;
                }
            });

            let row2CountKey = 5;
            row2.forEach(e => {
                if (e.level > 0){
                    row2FullCells.push({level: e.level, number: row2CountKey, key: row2CountKey});
                    row2CountKey++;
                }
            });

            let row3CountKey = 10;
            row3.forEach(e => {
                if (e.level > 0) {
                    row3FullCells.push({level: e.level, number: row3CountKey, key: row3CountKey});
                    row3CountKey++;
                }
            });

            let row4CountKey = 15;
            row4.forEach(e => {
                if (e.level > 0) {
                    row4FullCells.push({level: e.level, number: row4CountKey, key: row4CountKey});
                    row4CountKey++;
                }
            });

            let row5CountKey = 20;
            row5.forEach(e => {
                if (e.level > 0) {
                    row5FullCells.push({level: e.level, number: row5CountKey, key: row5CountKey});
                    row5CountKey++;
                }
            });

            let newRow1 = row1FullCells;
            for (let i = row1FullCells.length; i<=5; i++)
                if (newRow1.length < 5)
                    newRow1.push({level: 0, number: i, key: i});

            let newRow2 = row2FullCells;
            for (let i = row2FullCells.length; i<=5; i++)
                if (newRow2.length < 5)
                    newRow2.push({level: 0, number: i + 5, key: i + 5});

            let newRow3 = row3FullCells;
            for (let i = row3FullCells.length; i<=5; i++)
                if (newRow3.length < 5)
                    newRow3.push({level: 0, number: i + 10, key: i + 10});

            let newRow4 = row4FullCells;
            for (let i = row4FullCells.length; i<=5; i++)
                if (newRow4.length < 5)
                    newRow4.push({level: 0, number: i + 15, key: i + 15});

            let newRow5 = row5FullCells;
            for (let i = row5FullCells.length; i<=5; i++)
                if (newRow5.length < 5)
                    newRow5.push({level: 0, number: i + 20, key: i + 20});


            allCells = newRow1.concat(newRow2, newRow3, newRow4, newRow5);


            console.log(allCells);

            this.setState({cells: allCells}, () => console.log("Callback in handleKeys used"));
            // this.addNewCells();                                                      // nie działa tutaj dobrze
        }

        //right arrow
        if (e.which === 39)
            console.log("right arrow key pressed");

        //up arrow
        if (e.which === 38)
            console.log("up arrow key pressed");

        //down arrow
        if (e.which === 40)
            console.log("down arrow key pressed");
    };

    countCoordinates = (x, y) => (x + y * 5) -6;

    countCoordinatesReverse = (i) => {
        let x;
        if (i % 5 === 0) x = 1;
        if (i % 5 === 1) x = 2;
        if (i % 5 === 2) x = 3;
        if (i % 5 === 3) x = 4;
        if (i % 5 === 4) x = 5;

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

        let cells = this.state.cells.map((element, index) => <Cell number={this.state.cells[index].number} key={this.state.cells[index].key} level={this.state.cells[index].level}/>);
        return <div style={{backgroundColor: "grey", width: "100%", height: "800px"}}>
            <h1 style={{textAlign: "center"}}>MY GAME !!</h1>
            <div style={{height: "500px", width: "500px", display: "inlineBlock", margin: "0 auto"}}>
                <div style={{margin: "0 auto", backgroundColor: "lightgrey", width: "150px", height: "50px", boxSizing: "borderBox"}}>
                    <div style={{width: "50px", height: "50px", float: "left", border: "1px solid blue", boxSizing: "border-box"}} onClick={this.restartGame}>Restart</div>
                    <div style={{width: "50px", height: "50px", float: "left", border: "1px solid blue", boxSizing: "border-box"}}>Move back</div>
                    <div style={{width: "50px", height: "50px", float: "left", border: "1px solid blue", boxSizing: "border-box"}} onClick={this.magicWand}>Magic wand</div>
                </div>
                <div style={{margin: "0 auto"}}>{cells}</div>
                <div style={{margin: "0 auto", backgroundColor: "lightgrey", width: "150px", height: "50px"}}>
                </div>
                    <h2 style={{textAlign: "center"}}>Points: {this.state.points}</h2>
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