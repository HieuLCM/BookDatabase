import React, { useState } from 'react'
import {graphql} from 'react-apollo'

import { getBooksQuery } from '../quiries/quires'

import BookDetails from './BookDetails'

const BookList = (props) => {
  const data = props.data
  const [selected, setSelected] = useState(null)
  if (data.loading) {
    return (
      <div>
        Loading books
      </div>
    )
  } else {
    return (
      <div>
          <ul id='book-list'>
              {data.books.map(book => (
                <li 
                key={book.id}
                onClick={() => setSelected(book.id)}
                >
                  {book.name}
                </li>
              ))}
          </ul>
          <BookDetails bookId={selected} />
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)