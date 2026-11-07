import React, { FC } from "react";
import Head from "next/head";

const Layout = ({ title, content, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="">{children}</div>
    </>
  );
};

export default Layout;
