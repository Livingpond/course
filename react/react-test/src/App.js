import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import Counter from './components/Counter';

function App() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count+1);
  };

  return (
    <div>
      <Counter />
    </div>
  );

}

export default App;
