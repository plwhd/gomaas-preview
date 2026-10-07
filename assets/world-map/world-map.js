(() => {
  const element = document.getElementById('world-map');
  const status = document.getElementById('map-status');
  const statusText = document.getElementById('map-status-text');
  const retry = document.getElementById('map-retry');
  const reset = document.getElementById('map-reset');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const english = () => document.documentElement.lang === 'en';
  let map, popup, loaded = false, slow = false;
  function updateStatus() {
    statusText.textContent = slow
      ? (english() ? 'The map is taking longer to load. Check your connection or retry.' : '地图加载较慢，请检查网络或重试。')
      : (english() ? 'Loading map…' : '地图加载中…');
    retry.textContent = english() ? 'Retry' : '重试';
  }
  function fitWorld(animate = false) {
    popup?.remove();
    map.fitBounds([[-180,-58],[180,80]], {padding:12,duration:animate && !reducedMotion ? 500 : 0});
  }
  function labelFields() {
    const language = english() ? 'en' : 'zh';
    for (const layer of map.getStyle().layers) {
      if (layer.type === 'symbol' && layer.layout?.['text-field'] && /^label_/.test(layer.id)) {
        let field = ['coalesce',['get','name:'+language],['get','name:en'],['get','name_en'],['get','name']];
        // Some source names contain duplicate language variants separated by / or ;.
        for (const separator of [';', ' / ']) field = ['case',['>=',['index-of',separator,field],0],['slice',field,0,['index-of',separator,field]],field];
        map.setLayoutProperty(layer.id, 'text-field', field);
      }
    }
  }
  function failure() { slow = true; status.hidden = false; retry.hidden = false; updateStatus(); }
  updateStatus();
  retry.addEventListener('click', () => location.reload());
  if (!window.maplibregl) { failure(); return; }
  try {
    map = new maplibregl.Map({container:element,style:'https://tiles.openfreemap.org/styles/liberty',center:[0,20],zoom:1.3,minZoom:-1.5,maxZoom:12,renderWorldCopies:true,attributionControl:false});
    map.addControl(new maplibregl.NavigationControl({showCompass:false}), 'top-right');
    map.addControl(new maplibregl.FullscreenControl({container:element.closest('section')}), 'top-right');
    map.addControl(new maplibregl.AttributionControl({compact:true}), 'bottom-right');
    const timer = setTimeout(() => { if (!loaded) failure(); }, 15000);
    map.on('load', () => {
      loaded = true; clearTimeout(timer); labelFields(); fitWorld(); status.hidden = true; reset.disabled = false;
    });
    map.on('error', () => { if (!loaded) failure(); });
    reset.addEventListener('click', () => fitWorld(true));
    const resize = new ResizeObserver(() => map.resize()); resize.observe(element);
    new MutationObserver(() => { if (loaded) {labelFields(); popup?.remove();} updateStatus(); }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    map.on('click', event => {
      const layers = map.getStyle().layers.filter(layer => layer.type === 'symbol' && layer['source-layer'] === 'place').map(layer => layer.id);
      const features = map.queryRenderedFeatures([[event.point.x-6,event.point.y-6],[event.point.x+6,event.point.y+6]],{layers});
      popup?.remove();
      if (!features.length) return;
      const properties = features[0].properties;
      const name = properties['name:'+(english() ? 'en' : 'zh')] || properties['name:en'] || properties.name_en || properties.name;
      if (name) popup = new maplibregl.Popup({maxWidth:'220px'}).setLngLat(event.lngLat).setText(name.split(/[;/]/)[0].trim()).addTo(map);
    });
  } catch { failure(); }
})();
