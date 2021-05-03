import React, { Component } from 'react'
import Home from './Components/Home'
import Environment from "./Components/Environment";
import NewEnvironment from "./Components/NewEnvironment";
import UserList from "./Components/UserList"
import RecentEnvironments from './Components/RecentEnvironments'
import AddCapability from './Components/Add/AddCapability'
import './App.css';
import Signup from './auth/Login'
import LeapImg from './img/LEAP logo.png'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import AddResources from "./Components/Add/AddResources";
import AddStrategy from "./Components/Add/AddStrategy";
import AddBusinessProcess from "./Components/Add/AddBusinessProcess";
import AddITApplication from "./Components/Add/AddITApplication";
import AddProgram from "./Components/Add/AddProgram";
import AddStatus from "./Components/Add/AddStatus";
import AddStrategyItems from "./Components/Add/AddStrategyItems";
import AddProject from "./Components/Add/AddProject";
import EditCapability from "./Components/Edit/EditCapability";
import Capability from "./Components/General/Capability";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { authenticated: false }
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    if(localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'))
      this.setState({ authenticated: user.authenticated })
    }
  this.fetchEnvironments()
  }

  async fetchEnvironments() {
    const response = await fetch(`http://localhost:8080/environment/all}`, { method: 'GET'});
    const data = await response.json();
    console.log(data);
  }

  logout() {
    localStorage.removeItem('user')
    window.location.reload()
  }

  render() {
    if(this.state.authenticated === true) {
      return (
          <div>
            <BrowserRouter>
              <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#ff754f'}}>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                        aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                  <Link to={ '/home' } className='navbar-brand'><img src={ LeapImg } width="80" height="22"/></Link>
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                      <Link to={ '/add' } className='nav-link'>Add</Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                  </ul>
                  <form className="form-inline my-2 my-lg-0">

                    <Link to={ '' } onClick={ this.logout } style={{ color: '#fff'}} className='nav-link'>Logout</Link>
                  </form>
                </div>
              </nav>
          <div className = 'container'>
              <br/><br/>
              <Switch>
                <Route exact path='/home'><Home/></Route>
                <Route exact path='/environment/:name' component={Environment}/>
                <Route exact path='/environment/:name/capability/add' component={AddCapability}/>
                <Route exact path='/environment/:name/capability/:id/edit' component={EditCapability}/>
                <Route exact path='/environment/:name/capability/all' component={Capability}/>
                <Route exact path='/environment/:name/strategy/add' component={AddStrategy}/>
                <Route exact path='/environment/:name/resource/add' component={AddResources}/>
                <Route exact path='/environment/:name/itapplication/add' component={AddITApplication}/>
                <Route exact path='/environment/:name/businessprocess/add' component={AddBusinessProcess}/>
                <Route exact path='/environment/:name/status/add' component={AddStatus}/>
                <Route exact path='/environment/:name/project/add' component={AddProject}/>
                <Route exact path='/environment/:name/strategyitem/add' component={AddStrategyItems}/>
                <Route exact path='/environment/:name/program/add' component={AddProgram}/>
                <Route exact path='/add' component={ NewEnvironment }/>
                <Route exact path='/login' component={ Signup }/>
                <Route exact path='/recent' component={ RecentEnvironments }/>
                <Route exact path='/users' component={ UserList }/>
                <Route path='/'><Home/></Route>
              </Switch>

          </div>
            </BrowserRouter>
          </div>
      )
    }
    else {
      return (
          <BrowserRouter>
            <Route path='*' component={ Signup }/>
          </BrowserRouter>)
    }
  }
}

export default App
