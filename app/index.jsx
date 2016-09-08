import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';
import {createGame, reveal, markMine} from './minesweeper';

const UNREVEALED_CELL = '?';
const MINE_CELL = ':(';
const MARKED_CELL = '*';
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
        console.log('mark as mine');
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
    render() {
        const rowKey = this.props.rowKey;
        const cells = this.props.row.map( (cell, i) => <Cell cell={cell} key={i} colKey={i} rowKey={rowKey} handleClick={this.props.handleClick} handleRightClick={this.props.handleRightClick}/>);
        return <div>{cells}</div>;
    }
}


class Cell extends React.Component {
    componentWillUpdate (nextProps, nextState) {
        if (this.state == nextState) {
            return false;
        }
        console.log('updated');
        return true;
    }

    render() {
        let text = UNREVEALED_CELL;
        let data = this.props.cell;
        const row = this.props.rowKey;
        const col = this.props.colKey;
        let className = "cell";
        if (data.get('isMarked')) {
            text = MARKED_CELL;
        } else if (data.get('isRevealed')) {
            className += ' revealed';
            data.get('isMine') ? text = MINE_CELL : text = data.get('mines');
        }
        return (
            <button className={className} 
                    onClick={() => this.props.handleClick(row, col)}
                    onContextMenu={e => this.props.handleRightClick(row, col, e)}>
                {text}
            </button>);
    }
}


ReactDOM.render(<Board />, document.getElementById('app'));