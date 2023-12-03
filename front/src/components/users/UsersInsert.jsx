import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import {
  Button,
  Label,
  Modal,
  TextInput,
  Select,
} from "flowbite-react";

export const UsersInsert = () => {
  // see extrae el token de la cookie
  const url = "http://localhost:3000/users";
  const cookies = new Cookies();
  const token = cookies.get("auth");

  //modal para agregar usuarios
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  //hook para mostrar roles desde la api
  const [rol, setRol] = useState([]);
  const urlRol = "http://localhost:3000/roles";


  //arroja los resultados despues de enviar los datos desde el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    //se extrae los valores del formulario
    const formData = {
        u_email: event.target.u_email.value,
        u_name: event.target.u_name.value,
        u_password: event.target.u_password.value,
        u_status:event.target.u_status.value,
        rol_id:event.target.rol_id.value
      };

    try {
      const headers = {
        // Incluye el token en la cabecera de la solicitud
        Authorization: `Bearer ${token}`,
      };

      //se hace la peticion a la api para agregar los datos
      const response = await axios.post(url,formData, { headers });
      let message_data= response.data.message;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message_data,
        showConfirmButton: false,
        timer: 1500
      })


  

      
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
  };

  //muestra los roles
  useEffect(() => {
    //se hace la peticion para extraer los roles
    axios.get(urlRol, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Manipula la respuesta de la petición GET
        setRol(response.data);
      })
      .catch((error) => {
        // Maneja los errores de la petición GET
        console.error(error);
      });
  },[]);

  return (
    <>

<Button color="purple" onClick={() => props.setOpenModal('form-elements')}>
      agregar 
</Button>


      <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Registrar usuario</h3>

            <form onSubmit={handleSubmit}  method="post" action="">

            <div>
              <div className="mb-2 block">
                <Label value="Correo" />
              </div>
              <TextInput  id="email" name="u_email" type="email"  required />
            </div>

            <div>
              <div className="mb-2 block">
                <Label  value="Usuario" />
              </div>
              <TextInput  id="user" name="u_name" type="text"  required />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Contraseña" />
              </div>
              <TextInput   id="password" name="u_password" type="password" required />
            </div>




            <div>
              <div className="mb-2 block">
                <Label  value="Status" />
              </div>
              <Select    id="status" name="u_status">
                <option >Selecciona</option>
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
              <Select    name="rol_id" id="rol">
                      <option >Selecciona</option>
                {rol.map((rl)=>(
                     <option key={rl.rol_id} value={rl.rol_id}>{rl.rol_name}</option>
                ))}
              </Select>
            </div>

           
            <br />
            <div className="w-full ">
              <Button type='submit' color="purple" onClick={()=>{props.setOpenModal();}} >Agregar</Button>
            </div>

            </form>
         
          </div>
        </Modal.Body>
      </Modal>

    
    </>
  )
};