import React, { useState } from "react";
import Like from "./Like";
import { isEmpty } from './Utils';
import { useSelector, useDispatch } from 'react-redux';
import { editPosts } from "../actions/post.action";


const Post = ({ post }) => {
  const user = useSelector((state) => state.userReducer);
  const [edittoggle, setEdittoggle] = useState();
  const [editcontent, setEditcontent] = useState(post.editcontent);
  const dispatch = useDispatch();

  const handleEdit = (e) =>{
    e.preventDefault();

    const postData ={
      title: post.title,
      content: editcontent,
      author: user[0].pseudo,
      likes: 0,
    };
    // Le dispach permet de transmettre la data a l'action(et l'action va faire la suite)
    dispatch(editPosts(postData));
    setEdittoggle(false);
  }

  return (
    <div className="post">
      {/* fe icons delete ak edit yo afficher pou post user ki konekte an selman */}
      {!isEmpty(user[0]) && user[0].pseudo === post.author && (
        <div className="edit-delete">
          <img onClick={() => setEdittoggle(!edittoggle)} src="./icons/edit.svg" alt="edit"/>
          <img src="./icons/delete.svg" alt="delete"/>
        </div>
      )}
      {/* Fin icons */}
      <h2>{post.title}</h2>
      <img
        src='img/lion_bg.jpg'
        className="post-img"
        alt="img-post"
      />

        { edittoggle ? (
          <form onSubmit={(e) => handleEdit(e)}>
            <textarea defaultValue={post.content} onChange={e => setEditcontent(e.target.value)}></textarea>
            <input type="submit" value="Modifier"/>
          </form>
        ) : ( 
          <p>{post.content}</p>
        ) }
     

      <div className="author">
        <h5>{post.author}</h5>
        <Like post={post} />
      </div>
    </div>
  );
};

export default Post;
