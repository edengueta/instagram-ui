import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { useEffect } from "react";

import './App.scss';
import Header from './Header/Header';
import Register from './Welcome/Register/Register';
import Login from "./Welcome/Login/Login";
import Feed from "./Feed/Feed";
import {UserService} from './services/user.service'

function App() {

  const history = useHistory();  

  useEffect(() => {

    async function getMe() {
      try {
        const user = await UserService.me();
        if (!user) {
          history.push('/login');
        } 
      } catch(err) {
        console.log(err);
      }
    };
    getMe();
    
  }, [history]);


  return (
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
  );
}

export default App;
