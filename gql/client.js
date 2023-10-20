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




export {
    DELETE_CLIENT,
    GET_CLIENTS_SELLER
}