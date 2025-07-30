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

let map;
let wmsLayer = null;
let raster = null;
let vector = null;
const showWMS = ref(false); 
const showWFS = ref(false); 

// 기본 지도
const defaultMap = {
  center: fromLonLat([0, 0]), 
  zoom: 2,
};

console.log(defaultMap);

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
    // map.setView(defaultMap);
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
    // const newView = new View({
    //   center: [-8908887.277395891, 5381918.072437216],
    //   maxZoom: 19,
    //   zoom: 12,
    // });
    setViewPosition({center: [-8908887.277395891, 5381918.072437216], zoom: 12})
    // map.setView(newView);
  }
  else{
    map.removeLayer(raster);
    map.removeLayer(vector);
    // map.setView(defaultMap);
    setViewPosition();
  }
}

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