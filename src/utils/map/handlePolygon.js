import { Image as ImageLayer } from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';
import { fromLonLat } from 'ol/proj';

let polygonLayer = null;

export function toggleMyGeoPolygon(map, showPolygonRef, setViewPosition) {
  showPolygonRef.value = !showPolygonRef.value;

  if (showPolygonRef.value) {
    polygonLayer = new ImageLayer({
      source: new ImageWMS({
        url: 'http://localhost:8080/geoserver/geoS/wms?service=WMS',
        params: {
          'VERSION': '1.1.0',
          'LAYERS': 'polygon',
          'BBOX': [-71.1776820268866, 36.367316228570296, 127.38762693804684, 42.3903825660754],
          'SRS': 'EPSG:3857',
          'FORMAT': 'image/png'
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
  } else {
    map.removeLayer(polygonLayer);
    setViewPosition();
    polygonLayer = null;
  }
}
