import React from 'react';
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config.json';
import { Container, Spinner } from 'react-bootstrap';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    paddingTop: 30,
    paddingBottom: 30,
  },
});

const PDFReport = () => {
  const { id } = useParams();
  const [customer, setCustomer] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const token = JSON.parse(localStorage.getItem('token'));
  async function getData(id) {
    try {
      setLoading(true);
      const res = await axios.get(`${config.API_HOSTNAME}/customers/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token.auth_token,
        },
      });
      if (res.status === 200) {
        setCustomer(res.data.data);
      }
    } catch (err) {
    } finally {
      setTimeout(1000);
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getData(id);
  }, [id]);

  if (loading === true) {
    return (
      <>
        <Container className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </Container>
      </>
    );
  }
  if (loading === false) {
    return (
      <PDFViewer className="container-fluid" height={800}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View
              style={
                ([styles.section],
                {
                  fontSize: 18,
                  textAlign: 'center',
                  paddingBottom: 20,
                  marginTop: 30,
                })
              }
            >
              <Text>Customer's Information</Text>
            </View>
            <View
              style={
                ([styles.section],
                { fontSize: 16, paddingLeft: 150, paddingTop: 10 })
              }
            >
              <Text style={([styles.text], { paddingBottom: 10 })}>
                Name: {customer.customer.first_name}{' '}
                {customer.customer.last_name}
              </Text>
              <Text style={([styles.text], { paddingBottom: 10 })}>
                Email: {customer.customer.email}
              </Text>
              <Text style={([styles.text], { paddingBottom: 10 })}>
                Telephone Number: {customer.customer.phone_number}
              </Text>
              <Text style={([styles.text], { paddingBottom: 10 })}>
                Date of birth: {customer.date_of_birth}
              </Text>
              <Text style={([styles.text], { paddingBottom: 10 })}>
                Weight: {customer.customer.weight} kgs.
              </Text>
              <Text style={([styles.text], { paddingBottom: 10 })}>
                Drug allergy: {customer.customer.drug_allergy}
              </Text>
            </View>
            <View
              style={
                ([styles.section],
                {
                  fontSize: 18,
                  textAlign: 'center',
                  paddingBottom: 20,
                  marginTop: 100,
                })
              }
            >
              <Text>Treatment Record</Text>
            </View>
            <View
              style={
                ([styles.section],
                { fontSize: 16, paddingLeft: 150, paddingTop: 10 })
              }
            >
              <Text style={([styles.text], { paddingBottom: 10 })}>
                Symptom: {customer.customer.symptom}
              </Text>
              <Text style={([styles.text], { paddingBottom: 10 })}>
                Diagnosis: {customer.customer.diagnosis}
              </Text>
              <Text style={([styles.text], { paddingBottom: 10 })}>
                Caretaker Doctor: {customer.customer.caretaker_doctor}
              </Text>
              <Text style={([styles.text], { paddingBottom: 10 })}>
                status: {customer.customer.status}
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
};

export default PDFReport;
