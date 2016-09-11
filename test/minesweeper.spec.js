import minesweeper from '../app/js/minesweeper';
import {expect} from 'chai';
import immutable from 'immutable';


describe('minesweeper', () => {
    it('should create a new game', () => {
        const [rows, cols, mines] = [5, 5, 3];
        const game = minesweeper.createGame(rows, cols, mines);
        expect(game.get('rows')).to.equal(rows);
        expect(game.get('cols')).to.equal(cols);
        expect(game.get('mines')).to.equal(mines);
        expect(game.get('board').size).to.equal(rows);
        expect(game.getIn(['board', 0]).size).to.equal(cols);
    });

    it('should reveal a cell and expand automatically', () => {
        const game = minesweeper.createGame(3, 3, 0);
        const newGame = minesweeper.reveal(game, 0, 0);
        expect(newGame.get('hasWon')).to.equal(true);
    });

    it('should end the game when revealing a mine cell', () => {
        const game = minesweeper.createGame(3, 3, 9);
        const newGame = minesweeper.reveal(game, 0, 0);
        expect(newGame.get('isDead')).to.equal(true);
    })
});