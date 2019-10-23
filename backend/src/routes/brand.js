const router = require('express').Router();
const BrandSchema = require('../models/BrandSchema');
const Fipe = require('../service/fipe');
router.post('/', async (req, res) => {
    let response = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        }
    };

    try {
        const { page, modelo, isMobile } = req.body;
        let filterData = '';
        let options = {
            page: (page <= 0) ? 1 : page,
            limit: (isMobile == true) ? 9 : 33
        }
        let responseBrand = await getBrand(options, modelo);
        console.log(`CHAMADA: ${responseBrand}`);
        if (responseBrand.docs.length == 0) {
            console.log('FIPE');
            const fipe = new Fipe(`${modelo}/marcas`);
            console.log(fipe._url);
            let getBrandApi = await fipe.getDataApiAsync();

            for (const item of getBrandApi) {
                await BrandSchema.create({
                    name: item.nome,
                    code: item.codigo,
                    type: modelo
                })
            }
            options.page = 1;
            responseBrand = await getBrand(options, modelo);
            filterData = await filterObje(responseBrand.docs);
            responseBrand.docs = filterData;

            response.brand = responseBrand;
            return res.json(response);
        }
        console.log("BANCO");

        responseBrand.docs = await filterObje(responseBrand.docs);
        response.brand = responseBrand;
        return res.json(response);

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
            modelo: item.type
        })
    });
    console.log(data);
    return data;
}

async function getBrand(options, modelo) {
    const response = await BrandSchema.paginate({ type: modelo }, options, ((err, result) => {
        if (err) console.log(err);
        return result;
    }));
    return response;
};

module.exports = router;