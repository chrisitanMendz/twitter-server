const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    uid: ID!
    firstName: String!
    lastName: String!
    name: String!
    email: String!
    imageUrl: String!
    createdAt: String!
    nickname: String!
  }

  type Post {
    _id: ID!
    text: String
    photoUrl: String
    posterUid: ID!
    posterName: String!
    posterNickname: String!
    posterImageurl: String!
    createdAt: String!
    comments: [Comment]
    likes: [Likes]
  }

  type Likes {
    uid: ID!
    photoUrl: String!
    name: String!
    nickname: String!
  }

  type Comment {
    _id: ID!
    uid: ID!
    photoUrl: String!
    name: String!
    nickname: String!
    text: String!
    createdAt: String!
  }

  #Queryyy
  type Query {
    users: [User!]!
    userById(uid: ID!): User!
    userByNickname(nickname: String!): String!
    posts: [Post!]!
    post(id: ID!): Post!
    userPost: [Post]
  }

  #Mutation
  type Mutation {
    addUser(
      uid: ID!
      firstName: String!
      lastName: String!
      name: String!
      email: String!
      imageUrl: String!
      nickname: String!
    ): String!

    addPost(
      text: String
      photoUrl: String
      posterUid: ID!
      posterName: String!
      posterNickname: String!
      posterImageurl: String!
    ): String!

    deletePost(id: ID!): String!

    addComment(
      id: ID!
      uid: ID!
      photoUrl: String!
      name: String!
      nickname: String!
      text: String!
    ): String

    removeComment(postID: ID!, commentID: ID!): String!

    updateLike(
      postID: ID!
      uid: ID!
      photoUrl: String!
      name: String!
      nickname: String!
    ): String!
  }
`;

module.exports = { typeDefs };
