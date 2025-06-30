import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Employee } from './components/Employee/Employee';
import { Product } from './components/Product/Product';
import { User } from './components/User/User';
import { Chat } from './components/Chat/Chat';

function App() {
  const username = 'Иван Иванов';
  const age = 18;
  const isAdult = true;
  const digitsForSum = 12345;
  const users = [
    { name: 'user1', surn: 'surn1', age: 30 },
    { name: 'user2', surn: 'surn2', age: 31 },
    { name: 'user3', surn: 'surn3', age: 32 },
  ];
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);

  function show1() {
    alert(1);
  }

  function show2() {
    alert(2);
  }

  function onButtonClick() {
    inputRef?.current?.focus();
  }

  function getDigitsSum(digit) {
    const str = String(digit);
    const strArr = str.split("");
    return strArr.reduce((sum, digitStr) => Number(sum) + Number(digitStr), 0);
  }

  function renderNumList() {
    const result = [];
    for (let i = 1; i < 6; i++) {
      result.push(<li key={i}>{i}</li>);
    }
    return (
      <ul>
        {result}
      </ul>
    );
  }

  function renderUsers(users) {
    return (users ?? []).map((user, index) => (
      <p key={user.name}>
        <span>{user.name}</span>
        <span>{user.surn}</span>
        <span>{user.age}</span>
      </p>
    ));
  }

  useEffect(() => {
    console.log('Значение поля изменилось:', count);
  }, [count]);

  if (!isAdult) {
    return <div>Пожалуйста, авторизуйтесь.</div>
  }

  return (
    <div>
      <div className='card'>
        <div className='photo'>
          <img src='https://placehold.co/600x400' alt={username} />
        </div>
        <h3 className='username'>{username}{age >= 18 ? ' (18+)' : ''}</h3>
        <div className='jobtitle'>Фронтенд разработчик</div>
      </div>
      <hr />
      <p>{digitsForSum} digits sum = {getDigitsSum(digitsForSum)}</p>
      <button onClick={show1}>act1</button>
      <button onClick={show2}>act2</button>
      <hr />
      <button onClick={() => alert(1)}>Alert 1</button>
      <button onClick={() => alert(2)}>Alert 2</button>
      <button onClick={() => alert(3)}>Alert 3</button>
      <button onClick={(e) => console.log(e.target)}>Show event target</button>
      <hr />
      {renderNumList()}
      {renderUsers(users)}
      <hr />
      <Product />
      <hr />
      <Employee surname='Иванов' name='Иван' patronymic='Иванович' salary={50_000} />
      <br />
      <Employee surname='Петров' name='Петр' patronymic='Петрович' salary={30_000} />
      <br />
      <Employee surname='Васильев' name='Василий' patronymic='Васильевич' salary={700_000} />
      <hr />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return <User key={index} name={user.name} surname={user.surn} age={user.age} />
          })}
        </tbody>
      </table>
      <hr />
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <hr />
      <input ref={inputRef} />
      <button onClick={onButtonClick}>Focus</button>
      <hr />
      <Chat />
      <br/>
    </div>
  );
}

export default App;
