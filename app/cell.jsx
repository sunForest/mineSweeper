import React from 'react';

const UNREVEALED_CELL = '?';
const MINE_CELL = ':(';
const MARKED_CELL = '*';

export class Cell extends React.Component {

    shouldComponentUpdate (nextProps, nextState) {
       return this.props.cell != nextProps.cell;
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