import React, { Component } from "react";
import BannerTableFipe from "../../components/BannerTableFipe";
import ListBrand from "../../components/List-brand"
import "./style.css";

export default class TableFipe extends Component {
    state = {
        modelo: this.props.location.state
    }

    render() {
        const { modelo } = this.state;
        return (
            <div className="table-fipe" >
                <main className="main" >
                    <BannerTableFipe />
                    <ListBrand modelo={modelo} />
                </main>
            </div>
        )
    }
};