import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import useMessages from "../hooks/useMessages";

const ChatFooter = () => {

  const { messages, handleNextComponent } = useMessages();

  return (
    <Row className="mt-5">
        <Button
            className="w-100"
            bsPrefix="chat-footer-btn"
            onClick={() => handleNextComponent()}
        >
            {messages.length === 1 ? 'Iniciar' : 'Enviar'}
        </Button>
    </Row>
  )
}

export default ChatFooter