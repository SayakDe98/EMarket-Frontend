import axios from "axios";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../shared/UI/Modal/Modal";
import { refreshActions } from "../../../store/refresh-slice";

const CartSummary = () => {
    const cartItemsUrl = "http://localhost:5000/api/cartItems";
    const checkoutUrl = "http://localhost:5000/api/checkout";
    const dispatch = useDispatch();
    const [cartItemTotal, setcartItemTotal] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [errorFound, setErrorFound] = useState(false);
    const [errorMssg, setErrorMssg] = useState('');
    const [title, setTitle] = useState('');
    const userId = useSelector(state=>state.auth.userId);
    const refresh = useSelector(state=>state.refresh.refresh)
        let cartId = useSelector(state=>state.auth.cartId);
        if(!cartId) {
            cartId = localStorage.getItem('cartId');
        }

    useEffect(()=>{
        const getCartItemsTotal = async() => {
            try {
                const getCartItemsResponse = await axios.get(`${cartItemsUrl}/${cartId}`,{headers:{'Authorization': Cookies.get('token')}});
                console.log('getCartItemsResponse',getCartItemsResponse);
                const getCartItemsResponseData = getCartItemsResponse.data;
                console.log("getcartitemsresponsedata",getCartItemsResponseData);
                let sum = 0;
                getCartItemsResponseData.map(item=>sum+=item.quantity * item.productId.price)
                console.log("Sum",sum);
                setcartItemTotal(sum);
            } catch (error) {
                console.log(error);
                setErrorMssg(error.response.data);
                setTitle('Error!')
                setErrorFound(true);
            }
        }
        getCartItemsTotal()
    },[refresh]);

    const checkoutHandler = useCallback(async()=>{
        if(isSending) return;

        setIsSending(true);
            try {
                const checkoutResponse = await axios.post(`${checkoutUrl}/${cartId}`,{headers:{'Authorization':Cookies.get('token')}});
                
                setErrorMssg('Checked out all items from cart!');
                setTitle('Success!')
                setErrorFound(true)
                
                console.log('Checked out all items from cart',checkoutResponse.data);
                
            dispatch(refreshActions.refresh());
            } catch (error) {
                console.log(error);
                setErrorMssg(error.response.data);
                setTitle('Error!')
                setErrorFound(true);
            }

    },[])

    const errorMessage = () => {
        return errorMssg;
    }

    return(
        <React.Fragment>
             <Modal
        onData={errorMessage()}
        show={errorFound}
        setErrorFound={setErrorFound}
        onTitle={title}
        />
            <div className="bg-light p-30 mb-5">
                    <div className="pt-2">
                        <div className="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>${cartItemTotal}</h5>
                        </div>
                        <button className="btn btn-block btn-primary font-weight-bold my-3 py-3" onClick={()=>checkoutHandler()}>Verify Your Details</button>
                    </div>
                </div>
        </React.Fragment>
    );
};

export default CartSummary;