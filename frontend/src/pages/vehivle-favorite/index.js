import React, { Component } from 'react';
import "./style.css";

export default class VehicleFavorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: []

        };
    }
    componentDidMount() {
        let vehicle = localStorage['ArrayFavorite'];
        this.setState({ vehicle: JSON.parse(vehicle) });
        console.log(this.props);
    };
    deleteFavorite(vehicleDelete) {
        let dateLocal = localStorage['ArrayFavorite'];
        let vehicleFavorite = JSON.parse(dateLocal);
        let newVehicle = vehicleFavorite.filter((vehicle) => {
            return vehicle.Modelo !== vehicleDelete.Modelo;
        });
        localStorage['ArrayFavorite'] = JSON.stringify(newVehicle);
        this.setState({ vehicle: newVehicle });
    };
    location() {
        console.log(this.props);
        this.props.history.push('/');
    }

    render() {
        const { vehicle } = this.state;
        console.log(vehicle)
        return (
            <main className="main-fovorite">
                <div className="vehicle-favorite">
                    <div className="content-year">
                        {vehicle.length === 0
                            ? <div className="title-category">
                                <h1>Nenhum veículo encontrado na lista de favoritos</h1>
                            </div>
                            :
                            <div className="model">
                                <div className="title-category">
                                    <h1>Lista de veículos favoritos</h1>
                                </div>
                                {vehicle.map(vehicle => (
                                    <aside className="sidebar" key={vehicle.AnoModelo}>
                                        <div className="sidebar-model">
                                            <div className="sidebar-widget widget_categories">
                                                <div className="sidebar-title">
                                                    <p className="title">{vehicle.Modelo}</p>
                                                </div>
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

                                                    <div className="delete-favorite">
                                                        <p onClick={this.deleteFavorite.bind(this, vehicle)} className="content-icon">Excluir da Lista</p>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </aside>
                                ))}
                            </div>
                        }
                        <div className="content-button">
                            <button onClick={this.location.bind(this)}>Consultar Tabela Fipe</button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
