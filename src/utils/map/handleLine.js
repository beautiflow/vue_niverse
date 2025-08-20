import axios from 'axios';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Stroke } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import {Overlay} from "ol";

let lineLayer = null;

export async function toggleMyGeoLine(map, showMyGeoLine, setViewPosition) {
  showMyGeoLine.value = !showMyGeoLine.value;

  if (showMyGeoLine.value) {
    const response = await axios.get('/geoserver/geoS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geoS%3Aline&outputFormat=application%2Fjson');

    const vectorSource2 = new VectorSource({
      features: new GeoJSON().readFeatures(response.data, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      }),
    });

    lineLayer = new VectorLayer({
      source: vectorSource2,
      style: new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 3,
        }),
      }),
    });


    // 라인 이름 보이기
    const overlay = new Overlay({
      element: document.getElementById('popup'),
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10],
    });
    map.addOverlay(overlay);

    map.on('pointermove', (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
      const element = overlay.getElement();

      if (feature) {
        const coord = evt.coordinate;
        overlay.setPosition(coord);
        element.innerHTML = feature.get('name');
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });

    map.addLayer(lineLayer);
    setViewPosition({
      center: fromLonLat([127.3905, 36.3705]),
      zoom: 16,
    });
  } else {
    map.removeLayer(lineLayer);
    setViewPosition();
    lineLayer = null;
  }
}
