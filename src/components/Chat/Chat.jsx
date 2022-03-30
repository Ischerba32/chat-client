import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Messages from "../Messages/Messages";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Chat.module.css";

import { client, GET_MESSAGES, POST_MESSAGES } from "../../apollo";
import { ApolloProvider, useMutation, useSubscription } from "@apollo/client";

const Chat = () => {
  const [userState, setUserState] = React.useState({
    user: "John",
    content: "",
  });

  const [postMessage] = useMutation(POST_MESSAGES);
  const { data } = useSubscription(GET_MESSAGES);

  const msgContainerRef = React.useRef(null);

  const scrollToBottom = () => {
    msgContainerRef.current.scrollTo(0, msgContainerRef.current.scrollHeight);
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [data]);

  const onSend = () => {
    if (userState.content.length > 0) {
      postMessage({
        variables: userState,
      });
    }
    setUserState({
      ...userState,
      content: "",
    });
  };

  return (
    <Container>
      <Container
        ref={msgContainerRef}
        className={styles.chat__container}
      >
        <Messages user={userState.user} data={data} />
      </Container>
      <Row>
        <Col xs={2}>
          <Form.Control
            type="text"
            placeholder="User"
            value={userState.user}
            onChange={(e) =>
              setUserState({
                ...userState,
                user: e.target.value,
              })
            }
          />
        </Col>
        <Col xs={8}>
          <Form.Control
            type="text"
            placeholder="message"
            value={userState.content}
            onChange={(e) =>
              setUserState({
                ...userState,
                content: e.target.value,
              })
            }
            onKeyUp={(e) => {
              if (e.key === "Enter") onSend();
            }}
          />
        </Col>
        <Col xs={2}>
          <Button onClick={() => onSend()}>Send</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
