const routes = require('express').Router();
const Fipe = require('./service/fipe');
const RobotImage = require('./robot/index');

const BrandSchema = require('./models/BrandSchema');

routes.post('/brand', async (req, res) => {

    try {

        const BrandSchema = await PostSchema.find();
        // console.log(BrandSchema);
        // if (getDocument != undefined) {
        //     console.log('entrou');
        //     const fipe = new Fipe(req.body.url);
        //     let responseBrand = await fipe.getBrandAsync();
        //     const robotImage = new RobotImage(responseBrand);
        //     await robotImage.seachGoogleImage();
        //     console.dir(robotImage._objetModel, { depth: null });
        //     const post = '';

        //     for (const item in object) {
        //         post = await PostSchema.create({
        //             name: item.normalize,
        //             codigo: item.codigo,
        //             imageUrl: item.image[0]
        //         })
        //     }
        //     return res.json({ body: post });
        // }

        return res.json({ body: "Hello World" });

    } catch (error) {
        return res.status(400).send({ erro: error });
    }
});



// db.customers.find().pretty()
// db.NomeColeção.count()
// db.NomeColeção.drop()

module.exports = routes;