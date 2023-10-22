import { gql } from "@apollo/client";


const GET_PRODUCTS = gql`
    query getProducts {
        getProducts {
            id
            name
            stock
            price
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
        }
    }
`;

const GET_PRODUCT = gql`
    query getProduct($id: ID!) {
        getProduct(id: $id) {
            id
            name
            stock
            price
        }
    }
`;

const UPDATE_PRODUCT = gql`
    mutation updateProduct($id: ID!, $input: ProductInput) {
        updateProduct(id: $id, input: $input) {
            id
            name
            stock
            price
        }
    }
`;

export {
    GET_PRODUCTS,
    DELETE_PRODUCT,
    NEW_PRODUCT,
    GET_PRODUCT,
    UPDATE_PRODUCT
}