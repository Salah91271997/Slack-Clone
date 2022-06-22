import { Button } from "@material-ui/core";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }
    db.collection("rooms").doc(channelId).collection("messages").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
    inputRef.current.value = "";
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          ref={inputRef}
          type="text"
          placeholder={`Message # ${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;
const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 80%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
    background-color: #f6f8fa;
    @media (max-width: 1665px) {
      width: 75%;
    }
    @media (max-width: 800px) {
      width: 65%;
    }
    @media (max-width: 530px) {
      width: 50%;
    }
  }
  > form > button {
    display: none;
  }
`;
