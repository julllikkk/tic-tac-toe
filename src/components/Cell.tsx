import type { FC } from 'react';
import Lottie from 'lottie-react';
import crossAnimation from '../assets/animations/cross.json';
import ovalAnimation from '../assets/animations/oval.json';

interface CellProps {
    value: 'X' | 'O' | null;
    onClick: () => void;
}

const Cell: FC<CellProps> = ({ value, onClick }) => {
    return (
        <button className="cell" onClick={onClick}>
            {value === 'X' && (
                <Lottie
                    animationData={crossAnimation}
                    loop={false}
                    style={{ width: 80, height: 80 }}
                />
            )}
            {value === 'O' && (
                <Lottie
                    animationData={ovalAnimation}
                    loop={false}
                    style={{ width: 80, height: 80 }}
                />
            )}
        </button>
    );
};

export default Cell;