const { pool } = require("../models/db");

//This function add product to cart
const addtoCart = (req, res) => {
  const product_id = req.params.id;
  const user_id = req.token.userId;

  pool
    .query(
      `INSERT INTO cart (user_id, product_id) VALUES ($1, $2);
    `,
      [user_id, product_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Product added to cart",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

/* 
user_id INT,
product_id INT,
is_deleted SMALLINT DEFAULT 0,
*/

//Delete from cart
const deleteFromCart = (req, res) => {
  const userId = req.token.userId;
  const productId = req.params.id;
  pool
    .query(
      `UPDATE cart SET is_deleted=1 WHERE product_id=$1 AND user_id=$2 RETURNING *`,
      [productId, userId]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "product deleted",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
      console.log(err);
    });
};

//This function give the sum of prices in the cart
/* 
this function should take all the 
*/
const getProductsByUserId = (req, res) => {
  const userId = req.token.userId;
  console.log(userId);
  pool
    .query(
      `SELECT * FROM cart AS C INNER JOIN products AS P ON C.product_id = P.id WHERE C.user_id = $1 AND C.is_deleted = 0 `,[
        userId
      ]
    )
    .then((result) => {
      console.log(result.rows)
      res.status(200).json({
        success: true,
        message: `All products in the cart of user${userId}`,
        result: result.rows,
        
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
      console.log(err);
    });
};

// update itemcount
const itemcountInCart = (req, res) => {
  const productId = req.body.productId;
  const itemcount = req.body.itemcount;
  pool
    .query(
      `UPDATE cart SET itemcount=$1 WHERE product_id=$2 RETURNING *`,
      [itemcount, productId]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "product added item",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
      console.log(err);
    });
};
const deleteAllCarts =(req,res)=>{
  const userId = req.token.userId;

  pool
    .query(
      `UPDATE cart SET is_deleted=1 WHERE user_id=$1  RETURNING *`,
      [userId]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "all carts is deleted",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
      console.log(err);
    });
}

module.exports = {
  addtoCart,
  deleteFromCart,
  getProductsByUserId,
  itemcountInCart
  ,deleteAllCarts
};
