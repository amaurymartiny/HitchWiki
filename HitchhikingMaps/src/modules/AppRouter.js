/*eslint-disable react/prop-types*/

import React from 'react';
import {createRouter} from '@exponent/ex-navigation';
import CounterViewContainer from './counter/CounterViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import HitchhikingMapViewContainer from './HitchhikingMap/HitchhikingMapViewContainer';

export default Router = createRouter(() => ({
  hitchhikingMap: () => HitchhikingMapViewContainer,
}));
