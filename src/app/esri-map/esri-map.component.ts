import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {loadModules} from 'esri-loader';
import {environment} from 'src/environments/environment';
import {ReporteService} from '../services/reporte.service';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {
  @ViewChild('mapViewNode', {static: false})
  private mapViewEl: ElementRef;

  private zoom = 6;
  private center: Array<number> = [-75, -9.305];

  private basemap = 'streets';
  private loaded = false;
  private map: any;
  private showLabels = true;
  private optionsApi = {
    url: 'https://js.arcgis.com/3.25/'

  };
  private apiEndPointMap = environment.apiEndPointMap;
  private anio = 2011;
  private ambitoInicial = 0;
  private tipoValor = 1;
  private ambitos = [2, 1, 0];
  private ambito = 0;
  private colorGris = '#9c9c9c';
  private capasTematicos = [];
  private colores = [
    {id: 0, color: '#FFF9D1'},
    {id: 1, color: '#FFF16E'},
    {id: 2, color: '#FAB700'},
    {id: 3, color: '#ED7203'},
    {id: 4, color: '#E20613'},
  ];

  constructor(private reporteService: ReporteService) {
  }

  cambiarAmbito(ambito) {

    console.log('cambio de ambito', ambito);
    this.capasTematicos.forEach(capa => {
      if (capa.id == ambito) {
        capa.layer.setVisibility(true);
        capa.layer.setMaxScale(0);
        capa.layer.setMinScale(0);
      } else {
        capa.layer.setVisibility(false);
      }
    });
  }

  hex2rgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      rgb: [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    } : null;
  }

  async inicializarMapa() {
    try {
      const [Map] = await loadModules(['esri/map'], this.optionsApi);


      let mapOptions = {
        basemap: this.basemap,  // For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
        center: this.center, // longitude, latitude
        zoom: this.zoom,
        showLabels: this.showLabels,

      };


      this.map = new Map(this.mapViewEl.nativeElement, mapOptions);
      console.log('this.map>>>', this.map);
    } catch (error) {
      console.log('EsriLoader: ', error);

    }
  }


  async addCapa(url, index) {
    try {
      var capa = {};
      const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer'], this.optionsApi);
      var urlFeature = `${url}/${index}`;
      var visible = false;
      (this.ambitoInicial == index) ? visible = true : false;

      var layer = new FeatureLayer(urlFeature, {
        maxScale: 0,
        minScale: 0,
        showLabels: false,
        visible: visible

      });

      capa = {layer: layer, id: index};

      this.map.addLayer(layer);
      this.capasTematicos.push(capa);


    } catch (error) {
      console.log('EsriLoader: ', error);
    }

  }


  async actualizarCapaTematico(res, index, estratos) {
    try {
      const [Color, SimpleFillSymbol, SimpleLineSymbol, UniqueValueRenderer] = await loadModules(['esri/Color',
        'esri/symbols/SimpleFillSymbol', 'esri/symbols/SimpleLineSymbol',
        'esri/renderers/UniqueValueRenderer'], this.optionsApi);

      var c = [];
      var color;
      var found;
      var outline = 1;
      var uniqueValueInfos = res.data.map(e => {
        color = e.color;
        outline = 1;
        c = this.hex2rgb(color).rgb;

        found = estratos.find(estrato => e.estrato === estrato);

        if (found == undefined) {
          outline = 0;
          c.push(0.2);
        } else {
          outline = 1;
          c.push(1);
        }

        return {
          value: e.codigo,
          symbol: new SimpleFillSymbol(
            'solid'
            , new SimpleLineSymbol().setWidth(outline)
            , new Color(c))
        };


      });


      var defaultSymbol = new SimpleFillSymbol(
        'solid'
        , new SimpleLineSymbol('solid', new Color([0, 0, 0, 1]), 1)
        , new Color(this.colorGris));

      var layerRenderer = new UniqueValueRenderer({
        'type': 'uniqueValue',
        'field1': 'CODIGO',
        'uniqueValueInfos': uniqueValueInfos,

        'defaultSymbol': defaultSymbol,
      });

      var capa = this.capasTematicos.find(x => x.id == index);
      capa['datos'] = res;
      capa.layer.setRenderer(layerRenderer);
      capa.layer.redraw();


    } catch (error) {
      console.log('EsriLoader: ', error);
    }
  }


  ngOnInit() {
    this.inicializarMapa().then(_ => {
      this.ambitos.forEach(a => {

        this.addCapa(this.apiEndPointMap, a).then(_ => {

          /*if (a === 0) {
            this.esriMapService.obtenerDatosMapaTematico().subscribe(res => {
            });
          }*/
        });

      });


      this.reporteService.getDataAvanceSegmentacion({'ambito':0}).subscribe(res => {
          console.log('getDataAvanceSegmentacion res', res);
        }
      );

      /*this.reporteService.changeParametros({'ambito': 0});*/


      this.reporteService.getLoadedDataMapaSource().subscribe(res => {
          console.log('getLoadedDataMapaSource res', res);
          this.ambito = res['ambito'];
          this.actualizarCapaTematico(res, this.ambito, [0, 1, 2, 3, 4]).then(_ => {
            this.cambiarAmbito(this.ambito);
          });
        }
      );

    });

  }

}
