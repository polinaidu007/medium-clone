import React from 'react';
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
import EditArticle from './pages/EditArticle';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <Router>
        <ToastContainer />
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/register' component={Login} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/editor' component={CreateArticle} />
          <Route exact path='/editor/:article_id' component={EditArticle} />
          <Route exact path='/article' component={Article} />
          <Route exact path='/profile' component={Profile} />
        </Switch>
        <Footer />
      </Router>
      {/* <Home /> */}

    </div>
  )
}

export default App;
