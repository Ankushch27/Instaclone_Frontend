import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const UserProfile = () => {
  const [posts, setPosts] = useState([])
  const { loginState } = useAuthContext();
  const {email, name} = loginState.userData
  
  useEffect(() => {
    const fetchMyPosts = async () => {
      let res = await axios.get('/myposts', {
        headers: { Authorization: `Bearer ${loginState.userToken}` }
      })
      setPosts(res.data.myposts)
    }
    fetchMyPosts()
  }, [loginState.userToken])
  
  return (
    <section className="profile">
      <header className="profile_info">
        <div className="profile_pic">
          <img src="" alt="" />
        </div>
        <section>
          <div className="username">{email}</div>
          <ul>
            <li><span>0 posts</span></li>
            <li><span>0 followers</span></li>
            <li><span>0 following</span></li>
          </ul>
          <div className="name">{name}</div>
        </section>
      </header>
      <div className="myposts">
        {posts.map(post => (
          <div className="post_image" key={post._id}>
            <img src={post.image} alt=""/>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserProfile;
