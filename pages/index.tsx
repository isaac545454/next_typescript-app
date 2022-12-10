import Head from "next/head";
import Image from "next/image";
import techsImage from "../public/images/techs.svg";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

type Content = {
  title: string;
  subTitle: string;
  mobile: string;
  mobileSubTitle: string;
  webtitle: string;
  webSubTitle: string;
  webBanner: string;
};

interface Props {
  content: Content;
}

export default function Home({ content }: Props) {
  console.log(content);

  return (
    <>
      <Head>
        <title>Sujeito programador</title>
      </Head>
      <main className="block">
        <div
          className="min-h-[cal(95vh] max-w-[1120px] mx-auto flex justify-center items-center
           max-[600px]:flex-col max-[600px]:text-center"
        >
          <section className="max-w-[600px] max-[600px]:w-[90vw] max-[600px]:flex max-[600px]:flex-col">
            <h1 className="text-5xl font-bold mt-10 mb-6 text-white leading-10">
              {content.title}
            </h1>
            <span className="text-base  text-gray-300  ">
              {content.subTitle}
            </span>
            <a href="https://www.linkedin.com/in/isaac-gomes-crmservices/">
              <button className="bg-blue-primary  py-4 px-7 mt-10 rounded-xl text-white font-bold">
                COMEÇAR AGORA!
              </button>
            </a>
          </section>

          <img
            src="/images/banner-conteudos.png"
            alt="aa"
            className="max-w-[640px] max-[600px]:w-[80vw]"
          />
        </div>
        <hr className="" />
        <div
          className="my-24 mx-auto max-w-[1120px] flex justify-center items-center
         max-[600px]:flex-col max-[600px]:text-center"
        >
          <section className="max-w-[600px] mr-4">
            <h2 className="text-white mb-6 text-4xl font-bold leading-10">
              {content.mobile}
            </h2>
            <span className="text-gray-300 text-base ">
              {content.mobileSubTitle}
            </span>
          </section>
          <img
            src={content.webBanner}
            alt="desenvolvimento de apps com react native"
            className="max-w-[600px] max-[600px]:w-[50vw] max-[600px]:mt-10"
          />
        </div>
        <hr className="" />
        <div
          className="my-24 mx-auto max-w-[1120px] flex justify-center items-center 
        max-[600px]:flex-col-reverse max-[600px]:text-center"
        >
          <img
            src="/images/webDev.png"
            alt="desenvolvimento de apps com react native"
            className="max-w-[600px]  max-[600px]:w-[50vw]  max-[600px]:mt-10"
          />
          <section className="max-w-[600px] ml-4 max-[600px]:max-w-[80vw]">
            <h2 className="text-white mb-6 text-4xl font-bold leading-10">
              {content.webtitle}
            </h2>
            <span className="text-gray-300 text-base ">
              {" "}
              {content.webSubTitle}
            </span>
          </section>
        </div>
        <footer className=" max-w-[1120px] mx-auto mb-20 flex flex-col max-[600px]:max-w-[90vw]">
          <Image
            src={techsImage}
            alt="tecnologias do desenvolvimento"
            width="300"
            height="100"
          />
          <h2 className="font-bold text-white text-4xl max-w-[760px] mb-6 mt-3 leading-10">
            Mais de
            <span className="text-blue-primary"> 15 mil </span>
            já levaram sua carreira ao próximo nivel.
          </h2>
          <span className="text-gray-300">
            E você vai perder a chance de evoluir de uma vez por todas?
          </span>
          <a href="">
            <button className="text-white mt-8 bg-blue-primary px-10 py-4 font-bold rounded-md">
              ACESSAR TURMA
            </button>
          </a>
        </footer>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at("document.type", "home"),
  ]);

  const {
    title,
    subtitle,
    mobile,
    mobilecontent,
    mobilebanner,
    webtitle,
    websubtitle,
    webbanner,
  } = response.results[0].data;

  const content: any = {
    title: RichText.asText(title),
    subTitle: RichText.asText(subtitle),
    mobile: RichText.asText(mobile),
    mobileSubTitle: RichText.asText(mobilecontent),
    webtitle: RichText.asText(webtitle),
    webSubTitle: RichText.asText(websubtitle),
    webBanner: webbanner.url,
  };

  console.log(content);

  return {
    props: {
      content,
    },
    revalidate: 60 * 2,
  };
};
