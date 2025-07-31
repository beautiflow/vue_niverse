<script setup>
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import { ref, onMounted, watch } from 'vue';
import 'ol/ol.css';
import ImageLayer from 'ol/layer/Image.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
import ImageTile from 'ol/source/ImageTile.js';
import VectorSource from 'ol/source/Vector.js';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import CircleStyle from 'ol/style/Circle';
import FullScreen from 'ol/control/FullScreen.js';
import {defaults as defaultControls} from 'ol/control/defaults.js';
import ZoomSlider from 'ol/control/ZoomSlider.js';
import axios from 'axios';
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import DragRotateAndZoom from 'ol/interaction/DragRotateAndZoom.js';
import {defaults as defaultInteractions} from 'ol/interaction/defaults.js';
import Rotate from 'ol/control/Rotate.js';

let map;
let wmsLayer = null;
let raster = null;
let vector = null;
let myGeoVector = null;
let polygonLayer = null;
let mousePositionControl; 

const showWMS = ref(false); 
const showWFS = ref(false); 
const showMyGeoPolygon = ref(false); 
const showMyGeoPoint = ref(false); 
const projection = ref('EPSG:4326')
const precision = ref(4)
const mousePositionTarget = ref(null)

const key = import.meta.env.VITE_MAP_TILER_KEY;
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

// 기본 지도
const defaultMap = {
  center: fromLonLat([0, 0]), 
  zoom: 2,
};

// WMS 지도
const onWMS = () => {
  showWMS.value = !showWMS.value; 
  if(showWMS.value){
    wmsLayer = new ImageLayer({
    extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ImageWMS({
      url: 'https://ahocevar.com/geoserver/wms',
      params: { 'LAYERS': 'topp:states' },
      ratio: 1,
      serverType: 'geoserver',
    }),
  });
   
  setViewPosition({
    center: [-10997148, 4569099],
    zoom: 4,
  });    
    
    map.addLayer(wmsLayer);
  }else{
    map.removeLayer(wmsLayer);
    setViewPosition();
    wmsLayer = null;
  }
};

const setViewPosition = (options) => {
  const mapView = map.getView();
  mapView.setCenter(options?.center ? options.center : defaultMap.center);
  mapView.setZoom(options?.zoom ? options.zoom : defaultMap.zoom)
}

// WFS 지도
const onWFS = () => {
  showWFS.value = !showWFS.value; 
  if(showWFS.value){
    map.addLayer(raster);
    map.addLayer(vector);
    setViewPosition({center: [-8908887.277395891, 5381918.072437216], zoom: 12})
  }
  else{
    map.removeLayer(raster);
    map.removeLayer(vector);
    setViewPosition();
  }
}

// geoServer 데이터 연동 - POLYGON
const onMyGeoPolygon = () => {
  showMyGeoPolygon.value = !showMyGeoPolygon.value; 
   if(showMyGeoPolygon.value){
    // POLYGON DATA
    polygonLayer = new ImageLayer({
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/geoS/wms?service=WMS',
      params : {
          'VERSION' : '1.1.0', 
          'LAYERS' : 'polygon', 
          'BBOX' : [-71.1776820268866, 36.367316228570296, 127.38762693804684, 42.3903825660754], 
          'SRS' : 'EPSG:3857', 
          'FORMAT' : 'image/png'  
        },
            ratio: 1,

      serverType: 'geoserver',
    }),
  });
  console.log("polygonLayer = ", polygonLayer);
  setViewPosition({
    center: fromLonLat([127.3905, 36.3705]),
    zoom: 16,
  });    
    map.addLayer(polygonLayer);
  }else{
    map.removeLayer(polygonLayer);
    // map.setView(defaultMap);
    setViewPosition();
    polygonLayer = null;
  }
}

// geoServer 데이터 연동 - POINT
const onMyGeoPoint = async () => {
  showMyGeoPoint.value = !showMyGeoPoint.value;
  if(showMyGeoPoint.value){
    console.log(showMyGeoPoint.value);
    const response = await axios.get('/geoserver/geoS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geoS%3Apoint&outputFormat=application%2Fjson');
    console.log(response);
    const vectorSource2 = new VectorSource({
      features: new GeoJSON().readFeatures(response.data, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      }),
    })
    myGeoVector = new VectorLayer({
      source: vectorSource2,
      style: new Style({
        image: new CircleStyle({
        radius: 6,
        fill: new Fill({ color: 'rgba(255, 255, 0, 1)' }),
        stroke: new Stroke({ color: '#ff0000', width: 2 })
      })
    })
  });
  map.addLayer(myGeoVector);
  console.log("MYgeo Vector", myGeoVector);
  setViewPosition({
      center: fromLonLat([127.3905, 36.3705]),
      zoom: 16,
    });  
  }else{
    console.log(showMyGeoPoint.value);
    map.removeLayer(myGeoVector);
    setViewPosition();
  }
}


// WFS
const vectorSource = new VectorSource({
  format: new GeoJSON(),
  url: function (extent) {
    return (
      'https://ahocevar.com/geoserver/wfs?service=WFS&' +
      'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
      'outputFormat=application/json&srsname=EPSG:3857&' +
      'bbox=' +
      extent.join(',') +
      ',EPSG:3857'
    );
  },
  strategy: bboxStrategy,
});

 vector = new VectorLayer({
  source: vectorSource,
  style: {
    'stroke-width': 0.75,
    'stroke-color': 'white',
    'fill-color': 'rgba(100,100,100,0.25)',
  },
});

 raster = new TileLayer({
  source: new ImageTile({
    attributions: attributions,
    url: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=' + key,
    tileSize: 512,
    maxZoom: 20,
  }),
});

const addVectorLayer = async () => {
  const response = await axios.get('/geoserver/geoS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geoS%3Apoint&outputFormat=application%2Fjson');
  console.log(response);

  const vectorSource2 = new VectorSource({
    features: new GeoJSON().readFeatures(response.data, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }),
  })
  const pointVectorLayer =new VectorLayer({
    source: vectorSource2,
    style: new Style({
        fill: new Fill({
          color: 'rgba(255, 0, 0, 1)',
        }),
        stroke: new Stroke({
          color: '#ff0000',
          width: 3,
        }),
      }),
  });
  map.addLayer(pointVectorLayer);
}

onMounted (() => {
  mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(precision.value),
    projection: projection.value,
    className: 'custom-mouse-position',
    target: mousePositionTarget.value,
    undefinedHTML: '&nbsp;',
  });
  map =  new Map({
    target: 'map-container',
    controls: defaultControls().extend([
      new FullScreen(),
      new Rotate(),
      mousePositionControl,
    ]),
    interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({...defaultMap}),
  });
  const zoomslider = new ZoomSlider();
  map.addControl(zoomslider);
  addVectorLayer();
});

watch(projection, (newVal) => {
  mousePositionControl.setProjection(newVal)
})

watch(precision, (newVal) => {
  mousePositionControl.setCoordinateFormat(createStringXY(newVal))
})

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
  bottom: 110px;
  left: 130px;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  z-index: 1000;
  min-width: 130px; 
  font-size: 12px;
   padding: 4px 12px;
  border-radius: 4px;
}

</style>