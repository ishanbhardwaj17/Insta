import React from "react";

const Post = ({ post }) => {
  const user = post.user || {};

  return (
    <div className="post">
      <div className="user">
        <div className="img-wrapper">
          <img src={user.profileImage} alt="profile" />
        </div>
        <p>{user.username}</p>
      </div>

      <img src={post.imgUrl} alt="post" />

      <div className="icons">
        <div className="left">
          <button>
            <svg
              className={post.isLiked ? "like" : ""}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736..." />
            </svg>
          </button>
        </div>
      </div>

      <div className="bottom">
        <p className="caption">{post.caption}</p>
      </div>
    </div>
  );
};

export default Post;