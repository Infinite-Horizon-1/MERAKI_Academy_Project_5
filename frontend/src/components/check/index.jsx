import { Button } from 'antd'
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux'
import "./style.css"


const Check =() => {
    const {cart}=useSelector((state)=>{
        return{
            cart: state.cart.inCart
        };
       
    });
    const {token}=useSelector((state)=>{
        return{
            token: localStorage.getItem("token")
        };
       
    });
    const log =async ()=>{
        console.log(cart,token);
    try{
        const result = await axios.post(`http://localhost:5000/orders`,{}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(result);
          cartOrders()
    }catch(err){
console.log(err);
    }
    
    }

    const cartOrders = ()=>{
        cart.map(async(element)=>{ 
            console.log(element.cart_id);
            
            try{
                const result =await  axios.post(`http://localhost:5000/orders/cart`,{cart_id:element.cart_id})
                console.log(result.data.result);
            }catch(err) {
                console.log(err);
            }
        })
       deleteCarts()
    }
    const deleteCarts =async()=>{
          
        try{
            const result =await  axios.delete(`http://localhost:5000/cart`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },{})
            console.log(result.data.result);
        }catch(err) {
            console.log(err);
        }
    }
  return (
    <div>
      <Button id='checkout' onClick={log}>checkout </Button>
    </div>
  )
}

export default Check
