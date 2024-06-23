import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_PRODUCT_BY_ID = gql`
  query GetSingleProduct($id: ID!) {
    product(id: $id) {
      name
      price
      description
    }
  }
`;

const ProductDetails = () => {
  const { id } = useParams();
  console.log("ID: ", id);

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  console.log("Data: ", data);

  return (
    <div>
      <h1>Product Details</h1>
    </div>
  );
};

export default ProductDetails;
