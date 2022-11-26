import {useState} from 'react';
import {Alert} from 'react-native';
import {getRegionDetails} from '../../services/regionData';
import {RegionSelectorData} from '../../types/RegionSelector/regionSelector';

const useRegionDetails = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  // const [regionData, setRegionData] = useState<
  //   RegionSelectorData | undefined
  // >();

  const getRegionData = async (
    regionKey: string,
  ): Promise<RegionSelectorData | undefined> => {
    setIsFetching(true);
    try {
      const response = await getRegionDetails(regionKey);
      // console.log('API call response', response);
      // setRegionData(response);

      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : JSON.stringify(error);

      Alert.alert('Error', message);
    } finally {
      setIsFetching(false);
    }
  };

  return {
    isFetching,
    // regionData,
    getRegionData,
  };
};

export default useRegionDetails;
