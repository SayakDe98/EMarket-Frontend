import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../shared/UI/Modal/Modal";
import { categoryActions } from "../../../store/category-slice";
import "./Categories.css";
const Categories = () => {
  const categoriesUrl = "http://localhost:5000/api/categories";
  const [categories, setCategories] = useState([]);
  const [errorMssg, setErrorMssg] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const dispatch = useDispatch();
  const categorySelected = useSelector(
    (state) => state.category.categorySelected
  );
  const selectedCategoryName = useSelector(
    (state) => state.category.selectedCategoryName
  );
  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesResponse = await axios.get(categoriesUrl);
        const categoriesResponseData = categoriesResponse.data;
        console.log("categories response data", categoriesResponseData);
        setCategories(categoriesResponseData);
      } catch (error) {
        console.log(error);
        setErrorMssg(error.response.data);
        setErrorFound(true);
      }
    };
    getCategories();
  }, []);

  const onCategoryClickHandler = async (category) => {
    try {
      const categoryResponse = await axios.get(`${categoriesUrl}/${category}`);
      console.log("category response data on click", categoryResponse.data);
      let catProductsResponseData = categoryResponse.data;
      if (categorySelected) {
        dispatch(categoryActions.getAllProducts());
      } else {
        dispatch(
          categoryActions.filterProducts({
            products: catProductsResponseData,
            selectedCategoryName: category,
          })
        );
      }
    } catch (error) {
      console.log(error);
      setErrorMssg(error.response.data);
      setErrorFound(true);
    }
  };

  const errorMessage = () => {
    return errorMssg;
  };

  return (
    <React.Fragment>
      <Modal
        onData={errorMessage()}
        show={errorFound}
        setErrorFound={setErrorFound}
        onTitle={"Error!"}
      />
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Categories</span>
      </h2>
      <div className="row px-xl-5 pb-3">
        {categories.map((ctg, i) => {
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <a className="text-decoration-none">
                {ctg.category === selectedCategoryName && categorySelected && (
                  <div
                    className="cat-item d-flex align-items-center mb-4"
                    onClick={() => onCategoryClickHandler(ctg.category)}
                    style={{ cursor: "pointer", backgroundColor: "#FFD333" }}
                  >
                    <div
                      className="overflow-hidden"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <img
                        className="img-fluid"
                        src={`img/cat-${i + 1}.jpg`}
                        alt=""
                      />
                    </div>
                    <div className="flex-fill pl-3">
                      <h6>{ctg.category}</h6>
                    </div>
                  </div>
                )}
                {ctg.category === selectedCategoryName && !categorySelected && (
                  <div
                    className="cat-item d-flex align-items-center mb-4"
                    onClick={() => onCategoryClickHandler(ctg.category)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="overflow-hidden"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <img
                        className="img-fluid"
                        src={`img/cat-${i + 1}.jpg`}
                        alt=""
                      />
                    </div>
                    <div className="flex-fill pl-3">
                      <h6>{ctg.category}</h6>
                    </div>
                  </div>
                )}
                {ctg.category !== selectedCategoryName && (
                  <div
                    className="cat-item d-flex align-items-center mb-4"
                    onClick={() => onCategoryClickHandler(ctg.category)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="overflow-hidden"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <img
                        className="img-fluid"
                        src={`img/cat-${i + 1}.jpg`}
                        alt=""
                      />
                    </div>
                    <div className="flex-fill pl-3">
                      <h6>{ctg.category}</h6>
                    </div>
                  </div>
                )}
              </a>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Categories;
