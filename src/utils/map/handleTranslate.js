
import GeoJSON from 'ol/format/GeoJSON.js';
import Select from 'ol/interaction/Select.js';
import Translate from 'ol/interaction/Translate.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';

let vector = null;
let select = null;
let translate = null;

export function initTranslate() {
    vector = new VectorLayer({
        background: 'white',
        source: new VectorSource({
            url: 'https://openlayers.org/data/vector/ecoregions.json',
            format: new GeoJSON(),
        }),
    });

    select = new Select();
    translate = new Translate({
        features: select.getFeatures(),
    });
}

export function toggleTranslate(map, showTranslate, setViewPosition){
    showTranslate.value = !showTranslate.value;
    if(showTranslate.value){
         initTranslate();
        map.addInteraction(select);
        map.addInteraction(translate);
        map.addLayer(vector);
    }
    else{
        map.removeInteraction(translate);
        map.removeInteraction(select);
        map.removeLayer(vector); 
        setViewPosition();
   
    }
}

