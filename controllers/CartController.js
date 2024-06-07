const Cart = require("../modules/CartModule");
const Product = require("../modules/ProductModule");
const ErrHandle = require("../untils/ErrHandle");

exports.create = async (req, res) => {
  const { idProduct, quantity } = req.body;
  try {
    if (idProduct && quantity) {
      const product = await Product.findOne({ _id: idProduct });
      await Cart.create({
        iduser: req.user._id,
        idProduct: product._id,
        quantity,
        img: product.img,
        sale: product.sale,
        price: product.price
      });
      return res.status(400).json({
        message: "Add cart success",
        success: true
      });
    } else {
      return res.status(400).json({
        message: "Add cart false",
        success: false
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

exports.change = async (req, res, next) => {
  const { idProduct, quantity } = req.body;
  try {
    const itemCart = await Cart.findOne({ idProduct, idUser: req.user._id });
    if (!itemCart) {
      return next(ErrHandle("No cart found with this id to update", 404, res));
    }
    await Cart.updateOne(
      { idProduct, idUser: req.user._id },
      {
        $set: {
          quantity: quantity
        }
      }
    );

    res.status(200).json({
      success: true,
      message: "update cart success"
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

exports.remove = async (req, res) => {
  const { idProduct } = req.body;
  try {
    const itemCart = await Cart.findOne({ idProduct, idUser: req.user._id });
    if (!itemCart) {
      return next(ErrHandle("No find cartData with params id", 404, res));
    }
    await Cart.findOneAndRemove({ idUser: req.user._id, idProduct: idProduct });
    return res.status(200).json({
      message: "Create blog success"
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
