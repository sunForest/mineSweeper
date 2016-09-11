import React from 'react';
import {expect} from 'chai';
import immutable from 'immutable';
import {mount, shallow } from 'enzyme';
import {Cell, SYMBOLS} from '../app/js/cell';


describe('Cell', () => {
    it('should render unrevealed cells correctly', () => {
        const data = immutable.fromJS({
            isMarked: false,
            isRevealed: false,
            isMine: false,
            mines: 3
        });
        const cell = shallow(<Cell cell={data} rowKey="1" colKey="2" />);
        expect(cell.find('button').text()).to.equal(SYMBOLS.UNREVEALED_CELL);
    });

    it('should render revealed mine cells correctly', () => {
        const data = immutable.fromJS({
            isMarked: false,
            isRevealed: true,
            isMine: true,
            mines: 3
        });
        const cell = shallow(<Cell cell={data} rowKey="1" colKey="2" />);
        expect(cell.find('button').text()).to.equal(SYMBOLS.MINE_CELL);
    });

    it('should render revealed safe mine cells correctly', () => {
        const data = immutable.fromJS({
            isMarked: false,
            isRevealed: true,
            isMine: false,
            mines: 3
        });
        const cell = shallow(<Cell cell={data} rowKey="1" colKey="2" />);
        expect(cell.find('button').text()).to.equal("3");
    });

    it('should render marked cells correctly', () => {
        const data = immutable.fromJS({
            isMarked: true,
            isRevealed: false,
            isMine: true,
            mines: 3
        });
        const cell = shallow(<Cell cell={data} rowKey="1" colKey="2" />);
        expect(cell.find('button').text()).to.equal(SYMBOLS.MARKED_CELL);
    });
});