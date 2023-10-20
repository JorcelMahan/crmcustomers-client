const GET_ORDERS_SELLER = gql`
    query getOrdersSeller {
        getOrdersSeller {
           id
           name
           lastName
           company
           email
        }
    }
`;


export {
    GET_ORDERS_SELLER
}