import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const CreatePost = () => {
  const { loginState } = useAuthContext();
  const [postImage, setPostImage] = useState('');
  const postRef = useRef()

  const onImageSelect = () => {
    let file = postRef.current.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPostImage(reader.result);
    };
  };

  const createPost = async () => {
    let res = await axios.post(
      '/createpost',
      {
        title: 'title',
        body: 'body',
        image: postImage
      },
      {
        headers: { Authorization: `Bearer ${loginState.userToken}` },
        validateStatus: () => true,
      }
    );
    console.log('res', res.data);
  }

  return (
    <div className="create-post">
      <h4>Create new post</h4>
      <input type="text" />
      <input type="file" ref={postRef} onChange={onImageSelect} />
      <img src={postImage} alt=""/>
      <button onClick={createPost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
