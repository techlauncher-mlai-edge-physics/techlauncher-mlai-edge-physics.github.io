!function(){var t,e,i,r,n,a,s={9868:function(t,e,i){"use strict";var r=i(8736);class n{static async createModelService(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[64,64],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:3,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:15;console.log("createModelService called");let o=new n;return console.log("createModelService constructor called"),await o.init(t,e,i,r,a),o.fpsLimit=s,console.log("createModelService finished"),o}async initMatrixFromPath(t){"/"===t[0]&&(t="".concat("https://techlauncher-mlai-edge-physics.github.io","/").concat(t)),console.log("initMatrixFromPath called with path: ".concat(t));let e=await fetch(t).then(async t=>await t.json());if(null==e)throw Error("The matrix from ".concat(t," is null"));this.initMatrixFromJSON(e)}bindOutput(t){this.outputCallback=t}async startSimulation(){this.isPaused=!1,this.curFrameCountbyLastSecond=0,this.fpsHeartbeat(),this.iterate().catch(t=>{console.error("error in iterate",t),this.isPaused=!0})}fpsHeartbeat(){setTimeout(()=>{this.curFrameCountbyLastSecond=0,this.curFrameCountbyLastSecond>this.fpsLimit?this.startSimulation():this.fpsHeartbeat()},1e3)}pauseSimulation(){this.isPaused=!0}async init(t,e,i,n,a){console.log("init called"),this.session=await r.InferenceSession.create(t,{executionProviders:["wasm"],graphOptimizationLevel:"all"}),console.log("init session created"),this.channelSize=n,this.outputChannelSize=a,this.gridSize=e,this.batchSize=i,this.tensorShape=[i,e[0],e[1],n],this.tensorSize=i*e[0]*e[1]*n,this.outputSize=i*e[0]*e[1]*a}initMatrixFromJSON(t){if(console.log("initMatrixFromJSON called"),this.matrixArray=new Float32Array(t.flat(1/0)),this.normalizeMatrix(this.matrixArray),this.matrixArray.length!==this.tensorSize)throw Error("matrixArray length ".concat(this.matrixArray.length," does not match tensorSize ").concat(this.tensorSize));this.matrixArray=this.matrixMap(this.matrixArray,[0,1],t=>Math.max(t,0)),this.mass=this.matrixSum(this.matrixArray,[0,1])}async iterate(){if(null==this.session)throw Error("session is null, createModelServices() must be called at first");console.log("iterate called"),console.log("this.matrixArray",this.matrixArray);let t=this.matrixSum(this.matrixArray,[1,5],t=>t**2),e=new r.Tensor("float32",this.matrixArray,this.tensorShape),i={};i[this.session.inputNames[0]]=e,this.session.run(i).then(e=>{if(e.Output.data instanceof Float32Array){let i=this.constrainOutput(e.Output.data,t);this.outputCallback(i),this.curFrameCountbyLastSecond++,console.log("curFrameCountbyLastSecond",this.curFrameCountbyLastSecond),this.copyOutputToMatrix(i),setTimeout(()=>{this.isPaused||(this.curFrameCountbyLastSecond>this.fpsLimit?(this.isPaused=!0,console.log("fps limit reached, pause simulation, fpsLimit:",this.fpsLimit,"curFrameCountbyLastSecond:",this.curFrameCountbyLastSecond)):this.iterate().catch(t=>{console.error("error in iterate",t),this.isPaused=!0}))})}}).catch(t=>{console.error("error in session.run",t),this.isPaused=!0})}normalizeMatrix(t){console.log("normalizeMatrix called");for(let e=0;e<this.channelSize;e++)t=this.normalizeMatrixChannel(t,e)}normalizeMatrixChannel(t,e){let i=this.matrixSum(t,[e,e+1],t=>t),r=this.roundFloat(i/(this.gridSize[0]*this.gridSize[1]*this.batchSize),4),n=this.roundFloat(Math.sqrt(this.matrixSum(t,[e,e+1],t=>Math.pow(t-r,2))/(this.gridSize[0]*this.gridSize[1]*this.batchSize)),4);return console.log("normalizeMatrixChannel",e,r,n),this.matrixMap(t,[e,e+1],t=>(t-r)/n)}constrainOutput(t,e){let i=this.constrainDensity(t);return this.constrainVelocity(i,e)}constrainDensity(t){t=this.matrixMap(t,[0,1],t=>Math.max(t,0),!0);let e=this.matrixSum(t,[0,1],t=>t,!0),i=this.mass/e;return console.log("Scaling density, cur mass:",e,"target mass:",this.mass,"scale:",i),this.matrixMap(t,[0,1],t=>t*i,!0)}constrainVelocity(t,e){let i=this.matrixSum(t,[1,3],t=>t**2,!0),r=this.roundFloat(Math.sqrt(e/i),4);return(console.log("Scaling velocity, cur energy:",i,"target energy:",e,"scale:",r),r>=1)?t:this.matrixMap(t,[1,3],t=>t*r,!0)}copyOutputToMatrix(t){if(0===this.matrixArray.length)throw Error("matrixArray is empty");let e=0,i=0,r=0;for(;e<t.length;){if(r>=3&&(r=0,(i+=2)>=this.matrixArray.length))throw Error("toIndex ".concat(i," exceeds matrixArray length ").concat(this.matrixArray.length));this.matrixArray[i]=t[e],e++,i++,r++}if(e!==t.length)throw Error("fromIndex ".concat(e," does not match outputs length ").concat(t.length));if(i+2!==this.matrixArray.length)throw Error("toIndex ".concat(i," does not match matrixArray length ").concat(this.matrixArray.length))}updateForce(t,e){let i=this.getIndex(t);this.matrixArray[i+3]+=e.x,this.matrixArray[i+4]+=e.y}getIndex(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e*this.gridSize[0]*this.gridSize[1]*this.channelSize+t.y*this.gridSize[1]*this.channelSize+t.x*this.channelSize}matrixSum(t,e){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t=>t,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],n=r?this.outputSize:this.tensorSize,a=r?this.outputChannelSize:this.channelSize,s=0,o=0;for(;o<n;){for(let r=e[0];r<e[1];r++)s+=i(t[o+r]);o+=a}return s}matrixMap(t,e,i){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],n=r?this.outputSize:this.tensorSize,a=r?this.outputChannelSize:this.channelSize,s=0;for(;s<n;){for(let r=e[0];r<e[1];r++)t[s+r]=i(t[s+r]);s+=a}return t}roundFloat(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4;return Math.round(t*10**e)/10**e}constructor(){this.session=null,this.matrixArray=new Float32Array,this.gridSize=[0,0],this.batchSize=0,this.tensorShape=[0,0,0,0],this.tensorSize=0,this.outputSize=0,this.isPaused=!0,this.channelSize=0,this.outputChannelSize=0,this.mass=0,this.fpsLimit=30,this.curFrameCountbyLastSecond=0}}let a=null;async function s(t){let e=e=>{let i=new Float32Array(e.length/3);for(let t=0;t<i.length;t++)i[t]=e[3*t];t.postMessage({type:"output",density:i})},i=await n.createModelService("../chunks/pages/model/bno_small.onnx",[64,64],1);return i.bindOutput(e),await i.initMatrixFromPath("".concat("https://techlauncher-mlai-edge-physics.github.io","/initData/pvf_incomp_44_0.json")),i}self.onmessage=function(t){let e=t.data;if(null==e)throw Error("data is null");if(null==e.func)throw Error("data.type is null");switch(console.log("worker received message",e),e.func){case"init":null==a&&s(this).then(t=>{a=t,this.postMessage({type:"init"})}).catch(t=>{console.error("error in initModelService",t)});break;case"start":if(null==a)throw Error("modelService is null");a.startSimulation().catch(t=>{console.error("error in startSimulation",t)});break;case"pause":if(null==a)throw Error("modelService is null");a.pauseSimulation();break;case"updateForce":if(null==a)throw Error("modelService is null");a.updateForce(e.args.loc,e.args.forceDelta)}}}},o={};function l(t){var e=o[t];if(void 0!==e)return e.exports;var i=o[t]={exports:{}},r=!0;try{s[t](i,i.exports,l),r=!1}finally{r&&delete o[t]}return i.exports}l.m=s,l.x=function(){var t=l.O(void 0,[770,240],function(){return l(9868)});return l.O(t)},t=[],l.O=function(e,i,r,n){if(i){n=n||0;for(var a=t.length;a>0&&t[a-1][2]>n;a--)t[a]=t[a-1];t[a]=[i,r,n];return}for(var s=1/0,a=0;a<t.length;a++){for(var i=t[a][0],r=t[a][1],n=t[a][2],o=!0,c=0;c<i.length;c++)s>=n&&Object.keys(l.O).every(function(t){return l.O[t](i[c])})?i.splice(c--,1):(o=!1,n<s&&(s=n));if(o){t.splice(a--,1);var h=r();void 0!==h&&(e=h)}}return e},l.d=function(t,e){for(var i in e)l.o(e,i)&&!l.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},l.f={},l.e=function(t){return Promise.all(Object.keys(l.f).reduce(function(e,i){return l.f[i](t,e),e},[]))},l.u=function(t){return"static/chunks/"+(770===t?"e2fde11a":t)+"."+({240:"866920120bfc80d5",770:"8ac54a9317306ec1"})[t]+".js"},l.miniCssF=function(t){},l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(t){if("object"==typeof window)return window}}(),l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.tt=function(){return void 0===e&&(e={createScriptURL:function(t){return t}},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("nextjs#bundler",e))),e},l.tu=function(t){return l.tt().createScriptURL(t)},l.p="/_next/",i={470:1,611:1,868:1},l.f.i=function(t,e){i[t]||importScripts(l.tu(l.p+l.u(t)))},n=(r=self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push.bind(r),r.push=function(t){var e=t[0],r=t[1],a=t[2];for(var s in r)l.o(r,s)&&(l.m[s]=r[s]);for(a&&a(l);e.length;)i[e.pop()]=1;n(t)},a=l.x,l.x=function(){return Promise.all([l.e(770),l.e(240)]).then(a)},_N_E=l.x()}();