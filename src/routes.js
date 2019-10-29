import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import TableFipe from "./pages/table-fipe";
import VehicleFavorite from "./pages/vehicle-favorite";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/consulta-tabela-fipe" component={TableFipe} />
            <Route path="/favoritos" component={VehicleFavorite} />
        </Switch>
    </BrowserRouter>
);


export default Routes; 