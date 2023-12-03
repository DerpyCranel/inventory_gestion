import { RolesInsert } from "./RolesInsert"
import { RolesList } from "./RolesList"



export const Roles=()=>{

    return (
        <>
        <h1 className="text-2xl">Roles</h1>
        <br />
        <RolesInsert/>
        <br />
        <RolesList/>
        
        </>
    )

}