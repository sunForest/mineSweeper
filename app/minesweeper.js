const immutable = require('immutable');
const _ = require('lodash');

const delta = [[-1, -1], [-1, 0], [-1, 1], [0, -1],
            [0, 1], [1, -1], [1, 0], [1, 1]];


function createGame(rows, cols, mines) {
    var cells = [];
    var board = [];
    _.range(mines).forEach( () => {
        cells.push({isMine: true});
    });
    _.range(rows * cols - mines).forEach( () => {
        cells.push({});
    });
    cells = _.shuffle(cells);
    cells = cells.map( cell => {
        cell.mines = 0;
        return cell;
    })
    for(var i = 0; i < rows * cols; i += cols){
        board.push(cells.slice(i, i + cols));
    }
    countMines(board, rows, cols);
    return immutable.fromJS({
        board: board,
        rows: rows,
        cols: cols,
        remaining: rows * cols,
        mines: mines
    });
}

function countMines(board, rows, cols) {
    board.forEach( (row, i) => {
        row.forEach( (cell, j) => {
            if (cell.isMine) {
                incrNeighbors(board, i, j, rows, cols);
            }
        })
    });
}

function neighbors(i, j, rows, cols) {
    return delta.map(d => [i + d[0], j + d[1]])
         .filter(d => d[0] >= 0 && d[0] < rows && d[1] >= 0 && d[1] < cols);
}

function incrNeighbors(board, i, j, rows, cols){
    neighbors(i, j, rows, cols)
        .forEach(d => board[d[0]][d[1]].mines += 1);
}

function revealMines(game) {
    game.get('board').forEach( (row, ri) => row.forEach( (cell, ci) => {
        if (cell.get('isMine')) {
            game = game.setIn(['board', ri, ci, 'isRevealed'], true);
        }
    }));
    return game;
}

function reveal(game, i, j) {
    if (game.get('isDead') || game.get('hasWon')) {
        return game;
    }
    if (game.getIn(['board', i, j, 'isRevealed'])) {
        return game;
    }
    if (game.getIn(['board', i, j, 'isMarked'])) {
        return game;
    }
    if (game.getIn(['board', i, j, 'isMine'])) {
        return revealMines(game).set('isDead', true);
    }
    var currentGame;
    currentGame = game.setIn(['board', i, j, 'isRevealed'], true);
    currentGame = currentGame.update('remaining', x => x - 1);
    if (currentGame.get('remaining') === currentGame.get('mines')) {
        return currentGame.set('hasWon', true);
    }
    if (currentGame.getIn(['board', i, j, 'mines']) == 0) {
        const nb = neighbors(i, j, currentGame.get('rows'), currentGame.get('cols'));
        nb.forEach( d => {
            if ( !currentGame.getIn(['board', d[0], d[1], 'isRevealed'])) {
                currentGame = reveal(currentGame, d[0], d[1]);
            }
        });
    }
    return currentGame;
}

function markMine(game, i, j){
    if (game.get('isDead') || game.get('hasWon')) {
        return game;
    }
    const isMarked = game.getIn(['board', i, j, 'isMarked']);
    return game.setIn(['board', i, j, 'isMarked'], !isMarked);
}

exports.createGame = createGame;
exports.reveal = reveal;
exports.markMine = markMine;
