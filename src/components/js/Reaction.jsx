import React from "react";
import { ReactionData, updateDatabase } from "../../hooks/useReactionData";
import "../css/reaction.css";
import { Like } from "../../classes/like";
import { Comment } from "../../classes/comment";

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

  return (
    <div className="likes w-25 text-center">
      <button
        className={`btn btn-outline-primary border-light w-75 text-light ${reaction}`}
        onClick={(e) => {
          e.target.classList.contains("likes")
            ? updateDatabase(like, blog, reaction)
            : e.target.classList.contains("comments")
            ? updateDatabase(comment, blog, reaction)
            : updateDatabase(
                {
                  ...userData,
                  id: crypto.randomUUID(),
                  shares: {
                    facebook: [],
                    twitter: [],
                    instagram: [],
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

  /////EVENT HANDLERS
};

export default Reaction;
