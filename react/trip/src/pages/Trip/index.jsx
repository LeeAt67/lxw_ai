import { useEffect, useState } from "react";
import useTitle from "@/hooks/useTitle";
import { kimiChat } from "@/llm";
import styles from "./trip.module.css";
import { Button, Input, Loading } from "react-vant";

const Trip = () => {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const handleChat = () => {
    if (text.trim() === "") return;

    setIsSending(true);
  };
  useTitle("旅游智能客服");
  return (
    <div className="flex flex-col h-all ">
      <div className={`flex-1 ${styles.chatArea}`}></div>
      <div className={`flex ${styles.inputArea}`}>
        <Input
          value={text}
          onChange={(e) => {
            setText(e);
          }}
          placeholder="请输入消息"
          className={`flex-1 ${styles.input}`}
        ></Input>
        <Button disabled={isSending} type="primary" onClick={handleChat}>
          发送
        </Button>
      </div>
      {isSending && (
        <div className="fixed-loading">
          <Loading type="ball" />
        </div>
      )}
    </div>
  );
};

export default Trip;
