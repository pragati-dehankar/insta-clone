import "./Post.css";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "./firebase";
import { auth } from "./firebase";
import { v4 } from "uuid";
import { BiUserCircle, BiComment, BiShare } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Button } from "@mui/material";


const Post = ()=> {


  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const [description, setDescription] = useState([]);
  const[newDescription,setNewDescription]=useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0);


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddDescription=()=>{
    // setDescription([...description, newDescription]);
    setNewDescription('');
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };
  //handle likes
  const handleLikes = () => {
    if (!like) {
      setLike(true);
      setCount(count + 1);
    } else {
      setLike(false);
      setCount(count - 1);
    }
  };

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="Post">
        <p>Choose an image (max 5 MB)</p>
      <input
        type="file"
        onChange={(event) => {
          if (event.target.files[0].size <= 5000000) {
            setImageUpload(event.target.files[0]);
          } else {
            alert('Image size should be less than 5 MB');
          }
        }}
      />

      <button onClick={uploadFile}>Post a Picture</button>


      <div className="card" style={{ width: "18rem" }}>
          <div className="card-header">
            <BiUserCircle /> UserName 
          </div>

<div>
      {imageUrls.map((url) => {
        return <img src={url}/>;
      })}
    
    {/* {description.map((d, index) => (
          <li key={index}>{d}</li>
        ))} */}
       <input
            type="text"
            placeholder="Add a description (optional)"
            value={description}
            onChange={handleDescriptionChange}
          />
          <Button onClick={handleAddDescription}>Add</Button>
      </div>

<div className="card-footer">
            {like ? (
              <AiFillHeart
                size={30}
                className="text-danger"
                onClick={handleLikes}
                style={{ cursor: "pointer" }}
              />
              
            ) : (
              <AiOutlineHeart
                size={30}
                onClick={handleLikes}
                style={{ cursor: "pointer" }}
              />
             
            )}
             
            
            <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={handleCommentChange}
        />
        <button onClick={handleAddComment}> <BiComment size={30} /></button>
      </div>

           
            &nbsp;
            <BiShare size={30} />
          </div>
         <h4>Likes: {count}</h4>
    </div>
    </div>
  );
}

export default Post;