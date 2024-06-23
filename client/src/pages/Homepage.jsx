import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      quantity
      description
    }
  }
`;

const Homepage = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) {
    return <h1>Loading.......</h1>;
  }
  return (
    <div>
      <div className="main_div">
        <h1>Data Fetching Via Graphql Query</h1>
        {data.products.map((item, index) => {
          return (
            <>
              <Link to={`/product/${item.id}`}>
                <h1 className="product_name">{item.name}</h1>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
