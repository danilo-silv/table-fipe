const router = require('express').Router();
const ModelYearSchema = require('../models/ModelYearSchema');
const Fipe = require('../service/fipe');

router.post('/', async (req, res) => {
    try {
        const { modelo, codigoMarca, page, isMobile, codigoVeiculo } = req.body;
        let filterData = '';
        let options = {
            page: (page <= 0) ? 1 : page,
            limit: (isMobile == true) ? 4 : 10
        }

        let responseModel = await getModelBrand(options, codigoMarca, modelo, codigoVeiculo);
        console.log(`CHAMADA: ${responseModel}`);
        if (responseModel.docs.length == 0) {
            console.log('FIPE');
            const fipe = new Fipe(`${modelo}/marcas/${codigoMarca}/modelos/${codigoVeiculo}/anos`);
            console.log(fipe._url);
            let getModel = await fipe.getDataApiAsync();
            for (const item of getModel) {
                await ModelYearSchema.create({
                    name: item.nome,
                    code: item.codigo,
                    type: modelo,
                    codeBrand: codigoMarca,
                    vehicleCode: codigoVeiculo
                })
            }

            options.page = 1;
            responseModel = await getModelBrand(options, codigoMarca, modelo, codigoVeiculo);
            filterData = await filterObje(responseModel.docs);
            responseModel.docs = filterData;

            return res.json(responseModel);
        }
        console.log("BANCO");
        responseModel.docs = await filterObje(responseModel.docs);
        return res.json(responseModel);
    } catch (error) {

    }
});



async function filterObje(obj) {
    let data = [];
    obj.forEach(item => {
        data.push({
            nome: item.name,
            codigo: item.code,
            modelo: item.type,
            codigoMarca: item.codeBrand,
            codigoVeiculo: item.vehicleCode
        })
    });
    console.log(data);
    return data;
}

async function getModelBrand(options, codigoMarca, modelo, codigoVeiculo) {
    const response = await ModelYearSchema.paginate({ codeBrand: codigoMarca, type: modelo, vehicleCode: codigoVeiculo }, options, ((err, result) => {
        if (err) console.log(err);
        return result;
    }));
    return response;
};


module.exports = router;