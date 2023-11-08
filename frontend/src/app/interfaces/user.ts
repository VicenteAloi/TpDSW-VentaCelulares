export interface user {
  idUser: number, //PK, Autoincremental
  password: string
  email: string, //Unique 
  dni: string,
  name: string,
  surname: string,
  isAdmin: boolean
}