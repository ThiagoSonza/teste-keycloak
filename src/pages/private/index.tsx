import { toast } from "react-toastify";
import "./style.css";
import { useState } from "react";

const Private = () => {
  const [clientes, setClientes] = useState();

  async function fetchClients() {
    try {
      const response = await fetch("/api/users", {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${""}`,
        },
      });

      const data = await response.json();
      setClientes(data)
      
    } catch (error) {
      toast.error("Falha na requisição");
    }
  }

  return (
    <div>
      <h1> Private page </h1>
      <button onClick={fetchClients}> Carregar Lista de Clientes </button>

      {clientes && (
        <>
          <h6>Clientes: </h6>
          <li>{clientes}</li>
        </>
      )}
    </div>
  );
};

export default Private;
