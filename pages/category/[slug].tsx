import React from "react";
import { useRouter } from "next/router";
import type { GetStaticProps, GetStaticPaths } from "next";

import { getCategories, getCategoryPosts } from "@/services";
import { PostCard, Categories, Loader } from "@/components";

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: any[] = await getCategories();
  const paths = categories.map(({ slug }) => ({ params: { slug } }));
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const posts = await getCategoryPosts(params.slug);

  return {
    props: { posts },
    // revalidate: 1,
  };
};

const CategoryPost = ({ posts }: any) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container px-10 mb-8 mx-auto">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post: any, i: any) => (
            <PostCard post={post.node} key={i} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;
