import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import plusImg from '../img/plus.png';
import axios from 'axios';

export default class Environment extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            environmentName: this.props.match.params.name,
            environmentId: 1,
            capabilities: 0,
            itApplications: 0,
            programs: 0,
            strategies: 0,
            strategyItems: 0,
            projects: 0,
            resources: 0,
            businessProcesses: 0,
            status: 0,
        };
    }

    async componentDidMount() {
        await axios.get(`${process.env.REACT_APP_API_URL}/environment/environmentname/${this.state.environmentName}`)
            .then(response => {
                this.setState({
                    environmentId: response.data.environmentId,
                });
            })
            .catch(error => {
                this.props.history.push('/notfound')
            })
    }

    render() {
        return(
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/environment/${this.state.environmentName}`}>{this.state.environmentName}</Link></li>
                    </ol>
                </nav>
                <div className="container jumbotron">
                    <div className="card-deck">
                        <div className="card">
                        <Link to={`${this.state.environmentName}/capability`}>
                            <div className="card-body">
                                <h5 className="card-title text-center">Capabilities</h5>
                                <div className="text-center">
                                <Link to={`${this.state.environmentName}/capability/add`}><img src={ plusImg } alt='add' width='30' height='30'/></Link>
                                </div>
                            </div>
                            </Link>
                            <div className="card-footer">
                            </div>
                        </div>
                        <div className="card">
                        <Link to={`${this.state.environmentName}/strategy`}>
                            <div className="card-body">
                                <h5 className="card-title text-center">Strategies</h5>
                                <div className="text-center">
                                    <Link to={`${this.state.environmentName}/strategy/add`}><img src={ plusImg } alt='add' width='30' height='30'/></Link>
                                </div>
                            </div>
                        </Link>
                            <div className="card-footer">
                            </div>
                        </div>
                        <div className="card">
                        <Link to={`${this.state.environmentName}/resources`}>

                            <div className="card-body">
                                <h5 className="card-title text-center">Resources</h5>
                                <div className="text-center">
                                    <Link to={`${this.state.environmentName}/resource/add`}><img src={ plusImg } alt='add' width='30' height='30'/></Link>
                                </div>
                            </div>
                            </Link>
                            <div className="card-footer">
                            </div>
                        </div>
                    </div>
                    <div className="card-deck">
                        <div className="card">
                        <Link to={`${this.state.environmentName}/itapplication`}>
                            <div className="card-body">
                                <h5 className="card-title text-center">IT-Applications</h5>
                                <div className="text-center">
                                    <Link to={`${this.state.environmentName}/itapplication/add`}><img src={ plusImg } alt='add' width='30' height='30'/></Link>
                                </div>
                            </div>
                            </Link>
                            <div className="card-footer">
                            </div>
                        </div>
                        <div className="card">
                        <Link to={`${this.state.environmentName}/strategyitem`}>
                            <div className="card-body">
                                <h5 className="card-title text-center">Strategy Items</h5>
                                <div className="text-center">
                                    <Link to={`${this.state.environmentName}/strategyitem/add`}><img src={ plusImg } alt='add' width='30' height='30'/></Link>
                                </div>
                            </div>
                            </Link>
                            <div className="card-footer">
                            </div>
                        </div>
                        <div className="card">
                        <Link to={`${this.state.environmentName}/businessprocess`}>
                            <div className="card-body">
                                <h5 className="card-title text-center">Business Processes</h5>
                                <div className="text-center">
                                    <Link to={`${this.state.environmentName}/businessprocess/add`}><img src={ plusImg } alt='add' width='30' height='30'/></Link>
                                </div>
                            </div>
                            </Link>
                            <div className="card-footer"></div>
                        </div>
                    </div>
                    <div className="card-deck">
                        <div className="card">
                        <Link to={`${this.state.environmentName}/programs`}>
                            <div className="card-body">
                                <h5 className="card-title text-center">Programs</h5>
                                <div className="text-center">
                                    <Link to={`${this.state.environmentName}/program/add`}><img src={ plusImg } alt='add' width='30' height='30'/></Link>
                                </div>
                            </div>
                        </Link>
                        <div className="card-footer">
                        </div>
                        </div>
                        <div className="card">
                        <Link to={`${this.state.environmentName}/projects`}>
                            <div className="card-body">
                                <h5 className="card-title text-center">Projects</h5>
                                <div className="text-center">
                                    <Link to={`${this.state.environmentName}/project/add`}><img src={ plusImg } alt='add' width='30' height='30'/></Link>
                                </div>
                            </div>
                            </Link>
                            <div className="card-footer">
                            </div>
                        </div>
                        <div className="card">
                        <Link to={`${this.state.environmentName}/status`}>
                            <div className="card-body">
                                <h5 className="card-title text-center">Status</h5>
                                <div className="text-center">
                                    <Link to={`${this.state.environmentName}/status/add`}><img src={ plusImg } alt='add' width='30' height='30'/></Link>
                                </div>
                            </div>
                            </Link>
                            <div className="card-footer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }








}