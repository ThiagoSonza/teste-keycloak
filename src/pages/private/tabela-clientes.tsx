import { TClientes } from "../../core/model/clientes";

interface IProps {
  data: TClientes[] | undefined;
}

export default function TabelaClientes({ data }: IProps) {
  return data?.length ? (
    <>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>RG</th>
            <th>Cidade</th>
            <th>Telefone</th>
            <th>VIP</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>{item.documentos.cpf}</td>
              <td>{item.documentos.rg}</td>
              <td>{item.cidade}</td>
              <td>{`(${item.telefone.ddd}) ${item.telefone.numero}`}</td>
              <td>{item.clienteVip ? "SIM" : "NÃO"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <></>
  );
}
