import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { loginState } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const { uid } = useParams();
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      let res = await axios.get(`/users/${uid}`, {
        headers: { Authorization: `Bearer ${loginState.userToken}` },
      });
      console.log('res', res.data);
      setPosts(res.data.posts);
      setProfile(res.data.user);
      setIsFollowing(res.data.user.followers.includes(loginState.userData._id))
    };
    fetchUserProfile();
  }, [loginState, uid]);

  const followUser = async () => {
    let res = await axios.put(
      isFollowing ? '/unfollow' : '/follow',
      { uid },
      {
        headers: { Authorization: `Bearer ${loginState.userToken}` },
      }
    );
    console.log('res', res.data);
    setIsFollowing(!isFollowing)
  };

  return (
    <>
      {!profile ? (
        <h2>Loading...</h2>
      ) : (
        <section className="profile">
          <header className="profile_info">
            <div className="profile_pic">
              <img src="" alt="" />
            </div>
            <section>
              <div className="username">
                {profile.email}
                {uid !== loginState.userData._id ? (
                  <button onClick={() => followUser()}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                ) : null}
              </div>
              <ul>
                <li>
                  <span>
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                  </span>
                </li>
                <li>
                  <span>{profile.followers.length} followers</span>
                </li>
                <li>
                  <span>{profile.following.length} following</span>
                </li>
              </ul>
              <div className="name">{profile.name}</div>
            </section>
          </header>
          <div className="myposts">
            {posts.map((post) => (
              <div className="post_image" key={post._id}>
                <img src={post.image} alt="" />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
