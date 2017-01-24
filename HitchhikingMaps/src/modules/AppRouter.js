/*eslint-disable react/prop-types*/

import React from 'react';
import {createRouter} from '@exponent/ex-navigation';
import CounterViewContainer from './counter/CounterViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import HitchhikingMapViewContainer from './HitchhikingMap/HitchhikingMapViewContainer';
import NavigationBar from '../components/NavigationBar/NavigationBar';

export default Router = createRouter(() => ({
  navigationBar: () => NavigationBar,
  hitchhikingMap: () => HitchhikingMapViewContainer,
  settings: () => CounterViewContainer
}));
