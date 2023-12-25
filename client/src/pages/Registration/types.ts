/*//Этот файл определяет интерфейс IUser, который описывает структуру объекта пользователя, 
//включая данные: имя пользователя, почту, пароль и телефон.*/
export interface IUser {
  username: string
  email: string
  password: string
  phone: string
}
