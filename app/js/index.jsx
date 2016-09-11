import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';
import {createGame, reveal, markMine} from './minesweeper';
import {Cell} from './cell.jsx';

window.Perf = Perf;

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.history = [];
        this.state = {
            game : createGame(10, 10, 15)
        }
        this.handleClick = this.handleClick.bind(this);
        this.undo = this.undo.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }

    undo() {
        if (this.history.length > 0) {
            let lastGame = this.history.pop();
            this.setState({
                game: lastGame
            });
        }
    }

    handleClick(row, col) {
        const currentGame = this.state.game;
        const newGame = reveal(this.state.game, row, col);
        if (currentGame !== newGame) {
            this.history.push(currentGame);
            this.setState({
                game: newGame
            });
        }
    }

    handleRightClick(row, col, e) {
        e.preventDefault();
        const currentGame = this.state.game;
        const newGame = markMine(currentGame, row, col);
        this.history.push(currentGame);
        this.setState({
            game: newGame
        });
    }

    render() {
        const game = this.state.game;
        const board = game.get('board');
        const isDead = game.get('isDead');
        const hasWon = game.get('hasWon');
        const remaining = game.get('remaining');
        let text = `Remaining cells: ${remaining}`;
        if (isDead) {
            text = 'You lost.'
        }
        if (hasWon) {
            text = 'You won!!!'
        }
        const rows = board.map((row, idx) => <Row row={row} key={idx} rowKey={idx} handleClick={this.handleClick} handleRightClick={this.handleRightClick}/> );
        return (
            <div>
                {rows}
                <p>{text}</p>
                <button onClick={this.undo}>Undo</button>
            </div>);
    }
}


class Row extends React.Component {

    shouldComponentUpdate (nextProps, nextState) {
        return this.props.row != nextProps.row;
    }

    render() {
        const rowKey = this.props.rowKey;
        const cells = this.props.row.map( (cell, i) => <Cell cell={cell} key={i} colKey={i} rowKey={rowKey} {...this.props}/>);
        return <div>{cells}</div>;
    }
}


ReactDOM.render(<Board />, document.getElementById('app'));