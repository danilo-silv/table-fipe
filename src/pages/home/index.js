import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default class Home extends Component {
    render() {
        return (

            <section id="header">
                <header>
                    <h1>tabela fipe</h1>
                    <div className="header-text">
                        <h3>Consulte o preço de carros, motos e caminhões.</h3>
                        <p>Escholha um modelo abaixo para fazer uma pesquisa.</p>
                    </div>
                </header>
                <footer>
                    <ul>
                        <li className="icon-car"><Link to={{ pathname: `/consulta-tabela-fipe`, state: { modelo: 'carros' } }}><img src={require('../..//fonts/car2_83929.svg')} alt="icon-car" title="Carros" /></Link></li>
                        <li className="icon-motorcycle"><Link to={{ pathname: `/consulta-tabela-fipe`, state: { modelo: 'motos' } }}><img src={require('../..//fonts/motorcycle.svg')} alt="icon-motorcycle" title="Motocicleta" /></Link></li>
                        <li className="icon-truck"><Link to={{ pathname: `/consulta-tabela-fipe`, state: { modelo: 'caminhoes' } }}><img src={require('../..//fonts/truck.svg')} alt="icon-truck" title="Caminhões" /></Link></li>
                    </ul>
                </footer>
            </section >

        );
    };
};
