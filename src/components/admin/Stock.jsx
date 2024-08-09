
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useTypewriter } from "react-simple-typewriter";
import { fetchProduct } from "../../store/ProductSlice";

const Stock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const dispatch = useDispatch();
  const { allProduct } = useSelector((state) => state.productReducer);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchProduct());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const [text] = useTypewriter({
    words: ["No Product found"],
    loop: {}
  });

  // Filter the products based on the search term
  const filteredProducts = allProduct.data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.product_id.toString().includes(searchTerm)
  );

  return (
    <>
      <div className="container my-2 pt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 fw-bolder text-center">Our Remaining Stock</h1>
            <div className="text-center my-3">
              <input
                type="text"
                placeholder="Search by Title or Product ID"
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              />
            </div>
          </div>
        </div>
        <hr />
      </div>

      {isLoading ? (
        <div className="text-center my-5">
          <CircularProgress />
        </div>
      ) : filteredProducts.length === 0 ? (
        <h2 className="text-center my-5">{text}</h2>
      ) : (
        <div className="container">
          <div className="row">
            {filteredProducts.map((item, index) => (
              <div key={index} className="col-12 col-md-4 mb-4">
                <div className="card h-100 text-center p-3">
                  {/* <p>Category: <span className="fw-bold">{item.category}</span></p> */}
                  <p>Title: <span className="fw-bold">{item.title}</span></p>
                  <p>Stock: <span className="fw-bold">{item.stock}</span></p>
                  <p>Product ID: <span className="fw-bold">{item.product_id}</span></p>
                  <p>Sell Price: <span className="fw-bold">{item.sellPrice}</span></p>
                  <p>Purchase Price: <span className="fw-bold">{item.purchasePrice}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Stock;
