import React from 'react';

import {createGame, reveal, markMine} from './minesweeper';
import {Cell} from './cell.jsx';

export const FACES = {
    SMILE: "🙂",
    NERVOUS: "😮",
    DEAD: "😵"
};

export const TEXTS = {
    WON: "You won!",
    LOST: "You lost :("
};

export class Board extends React.Component {

    constructor(props) {
        super(props);
        this.history = [];
        const rows = parseInt(props.rows);
        const cols = parseInt(props.cols);
        const mines = parseInt(props.mines);
        this.state = {
            game : createGame(rows, cols, mines),
            face : FACES.SMILE
        }
        this.handleClick = this.handleClick.bind(this);
        this.undo = this.undo.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
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
        if (currentGame !== newGame) {
            this.history.push(currentGame);
            this.setState({
                game: newGame
            });
        }
    }

    handleMouseDown(e) {
        this.setState({
            face: FACES.NERVOUS
        });
    }

    handleMouseUp(e) {
        this.setState({
            face: FACES.SMILE
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
            text = TEXTS.LOST;
        }
        if (hasWon) {
            text = TEXTS.WIN;
        }
        const face = game.get('isDead') ? FACES.DEAD : this.state.face;
        const rows = board.map((row, rowIndex) => {
            const cells = row.map(
                (cell, colIndex) => {
                    const key = rowIndex.toString() + '-' + colIndex.toString();
                    return (
                        <td key={key}>
                            <Cell rowKey={rowIndex} colKey={colIndex}
                                  cell={cell}
                                  handleClick={this.handleClick}
                                  handleRightClick={this.handleRightClick} />
                        </td>);

                });
            return <tr key={rowIndex}>{cells}</tr>;
        });
        return (
            <div>
                <table>
                    <thead>
                        <tr>{face}</tr>
                    </thead>
                    <tbody onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
                    {rows}
                    </tbody>
                </table>
                <p>{text}</p>
                <button id="undo-btn" onClick={this.undo}>Undo</button>
            </div>);
    }
}