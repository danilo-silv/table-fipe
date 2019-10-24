import React, { Component } from "react";
import { isMobile } from 'react-device-detect';
import ListModel from "../list-model/index";
import LoadingIndicator from "../loading/index";
import api from "../../service/index";
import "./style.css";
export default class TableFipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            brandsInfo: {},
            page: 1,
            codeBrandSelected: '',
            active: {},
            modelo: '',
            loading: false,
        }

        this.setBrand = this.setBrand.bind(this);
        this.loadBrands = this.loadBrands.bind(this);
    }

    componentDidMount() {
        const { modelo } = this.props.modelo;
        this.setState({ modelo })
        this.loadBrands(1, modelo);
    };


    loadBrands = async (page = 1, modelo) => {
        this.setState({ loading: true })
        var headersConfig = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const response = await api.post(`/list-brand-fipe/`, { "modelo": modelo, "page": page, "isMobile": (isMobile === true) ? true : false }, headersConfig);
        const { docs, ...brandsInfo } = response.data.brand;
        this.setState({ brands: docs, brandsInfo, page, loading: false });
    };

    setBrand(codeBrandSelected, name, event) {
        let selected = this.state.active;
        selected = {};
        let selectedCircles = selected[name] === "active-brd" ? "" : "active-brd";
        selected[name] = selectedCircles;
        this.setState({ codeBrandSelected, active: selected });
    };

    render() {
        const { brands, page, brandsInfo, loading } = this.state;
        return (
            <div className="main-category">
                <div className="filter-brand">
                    <aside className="sidebar-brand">
                        <div className="sidebar-wrapper">
                            <div className="sidebar-widget widget_categories">
                                <div className="sidebar-title">
                                    <p className="title">Marcas</p>
                                </div>
                                <div className="sidebar-content">
                                    <section className="children">
                                        {loading ? <LoadingIndicator />:
                                            <div className="content-brands">
                                                {brands.map(brand => (
                                                    <div key={brand.codigo} onClick={this.setBrand.bind(this, brand.codigo, brand.nome)}
                                                        className={(this.state.active[brand.nome] !== undefined) ? `brand-${brand.nome} item ` + this.state.active[brand.nome] : `brand-${brand.nome} item `}>
                                                        <span>{brand.nome}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </section>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="model-brand" >
                    <ListModel codeBrand={{ inf: { "model": this.state.modelo, "codeBrand": this.state.codeBrandSelected, "brand": this.state.active } }} />
                </div>
            </div>
        )
    }
};