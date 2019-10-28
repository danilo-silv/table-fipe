import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from "../Loading/index";
import api from "../../service/index";
import "./style.css";

export default class Vehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: {
                "Valor": "R$ 20.897,00",
                "Marca": "GM - Chevrolet",
                "Modelo": "Vectra Elegance 2.2 MPFI 16V Aut.",
                "AnoModelo": 2005,
                "Combustivel": "Gasolina",
                "CodigoFipe": "004298-6",
                "MesReferencia": "outubro de 2019 ",
                "TipoVeiculo": 1,
                "SiglaCombustivel": "G"
            },
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

    setFavorite(vehicle) {
        console.log(vehicle);
        let dateLocal = localStorage['ArrayFavorite'];
        if (dateLocal != undefined) {
            let newVehicle = JSON.parse(dateLocal);
            newVehicle.push(vehicle);
            localStorage['ArrayFavorite'] = JSON.stringify(newVehicle);
        } else {
            let ArrayFavorite = [vehicle];
            localStorage['ArrayFavorite'] = JSON.stringify(ArrayFavorite);
        }
    }

    render() {
        const { vehicle, loading } = this.state;
        return (
            <div className="content-year" id="vehicle">
                {vehicle === ''
                    ? null
                    :
                    <div className="model-vehicle">
                        <div className="title-category">
                            <h1>Dados do Veículo</h1>
                        </div>
                        <aside className="sidebar">
                            <div className="sidebar-model">
                                <div className="sidebar-widget widget_categories">
                                    <div className="sidebar-title">
                                        <p className="title">{vehicle.Modelo}</p>
                                    </div>
                                    {loading ? <LoadingIndicator /> :
                                        <section className="children-vehicle">
                                            <div className="description-vehicle">
                                                <div className="flex">
                                                    <div className="data">
                                                        <p className="brand">
                                                            <strong>{vehicle.Marca} </strong>
                                                        </p>
                                                        <p className="name">
                                                            {vehicle.Modelo}
                                                        </p>
                                                    </div>
                                                    <div className="info-additional">

                                                        <p className="code-fipe">
                                                            <small>Ano: {vehicle.AnoModelo},<br />  Codigo fipe: {vehicle.CodigoFipe}</small>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="info-price">
                                                    <p className="price">
                                                        <strong>{vehicle.Valor} </strong>
                                                    </p>
                                                    <p>
                                                        mês ref: {vehicle.MesReferencia}
                                                    </p>
                                                    <p className="fuel">
                                                        <em>
                                                            {vehicle.Combustivel} - {vehicle.SiglaCombustivel}
                                                        </em>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="save-favorite">
                                                <p onClick={this.setFavorite.bind(this, vehicle)} className="content-icon">salvar</p>
                                            </div>
                                        </section>
                                    }
                                </div>
                            </div>
                        </aside>
                    </div>
                }
            </div>
        );
    }
}
