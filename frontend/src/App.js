import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import NewEnvironment from "./Components/Environment/NewEnvironment";
import User from "./Components/User/User";
import AddCapability from "./Components/Capability/AddCapability";
import "./App.css";
import Signup from "./Components/Authentication/Login";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import LeapImg from "./img/LEAP logo.png";
import { Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import AddResource from "./Components/Resource/AddResource";
import AddStrategy from "./Components/Strategy/AddStrategy";
import AddBusinessProcess from "./Components/BusinessProcess/AddBusinessProcess";
import AddITApplication from "./Components/IT-Application/AddITApplication";
import AddProgram from "./Components/Program/AddProgram";
import AddStatus from "./Components/Status/AddStatus";
import AddStrategyItem from "./Components/StrategyItem/AddStrategyItem";
import AddProject from "./Components/Project/AddProject";
import EditCapability from "./Components/Capability/EditCapability";
import Capability from "./Components/Capability/Capability";
import Project from "./Components/Project/Project";
import Status from "./Components/Status/Status";
import NotFoundPage from "./Components/Error/NotFoundPage";
import BusinessProcess from "./Components/BusinessProcess/BusinessProcess";
import EditBusinessProcess from "./Components/BusinessProcess/EditBusinessProcess";
import ITApplication from "./Components/IT-Application/ITApplication";
import EditITApplication from "./Components/IT-Application/EditITApplication";
import EditStatus from "./Components/Status/EditStatus";
import EditProject from "./Components/Project/EditProject";
import EditStrategy from "./Components/Strategy/EditStrategy";
import StrategyItem from "./Components/StrategyItem/StrategyItem";
import Strategy from "./Components/Strategy/Strategy";
import EditResource from "./Components/Resource/EditResource";
import Resource from "./Components/Resource/Resource";
import EditStrategyItem from "./Components/StrategyItem/EditStrategyItem";
import EditProgram from "./Components/Program/EditProgram";
import Program from "./Components/Program/Program";
import toast, { Toaster } from "react-hot-toast";
import AddUser from "./Components/User/AddUser";
import EditUser from "./Components/User/EditUser";
import CapabilityMap from "./Components/Environment/CapabilityMap";
import EditEnvironment from "./Components/Environment/EditEnvironment";
import Settings from "./Components/User/Settings";
import API from "./Services/API";
import AddInfo from "./Components/Information/AddInfo";
import EditInfo from "./Components/Information/EditInfo";
import Info from "./Components/Information/Info";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: new API(),
      authenticated: false,
      isOnline: window ? window.navigator.onLine : false,
      roleId: "",
      username: "",
      user: {},
      environmentName: "",
      jwt: "",
    };
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.setState({ authenticated: user.authenticated });
      this.setState({ jwt: JSON.parse(localStorage.getItem("user")).jwt });
      this.state.api.createEntity({ name: "user" });
      await this.state.api.endpoints.user
        .getUser()
        .then((response) => {
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: response.data.email,
              userId: response.data.userId,
              username: response.data.username,
              roleId: response.data.roleDto[0].roleId,
              authenticated: true,
              jwt: this.state.jwt,
            })
          );
          this.setState({ user: JSON.parse(localStorage.getItem("user")) });
        })
        .catch((error) => {
          if (error.response.status === 403) {
            // localStorage.removeItem("user");
            // localStorage.removeItem("environment");
            // this.props.history.push("/");
            // window.location.reload();
            // return;
          }
          // toast.error("Could not Load User");
        });
    }
  }

  componentWillMount() {
    this.props.history.listen((location, action) => {
      if (localStorage.getItem("environment")) {
        let environment = JSON.parse(localStorage.getItem("environment"));
        this.setState({ environmentName: environment.environmentName });
      }
    });
  }
  //EXEUCTE LOGOUT PROCEDURE
  //REMOVE USER FROM STORAGE AND SEND USER TO LOGIN PAGE
  async logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("environment");
    this.props.history.push("/");
    window.location.reload();
    await this.state.api.endpoints.user
      .logout(this.state.user.email)
      .then((result) => toast.success("Logged Out..."))
      .catch((error) => console.log(error));
  }

  //DISPLAY USER-ADMIN SETTINGS ONLY FOR USER-ADMINS
  adminSettings() {
    if (this.state.user.roleId === 1) {
      return (
        <Link to="/user">
          <li className="dropdown-item">User List</li>
        </Link>
      );
    }
    return;
  }
  //MAKE ROUTES ACCESSIBLE TO USER-ADMINS ONLY
  adminRoutes() {
    if (this.state.user.roleId === 1) {
      return (
        <Switch>
          <Route exact path="/user" component={User} />
          <Route exact path="/user/add" component={AddUser} />
          <Route exact path="/user/:id" component={EditUser} />
        </Switch>
      );
    }
  }

  //SHOW SIDEBAR
  sideBar() {
    if (localStorage.getItem("environment")) {
      return (
        <nav className="nav__cont">
          <ul className="nav">
            <Link
              onClick={() => this.environmentCheck}
              to={`/environment/${this.state.environmentName}`}
            >
              <li className="nav__items ">
                <i className="bi bi-aspect-ratio"></i>
                <p>Environment</p>
              </li>
            </Link>
            <Link
              to={`/environment/${this.state.environmentName}/capability`}
              onClick={() => this.environmentCheck}
            >
              <li className="nav__items ">
                <i className="bi bi-chat-square"></i>
                <p>Capability</p>
              </li>
            </Link>
            <Link
              to={`/environment/${this.state.environmentName}/status`}
              onClick={() => this.environmentCheck}
            >
              <li className="nav__items ">
                <i className="bi bi-calendar-date"></i> <p>Status</p>
              </li>
            </Link>
            <Link to={`/environment/${this.state.environmentName}/strategy`}>
              <li className="nav__items ">
                <i className="bi bi-app"></i> <p>Strategy</p>
              </li>
            </Link>
            <Link
              to={`/environment/${this.state.environmentName}/strategyitem`}
            >
              <li className="nav__items ">
                <i className="bi bi-app-indicator"></i> <p>Strategy Item</p>
              </li>
            </Link>
            <Link
              to={`/environment/${this.state.environmentName}/itapplication`}
            >
              <li className="nav__items ">
                <i className="bi bi-window"></i> <p>IT Application</p>
              </li>
            </Link>
            <Link to={`/environment/${this.state.environmentName}/project`}>
              <li className="nav__items ">
                <i className="bi bi-kanban"></i> <p>Project</p>
              </li>
            </Link>
            <Link to={`/environment/${this.state.environmentName}/resource`}>
              <li className="nav__items ">
                <i className="bi bi-folder"></i> <p>Resource</p>
              </li>
            </Link>
            <Link to={`/environment/${this.state.environmentName}/program`}>
              <li className="nav__items ">
                <i className="bi bi-cpu"></i> <p>Program</p>
              </li>
            </Link>
            <Link
              to={`/environment/${this.state.environmentName}/businessprocess`}
            >
              <li className="nav__items ">
                <i className="bi bi-wallet2"></i> <p>Business Process</p>
              </li>
            </Link>
            <Link to={`/environment/${this.state.environmentName}/info`}>
              <li className="nav__items ">
                <i className="bi bi-info-square"></i> <p>Info</p>
              </li>
            </Link>
          </ul>
        </nav>
      );
    }
    return;
  }

  render() {
    if (this.state.authenticated === true) {
      return (
        <div>
          <Toaster />
          {this.sideBar()}

          <nav
            className="navbar navbar-expand-lg navbar-dark sticky-top shadow-lg"
            style={{ backgroundColor: "#ff754f" }}
          >
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <Link to={"/home"} className="navbar-brand">
                <img alt="leap" src={LeapImg} width="80" height="22" />
              </Link>
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
              <form className="form-inline my-2 my-lg-0">
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDarkDropdown"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                      <li
                        style={{ color: "#fff" }}
                        href="#"
                        id="navbarDarkDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i
                          className="bi bi-person-circle"
                          style={{ fontSize: 30 }}
                        ></i>
                      </li>
                      <ul
                        className="dropdown-menu dropdown-menu-right dropdown-menu-dark text-center"
                        aria-labelledby="navbarDarkDropdownMenuLink"
                      >
                        <Link to="/settings">
                          <li className="dropdown-item">Settings</li>
                        </Link>
                        {this.adminSettings()}
                        <Link to={""} onClick={this.logout}>
                          <li className="dropdown-item">Logout</li>
                        </Link>
                        <hr></hr>
                        <li className="my-auto" style={{ marginBottom: 5 }}>
                          {this.state.user.username}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </nav>
          <div>
            <Switch>
              {/* ROOT */}
              <Route exact path="/home" component={NewEnvironment} />
              <Route exact path="/" component={NewEnvironment} />
              <Route exact path="/error" component={NotFoundPage} />
              <Route exact path="/404" component={NotFoundPage} />
              {/* ENVIRONMENTS */}
              <Route exact path="/add" component={NewEnvironment} />
              <Route
                exact
                path="/environment/:name"
                component={CapabilityMap}
              />
              <Route
                exact
                path="/environment/:id/edit"
                component={EditEnvironment}
              />
              {/* CAPABILITIES */}
              <Route
                exact
                path="/environment/:name/capability/add"
                component={AddCapability}
              />
              <Route
                exact
                path="/environment/:name/capability/:id"
                component={EditCapability}
              />
              <Route
                exact
                path="/environment/:name/capability"
                component={Capability}
              />
              {/* INFOS */}
              <Route
                exact
                path="/environment/:name/info/add"
                component={AddInfo}
              />
              <Route
                exact
                path="/environment/:name/info/:id"
                component={EditInfo}
              />
              <Route exact path="/environment/:name/info" component={Info} />
              {/* STRATEGIES */}
              <Route
                exact
                path="/environment/:name/strategy/add"
                component={AddStrategy}
              />
              <Route
                exact
                path="/environment/:name/strategy/:id"
                component={EditStrategy}
              />
              <Route
                exact
                path="/environment/:name/strategy"
                component={Strategy}
              />

              {/* RESOURCES */}
              <Route
                exact
                path="/environment/:name/resource/add"
                component={AddResource}
              />
              <Route
                exact
                path="/environment/:name/resource/:id"
                component={EditResource}
              />
              <Route
                exact
                path="/environment/:name/resource"
                component={Resource}
              />

              {/* ITAPPLICATIONS */}
              <Route
                exact
                path="/environment/:name/itapplication/add"
                component={AddITApplication}
              />
              <Route
                exact
                path="/environment/:name/itapplication/:id"
                component={EditITApplication}
              />
              <Route
                exact
                path="/environment/:name/itapplication"
                component={ITApplication}
              />
              {/* BUSSINESSPROCESSES */}
              <Route
                exact
                path="/environment/:name/businessprocess/add"
                component={AddBusinessProcess}
              />
              <Route
                exact
                path="/environment/:name/businessprocess/:id"
                component={EditBusinessProcess}
              />
              <Route
                exact
                path="/environment/:name/businessprocess"
                component={BusinessProcess}
              />
              {/* STATUSES */}
              <Route
                exact
                path="/environment/:name/status/add"
                component={AddStatus}
              />
              <Route
                exact
                path="/environment/:name/status/:id"
                component={EditStatus}
              />
              <Route
                exact
                path="/environment/:name/status"
                component={Status}
              />
              {/* PROJECTS */}
              <Route
                exact
                path="/environment/:name/project/add"
                component={AddProject}
              />
              <Route
                exact
                path="/environment/:name/project/:id"
                component={EditProject}
              />
              <Route
                exact
                path="/environment/:name/project"
                component={Project}
              />
              {/* STRATEGYITEMS */}
              <Route
                exact
                path="/environment/:name/strategyitem/add"
                component={AddStrategyItem}
              />
              <Route
                exact
                path="/environment/:name/strategyitem/:id"
                component={EditStrategyItem}
              />
              <Route
                exact
                path="/environment/:name/strategyitem"
                component={StrategyItem}
              />

              {/* PROGRAMS */}
              <Route
                exact
                path="/environment/:name/program/add"
                component={AddProgram}
              />
              <Route
                exact
                path="/environment/:name/program/:id"
                component={EditProgram}
              />
              <Route
                exact
                path="/environment/:name/program"
                component={Program}
              />
              <Route exact path="/login">
                <Redirect to="/home" />
              </Route>

              {/* USERS */}
              <Route exact path="/settings" component={Settings} />
              {this.adminRoutes()}
              {/* ERRORS */}
              <Route path="/*" component={NotFoundPage} />
            </Switch>
          </div>
          <nav className="shadow-lg navbar fixed-bottom navbar-dark bg-dark text-center">
            <div className="container-fluid">
              <a
                href="https://gitlab.apstudent.be/2ti_project_informatica_2020_2021/groep-5/leap-groep-5"
                className="me-4 text-center"
              >
                <i className="bi bi-github text-white"></i>
              </a>
              <div className="text-center text-white">
                Bavo&amp;Stepbros© 2021 Copyright
              </div>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/login" component={Signup} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      );
    }
  }
}

export default withRouter(App);
