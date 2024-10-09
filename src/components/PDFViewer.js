import React from 'react';
import styled from 'styled-components';

const PDFIcon = styled.div`
  display: inline-block;
  margin: 10px;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
  }
`;
// pdf icon
const PDFViewer = ({ url }) => {
  const handleOpenPDF = () => {
    window.open(url, '_blank');
  };

  return (
    <PDFIcon onClick={handleOpenPDF}>
      <img src="/path/to/pdf-icon.png" alt="PDF Icon" />
    </PDFIcon>
  );
};

export default PDFViewer;
