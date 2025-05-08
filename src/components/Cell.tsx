import type { FC } from 'react';
import Lottie from 'lottie-react';
import crossAnimation from '../assets/animations/cross.json';
import ovalAnimation from '../assets/animations/oval.json';

interface CellProps {
    value: 'X' | 'O' | null;
    onClick: () => void;
    size?: number;
}

const Cell: FC<CellProps> = ({ value, onClick, size = 80 }) => {
    return (
        <button className="cell" onClick={onClick} aria-label={value ? `${value} клетка` : 'Пустая клетка'}>
            {value === 'X' && (
                <Lottie
                    animationData={crossAnimation}
                    loop={false}
                    style={{ width: size, height: size }}
                />
            )}
            {value === 'O' && (
                <Lottie
                    animationData={ovalAnimation}
                    loop={false}
                    style={{ width: size, height: size }}
                />
            )}
        </button>
    );
};

export default Cell;