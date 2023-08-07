import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import useMessages from "../../hooks/useMessages";

const dias = [...Array(31).keys()];

const meses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

// Generate years from 1930 to the current one
const years = Array.from({ length: new Date().getFullYear() - 1930 + 1 }, (_, i) => 2023 - i);

const FormFechaNacimiento = () => {

  const { messages, userInfo, setUserInfo, setValidData, setHandlerSubmit, setDataToDisplay } = useMessages();

  const [disabled, setDisabled] = useState(false);

  // Disable form when messages change (it means a message was added and this is now an
  // old component)
  useEffect(() => {

    // If the last message is not a form, then the form was already sent and therefore it must
    // be disabled
    if (messages[messages.length - 1].type !== 'form') {

      setDisabled(true);

    }

  }, [messages]);

  // Validate date (avoid things like February 30th)
  const validateDateString = (day, month, year) => {

    day = Number(day);
    month = Number(month) - 1;
    year = Number(year);

    let d = new Date(year, month, day);

    let yearMatches = d.getUTCFullYear() === year;
    let monthMatches = d.getUTCMonth() === month;
    let dayMatches = d.getUTCDate() === day;

    return yearMatches && monthMatches && dayMatches;
  
  }

  // Handle "submit"
  const handleSubmit = () => {

    if (!validateDateString(userInfo.dia_nacimiento, userInfo.mes_nacimiento, userInfo.year_nacimiento)) {

      setValidData(false);
      return;

    }

    setValidData(true);
    setDataToDisplay(`${userInfo.dia_nacimiento} ${meses[Number(userInfo.mes_nacimiento) - 1]} ${userInfo.year_nacimiento}`);

  }

  // Attach local handler to context
  useEffect(() => {

    setHandlerSubmit(() => handleSubmit);

  }, [userInfo]);

  return (
    <Form>
      <h5>¿Cuál es tu fecha de nacimiento?</h5>
      <Form.Select
        className="mb-3"
        name="dia_nacimiento"
        value={userInfo.dia_nacimiento}
        onChange={e => setUserInfo({
          ...userInfo,
          [e.target.name]: e.target.value
        })}
        disabled={disabled}
      >
        {dias.map(dia => (
          <option
            key={`${dia < 9 ? '0' : ''}${dia + 1}`}
            value={`${dia < 9 ? '0' : ''}${dia + 1}`}
          >{dia + 1}</option>
        ))}
      </Form.Select>
      <Form.Select
        className="mb-3"
        name="mes_nacimiento"
        value={userInfo.mes_nacimiento}
        onChange={e => setUserInfo({
          ...userInfo,
          [e.target.name]: e.target.value
        })}
        disabled={disabled}
      >
        {meses.map((mes, indice) => (
          <option
            key={`${indice + 1}`}
            value={`${indice < 9 ? '0' : ''}${indice + 1}`}
          >{mes}</option>
        ))}
      </Form.Select>
      <Form.Select
        className="mb-3"
        name="year_nacimiento"
        value={userInfo.year_nacimiento}
        onChange={e => setUserInfo({
          ...userInfo,
          [e.target.name]: e.target.value
        })}
        disabled={disabled}
      >
        {years.map(year => (
          <option
            key={`${year}`}
            value={`${year}`}
          >{year}</option>
        ))}
      </Form.Select>
    </Form>
  )
}

export default FormFechaNacimiento