import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import useMessages from "../../hooks/useMessages";

const FormDatosContacto = () => {

  const { messages, userInfo, setUserInfo, setValidData, setHandlerSubmit, setDataToDisplay } = useMessages();

  const [disabled, setDisabled] = useState(false);

  // Disable form when messages change (it means a message was added and this is now an
  // old component)
  useEffect(() => {

    // If the last message displays data, then the form was already sent and therefore it must
    // be disabled
    if (messages[messages.length - 1].type !== 'form') {

      setDisabled(true);

    }

  }, [messages]);

  // Handle "submit"
  const handleSubmit = () => {

    if ([userInfo.email.trim(), userInfo.telefono.trim()].includes('')) {

      setValidData(false);
      return;

    }

    setValidData(true);
    setDataToDisplay(`
      Correo electrónico: ${userInfo.email} <br>
      Teléfono celular: ${userInfo.telefono}
    `);

  }

  // Attach local handler to context
  useEffect(() => {

    setHandlerSubmit(() => handleSubmit);

  }, [userInfo]);

  return (
    <Form>
      <h5>Datos de Contacto</h5>
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Correo electrónico"
          name="email"
          value={userInfo.email}
          onChange={e => setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
          })}
          disabled={disabled}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Teléfono celular"
          name="telefono"
          maxLength="10"
          value={userInfo.telefono}
          onChange={e => setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
          })}
          disabled={disabled}
        />
      </Form.Group>
    </Form>
  )
}

export default FormDatosContacto