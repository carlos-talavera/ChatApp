import { useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Message from "./Message";
import ChatFooter from "./ChatFooter";
import useMessages from "../hooks/useMessages";

const ChatBox = () => {

  const { messages, formComponents } = useMessages();
  const scroll = useRef();

  // Scroll to bottom every time a new message is added
  useEffect(() => {

    if (scroll.current) { 
      
      setTimeout(() => { 
        
        scroll.current.scrollIntoView({ behavior: "smooth" });
      
      }, 1); 
    
    }

  }, [messages]);

  return (
    <main className="my-5">
        <Container>
          {messages.map((message, idx) => (
            <Message
              key={idx}
              message={message}
            />
          ))}
          {(messages[messages.length - 1].type !== 'confirm' && formComponents.length > 0) && <ChatFooter />}
          <span ref={scroll}></span>
        </Container>
    </main>
    
  )
}

export default ChatBox