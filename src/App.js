import { createContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import EditPost from './components/EditPost/EditPost';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import CreatePost from './components/CreatePost/CreatePost';
import PostDetails from './components/PostDetails/PostDetails';
import AllUser from './components/AllUser/AllUser';
export const postsContext = createContext();
export const userContext = createContext();

function App() {
  const [allPost, setAllPost] = useState([]);
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setAllPost(data));
  }, []);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setAllUser(data));
  }, []);

  return (
    <div>
      <postsContext.Provider value={[allPost, setAllPost]}>
        <userContext.Provider value={[allUser, setAllUser]}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/profile" component={Profile}></Route>
              <Route path="/edit-posts/:id" component={EditPost}></Route>
              <Route path="/createPost" component={CreatePost}></Route>
              <Route path="/post-details/:id" component={PostDetails}></Route>
              <Route path="/users" component={AllUser}></Route>
            </Switch>
          </Router>
        </userContext.Provider>
      </postsContext.Provider>
    </div>
  );
}

export default App;
