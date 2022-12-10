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
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

interface Props {
  posts: TypePosts[];
}

type TypePosts = {
  slug: string;
  title: string;
  cover: string;

  updatedAt: string;
};

const Posts = ({ posts }: Props) => {
  console.log(posts);

  return (
    <>
      <Head>
        <title>Blog Sujeito programador </title>
      </Head>
      <main className="max-w-[1120px] mx-auto px-8">
        <div className="max-w-[720px] my-20 mx-auto">
          <Link href="/" className="block mt-8 pt-8">
            <Image
              src="/images/thumb.png"
              width={720}
              height={410}
              alt="texto 1"
              quality={100}
            />
            <strong className="block text-xl my-8 text-white hover:text-blue-primary transition-colors">
              Criando meu primeiro aplicativo
            </strong>
            <time className="text-gray-300 flex text-base items-center ">
              14 JULHO 2021
            </time>
            <p className="text-white mt-2">
              Hoje vamos criar o controle de mostrar a senha no input, uma opção
              para os nossos formulários de cadastro e login. Mas chega de
              conversa e bora pro código junto comigo que o vídeo está show de
              bola!
            </p>
          </Link>

          <div className="mt-8 flex  items-center flex-row justify-between max-w-[1120px]">
            <div className="flex">
              <button className="mx-2 bg-blue-primary p-2 flex rounded">
                <FiChevronsLeft size={25} color="#fff" />
              </button>
              <button className="mx-2 bg-blue-primary p-2 flex rounded">
                <FiChevronLeft size={25} color="#fff" />
              </button>
            </div>
            <div className="flex">
              <button className="mx-2 bg-blue-primary p-2 flex rounded">
                <FiChevronRight size={25} color="#fff" />
              </button>
              <button className="mx-2 bg-blue-primary p-2 flex rounded">
                <FiChevronsRight size={25} color="#fff" />
              </button>
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
      pageSize: 2,
    }
  );

  const posts = response.results.map((post) => {
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

  return {
    props: {
      posts,
    },
    revalidate: 60 * 30,
  };
};
