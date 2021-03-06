import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import SearchResults from './pages/SearchResults';
import NewArcade from './pages/new-arcade/NewArcade';
import PlayerProfile from './pages/player-profile/PlayerProfile';
import ArcadeDetails from './pages/arcade-details/ArcadeDetails';
import Favourites from './pages/favourite-arcades/Favourites';



class App extends Component {

  render() {
    return (
      <div className="container">

      <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/:city" component={SearchResults} />
          <Route exact path="/arcade-details/:id" component={ArcadeDetails} />

          <PrivateRoute exact path="/player/me" component={PlayerProfile} />
          <PrivateRoute exact path="/create-arcade" component={NewArcade} />
          <PrivateRoute exact path="/favourites" component={Favourites} />
            {/* New Arcade is a Private Route */}
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
