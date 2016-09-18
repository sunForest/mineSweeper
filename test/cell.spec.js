import React from 'react';
import {expect, assert} from 'chai';
import sinon from 'sinon';
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

    it('should call handleClick when clicked', () => {
        const data = immutable.fromJS({
            isMarked: true,
            isRevealed: false,
            isMine: true,
            mines: 3
        });
        const handleClick = sinon.spy();
        const handleRightClick = sinon.spy();
        const cell = shallow(
            <Cell cell={data} 
                  handleClick={handleClick}
                  handleRightClick={handleRightClick}
                  rowKey="1" colKey="2" />);
        cell.simulate('click');
        cell.simulate('contextMenu');
        sinon.assert.calledOnce(handleClick);
        sinon.assert.calledWith(handleClick, 1, 2);
        sinon.assert.calledOnce(handleRightClick);
        sinon.assert.calledWith(handleRightClick, 1, 2);
    });
});