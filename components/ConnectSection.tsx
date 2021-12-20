import { useAppContext } from "context/AppProvider";
import { FC } from "react";

const ConnectionSection: FC<{}> = () => {
  const { account, connectWallet } = useAppContext();

  return (
    <section className="absolute bottom-0 left-0 p-4">
      <section>
        {account ? (
          <button
            className="px-4 py-2 bg-green-400 text-light rounded-sm font-bold"
            onClick={connectWallet}
          >
            {account.substring(0, 8)}......
            {account.substring(account.length - 8)}
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-400 text-light rounded-sm font-bold"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </section>
    </section>
  );
};

export default ConnectionSection;
