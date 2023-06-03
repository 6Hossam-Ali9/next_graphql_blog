import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getRelatedPosts } from "@/services";

const PostWidget = ({ categories, slug }: any) => {
  const [recentPosts, setRecentPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getRelatedPosts(categories, slug).then((result: any) =>
        setRecentPosts(result)
      );
    } else {
      getRecentPosts().then((result: any) => setRecentPosts(result));
    }
  }, [slug, categories]);
  return (
    <div className="bg-white sahdow-lg rounded-lg p-8 mb-8">
      <h3 className="border-b pb-4 mb-8 font-bold text-xl">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {recentPosts.map((post: any) => (
        <div key={post.slug} className="flex w-full items-center mb-4">
          <div className="w-16 flex-none">
            <Image
              width={60}
              height={60}
              src={post.featuredImage.url}
              alt={post.title}
              className="rounded-full align-middle"
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
