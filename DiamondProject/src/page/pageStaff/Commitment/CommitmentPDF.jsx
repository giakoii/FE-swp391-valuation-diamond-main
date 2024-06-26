import React from "react";
import {
  Page,
  Text,
  Document,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import formattedDate from "../../../utils/formattedDate/formattedDate";

const CommitmentPDF = ({ commitmentResult }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Helvetica",
    },
    titleSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      marginLeft: 80,
    },
    section: {
      margin: "15px 15px",
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
      flexDirection: "row",
    },
    label: {},
    value: {},
    wrap: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 15,
    },
    wrapLeft: {
      marginBottom: "50px",
    },
    wrapRight: {
      marginBottom: "50px",
    },

    logo: {
      width: 90,
      height: 90,
    },
    policy: {
      borderRadius: "10px",
      border: "1px solid black",
      margin: "15px 15px",
    },
    id: {
      marginTop: "-10px",
      textAlign: "center",
      fontSize: 12,
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.policy}>
          <View style={styles.titleSection}>
            <Image
              style={styles.logo}
              src="/src/assets/assetsCustomer/logo.png"
            />
            <Text style={styles.title}>Commitment Form</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.id}>ID:{commitmentResult.committedId}</Text>
          </View>

        <View style={styles.wrap}>
        <View style={styles.section}>
            <View style={styles.text}>
              <Text style={styles.label}>Customer Name:</Text>
              <Text style={styles.value}>{commitmentResult.committedName}</Text>
            </View>
            <View style={styles.text}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>
                {formattedDate(commitmentResult.committedDate)}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.text}>
              <Text style={styles.label}>Order ID:</Text>
              <Text style={styles.value}>
                {commitmentResult.orderId.orderId}
              </Text>
            </View>
            <View style={styles.text}>
              <Text style={styles.label}>Civil ID:</Text>
              <Text style={styles.value}>{commitmentResult.civilId}</Text>
            </View>
          </View>
        </View>
          
          {/* Commitment Text Section */}

          <View style={styles.policy}>
            <View style={styles.section}>
              <Text style={styles.text}>
                1/ Customers have the right to request an inspection certificate
                for the product.
              </Text>
              <Text style={styles.text}>
                2/ Customers are responsible for carefully checking the above
                information before leaving the transaction counter to ensure
                product quality and quantity as expected.
              </Text>
              <Text style={styles.text}>
                3/ All complaints related to the quantity of inspection samples,
                seal quality, quantity and quality of inspection papers must be
                reported immediately at the transaction counter. Once leaving
                the counter, customers cannot request resolution of any
                complaints related to these issues.
              </Text>
              <Text style={styles.text}>
                4/ When customers sign the inspection receipt, it is considered
                that they have carefully read and agreed to the general
                regulations on inspection services specified in this document,
                unless otherwise agreed in writing between the two parties.
              </Text>
              <Text style={styles.text}>
                5/ The person coming to receive on your behalf must provide the
                following information: name, phone number, ID card/CCCD number.
              </Text>
              <Text style={styles.text}>
                I have read and committed to the above goals.
              </Text>
            </View>
            <View style={styles.wrap}>
              <View style={styles.wrapLeft}>
                <Text style={styles.text}>Manager</Text>
                {/* You can add a space or placeholder for the manager's signature */}
              </View>
              <View style={styles.wrapRight}>
                <Text style={styles.text}>Customer</Text>
                {/* You can add a space or placeholder for the customer's signature */}
              </View>
            </View>
          </View>

          {/* Signatures Section */}
        </View>
      </Page>
    </Document>
  );
};

export default CommitmentPDF;
