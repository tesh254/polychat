import getConfig from "next/config";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../contracts/artifacts/contracts/Polychat.sol/Polychat.json";

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

const Home = () => {
  const { setMessage, message, account, connectWallet } = useAppContext();

  console.log(account);

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
                  onClick={() => connectWallet().then(() => {})}
                  className="w-full text-2xl outline-none text-white bg-green-400 font-extrabold rounded-xl p-2 h-full"
                >
                  Connect Wallet
                </button>
              ) : (
                <section className="bg-white flex">
                  <textarea
                    value={message}
                    onChange={(e) => {
                      const value = e.target.value;

                      setMessage(value);
                    }}
                    cols={10}
                    rows={10}
                  ></textarea>
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
