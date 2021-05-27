import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import * as sha1 from "js-sha1";

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id,
      roles: [],
      username: "",
      roleId: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", this.state.userId);
    formData.append("username", this.state.username);
    formData.append("email", this.state.email);
    formData.append("password", sha1("newUser"));
    formData.append("roleId", this.state.roleId);
    await axios
      .put(`${process.env.REACT_APP_API_URL}/user/`, formData)
      .then((response) => {
        toast.success("User Updated Successfully!");
        this.props.history.push(`/user`);
      })
      .catch((error) => toast.error("Could not Update User"));
  };

  async componentDidMount() {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user/${this.state.userId}`)
      .then((response) =>
        this.setState({
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,
          roleId: response.data.roleId,
        })
      )
      .catch((error) => {
        toast.error("Could not Load User");
      });

    await axios
      .get(`${process.env.REACT_APP_API_URL}/role/`)
      .then((response) => this.setState({ roles: response.data }))
      .catch((error) => {
        toast.error("Could not Load Roles");
      });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  roleListRows() {
    return this.state.roles.map((role) => {
      return (
        <option key={role.roleId} value={role.roleId}>
          {role.roleName}
        </option>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <br></br>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={`/`}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/user`}>User</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit User
            </li>
          </ol>
        </nav>
        <div className="jumbotron">
          <h3>Edit User</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="username">Name</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="paceOfChange">Role</label>
                    <select
                      className="form-control"
                      name="roleId"
                      id="roleId"
                      placeholder="Role"
                      value={this.state.roleId}
                      onChange={this.handleInputChange}
                      required
                    >
                      {this.roleListRows()}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
