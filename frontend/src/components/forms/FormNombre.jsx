import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import useMessages from "../../hooks/useMessages";

const FormNombre = () => {

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

    if ([userInfo.nombre.trim(), userInfo.apellido_paterno.trim()].includes('')) {

      setValidData(false);
      return;

    }

    setValidData(true);
    setDataToDisplay(`${userInfo.nombre} ${userInfo.segundo_nombre} ${userInfo.apellido_paterno} ${userInfo.apellido_materno}`);

  }

  // Attach local handler to context
  useEffect(() => {
    
    setHandlerSubmit(() => handleSubmit);

  }, [userInfo]);
  
  return (
    <Form>
      <h5>¿Cuál es tu nombre?</h5>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Nombre"
          name="nombre"
          value={userInfo.nombre}
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
          placeholder="Segundo nombre (opcional)"
          name="segundo_nombre"
          value={userInfo.segundo_nombre}
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
          placeholder="Apellido paterno"
          name="apellido_paterno"
          value={userInfo.apellido_paterno}
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
          placeholder="Apellido materno (opcional)"
          name="apellido_materno"
          value={userInfo.apellido_materno}
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

export default FormNombre