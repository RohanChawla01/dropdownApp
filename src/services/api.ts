import axios, {AxiosRequestConfig} from 'axios';
import {APIKey} from '../config';
import {GetProps, GetResponse} from '../types/Api/api';

const baseUrl: string = 'https://demo.api.satsure.co/';
let headers = {
  'x-api-key': APIKey,
  'content-type': 'application/json',
};

export const get = ({serviceKey, serviceUrl}: GetProps): Promise<GetResponse> =>
  new Promise((resolve, reject) => {
    const options: AxiosRequestConfig = {
      method: 'get',
      headers,
      url: baseUrl + serviceUrl + serviceKey,
    };

    axios(options)
      .then(res => {
        if (res && res.data) {
          resolve(res.data);
        } else {
          const dummyData = {data: '', status: res.status === 200};
          resolve(dummyData);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
