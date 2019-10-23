const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

function timeExpire() {
    var currentDate = new Date();
    var expirationDate = new Date();
    expirationDate.setMinutes(currentDate.getMinutes() + 2);
    return expirationDate;
}

const ModelBrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    codeBrand: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    createDat: {
        type: Date,
        expires: timeExpire(),
        default: Date.now
    },
});

ModelBrandSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ModelBrandSchema', ModelBrandSchema);