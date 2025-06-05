const mongoose = require('mongoose');

const excelRecordSchema = new mongoose.Schema({
    data:{
        type:Array,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    }
});
module.esports=mongoose.model('ExcelRecord',excelRecordSchema);