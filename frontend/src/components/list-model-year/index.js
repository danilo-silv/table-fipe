import React, { Component } from "react";
import LoadingIndicator from "../Loading/index";
import Pagination from "../Pagination/index";
import { Link, animateScroll as scroll } from "react-scroll";
import { isMobile } from 'react-device-detect';
import { trackPromise } from 'react-promise-tracker';
import api from "../../service/index";
import "./style.css";

export default class ListModelYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            currentPage: 1,
            modelsParPage: (isMobile === true) ? 8 : 16,
            modelSelected: '',
            active: {},
            loading: false,
        }
        this.loadModelsYear = this.loadModelsYear.bind(this);
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.data.vehicle !== nextProps.data.vehicle) {
            let { codeBrand, vehicle, modelo } = nextProps.data;
            if (vehicle.codigo !== undefined) {
                this.loadModelsYear(modelo, codeBrand, vehicle.codigo);
                this.setState({ modelSelected: vehicle.nome })
            }

        }

    };

    loadModelsYear = async (model, codeBrand, codigo) => {
        this.setState({ loading: true });
        const response = await trackPromise(api.get(`/${model}/marcas/${codeBrand}/modelos/${codigo}/anos`));
        const { data } = response;
        this.setState({ models: data, loading: false });
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
        const { models, currentPage, modelsParPage, loading, modelSelected } = this.state;
        const indexOfLastBrand = currentPage * modelsParPage;
        const indexOfFirstPost = indexOfLastBrand - modelsParPage;
        const currentModels = models.slice(indexOfFirstPost, indexOfLastBrand);
        console.log('executou');
        return (
            <div className="content-year" id="year">
                {modelSelected === "" ? null
                    :
                    <div className="model-years">
                        <div className="title-category">
                            <h1>Anos do modelo</h1>
                        </div>
                        <aside className="sidebar">
                            <div className="sidebar-model">
                                <div className="sidebar-widget widget_categories">
                                    <div className="sidebar-title">
                                        <p className="title">{modelSelected}</p>
                                    </div>
                                    <div className="models-year">
                                        <section className="children">
                                            {loading ? <LoadingIndicator /> :
                                                <div className="sidebar-content">
                                                    <section className="children">
                                                        <div className="content-brands">
                                                            {currentModels.map(model => (
                                                                <div key={model.codigo} onClick={this.setModel.bind(this, model.codigo, model.nome)}
                                                                    className={(this.state.active[model.nome] !== undefined) ? `model-${model.nome} item ` + this.state.active[model.nome] : `model-${model.nome} item `}>
                                                                    <strong>Ano</strong><br />
                                                                    <span>{model.nome}</span><br />
                                                                    <p className="button-scroll">
                                                                        <Link
                                                                            activeClass="active"
                                                                            to="vehicle"
                                                                            spy={true}
                                                                            smooth={true}
                                                                            offset={-70}
                                                                            duration={1000}
                                                                        >
                                                                            <button className="button-model"
                                                                                onClick={() => { this.props.yearSelected(model.codigo) }}
                                                                            >
                                                                                Ver modelo
                                                                                </button>

                                                                        </Link>
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                    <Pagination
                                                        itemPerPage={modelsParPage}
                                                        totalItens={models.length}
                                                        paginate={this.paginate.bind(this)}
                                                        currentPage={currentPage}
                                                    />
                                                </div>
                                            }
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                }
            </div>
        )
    }
};