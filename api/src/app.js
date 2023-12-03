import express from 'express'
import prueba from './routes/pruebaConexion.routes.js'
import roles from './routes/roles.routes.js';
import users from './routes/users.routes.js';
import categories from './routes/categories.routes.js';
import products from './routes/products.routes.js';
import inventory from './routes/inventory.routes.js';
import login from './routes/auth.routes.js';
import cors from 'cors';

const corsUrl={
    origin:'http://localhost:5173'
};

const app=express();
app.use(cors(corsUrl));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(prueba);
app.use(roles);
app.use(users);
app.use(categories);
app.use(products);
app.use(inventory);
app.use(login);


app.use((req,res)=>{
    res.status(404).json({
        message: 'Page not found...'
    })
});

export default app;