import getConfig from "next/config";

import Layout from "@/components/Layout";

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Home = () => {
  function wager() {}

  return (
    <Layout>
      <section className="w-full mx-auto">
        <h1 className="text-3xl">
          Sole: Wage againist your friends and family.
        </h1>
        <button>Create a wager</button>
      </section>
    </Layout>
  );
};

export default Home;
