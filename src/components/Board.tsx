import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import gridAnimation from '../assets/animations/grid.json';
import Cell from './Cell';

interface BoardProps {
    board: ('X' | 'O' | null)[];
    onClick: (index: number) => void;
}

const Board: FC<BoardProps> = ({ board, onClick }) => {
    const [playGridAnimation, setPlayGridAnimation] = useState(true);

    useEffect(() => {
        // Останавливаем анимацию через 1 секунду
        const timer = setTimeout(() => {
            setPlayGridAnimation(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="board-container">
            <div className="grid-animation">
                <Lottie
                    animationData={gridAnimation}
                    loop={false}
                    autoplay={playGridAnimation}
                    style={{ width: 370, height: 370 }}
                />
            </div>
            <div className="board">
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