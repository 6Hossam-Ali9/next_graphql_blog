This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Technologies Used

Nextjs, GraphQl and styles using Tailwind
Also, used "Lodash" library for throttling my API requests as hygraph has a very low number of requests just use it on each request in the dev mode, and "moment" library for formatting the dates

## Usage

This project is a blog app that can only be modified by me using hygraph, you can see the blogs move to any blog, you can go to a certain category and also in each blog you can see its categories and the related blogs, you can submite a comment for review so, I can publish it later.

The project is SSG and the fallback is true which means if I made any change in the posts it will reflect directly on the blog app.

There is an error with minified react and after investigating it's because a change between something in the server rendering and client rendering like (Date), you can just ignore it, and there might be an error of many requests because the limit of requests on GraphCMS.

## Deployment

You can have a look on the website from [here](https://next-graphql-blog-pi.vercel.app/) and also leave a comment so I can see it and publish it
