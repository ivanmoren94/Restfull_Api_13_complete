const Product = require("../models/productsModels");

const createProduct = async (req, res) => {
  try {
    const { name, price, description, sizes, colors, brand } = req.body;
    const product = new Product({
      name,
      price,
      description,
      sizes,
      colors,
      brand,
    });

    const result = await product.save();
    res.status(201).json({
      status: "Success",
      message: "Producto creado exitosamente",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pudo crear el producto",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "Success",
      message: "Productos obtenidos exitosamente",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pudieron obtener los productos",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json({
        status: "Success",
        message: "Producto obtenido exitosamente",
        data: product,
      });
    } else {
      res.status(404).json({
        status: "Error",
        message: "Producto no encontrado",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pudo obtener el producto",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        status: "Error",
        message: "Producto no encontrado",
      });
    }

    // Actualizar propiedades del producto
    if (req.body.name) {
      product.name = req.body.name;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.body.description) {
      product.description = req.body.description;
    }
    if (req.body.sizes) {
      product.sizes = req.body.sizes;
    }
    if (req.body.colors) {
      product.colors = req.body.colors;
    }
    if (req.body.brand) {
      product.brand = req.body.brand;
    }

    await product.save();

    res.status(200).json({
      status: "Success",
      message: "Producto actualizado exitosamente",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pudo actualizar el producto",
      error: error.message,
    });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (product) {
      res.status(200).json({
        status: "Success",
        message: "Producto eliminado exitosamente",
        data: product,
      });
    } else {
      res.status(404).json({
        status: "Error",
        message: "Producto no encontrado",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pudo eliminar el producto",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
