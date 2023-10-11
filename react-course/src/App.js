import logo from './logo.svg';
import './App.css';
import {Button} from "antd";
import"antd/dist/reset.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

function App() {
  return (
<div className="App">
      <div className="header-click">
        <Header></Header>
      </div>
      <Body></Body>
      <Footer></Footer>
    </div>
   
  );
}

export default App;
