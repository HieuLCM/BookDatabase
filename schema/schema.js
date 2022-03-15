const {
    GraphQLSchema, 
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} = require('graphql')

const Book = require('../modules/book')
const Author = require('../modules/author')

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents an author of a book',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLID),
        },
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                // return books.filter(book => book.authorId === author.id)
                return Book.find({authorId: author.id})
            }
        } 
    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book writeen by an author',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLID),
        },
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        authorId: {
            type: GraphQLNonNull(GraphQLID),
        },
        author:{
            type: AuthorType,
            resolve: (book) => {
                // return authors.find(author => author.id === book.authorId)
                return Author.findById(book.authorId)
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            description: 'A book',
            args: {
                id: {
                    type: GraphQLID

                }
            },
            resolve: (parent, args) => {
                // return books.find(book => book.id === args.id)
                return Book.findById(args.id)
            }
        },
        books: {
            type: GraphQLList(BookType),
            description: 'List of books',
            resolve: () => {
                return Book.find()
            }

        },
        author: {
            type: AuthorType,
            description: 'An author',
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
            //    return authors.find(author => author.id === args.id)
                return Author.findById(args.id)
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            description: 'List of authors',
            //resolve: () => authors
            resolve: () => {
                return Author.find()
            }
        }

    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Mutation Query',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add a book',
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (parent, args) => {
            //    const book = {id: books.length + 1, name: args.name, authorId: args.authorId}
            //    books.push(book)
            //    return book
                let book = new Book({
                    name: args.name,
                    authorId:args.authorId
                })
                return book.save()
            }
        },

        addAuthor: {
            type: AuthorType,
            description: 'Add an author',
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
            },
            resolve: (parent, args) => {
             //   const author = {id: authors.length + 1, name: args.name}
            //    authors.push(author)
            //    return author
                let author = new Author({
                    name: args.name,
                })
                return author.save()
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})
