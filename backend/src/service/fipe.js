'use strict'
require("dotenv").config();
const axios = require('axios');
const URL = process.env.BASE_URL_FIPE;

class Fipe {
    constructor(_model) {
        this._url = `${URL}${_model}`
    }
    async getDataApiAsync() {
        const response = await axios.get(this._url);
        return response.data;
    }
}

module.exports = Fipe;