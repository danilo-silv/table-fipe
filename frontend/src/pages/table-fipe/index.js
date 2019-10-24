import React, { Component } from "react";
import BannerTableFipe from "../../components/bannerTableFipe";
import FilterBrand from "../../components/filter-brand"
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
                    <FilterBrand modelo={modelo} />
                </main>
            </div>
        )
    }
};