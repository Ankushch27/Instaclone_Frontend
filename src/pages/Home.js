import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import { useAuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { loginState } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      let res = await axios.get('/posts', {
        headers: { Authorization: `Bearer ${loginState.userToken}` },
      });
      setPosts(res.data.posts);
    };
    fetchPosts();
  }, [loginState.userToken, likes]);

  const likePost = async (postId, shouldLike) => {
    let res = await axios.put(
      shouldLike ? '/like' : '/unlike',
      { postId },
      {
        headers: { Authorization: `Bearer ${loginState.userToken}` },
      }
    );
    console.log('res', res.data);
    setLikes(Math.random());
  };
  
  const deletePost = async (postId) => {
    let res = await axios.delete(
      `/deletePost/${postId}`,
      {
        headers: { Authorization: `Bearer ${loginState.userToken}` },
      }
    );
    console.log('res', res.data);
    setLikes(Math.random());
  };

  const postComment = async (postId, comment) => {
    let res = await axios.put(
      '/comment',
      { postId, comment },
      {
        headers: { Authorization: `Bearer ${loginState.userToken}` },
      }
    );
    console.log('comment', res.data);
    setLikes(Math.random());
  }

  return (
    <section className="posts">
      <CreatePost />
      {posts &&
        posts.map((post) => (
          <Post
            post={post}
            likePost={(shouldLike) => likePost(post._id, shouldLike)}
            deletePost={() => deletePost(post._id)}
            postComment={(comment) => postComment(post._id, comment)}
            key={post._id}
          />
        ))}
    </section>
  );
};

export default Home;
