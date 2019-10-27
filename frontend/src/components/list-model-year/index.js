import React, { Component } from "react";
import { isMobile } from 'react-device-detect';
import "./style.css";
import { trackPromise } from 'react-promise-tracker';
import api from "../../service/index";
import LoadingIndicator from "../Loading/index";

export default class ListModelYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            modelInfo: {},
            page: 1,
            modelSelected: '',
            active: {},
            loading: false,
        }
        // this.setModel = this.setModel.bind(this);
        // this.loadModels = this.loadModels.bind(this);
        this.loadModelsYear = this.loadModelsYear.bind(this);
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            console.log(nextProps);
            let { codigoMarca, codigo, nome, modelo } = nextProps.data;
            if (codigoMarca !== "") {
                console.log('não é vazio')
                this.loadModelsYear(1, modelo, codigoMarca, codigo);
                this.setState({ modelSelected: nome })
            }

        }

    };
    componentDidMount() {
        // console.log(data);
        // this.setState({ modelo })
        // this.loadBrands(1, modelo);
    };
    loadModelsYear = async (page = 1, model, codeBrand, codeVehicle) => {
        this.setState({ loading: true })
        var headersConfig = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const response = await trackPromise(api.post(`/list-model-year-fipe/`, { "codigoMarca": codeBrand, "modelo": model, "codigoVeiculo": codeVehicle, "page": page, "isMobile": (isMobile === true) ? true : false }, headersConfig));
        console.log(response);
        const { docs, ...modelsInfo } = response.data;
        this.setState({ models: docs, modelsInfo, page, loading: false });
    };
    render() {
        const { modelSelected } = this.state;
        return (
            <div className="content-year">
                {/* {this.modelSelected != ""
                    ? (
                        <div className="title-category">
                            <h1>Anos do modelo</h1>
                        </div>
                        <aside className="sidebar">
                            <div className="sidebar-model">
                                <div className="sidebar-widget widget_categories">
                                    <div className="sidebar-title">
                                        <p className="title">{modelSelected}</p>
                                    </div>
                                    <div className="sidebar-content">
                                        <div className="models-year">
                                            <p>Selecione uma marca</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside> 
                    )

                    :
                    <p>vazio</p>
                } */}

            </div>

        )
    }
};