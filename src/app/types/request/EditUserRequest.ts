export interface EditUserRequest {
    id: number,
    dni: string,
    nombres: string,
    apePaterno: string,
    apeMaterno: string,
    nacimiento: string,
    direccion: string,
    referencia: string,
    genero: string,
    estado: string,
    nickname: string,
    password: string,
    role: string
}