import './App.scss';
import Header from './Header/Header';
import Register from './Register/Register';
import FloatingCircles from './FloatingCircles/FloatingCircles';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className="register-wrapper">
      <FloatingCircles/>
        <div className="container"> 
          <Register/> 
        </div>
    </div>
    </div>
  );
}

export default App;
