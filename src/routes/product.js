const express = require("express");
const { authMiddleWare } = require("../MiddleWare/verifyToken");
const {
    addProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct } = require("../controller/product");

const { addProductValidator } = require("../validators/product");
const { upload } = require("../utils/multer");

const router = express.Router();


// Routes to use in Postman
// router.post("/", addProductValidator, addProduct);
router.post("/", authMiddleWare,upload.single("image"), addProduct);
router.get("/", getAllProduct);
router.get("/:id", getSingleProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", authMiddleWare, deleteProduct)

module.exports = router;





