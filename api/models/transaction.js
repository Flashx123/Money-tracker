import { model, Schema } from "mongoose";
import { type } from "os";

const transSchema = new Schema({
    
    name: {type:String, required:true},
    description : {type : String,required: true},
    datetime : {type : Date , required : true}
})


export const TransactionModel = model('TransacTion', transSchema);

// module.exports  = TransactionModel;