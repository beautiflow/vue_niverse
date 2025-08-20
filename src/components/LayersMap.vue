<script setup>
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Map, View} from 'ol';
import {fromLonLat, get, transform} from 'ol/proj';
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
import { toggleMyGeoLine } from '@/utils/map/handleLine.js';
import { toggleMyGeoPoint } from '@/utils/map/handlePoint.js';
import { toggleTranslate }  from '@/utils/map/handleTranslate.js';

import ScaleLine from 'ol/control/ScaleLine.js';
import OverviewMap from 'ol/control/OverviewMap.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Draw from 'ol/interaction/Draw.js';
import Modify from 'ol/interaction/Modify.js';
import Snap from 'ol/interaction/Snap.js';
import { Style,  Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import LanLonDataModal from "@/components/LanLonData.vue";
import { getJsonAxios} from "@/axios.js";
import WKT from 'ol/format/WKT';
import { Point } from 'ol/geom';


let map;
let mousePositionControl;
let overviewMapControl;
let control;
let draw, snap;

const key = import.meta.env.VITE_MAP_THUNDERFOREST_KEY;

const showWMS = ref(false);
const showWFS = ref(false);
const showMyGeoPolygon = ref(false);
const showMyGeoLine = ref(false);
const showMyGeoPoint = ref(false);
const showTranslate = ref(false);

const projection = ref('EPSG:4326');
const precision = ref(4);
const mousePositionTarget = ref(null);
const unitsSelect = ref('metric');
const scaleSelect = ref('scaleline');
const stepsRange = ref('');
const scaleTextCheckbox = ref(null);
const invertColorsCheckbox = ref(null);
const drawType = ref('');

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

// geoServer 데이터 연동 - POLYGON
const onMyGeoLine = () => {
  toggleMyGeoLine(map, showMyGeoLine, setViewPosition);
}


// geoServer 데이터 연동 - POINT
const onMyGeoPoint = async () => {
    toggleMyGeoPoint(map, showMyGeoPoint, setViewPosition);
}

// interaction - translate
const onTranslate = () => {
  toggleTranslate(map, showTranslate, setViewPosition);
}

// control - scaleLine
const scaleControl = () => {
  if (scaleSelect.value === 'scaleline') {

    control = new ScaleLine({
      units: unitsSelect.value,

    });
  } else {
    control = new ScaleLine({
      units: unitsSelect.value,
      bar: true,
      steps: parseInt(stepsRange.value, 10),
      text: scaleTextCheckbox.value.checked,
      minWidth: 140,
    });
    onInvertColorsChange();
  }
  return control;
}

const onChangeUnit = () => {
  console.log("unitsSelect value = ", unitsSelect.value);
  control.setUnits(unitsSelect.value);
}

const reconfigureScaleLine = () => {
  console.log("scaletype value = ", scaleSelect.value);
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

const showPointModal = ref(false);
const selectedPoint = ref(null);

const openPointModal = () => {
  showPointModal.value = true;
};

const closeModal = () => {
  showPointModal.value = false;
};


const extent = get(projection.value).getExtent().slice();
extent[0] += extent[0];
extent[2] += extent[2];

const modify = new Modify({source: source});

const savePoint = async (newPoint) => {
  try {
    const pointGeom = new Point([newPoint.lon, newPoint.lat]);
    const wktFormat = new WKT();
    const wktString = wktFormat.writeGeometry(pointGeom);
    const data = {
      name: newPoint.name,
      geom: wktString
    }
    console.log("data = ", data);
    await getJsonAxios.post('point', data);
    showPointModal.value = false;
  }catch (error){
    console.error('Error saving point: ', error);
  }
}

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
  console.log(drawType.value);
    map.on('click', (e) => {
      if(drawType.value === "Point") {
        openPointModal();
      const coord = e.coordinate
      const [lon, lat] = transform(coord, 'EPSG:3857', 'EPSG:4326')
        selectedPoint.value = {
        lon: lon,
        lat: lat
      };
      console.log('lon:', lon, 'lat:', lat)
      }
    })

  snap = new Snap({ source: source });
  map.addInteraction(snap);
  map.addInteraction(modify);
};

onMounted (() => {
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
      drawRaster, drawVector,
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

  <teleport to="#modal">
    <LanLonDataModal
      v-if="showPointModal"
      :showPointModal="showPointModal"
      :selectedPoint="selectedPoint"
      @closeModal="closeModal"
      @savePoint="savePoint"

    />
  </teleport>


  <div>
    <button @click="onWMS" class="btn btn-success mb-2">
        {{ showWMS ? "Off WMS" : "On WMS" }}
    </button>
    <button @click="onWFS" class="btn btn-primary ms-2 mb-2 ">
        {{ showWFS ? "Off WFS" : "On WFS" }}
    </button>
    <button @click="onMyGeoPolygon" class="btn btn-dark ms-2 mb-2 ">
        {{ showMyGeoPolygon ? "Off MyGeoPolygon" : "On MyGeoPolygon" }}
    </button>
    <button @click="onMyGeoLine" class="btn btn-info ms-2 mb-2 ">
      {{ showMyGeoLine ? "Off MyGeoLine" : "On MyGeoLine" }}
    </button>
    <button @click="onMyGeoPoint" class="btn btn-danger ms-2 mb-2 ">
        {{ showMyGeoPoint ? "Off MyGeoPoint" : "On MyGeoPoint" }}
    </button>
     <button @click="onTranslate" class="btn btn-warning ms-2 mb-2 ">
        {{ showTranslate ? "Off Translate" : "On Translate" }}
    </button>
  </div>

  <div id="map-container">
  </div>
  <div id="popup" style="background:white; padding:4px; border:1px solid black; border-radius:4px; display:none;"></div>

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
    <select id="units" v-model="unitsSelect" @change="onChangeUnit">
      <option value="degrees">degrees</option>
      <option value="imperial">imperial inch</option>
      <option value="us">us inch</option>
      <option value="nautical">nautical mile</option>
      <option value="metric">metric</option>
    </select>
    <label for="type">Type:</label>
    <select id="type" ref="scaletype" v-model="scaleSelect" @change="reconfigureScaleLine">
      <option value="scaleline">ScaleLine</option>
      <option value="scalebar">ScaleBar</option>
    </select>
    <label for="showScaleText">Show scale text</label>
    <input id="showScaleText" type="checkbox" ref="scaleTextCheckbox" @change="reconfigureScaleLine" />
    <label for="invertColors">Invert colors</label>
    <input id="invertColors" type="checkbox" ref="invertColorsCheckbox" @change="reconfigureScaleLine" />
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
