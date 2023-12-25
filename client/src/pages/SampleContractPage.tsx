/*//Этот файл представляет страницу React, отвечающую за отображение образца договора без заполненных полей.*/
const ContractPage = () => {

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
        {/* <div className="delivery_address"><p>"Адрес Доставки"</p></div> */}
        <img src="/image/dogovor_po_drovam2_page-0002.jpg" alt="Image 2" />
        {/* <ImageOverlay text="Текст поверх изображения 2" /> */}
      </div>
    </div>
  );
};

export default ContractPage;
