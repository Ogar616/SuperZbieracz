import React from "react";

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

export default Cell;