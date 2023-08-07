import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import useMessages from "../hooks/useMessages";

const ConfirmButtons = () => {

    const { messages, formComponents, setValidData, setFormComponents } = useMessages();

    const [disabled, setDisabled] = useState(false);

    // Disable form when messages change (it means a message was added and this is now an
    // old component)
    useEffect(() => {

        // If the last message is not a confirmation, then a button has already been clicked
        if (messages[messages.length - 1].type !== 'confirm') {

            setDisabled(true);

        }

    }, [messages]);

    return (
        <Row>
            <Col
                sm={6}
            >
                <Button
                    className="w-100"
                    bsPrefix="chat-footer-btn"
                    onClick={() => setFormComponents([...formComponents.slice(1)])}
                    disabled={disabled}
                >
                    Sí
                </Button>
            </Col>
            <Col
                sm={6}
            >
                <Button
                    className="w-100"
                    bsPrefix="chat-footer-btn"
                    onClick={() => setValidData(false)}
                    disabled={disabled}
                >
                    No
                </Button>
            </Col>
        </Row>
    )
}

export default ConfirmButtons