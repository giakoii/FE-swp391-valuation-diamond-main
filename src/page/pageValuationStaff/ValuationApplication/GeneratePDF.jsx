import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { ValuationPDF } from './ValuationPDF';

export const GeneratePDF = ({result}) => {
  return (
    <PDFViewer style={{ width: "100%", height: '800px' }} >
      <ValuationPDF result={result}  />
    </PDFViewer>
  );
};
