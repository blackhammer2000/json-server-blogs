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
        className="btn btn-outline-primary border-light w-75 text-light"
        data_reaction={reaction}
        onClick={(e) => {
          e.target.data_reaction === "likes"
            ? updateDatabase(
                {
                  name: "John Paul",
                  email: "waweruzamuel@gmail.com",
                  id: crypto.randomUUID(),
                },
                blog,
                reaction
              )
            : e.target.data_reaction === "comments"
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
                    total_shares: 0,
                  },
                },
                blog,
                reaction
              );

          setChangeMonitor(!changeMonitor);
        }}
      >
        {reaction === "likes" ? (
          <i className="fa fa-thumbs-up"></i>
        ) : reaction === "comments" ? (
          <i className="fa fa-comment"></i>
        ) : (
          <i className="fa fa-share"></i>
        )}

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
