import './myApp.css';
import { useState } from 'react';

function MyButton({count, onClick}) {
  return (
    <button onClick={onClick}
    >Clicked {count} times</button>
  );
}

export default function MyApp() {
  const [count, setCount] = useState(0);
  function handleButton() {
    setCount(count + 1)
  }
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton count={count} onClick={handleButton} />
      <MyButton count={count} onClick={handleButton} />

    </div>
  );
}
