export type TClientes = {
    id: string;
    nome: string;
    documentos: TDocumentos;
    telefone: TTelefones;
    clienteVip: boolean;
    cidade: string;
}

type TDocumentos = {
    cpf: string;
    rg: string;
}

type TTelefones = {
    ddd: string;
    numero: string;
}