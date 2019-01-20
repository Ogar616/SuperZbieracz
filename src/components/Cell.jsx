import React, { Component } from 'react';

import empty from '../assets/empty.png';
import gr1 from '../assets/1gr3.png';
import gr2 from '../assets/2gr.png';
import gr5 from '../assets/5gr.png';
import gr10 from '../assets/10gr.png';
import gr20 from '../assets/20gr.png';
import gr50 from '../assets/50gr.png';
import zl1 from '../assets/1zl.png';
import zl2 from '../assets/2zl.png';
import zl5 from '../assets/5zl.png';
import zl10 from '../assets/10zl.png';
import zl20 from '../assets/20zl.jpeg';
import zl50 from '../assets/50zl.png';
import zl100 from '../assets/100zl.jpeg';
import zl200 from '../assets/200zl.jpeg';
import zl500 from '../assets/500zl.png';

export default class Cell extends Component {
  render() {
    const money = [empty, gr1, gr2, gr5, gr10, gr20, gr50, zl1, zl2, zl5, zl10, zl20, zl50, zl100, zl200, zl500];

    let imgSrc;
    typeof this.props.oldLevel === 'number' ? imgSrc = money[this.props.oldLevel] : imgSrc = money[this.props.level];

    let className = `cell ${this.props.class}`;

    if (imgSrc === empty) className = `cell empty ${this.props.class}`

    return (
      <div
        className={className}
        key={this.props.number}
      >
      <img src={imgSrc} alt='Ooops..'></img>
      </div>
    );
  }
}
