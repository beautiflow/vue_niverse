<script setup>
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Map, View} from 'ol';
import {fromLonLat, get  } from 'ol/proj'; 
import { ref, onMounted, watch } from 'vue';
import 'ol/ol.css';
import FullScreen from 'ol/control/FullScreen.js';
import {defaults as defaultControls} from 'ol/control/defaults.js';
import ZoomSlider from 'ol/control/ZoomSlider.js';
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import DragRotateAndZoom from 'ol/interaction/DragRotateAndZoom.js';
import {defaults as defaultInteractions} from 'ol/interaction/defaults.js';
import Rotate from 'ol/control/Rotate.js';
import { toggleWMS } from '@/utils/map/wmsLayer.js';
import { toggleWFS } from '@/utils/map/wfsLayer.js';
import { toggleMyGeoPolygon } from '@/utils/map/handlePolygon.js';
import { toggleMyGeoPoint } from '@/utils/map/handlePoint.js';
import ScaleLine from 'ol/control/ScaleLine.js';
import OverviewMap from 'ol/control/OverviewMap.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Draw from 'ol/interaction/Draw.js';
import Modify from 'ol/interaction/Modify.js';
import Snap from 'ol/interaction/Snap.js';
import { Style,  Circle as CircleStyle, Fill, Stroke } from 'ol/style';

let map;
let mousePositionControl; 
let overviewMapControl;
let control;
let draw, snap; 

const key = import.meta.env.VITE_MAP_THUNDERFOREST_KEY;

const showWMS = ref(false); 
const showWFS = ref(false); 
const showMyGeoPolygon = ref(false); 
const showMyGeoPoint = ref(false); 
const projection = ref('EPSG:4326');
const precision = ref(4);
const mousePositionTarget = ref(null);
const units = ref('metric');
const type = ref('scaleline');
const scaleBarOptionsContainer = ref(null);
const unitsSelect = ref(null);
const typeSelect = ref(null);
const stepsRange = ref(null);
const scaleTextCheckbox = ref(null);
const invertColorsCheckbox = ref(null);
const myGeoVectorRef = ref(null);
const drawType = ref('Point');

// 기본 지도
const defaultMap = {
  center: fromLonLat([0, 0]), 
  zoom: 2,
};

// WMS 지도
const onWMS = () => {
  toggleWMS(map, showWMS, setViewPosition);
};

const setViewPosition = (options) => {
  const mapView = map.getView();
  mapView.setCenter(options?.center ? options.center : defaultMap.center);
  mapView.setZoom(options?.zoom ? options.zoom : defaultMap.zoom)
}

// WFS 지도
const onWFS = () => {
    toggleWFS(map, showWFS, setViewPosition, key);
}

// geoServer 데이터 연동 - POLYGON
const onMyGeoPolygon = () => {
  toggleMyGeoPolygon(map, showMyGeoPolygon, setViewPosition);
}

// geoServer 데이터 연동 - POINT
const onMyGeoPoint = async () => {
    toggleMyGeoPoint(map, showMyGeoPoint, setViewPosition, myGeoVectorRef);
}

// control - scaleLine 
const scaleControl = () => {
  if (typeSelect.value === 'scaleline') {
    control = new ScaleLine({
      units: unitsSelect.value,
    });
    scaleBarOptionsContainer.value.style.display = 'none';
  } else {
    control = new ScaleLine({
      units: unitsSelect.value,
      bar: true,
      steps: parseInt(stepsRange.value, 10),
      text: scaleTextCheckbox.value.checked,
      minWidth: 140,
    });
    onInvertColorsChange();
scaleBarOptionsContainer.value?.style && (scaleBarOptionsContainer.value.style.display = 'block');
  }
  return control;
}

const onChangeUnit = () => {
  control.setUnits(unitsSelect.value);
}

const reconfigureScaleLine = () => {
  map.removeControl(control);
  map.addControl(scaleControl());
}

const onInvertColorsChange = () => {
control.element.classList.toggle(
    'ol-scale-bar-inverted',
    invertColorsCheckbox.value.checked,
  );
}

// interaction - draw and modify features
const drawRaster = new TileLayer({
  source: new OSM(),
});

const source = new VectorSource();
const drawVector = new VectorLayer({
  source: source,
  style: new Style({
    image: new CircleStyle({
      radius: 7, 
      fill: new Fill({ color: 'rgba(255, 0, 0, 0.1)' }),
      stroke: new Stroke({
        color: '#ff0000', 
        width: 2, 
      }),
    }),
    fill: new Fill({ color: 'rgba(255, 0, 0, 0.1)' }),
    stroke: new Stroke({
      color: '#ff0000',
      width: 2, 
    }),
  }),
});

const extent = get(projection.value).getExtent().slice();
extent[0] += extent[0];
extent[2] += extent[2];

const modify = new Modify({source: source});
const addInteractions = () => {
  if (!map || !drawType.value) {
    console.log('Map or drawType is not ready.');
    return;
  }
  draw = new Draw({
  source: source, 
  type: drawType.value, 
  });
  map.addInteraction(draw);

  snap = new Snap({ source: source }); 
  map.addInteraction(snap);
  map.addInteraction(modify);
};


onMounted (() => {
  unitsSelect.value?.addEventListener('change', onChangeUnit);
  typeSelect.value?.addEventListener('change', reconfigureScaleLine);
  stepsRange.value?.addEventListener('input', reconfigureScaleLine);
  scaleTextCheckbox.value?.addEventListener('change', reconfigureScaleLine);
  invertColorsCheckbox.value?.addEventListener('change', onInvertColorsChange);

  mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(precision.value),
    projection: projection.value,
    className: 'custom-mouse-position',
    target: mousePositionTarget.value,
    undefinedHTML: '&nbsp;',
  });

  overviewMapControl = new OverviewMap({
  className: 'ol-overviewmap ol-custom-overviewmap',
  layers: [
    new TileLayer({
      source: new OSM({
        'url':
          'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
          '?apikey='+key,
      }),
    }),
  ],
  collapseLabel: '\u00BB',
  label: '\u00AB',
  collapsed: false,
  });

  map =  new Map({
    target: 'map-container',
    controls: defaultControls().extend([
      new FullScreen(),
      new Rotate(),
      scaleControl(),
      mousePositionControl,
      overviewMapControl,
    ]),
    interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      drawRaster, drawVector 
      ],
    view: new View({...defaultMap}),
  });
  const zoomslider = new ZoomSlider();
  map.addControl(zoomslider);
  map.addInteraction(modify);
  addInteractions(); 
});

watch(projection, (newVal) => {
  mousePositionControl.setProjection(newVal);
});

watch(precision, (newVal) => {
  mousePositionControl.setCoordinateFormat(createStringXY(newVal));
});

watch(drawType, () => {
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    addInteractions();
});

</script>

<template>
  <div>
    <button @click="onWMS" class="btn btn-success mb-2">    
        {{ showWMS ? 'Off WMS' : 'On WMS' }}
    </button>
    <button @click="onWFS" class="btn btn-primary ms-2 mb-2 ">    
        {{ showWFS ? 'Off WFS' : 'On WFS' }}
    </button>
    <button @click="onMyGeoPolygon" class="btn btn-dark ms-2 mb-2 ">    
        {{ showMyGeoPolygon ? 'Off MyGeoPolygon' : 'On MyGeoPolygon' }}
    </button>
    <button @click="onMyGeoPoint" class="btn btn-danger ms-2 mb-2 ">    
        {{ showMyGeoPoint ? 'Off MyGeoPoint' : 'On MyGeoPoint' }}
    </button>
  </div>
  <div id='map-container'>
  </div>
  <!-- control - mousePosition -->
  <div ref="mousePositionTarget" class="custom-mouse-position">
  </div>
    <form>
      <label for="projection">Projection </label>
      <select id="projection" v-model="projection">
        <option value="EPSG:4326">EPSG:4326</option>
        <option value="EPSG:3857">EPSG:3857</option>
      </select>
      <label for="precision">Precision</label>
      <input id="precision" type="number" min="0" max="12" v-model.number="precision" />
    </form>
  <!-- control - scaleLine -->
    <label for="units">Units:</label>
    <select id="units" v-model="units">
      <option value="degrees">degrees</option>
      <option value="imperial">imperial inch</option>
      <option value="us">us inch</option>
      <option value="nautical">nautical mile</option>
      <option value="metric">metric</option>
    </select>
    <label for="type">Type:</label>
    <select id="type" ref="typeSelect" v-model="type">
      <option value="scaleline">ScaleLine</option>
      <option value="scalebar">ScaleBar</option>
    </select>
    <!-- <label for="steps">Steps:</label>
    <input id="steps" type="range" ref="stepsRange" /> -->
    <label for="showScaleText">Show scale text</label>
    <input id="showScaleText" type="checkbox" ref="scaleTextCheckbox" />
    <label for="invertColors">Invert colors</label>
    <input id="invertColors" type="checkbox" ref="invertColorsCheckbox" />
    <!-- interaction - draw and modify features -->
    <form>
      <label for="drawType">Geometry type &nbsp;</label>
      <select id="drawType" v-model="drawType">
        <option value="">-- 도형 타입 선택 --</option>
        <option value="Point">Point</option>
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
      </select>
    </form>
</template>


<style>
 #map-container {
  margin: 0;
  height: 80vh;
  width: 100%;
  font-family: sans-serif;
}

/* control - fullScreen */
.map-container:-webkit-full-screen {
  height: 100%;
  margin: 0;
}
.map-container:fullscreen {
  height: 100%;
} 
.map-container .ol-rotate {
  top: 3em;
}

/* control - zoomSlider */
#map-container .ol-zoom .ol-zoom-out {
  margin-top: 200px;
}
#map-container .ol-zoomslider {
  background-color: transparent;
  top: calc(0.5em + 2px + 1px + 1.14 * 1.375em);
}

#map-container .ol-touch .ol-zoom .ol-zoom-out {
  margin-top: 212px;
}
#map-container .ol-touch .ol-zoomslider {
  top: 2.75em;
}

#map-container .ol-zoom-in.ol-has-tooltip:hover [role=tooltip],
#map-container .ol-zoom-in.ol-has-tooltip:focus [role=tooltip] {
  top: 3px;
}

#map-container .ol-zoom-out.ol-has-tooltip:hover [role=tooltip],
#map-container .ol-zoom-out.ol-has-tooltip:focus [role=tooltip] {
  top: 232px;
}

/* control - mousePosition */
.custom-mouse-position {
  position: absolute;
  bottom: 130px;
  left: 130px;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  z-index: 10;
  min-width: 130px; 
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 4px;
}

/* control - scaleLine */
#scaleBarOptions {
    display: none;
}

input[type=range] {
  vertical-align: middle;
}

.ol-scale-bar-inverted .ol-scale-singlebar-even {
  background-color: var(--ol-background-color);
}

.ol-scale-bar-inverted .ol-scale-singlebar-odd {
  background-color: var(--ol-subtle-foreground-color);;
}

/* control - overviewMap */
.map-container .ol-custom-overviewmap,
.map-container .ol-custom-overviewmap.ol-uncollapsible {
  bottom: auto;
  left: auto;
  right: 0;
  top: 0;
}

.map-container .ol-custom-overviewmap:not(.ol-collapsed)  {
  border: 1px solid black;
}

.map-container .ol-custom-overviewmap .ol-overviewmap-map {
  border: none;
  width: 300px;
}

.map-container .ol-custom-overviewmap .ol-overviewmap-box {
  border: 2px solid red;
}

.map-container .ol-custom-overviewmap:not(.ol-collapsed) button{
  bottom: auto;
  left: auto;
  right: 1px;
  top: 1px;
}

.map-container .ol-rotate {
  top: 170px;
  right: 0;
}

.ol-overviewmap {
  left: 0.5em;
  bottom: 0.5em;
}

</style>