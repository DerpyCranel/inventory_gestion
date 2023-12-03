import Cookies from "universal-cookie";
import { Navbar } from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Layout=()=>{
    //se declara la cookie y se manda a traer la información guardada en ella 
  const cookies = new Cookies();
  const navigation= useNavigate();

  
  useEffect(()=>{
    if(!cookies.get('auth')){
        navigation("/login")
    }
   },[navigation]); 


    return(
        <>

        <Navbar/>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <Outlet/>
          </div>
        </div>  
      </>


    )

}