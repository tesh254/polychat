import Layout from "@/components/Layout";
import {
  ChatWindow,
  InputSection,
  ListChat,
  PageGrid,
  PageLayout,
  SideSection,
} from "styled-components";
import InfoSection from "@/components/Info";
import Leaderboard from "@/components/Leaderboard";
import { useAppContext } from "context/AppProvider";
import { css } from "goober";

const Home = () => {
  const { account, connectWallet, balance } = useAppContext();

  console.log({ balance });

  return (
    <Layout>
      <PageLayout>
        <PageGrid>
          <SideSection>
            <InfoSection />
            <Leaderboard />
          </SideSection>
          <ChatWindow>
            <ListChat>list chart</ListChat>
            <InputSection>
              {!account ? (
                <button
                  onClick={() => connectWallet()}
                  className="w-full text-2xl outline-none text-white bg-green-400 font-extrabold rounded-xl p-2 h-full"
                >
                  Connect Wallet
                </button>
              ) : (
                <section
                  className={`bg-white rounded-2xl ${css`
                    display: grid;
                    grid-template-columns: 1fr auto;
                    grid-template-rows: 100%;
                    grid-column-gap: 8px;
                    grid-row-gap: 0px;
                  `}`}
                >
                  <textarea
                    value={""}
                    onChange={(e) => {
                      const value = e.target.value;

                      // setMessage(value);
                    }}
                    className="p-2 outline-none italic"
                  ></textarea>
                  <button className="bg-green-400 h-auto px-3 text-white">
                    Send
                  </button>
                </section>
              )}
            </InputSection>
          </ChatWindow>
        </PageGrid>
      </PageLayout>
    </Layout>
  );
};

export default Home;
