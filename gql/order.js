import { gql } from "@apollo/client";

const GET_ORDERS_SELLER = gql`
    query getOrdersSeller {
        getOrdersSeller {
           id
           total
           state
           seller
           order {
            id
            quantity
            name
           } 
           client {
            id
            name
            lastName
            email
            phone
            }
        }
    }
`;


const UPDATE_ORDER = gql`
    mutation updateOrder($id: ID!, $input: OrderInput) {
        updateOrder(id: $id, input: $input) {
            state
        }
    }
`;

const DELETE_ORDER = gql`
    mutation deleteOrder($id: ID!) {
        deleteOrder(id: $id)
    }
`;

const NEW_ORDER = gql`
    mutation newOrder($input: OrderInput) {
        newOrder(input: $input) {
            id
        }
    }
`;

export {
    GET_ORDERS_SELLER,
    UPDATE_ORDER,
    DELETE_ORDER,
    NEW_ORDER
}