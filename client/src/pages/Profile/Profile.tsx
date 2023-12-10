import React from 'react';
import { useUnit } from 'effector-react';
import { $user } from '../../Store/Store';
// import { Redirect } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const user = useUnit($user);

//   if (!user) {
//     return <Redirect to="/login" />;
//   }

return (
    <div>
      <h2>Профиль пользователя</h2>
      {user ? (
        <>
          <p>ID: {user._id}</p>
          <p>Имя пользователя: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Админ: {user.isAdmin ? 'Да' : 'Нет'}</p>
        </>
      ) : (
        <p>Пользователь не вошел в систему</p>
      )}
    </div>
  );
      }

export default UserProfile;
