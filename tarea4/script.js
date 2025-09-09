import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm" /*importa librería*/
import data from './data.json' with {type : 'json'} /*importa datos*/
    /*PROYECCIÓN Y PATH*/
const projection=d3.geoMercator() /*proyección del mapa*/
 .fitSize([800,800],data) /*tamaño mapa*/

 const path= d3.geoPath(projection) /*dibuja el mapa*/

    /*ESCALA DE COLOR*/
 const colorScale = d3.scaleSequential() /*escala de color secuencial*/
  .domain(d3.extent(data.features, d => d.properties.poblacion)) /*extensión de los datos -población*/
  .interpolator(d3.interpolatePlasma) /*interpolador de color -plasma*/

    /*DIBUJA EL MAPA*/
 d3.select('.mapa') 
  .selectAll('path') /*selecciona los path*/
  .data(data.features) /*datos de las comunas*/
  .join('path') /*une los datos con los path*/
  .attr('d', path) /*dibuja el mapa*/
  .attr('fill', d => colorScale(d.properties.poblacion || 0)) /*rellena las comunas con la escala de color según población*/
    .attr('opacity', 0.8) /*opacidad de las comunas*/

    /*ETIQUETA*/
  const etiqueta = d3.select('body').append('div') /*crea un div en el body*/
      .classed('etiqueta', true)  /*le asigna la clase etiqueta*/
      .style('opacity', 0) /*inicialmente la etiqueta es invisible*/
  
    /*INTERACTIVIDAD*/
  d3.select('.mapa').selectAll('path') 
  .on('mouseenter', (e, d) => { /*cuando el mouse 'entra' en la comuna*/
          etiqueta.style('opacity', 1) /*hace visible la etiqueta*/
          etiqueta.style('top', e.pageY + 10 + 'px') /*posición Y la etiqueta junto al cursor*/
          etiqueta.style('left', e.pageX + 10 + 'px')   /*posición X la etiqueta junto al cursor*/
          etiqueta.html(`<p>${d.properties.Comuna}, ${d.properties.poblacion}<p>`) /*muestra nombre comuna y población*/
      })
      .on('mouseout', (e, d) => { /*cuando el mouse 'sale' de la comuna*/
          etiqueta.style('opacity', 0) /*hace invisible la etiqueta*/
      })
