import { InputSection } from "styled-components";
import { css } from "goober";

type ChatInputProps = {
  message: string;
  onSend: () => void;
  onMessageChange: (message: string) => void;
  disabled: boolean;
  placeholder: string;
};

export default function ChatInput({
  message,
  onSend,
  onMessageChange,
  disabled,
  placeholder,
}: ChatInputProps) {
  return (
    <InputSection>
      <textarea
        disabled={disabled}
        value={message}
        placeholder={placeholder}
        onChange={(e) => {
          const value = e.target.value;

          // setMessage(value);
          onMessageChange(value);
        }}
        className={`p-2 outline-none text-light ${css`
          background: #33383b;
          height: 42px;
          resize: none;
          border-radius: 24px;
        `}`}
      ></textarea>
      <button
        onClick={onSend}
        className={`${css`
          color: #828689;
        `}`}
      >
        <svg viewBox="0 0 24 24" className="fill-current w-6 h-6">
          <path
            fill="currentColor"
            d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
          ></path>
        </svg>
      </button>
    </InputSection>
  );
}
