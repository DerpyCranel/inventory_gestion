import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import {FaUndoAlt} from "react-icons/fa";
import {
  Button,
  Label,
  Modal,
  TextInput,
  Select,
} from "flowbite-react";


  export const UsersUpdate=({id,mail,name,status,idRol})=>{
    //se extrae el token de la cookie
    const url = "http://localhost:3000/users/"+id;
    const cookies = new Cookies();
    const token = cookies.get("auth");
    const headers={
        Authorization: `Bearer ${token}`,
      };
    //hook para mostrar roles desde la api
    const [rol, setRol] = useState([]);
    const urlRol = "http://localhost:3000/roles";
    //modal para editar usuarios
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
  //muestra los roles
  useEffect(() => {
  
    const getRoles=async ()=>{
        try {
            //se hace la peticion para extraer los roles
            const responseRol= await axios.get(urlRol,{headers})
            //se define el useState
            setRol(responseRol.data);
        } catch (error) {
            setRol(error.responseRol.data.error);
        }
    }
    getRoles();
  },[]);

  //funcion  para actualizar los datos
  const handleSubmit= async (event)=>{
    event.preventDefault();
 
    //se extrae los valores del formulario
    const formData = {
        u_email: event.target.u_email.value,
        u_name: event.target.u_name.value,
        u_pass: event.target.u_pass.value,
        u_status:event.target.u_status.value,
        rol_id:event.target.rol_id.value
      };

      try {
        const response= await axios.patch(url,formData,{headers});
        let message_data= response.data.message;
         //arroja una alerta de success
         Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: message_data,
            showConfirmButton: false,
            timer: 1500
        });
        
      } catch (error) {
      //muestra el error en una alerta
      const messageError = error.response.data.message;

      Swal.fire({
        position: "top-end",
        title: "Error!",
        text: messageError,
        icon: "error",
        confirmButtonText: "Continuar",
      });
        
      }






  }





    return(
        <>

<Button color="purple" onClick={() => props.setOpenModal('form-elements')}>
    <FaUndoAlt/>
</Button>


<Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">  Editar usuario
            </h3>

            <form onSubmit={handleSubmit}  method="post" >

            <div>
              <div className="mb-2 block">
                <Label value="Correo" />
              </div>
              <TextInput  defaultValue={mail}  name="u_email" type="email"  required />
            </div>

            <div>
              <div className="mb-2 block">
                <Label  value="Usuario" />
              </div>
              <TextInput  defaultValue={name}  name="u_name" type="text"  required />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Contraseña" />
              </div>
              <TextInput    name="u_pass" type="password"/>
            </div>




            <div>
              <div className="mb-2 block">
                <Label  value="Status" />
              </div>
              <Select  defaultValue={status} required   name="u_status">
                <option value="">Selecciona</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </Select>
            </div>


            <div>
              <div className="mb-2 block">
                <Label  value="Rol" />
              </div>

              {
                //muestra los roles existentes en la base de datos
              }
              <Select  required   name="rol_id">
                      <option value={idRol}>Selecciona</option>
                {rol.map((rl)=>(
                     <option key={rl.rol_id} value={rl.rol_id}>{rl.rol_name}</option>
                ))}
              </Select>
            </div>

           
            <br />
            <div className="w-full ">
              <Button type='submit' onClick={() => props.setOpenModal(undefined)} color="purple"  >Agregar</Button>
            </div>

            </form>
         
          </div>
        </Modal.Body>
      </Modal>


        
        
        
        </>
    )
}