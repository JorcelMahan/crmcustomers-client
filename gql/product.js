import { gql } from "@apollo/client";


const GET_PRODUCTS = gql`
    query getProducts {
        getProducts {
            id
            name
            stock
            price
            createdAt
        }
    }
`;


const DELETE_PRODUCT = gql` 
    mutation deleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
`;


const NEW_PRODUCT = gql`
    mutation newProduct($input: ProductInput) {
        newProduct(input: $input) {
            id
            name
            stock
            price
            createdAt
        }
    }
`;


export {
    GET_PRODUCTS,
    DELETE_PRODUCT,
    NEW_PRODUCT
}