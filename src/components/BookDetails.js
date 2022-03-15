import React from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../quiries/quires'

const BookDetails = (props) => {
  const data = props.data
  console.log(props.bookId)
  if (!props.bookId){
      return <div id='book-details'><h2>No book selected</h2></div>
  }
  if (data.loading) {
      return <div id='book-details'>Loading...</div>
  }
  const book = data.book
  return (
    <div id='book-details'>
        <h2>{book.name}</h2>
        <p>Author: {book.author.name}</p>
        <p>All book by this auhor:</p>
        <ul className='other-books'>
            {book.author.books.map(book => (
                <li key={book.id}>{book.name}</li>
            ))}
        </ul>
    </div>
  )
}

export default graphql(getBookQuery, {options: (props) => {
    return {
        variables: {id: props.bookId}
        }
    }
})(BookDetails)