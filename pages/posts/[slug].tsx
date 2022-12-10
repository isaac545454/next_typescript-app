import React from "react";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import { GetServerSideProps } from "next";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

interface Props {
  post: Post;
}

type Post = {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  cover: string;
};

export default function slug({ post }: Props) {
  console.log(post);

  return (
    <>
      <Head>
        <title>Detalhes</title>
      </Head>
      <div className="text-white max-w-[1120px] mx-auto">
        <div className="flex justify-center mt-10 flex-col items-center">
          <Image src={post.cover} width={350} height={350} alt={post.title} />
          <p className="mt-6 font-bold text-2xl mx-auto text-center">
            {post.title}
          </p>
          <div className="pt-10 max-w-[500px] mx-auto text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At
            similique quisquam, quia ad corporis labore consequuntur numquam
            magnam ea modi laudantium provident totam quae distinctio optio
            voluptatum id dolore? Explicabo?
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { slug } = params;

  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID("post", String(slug), {});

  if (!response) {
    return {
      redirect: {
        destination: "/posts",
        permanent: false,
      },
    };
  }

  const post = {
    slug: slug,
    title: RichText.asText(response.data.title),
    description: RichText.asHtml(response.data.textarea),
    cover: response.data.cover.url,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
  };
};
