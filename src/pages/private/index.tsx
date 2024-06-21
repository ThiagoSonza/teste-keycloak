import { toast } from "react-toastify";
import "./style.css";
import { useContext, useState } from "react";
import * as PocApi from "../../core/api/clientes";
import { TClientes } from "../../core/model/clientes";
import TabelaClientes from "./tabela-clientes";
import { AuthContext } from "../../context";

const Private = () => {
  const [clientes, setClientes] = useState<TClientes[] | undefined>([]);
  const { loading, user } = useContext(AuthContext);

  async function fetchClients() {
    try {
      const data = await PocApi.obterTodosClientes();
      setClientes(data);
    } catch (error) {
      setClientes(undefined);
      toast.error("Falha na requisição");
    }
  }

  async function fetchClientsByFilial() {
    try {
      const data = await PocApi.obterTodosClientesByFilial();
      setClientes(data!);
    } catch (error) {
      toast.error("Falha na requisição");
    }
  }

  async function fetchClientsLocalidade() {
    try {
      const data = await PocApi.obterTodosClientesByCidade();
      setClientes(data);
    } catch (error) {
      setClientes(undefined);
      toast.error("Falha na requisição");
    }
  }

  return loading ? (
    <></>
  ) : (
    <div className="buttons-actions">
      <div>
        <button onClick={fetchClients}> Carregar Todos Clientes </button>
        {user["grupos-acesso"]?.includes("/Setor/Diretoria") ? (
          <></>
        ) : (
          <>
            <button onClick={fetchClientsByFilial}>
              Carregar Clientes da Filial
            </button>
            <button onClick={fetchClientsLocalidade}>
              Carregar Clientes de Guaíba
            </button>
          </>
        )}
      </div>

      <div>
        <TabelaClientes data={clientes} />
      </div>
    </div>
  );
};

export default Private;
