import React, { Component } from "react";
import LoadingIndicator from "../Loading/index";
import Pagination from "../Pagination/index";
import { Link, animateScroll as scroll } from "react-scroll";
import { isMobile } from 'react-device-detect';
import { trackPromise } from 'react-promise-tracker';
import api from "../../service/index";
import "./style.css";
export default class ListModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            currentPage: 1,
            modelsParPage: (isMobile === true) ? 8 : 16,
            codeModelSelected: '',
            brand: '',
            active: {},
            loading: false,
        }
        this.setModel = this.setModel.bind(this);
        this.loadModels = this.loadModels.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.codeBrand !== nextProps.codeBrand) {
            let { codeBrand, brand, model } = nextProps;
            if (codeBrand !== "" && brand !== "") {
                console.log('não é vazio')
                this.loadModels(model, codeBrand);
                this.setState({ brand: Object.keys(brand).join() })
            }

        }

    };

    loadModels = async (model, codeBrand) => {
        this.setState({ loading: true });
        const response = await trackPromise(api.get(`/${model}/marcas/${codeBrand}/modelos`));
        const { modelos } = response.data;
        this.setState({ models: modelos, loading: false });
    };

    setModel(codeModelSelected, name, event) {
        let selected = this.state.active;
        selected = {};
        let selectedCircles = selected[name] === "active-brd" ? "" : "active-brd";
        selected[name] = selectedCircles;
        this.setState({ codeModelSelected, active: selected });
    };

    scrollToTop = () => {
        scroll.scrollToTop();
    };

    paginate(pageNumber) {
        this.setState({ currentPage: pageNumber });
    };

    render() {
        const { models, brand, currentPage, modelsParPage, loading } = this.state;
        const indexOfLastBrand = currentPage * modelsParPage;
        const indexOfFirstPost = indexOfLastBrand - modelsParPage;
        const currentModels = models.slice(indexOfFirstPost, indexOfLastBrand);
        return (

            <div className="main-category">
                <aside className="sidebar">
                    <div className="sidebar-model">
                        <div className="sidebar-widget widget_categories">
                            <div className="sidebar-title">
                                <p className="title">{brand}</p>
                            </div>
                            <div className="sidebar-content">
                                <div className="models">
                                    {this.state.brand === '' ?
                                        <p className="check">Selecione uma marca</p>
                                        :
                                        <section className="children models">
                                            {loading ? <LoadingIndicator /> :
                                                <div className="content-models">
                                                    {currentModels.map(model => (
                                                        <div key={model.codigo} onClick={this.setModel.bind(this, model.codigo, model.nome)}
                                                            className={(this.state.active[model.nome] !== undefined) ? `model-${model.nome} item ` + this.state.active[model.nome] : `model-${model.nome} item`}>
                                                            <div className="description">
                                                                <h2 className="title">
                                                                    <strong>Nome - </strong> {model.nome}<br /> <strong>Marca - </strong>{brand}
                                                                </h2>
                                                            </div>
                                                            <p className="button-scroll">
                                                                <Link
                                                                    activeClass="active"
                                                                    to="year"
                                                                    spy={true}
                                                                    smooth={true}
                                                                    offset={-70}
                                                                    duration={500}
                                                                >
                                                                    <button onClick={() => { this.props.modelYear(model) }}
                                                                    >Veja anos do modelo</button>

                                                                </Link>
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            }
                                        </section>
                                    }
                                </div>
                                <Pagination
                                    itemPerPage={modelsParPage}
                                    totalItens={models.length}
                                    paginate={this.paginate.bind(this)}
                                />
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        )
    };
};