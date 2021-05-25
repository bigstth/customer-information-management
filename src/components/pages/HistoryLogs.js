import React from 'react';
import HistoryTable from '../tables/HistoryTable';
import config from '../../config/config.json';
import { Container, Spinner } from 'react-bootstrap';
import axios from 'axios';

const HistoryLogs = () => {
  const profile = JSON.parse(localStorage.getItem('profile'));
  const token = JSON.parse(localStorage.getItem('token'));
  const [histories, setHistories] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  async function getData() {
    try {
      setLoading(true);
      const res = await axios.get(`${config.API_HOSTNAME}/histories`, {
        headers: {
          Authorization: 'Bearer ' + token.auth_token,
        },
      });
      if (res.status === 200 || res.status === 204) {
        setHistories(res.data.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);
  if (loading === true) {
    return (
      <>
        <Container className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </Container>
      </>
    );
  }
  if (profile.role !== 'admin') {
    return (
      <>
        <div className="container d-flex flex-column justify-content-center text-center mt-5">
          <h2> Access Denied </h2>
          <p>Only Administrator can access this page</p>
        </div>
      </>
    );
  }
  return <>{<HistoryTable histories={histories}></HistoryTable>}</>;
};
export default HistoryLogs;
