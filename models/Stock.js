const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
//Product Schema
const stockSchema = mongoose.Schema(
    {
      productId:{
        type:ObjectId,
        required:true,
        ref:"Product"
      },
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
      price:{
        type:Number,
        required:true,
        min:[0,"Product price can't be negative value"]
      },
      quantity:{
        type:Number,
        required:true,
        min:[0,"Product quantity can't be negative value"]
      },
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
      },
      status:{
        type:String,
        required:true,
        enum:{
          values:["in-stock","out-of-stock","discontinued"],
          message:"status can't be {VALUE}"
        }
      },
      store:{
        name:{
          type:String,
          trim:true,
          required:[true,"Please provide a store name"],
          lowercase:true,
          enum:{
             values:["cumilla","dhaka","rangpur","khulna"],
             message:"{VALUE} is not a valid name"
          }
         },
        id:{
          type:ObjectId,
          required:true,
          ref:"Store"

        }
      },
      suppliedBy:{
        name:{
          type:String,
          trim:true,
          required:[true,"Please provide a store name"],
        },
        id:{
          type:ObjectId,
          ref:"Supplier"
        }
      }

    },
    { timestamps: true }
  );


const Stock = mongoose.model("Stock", stockSchema);

module.exports = Product;
