import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';
import Header from './Header/Header';
import Register from './Welcome/Register/Register';
import Login from "./Welcome/Login/Login";
import Feed from "./Feed/Feed";


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
            <Switch>
            <Route path="/register">
                <Register/>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/" exact>
                <Feed/>
              </Route>
            </Switch>
      </div>
    </Router>
  );
}

export default App;
