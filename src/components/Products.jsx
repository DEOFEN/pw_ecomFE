import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      
        axios.get("http://localhost:3001/ecom/getAllProducts")
        .then((res) => {
             if(res.data.statusCode === 200){
               console.log("data", res.data.data)
               setData(res.data.data);
             }
        })
        .catch((error) => {
          console.log(error)
        })
       
    }

    getProducts();
  }, [])

  return (
    <Container>
      {data.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
