import React from 'react';
import { Page, Text, Document, View, StyleSheet, Image } from '@react-pdf/renderer';

export const RemakePDF = ({ result }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
    },
    titleSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      marginLeft: 10,
    },
    section: {
      marginBottom: 15,
    },
    header: {
      backgroundColor: '#7CF4DE',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 10,
      padding: 5,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
      display: 'flex',
      justifyContent: 'space-between',
    },
    label: {
      fontWeight: 'bold',
      marginRight: 5,
    },
    value: {
      marginLeft: 'auto',
      textAlign: 'right'
    },
    wrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    wrapLeft: {
      width: '48%',
    },
    wrapRight: {
      width: '48%',
    },
    image: {
      width: '100%',
      height: 'auto',
    },
    logo: {
      width: 100,
      height: 100,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleSection}>
          <Image style={styles.logo} src="/src/assets/assetsCustomer/logo.png" />
          <Text style={styles.title}>Valuation Report</Text>
        </View>
        <View style={{ textAlign: 'center', marginBottom: 20 }}>
          <Text style={styles.text}>
            <Text style={styles.label}>Certificate ID:</Text>
            <Text style={styles.value}>{result.evaluationResultId}</Text>
          </Text>
        </View>
        <View style={styles.wrap}>
          <View style={styles.wrapLeft}>
            <View style={styles.section}>
              <Text style={styles.header}>Diamond Valuation Report</Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Diamond Origin:            </Text>
                <Text style={styles.value}>{result.diamondOrigin}</Text>
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Measurements:              </Text>
                <Text style={styles.value}>{result.measurements}</Text>
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Shape Cut:                 </Text>
                <Text style={styles.value}>{result.shapeCut}</Text>
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Description:               </Text>
                <Text style={styles.value}>{result.description}</Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Grading Results</Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Carat Weight:              </Text>
                <Text style={styles.value}>{result.caratWeight}</Text>
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Color Grade:               </Text>
                <Text style={styles.value}>{result.color}</Text>
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Clarity Grade:             </Text>
                <Text style={styles.value}>{result.clarity}</Text>
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Cut Grade:                 </Text>
                <Text style={styles.value}>{result.cut}</Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Additional Grading Information</Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Polish:</Text>
                <Text style={styles.value}>{result.polish}</Text>
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Symmetry:</Text>
                <Text style={styles.value}>{result.symmetry}</Text>
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Fluorescence:               </Text>
                <Text style={styles.value}>{result.fluorescence}</Text>
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Proportion:                 </Text>
                <Text style={styles.value}>{result.proportions}</Text>
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Estimate Price:             </Text>
                <Text style={styles.value}>{result.price}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.wrapRight}>
            <View style={styles.section}>
              <Text style={styles.header}>Product Image</Text>
              {result.img && (
                <Image style={styles.image} src={result.img} />
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
