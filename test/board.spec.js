import React from 'react';
import {expect} from 'chai';
import immutable from 'immutable';
import {mount, shallow } from 'enzyme';
import {Board} from '../app/js/board.jsx';


describe('Board', () => {
    it('should render a table with the given parameters', () => {
        const board = shallow(<Board rows="3" cols="3" mines="2" />);
        expect(board.find('table').length).to.equal(1);
        expect(board.find('tbody').find('tr').length).to.equal(3);
    });

});