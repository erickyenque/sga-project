import { FileResponse } from "./FileResponse";

export interface ModulosResponse {
    id_modulo: string;
    nombre: string;
    fecha: string;
    cod_materia: string;
    archivos?: FileResponse[]
}