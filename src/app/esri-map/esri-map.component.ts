import {Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import {loadModules} from 'esri-loader';
import {environment} from 'src/environments/environment';
import {ReporteService} from '../services/reporte.service';
import {ParametrosService} from '../services/parametros.service';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent implements OnInit {
  @ViewChild('mapViewNode', {static: false})
  private mapViewEl: ElementRef;


  
  private zoom = 5;
  private center: Array<number> = [-75, -9.305];
  private basemap = 'streets';
  private map: any;
  private showLabels = true;
  private optionsApi = {
    url: 'https://js.arcgis.com/3.25/'

  };
  private apiEndPointMap = environment.apiEndPointMap;
  private ambitoInicial = 0;

  private ambitos = [ 3,2,1,0];
  private ambito = 0;
  private colorGris = '#9c9c9c';
  private capasTematicos = [];
  private datos = [];
  private codigo = '00';
  private text = '';
  //private capaLimites :any;
  private capaLimites :[];
  constructor(private reporteService: ReporteService, private parametrosService: ParametrosService , private renderer: Renderer2) {
  }

  cambiarAmbito(ambito) {


    this.capasTematicos.forEach(capa => {
      if (capa.id == ambito) {
        //capa.layer.setMaxScale(0);
        //capa.layer.setMinScale(0);
        capa.layer.setVisibility(true);

        //capa.layer.showLabels = true;
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

      /*
      let homeButton = new HomeButton(
        {
          map:this.map
        },this.homeButtonEl.nativeElement
      );

    
      homeButton.startup();
      this.homeButtonEl.nativeElement.addEventListener('on','click',()=>{
        console.log('click botton');
      });
*/
    
      

      console.log('this.map>>>', this.map);
    } catch (error) {
      console.log('EsriLoader: ', error);

    }
  }

 


  selectUbigeo(options) {
    let ambito = this.ambito + 1;
    this.codigo = options.atributos['CODIGO'];
    this.text = this.datos['data'].find(ubigeo => ubigeo.codigo == this.codigo).text;
    this.parametrosService.cambiarParametros({ambito: ambito, codigo: this.codigo, text: this.text});
  }

  selectFeature(options, abrir) {
    this.codigo = options.atributos['CODIGO'];
    this.actualizarCapaTematico(this.datos, this.ambito, [this.codigo]);
  }

  async addCapaLimite(url,index){
    try {
      
      var capa = {};
      const [FeatureLayer,Color, SimpleFillSymbol, SimpleLineSymbol, UniqueValueRenderer] = await loadModules(['esri/layers/FeatureLayer',
      'esri/Color',
        'esri/symbols/SimpleFillSymbol', 'esri/symbols/SimpleLineSymbol',
        'esri/renderers/UniqueValueRenderer'], this.optionsApi);

      var urlFeature = `${url}/${index}`;
      var visible = false;
      (this.ambitoInicial == index) ? visible = true : false;

      var defaultSymbol = new SimpleFillSymbol(
        'solid'
        , new SimpleLineSymbol('solid', new Color([0, 0, 0, 1]), 1)
        , new Color([0, 0, 0, 0]));

      var layerRenderer = new UniqueValueRenderer({
        'type': 'uniqueValue',
        'field1': 'CODIGO',
        'uniqueValueInfos': [],
        'defaultSymbol': defaultSymbol,
      });

      var layer = new FeatureLayer(urlFeature, {
        maxScale: 0,
        minScale: 0,
        showLabels: true,
        visible: visible,
        
      });


      layer.on('click', (event) => {
        let options = {atributos: '00', geometry: '', screenPoint: ''};
        options.atributos = event.graphic.attributes;
        options.geometry = event.graphic.geometry;
        options.screenPoint = event.screenPoint;
        this.selectFeature(options,1);

      });


      layer.on('dbl-click', (event) => {
        let options = {atributos: '00', geometry: '', screenPoint: ''};
        options.atributos = event.graphic.attributes;
        options.geometry = event.graphic.geometry;
        options.screenPoint = event.screenPoint;
        this.selectUbigeo(options);

      });


      layer.setRenderer(layerRenderer);
      layer.redraw();
      
      
      capa = {layer: layer, id: index};
      this.capasTematicos.push(capa);
      this.map.addLayer(layer);
    }
    catch (error){

      
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

/*
      layer.on('click', (event) => {
        let options = {atributos: '00', geometry: '', screenPoint: ''};
        options.atributos = event.graphic.attributes;
        options.geometry = event.graphic.geometry;
        options.screenPoint = event.screenPoint;
        this.selectFeature(options,1);

      });


      layer.on('dbl-click', (event) => {
        let options = {atributos: '00', geometry: '', screenPoint: ''};
        options.atributos = event.graphic.attributes;
        options.geometry = event.graphic.geometry;
        options.screenPoint = event.screenPoint;
        this.selectUbigeo(options);

      });*/

      this.map.addLayer(layer);
      this.capasTematicos.push(capa);


    } catch (error) {
      console.log('EsriLoader: ', error);
    }

  }



  async actualizarCapaTematico(res, index, codigos) {
    try {
      const [Color, SimpleFillSymbol, SimpleLineSymbol, UniqueValueRenderer] = await loadModules(['esri/Color',
        'esri/symbols/SimpleFillSymbol', 'esri/symbols/SimpleLineSymbol',
        'esri/renderers/UniqueValueRenderer'], this.optionsApi);

      var c = [];
      var color;
      var found = 1;
      var outline = 1;
      var uniqueValueInfos = res.data.map(e => {
        color = e.color;
        outline = 1;
        c = this.hex2rgb(color).rgb;

        if (codigos.length > 0) {
          console.log(codigos);

          found = codigos.find(codigo => String(e.codigo) === String(codigo));
        }


        if (found) {
          outline = 1;
          c.push(1);

        } else {
          outline = 0.5;
          c.push(0.5);
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


      ////////////////////////////
        capa.layer.setRenderer(layerRenderer);
        capa.layer.redraw();
        console.log(`capa ${capa.layer} cargada`)
      
      //capa.layer.set showLabels: true,
      //capa.layer.set(showLabels: true,

    } catch (error) {
      console.log('EsriLoader: ', error);
    }
  }

  getQueryText(arrayUbigeos: string[]) {
    var queryText = '';
    var num_features = arrayUbigeos.length;

    if (num_features > 0) {
      var tamUbigeo = arrayUbigeos[0].length;
      if (tamUbigeo == 2) {
        queryText = 'CCDD IN (';
      } else if (tamUbigeo == 4) {
        queryText = ' CCDD+CCPP IN (';
      } else if (tamUbigeo == 6) {
        queryText = ' UBIGEO IN (';
      }
      arrayUbigeos.forEach(function (ubigeo) {
        num_features--;
        if (num_features > 0) queryText = queryText + ubigeo + ','
        else queryText = queryText + ubigeo + ')'
      });
    }
    return queryText;
  }


  async getExtentUbigeos(queryText: string, urlService: string) {
    try {
      const [QueryTask, Query] = await loadModules(['esri/tasks/QueryTask', 'esri/tasks/query'], this.optionsApi);

      let queryTask = new QueryTask(urlService);
      let query = new Query();
      query.returnGeometry = true;
      query.outFields = ['*'];
      query.where = queryText;


      queryTask.executeForExtent(query, (result) => {
        console.log('result>>>>', result);
        
        this.map.setExtent(result.extent);
        
      });

    } catch (error) {
      console.log('EsriLoader: ', error);

    }
  }


  ngOnInit() {
    this.inicializarMapa().then(_ => {
      //this.addCapaLimites(this.apiEndPointMap,[0]);
      this.ambitos.forEach(a => {

        this.addCapa(this.apiEndPointMap, a).then(_ => {

        });
        this.addCapaLimite(this.apiEndPointMap, a).then(_ => {

        });

      
      });

      



      this.reporteService.getLoadedDataMapaSource().subscribe(res => {
          this.ambito = this.parametrosService.params.ambito;
          this.codigo = this.parametrosService.params.codigo;
          this.datos = res;

          

          this.actualizarCapaTematico(res, this.ambito, []).then(_ => {
            
            if (this.codigo !== '00') {
              let queryText = this.getQueryText([this.codigo]);
              let urlText = `${this.apiEndPointMap}/${this.ambito}`;
              this.getExtentUbigeos(queryText, urlText);
            } else {
              this.map.centerAndZoom(this.center, this.zoom);
            }

            this.cambiarAmbito(this.ambito);
          });

          
        }
      );




    });

  }

}
