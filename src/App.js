import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { useEffect, useState } from "react";

import './App.scss';
import Header from './Header/Header';
import Register from './Welcome/Register/Register';
import Login from "./Welcome/Login/Login";
import Feed from "./Feed/Feed";
import {UserService} from './services/user.service';
import { UserContext } from "./user-context";
import PostCreate from "./PostCreate/PostCreate";
import PostPage from "./PostPage/PostPage";
import Profile from "./Profile/Profile";
import Search from "./Search/Search";
import UploadAvatar from "./Profile/ProfileHeader/UploadAvatar/UploadAvatar";

function App() {

  const history = useHistory();  
  const [user, setUser] = useState({});

  useEffect(() => {

    async function getMe() {
      try {
        const user = await UserService.me();
        if (!user) {
          history.push('/login');
          return;
        }
        setUser(user); 
      } catch(err) {
        console.log(err);
      }
    };
    getMe();
  }, [history]);

  function isLoggedIn() {
    return Boolean(Object.keys(user).length); 
  }

  return (
    <UserContext.Provider value={ {user, setUser} }>
            <div className="App">
              {isLoggedIn() && <Header/>}
                <Switch>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                </Switch>
              <div className="container-md order-1">
                <Switch>
                  <Route path="/post/create">
                      <PostCreate/>
                  </Route>
                  <Route path="/post/:id">
                      <PostPage/>
                  </Route>
                  <Route path="/profile/:username">
                      <Profile/>
                  </Route>
                  <Route path="/search">
                      <Search/>
                  </Route>
                  <Route path="/" exact>
                      <Feed/>
                  </Route>
                </Switch>
              </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
