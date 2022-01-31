export interface UserResponse {
    id_persona: string,
    dni: string,
    nombres: string,
    apePaterno: string,
    apeMaterno: string,
    nacimiento: string,
    direccion: string,
    referencia: string,
    genero: string,
    estado: string,
    fecha_registro: string,
    role?: string,
    id_usuario?: string
}