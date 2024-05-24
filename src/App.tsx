import { useEffect, useMemo, useState, useCallback } from 'react'
import { Button, TextField } from '@mui/material'
import './styles/root.css';
import LeftMessage from './comp/left';
import Right from './comp/right';
import { io } from 'socket.io-client';
import CenterMsg from './comp/center';


const CONNECTION_URI = "http://localhost:3000";

type Message = {
  name?: string;
  message: string;
  fromSelf: boolean;
  center?: boolean;
};

export default function App() {
  const [message, setMessage] = useState<string>("");
  const [msgArray, setMsgArray] = useState<Message[]>([]);

  const socket = useMemo(() => {
    return io(CONNECTION_URI);
  }, []);



  const sendMessage = useCallback(() => {
    if (message.trim() === "")
      return;
    const newMessage: Message = {
      fromSelf: true,
      message: message,
      name: "You",
      center: false
    };
    setMsgArray([
      ...msgArray,
      newMessage
    ]);
    setMessage("");
    try {
      socket.emit("message", newMessage);
    } catch (e) {
      console.log(e);
    }
  }, [message, socket, msgArray]);


  useEffect(function () {

    socket.on("message", (msg: Message) => {
      setMsgArray([
        ...msgArray,
        msg
      ]);
    });

  }, [socket, msgArray]);


  return (
    <main>
      <section>
        <div className='scaffold'>
          {
            msgArray.map((msg, index) => {
              if (msg.center) {
                return <CenterMsg message={msg.message} />
              }
              return msg.fromSelf ?
                <Right message={msg.message} key={index} />
                :
                <LeftMessage message={msg.message} label={msg.name!} key={index} />
            })
          }
        </div>
        <div className='chattb'>
          <TextField value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Type to send a message' />
          <Button variant='contained' onClick={sendMessage}>
            Send
          </Button>
        </div>
      </section>
    </main>
  )
}
