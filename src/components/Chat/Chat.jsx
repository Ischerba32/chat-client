import React from 'react'
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { client, POST_MESSAGES } from '../../apollo'
import Messages from '../Messages/Messages'

import {
  ApolloProvider,
  useMutation,
} from "@apollo/client";

const Chat = () => {
  const [userState, setUserState] = React.useState({
    user: 'John',
    content: '',
  })

  const [postMessage] = useMutation(POST_MESSAGES)

  const onSend = () => {
    if(userState.content.length > 0 ) {
      postMessage({
        variables: userState,
      })
    }
    setUserState({
      ...userState,
      content: '',
    })
  }

  return (
    <Container>
      <Container>
        <Messages user={userState.user} />
      </Container>
      <Row>
          <Col xs={2}>
            <Form.Control
              type="text"
              placeholder="User"
              value={userState.user}
              onChange={(e) => setUserState({
                ...userState,
                user: e.target.value
              })}
            />
          </Col>
          <Col xs={8}>
            <Form.Control
              type="text"
              placeholder="message"
              value={userState.content}
              onChange={(e) => setUserState({
                ...userState,
                content: e.target.value,
              })}
              onKeyUp={(e) => {
                if(e.key === 'Enter') onSend()
              }}
            />
          </Col>
          <Col xs={2}>
              <Button
                onClick={()=> onSend()}
              >
                Send
              </Button>
          </Col>
      </Row>
    </Container>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
)