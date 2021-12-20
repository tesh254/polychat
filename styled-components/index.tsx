import { styled } from "goober";

export const PageLayout = styled("section")`
  height: 100vh;
  width: 100vw;
`;
export const PageGrid = styled("section")`
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
  height: 100%;
`;

export const SideSection = styled("aside")`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: #1e2428;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChatWindow = styled("section")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 64px;
  grid-column-gap: 0px;
  grid-row-gap: 8px;
  height: 100%;
  width: 100%;
  background: #000;
`;

export const ListChat = styled("section")`
  overflow-y: scroll;
  flex-direction: column;
  justify-content: left;
  align-items: left;
`;

export const InputSection = styled("section")`
  width: 100%;
  padding: 8px;
  background: #1e2428;
  display: grid;
  grid-template-columns: 1fr 40px;
  grid-template-rows: 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 0px;
  align-items: center;
`;
