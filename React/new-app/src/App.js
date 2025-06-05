import './App.css';

function App() {
  const username = 'Иван Иванов';
  return (
    <div>
      <div className='card'>
        <div className='photo'>
          <img src='https://placehold.co/600x400' alt={username} />
        </div>
        <h3 className='username'>{username}</h3>
        <div className='jobtitle'>Фронтенд разработчик</div>
      </div>
    </div>
  );
}

export default App;
