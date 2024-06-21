import axios, { AxiosError } from "axios";
import { TClientes } from "../model/clientes";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:5000/clientes";

const handleStatus = (status: number) => {
  if (status === 401) toast.error("Acesso negado");
  if (status === 403) toast.error("Não autorizado");
  if (status === 404) toast.warning("Nenhum cliente encontrado");
};

const obterTodosClientes = async () => {
  try {
    const token = localStorage.getItem("poc:token");
    const { data } = await axios.get<TClientes[]>(`${baseUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    const { response } = error as AxiosError;
    handleStatus(response?.status!);
  }
};

const obterTodosClientesByFilial = async () => {
  try {
    const token = localStorage.getItem("poc:token");

    const { data } = await axios.get<TClientes[]>(`${baseUrl}/filiais`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    const { response } = error as AxiosError;
    handleStatus(response?.status!);
  }
};

const obterTodosClientesByCidade = async () => {
  try {
    const token = localStorage.getItem("poc:token");
    const { data } = await axios.get<TClientes[]>(
      `${baseUrl}/filial/Guaíba/vip`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    const { response } = error as AxiosError;
    handleStatus(response?.status!);
  }
};

export {
  obterTodosClientes,
  obterTodosClientesByFilial,
  obterTodosClientesByCidade,
};
