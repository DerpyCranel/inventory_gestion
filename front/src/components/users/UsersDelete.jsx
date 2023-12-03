import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import {FaTrash} from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';



export const  UsersDelete=({ userId, onDelete })=>{
  //se extrae el token de autenticacion
  const cookies =new Cookies();
  const token=cookies.get('auth');


  //modal para agregar usuarios
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };


  //elimina el dato mediante un evento onclick 
  const handleDelete = async () => {
    const id=onDelete(userId); //Llama a la función onDelete pasando el ID y se declara la variable
      //url de la api 
  const url="http://localhost:3000/users/"+id;
    const headers = {
      // Incluye el token en la cabecera de la solicitud
      Authorization: `Bearer ${token}`,
    };
    try {
      //se hace la peticion a la api
      const response= await axios.delete(url,{headers});
      let message=response.data.message;
      //arroja una alerta de success
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      const messageError = error.response.data.message;
      //arroja una alerta de error 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: messageError,
        footer: ''
      })
    }
    

  };



    return(
        <>

<Button color='failure' onClick={() => props.setOpenModal('pop-up')}>
  <FaTrash/>
</Button>
      <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
           
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              desea eliminar este dato?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() =>{ props.setOpenModal(undefined); 
                handleDelete();}}>
                Sí
              </Button>
              <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

        
        </>
    )
}