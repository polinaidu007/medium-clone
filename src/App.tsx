import React, { useEffect, useState } from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import CreateArticle from './pages/CreateArticle';
import Article from './pages/Article';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import { UserContext } from './context/userContext';
import { getLocalStorageData, userObj } from './utils/utils';


function App() {
  const [user, setUser] = useState(new userObj())  //email,token,username,bio,image
  useEffect(() => {
    let user = getLocalStorageData()
    setUser(user)
    console.log('app component', user)
  }, [])


  return (
    <div>
      <Router>
        <ToastContainer />
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />

            <Route exact path='/settings' component={Settings} />
            <Route exact path='/' component={Home} />
            <Route exact path='/editor' component={CreateArticle} />
            <Route exact path='/editor/:slug' component={CreateArticle} />
            <Route exact path='/article' component={Article} />
            <Route exact path='/profile' component={Profile} />
          </Switch>
          <Footer />
        </UserContext.Provider>

      </Router>
      {/* <Home /> */}

    </div>
  )
}

export default App;
