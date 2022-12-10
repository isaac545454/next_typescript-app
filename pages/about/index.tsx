import React from "react";
import Image from "next/image";

export default function Abolt() {
  return (
    <div className="max-w-[1120px] mx-auto mt-10 flex flex-col items-center">
      <Image
        src="https://media-exp1.licdn.com/dms/image/D4D03AQGSrA0NXDOTMg/profile-displayphoto-shrink_400_400/0/1669745689378?e=1675900800&v=beta&t=XfQgQahIL4yu1b8njv8CfngyhGr_zRCfJyf7htgi05g"
        width="300"
        height="300"
        alt="isaac"
        className="rounded-full"
      />
      <a
        className="text-white font-bold mt-4 text-2xl"
        href="https://www.linkedin.com/in/isaac-gomes-crmservices/"
      >
        Linkedin
      </a>
    </div>
  );
}
