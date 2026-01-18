export interface User
{
  login : string,
  password : string,
}

export interface CreatingUser {
  login: string,
  password: string,
  repeatPassword: string
}