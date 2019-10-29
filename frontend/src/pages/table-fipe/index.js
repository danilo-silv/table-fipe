import React, { Component } from "react";
import Header from "../../components/Header";
import BannerTableFipe from "../../components/BannerTableFipe";
import ListBrand from "../../components/List-brand";
import "./style.css";

export default class TableFipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelo: this.props.location.state
        }
        this.model = this.model.bind(this);
    }

    model(modelo) {
        this.setState({ modelo });
    }
    render() {
        const { modelo } = this.state;
        console.log(modelo);
        return (
            <main className="main" >
                <Header history={this.props.history}
                    model={this.model.bind(this)} />
                <div className="table-fipe" >
                    <BannerTableFipe />
                    <ListBrand modelo={modelo}
                        history={this.props.history} />
                </div>
            </main>

        )
    }
};