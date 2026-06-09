const { cloudinary } = require("../config/cloudinary");
const Product = require("../models/product");
const { validationResult } = require("express-validator");




// CREATING PRODUCT (C)
const addProduct = async (req, res) => {

    const errors = validationResult(req);
   
  if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()?.[0].msg });
      }


    try {
      const {title, description, price, category, image} = req.body;
      // const { title, description, price, category, image } = req.body;
      console.log(req.file, 'i think is here');
      

        // if (!title || !description || !price || !category || !image) {
        if (!title || !description || !price || !category || !req.file) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        // const product = await Product.create(req.body);
        // console.log(req.body);
        // return res.status(200).json({ status: true, message: "Product Created Successfully", product });

        
      const stream = cloudinary.uploader.upload_stream(
      { folder: "march-products" },
      async (error, result) => {
        if (error) {
          console.log(error);

          return res.status(500).json({ message: "Cloudinary upload failed" });
        }
        console.log(result, "from cludinary");

        const product = {
          ...req.body,
          image: result.secure_url,
          publicId: result.public_id,
        };

        await Product.create(product);

        if (product) {
          return res
            .status(201)
            .json({ message: "product created Succefully", product });
        }
      },
    );
    stream.end(req.file.buffer);

    } catch (error) {
        console.log(error);
        return res.status
        (400).json({message: error.message, status: false})
        

    }
};


// GETTING ALL PRODUCTS (R)
const getAllProduct = async (req, res) => {
    try {
    const product = await Product.find();
    return res.status(200).json({
        status: true,
        message: "Products gotten successfully",
        product,
        count: product.length,
    });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message, status: false})
        
    }
};

// GETTING SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
    try {
      const productGet = await Product.findById(req.params.id);

      if (!productGet){
        return res.status(200).json({ status: false, message: "Product not found"})
      }

      res.status(200).json({
         status: true,
          message: "Single product gotten successfuly", 
          product: productGet
      })
      
      
    } catch (error) {
     console.log(error);
    res.status(500).json({message: error.message, status: false})
    }
    
}




// UPDATING PRODUCT (U) 
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,     // which product
      req.body,          // new data
      { new: true }      // return updated version
    );

    if (!updatedProduct) {
      return res.status(404).json({status: false, message: "Product not found"});
    }

    res.status(200).json({status: true,message: "Product updated successfully",product: updatedProduct
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({status: false, message: error.message
    });
  }
};



// DELETE  (D)
const deleteProduct = async (req, res) => {
try {
       const deletedProduct = await Product.findByIdAndDelete(
    req.params.id, 
    req.body,
   { new: true }
    );

    if (!deletedProduct){
    return res.status(404).json({status: false, message: "Delete Failed"});
    } 

    return res.status(200).json({status: true, message: "Product deleted", deletedProduct });

} catch (error) {
    console.log(error);
    res.status(500).json({status: false, message: error.message})  
}
}







module.exports = { addProduct, getAllProduct, getSingleProduct, updateProduct, deleteProduct }