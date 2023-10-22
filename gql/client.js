import { gql } from "@apollo/client";




const GET_CLIENTS_SELLER = gql`
    query getClientsSeller {
        getClientsSeller {
            id
            name
            lastName
            company
            email
        }
    }
`;


const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id)
    }
`;

const NEW_CLIENT = gql`
    mutation newClient($input: ClientInput) {
        newClient(input: $input) {
            id
            name
            lastName
            company
            email
            phone
        }
    }
`;

const BEST_CLIENTS = gql`
    query bestClients {
        bestClients {
            total
            client {
                name
                lastName
                email
            }
        }
    }
`;

const BEST_SELLERS = gql`
    query bestSellers {
        bestSellers {
            total
            seller {
                name
                lastName
                email
            }
        }
    }
`;

const GET_CLIENT = gql`
    query getClient($id: ID!) {
        getClient(id: $id) {
            id
            name
            lastName
            company
            email
            phone
        }
    }
`;

const UPDATE_CLIENT = gql`
    mutation updateClient($id: ID!, $input: ClientInput) {
        updateClient(id: $id, input: $input) {
            id
            name
            lastName
            company
            email
            phone
        }
    }
`;

const GET_ORDERS_SELLER = gql`
    query getOrdersSeller {
        getOrdersSeller {
            id
            order {
                id
                quantity
                name
                price
            }
            total
            client {
                id
                name
            }
            seller
            state
        }
    }
`;

export {
    DELETE_CLIENT,
    GET_CLIENTS_SELLER,
    NEW_CLIENT,
    BEST_CLIENTS,
    BEST_SELLERS,
    GET_CLIENT,
    UPDATE_CLIENT,
    GET_ORDERS_SELLER
}