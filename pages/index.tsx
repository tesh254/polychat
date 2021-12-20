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
import ChatInput from "@/components/Input";
import ConnectionSection from "@/components/ConnectSection";

const Home = () => {
  const { account, message, setMessage, onSend } = useAppContext();

  return (
    <Layout>
      <PageLayout>
        <PageGrid>
          <SideSection>
            <InfoSection />
            <Leaderboard
              leaderboard={[
                {
                  username: "Erick",
                  link: "https://bywachira.com",
                  address: "0x00000000000000000000000000",
                  amount: 100,
                  chats: [],
                },
                {
                  username: "Erick",
                  link: "https://bywachira.com",
                  address: "0x00000000000000000000000000",
                  amount: 100,
                  chats: [],
                },
                {
                  username: "Erick",
                  link: "https://bywachira.com",
                  address: "0x00000000000000000000000000",
                  amount: 100,
                  chats: [],
                },
                {
                  username: "Erick",
                  link: "https://bywachira.com",
                  address: "0x00000000000000000000000000",
                  amount: 100,
                  chats: [],
                },
                {
                  username: "Erick",
                  link: "https://bywachira.com",
                  address: "0x00000000000000000000000000",
                  amount: 100,
                  chats: [],
                },
              ]}
            />
            <ConnectionSection />
          </SideSection>
          <ChatWindow>
            <ListChat>list chart</ListChat>
            <ChatInput
              message={message}
              onSend={onSend}
              onMessageChange={setMessage}
              disabled={!account}
              placeholder={!account ? `Connect Wallet` : `Type your message`}
            />
          </ChatWindow>
        </PageGrid>
      </PageLayout>
    </Layout>
  );
};

export default Home;
