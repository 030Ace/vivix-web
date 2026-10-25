(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,86450,t=>{"use strict";var e=t.i(43476),i=t.i(75056),r=t.i(98903),a=t.i(71645),o=t.i(90072);function n({colors:t}){let i=(0,a.useRef)(null),{positions:l,tints:s,seeds:u}=(0,a.useMemo)(()=>{var e;let i=(e=1988,()=>{e|=0;let t=Math.imul((e=e+0x6d2b79f5|0)^e>>>15,1|e);return(((t=t+Math.imul(t^t>>>7,61|t)^t)^t>>>14)>>>0)/0x100000000}),r=new Float32Array(4200),a=new Float32Array(4200),n=new Float32Array(1400),l=new o.Es;for(let e=0;e<1400;e++){let o=9*Math.pow(i(),.7),s=i()*Math.PI*2;r.set([Math.cos(s)*o*1.6,(i()-.5)*7,Math.sin(s)*o*.6-2],3*e),l.set(t[e%t.length]),a.set([l.r,l.g,l.b],3*e),n[e]=i()}return{positions:r,tints:a,seeds:n}},[t]),f=(0,a.useMemo)(()=>new o.Zg({transparent:!0,depthWrite:!1,blending:o.tq,uniforms:{uTime:{value:0},uPixel:{value:Math.min(2,window.devicePixelRatio)}},vertexShader:`
          attribute vec3 tint;
          attribute float seed;
          uniform float uTime;
          uniform float uPixel;
          varying vec3 vTint;
          varying float vFade;
          void main() {
            vec3 p = position;
            float t = uTime * (0.04 + seed * 0.05);
            p.y += mod(t * 3.0 + seed * 7.0, 7.0) - 3.5;
            p.x += sin(t * 6.0 + seed * 40.0) * 0.35;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (2.2 + seed * 5.0) * uPixel * (7.0 / -mv.z);
            vTint = tint;
            vFade = smoothstep(3.5, 2.2, abs(p.y)) * (0.35 + seed * 0.65);
          }`,fragmentShader:`
          varying vec3 vTint;
          varying float vFade;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.0, d);
            gl_FragColor = vec4(vTint, a * vFade * 0.8);
          }`}),[]);return(0,r.f)((t,e)=>{let r=i.current;r&&(r.material.uniforms.uTime.value+=e,r.rotation.y+=.01*e,r.rotation.x=o.rB.lerp(r.rotation.x,.06*t.pointer.y,.02),r.rotation.z=o.rB.lerp(r.rotation.z,-(.04*t.pointer.x),.02))}),(0,e.jsx)("points",{ref:i,material:f,children:(0,e.jsxs)("bufferGeometry",{children:[(0,e.jsx)("bufferAttribute",{attach:"attributes-position",args:[l,3]}),(0,e.jsx)("bufferAttribute",{attach:"attributes-tint",args:[s,3]}),(0,e.jsx)("bufferAttribute",{attach:"attributes-seed",args:[u,1]})]})})}t.s(["default",0,function({colors:t}){return(0,e.jsx)(i.f,{dpr:[1,1.75],camera:{position:[0,0,8],fov:50},gl:{antialias:!1,alpha:!0,powerPreference:"low-power"},children:(0,e.jsx)(n,{colors:t})})}])},41322,function(t){t.n(t.i(86450))}]);