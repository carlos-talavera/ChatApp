import Sequelize from 'sequelize'
import db from '../config/db.js'

export const User = db.define('user', {

    nombre: {
        type: Sequelize.STRING,
        required: true
    },
    segundo_nombre: {
        type: Sequelize.STRING
    },
    apellido_paterno: {
        type: Sequelize.STRING,
        required: true
    },
    apellido_materno: {
        type: Sequelize.STRING
    },
    fecha_nacimiento: {
        type: Sequelize.DATE,
        required: true
    },
    email: {
        type: Sequelize.STRING,
        required: true
    },
    telefono: {
        type: Sequelize.STRING,
        required: true
    }
    
}, {
    freezeTableName: true,
    tableName: 'users_test_carlos_eduardo_talavera_rivera'
})