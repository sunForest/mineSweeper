import React from 'react';
import {expect} from 'chai';
import immutable from 'immutable';
import {mount, shallow } from 'enzyme';
import {Board} from '../app/js/board.jsx';
import {SYMBOLS} from '../app/js/cell.jsx';


describe('Board', () => {

    var board;

    before( () => {
        board = shallow(<Board rows="3" cols="3" mines="2" />);
    })

    it('should render a table with the given parameters', () => {
        expect(board.find('table').length).to.equal(1);
        const rows = board.find('tbody').find('tr');
        expect(rows).to.have.length(3);
        expect(rows.find('td')).to.have.length(9);
    });

    it('should reveal a cell when clicked', () => {
        var cell = board.find('Cell').first();
        expect(cell.prop('cell').get('isRevealed')).to.not.be.ok;
        cell.prop('handleClick')(0, 0);
        board.update();
        cell = board.find('Cell').first();
        expect(cell.prop('cell').get('isRevealed')).to.be.true;
        expect(cell.text()).to.not.equal(SYMBOLS.UNREVEALED_CELL);
    });

});