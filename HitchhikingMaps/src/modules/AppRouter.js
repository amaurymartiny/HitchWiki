/* eslint-disable react/prop-types*/

import React from 'react';
import { createRouter } from '@exponent/ex-navigation';
import CounterViewContainer from './counter/CounterViewContainer';
import HitchhikingMapViewContainer from './HitchhikingMap/HitchhikingMapViewContainer';
import SpotDetailsViewContainer from './SpotDetails/SpotDetailsViewContainer';
import NavigationBar from '../components/NavigationBar/NavigationBar';

export default Router = createRouter(() => ({
  navigationBar: () => NavigationBar,
  hitchhikingMap: () => HitchhikingMapViewContainer,
  spotDetails: () => SpotDetailsViewContainer,
  settings: () => CounterViewContainer,
}));
