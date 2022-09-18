import React from "react";
import { ReactionData, updateDatabase } from "../../hooks/useReactionData";

const Reaction = ({ blogID, reaction, reactionData }) => {
  const { data, error } = ReactionData(reactionData, reaction, blogID);

  return (
    <div className="likes w-25 text-center">
      <button
        className="btn btn-outline-primary border-light w-75 text-light"
        onClick={() => {
          updateDatabase(
            {
              name: "John Paul",
              id: "ksjfs-sdfjkshdfui-4uh4uh4-4j3jn4u3",
            },
            blogID,
            reaction
          );
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
