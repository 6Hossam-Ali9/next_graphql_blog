import { getComments } from "@/services";
import React, { useState, useEffect } from "react";
import moment from "moment";

interface commentsProps {
  slug: string;
}

function Comments({ slug }: commentsProps) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((res: any) => setComments(res));
  }, [slug]);

  return (
    <>
      <div className="bg-white p-8 shadow-lg rounded-lg pb-6 mb-8">
        <h3 className="text-xl font-bold pb-4 border-b mb-8">
          {comments.length}
          {`  `}
          Comments
        </h3>
        {comments.map((comment: any, i: any) => (
          <div key={i} className="border-b mb-4 pb-4">
            <p className="mb-4">
              <span className="font-semibold mr-3">{comment.name}</span>
              {moment(comment.createdAt).format("MMM DD, YYYY")}
            </p>
            <p className=" text-gray-600 w-full">{comment.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Comments;
