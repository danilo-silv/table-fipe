const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
function timeExpire() {
    var currentDate = new Date();
    var expirationDate = new Date();
    expirationDate.setMinutes(currentDate.getMinutes() + 2);
    return expirationDate;
}

const BrandSchema = new mongoose.Schema({
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
    createDat: {
        type: Date,
        expires: timeExpire(),
        default: Date.now
    },
});

BrandSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('BrandSchema', BrandSchema);