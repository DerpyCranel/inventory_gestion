import { UsersDelete } from "./UsersDelete";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Table, Pagination } from "flowbite-react";
import { UsersUpdate } from "./usersUpdate";

export const UserList = () => {
  // Se crea el hook para mostrar los datos
  const [data, setData] = useState([]);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página
  // Se extrae el token de la cookie
  const url = 'http://localhost:3000/users';
  const cookies = new Cookies();
  const token = cookies.get('auth');

  useEffect(() => {
    // Se hace la petición a la API

    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // Manipula la respuesta de la petición GET
        setData(response.data);
      })
      .catch(error => {
        // Maneja los errores de la petición GET
        console.error(error);
      });
  }, []);

  // Lógica para calcular los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //funcion  que retorna el id de usuario
  const handleDeleteUser = (userId) => {
    return userId;
  };

  //funcion que retorna los datos para actualizar
  const handleUpdateUser=({id,mail,name,status,idRol,rolName})=>{
    return{id,mail,name,status,idRol,rolName};
  }

  return (
    <>
      <div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>
              Id
            </Table.HeadCell>
            <Table.HeadCell>
              Rol
            </Table.HeadCell>
            <Table.HeadCell>
              correo
            </Table.HeadCell>
            <Table.HeadCell>
              Usuario
            </Table.HeadCell>
            <Table.HeadCell>
              Status
            </Table.HeadCell>
            <Table.HeadCell>
              Edit
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {currentItems.map(item => (
              <Table.Row key={item.user_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.user_id}
                </Table.Cell>
                <Table.Cell>
                  {item.rol_name}
                </Table.Cell>
                <Table.Cell>
                  {item.u_email}
                </Table.Cell>
                <Table.Cell>
                  {item.u_name}
                </Table.Cell>
                <Table.Cell>
                  {item.u_status}
                </Table.Cell>
                <Table.Cell>
                  
                    {/* componente de eliminar */}
                    <UsersDelete userId={item.user_id} onDelete={handleDeleteUser}  />
                    {/* componente editar */}
                    <UsersUpdate  id={item.user_id} mail={item.u_email} 
                    name={item.u_name} status={item.u_status} 
                    idRol={item.rol_id} rolName={item.rol_name}
                    onUpdate={handleUpdateUser}  />

                </Table.Cell> 
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* Botones de paginación */}
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(data.length / itemsPerPage)}
        />
      </div>
    </>
  );
};
