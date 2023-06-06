import Head from "next/head";
import { PostCard, PostWidget, Categories, Loader } from "@/components";
import { getPosts } from "@/services";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";

// export const getStaticProps: GetStaticProps = async () => {
//   const posts: any[] = await getPosts();

//   return {
//     props: {
//       posts,
//       fallback: true,
//     },
//     revalidate: 1,
//   };
// };

const posts: any[] = [
  {
    node: {
      author: {
        bio: "Eager to Learn different technologies in Web dev",
        id: "clid6v6lt0lvr0bw9ji3h05ah",
        name: "Hossam",
        photo: { url: "https://media.graphassets.com/NKTIahayTsmAIPDDkBHO" },
      },
      createdAt: "2023-06-01T13:53:41.138983+00:00",
      excerpt:
        "React testing is an essential part of building high-quality software with React. By testing your code, you can catch bugs before they make it into production and ensure that your application works as expected. In this article, we'll explore the basics of testing React components and discuss some best practices for writing effective tests.",
      slug: "react-testing",
      title: "React Testing",
      featuredImage: {
        url: "https://media.graphassets.com/dITLYXYPTiKX1n9DQcuZ",
      },
      categories: [
        { name: "Web Development", slug: "web-development" },
        { name: "React", slug: "react" },
      ],
    },
  },
  {
    node: {
      author: {
        bio: "Eager to Learn different technologies in Web dev",
        id: "clid6v6lt0lvr0bw9ji3h05ah",
        name: "Hossam",
        photo: { url: "https://media.graphassets.com/NKTIahayTsmAIPDDkBHO" },
      },
      createdAt: "2023-06-02T12:47:44.851746+00:00",
      excerpt:
        "Next.js is a popular open-source framework for building server-side rendered (SSR) React applications. It provides a number of features that make it easy to build fast, scalable, and SEO-friendly web applications.",
      slug: "nextjs",
      title: "Next.js is the future",
      featuredImage: {
        url: "https://media.graphassets.com/DDJY9gMoTW2vDjqw5Jrd",
      },
      categories: [{ name: "Web Development", slug: "web-development" }],
    },
  },
  {
    node: {
      author: {
        bio: "Eager to Learn different technologies in Web dev",
        id: "clid6v6lt0lvr0bw9ji3h05ah",
        name: "Hossam",
        photo: { url: "https://media.graphassets.com/NKTIahayTsmAIPDDkBHO" },
      },
      createdAt: "2023-06-03T19:52:51.472134+00:00",
      excerpt:
        "Exoplanets, or planets that orbit stars outside of our solar system, have been a subject of intense study in astronomy for decades. With the development of new technologies and observational techniques, astronomers have been able to discover thousands of exoplanets in recent years. But the search for exoplanets is far from over.",
      slug: "exoplanets",
      title: "The Search for Exoplanets",
      featuredImage: {
        url: "https://media.graphassets.com/Z842e2seSH6Z0i11Nm3y",
      },
      categories: [{ name: "Astronomy", slug: "astronomy" }],
    },
  },
  {
    node: {
      author: {
        bio: "Eager to Learn different technologies in Web dev",
        id: "clid6v6lt0lvr0bw9ji3h05ah",
        name: "Hossam",
        photo: { url: "https://media.graphassets.com/NKTIahayTsmAIPDDkBHO" },
      },
      createdAt: "2023-06-03T19:55:33.023716+00:00",
      excerpt:
        "Dark matter is a mysterious substance that makes up a significant portion of the matter in the universe, yet we know very little about it. Astronomers have been studying dark matter for decades, but it remains one of the biggest mysteries in astrophysics.",
      slug: "dark-matter",
      title: "The Mystery of Dark Matter",
      featuredImage: {
        url: "https://media.graphassets.com/RI4lnBTfRfWogs2RGgFp",
      },
      categories: [{ name: "Astronomy", slug: "astronomy" }],
    },
  },
  {
    node: {
      author: {
        bio: "Eager to Learn different technologies in Web dev",
        id: "clid6v6lt0lvr0bw9ji3h05ah",
        name: "Hossam",
        photo: { url: "https://media.graphassets.com/NKTIahayTsmAIPDDkBHO" },
      },
      createdAt: "2023-06-03T19:57:28.756488+00:00",
      excerpt:
        "Stars are some of the most fascinating objects in the universe, but they don't last forever. Like all things, stars have a life cycle, which includes birth, evolution, and eventually, death.\n\nArticle: Stars are born from clouds of gas and dust in space, which begin to collapse under their own gravity. As the cloud collapses, it begins to heat up and eventually reaches a temperature and density where nuclear fusion can occur, which generates the star's energy.",
      slug: "stars",
      title: "The Life Cycle of Stars",
      featuredImage: {
        url: "https://media.graphassets.com/ngIuyUYGSEWIzgNIig7n",
      },
      categories: [{ name: "Astronomy", slug: "astronomy" }],
    },
  },
  {
    node: {
      author: {
        bio: "Eager to Learn different technologies in Web dev",
        id: "clid6v6lt0lvr0bw9ji3h05ah",
        name: "Hossam",
        photo: { url: "https://media.graphassets.com/NKTIahayTsmAIPDDkBHO" },
      },
      createdAt: "2023-06-03T19:59:59.136821+00:00",
      excerpt:
        "Dark energy is a mysterious force that is thought to be responsible for the accelerating expansion of the universe. Despite its importance, very little is known about dark energy, and the search for this elusive force continues to be a major focus of research in astronomy.",
      slug: "dark-energy",
      title: "The Search for Dark Energy",
      featuredImage: {
        url: "https://media.graphassets.com/uz3Xklh7TWNPX6UohgcQ",
      },
      categories: [{ name: "Astronomy", slug: "astronomy" }],
    },
  },
  {
    node: {
      author: {
        bio: "Eager to Learn different technologies in Web dev",
        id: "clid6v6lt0lvr0bw9ji3h05ah",
        name: "Hossam",
        photo: { url: "https://media.graphassets.com/NKTIahayTsmAIPDDkBHO" },
      },
      createdAt: "2023-06-03T22:09:45.592832+00:00",
      excerpt:
        "Playing sports is a great way to stay active and healthy, but did you know that playing team sports can be even more beneficial for your health? In this article, we will explore 5 reasons why playing team sports can have a positive impact on your physical and mental well-being.",
      slug: "team-sports",
      title: "Benefits of Playing Team Sports",
      featuredImage: {
        url: "https://media.graphassets.com/GRqajfseRvqrDAR6ORp3",
      },
      categories: [{ name: "Sports", slug: "sports" }],
    },
  },
  {
    node: {
      author: {
        bio: "Eager to Learn different technologies in Web dev",
        id: "clid6v6lt0lvr0bw9ji3h05ah",
        name: "Hossam",
        photo: { url: "https://media.graphassets.com/NKTIahayTsmAIPDDkBHO" },
      },
      createdAt: "2023-06-03T23:56:52.034825+00:00",
      excerpt:
        "From the songs of birds to the dances of bees, animals use a variety of methods to convey information to others of their species. But communication isn't just limited to species-specific signals; animals also use body language, scent, and even electrical signals to communicate with each other.",
      slug: "fascinating-world",
      title: "The Fascinating World of Animal Communication",
      featuredImage: {
        url: "https://media.graphassets.com/28KJs6HqRDqupPuhoNWf",
      },
      categories: [{ name: "Zoology", slug: "zoology" }],
    },
  },
  {
    node: {
      author: {
        bio: "Eager to Learn different technologies in Web dev",
        id: "clid6v6lt0lvr0bw9ji3h05ah",
        name: "Hossam",
        photo: { url: "https://media.graphassets.com/NKTIahayTsmAIPDDkBHO" },
      },
      createdAt: "2023-06-04T00:00:21.555621+00:00",
      excerpt:
        "Zoologists work tirelessly in zoos to breed endangered species, conduct research, and educate the public about the importance of conservation. Zoos are also important for protecting animals from habitat destruction and poaching.",
      slug: "zoos",
      title: "The Importance of Zoos in Conservation",
      featuredImage: {
        url: "https://media.graphassets.com/yulPex1mRLCFFUui90B8",
      },
      categories: [{ name: "Zoology", slug: "zoology" }],
    },
  },
  {
    node: {
      author: {
        bio: "Eager to Learn different technologies in Web dev",
        id: "clid6v6lt0lvr0bw9ji3h05ah",
        name: "Hossam",
        photo: { url: "https://media.graphassets.com/NKTIahayTsmAIPDDkBHO" },
      },
      createdAt: "2023-06-04T11:43:45.572837+00:00",
      excerpt:
        "Playing sports is one of the best ways to stay active and healthy. Whether you're a seasoned athlete or just starting out, there are numerous benefits to be gained from participating in sports. From physical benefits like improved fitness and strength to mental and emotional benefits like reduced stress and increased self-confidence, sports can have a positive impact on every aspect of your life. In this article, we'll explore some of the key benefits of playing sports, and why everyone should consider incorporating physical activity into their daily routine.",
      slug: "sport-benefits",
      title: "The Benefits of Playing Sports: Why Everyone Should Get Active",
      featuredImage: {
        url: "https://media.graphassets.com/wAr3lFgcT5yk2QWctjFl",
      },
      categories: [{ name: "Sports", slug: "sports" }],
    },
  },
];

export default function Home() {
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
