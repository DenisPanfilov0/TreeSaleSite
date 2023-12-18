import React from 'react';
import './ContractPage.css'; // Создайте файл для стилей

const ContractPage = ({ user, order }) => {
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
        <img src="/image/dogovor_po_drovam2_page-0002.jpg" alt="Image 2" />
      </div>
    </div>
  );
};

export default ContractPage;
