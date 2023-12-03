import { Table,Pagination } from "flowbite-react"
import Cookies from "universal-cookie"
import axios from "axios"
import { useState,useEffect } from "react";

export const RolesList=()=>{
    //se extrae el token de la cookie
    const cookies = new Cookies();
    const token = cookies.get('auth');
    //url  de roles de la api
    const url = 'http://localhost:3000/roles';
    //se declara el hook para mostrar los datos
    const [data,setData]= useState([]);
     // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página
  //declrar la autorización del token en una variable
  const headers={
    Authorization: `Bearer ${token}`
  };

  //trae los datos de la api
  useEffect(()=>{

    const list=async()=>{
        try {
            const response= await axios.get(url,{headers});
            setData(response.data);
            
        } catch (error) {
            console.log(error);
        }

    }
    
    return list;
  },[]);

     // Lógica para calcular los elementos a mostrar en la página actual
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
     // Función para manejar el cambio de página
     const handlePageChange = (page) => {
         setCurrentPage(page);
     };




    return(
        <>

        <Table>
      <Table.Head>
        <Table.HeadCell>
          Id
        </Table.HeadCell>
        <Table.HeadCell>
          Nombre
        </Table.HeadCell>
        <Table.HeadCell>
          Acciones
        </Table.HeadCell>
     
      </Table.Head>
      <Table.Body className="divide-y">
        {
            currentItems.map(item => (

            
        <Table.Row key={item.rol_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
           {item.rol_id}
          </Table.Cell>
          <Table.Cell>
            {item.rol_name}
          </Table.Cell>
          <Table.Cell>
            Laptop
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
        
        
        </>
    )


}