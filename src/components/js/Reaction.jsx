import React from "react";
import { ReactionData, updateDatabase } from "../../hooks/useReactionData";
import "../css/reaction.css";

const Reaction = ({ blog, reaction, reactionData }) => {
  const { data, changeMonitor, setChangeMonitor } = ReactionData(
    reactionData,
    reaction,
    blog.id
  );
  //   const userData = JSON.parse(localStorage.getItem("blogs-user-data"));

  return (
    <div className="likes w-25 text-center">
      <button
        className={`btn btn-outline-primary border-light w-75 text-light ${reaction}`}
        onClick={(e) => {
          e.target.classList.contains("likes")
            ? updateDatabase(
                {
                  name: "John Paul",
                  email: "waweruzamuel@gmail.com",
                  id: crypto.randomUUID(),
                },
                blog,
                reaction
              )
            : e.target.classList.contains("comments")
            ? updateDatabase(
                {
                  name: "John Paul",
                  email: "waweruzamuel@gmail.com",
                  id: crypto.randomUUID(),
                  comment: {
                    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, atque? Id nisi recusandae repellat qui iure.",
                    replies: [],
                    comment_ID: crypto.randomUUID(),
                  },
                },
                blog,
                reaction
              )
            : updateDatabase(
                {
                  name: "John Paul",
                  email: "waweruzamuel@gmail.com",
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
          data_reaction={reaction}
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
