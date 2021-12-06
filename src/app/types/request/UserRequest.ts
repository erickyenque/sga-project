export interface UserRequest {
    dni: string,
    nombres: string,
    apePaterno: string,
    apeMaterno: string,
    direccion: string,
    referencia: string,
    genero: string,
    nickname: string,
    password: string,
    role: string,
    id_anio?: string
}