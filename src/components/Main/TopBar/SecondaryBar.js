import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "../../../shared/UI/Modal/Modal";
import { refreshActions } from "../../../store/refresh-slice";
import './SecondaryBar.css';

const SecondaryBar = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const productsUrl = 'http://localhost:5000/api/products';
    const [products,setProducts] = useState([]);
    const [search,setSearch] = useState(false);
    const [searchProd, setSearchProd] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [errorFound,setErrorFound] = useState(false);
    const [errorMssg, setErrorMssg] = useState('');
    const refresh = useSelector(state=>state.refresh.refresh);
    const [submitted,setSubmitted] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        const getProducts = async() => {
             try {
                 const productsResponse = await axios.get(productsUrl)
                 const productsResponseData = productsResponse.data;
                 setProducts(productsResponseData);
                 setSearchProd(productsResponseData);
                 console.log("Pdt response data",productsResponseData);
             } catch (error) {
                 console.log(error);
                 setErrorMssg(error.response.data)
                 setErrorFound(true);
         }
        }
        getProducts();
    },[refresh,submitted])

  const onChangeHandler = (event) => {
    event.preventDefault();
    setValue(event.target.value);
    const newFilter = searchProd.filter((val)=>{
        return val.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFilteredData(newFilter);
  }

    const onSubmitHandler = () => {
        navigate(`/detail?Product=${value}`);
        if(window.location.href.indexOf("detail") > -1){
            dispatch(refreshActions.refresh());
        }
    }
    const suggestionsClickHandler = (val) => {
        setValue(val)
        navigate(`/detail?Product=${val}`);
        if(window.location.href.indexOf("detail") > -1){
            dispatch(refreshActions.refresh());
        }
    }
    const errorMessage = () => {
        return errorMssg;
      };

    return(
        <React.Fragment>
            <Modal
        onData={errorMessage()}
        show={errorFound}
        setErrorFound={setErrorFound}
        onTitle={"Error!"}
        />
                 <div className="col-lg-4">
                <a href="" className="text-decoration-none">
                    <span className="h1 text-uppercase text-primary bg-dark px-2">Multi</span>
                    <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
                </a>
            </div>
            <div className="col-lg-4 col-6 text-left">

                    <form action="">
                        <div className="input-group">
                        <input type="text" value={value} onChange={onChangeHandler} className="form-control" placeholder="Search for products"/>
                        <div onClick={onSubmitHandler}  style={{cursor:'pointer'}} className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i  className="fa fa-search"></i>
                            </span>
                        </div>
                    </div>
                    {
                    value!=='' &&
                    <div className="searchBar" style={{backgroundColor:'white',position:'absolute',zIndex:'900',width:'508px',minHeight:'20px',maxHeight:'60px',border:'1px solid #ddd', overflow:'hidden', overflowY:'auto',display:'flex',flexDirection:'column'}}>
                    {filteredData.map(prod=>{return(
                                <a className="dataItem" style={{textDecoration:'none',cursor:'pointer',width:'508px',height:'20px',color:'black'}} onClick={()=>{suggestionsClickHandler(prod.name)}}>
                                    {prod.name}  
                                    </a>

                               
)})} 
</div>

                    }
                </form>
              
            </div>
            <div className="col-lg-4 col-6 text-right">
                <p className="m-0">Customer Service</p>
                <h5 className="m-0">+012 345 6789</h5>
            </div>
        </React.Fragment>
    );
};

export default SecondaryBar;