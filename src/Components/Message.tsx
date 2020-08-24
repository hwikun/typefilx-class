import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  color: ${(props) => props.color};
`;

type MessageTypes = {
  text: string;
  color: string;
};

const Message: FunctionComponent<MessageTypes> = ({ text, color }) => (
  <Container>
    <Text color={color}>{text}</Text>
  </Container>
);

export default Message;
