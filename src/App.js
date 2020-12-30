import React, { Component } from 'react';
import './App.css';
import { Content } from './components/content';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Browse } from './components/browse';
import { View } from './components/view';
import { Create } from './components/create';
import { Edit } from './components/edit';
import { Search } from './components/search';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/"><img src="https://learnonline.gmit.ie/pluginfile.php/1/theme_adaptable/logo/1608657672/Transparent%20new.png" width="90" height="30" />{' '}</Navbar.Brand>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/browse">Browse</Nav.Link>
              <Nav.Link href="/search">Search</Nav.Link>
              <Nav.Link href="/create">Create</Nav.Link>
            </Nav>
          </Navbar>
          <br />
          <Switch>
            <Route path='/' component={Content} exact />
            <Route path='/browse' component={Browse}  />
            <Route path='/search' component={Search}  />
            <Route path='/view/:id' component={View}  />
            <Route path='/create' component={Create}  />
            <Route path='/edit/:id' component={Edit}  />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

