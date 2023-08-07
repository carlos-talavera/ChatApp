import { MessagesProvider } from "./context/MessagesProvider";
import Container from "react-bootstrap/Container";
import ChatBox from "./components/ChatBox";

function App() {

  return (
    <MessagesProvider>
      <header className="py-5">
        <Container>
          <h1>Chat App</h1>
        </Container>
      </header>
      <ChatBox />
    </MessagesProvider>
  )
}

export default App
