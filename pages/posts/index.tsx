import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { GetStaticProps } from "next";
import { useState } from "react";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

interface Props {
  posts: TypePosts[];
  page: string;
  totalpages: string;
}

type TypePosts = {
  slug: string;
  title: string;
  cover: string;

  updatedAt: string;
};

const Posts = ({ posts: postBlog, totalPages, page }: Props) => {
  const [posts, setPosts] = useState(postBlog || []);
  const [currentPage, setCurrentPage] = useState(Number(page));

  const navigatePage = async (page: number) => {
    const response = await reqPost(page);
    if (response.results.length === 0) return;

    const getPosts = response.results.map((post) => {
      console.log(post);

      return {
        slug: post.uid,
        title: RichText.asText(post.data.title),
        // description: RichText.asText(post.data.description),
        cover: post.data.cover.url,
        updatedAt: new Date(post.last_publication_date).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        ),
      };
    });
    setCurrentPage(page);
    setPosts(getPosts);
  };

  //buscar novos posts
  const reqPost = async (req: number) => {
    const prismic = getPrismicClient();
    const response = await prismic.query(
      [Prismic.Predicates.at("document.type", "post")],
      {
        orderings: "[document.last_publication_date desc]",
        fetch: ["post.title", "post.description", "post.cover"],
        pageSize: 1,
        page: String(req),
      }
    );
    return response;
  };

  return (
    <>
      <Head>
        <title>Blog Sujeito programador </title>
      </Head>
      <main className="max-w-[1120px] mx-auto px-8">
        <div className="max-w-[500px] my-20 mx-auto">
          {posts.map((post) => (
            <Link
              href={`/posts/${post.slug}`}
              className="block mt-8 pt-8"
              key={post.id}
            >
              <Image
                src={post.cover}
                width={220}
                height={220}
                alt={post.title}
                quality={100}
                className="mx-auto"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPUqwcAAOEArzGi5DEAAAAASUVORK5CYII="
              />
              <strong className="block text-xl my-8 text-white hover:text-blue-primary transition-colors">
                {post.title}
              </strong>
              <time className="text-gray-300 flex text-base items-center ">
                {post.updatedAt}
              </time>
              <p className="text-white mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                fugit quisquam cumque magni dolores quod maxime similique a
                autem! Similique corrupti molestias sunt, ullam reprehenderit
                aut harum recusandae sequi magni.
              </p>
            </Link>
          ))}

          <div className="mt-8 flex  items-center flex-row justify-between max-w-[1120px]">
            <div className="flex">
              {Number(currentPage) >= 2 && (
                <>
                  <button
                    className="mx-2 bg-blue-primary p-2 flex rounded"
                    onClick={() => navigatePage(1)}
                  >
                    <FiChevronsLeft size={25} color="#fff" />
                  </button>
                  <button
                    className="mx-2 bg-blue-primary p-2 flex rounded"
                    onClick={() => navigatePage(Number(currentPage - 1))}
                  >
                    <FiChevronLeft size={25} color="#fff" />
                  </button>
                </>
              )}
            </div>

            <div className="flex">
              {Number(currentPage) < Number(totalPages) && (
                <>
                  <button
                    className="mx-2 bg-blue-primary p-2 flex rounded"
                    onClick={() => navigatePage(Number(currentPage + 1))}
                  >
                    <FiChevronRight size={25} color="#fff" />
                  </button>
                  <button
                    className="mx-2 bg-blue-primary p-2 flex rounded"
                    onClick={() => navigatePage(Number(totalPages))}
                  >
                    <FiChevronsRight size={25} color="#fff" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.Predicates.at("document.type", "post")],
    {
      orderings: "[document.last_publication_date desc]",
      fetch: ["post.title", "post.description", "post.cover"],
      pageSize: 1,
    }
  );

  const posts = response.results.map((post) => {
    console.log(post);

    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      //description: RichText.asText(post.data.textarea),
      cover: post.data.cover.url,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: {
      posts,
      page: response.page,
      totalPages: response.total_pages,
    },
    revalidate: 60 * 30,
  };
};
