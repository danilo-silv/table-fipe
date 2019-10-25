import React, { Component } from "react";
import { isMobile } from 'react-device-detect';
import "./style.css";
import { trackPromise } from 'react-promise-tracker';
import api from "../../service/index";
import LoadingIndicator from "../loading/index";
import { Link, animateScroll as scroll } from "react-scroll";
export default class ListModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            modelInfo: {},
            page: 1,
            codeModelSelected: '',
            brand: '',
            active: {},
            loading: false,
        }
        this.setModel = this.setModel.bind(this);
        this.loadModels = this.loadModels.bind(this);
    }
    scrollToTop = () => {
        scroll.scrollToTop();
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.codeBrand.inf !== nextProps.codeBrand.inf) {
            let { codeBrand, brand, model } = nextProps.codeBrand.inf;
            if (codeBrand !== "" && brand !== "") {
                console.log('não é vazio')
                this.loadModels(1, model, codeBrand);
                this.setState({ brand: Object.keys(brand).join() })
            }

        }

    };

    loadModels = async (page = 1, model, codeBrand) => {
        this.setState({ loading: true })
        var headersConfig = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const response = await trackPromise(api.post(`/list-model-brand-fipe/`, { "codigoMarca": codeBrand, "modelo": model, "page": page, "isMobile": (isMobile === true) ? true : false }, headersConfig));
        console.log(response);
        const { docs, ...modelsInfo } = response.data;
        this.setState({ models: docs, modelsInfo, page, loading: false });
    };

    setModel(codeModelSelected, name, event) {
        let selected = this.state.active;
        selected = {};
        let selectedCircles = selected[name] === "active-brd" ? "" : "active-brd";
        selected[name] = selectedCircles;
        this.setState({ codeModelSelected, active: selected });
    };

    render() {
        const { models, page, modelInfo, brand, loading } = this.state;
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
                                                    {models.map(model => (
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
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        )
    };
};