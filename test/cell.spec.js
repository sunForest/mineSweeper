import React from 'react';
import {expect} from 'chai';
import immutable from 'immutable';
import {mount, shallow } from 'enzyme';
import {Cell} from '../app/cell';


describe('Cell', () => {
    it('should render <Cell />', () => {
        const data = immutable.fromJS({
            isMarked: false,
            isRevealed: false,
            isMine: false,
            mines: 3
        });
        const cell = shallow(<Cell cell={data} rowKey="1" colKey="2" />);
        expect(cell.find('button').text()).to.equal("?");
    });
});