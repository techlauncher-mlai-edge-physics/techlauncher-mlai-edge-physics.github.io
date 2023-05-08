(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[94],{8416:function(e,n,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/simDraft",function(){return o(6910)}])},6910:function(e,n,o){"use strict";o.r(n),o.d(n,{default:function(){return u}});var t=o(5893),r=o(9034),i=o.n(r),s=o(5029),a=o(1033),c=o(1881),_=o(9477),d=o(5078),l=o(7294);function g(e){let n=(0,l.useRef)(null);(0,d.A)(e=>{e.camera.setRotationFromAxisAngle(new _.Vector3(1,0,0),-Math.PI/2),n.current.lookAt(0,99,0)});let r={segX:"31.0",segY:"31.0",width:"2.0",height:"2.0",segXInt:"32",segArea:"1024",densityRangeLow:"0.0",densityRangeHigh:"3.0",densityRangeSize:"3.0"},i=new _.ShaderMaterial;return i.vertexShader="// VERTEX SHADER\r\nvarying lowp vec4 vColor;\r\n\r\nuniform float density[${segArea}]; //the size of one chunk \r\n\r\nint getIndexFromPoint(vec3 pos)\r\n{\r\n  int ix = int((pos.x + (${width} / 2.0)) * ${segX} / ${width});\r\n  int iy = int((-pos.y + (${height} / 2.0)) * ${segY} / ${height});\r\n  return (ix + iy * ${segXInt});\r\n}\r\n\r\nvec4 getColourFromDensity(float density)\r\n{\r\n  density = min(density, ${densityRangeHigh});\r\n  density = max(density, ${densityRangeLow});\r\n  density = density / ${densityRangeSize};\r\n  return vec4(density, 0.0, 1.0 - density, 1.0);\r\n}\r\n\r\nvoid main(void) \r\n{\r\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\r\n  int index = getIndexFromPoint(position);\r\n  vColor = getColourFromDensity(density[index]);\r\n}\r\n".replace(/\$\{(\w+?)\}/g,function(e,n){return void 0!==r[n]?r[n]:"1.0"}),i.fragmentShader="// FRAGMENT SHADER\r\nvarying lowp vec4 vColor;\r\n\r\nvoid main(void) {\r\n  gl_FragColor = vColor;\r\n}\r\n",i.uniforms={density:{value:null}},(0,l.useEffect)(()=>{(async()=>{let e=new Worker(o.tu(new URL(o.p+o.u(868),o.b)),{type:void 0});e.postMessage({func:"init"}),e.onmessage=n=>{switch(n.data.type){case"init":console.log("starting"),e.postMessage({func:"start"});break;case"output":var o;console.log(o=n.data.density),null!=o&&(i.uniforms.density.value=o.slice(1024),i.uniformsNeedUpdate=!0)}},e.onerror=e=>{console.log(e)},console.log("worker created",e),console.log("worker created")})()},[i]),(0,t.jsx)("mesh",{...e,ref:n,material:i,children:(0,t.jsx)("planeGeometry",{args:[2,2,9,9]})})}function u(){return(0,t.jsx)("div",{className:i().scene,children:(0,t.jsxs)(s.Xz,{shadows:!0,className:i().canvas,camera:{position:[1,10,1]},children:[(0,t.jsx)("ambientLight",{}),(0,t.jsx)(a.j,{}),(0,t.jsx)(g,{position:[0,0,0]}),(0,t.jsx)(c.o,{})]})})}},9034:function(e){e.exports={main:"Home_main__nLjiQ",description:"Home_description__41Owk",code:"Home_code__suPER",grid:"Home_grid__GxQ85",card:"Home_card___LpL1",center:"Home_center__4BFgC",logo:"Home_logo__27_tb",thirteen:"Home_thirteen__cMI_k",rotate:"Home_rotate____XsI",navBar:"Home_navBar__DtDJB",content:"Home_content__Zy02X",vercelLogo:"Home_vercelLogo__dtSk9",scene:"Home_scene__X8N8q",canvas:"Home_canvas__x616u",body:"Home_body__XYSzx"}}},function(e){e.O(0,[737,153,774,888,179],function(){return e(e.s=8416)}),_N_E=e.O()}]);