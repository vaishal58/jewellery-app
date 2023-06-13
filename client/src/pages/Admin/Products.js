import React,{useState,useEffect} from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import {Link} from 'react-router-dom'
const Products = () => {
    const [products,setProducts]=useState([])
    //getAll product
const getallproduct=async()=>{
    try{
         const {data}=await axios.get('http://localhost:8080/api/v1/product/get-product')
         setProducts(data.products);
    }
    catch(error)
    {
        toast.error("error")
    }
}
useEffect(()=>{
    getallproduct();
},[])

  return (
    <Layout>
      <div className="row" >
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">all product list</h1>
          <div className="d-flex">
          {products.map((p)=>(
            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
            <div class="card m-3" style={{width:'18rem'}} key={p._id}>
          <img src={`http://localhost:8080/api/v1/product//product-photo/${p._id}`}  alt="Card image cap" style={{widht:'150px',height:'250px'}}/>
        <div class="card-body">
        <h5 class="card-title">{p.name}</h5>
        <p class="card-text">{p.description}</p>
        
        </div>
     </div>  
     </Link>
          ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
