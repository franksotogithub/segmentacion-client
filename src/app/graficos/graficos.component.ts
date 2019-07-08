import { Component, OnInit,ViewChild, ElementRef ,AfterViewInit,HostListener} from '@angular/core';
import { Chart } from 'angular-highcharts';
import {ReporteService} from "../services/reporte.service";
import {ParametrosService} from "../services/parametros.service";
@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit{
  public innerWidth: any;
  chart ={};
  //categorias={};
  //series=[];
  optionsChart={
    chart: {
      type: 'areaspline',
      reflow: true
      //width: 700,
    },
    title: {
        text: 'Cantidad de Areas de Empadronamiento por Numero de Viviendas'
    },
  /*legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 150,
      y: 100,
      floating: true,
      borderWidth: 1,
      
  },*/
  xAxis: {
      categories: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
      ],
  },
  yAxis: {
      title: {
          text: 'Cantidad de AEUS'
      }
  },
  tooltip: {
      shared: true,
      valueSuffix: ' aeus'
  },
  credits: {
      enabled: false
  },
  plotOptions: {
      areaspline: {
          fillOpacity: 0.5
      }
  },
  series: [
    
    {
      name: 'John',
      data: [3, 4, 3, 5, 4, 10, 12],
      type : undefined,
    }, 
  
  ]
  };
  
  crearGrafico(){
    this.chart = new Chart(this.optionsChart);
    //this.chart.reflow();
    /*this.chart = new Chart({
      chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Cantidad de Areas de Empadronamiento por Numero de Viviendas'
    },
   
    xAxis: {
        categories: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
    },
    yAxis: {
        title: {
            text: 'Fruit units'
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' units'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [
      
      {
        name: 'John',
        data: [3, 4, 3, 5, 4, 10, 12],
        type : undefined,
      }, 
    
     
  
  ]
    });*/
      
  }
  
  @HostListener('window:resize', ['$event'])
onResize(event) {


  this.innerWidth = window.innerWidth;
  this.optionsChart.chart['width']=this.getWidthRezise(innerWidth);
  this.crearGrafico();

}
getWidthRezise(width){
  let w;
  if (width<600){
    w= width-50;
  }
  else w=width/2-50;
  return w
}

  constructor(private reporteService: ReporteService, private parametrosService: ParametrosService,private el: ElementRef) { }
  ngAfterContentInit() {
    console.log('element---' + this.el.nativeElement);  
    console.log('width---' + this.el.nativeElement.offsetWidth);  
  }

  
  ngOnInit(){
    
    this.reporteService.getLoadedDataSource().subscribe(res => {
        let data1=res.graficos.grafico1;
        let categorias=data1.map(el=>{return el.label} );
        let series=[];
        let serie ={};
        serie["data"] =data1.map(el=>{return el.valor} );
        serie["type"] =undefined;
        series.push(serie);

        this.optionsChart.xAxis.categories=categorias;
        this.optionsChart.series=series;

        this.innerWidth = window.innerWidth;
        this.optionsChart.chart['width']=this.getWidthRezise(innerWidth);
        this.crearGrafico();


        /*this.options["categorias"]=categorias;  
        this.options["series"]=series;
        */  

        //this.dataSource1 = res.estadisticas.viviendas;
        //this.dataSource2 = res.estadisticas.promedios;
      }
    );
    //this.crearGrafico()
  }

}
