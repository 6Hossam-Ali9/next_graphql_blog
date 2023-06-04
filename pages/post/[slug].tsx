import React from "react";
import { useRouter } from "next/router";
import type { GetStaticProps, GetStaticPaths } from "next";

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
} from "@/components";
import { getPosts, getPostDetails } from "@/services";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: any[] = await getPosts();
  console.log("path", posts);
  const paths = posts.map(({ node: { slug } }) => ({ params: { slug } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const data = await getPostDetails(params.slug);
  console.log("path", data);

  return {
    props: {
      post: data,
    },
  };
};

function PostDetails({ post }: any) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      {post ? (
        <div className="container mx-auto px-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
              <PostDetail post={post} />
              <Author author={post.author} />
              <CommentsForm slug={post.slug} />
              <Comments slug={post.slug} />
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="relative lg:sticky top-8">
                <PostWidget
                  slug={post.slug}
                  categories={post.categories.map(
                    (category: any) => category.slug
                  )}
                />
                <Categories postCategories={post.categories} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default PostDetails;
