import { Modal,Button,Label,TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

export const  RolesInsert=()=>{
  // see extrae el token de la cookie
  const url = "http://localhost:3000/roles";
  const cookies = new Cookies();
  const token = cookies.get("auth");
  // Incluye el token en la cabecera de la solicitud
  const headers = {
    Authorization: `Bearer ${token}`
  };
  //hook del modal para abrir y cerrar
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  //funcion para madar la solicitud post mediante el modal
  const handleSubmit=async(event)=>{
    event.preventDefault();
    //valor del formulario
    const formData={
        name:event.target.name.value
    };

    try {
        const response= await axios.post(url,formData,{headers});
        let message=response.data.message;
        //muestra una alerta de success
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: message,
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

    

  }



    return(
        <>

<Button color="purple" onClick={() => props.setOpenModal('form-elements')}>Agregar</Button>
      <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Agregar roles</h3>
            <form  onSubmit={handleSubmit} method="post">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nombre" value="Nombre" />
              </div>
              <TextInput  name="name"  type="text" required />
            </div>

           
          
            <div className="w-full">
              <Button onClick={()=>{props.setOpenModal();}} type="submit" >agregar</Button>
            </div>
            </form>
          
          </div>
        </Modal.Body>
      </Modal>
        
        
        </>
    )
}