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
        if (this.props.data.year !== nextProps.data.year) {
            let { codeBrand, vehicle, modelo, year } = nextProps.data;
            if (year !== "") {
                this.loadModelsYear(modelo, codeBrand, vehicle.codigo, year);
            }
        }
    };

    async loadModelsYear(model, codeBrand, codigo, year) {
        this.setState({ loading: true });
        await trackPromise(api.get(`/${model}/marcas/${codeBrand}/modelos/${codigo}/anos/${year}`))
            .then((response) => {
                const { data } = response;
                this.setState({ vehicle: data, loading: false });
            }).catch(() => {
                window.alert(`tivemos um problema ao consultar modelos de ${model}\nPor favor tente mais tarde!!`);
                this.props.location('/');
            })

    };

    setFavorite(vehicle) {
        let dateLocal = localStorage['ArrayFavorite'];
        if (dateLocal !== undefined) {
            let newVehicle = JSON.parse(dateLocal);
            newVehicle.push(vehicle);
            localStorage['ArrayFavorite'] = JSON.stringify(newVehicle);
        } else {
            let ArrayFavorite = [vehicle];
            localStorage['ArrayFavorite'] = JSON.stringify(ArrayFavorite);
        }
        window.alert(`Veiculo ( ${vehicle.Modelo} ) Salvo na lista de favoritos!!\nAcesse a Lista de veículos favoritos clicando em favoritos no menu.`);

    }

    render() {
        const { vehicle, loading } = this.state;
        return (
            <div className="content-year">
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
                                                <p onClick={this.setFavorite.bind(this, vehicle)} className="content-icon favorite">Salvar na lista de favoritos</p>
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
