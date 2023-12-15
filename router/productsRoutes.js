const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAveragePrice,
  addColorsToProduct
} = require("../controllers/productsControllers");

router.get("/", getAllProducts);
router.get('/average',getAveragePrice)
router.post('/:productId/add-colors',addColorsToProduct)

router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
