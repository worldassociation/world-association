import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>World Association</span>,
  project: {
    link: "https://github.com/worldassociation/world-association",
  },
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
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
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
};

export default config;
