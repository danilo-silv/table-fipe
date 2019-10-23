const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

function timeExpire() {
    var currentDate = new Date();
    var expirationDate = new Date();
    expirationDate.setMinutes(currentDate.getMinutes() + 2);
    return expirationDate;
}

const ModelYearSchema = new mongoose.Schema({
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
    vehicleCode: {
        type: Number,
        required: true
    },
    createDat: {
        type: Date,
        expires: timeExpire(),
        default: Date.now
    },
});

ModelYearSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ModelYearSchema', ModelYearSchema);