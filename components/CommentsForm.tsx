import React, { useEffect, useState } from "react";
import { submitComment } from "@/services";

interface commentsFormProps {
  slug: string;
}

function CommentsForm({ slug }: commentsFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [storeData, setStoreData] = useState(true);

  useEffect(() => {
    const lastName = window.localStorage.getItem("name");
    if (lastName) setName(lastName);
    const lastEmail = window.localStorage.getItem("email");
    if (lastEmail) setEmail(lastEmail);
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (storeData) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }

    const commentBody = { name, email, comment, slug };

    submitComment(commentBody).then(() => {
      setSubmitted(true);
      setComment("");
      if (!storeData) {
        setName("");
        setEmail("");
      }
      setTimeout(() => {
        setSubmitted(false);
      }, 2500);
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
      <h2 className="text-lg border-b pb-4 mb-8 font-bold">Add Comment</h2>
      <form onSubmit={submitHandler} id="comment-form">
        <div className="grid grid-cols-1 mb-2">
          <textarea
            name="comment"
            className="p-4 bg-gray-100 mb-3 outline-none rounded-lg"
            placeholder="Comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            required
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 mb-2">
          <input
            name="name"
            className="px-4 py-2 bg-gray-100 mb-3 outline-none rounded-lg"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            name="email"
            className="px-4 py-2 bg-gray-100 mb-3 outline-none rounded-lg"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <input
              checked={storeData}
              onChange={(e) => setStoreData(e.target.checked)}
              type="checkbox"
              id="storeData"
              name="storeData"
            />
            <label
              className="text-gray-500 cursor-pointer ml-2"
              htmlFor="storeData"
            >
              Save my name, email in this browser for the next time I comment.
            </label>
          </div>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          >
            Post Comment
          </button>
          {submitted && (
            <p className=" font-semibold mt-4 text-start text-green-500 md:float-right">
              Comment submitted for review
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default CommentsForm;
