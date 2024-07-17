import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import useShowToast from "../../Hooks/useShowtoast";
import "./Footer.scss";
import usePostComment from "../../Hooks/usePostComment";
import useLikeposts from "../../Hooks/useLikeposts";
import useGetuserbyUseId from "../../Hooks/useGetuserbyUseId";
import CommentsModal from "../../Modals/CommentsModal";

const Feedfooter = ({ post }) => {
  const posts = useSelector((state) =>
    state.FetchedPosts.find((p) => p.id === post.id)
  );
  const {showToast}=useShowToast();
  const { handleLikePost, isLiked, likes } = useLikeposts(post);
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const authUser = useSelector((state) => state.user);
  const { isLoading, userProfile } = useGetuserbyUseId(post.createdBy);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>User not found</div>;
  }

  const handleSubmitComment = async () => {
    await handlePostComment(posts.id, comment);
    setComment(""); 
    showToast("hello",comment,"bye")
  };

  return (
    <>
      <div className="d-flex flex-column my-0">
        <div className="d-flex my-2 gap-3">
          <div className="" role="button" onClick={handleLikePost}>
            {isLiked ? <UnlikeLogo /> : <NotificationsLogo />}
          </div>
          <div onClick={handleOpen}>
            <CommentLogo />
          </div>
        </div>
        <div>
          <span style={{ fontSize: "14px", fontWeight: "500" }}>
            {likes} likes
          </span>
          <div>
            <span
              className="text"
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              {userProfile.username}
            </span>
            <span
              className="text"
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              __{posts.caption}
            </span>
            <div>
              <span
                className="text"
                style={{ fontSize: "14px", color: "grey", cursor: "pointer" }}
                onClick={handleOpen}
              >
                View all {posts.comments.length} comments
              </span>
            </div>
          </div>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Add a comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              style={{
                textDecoration: "none",
                backgroundColor: "black",
                boxShadow: "none",
                color: "white",
                border: "none",
                borderBottom: "solid 1px grey",
                borderRadius:"0"
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
                borderRadius:"0"
              }}
              disabled={isCommenting}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      {open && (
        <CommentsModal
          key={posts.comments.length} // Ensure modal re-renders when comments change
          open={open}
          onClose={handleClose}
          posts={posts}
        />
      )}
    </>
  );
};

export default Feedfooter;
