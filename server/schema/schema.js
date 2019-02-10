const graphql = require('graphql')
const _ = require('lodash')
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql

const Author = require('../model/authors')

const  Book = require('../model/books')



const AuthorType = new GraphQLObjectType({
    name: 'Authors',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({authorId: parent.id})
            }
        }
    })
})




const BookType = new GraphQLObjectType({
    name: 'Books',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId)
              }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
              return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
            }
        },

    }
})

    const Mutation = new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            addAuthor: {
                type: AuthorType,
                args: {
                    name: {type: GraphQLString},
                    age: {type: GraphQLInt}
                
                },
                resolve(parent, args){
                    let author = new Author({
                        name: args.name,
                        age: args.age
                    })
                  return author.save()
                }
            },
            addBook: {
                type: BookType,
                args: {
                    name: {type: GraphQLString},
                    genre: {type: GraphQLString},
                    authorId: {type: GraphQLID}
                
                },
                resolve(parent, args){
                    let author = new Book({
                        name: args.name,
                        genre: args.genre,
                        authorId: args.authorId
                    })
                  return author.save()
                }
            }, 
        }
    })


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})