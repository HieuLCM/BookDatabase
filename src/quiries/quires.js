import {gql} from 'apollo-boost'

const getBooksQuery = gql`
    {
        books {
        id
        name
        }
    }
`

const getAuthorsQuery = gql`
    {
        authors {
            id
            name
        } 
    }
`

const addBookMutation = gql`
    mutation ($name: String!, $authorId: ID!) {
        addBook(name: $name,  authorId: $authorId) {
            name
            id
        }
    }
`

const getBookQuery = gql`
    query($id: ID!){
        book(id: $id) {
            name
            author {
                name
                books {
                    name
                    id
                }
            }
        }
    }
`

export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery}