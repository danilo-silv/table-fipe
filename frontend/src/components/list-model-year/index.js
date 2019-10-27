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
            currentPage: 1,
            modelsParPage: (isMobile === true) ? 8 : 16,
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
            let { codeBrand, vehicle, modelo } = nextProps.data;
            if (vehicle.codigo !== undefined) {
                this.loadModelsYear(modelo, codeBrand, vehicle.codigo);
                this.setState({ modelSelected: vehicle.nome })
            }

        }

    };
    // componentDidMount() {
    //     console.log(data);
    //     this.setState({ modelo })
    //     this.loadBrands(1, modelo);
    // };

    loadModelsYear = async (model, codeBrand, codigo) => {
        this.setState({ loading: true });
        const response = await trackPromise(api.get(`/${model}/marcas/${codeBrand}/modelos/${codigo}/anos`));
        console.log(response);
        const { modelos } = response.data;
        this.setState({ models: modelos, loading: false });
    };

    render() {
        const { modelSelected } = this.state;
        return (
            <div className="content-year">
                {modelSelected == "" ? null
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
                                    <div className="sidebar-content">
                                        <div className="models-year">
                                            <p>Selecione uma marca</p>
                                        </div>
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