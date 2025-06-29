import ChessBoard from './components/ChessBoard';
import { useChessGame } from './hooks/useChessGame';

function App() {
  const {
    board,
    currentPlayer,
    selectedSquare,
    validMoves,
    handleSquareClick,
    resetGame,
  } = useChessGame();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Chess Game</h1>

      <div className="mb-4 text-xl">
        Current Player:{' '}
        <span className="font-semibold capitalize">{currentPlayer}</span>
      </div>

      <ChessBoard
        board={board}
        selectedSquare={selectedSquare}
        validMoves={validMoves}
        onSquareClick={handleSquareClick}
      />

      <button
        type="button"
        onClick={resetGame}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;
