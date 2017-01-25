/* eslint-disable react/prop-types*/

import React from 'react';
import { createRouter } from '@exponent/ex-navigation';
import CounterViewContainer from './counter/CounterViewContainer';
import HitchhikingMapViewContainer from './HitchhikingMap/HitchhikingMapViewContainer';
import SpotDetailsViewContainer from './SpotDetails/SpotDetailsViewContainer';
import TabBar from '../components/TabBar/TabBar';

export default Router = createRouter(() => ({
  tabBar: () => TabBar,
  hitchhikingMap: () => HitchhikingMapViewContainer,
  spotDetails: () => SpotDetailsViewContainer,
  settings: () => CounterViewContainer,
}));
