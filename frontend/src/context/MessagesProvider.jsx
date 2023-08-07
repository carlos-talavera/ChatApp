import { useState, createContext, useEffect } from "react";
import axiosClient from "../config/axios.js";
import FormNombre from "../components/forms/FormNombre";
import FormFechaNacimiento from "../components/forms/FormFechaNacimiento";
import FormDatosContacto from "../components/forms/FormDatosContacto";

const MessagesContext = createContext();

const MessagesProvider = ({children}) => {

    // Store displayed messages
    // These will be categorized into: display-data, info, confirm and component. So we can
    // know which styles must be applied and what logic must be used
    const [messages, setMessages] = useState([
        {
            type: "info",
            content: "Bienvenido a Chat App. Presiona el botón 'Iniciar' para utilizar la aplicación"
        }
    ]);

    // Store user information
    const [userInfo, setUserInfo] = useState({
        nombre: '',
        segundo_nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        dia_nacimiento: '01',
        mes_nacimiento: '01',
        year_nacimiento: '2023',
        email: '',
        telefono: ''
    });

    // Store form components
    const [formComponents, setFormComponents] = useState([
        { 
            errMessage: 'Hay campos vacíos',
            component: <FormNombre /> 
        },
        { 
            errMessage: 'La fecha no es válida',
            component: <FormFechaNacimiento /> 
        },
        { 
            errMessage: 'Hay campos vacíos',
            component: <FormDatosContacto /> 
        }
    ]);

    // To check if the provided data for the current form is valid
    const [validData, setValidData] = useState('');

    // To display data
    const [dataToDisplay, setDataToDisplay] = useState('');

    // To set the handler for submitting the current form
    const [handlerSubmit, setHandlerSubmit] = useState('');

    useEffect(() => {

        // If last message is displayed, there's no need to keep showing components
        if (messages[messages.length - 1].noNextComponent) {

            return;

        }

        if (messages.length > 1 && validData !== '') {

            // Prevent execution of handleNextComponent if confirm button has not been
            // clicked (validData is true)
            if (messages[messages.length - 1].type === 'confirm') {

                if (validData) return;

                setValidData('');
                showForm();

            }

            // After a form, it depends on whether the provided data is valid or not
            // to determine what to show, if displaying the data or showing an error
            const newMessage = validData ? {
                type: 'display-data',
                content: dataToDisplay
            } : {
                type: 'info',
                content: formComponents[0].errMessage
            }

            setMessages([
                ...messages,
                newMessage
            ]);

            handleNextComponent();

        }

    }, [messages, validData]);

    // Show form after deleting the previous form component from the array
    useEffect(() => {

        // If there are no more formComponents, send the data to the API
        if (formComponents.length === 0) {

            sendData();
            return;

        }

        if (messages.length > 1) {

            showForm();

        }

    }, [formComponents]);

    // Handle what component to show next
    const handleNextComponent = () => {

        let newMessage = {};

        // The following message is a confirm one
        if (messages[messages.length - 1].type === 'display-data') {

            newMessage = {
                type: 'confirm'
            }

        } else if (messages[messages.length - 1].type === 'info' || messages[messages.length - 1].type === 'confirm') {

            // To force showing form after
            setValidData('');
            // After this, a form component must be shown
            // The formComponents array works as a queue, and once a form is completed,
            // it will be popped from the queue
            newMessage = {
                type: 'form',
                content: formComponents[0].component
            }

        } else if (messages[messages.length - 1].type === 'form') {

            handlerSubmit();
            return;
            
        }

        setMessages([
            ...messages,
            newMessage
        ]);

    }

    // Force to show form after a form component is popped from the queue
    const showForm = () => {

        const newMessage = {
            type: 'form',
            content: formComponents[0].component
        }

        setValidData('');
        setMessages([
            ...messages,
            newMessage
        ]);

    }

    // Send data to the API
    const sendData = async () => {

        let newMessage = {};

        try {

            // Build date of birth in the format the DB needs it to be
            const birthDate = `${userInfo.year_nacimiento}-${userInfo.mes_nacimiento}-${userInfo.dia_nacimiento}`;

            // Remove unnecessary properties from the object to be send
            const {
                dia_nacimiento,
                mes_nacimiento,
                year_nacimiento,
                ...userInfoToSend
            } = userInfo;

            // Set the built date to the property it needs to have 
            userInfoToSend.fecha_nacimiento = birthDate;

            await axiosClient.post('/users', userInfoToSend);
            newMessage = {
                type: 'info',
                noNextComponent: true,
                content: 'Datos guardados correctamente'
            }
            
        } catch (error) {

            console.error(error);
            newMessage = {
                type: 'info',
                noNextComponent: true,
                content: error.response.data.msg
            }
            
        } finally {

            setMessages([
                ...messages,
                newMessage
            ]);

        }

    }

    return(
        <MessagesContext.Provider
            value={{
                messages,
                setMessages,
                userInfo,
                setUserInfo,
                formComponents,
                setFormComponents,
                handleNextComponent,
                setDataToDisplay,
                setHandlerSubmit,
                setValidData
            }}
        >
            {children}
        </MessagesContext.Provider>
    )

}

export {
    MessagesProvider
}

export default MessagesContext;