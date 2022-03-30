import Head from "next/head";
import styles from "../styles/Home.module.css";
import ContainerBlock from "../components/ContainerBlock";
import FavoriteProjects from "../components/FavoriteProjects";
import LatestCode from "../components/LatestCode";
import Hero from "../components/Hero";
import getLatestRepos from "@lib/getLatestRepos";
import userData from "@constants/data";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home({ repositories }) {
  return (
    <ContainerBlock
      title="Developer, Photographer, Filmmaker, Creator"
      description="This is a website build to learn more of the tailwind css and next.js" >
      <Hero />
      <FavoriteProjects />
      <LatestCode repositories={repositories} />
    </ContainerBlock>
  );
}
// Fetching data from github and also from the local translations.
export const getServerSideProps = async ({ locale }) => {
  console.log(process.env.GITHUB_AUTH_TOKEN);
  let token = process.env.GITHUB_AUTH_TOKEN;

  const repositories = await getLatestRepos(userData, token);
  // console.log("REPOSITORIES", repositories);

  return {
    props: {
      repositories,
       ...await serverSideTranslations(locale, ['common', 'footer']),
    },
  };
};
