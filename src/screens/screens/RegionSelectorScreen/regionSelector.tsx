import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from '../../../components/Button/button';
import {DropDown} from '../../../components/DropDown/dropdown';
import {defaultRegionID} from '../../../config';
import {DropDownItem} from '../../../types/DropDown/dropdown';
import {
  RegionSelectorData,
  Selector,
} from '../../../types/RegionSelector/regionSelector';
import useRegionDetails from '../../hooks/useRegionDetails';
import {style} from './regionSelector.style';

interface Props {}

const initialState: Selector = {
  selectorId: 0,
  selectedItem: {id: '', title: ''},
  currentLevel: '',
  currentLevelAccess: false,
  nextLevelAccess: false,
  nextPage: null,
  regions: [],
  value: '',
};

export const RegionSelectorScreen: React.FC<Props> = () => {
  const {isFetching, getRegionData} = useRegionDetails();

  const [regionID, setRegionID] = useState(defaultRegionID);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [currSelectorID, setCurrSelectorID] = useState<number | undefined>();
  const [selectors, setSelectors] = useState<Selector[]>([]);

  const initializeData = () => {
    getRegionData(defaultRegionID).then(data => {
      const selectorId = 0;
      const newSelector = [
        {
          selectorId,
          selectedItem: initialState.selectedItem,
          ...(data as RegionSelectorData),
          value: '',
        },
      ];

      setSelectors(newSelector);
    });
  };

  useEffect(() => {
    initializeData();

    return () => {
      setSelectors([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currSelectorID !== undefined && regionID) {
      const selectedItem =
        selectors[currSelectorID] && selectors[currSelectorID].selectedItem;

      getRegionData(regionID).then(data => {
        if (data) {
          const isButtonDisabled = !(
            data.currentLevelAccess && selectedItem.id
          );
          setButtonDisabled(isButtonDisabled);
          upsertSelector(data, currSelectorID);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionID]);

  const clearAll = () => {
    setRegionID('');
    setButtonDisabled(true);
    initializeData();
  };

  const reset = (selectorId: number) =>
    currSelectorID !== undefined ? selectorId > currSelectorID : false;

  const resetSelector = (selector: Selector) => ({
    ...selector,
    selectedItem: initialState.selectedItem,
    value: initialState.value,
    regions: [],
  });

  const updateSelectorsForOnChangeText = (id: number, text: string) =>
    selectors.map(selector => {
      if (selector.selectorId === id) {
        return {
          ...selector,
          selectedItem: initialState.selectedItem,
          value: text,
        };
      } else if (reset(selector.selectorId)) {
        return resetSelector(selector);
      }
      return selector;
    });

  const updateSelectorsForOnSelectItem = (
    id: number,
    selectedItem: DropDownItem,
    data?: RegionSelectorData,
  ) => {
    const updatedSelectors = selectors.map(selector => {
      if (selector.selectorId === id) {
        return {
          ...selector,
          selectedItem,
          value: selectedItem.title || '',
          ...data,
        };
      } else if (reset(selector.selectorId)) {
        return resetSelector(selector);
      }

      return selector;
    });

    setSelectors(updatedSelectors);
  };

  const upsertSelector = (data: RegionSelectorData, id: number) => {
    const nextSelectorId = id + 1;
    const nextSelectorExists = selectors[nextSelectorId];

    if (nextSelectorExists) {
      updateSelectorsForOnSelectItem(
        nextSelectorId,
        initialState.selectedItem,
        data,
      );
    } else {
      const newSelector = [
        {
          selectorId: nextSelectorId,
          selectedItem: initialState.selectedItem,
          ...data,
          value: '',
        },
      ];

      setSelectors([...selectors, ...newSelector]);
    }
  };

  const onSelectItem = (selectedItem: DropDownItem, id: number) => {
    updateSelectorsForOnSelectItem(id, selectedItem);
    const selector = selectors[id];

    if (!selector.nextLevelAccess) {
      setButtonDisabled(false);
      return;
    }

    setRegionID(selectedItem.id);
  };

  const onChangeText = (text: string, id: number) => {
    const updatedSelectors = updateSelectorsForOnChangeText(id, text);

    setButtonDisabled(true);
    setSelectors(updatedSelectors);
  };

  const onFocus = useCallback((id: number) => {
    setCurrSelectorID(id);
  }, []);

  const onBlur = useCallback(() => {
    setCurrSelectorID(undefined);
  }, []);

  const renderDropDown = (selector: Selector, id: number) => {
    const key = `dropdown-${id}`;
    const zIndex = selectors.length - id;

    return (
      <View key={key} style={Platform.select({ios: {zIndex}})}>
        <DropDown
          key={key}
          selector={selector}
          _onSelectItem={onSelectItem}
          _onChangeText={onChangeText}
          _onFocus={onFocus}
          _onBlur={onBlur}
          reset={currSelectorID !== undefined ? id >= currSelectorID : false}
        />
      </View>
    );
  };

  const onSearchPress = () => {
    let result: {[key: string]: string} | undefined;

    selectors.forEach(selector => {
      const key = selector.currentLevel;
      if (key) {
        result = {...result, [key]: selector.value};
      } else {
        // add some tracking/logging here
      }
    });

    Alert.alert('Output', JSON.stringify(result));
  };

  const renderMainContent = () => (
    <View style={style.contentContainer}>
      <View style={style.headerContainer}>
        <Text style={style.text}>FILTERS</Text>
        <TouchableOpacity onPress={clearAll}>
          <Text style={[style.text, style.clearAllText]}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>

      {selectors && selectors.map(renderDropDown)}
      <Button
        style={style.buttonContainer}
        label={isFetching ? 'Loading...' : 'Search'}
        disabled={buttonDisabled}
        onClick={onSearchPress}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      {renderMainContent()}
    </KeyboardAvoidingView>
  );
};
