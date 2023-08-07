import Image from "react-bootstrap/Image";
import avatar from "../img/avatar.avif";
import InfoMessage from "./templates/InfoMessage";
import ConfirmMessage from "./templates/ConfirmMessage";
import DisplayDataMessage from "./templates/DisplayDataMessage";

import useMessages from "../hooks/useMessages";

const Message = ({message}) => {

  const { messages, setMessages, formComponents } = useMessages();

  // Render the corresponding component
  const renderComponent = () => {

    if (message.type === 'info') {

      return <InfoMessage content={message.content} />

    } else if (message.type === 'confirm') {

      return <ConfirmMessage />

    } else if (message.type === 'display-data') {

      return <DisplayDataMessage content={message.content} />

    } else {

      return message.content;

    }

  }

  return (
    <>
        <div className={`chat-message shadow-sm p-3 d-flex gap-3 mt-4 ${message.type} ${message.type === 'display-data' ? 'right' : ''}`}>
          <Image
              src={avatar}
              className="chat-message__left rounded-circle"
              width={60}
              height={60}
          />
          <div className="chat-message__right">
            {renderComponent()}
          </div>
        </div>
    </>
  )

}

export default Message