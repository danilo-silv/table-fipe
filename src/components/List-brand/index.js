import React, { Component } from "react";
import { isMobile } from 'react-device-detect';
import { trackPromise } from 'react-promise-tracker';
import { Link, animateScroll as scroll } from "react-scroll";
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


    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('veio')
        if (this.props.modelo !== nextProps.modelo) {
            let { modelo } = nextProps.modelo;
            this.setState({ modelo })
            this.loadBrands(modelo);
        }

    };

    componentDidMount() {
        let { modelo } = this.props.modelo;
        this.setState({ modelo });
        this.loadBrands(modelo);
    };
    async loadBrands(modelo) {
        this.setState({ loading: true });
        await trackPromise(api.get(`/${modelo}/marcas`))
            .then((response) => {
                const { data } = response;
                console.log(data);
                this.setState({ brands: data, loading: false, currentPage: 1 });
            }).catch(() => {
                window.alert(`tivemos um problema ao consultar marcas de ${modelo}\nPor favor tente mais tarde!!`);
                this.location('/');
            })
    };

    location(local) {
        this.props.history.push(local);
    }

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
    };

    scrollToTop = () => {
        scroll.scrollToTop();
    };


    render() {
        const { brands, currentPage, brandsParPage, loading, brandSelected, modelo, active, modelSelected, yearSelected } = this.state;
        const indexOfLastBrand = currentPage * brandsParPage;
        const indexOfFirstPost = indexOfLastBrand - brandsParPage;
        const currentBrands = brands.slice(indexOfFirstPost, indexOfLastBrand);
        return (
            <div className="main-category" id="brands">
                <div className="filter-brand">
                    <aside className="sidebar-brand">
                        <div className="sidebar-wrapper">
                            <div className="sidebar-widget widget_categories">
                                <div className="sidebar-title">
                                    <p className="title">Marcas - {modelo}</p>
                                </div>
                                {loading ? <LoadingIndicator /> :
                                    <div className="sidebar-content">

                                        <section className="children">

                                            <div className="content-brands">
                                                {currentBrands.map(brand => (
                                                    <Link
                                                        activeClass="active"
                                                        to="modelo"
                                                        spy={true}
                                                        smooth={true}
                                                        offset={-70}
                                                        duration={800}
                                                        key={brand.codigo} >
                                                        <div onClick={this.setBrand.bind(this, brand.codigo, brand.nome)}
                                                            className={(this.state.active[brand.nome] !== undefined) ? `brand-${brand.nome} item ` + this.state.active[brand.nome] : `brand-${brand.nome} item `}>
                                                            <span>{brand.nome}</span>
                                                        </div>
                                                    </Link>
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
                        location={this.location.bind(this)}
                    />
                </div>
                {brandSelected !== "" ?
                    <div className="col-models">
                        <div className="model-year">
                            <ListModelYear data={{ "vehicle": modelSelected, "modelo": modelo, "codeBrand": brandSelected }}
                                yearSelected={this.yearSelected.bind(this)} location={this.location.bind(this)} />
                        </div>
                        <div className="vehicle" id="vehicle">
                            <Vehicle data={{ "vehicle": modelSelected, "modelo": modelo, "codeBrand": brandSelected, "year": yearSelected }}
                                location={this.location.bind(this)} />
                        </div>
                    </div>


                    : null
                }
            </div>
        )
    }
};