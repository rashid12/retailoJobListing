import http from 'k6/http';
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '5s',
      preAllocatedVUs: 500, // how large the initial pool of VUs would be
      maxVUs: 800, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};
export default function () {
  var payload = JSON.stringify({
    "id": (Math.random() * (999999999 - 1) + 1).toString(),
    "job_title": "Engineer",
    "company": "Plambee",
    "location": "New York",
    "post_date": "12/29/2020",
    "apply_email": "lcotton0@alibaba.com",
    "leave_type": "Monthly",
    "trending": "true",
  });
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post('http://localhost:4000/api/jobs',payload,params);
}