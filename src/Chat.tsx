import React, {useState, useEffect, useRef} from 'react';
import {AiOutlineSend, AiOutlineUser} from 'react-icons/ai';
import {GiHollowCat} from 'react-icons/gi';
import * as cat from './cat';

import {Welcome} from './Welcome';

import {state, newUserMsg, newCatMsg} from './state';
import type {Message as M} from './state';

/**
 * UI for an individual message.
 */
export const Message = ({msg}: {msg: M}) => (
  <div className={`Message -${msg.who}`}>
    <div className={`icon -${msg.who}`}>
      {msg.who === 'cat' ? (
        <GiHollowCat size={25} color="white" />
      ) : (
        <AiOutlineUser size={25} color="white" />
      )}
    </div>
    <div className="content">
      <p>{msg.content}</p>
      {msg.attachments?.map((url) => (
        <div key={url}>
          <iframe src={url} frameBorder="0" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * UI for chat thread.
 */
export const ChatThread = () => {
  const [thread] = state.use('thread');

  return (
    <>
      {thread.map((t) => (
        <Message key={t.id} msg={t} />
      ))}
    </>
  );
};

/**
 * UI for input box.
 */
export const ChatInput = () => {
  const [thread, setThread] = state.use('thread');
  const [msg, setMsg] = useState('');
  const [_, setThinking] = useState(false);

  const sendMsg = (m: string) => {
    if (!m) {
      return;
    }

    setThread([...thread, newUserMsg(m)]);
    setMsg('');
    setThinking(true);

    cat.replyTo(m).then((node) => {
      setThread([
        ...state.getValue('thread'),
        newCatMsg(node.content, node.gif),
      ]);
      setThinking(false);
    });
  };

  return (
    <div className="ChatInput">
      <form
        onSubmit={(e) => {
          sendMsg(msg);
          e.preventDefault();
          return false;
        }}
      >
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <a className="send">
          <AiOutlineSend onClick={() => sendMsg(msg)} />
        </a>
        <input type="submit" disabled={!msg} />
      </form>
    </div>
  );
};

/**
 * UI for bottom section of the app.
 */
export const ChatFooter = () => {
  return (
    <div className="ChatFooter">
      <ChatInput />
      <footer>
        Free Research Preview: CatGPT is optimized for cat pictures. Our goal is
        to enable new ways of looking at pictures of cats.
      </footer>
    </div>
  );
};

/**
 * UI for Chat pane.
 */
export const Chat = () => {
  const [thread] = state.use('thread');
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of a thread on update
  useEffect(() => {
    if (!ref.current || !thread.length) {
      return;
    }
    ref.current.scrollTo(0, ref.current.scrollHeight);
  });

  return (
    <div className="Chat">
      <div ref={ref} className={`ChatWindow ${thread.length ? '' : '-empty'}`}>
        {thread.length ? <ChatThread /> : <Welcome />}
        <div className="Spacer"> </div>
      </div>
      <ChatFooter />
    </div>
  );
};
