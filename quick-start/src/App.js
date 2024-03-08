import logo from './logo.svg';
import './App.css';
import MyApp from './folder/MyApp';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MyApp />
      </header>
    </div>
  );
}

export default App;
