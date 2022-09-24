import React from "react";
import { ReactionData, updateDatabase } from "../../hooks/useReactionData";
import "../css/reaction.css";
import { Like } from "../../classes/like";
import { Comment } from "../../classes/comment";
// import { Share } from "../../classes/share";

const Reaction = ({ blog, reaction, reactionData, userData }) => {
  const { data, changeMonitor, setChangeMonitor, setData } = ReactionData(
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

  const isLiked = data.find((reaction) => reaction.email === email);

  return (
    <div className={`${reaction} w-25 text-center`}>
      <button
        className={
          isLiked
            ? `btn btn-primary border-light w-75 text-light ${reaction}`
            : `btn btn-outline-primary border-light w-75 text-light ${reaction}`
        }
        onClick={(e) => {
          e.target.classList.contains("likes")
            ? handleLike(data, like, blog, reaction, setData)
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

async function handleLike(data, newLike, blog, reaction, setData) {
  try {
    if (data) {
      const likeMatched = data.find((like) => like.email === newLike.email);

      if (likeMatched) {
        updateDatabase(newLike, blog, reaction, "DELETE", setData);
        console.log("post unliked...");
        return;
        // throw new Error("you have already liked this post...");
      }

      updateDatabase(newLike, blog, reaction, "UPDATE");
    }
  } catch (error) {
    console.log(error.message);
  }
}
