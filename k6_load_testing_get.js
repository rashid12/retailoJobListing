import http from 'k6/http';
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 150,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '5s',
      preAllocatedVUs: 10, // how large the initial pool of VUs would be
      maxVUs: 20, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};
export default function () {
  http.get('http://localhost:4000/api/jobs/trending');
}