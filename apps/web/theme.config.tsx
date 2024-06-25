import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import HeaderConnectButton from "./components/HeaderConnectButton";

const config: DocsThemeConfig = {
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath === "/") {
      return {
        titleTemplate: "World Association",
      };
    } else {
      return {
        titleTemplate: "%s | World Association",
      };
    }
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      "https://worldassociation.org" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    return (
      <>
        <meta property="og:url" content={url} />
        <meta
          property="og:title"
          content={frontMatter.title || "World Association"}
        />
        <meta
          property="og:description"
          content={
            frontMatter.description ||
            "The democratic United Nations alternative."
          }
        />
        <link
          rel="icon"
          href="/img/icons/favicon.ico"
          type="image/x-icon"
        ></link>
      </>
    );
  },
  logo: (
    <svg viewBox="0 0 600 600" width="38" height="38">
      <style>
        {`.s0 { fill: none;stroke: currentcolor;stroke-miterlimit:100;stroke-width: 100 }`}
      </style>
      <path
        id="Background"
        className="s0"
        d="m300 550c-138.3 0-250-111.8-250-250 0-138.3 111.7-250 250-250 138.2 0 250 111.7 250 250 0 138.2-111.8 250-250 250z"
      />
    </svg>
  ),
  project: {
    link: "https://github.com/worldassociation/world-association",
  },
  banner: {
    text: <span>Public preview. For demo and testing only.</span>,
  },
  navbar: {
    extraContent: <HeaderConnectButton />,
  },
  search: { placeholder: "Search..." },
  docsRepositoryBase:
    "https://github.com/worldassociation/world-association/tree/main/apps/docs",
  footer: {
    text: "World Association",
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
  },
  toc: {
    backToTop: true,
  },
  feedback: {
    content: "Share general feedback",
    labels: "user-feedback",
  },
  editLink: {
    text: "Edit this page on GitHub",
  },
  gitTimestamp: null,
  darkMode: false,
};

export default config;
