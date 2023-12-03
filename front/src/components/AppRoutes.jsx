import React,{useState} from "react";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Login } from "./login/Login";
import { Home} from "./Menu/Home";
import { Users } from "./users/Users";
import { Roles } from "./roles/Roles";
import { Layout } from "./Menu/Layout";
import { Navbar } from "./Menu/Navbar";


export const AppRoutes=()=>{

   



    return(

        <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          
          <Route exact path="/" element={<Layout/>}> 

          <Route path="Home" element={<Home />}/>
          <Route exact path="users" element={   <Users />   } />
          <Route exact path="roles" element={<Roles />} />

          </Route>
          <Route exact path="*" element={<h1>no hay</h1>}/>
          
        </Routes>
      </BrowserRouter>
    )
        
};