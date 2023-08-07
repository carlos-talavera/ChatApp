import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import usersRoutes from "./routes/usersRoutes.js";

const app = express();
app.use(express.json()); // Enable support for reading JSON data
dotenv.config(); // Enable access to environment variables

// Connect to database
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch((error) => console.error(error));

const port = process.env.PORT || 4000;

// Set up CORS
const allowedDomains = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {

        if (allowedDomains.indexOf(origin) !== -1) {

            // Request origin is allowed
            callback(null, true);

        } else {

            callback(new Error('Forbidden. Not allowed by CORS policy'));

        }

    }
}

// Use CORS specified options
app.use(cors(corsOptions));

// Add router for notes
app.use('/api/users', usersRoutes);

app.listen(port, () => {

    console.log(`Server working on port ${port}`);

});