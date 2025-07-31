import TileLayer from 'ol/layer/Tile';
import { ref } from 'vue';
import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
import ImageTile from 'ol/source/ImageTile.js';
import VectorSource from 'ol/source/Vector.js'

let raster = null;
let vector = null;

const showWFS = ref(false); 

const key = import.meta.env.VITE_MAP_TILER_KEY;
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

export function toggleWFS(map, showWFS, setViewPosition) {
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
};

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