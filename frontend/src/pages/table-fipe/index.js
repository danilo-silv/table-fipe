import React, { Component } from "react";
import Header from "../../components/Header";
import BannerTableFipe from "../../components/BannerTableFipe";
import ListBrand from "../../components/List-brand";
import "./style.css";

export default class TableFipe extends Component {
    state = {
        modelo: this.props.location.state
    }

    render() {
        const { modelo } = this.state;
        return (
            <main className="main" >
                <Header />
                <div className="table-fipe" >
                    <BannerTableFipe />
                    <ListBrand modelo={modelo}
                        history={this.props.history} />
                </div>
            </main>

        )
    }
};