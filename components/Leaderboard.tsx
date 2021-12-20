import { FC } from "react";
import { css, keyframes } from "goober";

type TopAccounts = {
  username: string;
  link: string;
  address: string;
  amount: number;
  chats: any[];
};

interface LeaderBoardProps {
  leaderboard: TopAccounts[];
}

const GlowKeyFrame = keyframes`
  from {
    text-shadow: 0 0 10px #e60073;
  }
  to {
    text-shadow: 0 0 10px #ff4da6;
  }
  `;

const Glow = css`
  color: current;
  text-align: center;
  -webkit-animation: ${GlowKeyFrame} 1s ease-in-out infinite alternate;
  -moz-animation: ${GlowKeyFrame} 1s ease-in-out infinite alternate;
  animation: ${GlowKeyFrame} 1s ease-in-out infinite alternate;
`;

const Leaderboard: FC<LeaderBoardProps> = ({ leaderboard }) => {
  return (
    <section className="flex flex-col">
      <div className="text-light font-extrabold">Leaderboard</div>
      <section>
        {leaderboard.map((account, index) => {
          return (
            <section
              className={`flex my-2
                ${index === 0 && "text-red-400"}
                ${index === 1 && "text-purple-400"}
              ${index === 2 && "text-pink-400"}
              ${index === 3 && "text-yellow-400"}
              ${index === 4 && "text-gray-400"}
              ${Glow} underline`}
            >
              <span className={`mr-4 font-extrabold`}>#{index + 1}</span>
              <a href={account.link} target="_blank">
                <span>{account.username}</span>
              </a>
            </section>
          );
        })}
      </section>
    </section>
  );
};

export default Leaderboard;
