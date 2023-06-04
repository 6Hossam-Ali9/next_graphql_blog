import Head from "next/head";
import { PostCard, PostWidget, Categories, Loader } from "@/components";
import { getPosts } from "@/services";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const posts: any[] = await getPosts();

  return {
    props: {
      posts,
      fallback: true,
    },
    revalidate: 1,
  };
};

export default function Home({ posts }: any) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto px-10 mb-8 ">
      <Head>
        <title>GraphQl Blog App</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post: any) => (
            <PostCard post={post.node} key={post.node.slug} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget posts={posts} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
