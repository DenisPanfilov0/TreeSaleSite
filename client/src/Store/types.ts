/*//Этот файл определяет интерфейс UserData, который описывает структуру объекта глобального стора для хранения данных пользователя, 
//включая такие как: id пользователя, имя пользователя, почту и статус (admin = true или admin = false).*/
export interface UserData {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
  }
  