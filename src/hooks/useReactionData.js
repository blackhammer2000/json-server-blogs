import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export function ReactionData(currentData, reaction, blogID) {
  const [data, setData] = useState(currentData);
  const [changeMonitor, setChangeMonitor] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`http://localhost:8000/blogs/${blogID}`);

        if (!response.ok) {
          throw new Error("Server Error, Could Not Find Resources");
        }

        const responseInfo = await response.json();
        if (responseInfo) {
          setData(responseInfo.reactions[reaction]);
          console.log(responseInfo.reactions[reaction]);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    })();
  }, [changeMonitor]);

  return { data, error, changeMonitor, setChangeMonitor };
}

export async function updateDatabase(newData, blog, reaction, requestMethod) {
  const allReactions = blog.reactions;

  if (requestMethod === "PATCH") {
    allReactions[reaction].push(newData);
  } else {
    const duplicateLike = allReactions[reaction].find(
      (reaction) => reaction.email === newData.email
    );
    allReactions[reaction].splice(
      allReactions[reaction].indexOf(duplicateLike),
      1
    );
  }

  let requestConfigurations = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reactions: allReactions,
    }),
  };

  try {
    console.log(blog.reactions[reaction]);
    const res = await fetch(
      `http://localhost:8000/blogs/${blog.id}`,
      requestConfigurations
    );

    if (!res.ok) {
      throw new Error(
        `Server Error, Could Not Find Resources To ${requestMethod}...`
      );
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
    // setError(error.message);
    return { error: error.message };
  }
}
