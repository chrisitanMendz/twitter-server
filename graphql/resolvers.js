const User = require("../model/User");
const Post = require("../model/Post");
const mongoose = require("mongoose");

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    userById: async (parent, args) => {
      const user = await User.findOne({ uid: args.uid });
      return user;
    },
    userByNickname: async (parent, args) => {
      const user = await User.findOne({ nickname: args.nickname });
      if (user) {
        return "exist";
      } else {
        return "none";
      }
    },
    posts: async () => {
      const posts = await Post.find();
      return posts;
    },
    post: async (parent, args) => {
      const post = await Post.findById(args.id);
      return post;
    },
    userPost: async (parent, args) => {
      const posts = await Post.findOne({ posterUid: args.uid });
      return posts;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const { uid, firstName, lastName, name, email, imageUrl, nickname } =
        args;
      const newUser = new User({
        uid,
        firstName,
        lastName,
        name,
        email,
        imageUrl,
        nickname,
      });
      await newUser.save();
      return "Success";
    },
    addPost: async (parent, args) => {
      const {
        text,
        photoUrl,
        posterUid,
        posterName,
        posterNickname,
        posterImageurl,
      } = args;
      const newPost = new Post({
        text,
        photoUrl,
        posterUid,
        posterName,
        posterNickname,
        posterImageurl,
      });
      await newPost.save();
      return "Success";
    },
    deletePost: async (parent, args) => {
      await Post.findByIdAndDelete(args.id);
      return "Success";
    },
    addComment: async (parent, args) => {
      const { id, uid, photoUrl, name, nickname, text } = args;
      const uniqueId = new mongoose.Types.ObjectId();
      const post = await Post.findById(id);
      const newComment = {
        _id: uniqueId,
        uid,
        photoUrl,
        name,
        nickname,
        text,
      };
      const updateComment = { comments: [...post.comments, newComment] };
      await Post.findByIdAndUpdate(id, { $set: updateComment }, { new: true });
      return "Success";
    },
    removeComment: async (parent, args) => {
      const { postID, commentID } = args;
      const post = await Post.findById(postID);
      const updateComment = post.comments.filter(
        (comment) => comment._id != commentID
      );
      await Post.findByIdAndUpdate(
        postID,
        {
          $set: {
            comments: updateComment,
          },
        },
        { new: true }
      );
      return "Success";
    },
    updateLike: async (parent, args) => {
      const { postID, uid, photoUrl, name, nickname } = args;
      const post = await Post.findById(postID);
      const filter = post.likes.filter((like) => like.uid == uid);

      let updatedLike;
      if (filter.length > 0) {
        updatedLike = post.likes.filter((like) => like.uid != uid);
      } else {
        const newLike = {
          uid,
          photoUrl,
          name,
          nickname,
        };
        updatedLike = [...post.likes, newLike];
      }
      await Post.findByIdAndUpdate(
        postID,
        {
          $set: {
            likes: updatedLike,
          },
        },
        { new: true }
      );
      return "Success";
    },
  },
};

module.exports = { resolvers };
