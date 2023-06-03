import React from "react";
import Image from "next/image";

interface author {
  bio: string;
  id: string;
  name: string;
  photo: {
    url: string;
  };
}

interface authorProps {
  author: author;
}

function Author({ author }: authorProps) {
  return (
    <div className="mt-20 text-white bg-black p-12 mb-8 relative shadow-lg rounded-lg bg-opacity-20 text-center">
      <div className="absolute right-0 left-0  -top-14 mb-4">
        <Image
          src={author.photo.url}
          alt={author.name}
          width={100}
          height={100}
          className="rounded-full mx-auto"
        />
      </div>
      <h2 className="font-bold text-xl my-6 ">{author.name}</h2>
      <p className="">{author.bio}</p>
    </div>
  );
}

export default Author;
