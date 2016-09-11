import React from 'react';


export const SYMBOLS = {
    UNREVEALED_CELL: '?',
    MINE_CELL: ':(',
    MARKED_CELL: '*'
};


export class Cell extends React.Component {

    shouldComponentUpdate (nextProps, nextState) {
       return this.props.cell != nextProps.cell;
    }

    render() {
        let text = SYMBOLS.UNREVEALED_CELL;
        let data = this.props.cell;
        const row = this.props.rowKey;
        const col = this.props.colKey;
        let className = "cell";
        if (data.get('isMarked')) {
            text = SYMBOLS.MARKED_CELL;
        } else if (data.get('isRevealed')) {
            className += ' revealed';
            data.get('isMine') ? text = SYMBOLS.MINE_CELL : text = data.get('mines');
        }
        return (
            <button className={className} 
                    onClick={() => this.props.handleClick(row, col)}
                    onContextMenu={e => this.props.handleRightClick(row, col, e)}>
                {text}
            </button>);
    }
}