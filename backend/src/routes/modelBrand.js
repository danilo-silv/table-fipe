const router = require('express').Router();
const ModelBrandSchema = require('../models/ModelBrandSchema');
const Fipe = require('../service/fipe');

router.post('/', async (req, res) => {
    try {
        const { modelo, codigoMarca, page, isMobile } = req.body;
        let filterData = '';
        let options = {
            page: (page <= 0) ? 1 : page,
            limit: (isMobile == true) ? 8 : 36
        }

        console.log(options);
        let responseModel = await getModelBrand(options, codigoMarca, modelo);
        console.log(`CHAMADA: ${responseModel}`);
        if (responseModel.docs.length == 0) {
            console.log('FIPE');
            const fipe = new Fipe(`${modelo}/marcas/${codigoMarca}/modelos`);
            console.log(fipe._url);
            let getModel = await fipe.getDataApiAsync();

            for (const item of getModel.modelos) {
                await ModelBrandSchema.create({
                    name: item.nome,
                    code: item.codigo,
                    type: modelo,
                    codeBrand: codigoMarca
                })
            }
            options.page = 1;
            console.log(options);
            responseModel = await getModelBrand(options, codigoMarca, modelo);
            filterData = await filterObje(responseModel.docs);
            responseModel.docs = filterData;

            return res.json(responseModel);
        }
        console.log('BANCO');
        responseModel.docs = await filterObje(responseModel.docs);

        return res.json(responseModel);

    } catch (error) {
        console.log(error);
        // return res.json({ Erro: "Bad request in server", Status: 400 });
    }
});


router.post('/favorite-model', async (req, res) => {
    try {
        const { modelo, codigoMarca, codigoVeiculo, favorito, page, isMobile } = req.body;

        let options = {
            page: (page <= 0) ? 1 : page,
            limit: (isMobile == true) ? 4 : 10
        }

        await ModelBrandSchema.updateOne({ type: modelo, codeBrand: codigoMarca, code: codigoVeiculo },
            { $set: { favorite: favorito } },
            { multi: true, new: true }, ((err, result) => {
                if (err) console.log(err);
                return result;
            }));


        let responseModel = await getModelBrand(options, codigoMarca, modelo);
        filterData = await filterObje(responseModel.docs);
        responseModel.docs = filterData;

        return res.json(responseModel);

    } catch (error) {
        console.log(error);
        // return res.json({ Erro: "Bad request in server", Status: 400 });
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
            favorito: item.favorite
        })
    });
    console.log(data);
    return data;
}

async function getModelBrand(options, codigoMarca, modelo) {
    const response = await ModelBrandSchema.paginate({ codeBrand: codigoMarca, type: modelo }, options, ((err, result) => {
        if (err) console.log(err);
        return result;
    }));
    return response;
};


module.exports = router;