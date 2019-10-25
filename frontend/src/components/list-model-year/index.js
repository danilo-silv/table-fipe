import React, { Component } from "react";
import { isMobile } from 'react-device-detect';
import "./style.css";
import { trackPromise } from 'react-promise-tracker';
import api from "../../service/index";
import LoadingIndicator from "../loading/index";

export default class ListModelYear extends Component {
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
        // console.log(this.props);
        // this.setModel = this.setModel.bind(this);
        // this.loadModels = this.loadModels.bind(this);
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            console.log(nextProps);
            // let { codeBrand, brand, model } = nextProps.codeBrand.inf;
            // if (codeBrand !== "" && brand !== "") {
            //     console.log('não é vazio')
            //     this.loadModels(1, model, codeBrand);
            //     this.setState({ brand: Object.keys(brand).join() })
            // }

        }

    };
    componentDidMount() {
        const { data } = this.props;
        // console.log(data);
        // this.setState({ modelo })
        // this.loadBrands(1, modelo);
    };
    // loadModels = async (page = 1, model, codeBrand) => {
    //     this.setState({ loading: true })
    //     var headersConfig = {
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     };

    //     const response = await trackPromise(api.post(`/list-model-brand-fipe/`, { "codigoMarca": codeBrand, "modelo": model, "page": page, "isMobile": (isMobile === true) ? true : false }, headersConfig));
    //     console.log(response);
    //     const { docs, ...modelsInfo } = response.data;
    //     this.setState({ models: docs, modelsInfo, page, loading: false });
    // };
    render() {
        return (
            <div className="content-year">
                <aside className="sidebar">
                    <div className="sidebar-model">
                        <div className="sidebar-widget widget_categories">
                            <div className="sidebar-title">
                                <p className="title">modelo Ano</p>
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

        )
    }
};