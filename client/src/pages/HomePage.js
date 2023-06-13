import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { Checkbox,Radio } from "antd";
import axios from "axios";
import { Prices } from "../components/Prices";
const HomePage = () => {
  
  const [products, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked,setChecked]=useState([]);
  const [radio,setRadio]=useState([]);
  const [total,setTotal]=useState(0);
  const [page,setPage]=useState(1);
  //getTotal
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  //filter by cat
  const handleFilter=(value,id)=>{
    let all=[...checked]
    if(value)
    {
      all.push(id);
      console.log(id);
    }
    else{
      all=all.filter(c=> c!== id)
      console.log("else>>",id);
    }
    setChecked(all);
  }

  //get product
  const getall=async ()=>{
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/allcategory"
      );
      if (data.success) {
        console.log(data);

        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getallproduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      
      console.log(data);
      setProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    
    getall();
  }, []);
  useEffect(() => {
    
    if (!checked.length || !radio.length) getallproduct();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-3">
          <p className="text-center">FILTER BY CATEGORY</p>
          <div className="d-flex flex-column ms-4">
          {categories.map((c)=>(
               <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked,c._id) }>
                   {c.name}
                 </Checkbox>
          ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className="btn btn-danger" onClick={()=> window.location.reload()}>RESET FILTER</button>
          </div>

        </div>
        <div className="col-md-9">
          <h1 className="text-center">ALL PRODUCT</h1>
          
          <div className="d-flex flex-wrap">
          {products?.map((p)=>(
            
            <div class="card m-3" style={{width:'18rem'}} key={p._id}>
          <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}  alt="Card image cap" style={{widht:'150px',height:'250px'}}/>
        <div class="card-body">
        <h5 class="card-title">{p.name}</h5>
        <p class="card-text">{p.description}</p>
        <p class="card-text">${p.price}</p>
        <button  class="btn btn-primary ">DETAIL'S</button>
        <button  class="btn btn-primary ms-1">ADD TO CART</button>
        </div>
     </div>  
     
          ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
