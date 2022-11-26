import {DropDownItem} from '../DropDown/dropdown';

export interface RegionSelectorData {
  currentLevel: string;
  currentLevelAccess: boolean;
  nextLevelAccess: boolean;
  nextPage: null;
  regions: RegionsData[];
}

export interface RegionsData {
  id: string;
  name: string;
}

export interface Selector extends RegionSelectorData {
  selectorId: number;
  selectedItem: DropDownItem;
  value: string;
}
