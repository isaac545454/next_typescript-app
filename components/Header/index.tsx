import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/logo.svg";
import { ActiveLink } from "../ActiveLink";

export const Header = () => {
  return (
    <header
      className="h-24 border-b border-gray-300 w-[100vw] bg-[#15171b] 
    max-[870px]:h-44  max-[870px]:py-2"
    >
      <div
        className="max-w-[1120px] h-24 mx-auto px-8 flex items-center  
      max-[870px]:flex  max-[870px]:flex-col"
      >
        <ActiveLink href="/" activeClassName="">
          <Image
            src={logo}
            width="150"
            height="150"
            alt="ola"
            className="cursor-pointer"
          />
        </ActiveLink>
        <nav className="h-24 ml-20 text-gray-400 max-[600px]:ml-1">
          <button className="inline-block relative px-2 h-24 hover:text-white transition-colors">
            <ActiveLink href="/" activeClassName=".active">
              <p>Home</p>
            </ActiveLink>
          </button>
          <button className="inline-block relative px-2 h-24 ml-8 hover:text-white transition-colors">
            <ActiveLink href="/posts" activeClassName="text-black">
              <p>Conteudos</p>
            </ActiveLink>
          </button>
          <button className="inline-block relative px-2 h-24 ml-8 hover:text-white transition-colors">
            <ActiveLink href="/about" activeClassName="text-white">
              <p>About</p>
            </ActiveLink>
          </button>
        </nav>
        <a
          type="button"
          href="https://www.linkedin.com/in/isaac-gomes-crmservices/"
          className="ml-auto h-12 rounded-[3rem] px-6  flex justify-center
           items-center bg-blue-primary text-white font-bold hover:bg-blue-500 
           transition-colors  max-[870px]:hidden"
        >
          COMEÇAR
        </a>
      </div>
    </header>
  );
};
