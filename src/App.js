import Board from './components/Board';
import Square from './components/Square';

import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>Chess</header>
      <main>
        <Board>
          {[...new Array(204)].fill('').map((v, i) => (
            <Square color={i % 2 === 0 ? 'white' : 'black'} />
          ))}
        </Board>
      </main>
    </div>
  );
}

export default App;
