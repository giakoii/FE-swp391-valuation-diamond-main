import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import CommitmentPDF from './CommitmentPDF';

const CommitmentGenerate = ({ commitmentResult }) => {
  return (
    <PDFViewer style={{ width: "100%", height: '800px' }} >
      <CommitmentPDF commitmentResult={commitmentResult} />
    </PDFViewer>
  );
}
export default CommitmentGenerate;
