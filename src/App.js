import React from 'react'
import './style.css'

import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

//components
import BookList from './components/BookList'
import AddBook from './components/AddBook'

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Welcome</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  )
}

export default App