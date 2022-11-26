import {GetProps, InterpretedError} from '../types/Api/api';
import {RegionSelectorData} from '../types/RegionSelector/regionSelector';
import {get} from './api';

const serviceUrl = 'region/';

export const getRegionDetails = (
  regionKey: string,
): Promise<RegionSelectorData> => {
  const getPayload: GetProps = {
    serviceUrl,
    serviceKey: regionKey,
  };

  return new Promise((resolve, reject) => {
    get(getPayload)
      .then(response => {
        if (response.status === true) {
          resolve(response.data);
        } else {
          reject(response.status);
        }
      })
      .catch((err: InterpretedError) => {
        reject(err);
      });
  });
};
