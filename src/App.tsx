import ShogiBoard from './components/ShogiBoard';
import { useShogiGame } from './hooks/useShogiGame';

function App() {
  const {
    board,
    currentPlayer,
    selectedSquare,
    validMoves,
    handleSquareClick,
    resetGame,
  } = useShogiGame();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">将棋ゲーム</h1>

      <div className="mb-4 text-xl">
        手番:{' '}
        <span className="font-semibold">
          {currentPlayer === 'sente' ? '先手' : '後手'}
        </span>
      </div>

      <ShogiBoard
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
        対局リセット
      </button>
    </div>
  );
}

export default App;
