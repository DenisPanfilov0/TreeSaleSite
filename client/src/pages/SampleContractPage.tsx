import React from 'react';
import './SampleContractPage.css';
import { Button } from 'antd';

const SampleContractPage = () => {

  const handleDownload = () => {
    const filePath = process.env.PUBLIC_URL + '/document.pdf'; // Путь к файлу в папке public
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'document.pdf'; // Имя файла для скачивания
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="contract-page1">
      <div className="contract-content1">
        <h1>Договор</h1>
        <Button type='primary' onClick={handleDownload}>Скачать документ</Button>
      </div>
      <div className="image-scroll-container1">
        <img src="/image/dogovor_po_drovam2_page-0001.jpg" alt="Image 1" />
        <img src="/image/dogovor_po_drovam2_page-0002.jpg" alt="Image 2" />
      </div>
    </div>
  );
};

export default SampleContractPage;
