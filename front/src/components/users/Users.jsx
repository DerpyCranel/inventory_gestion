import { UsersInsert } from "./UsersInsert"
import { UserList } from "./UsersList"

export const Users=()=>{
   

    return(
    <>
    <h1 className="text-2xl">Usuarios</h1>
    <br />
    {
    // modal donde se muestra el formulario para agregar ususarios
    }

    <UsersInsert/>
    <br />
    <UserList/>
    
    </>
     )
}