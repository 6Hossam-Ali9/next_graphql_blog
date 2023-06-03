import React from "react";
import { useRouter } from "next/router";

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

export async function getStaticProps({ params }: any) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

export const getStaticPaths = async () => {
  const posts: any[] = await getPosts();
  const paths = posts.map(({ node: { slug } }) => ({ params: { slug } }));
  return {
    paths,
    fallback: true,
  };
};
function PostDetails({ post }: any) {
  const similarPosts: string[] = post.categories.map(
    (category: any) => category.slug
  );
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
                <PostWidget slug={post.slug} categories={similarPosts} />
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
