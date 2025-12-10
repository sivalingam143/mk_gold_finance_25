import React from 'react'
import {  PDFViewer } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import ReceiptPDF from './jewelInterestPdf';
// import MonthnineNoticePDF from './notice_9month.jsx';
// import MonthelevenNoticePDF from './notice11month.js';

const JewelInterestPreview = () => {
  const location = useLocation();
  const { type, rowData } = location.state || {};
  console.log({type,rowData});
  return(
    <PDFViewer width="100%" height="1000">
    {/* <MonthelevenNoticePDF data={rowData} /> */}
      <ReceiptPDF data={rowData} />
    </PDFViewer>
  )
}
export default JewelInterestPreview