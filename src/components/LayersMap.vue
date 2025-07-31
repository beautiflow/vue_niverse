<script setup>
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import { ref, onMounted } from 'vue';
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

import axios from 'axios';
let map;
let wmsLayer = null;
let raster = null;
let vector = null;
let myGeoVector = null;
let polygonLayer = null;
const showWMS = ref(false); 
const showWFS = ref(false); 
const showMyGeoPolygon = ref(false); 
const showMyGeoPoint = ref(false); 


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

const key = import.meta.env.VITE_MAP_TILER_KEY;
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

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
 map =  new Map({
    target: 'map-container',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({...defaultMap}),
  });
  addVectorLayer();
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
  <div id='map-container'></div>
  <div>
</div>
</template>


<style>
 #map-container {
  margin: 0;
  height: 80vh;
  width: 100%;
  font-family: sans-serif;
}
</style>