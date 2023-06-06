import React from "react";
import { useRouter } from "next/router";
import type {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

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
        <h1 className="text-center pt-40 w-full">404 | Not Found!</h1>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: any[] = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any> = async ({
  params,
}: GetStaticPropsContext) => {
  const post = await getPostDetails(params?.slug);
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

export default PostDetails;
