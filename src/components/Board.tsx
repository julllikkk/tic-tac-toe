import type { FC } from 'react';
import Lottie from 'lottie-react';
import gridAnimation from '../assets/animations/grid.json';
import Cell from './Cell';

interface BoardProps {
    board: ('X' | 'O' | null)[];
    onClick: (index: number) => void;
}

const Board: FC<BoardProps> = ({ board, onClick }) => {
    return (
        <div className="board-container">
            <div className="grid-animation">
                <Lottie
                    animationData={gridAnimation}
                    loop={false}
                    style={{ width: 370, height: 370 }}
                />
            </div>
            <div className="board" aria-label="Игровое поле крестики-нолики">
                {board.map((cell, index) => (
                    <Cell
                        key={index}
                        value={cell}
                        onClick={() => onClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;