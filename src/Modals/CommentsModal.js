import React, { useEffect, useRef } from "react";
import Comment from '../Components/Comments/Comment'
import usePostComment from "../Hooks/usePostComment";
import "./CommentsModal.scss";
import { useDispatch } from "react-redux";
import { FetchPosts } from "../Redux/FetchPostsslice";

const CommentsModal = ({ open, onClose, posts }) => {
  const { handlePostComment, isCommenting } = usePostComment();
  const commentRef = useRef(null);
  const commentsContainerRef = useRef(null);
  
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    await handlePostComment(posts.id, commentRef.current.value);
  
    //commentRef.current.value = "";
  };
  const dispatch=useDispatch();

  useEffect(() => {
    const scrollToBottom = () => {
      if (commentsContainerRef.current) {
        commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
      }
    };

    if (open) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [open, posts.comments.length]);

  if (!open) return null;
  if (!posts || !posts.comments) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="text-center">Comments</h2>
          <button className="modal-close" style={{color:"white"}}onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body" ref={commentsContainerRef}>
          {posts.comments.map((comment, idx) => (
            <Comment key={idx} comment={comment} />
          ))}
        </div>
        <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Comment"
              ref={commentRef}
              style={{
                textDecoration: "none",
                backgroundColor: "black",
                boxShadow: "none",
                color: "white",
                border: "none",
                borderBottom: "solid 1px grey",
              }}
            />
            <button
              className="input-group-text"
              id="basic-addon2"
              onClick={handleSubmitComment}
              style={{
                textDecoration: "none",
                backgroundColor: "black",
                boxShadow: "none",
                color: "white",
                border: "none",
                borderBottom: "solid 1px grey",
              }}
              disabled={isCommenting}
            >{isCommenting ? "Posting..." : "Post"}</button>
            </div>
      </div>
    </div>
  );
};

export default CommentsModal;