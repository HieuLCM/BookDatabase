import React, {useReducer} from 'react'
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash'

import { getAuthorsQuery, addBookMutation, getBooksQuery, getBookQuery } from '../quiries/quires'

const reducer = (state, action) => {
    if(action.type === 'ADD_BOOKNAME') {
        return {...state, name: action.payload}
    }
    if(action.type === 'ADD_AUTHORID') {
        return {...state, authorId: action.payload}
    }
    return state
}

const defaultState = {
    name: "",
    authorId: ""
}

const AddBook = (props) => {
  const data = props.getAuthorsQuery
  const [state, dispatch] = useReducer(reducer, defaultState)
  const handleSubmit = (event) => {
      event.preventDefault()
      props.addBookMutation({
          variables: {
              name: state.name,
              authorId: state.authorId
          },
          refetchQueries: [{query: getBooksQuery}, {query: getBookQuery}]
      })
  }
  if (data.loading) {
      return <div>Loading...</div>
  }
  else {
    return (
        <form id='add-book' onSubmit={handleSubmit}>
            <div className='field'>
                <label>Book name:</label>
                <input 
                    type='text' 
                    value={state.name}
                    onChange={(event) => dispatch({type: 'ADD_BOOKNAME', payload: event.target.value})}
                />
            </div>
            <div className='field'>
                <label>Author:</label>
                <select value={state.authorId} onChange={(event) => dispatch({type: 'ADD_AUTHORID', payload: event.target.value})}>
                    <option value="">Select an author</option>
                    {data.authors.map((author) => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>
            </div>
            <br />
            <button type='Submit'>+</button>
        </form>
      )
  }
}

export default compose(
    graphql(getAuthorsQuery,{name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook)