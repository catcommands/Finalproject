import React from 'react';

import { hot } from "react-hot-loader/root";

import { Viewer, Entity } from "resium";
import { Cartesian3 } from "cesium";

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const pointGraphics = { pixelSize: 10 };

const App = () => (
  <Viewer full>
    <Entity position={position} point={pointGraphics} />
  </Viewer>
);

export default hot(App);