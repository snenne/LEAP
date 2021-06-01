import React, { Component } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import toast from "react-hot-toast";
import axios from "axios";

export default class ITApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      environments: [],
      environmentName: this.props.match.params.name,
      environmentId: "",
      itApplications: [],
    };
  }

  async componentDidMount() {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/environment/environmentname/${this.state.environmentName}`
      )
      .then((response) =>
        this.setState({ environmentId: response.data.environmentId })
      )
      .catch((error) => {
        console.log(error);
        this.props.history.push("/error");
      });

    await axios
      .get(`${process.env.REACT_APP_API_URL}/itapplication/`)
      .then((response) => {
        this.setState({ itApplications: response.data });
      })
      .catch((error) => {
        toast.error("No IT Applications Found");
      });
  }

  edit(itApplicationId) {
    this.props.history.push(
      `/environment/${this.state.environmentName}/itapplication/${itApplicationId}`
    );
  }

  fetchDeleteITApplications = async (itApplicationId) => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/itapplication/${itApplicationId}`
      )
      .then((response) => toast.success("Succesfully Deleted IT Application"))
      .catch((error) => toast.error("Could not Delete IT Application"));
    //REFRESH CAPABILITIES
    await axios
      .get(`${process.env.REACT_APP_API_URL}/itapplication/`)
      .then((response) => {
        this.setState({ itApplications: [] });
        this.setState({ itApplications: response.data });
      })
      .catch((error) => {
        toast.error("Could not Find IT Applications");
      });
  };

  //DELETE CAPABILITY AND REMOVE ALL CHILD CAPABILITIES FROM STATE
  delete = async (itApplicationId) => {
    toast(
      (t) => (
        <span>
          <p className="text-center">
            Are you sure you want to remove this IT Application?
          </p>
          <div className="text-center">
            <button
              className="btn btn-primary btn-sm m-3"
              stlye={{ width: 50, height: 30 }}
              onClick={() => {
                toast.dismiss(t.id);
                this.fetchDeleteITApplications(itApplicationId);
              }}
            >
              Yes!
            </button>
            <button
              className="btn btn-secondary btn-sm m-3"
              stlye={{ width: 50, height: 30 }}
              onClick={() => toast.dismiss(t.id)}
            >
              No!
            </button>
          </div>
        </span>
      ),
      { duration: 50000 }
    );
  };

  render() {
    return (
      <div>
        <br></br>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={`/`}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/environment/${this.state.environmentName}`}>
                {this.state.environmentName}
              </Link>
            </li>
            <li className="breadcrumb-item">IT Applications</li>
          </ol>
        </nav>
        <div className="jumbotron">
          <div>
            <h1 className="display-4" style={{ display: "inline-block" }}>
              IT Applications
            </h1>
            <Link
              to={`/environment/${this.state.environmentName}/itApplication/add`}
            >
              <button className="btn btn-primary float-right">
                Add IT Application
              </button>
            </Link>
          </div>
          <br />
          <br />
          <MaterialTable
            columns={[
              { title: "ID", field: "itApplicationId" },
              { title: "Name", field: "name" },
              {
                title: "",
                name: "delete",
                render: (rowData) => (
                  <button className="btn btn-secondary">
                    <i
                      onClick={this.delete.bind(this, rowData.itApplicationId)}
                      className="bi bi-trash"
                    ></i>
                  </button>
                ),
              },
              {
                title: "",
                name: "edit",
                render: (rowData) => (
                  <button className="btn btn-secondary">
                    <i
                      onClick={this.edit.bind(this, rowData.itApplicationId)}
                      className="bi bi-pencil"
                    ></i>
                  </button>
                ),
              },
            ]}
            data={this.state.itApplications}
            options={{
              showTitle: false,
              search: false,
            }}
          />
        </div>
      </div>
    );
  }
}