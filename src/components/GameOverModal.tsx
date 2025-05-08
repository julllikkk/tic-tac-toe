import type { FC } from 'react';

interface GameOverModalProps {
    isOpen: boolean;
    status: 'win' | 'lose' | 'draw' | 'playing';
    onClose: () => void;
}

const GameOverModal: FC<GameOverModalProps> = ({ isOpen, status, onClose }) => {
    if (!isOpen || status === 'playing') return null;

    const messages = {
        win: 'Поздравляем! Вы выиграли!🎉',
        lose: 'К сожалению, вы проиграли😿',
        draw: 'Ничья! Попробуйте еще раз😺'
    };


    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{messages[status]}</h2>
                <button onClick={onClose} className="play-again-btn">
                    Играть снова
                </button>
            </div>
        </div>
    );
};

export default GameOverModal;