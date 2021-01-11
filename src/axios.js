// axios
import main from '@/main.js';
import axios from 'axios';

const domain = location.host.indexOf('localhost') === -1 ? 'https://api.followerspark.com/api/v1' : 'https://localhost:44344/api/v1';
const currentUser = JSON.parse(localStorage.getItem('userInfo') || '{}');

export default axios.create({
  domain
})

export function getRequest(url) {
  return request(url, null, 'get')
}

export function postRequest(url, data) {
  return request(url, data, 'post')
}

export function putRequest(url, data) {
  return request(url, data, 'put')
}

export function deleteRequest(url) {
  return request(url, null, 'delete')
}

function request(url, data, method) {
  return new Promise(async (resolve) => {
    try {

      const response = await axios({
        method: method,
        url: `${domain}${url}`,
        data: data !== null ? JSON.stringify(data) : null,
        validateStatus: false,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${currentUser.type || ''} ${currentUser.token || ''}`
        }
      });


      if (response.status !== 200 && (response.data || {}).message) {
        main.$vs.notify({
          title: main.$i18n.t(response.data.message),
          color: "danger",
          position: "top-center",
        });

        return resolve({
          isSuccess: false,
        });
      }

      return resolve({
        data: response.data,
        // ...json,
        isSuccess: response.status === 200
      });
    } catch (error) {
      console.log('Http error', error)

      return resolve({
        isSuccess: false,
      });
    }
  });
}