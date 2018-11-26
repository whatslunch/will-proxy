import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '5m',
  rps: 1000,
};

export default function () {
  http.get(`http://localhost:9000/api/overview/9999999`);
  sleep(1);
};