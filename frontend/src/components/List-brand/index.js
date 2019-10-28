import React, { Component } from "react";
import { isMobile } from 'react-device-detect';
import ListModel from "../List-model/index";
import LoadingIndicator from "../Loading/index";
import ListModelYear from "../List-model-year/index";
import Pagination from "../Pagination/index";
import Vehicle from "../Vehicle/index";
import api from "../../service/index";
import "./style.css";
export default class TableFipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            currentPage: 1,
            brandsParPage: (isMobile === true) ? 9 : 33,
            brandSelected: '',
            active: {},
            modelo: '',
            loading: false,
            modelSelected: "",
            yearSelected: "",


        }

        this.setBrand = this.setBrand.bind(this);
        this.loadBrands = this.loadBrands.bind(this);
    };


    componentDidMount() {
        const { modelo } = this.props.modelo;
        this.setState({ modelo })
        this.loadBrands(modelo);
    };


    async loadBrands(modelo) {
        this.setState({ loading: true });
        await api.get(`/${modelo}/marcas`)
            .then((response) => {
                const { data } = response;
                this.setState({ brands: data, loading: false });
            }).catch((erro) => {
                let resp = window.confirm('tivemos um problema ao consultar marcas do veiculo\n Deseja voltar a tela inicial?');
                if (resp) {
                    this.props.navigation.navigate("/");
                }
            })

    };


    setBrand(brandSelected, name, event) {
        let selected = this.state.active;
        selected = {};
        let selectedCircles = selected[name] === "active-brd" ? "" : "active-brd";
        selected[name] = selectedCircles;
        this.setState({ brandSelected, active: selected });
    };


    modelYear(modelSelected) {
        this.setState({ modelSelected });
    };
    yearSelected(yearSelected) {
        this.setState({ yearSelected });
    };
    paginate(pageNumber) {
        this.setState({ currentPage: pageNumber });
    }


    render() {
        const { brands, currentPage, brandsParPage, loading, brandSelected, modelo, active, modelSelected, yearSelected } = this.state;
        const indexOfLastBrand = currentPage * brandsParPage;
        const indexOfFirstPost = indexOfLastBrand - brandsParPage;
        const currentBrands = brands.slice(indexOfFirstPost, indexOfLastBrand);
        return (
            <div className="main-category">
                <div className="filter-brand">
                    <aside className="sidebar-brand">
                        <div className="sidebar-wrapper">
                            <div className="sidebar-widget widget_categories">
                                <div className="sidebar-title">
                                    <p className="title">Marcas</p>
                                </div>
                                {loading ? <LoadingIndicator /> :
                                    <div className="sidebar-content">

                                        <section className="children">

                                            <div className="content-brands">
                                                {currentBrands.map(brand => (
                                                    <div key={brand.codigo} onClick={this.setBrand.bind(this, brand.codigo, brand.nome)}
                                                        className={(this.state.active[brand.nome] !== undefined) ? `brand-${brand.nome} item ` + this.state.active[brand.nome] : `brand-${brand.nome} item `}>
                                                        <span>{brand.nome}</span>
                                                    </div>
                                                ))}

                                            </div>
                                        </section>
                                        <Pagination
                                            itemPerPage={brandsParPage}
                                            totalItens={brands.length}
                                            paginate={this.paginate.bind(this)}
                                            currentPage={currentPage}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="model-brand" >
                    <ListModel
                        codeBrand={brandSelected}
                        model={modelo}
                        brand={active}
                        modelYear={this.modelYear.bind(this)}
                    />
                </div>
                <div className="model-year">
                    <ListModelYear data={{ "vehicle": modelSelected, "modelo": modelo, "codeBrand": brandSelected }}
                        yearSelected={this.yearSelected.bind(this)} />
                </div>
                <div className="vehicle">
                    <Vehicle data={{ "vehicle": modelSelected, "modelo": modelo, "codeBrand": brandSelected, "year": yearSelected }} />
                </div>
            </div>
        )
    }
};