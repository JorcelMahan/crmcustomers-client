import { gql } from '@apollo/client';


const GET_USER = gql`
    query getUser {
        getUser {
            id
            name
            lastName
        }
    }
`;

const NEW_USER = gql`
    mutation newUser($input: UserInput) {
        newUser(input: $input) {
            id
            name
            lastName
            email
        }
    }
`;


const AUTH_USER = gql`
    mutation authUser($input: AuthInput) {
        authUser(input: $input) {
            token
        }
    }
`;

export {
    GET_USER,
    NEW_USER,
    AUTH_USER
};