import React from 'react';
import ReactDOM from 'react-dom';
import Game from "./Game.jsx";

class App extends React.Component{
    render(){
        return <div>
            <Game/>
        </div>
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});