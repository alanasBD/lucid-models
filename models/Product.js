const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
//Product Schema
const productSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Plz provide a name for this product"],
        trim: true,
        unique: [true,"same data"],
        lowercase:true,
        minLength: [3, "Name must be three characters"],
        maxLength: [100, "Name is too large"],
      },
      description: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
        enum: {
          values: ["kg", "litre", "pcs","bag"],
          message: "unit value can't be {VALUE}",
        },
      },
      imageURLs:[{
        type:String,
        validate:{
          validator:(value)=>{
             if(!Array.isArray(value)){
                return false;
             }
            let isValid = true;
            value.forEach(url => {
                if(!validator.isURL(url)){
                   isValid = false;
                }
            })
            return isValid;
          }
        }
      }],
      category:{
        type:String,
        required:true
      },
      brand:{
        name:{
          type:String,
          required:true
        },
        id:{
            type:ObjectId,
            ref:"Brand",
            required:true
        }
      }

    },
    { timestamps: true }
  );


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
