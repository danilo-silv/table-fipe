import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from "../Loading/index";
import api from "../../service/index";
import "./style.css";

export default class Vehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: '',
            loading: false,
        };
        this.loadModelsYear = this.loadModelsYear.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            let { codeBrand, vehicle, modelo, year } = nextProps.data;
            if (year !== "") {
                this.loadModelsYear(modelo, codeBrand, vehicle.codigo, year);
            }
        }
    };

    loadModelsYear = async (model, codeBrand, codigo, year) => {
        this.setState({ loading: true });
        const response = await trackPromise(api.get(`/${model}/marcas/${codeBrand}/modelos/${codigo}/anos/${year}`));
        console.log(response);
        const { data } = response;
        this.setState({ vehicle: data, loading: false });
    };

    render() {
        const { vehicle, loading } = this.state;
        return (
            <div className="content-year" id="vehicle">
                {vehicle === ''
                    ? null
                    :
                    <div className="model-vehicle">
                        <div className="title-category">
                            <h1>Veículo</h1>
                        </div>
                        <aside className="sidebar">
                            <div className="sidebar-model">
                                <div className="sidebar-widget widget_categories">
                                    <div className="sidebar-title">
                                        <p className="title">{vehicle.Modelo}</p>
                                    </div>
                                    <div className="sidebar-content">
                                        <div className="models-year">
                                            <section className="children">
                                                {loading ? <LoadingIndicator /> :
                                                    <div className="sidebar-content">
                                                        <section className="children">
                                                            <div className="content-brands">
                                                                <div className="item">

                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                }
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                }
            </div>
        );
    }
}
