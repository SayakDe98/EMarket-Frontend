import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { searchActions } from "../../../store/search-slice";
import Modal from "../../../shared/UI/Modal/Modal";
import { refreshActions } from "../../../store/refresh-slice";

const Products = () => {
    const productUrl = "http://localhost:5000/api/products";
    const [cartItemData, setcartItemData] = useState([]);
    const [data, setData] = useState([]);
    const cartItemUrl = "http://localhost:5000/api/cartItems";
    const [isSending, setIsSending] = useState(false);
    let cartId = useSelector(state=>state.auth.cartId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMssg, setErrorMssg] = useState('');
    const [errorFound, setErrorFound] = useState(false);
    const userId = localStorage.getItem('userId')
    const refresh = useSelector(state=>state.refresh.refresh);

    if(!cartId) {
        cartId = localStorage.getItem('cartId');
    }
    let qty;
    const getPdtData = async () => {
          try {
            const response = await axios.get(productUrl,{headers:{'Authorization': Cookies.get('token')}});
            const data = response.data;
            setData(data);
            console.log(data);
            console.log(data[0].name);
          } catch (error) {
            console.log(error);
            setErrorMssg(error.response.data);
            setErrorFound(true);
          }
        }
        useEffect(()=>{
            getPdtData()
        },[]);
    
       const addToCartHandler= useCallback(async(pdtId) => {
            if(isSending) return;

            setIsSending(true);
            try {
                console.log("Product ID",pdtId)
                    const cartItemResponse = await axios.get(`${cartItemUrl}/${cartId}`,{headers:{'Authorization':Cookies.get('token')}});
                    console.log("Cart item response data", cartItemResponse.data)
                    const cartItemResponseData = cartItemResponse.data;
                    
                    //case 1 empty cart
                    if(cartItemResponseData.length===0) {
                        console.log('No items in cart till now');
                        console.log('Adding first cart item');
                        const cartItemToCreate = {userId,cartId, productId: pdtId, quantity: 1};
                        console.log(cartItemToCreate)
                        try {
                            const postRequestCartItemResponse = await axios.post(cartItemUrl,cartItemToCreate,{headers:{'Authorization':Cookies.get('token')}});
                            console.log("Successfully created new product with quanity=1 in cart",postRequestCartItemResponse.data);                     
                            dispatch(refreshActions.refresh());
                        } catch (error) {
                            console.log(error);
                            setErrorMssg(error.response.data);
                            setErrorFound(true);
                        } 
                        setcartItemData(cartItemResponseData);
                        return;
                    }
      //atleast 1 item exists in cart
                    else{
                        console.log("Pdt idsss",cartItemResponseData[0].productId._id);
                        const pdtIdMatch = cartItemResponseData.some(pdt=>pdt.productId._id===pdtId);
                        console.log("pdtIdMatch:",pdtIdMatch);
                        if(!pdtIdMatch){
                            console.log('Product Id didnt match with any item in cart');
                            const cartItemToCreate = {userId,cartId, productId: pdtId, quantity: 1};
                            console.log(cartItemToCreate)
                            try {
                                const postRequestCartItemResponse = await axios.post(cartItemUrl,cartItemToCreate,{headers:{'Authorization':Cookies.get('token')}});
                                dispatch(refreshActions.refresh());
                                console.log("Successfully created new product with quanity=1 in cart",postRequestCartItemResponse.data);                     
                            } catch (error) {
                                console.log(error);
                                setErrorMssg(error.response.data);
                                setErrorFound(true);
                            } 
                            setcartItemData(...cartItemResponseData);
                            return;
                        }
                        else if(pdtIdMatch){
                            console.log("Current pdt exists in cart(pdt Id matched with existing item in cart) so lets increase its qty");
                            const index = cartItemResponseData.findIndex(pdt=>pdt.productId._id===pdtId);
                            console.log("index",index)
                            const currentCartItemQty = cartItemResponseData[index].quantity;
                            console.log("Current qty of the item in cart:",currentCartItemQty);
                            const currentCartItemId = cartItemResponseData[index]._id;
                            console.log("_id of cartItem which exists in cart",currentCartItemId);
                            const cartItemQtyToIncrease = {userId,cartId, productId: pdtId, quantity: currentCartItemQty + 1};
                            console.log(cartItemQtyToIncrease);
                            try {
                                const putRequestCartItemResponse = await axios.put(`${cartItemUrl}/${currentCartItemId}`,cartItemQtyToIncrease,{headers:{'Authorization':Cookies.get('token')}});
                                dispatch(refreshActions.refresh());
                                console.log("Successfully increased qty of item by 1",putRequestCartItemResponse.data);
                            } catch (error) {
                                console.log(error);
                                setErrorMssg(error.response.data);
                                setErrorFound(true);
                            }
                            setcartItemData(...cartItemResponseData);
                            return;
                        }

                    }          
                } 
                catch (error) {
                    console.log(error);
                    setErrorMssg(error.response.data);
                    setErrorFound(true);
                }
        },[]);
        
        const imgClickHandler = (val) => {
            console.log("val",val)
            dispatch(searchActions.search({searchItem:val}));
            navigate(`/detail?Product=${val}`)
        }

        const errorMessage = () => {
            return errorMssg
}
    return(
        <React.Fragment>
             <Modal
        onData={errorMessage()}
        show={errorFound}
        setErrorFound={setErrorFound}
        onTitle={"Error!"}
        />
            {data.map((pdtData,i) => {
                return(
                          <div key={i+1} className="col-lg-4 col-md-6 col-sm-6 pb-1">
                        <div className="product-item bg-light mb-4"onClick={()=>{imgClickHandler(pdtData.name)}}>
                            <div className="product-img position-relative overflow-hidden">
                                <img className="img-fluid w-100" style={{width:'300px',height:'550px'}} src={pdtData.imageUrl.replace('"','')} alt=""/>
                                <div className="product-action">
                                    <a className="btn btn-outline-dark btn-square" onClick={()=>{addToCartHandler(pdtData._id)}}><i className="fa fa-shopping-cart"></i></a>
                                </div>
                            </div>
                            <div className="text-center py-4">
                                <a className="h6 text-decoration-none text-truncate" onClick={()=>{console.log('clicked')}}>{pdtData.name}</a>
                                <div className="d-flex align-items-center justify-content-center mt-2">
                                    <h5>${pdtData.price}</h5><h6 className="text-muted ml-2"><del>${pdtData.price+pdtData.price * 0.2}</del></h6>
                                </div>
                                <div className="d-flex align-items-center justify-content-center mb-1">
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small>(99)</small>
                                </div>
                            </div>
                        </div>
                    </div>
               
                );
            }
            )
            }
        </React.Fragment>
    );
};

export default Products;