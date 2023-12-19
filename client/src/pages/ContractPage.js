import React from 'react';
import './ContractPage.css';
import './TextImage.css';


// const ImageOverlay = ({ text }) => (
//   <div className="contract_date">
//     <p>{text}</p>
//     {/* Другие элементы или текст */}
//   </div>
// );


const ContractPage = ({ user, order }) => {

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;

  return (
    <div className="contract-page">
      <div className="contract-content">
        <h1>Договор</h1>
        <p>Имя пользователя: {/*user.username*/}</p>
        <p>Email: {/*user.email*/}</p>
        <p>Детали заказа: {/*order.details*/}</p>
        <button onClick={() => window.print()}>Печать</button>
      </div>

      <div className="image-scroll-container">
        <img src="/image/dogovor_po_drovam2_page-0001.jpg" alt="Image 1" />
        <div className="contract_date">{formattedDate}</div>
        {/* <div className="delivery_address"><p>"Адрес Доставки"</p></div> */}
        <img src="/image/dogovor_po_drovam2_page-0002.jpg" alt="Image 2" />
        {/* <ImageOverlay text="Текст поверх изображения 2" /> */}
      </div>
    </div>
  );
};

export default ContractPage;
