import React, {useCallback, useEffect, useState} from 'react';
import {Image, Platform, Text, View} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {DropDownItem} from '../../types/DropDown/dropdown';
import {Selector} from '../../types/RegionSelector/regionSelector';
import {style} from './dropdown.style';

interface Props {
  selector: Selector;
  reset: boolean;
  _onSelectItem: (item: DropDownItem, id: number) => void;
  _onChangeText: (text: string, id: number) => void;
  _onFocus: (id: number) => void;
  _onBlur: () => void;
}

const icons = {
  downArrow: require('../../assets/images/downArrow.png'),
};

export const DropDown: React.FC<Props> = ({
  selector,
  reset,
  _onSelectItem,
  _onChangeText,
  _onFocus,
  _onBlur,
}) => {
  const {selectorId, value, currentLevel, currentLevelAccess, regions} =
    selector;
  const required = currentLevelAccess ? '' : '*';
  const getDropDownData = () =>
    regions.map(region => ({
      id: region.id,
      title: region.name,
    })) || [];

  const [suggestionsList, setSuggestionsList] = useState<DropDownItem[]>(
    getDropDownData(),
  );
  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    setSuggestionsList(getDropDownData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector.regions]);

  const renderLabel = () => {
    const {selectedItem} = selector;

    if ((selectedItem && selectedItem.title) || value) {
      return (
        <Text style={[style.label, focused && style.focused]}>
          {currentLevel}
          {required}
        </Text>
      );
    }
    return null;
  };

  const getSuggestions = typed => {
    const text = typed.toLowerCase();

    const suggestions = suggestionsList
      .filter(item => item.title && item.title.toLowerCase().includes(text))
      .map(item => ({
        id: item.id,
        title: item.title,
      }));
    setSuggestionsList(suggestions);
  };

  const onSelectItem = (item: DropDownItem) => {
    if (item) {
      // onItemSelected is sometimes called by the library on mounting
      _onSelectItem(item, selectorId);
    }
  };

  const onChangeText = (text: string) => {
    getSuggestions(text);
    if (reset) {
      _onChangeText(text, selectorId);
    }
  };

  const onFocus = () => {
    setFocused(true);
    _onFocus(selectorId);
  };

  const onBlur = () => {
    setFocused(false);
    _onBlur();
  };

  const renderItem = (item: DropDownItem) => {
    return <Text style={style.dropDownItemText}>{item.title}</Text>;
  };

  const renderChevronIconComponent = () => (
    <Image source={icons.downArrow} style={style.chevronIcon} />
  );

  return (
    <View style={style.container}>
      {renderLabel()}
      <AutocompleteDropdown
        key={selector.selectorId}
        textInputProps={{
          autoFocus: false,
          placeholder: currentLevel + required,
          style: style.textInput,
          value,
        }}
        renderItem={renderItem}
        useFilter={false}
        rightButtonsContainerStyle={style.rightButtonsContainerStyle}
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        showClear={false}
        onSelectItem={onSelectItem}
        dataSet={suggestionsList}
        onFocus={onFocus}
        onOpenSuggestionsList={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        direction={Platform.OS === 'ios' ? 'down' : undefined}
        ChevronIconComponent={renderChevronIconComponent()}
        flatListProps={{
          scrollEnabled: true,
        }}
      />
    </View>
  );
};
