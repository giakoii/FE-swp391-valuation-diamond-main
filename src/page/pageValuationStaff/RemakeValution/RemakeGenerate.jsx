import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { RemakePDF } from './RemakePDF';
export const RemakeGenerate = ({result}) => {
  return (
    <PDFViewer style={{ width: "100%", height: '800px' }} >
      <RemakePDF result={result}  />
    </PDFViewer>
  );
};
