import { request, gql } from "graphql-request";
import { throttle } from "lodash";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = throttle(async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            excerpt
            slug
            title
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
}, 1000);

export const getPostDetails = throttle(async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        createdAt
        excerpt
        slug
        title
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.post;
}, 1000);

export const getRecentPosts = throttle(async () => {
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_ASC,
        last: 3
      ){
        title,
        slug,
        featuredImage{
          url
        },
        createdAt
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
}, 1000);

export const getRelatedPosts = throttle(async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
}, 1000);

export const getCategories = throttle(async () => {
  const query = gql`
    query GetCategories(){
      categories {
        slug
        name
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
}, 1000);

export const submitComment = throttle(async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
}, 1000);

export const getComments = throttle(async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        comment
        createdAt
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
}, 1000);

export const getCategoryPosts = throttle(async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
}, 1000);
