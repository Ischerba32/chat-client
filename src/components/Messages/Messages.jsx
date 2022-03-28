import { useSubscription } from "@apollo/client";
import React from "react";
import { data, GET_MESSAGES } from "../../apollo";
import styles from "./Messages.module.css"

const Messages = ({user}) => {
  const { data } = useSubscription(GET_MESSAGES);

  if(!data) {
    return null;
  }

  return (
    <>
      {data.messages.map(({id, user: messageUser, content}) => (
        <div
        style={{
          justifyContent: user === messageUser ? 'flex-end' : 'flex-start',
        }}
        className={styles.message}
        key={id}
      >
        {user !== messageUser && (
          <div
            className={styles.message__avatar}
          >
            {messageUser.slice(0,2).toUpperCase()}
          </div>
        )}
        <div
          style={{
            background: user === messageUser ? '#58bf56' : '#e5e6ea',
            color: user === messageUser ? 'white' : 'black',
          }}
          className={styles.message__content}
        >
          {content}
        </div>
      </div>
      ))}
    </>
  )
}

export default Messages;