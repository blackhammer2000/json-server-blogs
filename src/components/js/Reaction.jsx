import React from "react";
import { ReactionData, updateDatabase } from "../../hooks/useReactionData";
import "../css/reaction.css";
import { Like } from "../../classes/like";
// import { Comment } from "../../classes/comment";
// import { Share } from "../../classes/share";

const Reaction = ({ blog, reaction, reactionData, userData }) => {
  const { data, changeMonitor, setChangeMonitor, setData } = ReactionData(
    reactionData,
    reaction,
    blog.id
  );

  const isLiked = data.find(
    (dbReaction) => dbReaction.email === userData.email
  );

  return (
    <div className={`${reaction} w-25 text-center`}>
      <button
        className={
          isLiked && reaction === "likes"
            ? `btn btn-primary border-light w-75 text-light ${reaction}`
            : `btn btn-outline-primary border-light w-75 text-light ${reaction}`
        }
        onClick={(e) => {
          e.target.classList.contains("likes")
            ? handleLike(isLiked, blog, reaction, setData, userData)
            : e.target.classList.contains("comments")
            ? e.target.parentElement.parentElement.nextElementSibling.classList.toggle(
                "d-flex"
              )
            : updateDatabase(
                {
                  ...userData,
                  id: crypto.randomUUID(),
                  shares: {
                    facebook: 0,
                    twitter: 0,
                    instagram: 0,
                  },
                  total_shares: 0,
                },
                blog,
                reaction
              );

          setChangeMonitor(!changeMonitor);
          // updateDatabase(comment, blog, reaction, "UPDATE", setData)
        }}
      >
        <i
          className={
            reaction === "likes"
              ? `fa fa-thumbs-up ${reaction}`
              : reaction === "comments"
              ? `fa fa-comment ${reaction}`
              : `fa fa-share ${reaction}`
          }
        ></i>

        <span className="likes-count count font-weight-bold ml-2">
          {data.length
            ? data.length < 1000
              ? data.length
              : `${data.length / 1000}K`
            : null}
        </span>
      </button>
    </div>
  );
};

export default Reaction;
/////EVENT HANDLERS

async function handleLike(isLiked, blog, reaction, setData, userData) {
  try {
    const { name, email } = userData;
    const newLike = new Like(name, email);

    if (isLiked) {
      updateDatabase(newLike, blog, reaction, "DELETE", setData);
      console.log("post unliked...");
      // throw new Error("you have already liked this post...");
    } else {
      updateDatabase(newLike, blog, reaction, "UPDATE", setData);
    }
  } catch (error) {
    console.log(error.message);
  }
}
