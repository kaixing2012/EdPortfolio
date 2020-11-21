import { Component, OnInit } from '@angular/core';

import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

import { get as getProjection } from 'ol/proj';
import { getTopLeft, getWidth } from 'ol/extent';

import { fromLonLat as LngLat } from 'ol/proj'
import { Zoom, ScaleLine } from 'ol/control';

import { MapService } from './map.service'

import { LayerSwitch } from './ol-controls/layer-switch'
import { SearchBar } from './ol-controls/search-bar'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map;
  lat: number = 23.6978;
  lng: number = 120.9605;
  zoom: number = 7;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    let projection = getProjection('EPSG:3857');
    let projectionExtent = projection.getExtent();
    let size = getWidth(projectionExtent) / 256;
    let resolutions = new Array(14);
    let matrixIds = new Array(14);

    for (let z = 0; z < 14; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }

    let nlscLayer = new TileLayer({
      opacity: 1,
      source: new WMTS({
        url:
          'https://wmts.nlsc.gov.tw/wmts',
        layer: 'EMAP6',
        matrixSet: "EPSG:3857",
        format: "image/png",
        projection: projection,
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions: resolutions,
          matrixIds: matrixIds,
        }),
        style: 'default',
        wrapX: true,
      }),
    })

    let osmLayer = new TileLayer({
      source: new OSM(),
    });

    let mapLayers = [
      nlscLayer,
      osmLayer
    ]

    let mapControls = [
      new Zoom(),
      new ScaleLine(),
      new LayerSwitch(),
      new SearchBar({
        mapService: this.mapService
      }),
    ]

    this.map = new Map({
      controls: mapControls,
      layers: mapLayers,
      target: "map",
      view: new View({
        center: LngLat([this.lng, this.lat]),
        zoom: this.zoom,
      }),
    });
  }
}