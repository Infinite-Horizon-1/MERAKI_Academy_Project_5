const express = require("express");
const { addtoCart, deleteFromCart, getProductsByUserId, itemcountInCart, deleteAllCarts } = require("../controllers/cart");

//authentication and authorization
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const cartRouter = express.Router();

cartRouter.post("/:id",authentication,addtoCart);
cartRouter.delete("/:id",authentication,deleteFromCart)
cartRouter.get("/",authentication,getProductsByUserId)
cartRouter.put("/",itemcountInCart)
cartRouter.delete("/",authentication,deleteAllCarts)
module.exports = cartRouter;