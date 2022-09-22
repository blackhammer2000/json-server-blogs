import React from "react";
import { ReactionData, updateDatabase } from "../../hooks/useReactionData";
import "../css/reaction.css";
import { Like } from "../../classes/like";
import { Comment } from "../../classes/comment";
// import { Share } from "../../classes/share";

const Reaction = ({ blog, reaction, reactionData, userData }) => {
  const { data, changeMonitor, setChangeMonitor } = ReactionData(
    reactionData,
    reaction,
    blog.id
  );

  const { name, email } = userData;

  const like = new Like(name, email);
  const comment = new Comment(
    name,
    email,
    "JSDKHDSLAHH;kd.bhskhfkb,hf,dhsbvmaddjfkhdddddddbgjdfhbvfhs"
  );
  // const share = new Share();

  return (
    <div className="likes w-25 text-center">
      <button
        className={`btn btn-outline-primary border-light w-75 text-light ${reaction}`}
        onClick={(e) => {
          e.target.classList.contains("likes")
            ? handleLike(data, like, blog, reaction, userData)
            : e.target.classList.contains("comments")
            ? updateDatabase(comment, blog, reaction)
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
/////EVENT HANDLERS

async function handleLike(data, like, blog, reaction, userData) {
  try {
    if (data) {
      const likeMatched = data.find((like) => like.email === userData.email);

      if (likeMatched === null || undefined) {
        updateDatabase(like, blog, reaction);
      } else {
        // console.log("you have already liked this post...");
        throw new Error("you have already liked this post...");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default Reaction;
