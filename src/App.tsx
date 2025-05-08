import { useState, useEffect } from 'react';
import Board from './components/Board';
import GameOverModal from './components/GameOverModal';
import './App.css';

type Player = 'X' | 'O' | null;
type GameStatus = 'playing' | 'win' | 'lose' | 'draw';

export default function App() {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState<boolean>(true);
    const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (!isXNext && gameStatus === 'playing') {
            const timer = setTimeout(() => {
                makeComputerMove();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isXNext, gameStatus]);

    useEffect(() => {
        if (gameStatus !== 'playing') {
            const timer = setTimeout(() => {
                setShowModal(true);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [gameStatus]);

    const checkWinner = (currentBoard: Player[]): Player | null => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (const [a, b, c] of lines) {
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return currentBoard[a];
            }
        }
        return null;
    };

    const checkDraw = (currentBoard: Player[]): boolean => {
        return currentBoard.every(cell => cell !== null) && !checkWinner(currentBoard);
    };

    const handleClick = (index: number) => {
        if (board[index] || !isXNext || gameStatus !== 'playing') return;

        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);
        setIsXNext(false);

        const winner = checkWinner(newBoard);
        if (winner) {
            setGameStatus('win');
        } else if (checkDraw(newBoard)) {
            setGameStatus('draw');
        }
    };

    const makeComputerMove = () => {
        if (gameStatus !== 'playing') return;

        const emptyIndices = board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
        if (emptyIndices.length === 0) return;

        let move = findWinningMove('O', board);
        if (move === -1) move = findWinningMove('X', board);
        if (move === -1 && board[4] === null) move = 4;
        if (move === -1) {
            const corners = [0, 2, 6, 8].filter(index => board[index] === null);
            if (corners.length > 0) move = corners[Math.floor(Math.random() * corners.length)];
        }
        if (move === -1) move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

        const newBoard = [...board];
        newBoard[move] = 'O';
        setBoard(newBoard);
        setIsXNext(true);

        const winner = checkWinner(newBoard);
        if (winner) {
            setGameStatus('lose');
        } else if (checkDraw(newBoard)) {
            setGameStatus('draw');
        }
    };

    const findWinningMove = (player: Player, currentBoard: Player[]): number => {
        for (let i = 0; i < 9; i++) {
            if (currentBoard[i] === null) {
                const newBoard = [...currentBoard];
                newBoard[i] = player;
                if (checkWinner(newBoard) === player) {
                    return i;
                }
            }
        }
        return -1;
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setGameStatus('playing');
        setShowModal(false);
    };

    return (
        <div className="app">
            <h1>Крестики-нолики</h1>
            <p>{isXNext ? 'Ваш ход (X)' : 'Компьютер думает (O)...'}</p>
            <Board board={board} onClick={handleClick} />
            <GameOverModal
                isOpen={showModal}
                status={gameStatus}
                onClose={resetGame}
            />
        </div>
    );
}