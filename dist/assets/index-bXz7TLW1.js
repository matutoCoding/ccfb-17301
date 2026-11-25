var th=Object.defineProperty;var eh=(i,t,e)=>t in i?th(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Dr=(i,t,e)=>eh(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function v(i,t,...e){const n=document.createElement(i);if(t)for(const[s,r]of Object.entries(t))r==null||r===!1||(s==="class"?n.className=String(r):s==="dataset"?Object.assign(n.dataset,r):s.startsWith("data-")?n.setAttribute(s,String(r)):s.startsWith("on")&&typeof r=="function"?n.addEventListener(s.slice(2).toLowerCase(),r):s==="html"?n.innerHTML=String(r):s==="style"&&typeof r=="string"?n.setAttribute("style",r):n[s]=r);for(const s of e.flat())s===!1||s===null||s===void 0||n.append(s instanceof Node?s:document.createTextNode(String(s)));return n}function Ke(i,t="info"){let e=document.getElementById("toast-box");e||(e=v("div",{id:"toast-box"}),document.body.appendChild(e));const n=v("div",{class:`toast ${t}`},i);e.appendChild(n),setTimeout(()=>{n.classList.add("hide"),setTimeout(()=>n.remove(),300)},2600)}function ks(i){return`${Math.round(i*100)}%`}function nh(i){return i==null?"—":`${i.toFixed(1)}`}function ua(i,t,e="text/plain;charset=utf-8"){const n=new Blob([t],{type:e}),s=URL.createObjectURL(n),r=document.createElement("a");r.href=s,r.download=i,r.click(),setTimeout(()=>URL.revokeObjectURL(s),4e3)}function Hn(i){let t=2166136261;const e=String(i);for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t^=t>>>16,t=Math.imul(t,2246822507),t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16,t>>>0}function ih(i){let t=i>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}class Ds{constructor(t){Dr(this,"next01");Dr(this,"seed");this.seed=typeof t=="string"?Hn(t):t>>>0,this.next01=ih(this.seed)}float(){return this.next01()}range(t,e){return t+(e-t)*this.next01()}int(t,e){return Math.floor(this.range(t,e+1))}gauss(){let t=0,e=0;for(;t===0;)t=this.next01();for(;e===0;)e=this.next01();return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*e)}chance(t){return this.next01()<t}pick(t){return t[Math.floor(this.next01()*t.length)]}}function da(i){let t=2166136261;for(const e of i)for(let n=0;n<e.length;n++){let s=Math.round(e[n]*1e6)|0;t=Math.imul(t^s&255,16777619),t=Math.imul(t^s>>>8&255,16777619),t=Math.imul(t^s>>>16&255,16777619),t=Math.imul(t^s>>>24&255,16777619)}return("00000000"+(t>>>0).toString(16)).slice(-8)}const ms=["左前","右前","左后","右后"],Qt=(i=0,t=0,e=0)=>({x:i,y:t,z:e}),Fn=(i,t)=>({x:i.x-t.x,y:i.y-t.y,z:i.z-t.z}),Ye=(i,t)=>i.x*t.x+i.y*t.y+i.z*t.z,Lr=(i,t)=>Math.hypot(i.x-t.x,i.y-t.y,i.z-t.z);function kl(i,t,e,n){let s=i.y*Math.cos(t)-i.z*Math.sin(t),r=i.y*Math.sin(t)+i.z*Math.cos(t),a=i.x;const o=a*Math.cos(e)+r*Math.sin(e);r=-a*Math.sin(e)+r*Math.cos(e),a=o;const c=s*Math.cos(n)-a*Math.sin(n);return a=a*Math.cos(n)+s*Math.sin(n),s=c,{x:a,y:s,z:r}}function Uo(i,t,e){return i<t?t:i>e?e:i}const Vn=.001,pi=Math.PI/180;function sh(i){if(i<=0)return .8;const t=65,e=Math.max(1,i);return .82+.2*(Math.pow(e/t,.22)*Math.exp(.22*(1-e/t)))}function rh(i){const t=i.traits,e=new Ds(Hn(i.id+":teatvar")),n=[];for(let s=0;s<4;s++){const r=s>=2;let a=t.teatLengthMm*e.range(.92,1.08),o=t.teatDiameterMm*.5*e.range(.92,1.06),c=e.range(3,9),l=s===0||s===2?90:-90;r?(c+=e.range(0,5),l+=e.range(-14,14)):l+=e.range(-10,10),i.flags.veryShortTeats&&(a=e.range(16,30),o*=e.range(.85,1)),i.flags.crossedRearTeats&&r&&(l=s===2?-90+e.range(-8,8):90+e.range(-8,8),c=e.range(30,48)),n.push({lengthMm:a,radiusMm:o,tiltDeg:c,yawDeg:l})}return i.teatOverrides?.forEach((s,r)=>{s&&(n[r]={...n[r],...s})}),n}function io(i){const t=rh(i),e=i.kind==="lactating"?Math.min(1,i.hoursSinceMilking/11):.35,n=sh(i.dim),s=new Ds(Hn(i.id+":quarters")),r=[];for(let a=0;a<4;a++)r.push(n*s.range(.96,1.04));return{quarterFullness:r,teats:t,stance:{...i.stance},dim:i.dim,milkState:e,wetness:i.flags.wetness??0}}function ah(i){const t=i.pitchDeg*pi,e=i.rollDeg*pi;return n=>{const s=kl(n,t,0,e);return{x:s.x+i.offsetX,y:s.y,z:s.z}}}function oh(i){const t=i.tiltDeg*pi,e=i.yawDeg*pi,n=Math.sin(t)*Math.sin(e),s=-Math.sin(t)*Math.cos(e),r=-Math.cos(t);return Qt(n,r,s)}function On(i,t){const e=t??io(i),n=i.traits,s=n.udderFloorHeightMm*Vn,r=ah(e.stance),a=[],o=[],c=[],l=[],u=[],d=T=>r(T),h=T=>kl(T,e.stance.pitchDeg*pi,0,e.stance.rollDeg*pi),f=e.quarterFullness.map(T=>T*(.86+.2*e.milkState));a.push({kind:"ellipsoid",part:"udder",albedo:.62,c:d(Qt(0,s+.115,.03)),e0:h(Qt(1,0,0)),e1:h(Qt(0,1,0)),e2:h(Qt(0,0,1)),r:Qt(.15*f.reduce((T,D)=>T+D,0)/4,.115,.195)});const _=n.frontTeatSpreadMm*Vn,x=n.rearTeatSpreadMm*Vn,m=n.frontRearGapMm*Vn,p=-.085,M=p+m,w=[_/2,-_/2,x/2,-x/2],S=[M,M,p,p];for(let T=0;T<4;T++){const D=f[T],O=.072*(.94+.12*D),F=.082*(.9+.16*D),$=.088*(.94+.12*D),H=w[T],q=S[T]+(T<2?.012:-.012),et=s+F;a.push({kind:"ellipsoid",part:"udder",albedo:.6,c:d(Qt(H,et,q)),e0:h(Qt(1,0,0)),e1:h(Qt(0,1,0)),e2:h(Qt(0,0,1)),r:Qt(O,F,$)});const gt=e.teats[T],Q=gt.lengthMm*Vn,B=gt.radiusMm*Vn,Z=Qt(w[T],s+B*.35,S[T]),rt=oh(gt);h(rt);const st=d(Z),lt={x:Z.x+rt.x*Math.max(0,Q-B),y:Z.y+rt.y*Math.max(0,Q-B),z:Z.z+rt.z*Math.max(0,Q-B)},It={x:Z.x+rt.x*Q,y:Z.y+rt.y*Q,z:Z.z+rt.z*Q},Kt=d(lt);if(a.push({kind:"capsule",part:"teat",teatId:T,albedo:.52,a:st,b:Kt,r:B}),c.push(st),o.push(d(It)),e.wetness>0){const Tt=new Ds(Hn(i.id+":wet"+T)),Vt=Math.round(e.wetness*3*(Tt.chance(.6)?1:0));for(let qt=0;qt<Vt;qt++){const Ft=Tt.range(.25,.95);l.push({c:d({x:Z.x+rt.x*Q*Ft,y:Z.y+rt.y*Q*Ft,z:Z.z+rt.z*Q*Ft}),r:Tt.range(.004,.009)*(.7+e.wetness*.6)})}}}const A=n.rearUdderHeightMm*Vn,R=n.rearUdderWidthMm*Vn;a.push({kind:"ellipsoid",part:"udder",albedo:.58,c:d(Qt(0,(s+A)/2+.05,-.145)),e0:h(Qt(1,0,0)),e1:h(Qt(0,1,0)),e2:h(Qt(0,0,1)),r:Qt(R/2,Math.max(.12,(A-s)/2+.06),.055)}),a.push({kind:"ellipsoid",part:"body",albedo:.7,c:d(Qt(0,s+.34,.22)),e0:h(Qt(1,0,0)),e1:h(Qt(0,1,0)),e2:h(Qt(0,0,1)),r:Qt(.24,.21,.52)});const g=e.stance.legSpread;for(const T of[-1,1]){const D=T>0?"legL":"legR",O=T>0?e.stance.legLz:e.stance.legRz,F=T*.145*g,$=T*.118*g,H=T*.1*g,q=Qt(F,.92,-.02+O*.3),et=Qt($,.46,-.2+O),gt=Qt(H,.13,-.1+O*.6);a.push({kind:"capsule",part:D,albedo:.72,a:d(q),b:d(et),r:.052}),a.push({kind:"capsule",part:D,albedo:.7,a:d(et),b:d(gt),r:.034}),a.push({kind:"ellipsoid",part:D,albedo:.66,c:d(Qt(H,.05,-.06+O*.6)),e0:Qt(1,0,0),e1:Qt(0,1,0),e2:Qt(0,0,1),r:Qt(.052,.05,.085)})}const E=e.stance.tailSwingDeg*pi,L=Math.sin(E)*.12,P=Qt(.02,1.04,-.27),N=Qt(L*.4,.74,-.34),I=Qt(L,.46,-.31);a.push({kind:"capsule",part:"tail",albedo:.4,a:d(P),b:d(N),r:.02}),a.push({kind:"capsule",part:"tail",albedo:.38,a:d(N),b:d(I),r:.016}),a.push({kind:"sphere",part:"tail",albedo:.32,c:d(I),r:.046});for(const T of[-1,1])u.push({c:d(Qt(T*.105,s+.075,-.14)),r:.1});const G=d(Qt(0,s+.09,.02));return{cow:i,params:e,prims:a,gtTips:o,gtBases:c,udderCenter:G,wetZones:l,creaseZones:u,seed:Hn(i.id)}}const Hl=["floor","body","udder","teat","legL","legR","tail","hoof"],lh=i=>Hl.indexOf(i),ch=i=>Hl[i]??"body",En=1e-7;function hh(i,t,e,n,s,r){if(i<En)return null;const a={x:t.x+e.x*i,y:t.y+e.y*i,z:t.z+e.z*i},o=Fn(a,n),c=Math.hypot(o.x,o.y,o.z)||1;return{t:i,point:a,normal:{x:o.x/c,y:o.y/c,z:o.z/c},prim:r}}function Gl(i,t,e){const n=Fn(i,e.c),s=Ye(n,t),r=Ye(n,n)-e.r*e.r,a=s*s-r;if(a<0)return null;const o=Math.sqrt(a);let c=-s-o;return c<En&&(c=-s+o),c<En?null:hh(c,i,t,e.c,e.r,e)}function Vl(i,t,e){const n=Fn(i,e.c),s=Ye(n,e.e0)/e.r.x,r=Ye(n,e.e1)/e.r.y,a=Ye(n,e.e2)/e.r.z,o=Ye(t,e.e0)/e.r.x,c=Ye(t,e.e1)/e.r.y,l=Ye(t,e.e2)/e.r.z,u=o*o+c*c+l*l,d=s*o+r*c+a*l,h=s*s+r*r+a*a-1,f=d*d-u*h;if(f<0||u<En)return null;const _=Math.sqrt(f);let x=(-d-_)/u;if(x<En&&(x=(-d+_)/u),x<En)return null;const m={x:i.x+t.x*x,y:i.y+t.y*x,z:i.z+t.z*x},p=s+x*o,M=r+x*c,w=a+x*l;let S=e.e0.x*p/e.r.x+e.e1.x*M/e.r.y+e.e2.x*w/e.r.z,A=e.e0.y*p/e.r.x+e.e1.y*M/e.r.y+e.e2.y*w/e.r.z,R=e.e0.z*p/e.r.x+e.e1.z*M/e.r.z+e.e2.z*w/e.r.z;const g=Math.hypot(S,A,R)||1;return S/=g,A/=g,R/=g,{t:x,point:m,normal:{x:S,y:A,z:R},prim:e}}function Wl(i,t,e){const n=Fn(e.b,e.a),s=Fn(i,e.a),r=Ye(n,n),a=Ye(n,t),o=Ye(n,s),c=Ye(t,s),l=Ye(s,s),u=e.r;let d=1/0,h=null;const f=r-a*a;if(f>1e-10){const x=r*c-o*a,m=r*l-o*o-u*u*r,p=x*x-f*m;if(p>=0){const M=(-x-Math.sqrt(p))/f,w=o+M*a;if(M>En&&w>0&&w<r&&M<d){d=M;const S={x:i.x+t.x*M,y:i.y+t.y*M,z:i.z+t.z*M},A=w/r,R={x:e.a.x+n.x*A,y:e.a.y+n.y*A,z:e.a.z+n.z*A},g=Fn(S,R),E=Math.hypot(g.x,g.y,g.z)||1;h={x:g.x/E,y:g.y/E,z:g.z/E}}}}for(const x of[e.a,e.b]){const m=Fn(i,x),p=Ye(m,t),M=Ye(m,m)-u*u,w=p*p-M;if(w<0)continue;const S=Math.sqrt(w);let A=-p-S;if(A<En&&(A=-p+S),A>En&&A<d){const R={x:i.x+t.x*A,y:i.y+t.y*A,z:i.z+t.z*A},g=Fn(R,x),E=Math.hypot(g.x,g.y,g.z)||1;d=A,h={x:g.x/E,y:g.y/E,z:g.z/E}}}if(!isFinite(d)||!h)return null;const _={x:i.x+t.x*d,y:i.y+t.y*d,z:i.z+t.z*d};return{t:d,point:_,normal:h,prim:e}}function uh(i,t){if(Math.abs(t.y)<1e-9)return null;const e=-i.y/t.y;return e>En?e:null}function dh(i,t,e){let n=null;for(let s=0;s<e.length;s++){const r=e[s];let a=null;r.kind==="sphere"?a=Gl(i,t,r):r.kind==="ellipsoid"?a=Vl(i,t,r):a=Wl(i,t,r),a&&(!n||a.t<n.t)&&(n=a)}return n}function fh(i,t,e,n=!1){const s=Fn(t,i),r=Math.hypot(s.x,s.y,s.z);if(r<1e-9)return{blocked:!1,count:0};const a={x:s.x/r,y:s.y/r,z:s.z/r};let o=0,c;for(const l of e){if(n&&l.part==="teat")continue;let u=null;l.kind==="sphere"?u=Gl(i,a,l):l.kind==="ellipsoid"?u=Vl(i,a,l):u=Wl(i,a,l),u&&u.t<=r&&u.t>=0&&(o++,c||(c=l))}return{blocked:o>0,count:o,prim:c}}const gs=[{id:"blaze-vga",label:"Basler blaze-101 (640×480)",width:640,height:480,fovXDeg:67,fovYDeg:51,workDistM:1,rangeM:[.3,3],modFreqMhz:40,wavelengthNm:940},{id:"azure-nfov",label:"Azure Kinect NFOV (320×288)",width:320,height:288,fovXDeg:75,fovYDeg:65,workDistM:.8,rangeM:[.25,2.5],modFreqMhz:80,wavelengthNm:860},{id:"pmd-qvga",label:"pmd flexx2 QVGA (320×240)",width:320,height:240,fovXDeg:62,fovYDeg:48,workDistM:.6,rangeM:[.2,2],modFreqMhz:60,wavelengthNm:850},{id:"ifm-o3d",label:"ifm O3D303 (176×132)",width:176,height:132,fovXDeg:60,fovYDeg:45,workDistM:.5,rangeM:[.3,1.25],modFreqMhz:55,wavelengthNm:850},{id:"sweep-fast",label:"扫描用低分辨率 (160×120)",width:160,height:120,fovXDeg:66,fovYDeg:50,workDistM:.6,rangeM:[.2,2.2],modFreqMhz:48,wavelengthNm:940}],Xl={enabled:!0,depthNoiseScale:1,falloffScale:1,flyingPixels:!0,multipath:!0,wetSaturation:!0,multipathBiasM:.018};function ql(i,t){const e=i.pitchDeg*Math.PI/180,n=i.yawDeg*Math.PI/180,s=i.rollDeg*Math.PI/180,r={x:Math.sin(n)*Math.cos(e),y:Math.sin(e),z:Math.cos(n)*Math.cos(e)},a=Math.hypot(r.z,r.x)||1;let o={x:r.z/a,y:0,z:-r.x/a},c={x:r.y*o.z-r.z*o.y,y:r.z*o.x-r.x*o.z,z:r.x*o.y-r.y*o.x};if(s!==0){const d=Math.cos(s),h=Math.sin(s),f={x:o.x*d+c.x*h,y:o.y*d+c.y*h,z:o.z*d+c.z*h},_={x:c.x*d-o.x*h,y:c.y*d-o.y*h,z:c.z*d-o.z*h};o=f,c=_}const l=t.width/2/Math.tan(t.fovXDeg*Math.PI/360),u=t.height/2/Math.tan(t.fovYDeg*Math.PI/360);return{eye:{...i.position},forward:r,right:o,up:c,fx:l,fy:u}}function ph(i,t,e=0){const n=t.x-i.x,s=t.y-i.y,r=t.z-i.z,a=Math.hypot(n,r)||1e-6;return{position:{...i},pitchDeg:Math.atan2(s,a)*180/Math.PI,yawDeg:Math.atan2(n,r)*180/Math.PI,rollDeg:e}}function fa(i){const t=i.cow.traits.udderFloorHeightMm/1e3,e={x:i.udderCenter.x,y:t-.02,z:0},n={x:i.cow.stance.offsetX*.6,y:Math.max(.21,t-.32),z:-.4};return ph(n,e)}function mh(i,t){for(const e of t.wetZones){const n=i.x-e.c.x,s=i.y-e.c.y,r=i.z-e.c.z;if(n*n+s*s+r*r<e.r*e.r)return!0}return!1}function gh(i,t){let e=0;for(const n of t.creaseZones){const s=Math.hypot(i.x-n.c.x,i.y-n.c.y,i.z-n.c.z);s<n.r&&(e=Math.max(e,1-s/n.r))}return e}function _h(i,t){const{preset:e,noise:n}=t,s=e.width,r=e.height,a=s*r,o=ql(t.pose,e),c=`${i.cow.id}|${t.seed}|${e.id}|${t.pose.position.x.toFixed(4)},${t.pose.position.y.toFixed(4)},${t.pose.position.z.toFixed(4)}|${t.pose.pitchDeg.toFixed(2)},${t.pose.yawDeg.toFixed(2)},${t.pose.rollDeg.toFixed(2)}|${n.enabled?1:0}`,l=new Ds(Hn(c)),u=new Float32Array(a),d=new Float32Array(a),h=new Uint8ClampedArray(a),f=new Uint8Array(a),_=new Int8Array(a).fill(-1),x=new Float32Array(a*3),m=new Uint8Array(a),p=new Uint8Array(a),M=new Uint8Array(a),w=new Uint8Array(a),S=new Float32Array(a*2),A=new Float32Array(a);for(let L=0;L<a;L++)S[L*2]=l.gauss(),S[L*2+1]=l.gauss(),A[L]=l.float();const R=i.prims,[g,E]=e.rangeM;for(let L=0;L<r;L++){const P=r/2-(L+.5);for(let N=0;N<s;N++){const I=L*s+N,G=N+.5-s/2;let T=o.forward.x+G/o.fx*o.right.x+P/o.fy*o.up.x,D=o.forward.y+G/o.fx*o.right.y+P/o.fy*o.up.y,O=o.forward.z+G/o.fx*o.right.z+P/o.fy*o.up.z;const F=Math.hypot(T,D,O)||1;T/=F,D/=F,O/=F;const $=o.eye,H={x:T,y:D,z:O};let q=1/0,et=null,gt=null;const Q=uh($,H);Q!==null&&Q<q&&(q=Q,et={x:0,y:1,z:0},gt=null);const B=dh($,H,R);if(B&&B.t<q&&(q=B.t,et=B.normal,gt=B.prim),!isFinite(q)||q>E||q<g*.4){d[I]=NaN,u[I]=NaN;continue}const Z={x:$.x+T*q,y:$.y+D*q,z:$.z+O*q};d[I]=q,f[I]=gt?lh(gt.part):0,gt?.teatId!==void 0&&(_[I]=gt.teatId);const rt=et?Uo(-(et.x*T+et.y*D+et.z*O),.05,1):.9,st=q;let It=10+(118*n.falloffScale+40*(1-n.falloffScale))*(gt?.albedo??.55)*rt/(st*st);if(It*=.85+.15*Math.min(1,e.modFreqMhz/60),n.enabled&&n.wetSaturation&&gt?.part==="teat"&&i.wetZones.length&&mh(Z,i)){w[I]=1,h[I]=255,u[I]=NaN,d[I]=q,m[I]=0;continue}const Kt=48,Tt=Math.max(It,42),Vt=Math.sqrt(130/Tt);let qt=.0016*(Kt/e.modFreqMhz)*Vt*n.depthNoiseScale;qt=Math.min(qt,.012);let Ft=q;if(n.enabled){const ue=Math.max(-2.5,Math.min(2.5,S[I*2]));Ft+=ue*qt,It+=S[I*2+1]*(2.5+Math.sqrt(Math.max(It,1))*.55)}if(h[I]=Uo(Math.round(It),0,255),n.enabled&&n.multipath&&gt?.part==="udder"){const ue=gh(Z,i);ue>.02&&(M[I]=1,Ft+=n.multipathBiasM*(.35+.65*ue),Ft+=S[I*2]*.004*ue)}u[I]=Ft,m[I]=1,x[I*3]=$.x+T*Ft,x[I*3+1]=$.y+D*Ft,x[I*3+2]=$.z+O*Ft}}if(n.enabled&&n.flyingPixels){const L=(P,N)=>P<0||N<0||P>=s||N>=r?NaN:d[N*s+P];for(let P=1;P<r-1;P++)for(let N=1;N<s-1;N++){const I=P*s+N,G=d[I];if(!isFinite(G)||w[I])continue;const T=[L(N-1,P),L(N+1,P),L(N,P-1),L(N,P+1)];let D=G,O=G;for(const $ of T){if(!isFinite($)){D=Math.max(D,G+.5);continue}$>D&&(D=$),$<O&&(O=$)}if(D-O>.045&&G<=O+.02&&A[I]<.42){const $=.3+A[(I+13)%a]*.45,H=O+(D-O)*$;u[I]=H+S[I*2]*.006,p[I]=1,m[I]=1}}for(let P=0;P<a;P++){if(!m[P]||!isFinite(u[P])){m[P]=0;continue}const N=P%s,I=P/s|0,G=N+.5-s/2,T=r/2-(I+.5);let D=o.forward.x+G/o.fx*o.right.x+T/o.fy*o.up.x,O=o.forward.y+G/o.fx*o.right.y+T/o.fy*o.up.y,F=o.forward.z+G/o.fx*o.right.z+T/o.fy*o.up.z;const $=Math.hypot(D,O,F)||1;D/=$,O/=$,F/=$;const H=u[P];x[P*3]=o.eye.x+D*H,x[P*3+1]=o.eye.y+O*H,x[P*3+2]=o.eye.z+F*H}}return{width:s,height:r,depth:u,cleanDepth:d,ir:h,partId:f,teatId:_,points:x,valid:m,flying:p,multipath:M,saturated:w,seed:t.seed,eye:o.eye}}function xh(i){const t=i.udderCenter,e=i.cow.traits.udderFloorHeightMm/1e3;return{minX:t.x-.34,maxX:t.x+.34,minY:.1,maxY:e+.3,minZ:-.46,maxZ:.38}}function Ir(i,t){let e=0,n=0,s=0,r=0,a=0,o=0;for(const l of i){const u=l.x-t.x,d=l.y-t.y,h=l.z-t.z;e+=u*u,n+=d*d,s+=h*h,r+=u*d,a+=u*h,o+=d*h}let c={x:0,y:1,z:0};for(let l=0;l<40;l++){const u=e*c.x+r*c.y+a*c.z,d=r*c.x+n*c.y+o*c.z,h=a*c.x+o*c.y+s*c.z,f=Math.hypot(u,d,h)||1;c={x:u/f,y:d/f,z:h/f}}return c}function oi(i){let t=0,e=0,n=0;for(const s of i)t+=s.x,e+=s.y,n+=s.z;return{x:t/i.length,y:e/i.length,z:n/i.length}}function vh(i,t){let e=t,n=new Float64Array(i.length).fill(1);for(let s=0;s<4;s++){let r=0,a=0,o=0,c=0;for(let S=0;S<i.length;S++)r+=n[S],a+=i[S].x*n[S],o+=i[S].y*n[S],c+=i[S].z*n[S];if(r<=0)break;const l={x:a/r,y:o/r,z:c/r};let u=0,d=0,h=0,f=0,_=0,x=0;const m=[];for(let S=0;S<i.length;S++){const A=i[S],R=A.x-l.x,g=A.y-l.y,E=A.z-l.z,L=R*e.x+g*e.y+E*e.z,P=Math.hypot(R-e.x*L,g-e.y*L,E-e.z*L);m.push(P);const N=n[S];u+=N*R*R,d+=N*g*g,h+=N*E*E,f+=N*R*g,_+=N*R*E,x+=N*g*E}let p={...e};for(let S=0;S<30;S++){const A=u*p.x+f*p.y+_*p.z,R=f*p.x+d*p.y+x*p.z,g=_*p.x+x*p.y+h*p.z,E=Math.hypot(A,R,g)||1;p={x:A/E,y:R/E,z:g/E}}e=p.y<0?{x:-p.x,y:-p.y,z:-p.z}:p;const M=[...m].sort((S,A)=>S-A),w=1.4826*(M[M.length>>1]||.01)+1e-4;n=new Float64Array(i.length);for(let S=0;S<i.length;S++){const A=m[S]/w;n[S]=A<=1.345?1:1.345/Math.max(A,.001)}}return e}function on(i,t,e){const n=i.x-t.x,s=i.y-t.y,r=i.z-t.z,a=n*e.x+s*e.y+r*e.z;return{q:a,per:Math.hypot(n-e.x*a,s-e.y*a,r-e.z*a)}}function Nr(i){const t=i.length;if(t<8)return null;const e=new Float64Array(16),n=new Float64Array(4);for(const d of i){const h=[2*d.x,2*d.y,2*d.z,1],f=d.x*d.x+d.y*d.y+d.z*d.z;for(let _=0;_<4;_++){n[_]+=h[_]*f;for(let x=0;x<4;x++)e[_*4+x]+=h[_]*h[x]}}const s=Array.from(e),r=Array.from(n);for(let d=0;d<4;d++){let h=d;for(let f=d+1;f<4;f++)Math.abs(s[f*4+d])>Math.abs(s[h*4+d])&&(h=f);if(Math.abs(s[h*4+d])<1e-9)return null;for(let f=0;f<4;f++){const _=s[d*4+f];s[d*4+f]=s[h*4+f],s[h*4+f]=_}{const f=r[d];r[d]=r[h],r[h]=f}for(let f=d+1;f<4;f++){const _=s[f*4+d]/s[d*4+d];for(let x=d;x<4;x++)s[f*4+x]-=_*s[d*4+x];r[f]-=_*r[d]}}const a=[0,0,0,0];for(let d=3;d>=0;d--){let h=r[d];for(let f=d+1;f<4;f++)h-=s[d*4+f]*a[f];a[d]=h/s[d*4+d]}let o={x:a[0],y:a[1],z:a[2]};const c=a[3]+o.x*o.x+o.y*o.y+o.z*o.z;if(!(c>1e-8))return null;let l=Math.sqrt(c);if(l<.003||l>.026)return null;for(let d=0;d<5;d++){const h=new Float64Array(16),f=new Float64Array(4);for(const M of i){const w=M.x-o.x,S=M.y-o.y,A=M.z-o.z,R=Math.hypot(w,S,A)||1e-6,g=R-l,E=[-w/R,-S/R,-A/R,-1];for(let L=0;L<4;L++){f[L]+=E[L]*g;for(let P=0;P<4;P++)h[L*4+P]+=E[L]*E[P]}}const _=Array.from(h),x=Array.from(f);let m=!1;for(let M=0;M<4;M++){let w=M;for(let S=M+1;S<4;S++)Math.abs(_[S*4+M])>Math.abs(_[w*4+M])&&(w=S);if(Math.abs(_[w*4+M])<1e-10){m=!0;break}for(let S=0;S<4;S++){const A=_[M*4+S];_[M*4+S]=_[w*4+S],_[w*4+S]=A}{const S=x[M];x[M]=x[w],x[w]=S}for(let S=M+1;S<4;S++){const A=_[S*4+M]/_[M*4+M];for(let R=M;R<4;R++)_[S*4+R]-=A*_[M*4+R];x[S]-=A*x[M]}}if(m)break;const p=[0,0,0,0];for(let M=3;M>=0;M--){let w=x[M];for(let S=M+1;S<4;S++)w-=_[M*4+S]*p[S];p[M]=w/_[M*4+M]}o={x:o.x-p[0],y:o.y-p[1],z:o.z-p[2]},l-=p[3]}let u=0;for(const d of i){const h=Math.hypot(d.x-o.x,d.y-o.y,d.z-o.z);u+=(h-l)**2}return{c:o,r:l,rmsMm:Math.sqrt(u/t)*1e3}}function Mh(i,t,e,n){const s=n?.strict??!1,r=performance.now(),a=xh(t),o=t.cow.traits.udderFloorHeightMm/1e3,{width:c,height:l,points:u,valid:d}=i,h=[];for(let Q=0;Q<c*l;Q++){if(!d[Q])continue;const B=u[Q*3],Z=u[Q*3+1],rt=u[Q*3+2];Z<a.minY||Z>a.maxY||B<a.minX||B>a.maxX||rt<a.minZ||rt>a.maxZ||h.push({x:B,y:Z,z:rt,px:Q})}const f=.005,_=Math.floor(a.minX/f),x=Math.floor(a.minZ/f),m=Math.ceil((a.maxX-a.minX)/f)+2,p=Math.ceil((a.maxZ-a.minZ)/f)+2,M=m*p,w=new Float32Array(M).fill(1/0),S=new Int32Array(M).fill(-1);h.forEach((Q,B)=>{const Z=Math.floor(Q.x/f)-_,rt=Math.floor(Q.z/f)-x;if(Z<0||Z>=m||rt<0||rt>=p)return;const st=Z*p+rt;Q.y<w[st]&&(w[st]=Q.y,S[st]=B)});const A=7,R=new Float32Array(M).fill(-1/0),g=new Float32Array(M).fill(-1/0);for(let Q=0;Q<m;Q++)for(let B=0;B<p;B++){let Z=-1/0;for(let rt=-A;rt<=A;rt++){const st=B+rt;if(st<0||st>=p)continue;const lt=w[Q*p+st];Number.isFinite(lt)&&lt>Z&&(Z=lt)}R[Q*p+B]=Z}for(let Q=0;Q<m;Q++)for(let B=0;B<p;B++){let Z=-1/0;for(let rt=-A;rt<=A;rt++){const st=Q+rt;if(st<0||st>=m)continue;const lt=R[st*p+B];Number.isFinite(lt)&&lt>Z&&(Z=lt)}g[Q*p+B]=Z}const E=3,L=[],P=t.udderCenter.x;for(let Q=E;Q<m-E;Q++)for(let B=E;B<p-E;B++){const Z=Q*p+B,rt=w[Z];if(!isFinite(rt)||S[Z]<0||rt<o-.13||rt>o+.05)continue;const st=S[Z];if(Math.abs(h[st].x-P)>.135)continue;let lt=!0;for(let Kt=-E;Kt<=E&&lt;Kt++)for(let Tt=-E;Tt<=E;Tt++){if(!Kt&&!Tt)continue;const Vt=w[(Q+Kt)*p+B+Tt];if(isFinite(Vt)&&Vt<rt-1e-6){lt=!1;break}}if(!lt)continue;const It=isFinite(g[Z])?g[Z]-rt:0;It>.008&&L.push({x:h[st].x,y:rt,z:h[st].z,score:It})}L.sort((Q,B)=>B.score-Q.score||Q.x-B.x||Q.z-B.z);const N=[];for(const Q of L)if(N.every(B=>Math.hypot(B.x-Q.x,B.z-Q.z)>.02)&&N.push(Q),N.length>=10)break;const I=[],G=[];for(const Q of N){let B={x:Q.x,y:Q.y,z:Q.z},Z={x:0,y:1,z:0},rt=.011,st=[];for(let mt=0;mt<3;mt++){st=[];const Ct=B;for(const ye of h){const{q:Rn,per:b}=on(ye,Ct,Z);Rn<-.012||Rn>.058||b<rt+.005&&st.push(ye)}if(st.length<14)break;const Jt=Ir(st,oi(st));Jt.y<0&&(Jt.x=-Jt.x,Jt.y=-Jt.y,Jt.z=-Jt.z),Z=Jt;const te=st.map(ye=>on(ye,B,Z).per).sort((ye,Rn)=>ye-Rn);rt=te[te.length>>1]??rt;const ae={x:-Z.x,y:-Z.y,z:-Z.z},Me=st.map(ye=>({p:ye,q:ye.x*ae.x+ye.y*ae.y+ye.z*ae.z})).sort((ye,Rn)=>Rn.q-ye.q),ze=Math.min(5,Math.max(3,st.length/16|0));let _n=0,Os=0,zs=0;for(let ye=0;ye<ze;ye++)_n+=Me[ye].p.x,Os+=Me[ye].p.y,zs+=Me[ye].p.z;B={x:_n/ze,y:Os/ze,z:zs/ze}}if(st.length<16){G.push({reason:"fewPts",r:rt*1e3,len:0,down:Z.y,pts:st.length});continue}let lt=Z;for(let mt=0;mt<2;mt++){const Ct=oi(st),Jt=Ir(st,Ct);Jt.y>.3&&(Z=Jt);const te=st.map(ze=>on(ze,Ct,Z).per).sort((ze,_n)=>ze-_n),ae=te[te.length>>1],Me=st.filter(ze=>on(ze,Ct,Z).per<ae+.004);Me.length>=16&&(st=Me),mt===0&&(lt=Z)}const It=oi(st),Kt=new Map;for(const mt of st){const{q:Ct,per:Jt}=on(mt,It,Z),te=Math.round(Ct/.005);Kt.has(te)||Kt.set(te,[]),Kt.get(te).push(Jt)}const Tt=[];Kt.forEach((mt,Ct)=>{Ct>=1&&Ct<=6&&(mt.sort((Jt,te)=>Jt-te),Tt.push(mt[mt.length>>1]))}),Tt.sort((mt,Ct)=>mt-Ct);const Vt=Tt.length?Tt[Tt.length>>1]:rt;let qt=14,Ft=0;for(let mt=0;mt<=15;mt++){const Ct=Kt.get(mt);if(!Ct||Ct.length<3)continue;if(Ct.sort((te,ae)=>te-ae),Ct[Ct.length>>1]>Vt*1.5){if(Ft++,Ft>=2){qt=mt;break}}else Ft=0}const ue=qt*.005;st.length,st=st.filter(mt=>on(mt,It,Z).q<ue+.004);let _e=1;const we=st.filter(mt=>{const Ct=on(mt,B,Z).q;return Ct>.006&&Ct<Math.max(.02,ue-.006)});if(we.length>=12){const mt=vh(we,Ir(we,oi(we)));mt.y>.4&&(Z=mt)}const pe=Math.acos(Math.min(1,Math.abs(lt.x*Z.x+lt.y*Z.y+lt.z*Z.z)))*180/Math.PI;{const mt=oi(st);let Ct=0,Jt=0;for(const te of st){const{q:ae}=on(te,mt,Z),Me=te.x-mt.x,ze=te.y-mt.y,_n=te.z-mt.z;Ct+=ae*ae,Jt+=Me*Me+ze*ze+_n*_n-ae*ae}_e=Ct/Math.max(1e-9,Jt/2)}const Pe={x:-Z.x,y:-Z.y,z:-Z.z};if(s){const Ct=Z.x*.78,Jt=Z.y*(1-.22)+.22,te=Z.z*(1-.22),ae=Math.hypot(Ct,Jt,te)||1;Z={x:Ct/ae,y:Jt/ae,z:te/ae}}const Bt={x:-Z.x,y:-Z.y,z:-Z.z},Oe=st.map(mt=>({p:mt,q:mt.x*Bt.x+mt.y*Bt.y+mt.z*Bt.z})).sort((mt,Ct)=>Ct.q-mt.q),Ie=Math.min(5,Math.max(3,st.length/16|0));let Ve=0,k=0,We=0;for(let mt=0;mt<Ie;mt++)Ve+=Oe[mt].p.x,k+=Oe[mt].p.y,We+=Oe[mt].p.z;B={x:Ve/Ie+Bt.x*8e-4,y:k/Ie+Bt.y*8e-4,z:We/Ie+Bt.z*8e-4};let le=1/0,ce=-1/0;for(const mt of st){const Ct=on(mt,B,Z).q;Ct<le&&(le=Ct),Ct>ce&&(ce=Ct)}const xt=(ce-le+rt*2)*1e3,de=st.filter(mt=>on(mt,B,Bt).q>-Math.max(.015,Vt*1.5)),pt=Nr(de.length>=10?de:st);let Ut=B,C=Vt*1e3,y=99,W=0;if(pt){C=pt.r*1e3;const mt={x:pt.c.x+Bt.x*pt.r,y:pt.c.y+Bt.y*pt.r,z:pt.c.z+Bt.z*pt.r};y=Math.hypot(mt.x-B.x,mt.y-B.y,mt.z-B.z)*1e3;for(const Ct of de){const Jt=(Ct.x-pt.c.x)/pt.r,te=(Ct.y-pt.c.y)/pt.r,ae=(Ct.z-pt.c.z)/pt.r,Me=Jt*Bt.x+te*Bt.y+ae*Bt.z;Me>W&&(W=Me)}y<2.6&&(Ut=mt)}let at=1/0;for(const mt of st){const Ct=Math.hypot(mt.x-Ut.x,mt.y-Ut.y,mt.z-Ut.z);Ct<at&&(at=Ct)}const it=at*1e3;let ht=0;if(pt){const mt={x:pt.c.x+Pe.x*pt.r,y:pt.c.y+Pe.y*pt.r,z:pt.c.z+Pe.z*pt.r},Ct={x:pt.c.x,y:pt.c.y-pt.r,z:pt.c.z};ht=Math.hypot(mt.x-Ct.x,mt.y-Ct.y,mt.z-Ct.z)*1e3}const _t=Math.acos(Math.min(1,Z.y))*180/Math.PI,j=pt?.r??rt,tt=Math.hypot(Pe.x-Bt.x,Pe.y-Bt.y,Pe.z-Bt.z)*j*1e3,dt=st.map(mt=>on(mt,oi(st),Z).per).sort((mt,Ct)=>mt-Ct),nt=(dt[Math.floor(dt.length*.9)]??rt)/Math.max(rt,1e-6),J=i.eye.x-Ut.x,ft=i.eye.y-Ut.y,ct=i.eye.z-Ut.z,ut=Math.hypot(J,ft,ct)||1,Dt=Bt.x*(J/ut)+Bt.y*(ft/ut)+Bt.z*(ct/ut),Lt=mt=>G.push({reason:mt,r:C,len:xt,down:Z.y,pts:st.length}),ot=s?.9:.6,Nt=s?3.2:2.6,Gt=s?9:14,St=s?1.7:3.2,ne=s?.8:1.6,Ee=s?1.8:2.4,mn=s?1.9:2.1;if(C<4||C>(s?16.5:19)){Lt("radius");continue}if(Z.y<ot){Lt("axis");continue}if(xt<15){Lt("len");continue}const Us=Math.round(900*Math.max(.25,c*l/(320*240)));if(st.length<(s?30:22)||st.length>Us){Lt("pts");continue}if(_e<Nt){Lt("ratio");continue}if(pe>Gt){Lt("axisShift");continue}if(y>St){Lt("cons");continue}if(pt&&pt.rmsMm>ne){Lt("rms");continue}if(s&&!pt){Lt("noSphere");continue}if(it>Ee){Lt("near");continue}if(W<(s?.7:.55)){Lt("cover");continue}if(nt>mn){Lt("width");continue}if(s&&ht>2.8){Lt("downDiff");continue}if(s&&tt>1.7){Lt("blendShift");continue}const es=Math.acos(Math.min(1,Math.max(-1,-Pe.y)))*180/Math.PI;let Fs=0;if(s&&pt&&de.length>=16){const mt=de.filter((ae,Me)=>Me%2===0),Ct=de.filter((ae,Me)=>Me%2===1),Jt=Nr(mt),te=Nr(Ct);if(Jt&&te){const ae={x:Jt.c.x+Bt.x*Jt.r,y:Jt.c.y+Bt.y*Jt.r,z:Jt.c.z+Bt.z*Jt.r},Me={x:te.c.x+Bt.x*te.r,y:te.c.y+Bt.y*te.r,z:te.c.z+Bt.z*te.r};Fs=Math.hypot(ae.x-Me.x,ae.y-Me.y,ae.z-Me.z)*1e3}}if(s&&Fs>1){Lt("split");continue}if(s&&pt&&Math.abs(pt.r-rt)*1e3>2.4){Lt("rFit");continue}if(s&&es>22){Lt("tilt");continue}if(s&&Dt<.3){Lt("grazing");continue}const Si=new Map;for(const mt of st){const Ct=i.partId[mt.px];Si.set(Ct,(Si.get(Ct)??0)+1)}let ns=1,gn=-1;Si.forEach((mt,Ct)=>{mt>gn&&(gn=mt,ns=Ct)});const yi=st.map(mt=>mt.x),is=st.map(mt=>mt.y);st.map(mt=>mt.z),I.push({tip:Ut,centroid:oi(st),axis:Bt,radiusMm:C,lengthMm:xt,pixelCount:st.length,bbox:[Math.min(...yi),Math.min(...is),Math.max(...yi),Math.max(...is)],truePart:ch(ns),fitRmsMm:pt?.rmsMm??-1,consMm:y,diag:{axisRatio:_e,dNearMm:it,cover:W,downDiffMm:ht,tiltDeg:_t},isFalsePositive:!1})}const T=[];for(const Q of[...I].sort((B,Z)=>Z.pixelCount-B.pixelCount))T.some(B=>Math.hypot(B.tip.x-Q.tip.x,B.tip.y-Q.tip.y,B.tip.z-Q.tip.z)<.012)||T.push(Q);I.length=0,I.push(...T);const D=t.gtTips,O=[];I.forEach((Q,B)=>D.forEach((Z,rt)=>O.push({d:Math.hypot(Q.tip.x-Z.x,Q.tip.y-Z.y,Q.tip.z-Z.z),di:B,ti:rt}))),O.sort((Q,B)=>Q.d-B.d);const F=new Set,$=new Set,H=[null,null,null,null];for(const Q of O){if(F.has(Q.di)||$.has(Q.ti)||Q.d>.03)continue;F.add(Q.di),$.add(Q.ti);const B=I[Q.di];B.matchedTeat=Q.ti,B.errorMm=Q.d*1e3,H[Q.ti]=B.errorMm}const q=[];let et=0,gt=0;for(let Q=0;Q<I.length;Q++){const B=I[Q];F.has(Q)||(B.isFalsePositive=!0,q.push(B),B.truePart==="tail"&&gt++,(B.truePart==="legL"||B.truePart==="legR"||B.truePart==="hoof")&&et++)}return{tips:I,groundTruthTips:D,errorsMm:H,matchedCount:$.size,falsePositives:q,legFalseCount:et,tailFalseCount:gt,elapsedMs:performance.now()-r}}function Yl(i,t){const e=i.gtTips[t],n=i.gtBases[t],s={x:e.x-n.x,y:e.y-n.y,z:e.z-n.z},r=Math.hypot(s.x,s.y,s.z)||1;return{x:-s.x/r,y:-s.y/r,z:-s.z/r}}function _s(i,t,e,n){const s=i.gtTips[t],r=Yl(i,t),a={x:-r.x,y:-r.y,z:-r.z},o=fh(e,s,i.prims,!0),c={x:s.x+a.x*.11,y:s.y+a.y*.11,z:s.z+a.z*.11},l={x:s.x+a.x*.012,y:s.y+a.y*.012,z:s.z+a.z*.012};let u=0;const d=10;for(let h=0;h<=d;h++){const f=h/d,_={x:c.x+(l.x-c.x)*f,y:c.y+(l.y-c.y)*f,z:c.z+(l.z-c.z)*f};for(const x of i.prims){if(x.part!=="legL"&&x.part!=="legR"&&x.part!=="tail")continue;let m=1/0;if(x.kind==="capsule"){const w={x:x.b.x-x.a.x,y:x.b.y-x.a.y,z:x.b.z-x.a.z},S=w.x*w.x+w.y*w.y+w.z*w.z||1e-9;let A=((_.x-x.a.x)*w.x+(_.y-x.a.y)*w.y+(_.z-x.a.z)*w.z)/S;A=Math.max(0,Math.min(1,A));const R={x:x.a.x+w.x*A,y:x.a.y+w.y*A,z:x.a.z+w.z*A};m=Lr(_,R)}else x.kind==="sphere"?m=Lr(_,x.c)-x.r:m=Lr(_,x.c);const p=.026,M=x.kind==="capsule"?x.r:.04;if(m<p+M*.55){u++,x.part;break}}}return{teat:t,visible:!o.blocked,sightBlockedBy:o.blocked?o.prim?.part:void 0,pathBlockedSamples:u,clear:u<=1&&!o.blocked}}function Sh(i,t,e){const n=i.gtTips[t],s=e??n,r=Yl(i,t),a={x:-r.x,y:-r.y,z:-r.z},o=t===0||t===2?1:-1,c=[{x:s.x+o*.05,y:s.y-.02,z:s.z-.16},{x:s.x+a.x*.12+o*.02,y:s.y+a.y*.12,z:s.z+a.z*.12-.03},{x:s.x+a.x*.055,y:s.y+a.y*.055,z:s.z+a.z*.055},{x:s.x+a.x*.012,y:s.y+a.y*.012,z:s.z+a.z*.012},{x:s.x-r.x*.012,y:s.y-r.y*.012,z:s.z-r.z*.012}],l=_s(i,t,{x:0,y:.4,z:-.5});return{teat:t,waypoints:c,success:l.clear,blockedSamples:l.pathBlockedSamples,rescans:0}}function yh(i){return gs.find(t=>t.id===i)??gs[2]}function $l(i,t){return{preset:yh(t?.presetId??"pmd-qvga"),pose:t?.pose??{position:{x:0,y:.42,z:-.5},pitchDeg:26,yawDeg:0,rollDeg:0},noise:t?.noise??Xl,seed:i}}function Eh(i,t,e){return{position:{x:(e?.stance.offsetX??0)*.5,y:i,z:-.5},pitchDeg:t,yawDeg:0,rollDeg:0}}function vr(i,t,e,n){const s=e??On(i),r=_h(s,t),a=n?.strict??!t.noise.enabled,o=Mh(r,s,void 0,{strict:a}),c=da([r.depth,r.ir]);return r.hash=c,{model:s,frame:r,reco:o,config:t,hash:c}}function bh(i,t,e){const n=Eh(e.heightM,e.pitchDeg,i),s=$l(e.seed+Hn(i.id)%1e5,{presetId:e.presetId??"sweep-fast",pose:n,noise:e.noise??Xl}),{frame:r,reco:a}=vr(i,s,t,{strict:!1});let o=0,c=0,l=0;for(let d=0;d<4;d=d+1){const h=_s(t,d,n.position);h.clear||o++;const f=a.errorsMm[d],_=f!==null&&f<=e.cupTolMm;f!==null&&(c=Math.max(c,f)),_&&h.clear&&l++}let u=0;if(l<4)for(let d=0;d<4;d=d+1){const h=_s(t,d,n.position),f=a.errorsMm[d];if(!((f===null||f>e.cupTolMm)&&h.clear)&&!h.clear){const _={...n.position,x:n.position.x+(d%2===0?.05:-.05)};_s(t,d,_).clear&&u++}}return{success:l===4,matchedCount:a.matchedCount,maxErrorMm:c,legFp:a.legFalseCount,tailFp:a.tailFalseCount,blocked:o,rescans:u}}function Th(i,t){const e=On(i),n=[],s=[];let r=0;const a=(x,m,p,M=1.3)=>{s.push({t:r,type:x,text:m,teat:p}),r+=M};a("info","机械臂从清洗位进入牛后，ToF 相机开机",void 0,1.8);let o=t,c=vr(i,o,e);n.push(c),a("scan",`第 1 次扫描：识别到 ${c.reco.matchedCount}/4 个乳头`,void 0,2.4);const l=[0,.055,-.06];let u=0;for(let x=1;x<=2&&c.reco.matchedCount<4;x++){u++;const m={...o.pose,position:{...o.pose.position,x:o.pose.position.x+l[x]}};o={...o,pose:m,seed:o.seed+x*131},c=vr(i,o,e),n.push(c),a("rescan",`侧移 ${(l[x]*1e3).toFixed(0)}mm 第 ${x} 次重扫：${c.reco.matchedCount}/4`,void 0,2)}const d=o.pose.position,h=[];let f=!0;for(let x=0;x<4;x=x+1){const m=_s(e,x,d),p=c.reco.tips.find(S=>S.matchedTeat===x),M=Sh(e,x,p?.tip);M.blockedSamples=m.pathBlockedSamples,M.success=m.clear&&!!p&&(p.errorMm??99)<=14,M.rescans=u,M.success||(f=!1),h.push(M);const w=["左前","右前","左后","右后"][x];m.sightBlockedBy&&a("blocked",`${w}视线被${m.sightBlockedBy==="tail"?"尾巴":"后腿"}遮挡`,x,1.5),M.success?(a("found",`${w}定位 ${p?.errorMm?.toFixed(1)}mm，套杯`,x,1.6),a("cup-on",`${w}杯沿乳头轴上升`,x,1.6),a("cup-done",`${w}完成`,x,.7)):a("fail",`${w}无法自动套杯，标记人工`,x,1.4)}a(f?"cup-done":"fail",f?"四杯全部套上，开始挤奶":"部分乳头转人工套杯",void 0,1.6);const _=[{t:0,position:{x:.28,y:.75,z:-.95},pitchDeg:0,yawDeg:0},{t:1.8,position:{...o.pose.position,y:o.pose.position.y+.12,z:-.72},pitchDeg:10,yawDeg:0},{t:4.2,position:{...o.pose.position},pitchDeg:o.pose.pitchDeg,yawDeg:o.pose.yawDeg},...h.map((x,m)=>({t:6+m*4,position:x.waypoints[2],pitchDeg:40,yawDeg:0,gripper:x.waypoints[4]})),{t:6+h.length*4+1,position:{x:.28,y:.75,z:-.95},pitchDeg:0,yawDeg:0}];return{success:f,cups:h,events:s,totalRescans:u,armTimeline:_,durationS:6+h.length*4+3,bundles:n}}const Zl={defaultPresetId:"pmd-qvga",defaultNoise:{enabled:!0,depthNoiseScale:1,falloffScale:1,flyingPixels:!0,multipath:!0,wetSaturation:!0,multipathBiasM:.018},defaultSeed:20261126,robotThreshold:.8,watchThreshold:.45,cupToleranceMm:14,trialsPerCow:10,sweepHeights:[.3,.38,.46,.54,.62],sweepPitches:[10,20,30,40,50],sweepWidth:160,sweepHeightPx:120};function wh(i,t){return i>=t.robotThreshold?"robot":i>=t.watchThreshold?"watch":"parlor"}const us={robot:"能进机器人",watch:"要盯着",parlor:"只能去挤奶厅"};function Kl(i,t,e,n){const s=On(i),r=n,a=e?.heightM??.46,o=e?.pitchDeg??30;let c=0,l=0;const u=new Map;let d=null;for(let _=0;_<r;_++){const x=t.defaultSeed+_*7919,m=bh(i,s,{heightM:a+(Hn(i.id+"h"+_)%7-3)*.008,pitchDeg:o+(Hn(i.id+"p"+_)%9-4)*1.2,seed:x,cupTolMm:t.cupToleranceMm});m.success&&c++,m.maxErrorMm>0&&(d=d===null?m.maxErrorMm:Math.min(d,m.maxErrorMm)),l+=m.matchedCount,m.matchedCount<4&&u.set("乳头识别不全",(u.get("乳头识别不全")??0)+1),m.blocked>0&&u.set("后腿/尾巴遮挡套杯路径",(u.get("后腿/尾巴遮挡套杯路径")??0)+1),m.legFp>0&&u.set("后腿误识为乳头",(u.get("后腿误识为乳头")??0)+m.legFp),m.tailFp>0&&u.set("尾巴误识为乳头",(u.get("尾巴误识为乳头")??0)+m.tailFp),i.flags.crossedRearTeats&&u.set("后乳头交叉",(u.get("后乳头交叉")??0)+1),i.flags.veryShortTeats&&u.set("乳头过短",(u.get("乳头过短")??0)+1),i.flags.nearGroundUdder&&u.set("乳房过低",(u.get("乳房过低")??0)+1)}const h=c/r,f=[...u.entries()].sort((_,x)=>x[1]-_[1]).slice(0,4).map(([_])=>_);return{cowId:i.id,earTag:i.earTag,tier:wh(h,t),successRate:h,trials:r,bestTipErrorMm:d,matchedTeats:Math.round(l/r),failureReasons:f,bestHeightM:a,bestPitchDeg:o}}function Ah(i,t){const e=i.heiferBody;let n=610+(e.statureCm-140)*4.2+(e.rumpHeightCm-145)*2.4-(e.bodyDepthCm-85)*3.1-Math.abs(e.rumpAngleScore-5)*7-(e.rumpWidthCm-50)*1.6;n-=70,n=Math.max(300,Math.min(680,n));const s=Math.round(660-n),r={...i,kind:"lactating",parity:1,dim:60,traits:{...i.traits,udderFloorHeightMm:Math.round(n),udderDepthScore:Math.round(Math.min(9,Math.max(1,1+(680-n)/45))),rearTeatSpreadMm:78,teatLengthMm:48}},a=Kl(r,t,{heightM:Math.max(.3,n/1e3-.1),pitchDeg:32},6),o=`体高 ${e.statureCm}cm、体深 ${e.bodyDepthCm}cm、尻角 ${e.rumpAngleScore} 分 → 预测头胎后乳房底高约 ${Math.round(n)}mm（下垂 ${s}mm），仿真成功率 ${(a.successRate*100).toFixed(0)}%`;return{cowId:i.id,earTag:i.earTag,predictedFloorMm:Math.round(n),predictedTier:a.tier,predictedSuccessRate:a.successRate,sagMm:s,rationale:o}}function Rh(i,t){const e=[],n=Math.max(1,i.parity);let s=null;for(let r=0;r<=3;r++){const a=n+r,o=r===0?0:[0,34,46,58][r]+(a-3)*8,c=Math.max(180,i.traits.udderFloorHeightMm-o),l={...i,parity:a,traits:{...i.traits,udderFloorHeightMm:Math.round(c),rearTeatSpreadMm:Math.max(14,i.traits.rearTeatSpreadMm-r*7)},flags:{...i.flags,crossedRearTeats:i.flags.crossedRearTeats||r>=2&&i.traits.rearTeatSpreadMm<40}},u=Kl(l,t,void 0,6),d=u.successRate>=t.robotThreshold;!d&&s===null&&r>0&&(s=a),e.push({parity:a,floorMm:Math.round(c),successRate:u.successRate,tier:u.tier,suitable:d})}return{cowId:i.id,earTag:i.earTag,rows:e,firstUnsuitableParity:s}}function Ur(i){const t={robot:0,watch:0,parlor:0};let e=0;for(const n of i)t[n.tier]++,e+=n.successRate;return{counts:t,avgRate:i.length?e/i.length:0,n:i.length}}const Ch=20261126;function Ph(i){return Math.round(Math.min(9,Math.max(1,1+(680-i)/45)))}function Fo(i){return{rollDeg:i.range(-3.2,3.2),pitchDeg:i.range(-2.2,2.2),legLz:i.range(-.05,.07),legRz:i.range(-.05,.07),legSpread:i.range(.92,1.14),tailSwingDeg:i.range(-28,28),offsetX:i.range(-.035,.035)}}function Jl(i=300,t=Ch){const e=new Ds(t),n=[],s=Math.round(i*.12),r=i-s,o=[...Array.from({length:r},(h,f)=>f)];for(let h=o.length-1;h>0;h--){const f=Math.floor(e.float()*(h+1));[o[h],o[f]]=[o[f],o[h]]}const c=new Set(o.slice(0,Math.round(r*.13))),l=new Set(o.slice(20,20+Math.round(r*.11))),u=new Set(o.slice(45,45+Math.round(r*.13))),d=new Set(o.slice(70,70+Math.round(r*.16)));for(let h=0;h<i;h++){const f=h+1,_=String(81e5+f),x=`cow-${t}-${f}`;if(h>=r){const P={udderDepthScore:5,udderFloorHeightMm:640,frontTeatSpreadMm:110,rearTeatSpreadMm:75,frontRearGapMm:150,teatLengthMm:48,teatDiameterMm:25,rearUdderHeightMm:860,rearUdderWidthMm:150,frontPlacementScore:5,rearPlacementScore:5};n.push({id:x,earTag:_,kind:"heifer",parity:0,dim:0,hoursSinceMilking:0,barn:`后备舍 ${e.int(1,4)}`,traits:P,heiferBody:{rumpHeightCm:e.range(138,152),statureCm:e.range(132,146),rumpWidthCm:e.range(46,56),bodyDepthCm:e.range(78,92),rumpAngleScore:e.int(3,7),footAngleScore:e.int(4,7)},flags:{},stance:Fo(e),createdAt:Date.now()-f*864e5});continue}const m=h,p=e.float(),M=p<.3?1:p<.57?2:p<.75?3:p<.88?4:e.int(5,7),w=e.chance(.08)?e.int(310,380):e.int(8,300);let S=e.range(560,665)-(M-1)*e.range(28,52)+e.range(-18,18);u.has(m)&&(S=e.range(235,335)),S=Math.round(S);const A=c.has(m),R=l.has(m),g=Math.round(A?e.range(8,30):e.range(52,112)-(M-1)*3),E=Math.round(R?e.range(17,30):e.range(42,63)-M*.8),L={udderDepthScore:Ph(S),udderFloorHeightMm:S,frontTeatSpreadMm:Math.round(e.range(92,150)),rearTeatSpreadMm:g,frontRearGapMm:Math.round(e.range(118,188)),teatLengthMm:E,teatDiameterMm:Math.round(e.range(21,30)),rearUdderHeightMm:Math.round(e.range(730,950)-(M-1)*12),rearUdderWidthMm:Math.round(e.range(128,192)),frontPlacementScore:e.int(3,7),rearPlacementScore:A?e.int(8,9):e.int(3,7)};n.push({id:x,earTag:_,kind:"lactating",parity:M,dim:w,hoursSinceMilking:Math.round(e.range(.5,11.5)*2)/2,barn:`机器人舍 ${e.int(1,2)} 组`,traits:L,flags:{crossedRearTeats:A,veryShortTeats:R,nearGroundUdder:u.has(m),wetness:d.has(m)?e.range(.45,1):e.chance(.1)?e.range(.1,.3):0},stance:Fo(e),createdAt:Date.now()-f*864e5})}return n}function Dh(){return{id:`cow-custom-${Date.now()}`,earTag:"",kind:"lactating",parity:1,dim:120,hoursSinceMilking:6,barn:"机器人舍 1 组",traits:{udderDepthScore:5,udderFloorHeightMm:560,frontTeatSpreadMm:120,rearTeatSpreadMm:80,frontRearGapMm:150,teatLengthMm:50,teatDiameterMm:25,rearUdderHeightMm:850,rearUdderWidthMm:160,frontPlacementScore:5,rearPlacementScore:5},flags:{},stance:{rollDeg:0,pitchDeg:0,legLz:0,legRz:0,legSpread:1,tailSwingDeg:8,offsetX:0},createdAt:Date.now()}}const Lh="robot-teat-lab",Ih=1,jn="cows",bs="results",Mr="kv";let Hs=null;function so(){return Hs||(Hs=new Promise((i,t)=>{const e=indexedDB.open(Lh,Ih);e.onupgradeneeded=()=>{const n=e.result;if(!n.objectStoreNames.contains(jn)){const s=n.createObjectStore(jn,{keyPath:"id"});s.createIndex("earTag","earTag",{unique:!0}),s.createIndex("kind","kind",{unique:!1})}n.objectStoreNames.contains(bs)||n.createObjectStore(bs,{keyPath:"cowId"}),n.objectStoreNames.contains(Mr)||n.createObjectStore(Mr)},e.onsuccess=()=>i(e.result),e.onerror=()=>t(e.error)}),Hs)}function Mi(i,t,e){return so().then(n=>new Promise((s,r)=>{const a=n.transaction(i,t),o=e(a.objectStore(i));o.onsuccess=()=>s(o.result),o.onerror=()=>r(o.error)}))}async function Nh(){try{return await Mi(jn,"readonly",i=>i.getAll())}catch{return[]}}async function Uh(i){await Mi(jn,"readwrite",t=>t.put(i))}async function ro(i){const t=await so();await new Promise((e,n)=>{const s=t.transaction(jn,"readwrite"),r=s.objectStore(jn);for(const a of i)r.put(a);s.oncomplete=()=>e(),s.onerror=()=>n(s.error)})}async function Fh(i){await Mi(jn,"readwrite",t=>t.delete(i))}async function Oh(){await Mi(jn,"readwrite",i=>i.clear())}async function zh(){return Mi(bs,"readonly",i=>i.getAll())}async function Bh(i){const t=await so();await new Promise((e,n)=>{const s=t.transaction(bs,"readwrite"),r=s.objectStore(bs);for(const a of i)r.put(a);s.oncomplete=()=>e(),s.onerror=()=>n(s.error)})}async function kh(){const i=await Mi(Mr,"readonly",t=>t.get("settings"));return{...Zl,...i??{}}}async function Hh(i){await Mi(Mr,"readwrite",t=>t.put(i,"settings"))}async function Gh(){const i=await Nh();if(i.length>0)return i;const t=Jl(300);return await ro(t),t}async function Vh(i=300){await Oh();const t=Jl(i);return await ro(t),t}const bt={cows:[],settings:Zl,results:[],selectedEarTag:null,ready:!1},Wh=new Set;function Ji(){Wh.forEach(i=>i())}async function Xh(){bt.settings=await kh(),bt.cows=await Gh(),bt.results=await zh(),bt.ready=!0;const i=sessionStorage.getItem("selectedEarTag");bt.selectedEarTag=i??"8100090",Ji()}function bn(i){bt.selectedEarTag=i,i&&sessionStorage.setItem("selectedEarTag",i),Ji()}function ao(){return bt.cows.find(i=>i.earTag===bt.selectedEarTag)??bt.cows.find(i=>i.kind==="lactating")??bt.cows[0]}async function qh(i){await Uh(i);const t=bt.cows.findIndex(e=>e.id===i.id);t>=0?bt.cows[t]=i:bt.cows.unshift(i),Ji()}async function Yh(i){await Fh(i),bt.cows=bt.cows.filter(t=>t.id!==i),Ji()}async function $h(i){bt.settings={...bt.settings,...i},await Hh(bt.settings),Ji()}async function Zh(i){bt.results=i,await Bh(i),Ji()}function pa(i){return bt.results.find(t=>t.cowId===i)}let ss="",rs="all",Ei="earTag",bi=1;function Kh(i){if(i.kind==="heifer")return v("span",{class:"tag heifer"},"后备牛");const t=pa(i.id);return t?v("span",{class:`tag ${t.tier}`},us[t.tier]):v("span",{class:"tag muted"},"未评测")}function Oo(i,t){const e=structuredClone(i),n=(r,a,o,c=1,l="")=>v("label",{class:"field"},v("span",null,o),v("input",{type:"number",step:c,value:String(r[a]),oninput:u=>r[a]=Number(u.target.value)}),l?v("small",{class:"faint"},l):null),s=v("div",{class:"modal-mask",onclick:r=>{r.target===s&&t()}},v("div",{class:"modal"},v("h2",null,i.earTag?`编辑牛 ${i.earTag}`:"新建牛只"),v("div",{class:"form-grid"},v("label",{class:"field"},v("span",null,"耳号"),v("input",{type:"text",value:e.earTag,oninput:r=>e.earTag=r.target.value.trim()})),v("label",{class:"field"},v("span",null,"牛别"),v("select",{onchange:r=>e.kind=r.target.value},v("option",{value:"lactating",selected:e.kind==="lactating"},"泌乳牛"),v("option",{value:"heifer",selected:e.kind==="heifer"},"后备牛"),v("option",{value:"dry",selected:e.kind==="dry"},"干奶牛"))),n(e,"parity","胎次",1),n(e,"dim","泌乳天数 DIM",1,"天"),n(e,"hoursSinceMilking","距上次挤奶",.5,"小时"),v("label",{class:"field"},v("span",null,"栋舍"),v("input",{type:"text",value:e.barn??"",oninput:r=>e.barn=r.target.value})),n(e.traits,"udderFloorHeightMm","乳房底离地高度",1,"mm（越低越危险）"),n(e.traits,"udderDepthScore","乳房深度线性分",1,"1-9"),n(e.traits,"frontTeatSpreadMm","前乳头间距",1,"mm"),n(e.traits,"rearTeatSpreadMm","后乳头间距",1,"mm"),n(e.traits,"frontRearGapMm","前后排间距",1,"mm"),n(e.traits,"teatLengthMm","乳头长度",1,"mm"),n(e.traits,"teatDiameterMm","乳头直径",1,"mm"),n(e.traits,"rearUdderHeightMm","后乳房附着高度",1,"mm"),n(e.traits,"rearUdderWidthMm","后乳房宽度",1,"mm"),n(e.stance,"rollDeg","站姿侧倾",.1,"度"),n(e.stance,"tailSwingDeg","尾巴摆角",1,"度"),v("label",{class:"check"},v("input",{type:"checkbox",checked:!!e.flags.crossedRearTeats,onchange:r=>e.flags.crossedRearTeats=r.target.checked}),"后乳头交叉"),v("label",{class:"check"},v("input",{type:"checkbox",checked:!!e.flags.veryShortTeats,onchange:r=>e.flags.veryShortTeats=r.target.checked}),"乳头特别短"),v("label",{class:"check"},v("input",{type:"checkbox",checked:!!e.flags.nearGroundUdder,onchange:r=>e.flags.nearGroundUdder=r.target.checked}),"乳房快拖地"),v("label",{class:"field"},v("span",null,`沾水程度 ${Math.round((e.flags.wetness??0)*100)}%`),v("input",{type:"range",min:"0",max:"1",step:"0.05",value:String(e.flags.wetness??0),oninput:r=>e.flags.wetness=Number(r.target.value)}))),v("div",{class:"btn-row mt16",style:"justify-content:flex-end"},v("button",{class:"btn",onclick:t},"取消"),v("button",{class:"btn primary",onclick:async()=>{if(!e.earTag)return Ke("请填写耳号","err");e.id||(e.id=`cow-custom-${Date.now()}`),await qh(e),Ke("已保存","ok"),t(),ds()}},"保存"))));return s}let xs=null;function ds(){if(xs){const i=Ql();xs.replaceWith(i),xs=i}}function Ql(){const i=v("div",null);xs=i;const t=bt.cows.filter(h=>h.kind==="lactating").length,e=bt.cows.filter(h=>h.kind==="heifer").length,n=bt.cows.filter(h=>h.flags.crossedRearTeats||h.flags.veryShortTeats||h.flags.nearGroundUdder).length,s=v("div",{class:"page-head"},v("div",null,v("h1",null,"牛群档案"),v("p",null,`按耳号建档，记录胎次、泌乳天数、线性评定与站姿；共 ${bt.cows.length} 头（泌乳 ${t} · 后备 ${e} · 缺陷标记 ${n}）`)),v("div",{class:"btn-row"},v("button",{class:"btn",onclick:()=>{const h=Oo(Dh(),()=>h.remove());document.body.appendChild(h)}},"＋ 新建牛只"))),r=v("input",{type:"text",placeholder:"搜索耳号 / 栋舍…",value:ss,style:"max-width:240px",oninput:h=>{ss=h.target.value,ds(),setTimeout(a,0)}});function a(){const h=xs?.querySelector("input[type=text]");h&&(h.focus(),h.setSelectionRange(h.value.length,h.value.length))}const o=v("div",{class:"pill-group"},...[["all","全部"],["lactating","泌乳"],["heifer","后备"],["defect","缺陷"]].map(([h,f])=>v("button",{class:rs===h?"on":"",onclick:()=>{rs=h,ds()}},f))),c=v("div",{class:"card mb12 spread"},v("div",{class:"btn-row"},r,o),v("div",{class:"muted small"},"点击行进入相机仿真"));let l=bt.cows.filter(h=>ss&&!h.earTag.includes(ss)&&!(h.barn??"").includes(ss)?!1:rs==="lactating"?h.kind==="lactating":rs==="heifer"?h.kind==="heifer":rs==="defect"?h.flags.crossedRearTeats||h.flags.veryShortTeats||h.flags.nearGroundUdder:!0);l=[...l].sort((h,f)=>{let _,x;return Ei==="tier"?(_=pa(h.id)?.successRate??-1,x=pa(f.id)?.successRate??-1):(_=h[Ei],x=f[Ei]),typeof _=="string"?bi*_.localeCompare(x):bi*((_??0)-(x??0))});const u=(h,f)=>v("th",{onclick:()=>{Ei===h?bi=bi*-1:(Ei=h,bi=1),ds()}},f+(Ei===h?bi===1?" ▲":" ▼":"")),d=v("div",{class:"table-wrap"},v("table",null,v("thead",null,v("tr",null,u("earTag","耳号"),u("kind","类别"),u("parity","胎次"),u("dim","DIM"),u("udderFloorHeightMm","乳房底高"),u("teatLengthMm","乳头长"),u("rearTeatSpreadMm","后乳头距"),u("tier","筛牛档位"),v("th",null,"操作"))),v("tbody",null,...l.slice(0,400).map(h=>v("tr",{onclick:()=>{bn(h.earTag),location.hash="#/camera"}},v("td",null,v("b",null,h.earTag)),v("td",null,h.kind==="lactating"?"泌乳":h.kind==="heifer"?"后备":"干奶"),v("td",null,String(h.parity)),v("td",null,String(h.dim)),v("td",{class:h.traits.udderFloorHeightMm<340?"err-bad":""},`${h.traits.udderFloorHeightMm}`),v("td",{class:h.traits.teatLengthMm<32?"err-bad":""},`${h.traits.teatLengthMm}`),v("td",{class:h.flags.crossedRearTeats?"err-bad":""},`${Math.round(h.traits.rearTeatSpreadMm)}${h.flags.crossedRearTeats?" ⤫":""}`),v("td",null,Kh(h)),v("td",{onclick:f=>f.stopPropagation()},v("div",{class:"btn-row"},v("button",{class:"btn sm",onclick:()=>{bn(h.earTag),location.hash="#/camera"}},"相机"),v("button",{class:"btn sm",onclick:()=>{bn(h.earTag),location.hash="#/replay"}},"回放"),v("button",{class:"btn sm",onclick:()=>{const f=Oo(h,()=>f.remove());document.body.appendChild(f)}},"编辑"),v("button",{class:"btn sm red",onclick:async()=>{confirm(`删除牛 ${h.earTag}？`)&&(await Yh(h.id),ds(),Ke("已删除"))}},"删"))))))));return l.length||d.appendChild(v("div",{class:"muted",style:"padding:20px"},"没有匹配的牛只")),i.append(s,c,d),i}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oo="187",Vi={ROTATE:0,DOLLY:1,PAN:2},Hi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Jh=0,zo=1,Qh=2,ur=1,jl=2,fs=3,gi=0,Qe=1,dn=2,Wi=0,vs=1,Bo=2,ko=3,Ho=4,jh=5,Oi=100,tu=101,eu=102,nu=103,iu=104,su=200,ru=201,au=202,ou=203,tc=204,ec=205,lu=206,cu=207,hu=208,uu=209,du=210,fu=211,pu=212,mu=213,gu=214,ma=0,ga=1,_a=2,Ts=3,xa=4,va=5,Ma=6,Sa=7,nc=0,_u=1,xu=2,Bn=0,ic=1,sc=2,rc=3,ac=4,oc=5,lc=6,cc=7,hc=300,qi=301,ws=302,Fr=303,Or=304,ya=1e3,zn=1001,Ea=1002,Ue=1003,vu=1004,Gs=1005,Je=1006,zr=1007,Kn=1008,en=1009,uc=1010,dc=1011,As=1012,lo=1013,wn=1014,Sn=1015,An=1016,co=1017,ho=1018,Yi=1020,fc=35902,pc=35899,mc=1021,gc=1022,yn=1023,ti=1026,Jn=1027,_c=1028,uo=1029,_i=1030,fo=1031,po=1033,dr=33776,fr=33777,pr=33778,mr=33779,ba=35840,Ta=35841,wa=35842,Aa=35843,Ra=36196,Ca=37492,Pa=37496,Da=37488,La=37489,Sr=37490,Ia=37491,Na=37808,Ua=37809,Fa=37810,Oa=37811,za=37812,Ba=37813,ka=37814,Ha=37815,Ga=37816,Va=37817,Wa=37818,Xa=37819,qa=37820,Ya=37821,$a=36492,Za=36494,Ka=36495,Ja=36283,Qa=36284,yr=36285,ja=36286,Mu=3200,to=0,Su=1,Zn="",sn="srgb",Er="srgb-linear",br="linear",oe="srgb",Br=7680,yu=519,Eu=512,bu=513,Tu=514,xc=515,wu=516,Au=517,vc=518,Mc=519,Ru=35044,Go="300 es",pn=2e3,Rs=2001;function Cu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Tr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pu(){const i=Tr("canvas");return i.style.display="block",i}const Vo={};function Wo(...i){const t="THREE."+i.shift();console.log(t,...i)}function Sc(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ot(...i){i=Sc(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function se(...i){i=Sc(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function gr(...i){const t=i.join(" ");t in Vo||(Vo[t]=!0,Ot(...i))}function Du(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Lu={[ma]:ma,[_a]:Ma,[xa]:xa,[Ts]:va,[ga]:ga,[Ma]:_a,[Sa]:Sa,[va]:Ts};class si{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const He=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Xo=1234567;const Ms=Math.PI/180,Cs=180/Math.PI;function Qi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(He[i&255]+He[i>>8&255]+He[i>>16&255]+He[i>>24&255]+"-"+He[t&255]+He[t>>8&255]+"-"+He[t>>16&15|64]+He[t>>24&255]+"-"+He[e&63|128]+He[e>>8&255]+"-"+He[e>>16&255]+He[e>>24&255]+He[n&255]+He[n>>8&255]+He[n>>16&255]+He[n>>24&255]).toLowerCase()}function Xt(i,t,e){return Math.max(t,Math.min(e,i))}function mo(i,t){return(i%t+t)%t}function Iu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Nu(i,t,e){return i!==t?(e-i)/(t-i):0}function Ss(i,t,e){return(1-e)*i+e*t}function Uu(i,t,e,n){return Ss(i,t,1-Math.exp(-e*n))}function Fu(i,t=1){return t-Math.abs(mo(i,t*2)-t)}function Ou(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function zu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Bu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ku(i,t){return i+Math.random()*(t-i)}function Hu(i){return i*(.5-Math.random())}function Gu(i){i!==void 0&&(Xo=i);let t=Xo+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Vu(i){return i*Ms}function Wu(i){return i*Cs}function Xu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function qu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function yc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Yu(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),u=a((t+n)/2),d=r((t-n)/2),h=a((t-n)/2),f=r((n-t)/2),_=a((n-t)/2);switch(s){case"XYX":i.set(o*u,c*d,c*h,o*l);break;case"YZY":i.set(c*h,o*u,c*d,o*l);break;case"ZXZ":i.set(c*d,c*h,o*u,o*l);break;case"XZX":i.set(o*u,c*_,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*_,o*l);break;case"ZYZ":i.set(c*_,c*f,o*u,o*l);break;default:Ot("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function go(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Ec(i,t){if(t.constructor===Float32Array)return i;const e=go(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function bc(i,t){if(t.constructor===Float32Array)return i;const e=go(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const _r={DEG2RAD:Ms,RAD2DEG:Cs,generateUUID:Qi,clamp:Xt,euclideanModulo:mo,mapLinear:Iu,inverseLerp:Nu,lerp:Ss,damp:Uu,pingpong:Fu,smoothstep:Ou,smootherstep:zu,randInt:Bu,randFloat:ku,randFloatSpread:Hu,seededRandom:Gu,degToRad:Vu,radToDeg:Wu,isPowerOfTwo:Xu,ceilPowerOfTwo:qu,floorPowerOfTwo:yc,setQuaternionFromProperEuler:Yu,normalize:bc,denormalize:Ec},Po=class Po{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Po.prototype.isVector2=!0;let zt=Po;class ei{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],h=r[a+0],f=r[a+1],_=r[a+2],x=r[a+3];if(d!==x||c!==h||l!==f||u!==_){let m=c*h+l*f+u*_+d*x;m<0&&(h=-h,f=-f,_=-_,x=-x,m=-m);let p=1-o;if(m<.9995){const M=Math.acos(m),w=Math.sin(M);p=Math.sin(p*M)/w,o=Math.sin(o*M)/w,c=c*p+h*o,l=l*p+f*o,u=u*p+_*o,d=d*p+x*o}else{c=c*p+h*o,l=l*p+f*o,u=u*p+_*o,d=d*p+x*o;const M=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=M,l*=M,u*=M,d*=M}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[a],h=r[a+1],f=r[a+2],_=r[a+3];return t[e]=o*_+u*d+c*f-l*h,t[e+1]=c*_+u*h+l*d-o*f,t[e+2]=l*_+u*f+o*h-c*d,t[e+3]=u*_-o*d-c*h-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),d=o(r/2),h=c(n/2),f=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=h*u*d+l*f*_,this._y=l*f*d-h*u*_,this._z=l*u*_+h*f*d,this._w=l*u*d-h*f*_;break;case"YXZ":this._x=h*u*d+l*f*_,this._y=l*f*d-h*u*_,this._z=l*u*_-h*f*d,this._w=l*u*d+h*f*_;break;case"ZXY":this._x=h*u*d-l*f*_,this._y=l*f*d+h*u*_,this._z=l*u*_+h*f*d,this._w=l*u*d-h*f*_;break;case"ZYX":this._x=h*u*d-l*f*_,this._y=l*f*d+h*u*_,this._z=l*u*_-h*f*d,this._w=l*u*d+h*f*_;break;case"YZX":this._x=h*u*d+l*f*_,this._y=l*f*d+h*u*_,this._z=l*u*_-h*f*d,this._w=l*u*d-h*f*_;break;case"XZY":this._x=h*u*d-l*f*_,this._y=l*f*d-h*u*_,this._z=l*u*_+h*f*d,this._w=l*u*d+h*f*_;break;default:Ot("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],d=e[10],h=n+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Do=class Do{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+c*l+a*d-o*u,this.y=n+c*u+o*l-r*d,this.z=s+c*d+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return kr.copy(this).projectOnVector(t),this.sub(kr)}reflect(t){return this.sub(kr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Do.prototype.isVector3=!0;let V=Do;const kr=new V,qo=new ei,Lo=class Lo{constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],f=n[5],_=n[8],x=s[0],m=s[3],p=s[6],M=s[1],w=s[4],S=s[7],A=s[2],R=s[5],g=s[8];return r[0]=a*x+o*M+c*A,r[3]=a*m+o*w+c*R,r[6]=a*p+o*S+c*g,r[1]=l*x+u*M+d*A,r[4]=l*m+u*w+d*R,r[7]=l*p+u*S+d*g,r[2]=h*x+f*M+_*A,r[5]=h*m+f*w+_*R,r[8]=h*p+f*S+_*g,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],d=u*a-o*l,h=o*c-u*r,f=l*r-a*c,_=e*d+n*h+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return t[0]=d*x,t[1]=(s*l-u*n)*x,t[2]=(o*n-s*a)*x,t[3]=h*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return gr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Hr.makeScale(t,e)),this}rotate(t){return gr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Hr.makeRotation(-t)),this}translate(t,e){return gr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Hr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Lo.prototype.isMatrix3=!0;let kt=Lo;const Hr=new kt,Yo=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$o=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $u(){const i={enabled:!0,workingColorSpace:Er,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===oe&&(s.r=kn(s.r),s.g=kn(s.g),s.b=kn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===oe&&(s.r=Xi(s.r),s.g=Xi(s.g),s.b=Xi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Zn?br:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Er]:{primaries:t,whitePoint:n,transfer:br,toXYZ:Yo,fromXYZ:$o,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:sn},outputColorSpaceConfig:{drawingBufferColorSpace:sn}},[sn]:{primaries:t,whitePoint:n,transfer:oe,toXYZ:Yo,fromXYZ:$o,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:sn}}}),i}const jt=$u();function kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ti;class Zu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ti===void 0&&(Ti=Tr("canvas")),Ti.width=t.width,Ti.height=t.height;const s=Ti.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ti}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Tr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=kn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(kn(e[n]/255)*255):e[n]=kn(e[n]);return{data:e,width:t.width,height:t.height}}else return Ot("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ku=0;class _o{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=Qi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Gr(s[a].image)):r.push(Gr(s[a]))}else r=Gr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Gr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Zu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ot("Texture: Unable to serialize Texture."),{})}let Ju=0;const Vr=new V;class $e extends si{constructor(t=$e.DEFAULT_IMAGE,e=$e.DEFAULT_MAPPING,n=zn,s=zn,r=Je,a=Kn,o=yn,c=en,l=$e.DEFAULT_ANISOTROPY,u=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=Qi(),this.name="",this.source=new _o(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Vr).x}get height(){return this.source.getSize(Vr).y}get depth(){return this.source.getSize(Vr).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ot(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ot(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ya:t.x=t.x-Math.floor(t.x);break;case zn:t.x=t.x<0?0:1;break;case Ea:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ya:t.y=t.y-Math.floor(t.y);break;case zn:t.y=t.y<0?0:1;break;case Ea:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}$e.DEFAULT_IMAGE=null;$e.DEFAULT_MAPPING=hc;$e.DEFAULT_ANISOTROPY=1;const Io=class Io{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],_=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(_+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(l+1)/2,S=(f+1)/2,A=(p+1)/2,R=(u+h)/4,g=(d+x)/4,E=(_+m)/4;return w>S&&w>A?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=R/n,r=g/n):S>A?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=R/s,r=E/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=g/r,s=E/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-_)*(m-_)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(m-_)/M,this.y=(d-x)/M,this.z=(h-u)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Io.prototype.isVector4=!0;let ve=Io;class Qu extends si{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ve(0,0,t,e),this.scissorTest=!1,this.viewport=new ve(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new $e({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Je,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new _o(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Tn extends Qu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Tc extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ju extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Ar=class Ar{constructor(t,e,n,s,r,a,o,c,l,u,d,h,f,_,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,d,h,f,_,x,m)}set(t,e,n,s,r,a,o,c,l,u,d,h,f,_,x,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=_,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ar().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/wi.setFromMatrixColumn(t,0).length(),r=1/wi.setFromMatrixColumn(t,1).length(),a=1/wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const h=a*u,f=a*d,_=o*u,x=o*d;e[0]=c*u,e[4]=-c*d,e[8]=l,e[1]=f+_*l,e[5]=h-x*l,e[9]=-o*c,e[2]=x-h*l,e[6]=_+f*l,e[10]=a*c}else if(t.order==="YXZ"){const h=c*u,f=c*d,_=l*u,x=l*d;e[0]=h+x*o,e[4]=_*o-f,e[8]=a*l,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=f*o-_,e[6]=x+h*o,e[10]=a*c}else if(t.order==="ZXY"){const h=c*u,f=c*d,_=l*u,x=l*d;e[0]=h-x*o,e[4]=-a*d,e[8]=_+f*o,e[1]=f+_*o,e[5]=a*u,e[9]=x-h*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const h=a*u,f=a*d,_=o*u,x=o*d;e[0]=c*u,e[4]=_*l-f,e[8]=h*l+x,e[1]=c*d,e[5]=x*l+h,e[9]=f*l-_,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const h=a*c,f=a*l,_=o*c,x=o*l;e[0]=c*u,e[4]=x-h*d,e[8]=_*d+f,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=f*d+_,e[10]=h-x*d}else if(t.order==="XZY"){const h=a*c,f=a*l,_=o*c,x=o*l;e[0]=c*u,e[4]=-d,e[8]=l*u,e[1]=h*d+x,e[5]=a*u,e[9]=f*d-_,e[2]=_*d-f,e[6]=o*u,e[10]=x*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(td,t,ed)}lookAt(t,e,n){const s=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),Wn.crossVectors(n,je),Wn.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),Wn.crossVectors(n,je)),Wn.normalize(),Vs.crossVectors(je,Wn),s[0]=Wn.x,s[4]=Vs.x,s[8]=je.x,s[1]=Wn.y,s[5]=Vs.y,s[9]=je.y,s[2]=Wn.z,s[6]=Vs.z,s[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],f=n[13],_=n[2],x=n[6],m=n[10],p=n[14],M=n[3],w=n[7],S=n[11],A=n[15],R=s[0],g=s[4],E=s[8],L=s[12],P=s[1],N=s[5],I=s[9],G=s[13],T=s[2],D=s[6],O=s[10],F=s[14],$=s[3],H=s[7],q=s[11],et=s[15];return r[0]=a*R+o*P+c*T+l*$,r[4]=a*g+o*N+c*D+l*H,r[8]=a*E+o*I+c*O+l*q,r[12]=a*L+o*G+c*F+l*et,r[1]=u*R+d*P+h*T+f*$,r[5]=u*g+d*N+h*D+f*H,r[9]=u*E+d*I+h*O+f*q,r[13]=u*L+d*G+h*F+f*et,r[2]=_*R+x*P+m*T+p*$,r[6]=_*g+x*N+m*D+p*H,r[10]=_*E+x*I+m*O+p*q,r[14]=_*L+x*G+m*F+p*et,r[3]=M*R+w*P+S*T+A*$,r[7]=M*g+w*N+S*D+A*H,r[11]=M*E+w*I+S*O+A*q,r[15]=M*L+w*G+S*F+A*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],d=t[6],h=t[10],f=t[14],_=t[3],x=t[7],m=t[11],p=t[15],M=c*f-l*h,w=o*f-l*d,S=o*h-c*d,A=a*f-l*u,R=a*h-c*u,g=a*d-o*u;return e*(x*M-m*w+p*S)-n*(_*M-m*A+p*R)+s*(_*w-x*A+p*g)-r*(_*S-x*R+m*g)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],u=t[10];return e*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],d=t[9],h=t[10],f=t[11],_=t[12],x=t[13],m=t[14],p=t[15],M=e*o-n*a,w=e*c-s*a,S=e*l-r*a,A=n*c-s*o,R=n*l-r*o,g=s*l-r*c,E=u*x-d*_,L=u*m-h*_,P=u*p-f*_,N=d*m-h*x,I=d*p-f*x,G=h*p-f*m,T=M*G-w*I+S*N+A*P-R*L+g*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/T;return t[0]=(o*G-c*I+l*N)*D,t[1]=(s*I-n*G-r*N)*D,t[2]=(x*g-m*R+p*A)*D,t[3]=(h*R-d*g-f*A)*D,t[4]=(c*P-a*G-l*L)*D,t[5]=(e*G-s*P+r*L)*D,t[6]=(m*S-_*g-p*w)*D,t[7]=(u*g-h*S+f*w)*D,t[8]=(a*I-o*P+l*E)*D,t[9]=(n*P-e*I-r*E)*D,t[10]=(_*R-x*S+p*M)*D,t[11]=(d*S-u*R-f*M)*D,t[12]=(o*L-a*N-c*E)*D,t[13]=(e*N-n*L+s*E)*D,t[14]=(x*w-_*A-m*M)*D,t[15]=(u*A-d*w+h*M)*D,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,d=o+o,h=r*l,f=r*u,_=r*d,x=a*u,m=a*d,p=o*d,M=c*l,w=c*u,S=c*d,A=n.x,R=n.y,g=n.z;return s[0]=(1-(x+p))*A,s[1]=(f+S)*A,s[2]=(_-w)*A,s[3]=0,s[4]=(f-S)*R,s[5]=(1-(h+p))*R,s[6]=(m+M)*R,s[7]=0,s[8]=(_+w)*g,s[9]=(m-M)*g,s[10]=(1-(h+x))*g,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=wi.set(s[0],s[1],s[2]).length();const o=wi.set(s[4],s[5],s[6]).length(),c=wi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),ln.copy(this);const l=1/a,u=1/o,d=1/c;return ln.elements[0]*=l,ln.elements[1]*=l,ln.elements[2]*=l,ln.elements[4]*=u,ln.elements[5]*=u,ln.elements[6]*=u,ln.elements[8]*=d,ln.elements[9]*=d,ln.elements[10]*=d,e.setFromRotationMatrix(ln),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=pn,c=!1){const l=this.elements,u=2*r/(e-t),d=2*r/(n-s),h=(e+t)/(e-t),f=(n+s)/(n-s);let _,x;if(c)_=r/(a-r),x=a*r/(a-r);else if(o===pn)_=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Rs)_=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=pn,c=!1){const l=this.elements,u=2/(e-t),d=2/(n-s),h=-(e+t)/(e-t),f=-(n+s)/(n-s);let _,x;if(c)_=1/(a-r),x=a/(a-r);else if(o===pn)_=-2/(a-r),x=-(a+r)/(a-r);else if(o===Rs)_=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Ar.prototype.isMatrix4=!0;let me=Ar;const wi=new V,ln=new me,td=new V(0,0,0),ed=new V(1,1,1),Wn=new V,Vs=new V,je=new V,Zo=new me,Ko=new ei;class ni{constructor(t=0,e=0,n=0,s=ni.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Xt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ot("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Zo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Zo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ko.setFromEuler(this),this.setFromQuaternion(Ko,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ni.DEFAULT_ORDER="XYZ";class wc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let nd=0;const Jo=new V,Ai=new ei,Pn=new me,Ws=new V,as=new V,id=new V,sd=new ei,Qo=new V(1,0,0),jo=new V(0,1,0),tl=new V(0,0,1),el={type:"added"},rd={type:"removed"},Ri={type:"childadded",child:null},Wr={type:"childremoved",child:null};class Fe extends si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=Qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Fe.DEFAULT_UP.clone();const t=new V,e=new ni,n=new ei,s=new V(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new kt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=Fe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ai.setFromAxisAngle(t,e),this.quaternion.multiply(Ai),this}rotateOnWorldAxis(t,e){return Ai.setFromAxisAngle(t,e),this.quaternion.premultiply(Ai),this}rotateX(t){return this.rotateOnAxis(Qo,t)}rotateY(t){return this.rotateOnAxis(jo,t)}rotateZ(t){return this.rotateOnAxis(tl,t)}translateOnAxis(t,e){return Jo.copy(t).applyQuaternion(this.quaternion),this.position.add(Jo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Qo,t)}translateY(t){return this.translateOnAxis(jo,t)}translateZ(t){return this.translateOnAxis(tl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ws.copy(t):Ws.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),as.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(as,Ws,this.up):Pn.lookAt(Ws,as,this.up),this.quaternion.setFromRotationMatrix(Pn),s&&(Pn.extractRotation(s.matrixWorld),Ai.setFromRotationMatrix(Pn),this.quaternion.premultiply(Ai.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(se("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(el),Ri.child=t,this.dispatchEvent(Ri),Ri.child=null):se("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(rd),Wr.child=t,this.dispatchEvent(Wr),Wr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(el),Ri.child=t,this.dispatchEvent(Ri),Ri.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,t,id),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,sd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),d=a(t.shapes),h=a(t.skeletons),f=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Fe.DEFAULT_UP=new V(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Qn extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ad={type:"move"};class Xr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,_=.005;l.inputState.pinching&&h>f+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=f-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ad)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Qn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Ac={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xn={h:0,s:0,l:0},Xs={h:0,s:0,l:0};function qr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=jt.workingColorSpace){if(t=mo(t,1),e=Xt(e,0,1),n=Xt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=qr(a,r,t+1/3),this.g=qr(a,r,t),this.b=qr(a,r,t-1/3)}return jt.colorSpaceToWorking(this,s),this}setStyle(t,e=sn){function n(r){r!==void 0&&parseFloat(r)<1&&Ot("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ot("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ot("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=sn){const n=Ac[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ot("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=Xi(t.r),this.g=Xi(t.g),this.b=Xi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=sn){return jt.workingToColorSpace(Ge.copy(this),t),Math.round(Xt(Ge.r*255,0,255))*65536+Math.round(Xt(Ge.g*255,0,255))*256+Math.round(Xt(Ge.b*255,0,255))}getHexString(t=sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(Ge.copy(this),e);const n=Ge.r,s=Ge.g,r=Ge.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=sn){jt.workingToColorSpace(Ge.copy(this),t);const e=Ge.r,n=Ge.g,s=Ge.b;return t!==sn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Xn),this.setHSL(Xn.h+t,Xn.s+e,Xn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Xn),t.getHSL(Xs);const n=Ss(Xn.h,Xs.h,e),s=Ss(Xn.s,Xs.s,e),r=Ss(Xn.l,Xs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ge=new Zt;Zt.NAMES=Ac;class xo{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Zt(t),this.near=e,this.far=n}clone(){return new xo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class od extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const cn=new V,Dn=new V,Yr=new V,Ln=new V,Ci=new V,Pi=new V,nl=new V,$r=new V,Zr=new V,Kr=new V,Jr=new ve,Qr=new ve,jr=new ve;class fn{constructor(t=new V,e=new V,n=new V){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),cn.subVectors(t,e),s.cross(cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){cn.subVectors(s,e),Dn.subVectors(n,e),Yr.subVectors(t,e);const a=cn.dot(cn),o=cn.dot(Dn),c=cn.dot(Yr),l=Dn.dot(Dn),u=Dn.dot(Yr),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const h=1/d,f=(l*c-o*u)*h,_=(a*u-o*c)*h;return r.set(1-f-_,_,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ln.x),c.addScaledVector(a,Ln.y),c.addScaledVector(o,Ln.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Jr.setScalar(0),Qr.setScalar(0),jr.setScalar(0),Jr.fromBufferAttribute(t,e),Qr.fromBufferAttribute(t,n),jr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Jr,r.x),a.addScaledVector(Qr,r.y),a.addScaledVector(jr,r.z),a}static isFrontFacing(t,e,n,s){return cn.subVectors(n,e),Dn.subVectors(t,e),cn.cross(Dn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),cn.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return fn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return fn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return fn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return fn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return fn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Ci.subVectors(s,n),Pi.subVectors(r,n),$r.subVectors(t,n);const c=Ci.dot($r),l=Pi.dot($r);if(c<=0&&l<=0)return e.copy(n);Zr.subVectors(t,s);const u=Ci.dot(Zr),d=Pi.dot(Zr);if(u>=0&&d<=u)return e.copy(s);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0&&c-u>0)return a=c/(c-u),e.copy(n).addScaledVector(Ci,a);Kr.subVectors(t,r);const f=Ci.dot(Kr),_=Pi.dot(Kr);if(_>=0&&f<=_)return e.copy(r);const x=f*l-c*_;if(x<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(n).addScaledVector(Pi,o);const m=u*_-f*d;if(m<=0&&d-u>=0&&f-_>=0)return nl.subVectors(r,s),o=(d-u)/(d-u+(f-_)),e.copy(s).addScaledVector(nl,o);const p=1/(m+x+h);return a=x*p,o=h*p,e.copy(n).addScaledVector(Ci,a).addScaledVector(Pi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ls{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,hn):hn.fromBufferAttribute(r,a),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),qs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qs.copy(n.boundingBox)),qs.applyMatrix4(t.matrixWorld),this.union(qs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(os),Ys.subVectors(this.max,os),Di.subVectors(t.a,os),Li.subVectors(t.b,os),Ii.subVectors(t.c,os),qn.subVectors(Li,Di),Yn.subVectors(Ii,Li),li.subVectors(Di,Ii);let e=[0,-qn.z,qn.y,0,-Yn.z,Yn.y,0,-li.z,li.y,qn.z,0,-qn.x,Yn.z,0,-Yn.x,li.z,0,-li.x,-qn.y,qn.x,0,-Yn.y,Yn.x,0,-li.y,li.x,0];return!ta(e,Di,Li,Ii,Ys)||(e=[1,0,0,0,1,0,0,0,1],!ta(e,Di,Li,Ii,Ys))?!1:($s.crossVectors(qn,Yn),e=[$s.x,$s.y,$s.z],ta(e,Di,Li,Ii,Ys))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const In=[new V,new V,new V,new V,new V,new V,new V,new V],hn=new V,qs=new Ls,Di=new V,Li=new V,Ii=new V,qn=new V,Yn=new V,li=new V,os=new V,Ys=new V,$s=new V,ci=new V;function ta(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ci.fromArray(i,r);const o=s.x*Math.abs(ci.x)+s.y*Math.abs(ci.y)+s.z*Math.abs(ci.z),c=t.dot(ci),l=e.dot(ci),u=n.dot(ci);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Te=new V,Zs=new zt;let ld=0;class mi extends si{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ld++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ru,this.updateRanges=[],this.gpuType=Sn,this.version=0,this._normalizationScale=t!==void 0?go(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Zs.fromBufferAttribute(this,e),Zs.applyMatrix3(t),this.setXY(e,Zs.x,Zs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Ec(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):bc(t,this.array)}}class Rc extends mi{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Cc extends mi{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ge extends mi{constructor(t,e,n){super(new Float32Array(t),e,n)}}const cd=new Ls,ls=new V,ea=new V;class vo{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):cd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ls.subVectors(t,this.center);const e=ls.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ls,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ea.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ls.copy(t.center).add(ea)),this.expandByPoint(ls.copy(t.center).sub(ea))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let hd=0;const nn=new me,na=new Fe,Ni=new V,tn=new Ls,cs=new Ls,Le=new V;class rn extends si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=Qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Cu(t)?Cc:Rc)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,n){return nn.makeTranslation(t,e,n),this.applyMatrix4(nn),this}scale(t,e,n){return nn.makeScale(t,e,n),this.applyMatrix4(nn),this}lookAt(t){return na.lookAt(t),na.updateMatrix(),this.applyMatrix4(na.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ge(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ot("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ls);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&se('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];cs.setFromBufferAttribute(o),this.morphTargetsRelative?(Le.addVectors(tn.min,cs.min),tn.expandByPoint(Le),Le.addVectors(tn.max,cs.max),tn.expandByPoint(Le)):(tn.expandByPoint(cs.min),tn.expandByPoint(cs.max))}tn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Le.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Le));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Le.fromBufferAttribute(o,l),c&&(Ni.fromBufferAttribute(t,l),Le.add(Ni)),s=Math.max(s,n.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&se('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){se("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new mi(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[],l=new Uint8Array(n.count);for(let L=0;L<n.count;L++)o[L]=new V,c[L]=new V;const u=new V,d=new V,h=new V,f=new zt,_=new zt,x=new zt,m=new V,p=new V;function M(L,P,N){l[L]=l[P]=l[N]=1,u.fromBufferAttribute(n,L),d.fromBufferAttribute(n,P),h.fromBufferAttribute(n,N),f.fromBufferAttribute(r,L),_.fromBufferAttribute(r,P),x.fromBufferAttribute(r,N),d.sub(u),h.sub(u),_.sub(f),x.sub(f);const I=1/(_.x*x.y-x.x*_.y);isFinite(I)&&(m.copy(d).multiplyScalar(x.y).addScaledVector(h,-_.y).multiplyScalar(I),p.copy(h).multiplyScalar(_.x).addScaledVector(d,-x.x).multiplyScalar(I),o[L].add(m),o[P].add(m),o[N].add(m),c[L].add(p),c[P].add(p),c[N].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let L=0,P=w.length;L<P;++L){const N=w[L],I=N.start,G=N.count;for(let T=I,D=I+G;T<D;T+=3)M(t.getX(T+0),t.getX(T+1),t.getX(T+2))}const S=new V,A=new V,R=new V,g=new V;function E(L){R.fromBufferAttribute(s,L),g.copy(R);const P=o[L];S.copy(P),S.sub(R.multiplyScalar(R.dot(P))).normalize(),A.crossVectors(g,P);const I=A.dot(c[L])<0?-1:1;a.setXYZW(L,S.x,S.y,S.z,I)}for(let L=0,P=n.count;L<P;++L)l[L]&&E(L);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new mi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const s=new V,r=new V,a=new V,o=new V,c=new V,l=new V,u=new V,d=new V;if(t)for(let h=0,f=t.count;h<f;h+=3){const _=t.getX(h+0),x=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let f=0,_=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*u;for(let p=0;p<u;p++)h[_++]=l[f++]}return new mi(h,u,d)}if(this.index===null)return Ot("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new rn,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],f=t(h,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const f=l[d];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],d=r[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ia=new V,ud=new V,dd=new kt;class Un{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ia.subVectors(n,e).cross(ud.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(ia),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||dd.getNormalMatrix(t),s=this.coplanarPoint(ia).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let fd=0;class Is extends si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Qi(),this.name="",this.type="Material",this.blending=vs,this.side=gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tc,this.blendDst=ec,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=Ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Br,this.stencilZFail=Br,this.stencilZPass=Br,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ot(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ot(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Zt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Un().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new zt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new zt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Nn=new V,sa=new V,Ks=new V,Js=new V;class Pc{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Nn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Nn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Nn.copy(this.origin).addScaledVector(this.direction,e),Nn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){sa.copy(t).add(e).multiplyScalar(.5),Ks.copy(e).sub(t).normalize(),Js.copy(this.origin).sub(sa);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ks),o=Js.dot(this.direction),c=-Js.dot(Ks),l=Js.lengthSq(),u=Math.abs(1-a*a);let d,h,f,_;if(u>0)if(d=a*c-o,h=a*o-c,_=r*u,d>=0)if(h>=-_)if(h<=_){const x=1/u;d*=x,h*=x,f=d*(d+a*h+2*o)+h*(a*d+h+2*c)+l}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;else h<=-_?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l):h<=_?(d=0,h=Math.min(Math.max(-r,-c),r),f=h*(h+2*c)+l):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(sa).addScaledVector(Ks,h),f}intersectSphere(t,e){if(t.radius<0)return null;Nn.subVectors(t.center,this.origin);const n=Nn.dot(this.direction),s=Nn.dot(Nn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-h.z)*d,c=(t.max.z-h.z)*d):(o=(t.max.z-h.z)*d,c=(t.min.z-h.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Nn)!==null}intersectTriangle(t,e,n,s,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,d=t.x-a.x,h=t.y-a.y,f=t.z-a.z,_=e.x-a.x,x=e.y-a.y,m=e.z-a.z,p=n.x-a.x,M=n.y-a.y,w=n.z-a.z,S=Math.abs(c),A=Math.abs(l),R=Math.abs(u);let g,E,L,P,N,I,G,T,D,O,F,$;if(S>=A&&S>=R?(L=c,I=d,D=_,$=p,c>=0?(g=l,E=u,P=h,N=f,G=x,T=m,O=M,F=w):(g=u,E=l,P=f,N=h,G=m,T=x,O=w,F=M)):A>=R?(L=l,I=h,D=x,$=M,l>=0?(g=u,E=c,P=f,N=d,G=m,T=_,O=w,F=p):(g=c,E=u,P=d,N=f,G=_,T=m,O=p,F=w)):(L=u,I=f,D=m,$=w,u>=0?(g=c,E=l,P=d,N=h,G=_,T=x,O=p,F=M):(g=l,E=c,P=h,N=d,G=x,T=_,O=M,F=p)),L===0)return null;const H=g/L,q=E/L,et=1/L,gt=P-H*I,Q=N-q*I,B=G-H*D,Z=T-q*D,rt=O-H*$,st=F-q*$,lt=rt*Z-st*B,It=gt*st-Q*rt,Kt=B*Q-Z*gt;if(s){if(lt<0||It<0||Kt<0)return null}else if((lt<0||It<0||Kt<0)&&(lt>0||It>0||Kt>0))return null;const Tt=lt+It+Kt;if(Tt===0)return null;const Vt=et*(lt*I+It*D+Kt*$);return(Tt>0?Vt<0:Vt>0)?null:this.at(Vt/Tt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Mo extends Is{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=nc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const il=new me,hi=new Pc,Qs=new vo,sl=new V,js=new V,tr=new V,er=new V,ra=new V,nr=new V,rl=new V,ir=new V;class Se extends Fe{constructor(t=new rn,e=new Mo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){nr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],d=r[c];u!==0&&(ra.fromBufferAttribute(d,t),a?nr.addScaledVector(ra,u):nr.addScaledVector(ra.sub(e),u))}e.add(nr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qs.copy(n.boundingSphere),Qs.applyMatrix4(r),hi.copy(t.ray).recast(t.near),!(Qs.containsPoint(hi.origin)===!1&&(hi.intersectSphere(Qs,sl)===null||hi.origin.distanceToSquared(sl)>(t.far-t.near)**2))&&(il.copy(r).invert(),hi.copy(t.ray).applyMatrix4(il),!(n.boundingBox!==null&&hi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,hi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,x=h.length;_<x;_++){const m=h[_],p=a[m.materialIndex],M=Math.max(m.start,f.start),w=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=M,A=w;S<A;S+=3){const R=o.getX(S),g=o.getX(S+1),E=o.getX(S+2);s=sr(this,p,t,n,l,u,d,R,g,E),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=_,p=x;m<p;m+=3){const M=o.getX(m),w=o.getX(m+1),S=o.getX(m+2);s=sr(this,a,t,n,l,u,d,M,w,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,x=h.length;_<x;_++){const m=h[_],p=a[m.materialIndex],M=Math.max(m.start,f.start),w=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let S=M,A=w;S<A;S+=3){const R=S,g=S+1,E=S+2;s=sr(this,p,t,n,l,u,d,R,g,E),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=_,p=x;m<p;m+=3){const M=m,w=m+1,S=m+2;s=sr(this,a,t,n,l,u,d,M,w,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function pd(i,t,e,n,s,r,a,o){let c;if(t.side===Qe?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===gi,o),c===null)return null;ir.copy(o),ir.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ir);return l<e.near||l>e.far?null:{distance:l,point:ir.clone(),object:i}}function sr(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,js),i.getVertexPosition(c,tr),i.getVertexPosition(l,er);const u=pd(i,t,e,n,js,tr,er,rl);if(u){const d=new V;fn.getBarycoord(rl,js,tr,er,d),s&&(u.uv=fn.getInterpolatedAttribute(s,o,c,l,d,new zt)),r&&(u.uv1=fn.getInterpolatedAttribute(r,o,c,l,d,new zt)),a&&(u.normal=fn.getInterpolatedAttribute(a,o,c,l,d,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new V,materialIndex:0};fn.getNormal(js,tr,er,h.normal),u.face=h,u.barycoord=d}return u}class md extends $e{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Ue,u=Ue,d,h){super(null,a,o,c,l,u,s,r,d,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ui=new vo,gd=new zt(.5,.5),rr=new V;class Ps{constructor(t=new Un,e=new Un,n=new Un,s=new Un,r=new Un,a=new Un){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=pn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],d=r[5],h=r[6],f=r[7],_=r[8],x=r[9],m=r[10],p=r[11],M=r[12],w=r[13],S=r[14],A=r[15];if(s[0].setComponents(l-a,f-u,p-_,A-M).normalize(),s[1].setComponents(l+a,f+u,p+_,A+M).normalize(),s[2].setComponents(l+o,f+d,p+x,A+w).normalize(),s[3].setComponents(l-o,f-d,p-x,A-w).normalize(),n)s[4].setComponents(c,h,m,S).normalize(),s[5].setComponents(l-c,f-h,p-m,A-S).normalize();else if(s[4].setComponents(l-c,f-h,p-m,A-S).normalize(),e===pn)s[5].setComponents(l+c,f+h,p+m,A+S).normalize();else if(e===Rs)s[5].setComponents(c,h,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(t){ui.center.set(0,0,0);const e=gd.distanceTo(t.center);return ui.radius=.7071067811865476+e,ui.applyMatrix4(t.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(rr.x=s.normal.x>0?t.max.x:t.min.x,rr.y=s.normal.y>0?t.max.y:t.min.y,rr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(rr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const al=new me;class So{constructor(){this.coordinateSystem=pn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];al.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Ps),n[s].setFromProjectionMatrix(al,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new Ps),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new So().copy(this)}}class Dc extends $e{constructor(t=[],e=qi,n,s,r,a,o,c,l,u){super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class $i extends $e{constructor(t,e,n=wn,s,r,a,o=Ue,c=Ue,l,u=ti,d=1){if(u!==ti&&u!==Jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:d};super(h,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new _o(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Lc extends $i{constructor(t,e=wn,n=qi,s,r,a=Ue,o=Ue,c,l=ti){const u={width:t,height:t,depth:1},d=[u,u,u,u,u,u];super(t,t,e,n,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Ic extends $e{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ji extends rn{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],d=[];let h=0,f=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ge(l,3)),this.setAttribute("normal",new ge(u,3)),this.setAttribute("uv",new ge(d,2));function _(x,m,p,M,w,S,A,R,g,E,L){const P=S/g,N=A/E,I=S/2,G=A/2,T=R/2,D=g+1,O=E+1;let F=0,$=0;const H=new V;for(let q=0;q<O;q++){const et=q*N-G;for(let gt=0;gt<D;gt++){const Q=gt*P-I;H[x]=Q*M,H[m]=et*w,H[p]=T,l.push(H.x,H.y,H.z),H[x]=0,H[m]=0,H[p]=R>0?1:-1,u.push(H.x,H.y,H.z),d.push(gt/g),d.push(1-q/E),F+=1}}for(let q=0;q<E;q++)for(let et=0;et<g;et++){const gt=h+et+D*q,Q=h+et+D*(q+1),B=h+(et+1)+D*(q+1),Z=h+(et+1)+D*q;c.push(gt,Q,Z),c.push(Q,B,Z),$+=6}o.addGroup(f,$,L),f+=$,h+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ji(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class yo extends rn{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],c=[],l=[],u=e/2,d=Math.PI/2*t,h=e,f=2*d+h,_=n*2+r,x=s+1,m=new V,p=new V;for(let M=0;M<=_;M++){let w=0,S=0,A=0,R=0;if(M<=n){const L=M/n,P=L*Math.PI/2;S=-u-t*Math.cos(P),A=t*Math.sin(P),R=-t*Math.cos(P),w=L*d}else if(M<=n+r){const L=(M-n)/r;S=-u+L*e,A=t,R=0,w=d+L*h}else{const L=(M-n-r)/n,P=L*Math.PI/2;S=u+t*Math.sin(P),A=t*Math.cos(P),R=t*Math.sin(P),w=d+h+L*d}const g=Math.max(0,Math.min(1,w/f));let E=0;M===0?E=.5/s:M===_&&(E=-.5/s);for(let L=0;L<=s;L++){const P=L/s,N=P*Math.PI*2,I=Math.sin(N),G=Math.cos(N);p.x=-A*G,p.y=S,p.z=A*I,o.push(p.x,p.y,p.z),m.set(-A*G,R,A*I),m.normalize(),c.push(m.x,m.y,m.z),l.push(P+E,g)}if(M>0){const L=(M-1)*x;for(let P=0;P<s;P++){const N=L+P,I=L+P+1,G=M*x+P,T=M*x+P+1;a.push(N,I,G),a.push(I,T,G)}}}this.setIndex(a),this.setAttribute("position",new ge(o,3)),this.setAttribute("normal",new ge(c,3)),this.setAttribute("uv",new ge(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yo(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Eo extends rn{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new V,u=new zt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,h=3;d<=e;d++,h+=3){const f=n+d/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[h]/t+1)/2,u.y=(a[h+1]/t+1)/2,c.push(u.x,u.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ge(a,3)),this.setAttribute("normal",new ge(o,3)),this.setAttribute("uv",new ge(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Eo(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class xi extends rn{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],h=[],f=[];let _=0;const x=[],m=n/2;let p=0;M(),a===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new ge(d,3)),this.setAttribute("normal",new ge(h,3)),this.setAttribute("uv",new ge(f,2));function M(){const S=new V,A=new V;let R=0;const g=(e-t)/n;for(let E=0;E<=r;E++){const L=[],P=E/r,N=P*(e-t)+t;for(let I=0;I<=s;I++){const G=I/s,T=G*c+o,D=Math.sin(T),O=Math.cos(T);A.x=N*D,A.y=-P*n+m,A.z=N*O,d.push(A.x,A.y,A.z),S.set(D,g,O).normalize(),h.push(S.x,S.y,S.z),f.push(G,1-P),L.push(_++)}x.push(L)}for(let E=0;E<s;E++)for(let L=0;L<r;L++){const P=x[L][E],N=x[L+1][E],I=x[L+1][E+1],G=x[L][E+1];(t>0||L!==0)&&(u.push(P,N,G),R+=3),(e>0||L!==r-1)&&(u.push(N,I,G),R+=3)}l.addGroup(p,R,0),p+=R}function w(S){const A=_,R=new zt,g=new V;let E=0;const L=S===!0?t:e,P=S===!0?1:-1;for(let I=1;I<=s;I++)d.push(0,m*P,0),h.push(0,P,0),f.push(.5,.5),_++;const N=_;for(let I=0;I<=s;I++){const T=I/s*c+o,D=Math.cos(T),O=Math.sin(T);g.x=L*O,g.y=m*P,g.z=L*D,d.push(g.x,g.y,g.z),h.push(0,P,0),R.x=D*.5+.5,R.y=O*.5*P+.5,f.push(R.x,R.y),_++}for(let I=0;I<s;I++){const G=A+I,T=N+I;S===!0?u.push(T,T+1,G):u.push(T+1,T,G),E+=3}l.addGroup(p,E,S===!0?1:2),p+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class bo extends xi{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new bo(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Rr extends rn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,d=t/o,h=e/c,f=[],_=[],x=[],m=[];for(let p=0;p<u;p++){const M=p*h-a;for(let w=0;w<l;w++){const S=w*d-r;_.push(S,-M,0),x.push(0,0,1),m.push(w/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<o;M++){const w=M+l*p,S=M+l*(p+1),A=M+1+l*(p+1),R=M+1+l*p;f.push(w,S,R),f.push(S,A,R)}this.setIndex(f),this.setAttribute("position",new ge(_,3)),this.setAttribute("normal",new ge(x,3)),this.setAttribute("uv",new ge(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rr(t.width,t.height,t.widthSegments,t.heightSegments)}}class Zi extends rn{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],d=new V,h=new V,f=[],_=[],x=[],m=[];for(let p=0;p<=n;p++){const M=[],w=p/n,S=a+w*o,A=t*Math.cos(S),R=Math.sqrt(t*t-A*A);let g=0;p===0&&a===0?g=.5/e:p===n&&c===Math.PI&&(g=-.5/e);for(let E=0;E<=e;E++){const L=E/e,P=s+L*r;d.x=-R*Math.cos(P),d.y=A,d.z=R*Math.sin(P),_.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),m.push(L+g,1-w),M.push(l++)}u.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const w=u[p][M+1],S=u[p][M],A=u[p+1][M],R=u[p+1][M+1];(p!==0||a>0)&&f.push(w,S,R),(p!==n-1||c<Math.PI)&&f.push(S,A,R)}this.setIndex(f),this.setAttribute("position",new ge(_,3)),this.setAttribute("normal",new ge(x,3)),this.setAttribute("uv",new ge(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class To extends rn{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],u=[],d=[],h=new V,f=new V,_=new V;for(let x=0;x<=n;x++){const m=a+x/n*o;for(let p=0;p<=s;p++){const M=p/s*r;f.x=(t+e*Math.cos(m))*Math.cos(M),f.y=(t+e*Math.cos(m))*Math.sin(M),f.z=e*Math.sin(m),l.push(f.x,f.y,f.z),h.x=t*Math.cos(M),h.y=t*Math.sin(M),_.subVectors(f,h).normalize(),u.push(_.x,_.y,_.z),d.push(p/s),d.push(x/n)}}for(let x=1;x<=n;x++)for(let m=1;m<=s;m++){const p=(s+1)*x+m-1,M=(s+1)*(x-1)+m-1,w=(s+1)*(x-1)+m,S=(s+1)*x+m;c.push(p,M,S),c.push(M,w,S)}this.setIndex(c),this.setAttribute("position",new ge(l,3)),this.setAttribute("normal",new ge(u,3)),this.setAttribute("uv",new ge(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new To(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}function Ki(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(ol(s))s.isRenderTargetTexture?(Ot("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(ol(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function qe(i){const t={};for(let e=0;e<i.length;e++){const n=Ki(i[e]);for(const s in n)t[s]=n[s]}return t}function ol(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function _d(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Nc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const xd={clone:Ki,merge:qe};var vd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Md=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vi extends Is{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vd,this.fragmentShader=Md,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ki(t.uniforms),this.uniformsGroups=_d(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Zt().setHex(s.value);break;case"v2":this.uniforms[n].value=new zt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new V().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ve().fromArray(s.value);break;case"m3":this.uniforms[n].value=new kt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new me().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Sd extends vi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ii extends Is{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=to,this.normalScale=new zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class yd extends Is{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ed extends Is{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Uc extends Fe{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class bd extends Uc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const aa=new me,ll=new V,cl=new V;class Td{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new zt(512,512),this.mapType=en,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ps,this._frameExtents=new zt(1,1),this._viewportCount=1,this._viewports=[new ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;ll.setFromMatrixPosition(t.matrixWorld),e.position.copy(ll),cl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(cl),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){aa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(aa,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Rs||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(aa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ar=new V,or=new ei,xn=new V;class Fc extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ar,or,xn),xn.x===1&&xn.y===1&&xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ar,or,xn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ar,or,xn),xn.x===1&&xn.y===1&&xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ar,or,xn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const $n=new V,hl=new zt,ul=new zt;class un extends Fc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Cs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ms*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Cs*2*Math.atan(Math.tan(Ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,hl,ul),e.subVectors(ul,hl)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ms*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Oc extends Fc{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class wd extends Td{constructor(){super(new Oc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dl extends Uc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new wd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const Ui=-90,Fi=1;class eo extends Fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new un(Ui,Fi,t,e);s.layers=this.layers,this.add(s);const r=new un(Ui,Fi,t,e);r.layers=this.layers,this.add(r);const a=new un(Ui,Fi,t,e);a.layers=this.layers,this.add(a);const o=new un(Ui,Fi,t,e);o.layers=this.layers,this.add(o);const c=new un(Ui,Fi,t,e);c.layers=this.layers,this.add(c);const l=new un(Ui,Fi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Rs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=x,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(d,h,f),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Ad extends un{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}class Rd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ot("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class fl{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Xt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Xt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Cd extends si{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function pl(i,t,e,n){const s=Pd(n);switch(e){case mc:return i*t;case _c:return i*t/s.components*s.byteLength;case uo:return i*t/s.components*s.byteLength;case _i:return i*t*2/s.components*s.byteLength;case fo:return i*t*2/s.components*s.byteLength;case gc:return i*t*3/s.components*s.byteLength;case yn:return i*t*4/s.components*s.byteLength;case po:return i*t*4/s.components*s.byteLength;case dr:case fr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case pr:case mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ta:case Aa:return Math.max(i,16)*Math.max(t,8)/4;case ba:case wa:return Math.max(i,8)*Math.max(t,8)/2;case Ra:case Ca:case Da:case La:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Pa:case Sr:case Ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Na:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Fa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Oa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case za:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ba:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ka:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ha:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Va:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case qa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ya:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case $a:case Za:case Ka:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ja:case Qa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case yr:case ja:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Pd(i){switch(i){case en:case uc:return{byteLength:1,components:1};case As:case dc:case An:return{byteLength:2,components:1};case co:case ho:return{byteLength:2,components:4};case wn:case lo:case Sn:return{byteLength:4,components:1};case fc:case pc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oo}}));typeof window<"u"&&(window.__THREE__?Ot("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function zc(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Dd(i){const t=new WeakMap;function e(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((f,_)=>f.start-_.start);let h=0;for(let f=1;f<d.length;f++){const _=d[h],x=d[f];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++h,d[h]=x)}d.length=h+1;for(let f=0,_=d.length;f<_;f++){const x=d[f];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Ld=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Id=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Nd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ud=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Od=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Bd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Hd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Xd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Qd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,tf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,ef=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,nf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,sf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,af=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,of=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lf="gl_FragColor = linearToOutputTexel( gl_FragColor );",cf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,uf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,df=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ff=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,mf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_f=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Mf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ef=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,bf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Tf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Af=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Rf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Pf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Df=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Lf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,If=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Nf=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Uf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ff=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Of=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Gf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qf=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$f=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Zf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Jf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ep=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,np=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ip=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ap=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,op=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,lp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,up=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,mp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,gp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_p=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Mp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,yp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ep=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,wp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ap=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Dp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Lp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ip=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Up=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Op=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Bp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,kp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Hp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Yp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$p=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Jp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,jp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,em=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,im=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,am=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,om=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,um=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:Ld,alphahash_pars_fragment:Id,alphamap_fragment:Nd,alphamap_pars_fragment:Ud,alphatest_fragment:Fd,alphatest_pars_fragment:Od,aomap_fragment:zd,aomap_pars_fragment:Bd,batching_pars_vertex:kd,batching_vertex:Hd,begin_vertex:Gd,beginnormal_vertex:Vd,bsdfs:Wd,iridescence_fragment:Xd,bumpmap_pars_fragment:qd,clipping_planes_fragment:Yd,clipping_planes_pars_fragment:$d,clipping_planes_pars_vertex:Zd,clipping_planes_vertex:Kd,color_fragment:Jd,color_pars_fragment:Qd,color_pars_vertex:jd,color_vertex:tf,common:ef,defaultnormal_vertex:nf,displacementmap_pars_vertex:sf,displacementmap_vertex:rf,emissivemap_fragment:af,emissivemap_pars_fragment:of,colorspace_fragment:lf,colorspace_pars_fragment:cf,envmap_fragment:hf,envmap_common_pars_fragment:uf,envmap_pars_fragment:df,envmap_pars_vertex:ff,envmap_physical_pars_fragment:bf,envmap_vertex:pf,fog_vertex:mf,fog_pars_vertex:gf,fog_fragment:_f,fog_pars_fragment:xf,gradientmap_pars_fragment:vf,lightmap_pars_fragment:Mf,lights_lambert_fragment:Sf,lights_lambert_pars_fragment:yf,lights_pars_begin:Ef,lights_toon_fragment:Tf,lights_toon_pars_fragment:wf,lights_phong_fragment:Af,lights_phong_pars_fragment:Rf,lights_physical_fragment:Cf,lights_physical_pars_fragment:Pf,lights_fragment_begin:Df,lights_fragment_maps:Lf,lights_fragment_end:If,lightprobes_pars_fragment:Nf,logdepthbuf_fragment:Uf,logdepthbuf_pars_fragment:Ff,logdepthbuf_pars_vertex:Of,logdepthbuf_vertex:zf,map_fragment:Bf,map_pars_fragment:kf,map_particle_fragment:Hf,map_particle_pars_fragment:Gf,metalnessmap_fragment:Vf,metalnessmap_pars_fragment:Wf,morphinstance_vertex:Xf,morphcolor_vertex:qf,morphnormal_vertex:Yf,morphtarget_pars_vertex:$f,morphtarget_vertex:Zf,normal_fragment_begin:Kf,normal_fragment_maps:Jf,normal_pars_fragment:Qf,normal_pars_vertex:jf,normal_vertex:tp,normalmap_pars_fragment:ep,clearcoat_normal_fragment_begin:np,clearcoat_normal_fragment_maps:ip,clearcoat_pars_fragment:sp,iridescence_pars_fragment:rp,opaque_fragment:ap,packing:op,premultiplied_alpha_fragment:lp,project_vertex:cp,dithering_fragment:hp,dithering_pars_fragment:up,roughnessmap_fragment:dp,roughnessmap_pars_fragment:fp,shadowmap_pars_fragment:pp,shadowmap_pars_vertex:mp,shadowmap_vertex:gp,shadowmask_pars_fragment:_p,skinbase_vertex:xp,skinning_pars_vertex:vp,skinning_vertex:Mp,skinnormal_vertex:Sp,specularmap_fragment:yp,specularmap_pars_fragment:Ep,tonemapping_fragment:bp,tonemapping_pars_fragment:Tp,transmission_fragment:wp,transmission_pars_fragment:Ap,uv_pars_fragment:Rp,uv_pars_vertex:Cp,uv_vertex:Pp,worldpos_vertex:Dp,background_vert:Lp,background_frag:Ip,backgroundCube_vert:Np,backgroundCube_frag:Up,cube_vert:Fp,cube_frag:Op,depth_vert:zp,depth_frag:Bp,distance_vert:kp,distance_frag:Hp,equirect_vert:Gp,equirect_frag:Vp,linedashed_vert:Wp,linedashed_frag:Xp,meshbasic_vert:qp,meshbasic_frag:Yp,meshlambert_vert:$p,meshlambert_frag:Zp,meshmatcap_vert:Kp,meshmatcap_frag:Jp,meshnormal_vert:Qp,meshnormal_frag:jp,meshphong_vert:tm,meshphong_frag:em,meshphysical_vert:nm,meshphysical_frag:im,meshtoon_vert:sm,meshtoon_frag:rm,points_vert:am,points_frag:om,shadow_vert:lm,shadow_frag:cm,sprite_vert:hm,sprite_frag:um},yt={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},Mn={basic:{uniforms:qe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:qe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Zt(0)},envMapIntensity:{value:1}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:qe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:qe([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:qe([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:qe([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:qe([yt.points,yt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:qe([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:qe([yt.common,yt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:qe([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:qe([yt.sprite,yt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distance:{uniforms:qe([yt.common,yt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distance_vert,fragmentShader:Wt.distance_frag},shadow:{uniforms:qe([yt.lights,yt.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};Mn.physical={uniforms:qe([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new kt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const lr={r:0,b:0,g:0},dm=new me,Bc=new kt;Bc.set(-1,0,0,0,1,0,0,0,1);function fm(i,t,e,n,s,r){const a=new Zt(0);let o=s===!0?0:1,c,l,u=null,d=0,h=null;function f(M){let w=M.isScene===!0?M.background:null;if(w&&w.isTexture){const S=M.backgroundBlurriness>0;w=t.get(w,S)}return w}function _(M){let w=!1;const S=f(M);S===null?m(a,o):S&&S.isColor&&(m(S,1),w=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(M,w){const S=f(w);S&&S.isCubeTexture?(l===void 0&&(l=new Se(new ji(1,1,1),new vi({name:"BackgroundCubeMaterial",uniforms:Ki(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:Qe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,R,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(dm.makeRotationFromEuler(w.backgroundRotation)).transpose(),S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Bc),l.material.toneMapped=jt.getTransfer(S.colorSpace)!==oe,(u!==S||d!==S.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,h=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Se(new Rr(2,2),new vi({name:"BackgroundMaterial",uniforms:Ki(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:gi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=jt.getTransfer(S.colorSpace)!==oe,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,h=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,w){M.getRGB(lr,Nc(i)),e.buffers.color.setClear(lr.r,lr.g,lr.b,w,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,w=1){a.set(M),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(a,o)},render:_,addToRenderList:x,dispose:p}}function pm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(N,I,G,T,D){let O=!1;const F=d(N,T,G,I);r!==F&&(r=F,l(r.object)),O=f(N,T,G,D),O&&_(N,T,G,D),D!==null&&t.update(D,i.ELEMENT_ARRAY_BUFFER),(O||a)&&(a=!1,S(N,I,G,T),D!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function c(){return i.createVertexArray()}function l(N){return i.bindVertexArray(N)}function u(N){return i.deleteVertexArray(N)}function d(N,I,G,T){const D=T.wireframe===!0;let O=n[I.id];O===void 0&&(O={},n[I.id]=O);const F=N.isInstancedMesh===!0?N.id:0;let $=O[F];$===void 0&&($={},O[F]=$);let H=$[G.id];H===void 0&&(H={},$[G.id]=H);let q=H[D];return q===void 0&&(q=h(c()),H[D]=q),q}function h(N){const I=[],G=[],T=[];for(let D=0;D<e;D++)I[D]=0,G[D]=0,T[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:G,attributeDivisors:T,object:N,attributes:{},index:null}}function f(N,I,G,T){const D=r.attributes,O=I.attributes;let F=0;const $=G.getAttributes();for(const H in $)if($[H].location>=0){const et=D[H];let gt=O[H];if(gt===void 0&&(H==="instanceMatrix"&&N.instanceMatrix&&(gt=N.instanceMatrix),H==="instanceColor"&&N.instanceColor&&(gt=N.instanceColor)),et===void 0||et.attribute!==gt||gt&&et.data!==gt.data)return!0;F++}return r.attributesNum!==F||r.index!==T}function _(N,I,G,T){const D={},O=I.attributes;let F=0;const $=G.getAttributes();for(const H in $)if($[H].location>=0){let et=O[H];et===void 0&&(H==="instanceMatrix"&&N.instanceMatrix&&(et=N.instanceMatrix),H==="instanceColor"&&N.instanceColor&&(et=N.instanceColor));const gt={};gt.attribute=et,et&&et.data&&(gt.data=et.data),D[H]=gt,F++}r.attributes=D,r.attributesNum=F,r.index=T}function x(){const N=r.newAttributes;for(let I=0,G=N.length;I<G;I++)N[I]=0}function m(N){p(N,0)}function p(N,I){const G=r.newAttributes,T=r.enabledAttributes,D=r.attributeDivisors;G[N]=1,T[N]===0&&(i.enableVertexAttribArray(N),T[N]=1),D[N]!==I&&(i.vertexAttribDivisor(N,I),D[N]=I)}function M(){const N=r.newAttributes,I=r.enabledAttributes;for(let G=0,T=I.length;G<T;G++)I[G]!==N[G]&&(i.disableVertexAttribArray(G),I[G]=0)}function w(N,I,G,T,D,O,F){F===!0?i.vertexAttribIPointer(N,I,G,D,O):i.vertexAttribPointer(N,I,G,T,D,O)}function S(N,I,G,T){x();const D=T.attributes,O=G.getAttributes(),F=I.defaultAttributeValues;for(const $ in O){const H=O[$];if(H.location>=0){let q=D[$];if(q===void 0&&($==="instanceMatrix"&&N.instanceMatrix&&(q=N.instanceMatrix),$==="instanceColor"&&N.instanceColor&&(q=N.instanceColor)),q!==void 0){const et=q.normalized,gt=q.itemSize,Q=t.get(q);if(Q===void 0)continue;const B=Q.buffer,Z=Q.type,rt=Q.bytesPerElement,st=Z===i.INT||Z===i.UNSIGNED_INT||q.gpuType===lo;if(q.isInterleavedBufferAttribute){const lt=q.data,It=lt.isInterleavedBuffer===!0?lt.stride:lt.itemSize,Kt=q.offset;if(lt.isInstancedInterleavedBuffer||lt.isInstancedBufferAttribute){for(let Tt=0;Tt<H.locationSize;Tt++)p(H.location+Tt,lt.meshPerAttribute);N.isInstancedMesh!==!0&&T._maxInstanceCount===void 0&&(T._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Tt=0;Tt<H.locationSize;Tt++)m(H.location+Tt);i.bindBuffer(i.ARRAY_BUFFER,B);for(let Tt=0;Tt<H.locationSize;Tt++)w(H.location+Tt,gt/H.locationSize,Z,et,It*rt,(Kt+gt/H.locationSize*Tt)*rt,st)}else{if(q.isInstancedBufferAttribute){for(let lt=0;lt<H.locationSize;lt++)p(H.location+lt,q.meshPerAttribute);N.isInstancedMesh!==!0&&T._maxInstanceCount===void 0&&(T._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let lt=0;lt<H.locationSize;lt++)m(H.location+lt);i.bindBuffer(i.ARRAY_BUFFER,B);for(let lt=0;lt<H.locationSize;lt++)w(H.location+lt,gt/H.locationSize,Z,et,gt*rt,gt/H.locationSize*lt*rt,st)}}else if(F!==void 0){const et=F[$];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(H.location,et);break;case 3:i.vertexAttrib3fv(H.location,et);break;case 4:i.vertexAttrib4fv(H.location,et);break;default:i.vertexAttrib1fv(H.location,et)}}}}M()}function A(){L();for(const N in n){const I=n[N];for(const G in I){const T=I[G];for(const D in T){const O=T[D];for(const F in O)u(O[F].object),delete O[F];delete T[D]}}delete n[N]}}function R(N){if(n[N.id]===void 0)return;const I=n[N.id];for(const G in I){const T=I[G];for(const D in T){const O=T[D];for(const F in O)u(O[F].object),delete O[F];delete T[D]}}delete n[N.id]}function g(N){for(const I in n){const G=n[I];for(const T in G){const D=G[T];if(D[N.id]===void 0)continue;const O=D[N.id];for(const F in O)u(O[F].object),delete O[F];delete D[N.id]}}}function E(N){for(const I in n){const G=n[I],T=N.isInstancedMesh===!0?N.id:0,D=G[T];if(D!==void 0){for(const O in D){const F=D[O];for(const $ in F)u(F[$].object),delete F[$];delete D[O]}delete G[T],Object.keys(G).length===0&&delete n[I]}}}function L(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfObject:E,releaseStatesOfProgram:g,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function mm(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function o(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let f=0;f<u;f++)h+=l[f];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function gm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const g=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(g){return!(g!==yn&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(g){const E=g===An&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(g!==en&&g!==Sn&&!E&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(g){if(g==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Ot("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),h=e.logarithmicDepthBuffer===!0&&d===!1;e.reversedDepthBuffer===!0&&d===!1&&Ot("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&d===!0&&Ot("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),R=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:S,maxSamples:A,samples:R}}function _m(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Un,o=new kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||s;return s=h,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,f){const _=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||_===null||_.length===0||r&&!m)r?u(null):l();else{const M=r?0:n,w=M*4;let S=p.clippingState||null;c.value=S,S=u(_,h,w,f);for(let A=0;A!==w;++A)S[A]=e[A];p.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,h,f,_){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=c.value,_!==!0||m===null){const p=f+x*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,S=f;w!==x;++w,S+=4)a.copy(d[w]).applyMatrix4(M,o),a.normal.toArray(m,S),m[S+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}class wo extends Tn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Dc(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ji(5,5,5),r=new vi({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Qe,blending:Wi});r.uniforms.tEquirect.value=e;const a=new Se(s,r),o=e.minFilter;return e.minFilter===Kn&&(e.minFilter=Je),new eo(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const ml=256,xm=3,vm=20,kc=256,Hc=16,Mm=3,Sm=new V,ym=new Zt;class wr{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new eo(1,10,null),this._boxMesh=new Se(new ji(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=Sm}=r,c=this._renderer;this._setSize(a);const l=this._allocateTarget(),u=this._getSourceTarget(!0);e>0&&(u.texture.mipmapsAutoUpdate=!1);const d=c.autoClear,h=c.autoClearColor,f=c.autoClearDepth,_=c.autoClearStencil,x=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,x===null&&(t.background=c.getClearColor(ym));const m=new eo(n,s,u);return m.position.copy(o),m.update(c,t),c.autoClear=d,c.autoClearColor=h,c.autoClearDepth=f,c.autoClearStencil=_,t.background=x,e>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_l(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(ml,yc(t))}_fromTexture(t,e){t.mapping===qi||t.mapping===ws?this._setSize(t.image.length===0?ml:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=gl(t,!1,!1),n=Math.log2(t)-xm;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=gl(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===qi||t.mapping===ws?(this._cubemapMaterial===null&&(this._cubemapMaterial=xl()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=_l()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Em(),this._integrationMaterial=bm());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Hc);for(let a=0;a<=n;a++){const o=wr.lodToRoughness(a,n);if(a>n-Mm)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{const c=o>0?Math.log2(e)+.5*Math.log2(6/(kc*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Tm());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function gl(i,t,e){return new wo(i,{minFilter:Kn,generateMipmaps:t,type:An,colorSpace:Er,depthBuffer:e})}function Ns(i,t,e){return new vi({name:i,uniforms:t,vertexShader:Wt.cube_vert,fragmentShader:e,side:Qe,blending:Wi,depthTest:!1,depthWrite:!1})}function Em(){return Ns("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${kc}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function bm(){return Ns("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Hc}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Tm(){return Ns("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${vm}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function _l(){return Ns("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function xl(){return Ns("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function wm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,f=!1){return h==null?null:f?a(h):r(h)}function r(h){if(h&&h.isTexture){const f=h.mapping;if(f===Fr||f===Or)if(t.has(h)){const _=t.get(h).texture;return o(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const x=new wo(_.height);return x.fromEquirectangularTexture(i,h),t.set(h,x),h.addEventListener("dispose",l),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture&&h.isPMREMTexture!==!0){const f=h.mapping,_=f===Fr||f===Or,x=f===qi||f===ws;if(_||x){let m=e.get(h);const p=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new wr(i)),m=_?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),m.texture;if(m!==void 0)return m.texture;{const M=h.image;return _&&M&&M.height>0||x&&M&&c(M)?(n===null&&(n=new wr(i)),m=_?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,f){return f===Fr?h.mapping=qi:f===Or&&(h.mapping=ws),h}function c(h){let f=0;const _=6;for(let x=0;x<_;x++)h[x]!==void 0&&f++;return f===_}function l(h){const f=h.target;f.removeEventListener("dispose",l);const _=t.get(f);_!==void 0&&(t.delete(f),_.dispose())}function u(h){const f=h.target;f.removeEventListener("dispose",u);const _=e.get(f);_!==void 0&&(e.delete(f),_.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Am(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&gr("WebGLRenderer: "+n+" extension not supported."),s}}}function Rm(i,t,e,n){const s={},r=new WeakMap,a=new FinalizationRegistry(_=>delete s[_]);function o(_){c(_.target)}function c(_){_.index!==null&&t.remove(_.index);for(const m in _.attributes)t.remove(_.attributes[m]);_.removeEventListener("dispose",o),delete s[_.id],a.unregister(_);const x=r.get(_);x&&(t.remove(x),r.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,e.memory.geometries--}function l(_,x){return s[x.id]!==void 0||(x.addEventListener("dispose",o),s[x.id]=new WeakRef(x),a.register(x,x.id,x),e.memory.geometries++),x}function u(_){const x=_.attributes;for(const m in x)t.update(x[m],i.ARRAY_BUFFER)}function d(_){const x=_.index,m=_.attributes.position;let p=0;if(m===void 0)return;const M=x!==null?x.array.length:m.array.length/3-1,w=m.count>=65535?Cc:Rc,S=new w(Math.ceil(M/3)*6,1),A=S.array;if(x!==null){const g=x.array;p=x.version;for(let E=0,L=0;E<M;E+=3){const P=g[E+0],N=g[E+1],I=g[E+2];A[L++]=P,A[L++]=N,A[L++]=N,A[L++]=I,A[L++]=I,A[L++]=P}}else{p=m.version;for(let g=0,E=0;g<M;g+=3){const L=g+0,P=g+1,N=g+2;A[E++]=L,A[E++]=P,A[E++]=P,A[E++]=N,A[E++]=N,A[E++]=L}}S.version=p;const R=r.get(_);R&&t.remove(R),r.set(_,S)}function h(_){const x=r.get(_);if(x){const m=_.index;m!==null&&x.version<m.version&&d(_)}else d(_);return r.get(_)}function f(){for(const _ in s){const x=s[_].deref();x!==void 0&&c(x)}}return{get:l,update:u,getWireframeAttribute:h,dispose:f}}function Cm(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,h){i.drawElements(n,h,r,d*a),e.update(h,n,1)}function l(d,h,f){f!==0&&(i.drawElementsInstanced(n,h,r,d*a,f),e.update(h,n,f))}function u(d,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,d,0,f);let x=0;for(let m=0;m<f;m++)x+=h[m];e.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Pm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:se("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Dm(i,t,e){const n=new WeakMap,s=new ve;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let L=function(){g.dispose(),n.delete(o),o.removeEventListener("dispose",L)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let w=0;f===!0&&(w=1),_===!0&&(w=2),x===!0&&(w=3);let S=o.attributes.position.count*w,A=1;S>t.maxTextureSize&&(A=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const R=new Float32Array(S*A*4*d),g=new Tc(R,S,A,d);g.type=Sn,g.needsUpdate=!0;const E=w*4;for(let P=0;P<d;P++){const N=m[P],I=p[P],G=M[P],T=S*A*4*P;for(let D=0;D<N.count;D++){const O=D*E;f===!0&&(s.fromBufferAttribute(N,D),R[T+O+0]=s.x,R[T+O+1]=s.y,R[T+O+2]=s.z,R[T+O+3]=0),_===!0&&(s.fromBufferAttribute(I,D),R[T+O+4]=s.x,R[T+O+5]=s.y,R[T+O+6]=s.z,R[T+O+7]=0),x===!0&&(s.fromBufferAttribute(G,D),R[T+O+8]=s.x,R[T+O+9]=s.y,R[T+O+10]=s.z,R[T+O+11]=G.itemSize===4?s.w:1)}}h={count:d,texture:g,size:new zt(S,A)},n.set(o,h),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];const _=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Lm(i,t,e,n,s){let r=new WeakMap;function a(l){const u=s.render.frame,d=l.geometry,h=t.get(l,d);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function o(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}const Im={[ic]:"LINEAR_TONE_MAPPING",[sc]:"REINHARD_TONE_MAPPING",[rc]:"CINEON_TONE_MAPPING",[ac]:"ACES_FILMIC_TONE_MAPPING",[lc]:"AGX_TONE_MAPPING",[cc]:"NEUTRAL_TONE_MAPPING",[oc]:"CUSTOM_TONE_MAPPING"};function Nm(i,t,e,n,s,r){const a=new Tn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null,l=null;const u=new rn;u.setAttribute("position",new ge([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new ge([0,2,0,0,2,0],2));const d=new Sd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new Se(u,d),f=new Oc(-1,1,1,-1,0,1);let _=null,x=null,m=!1,p,M=null,w=[],S=!1;this.setSize=function(A,R){a.setSize(A,R),o!==null&&o.setSize(A,R),c!==null&&c.setSize(A,R);for(let g=0;g<w.length;g++){const E=w[g];E.setSize&&E.setSize(A,R)}},this.setEffects=function(A){w=A,S=w.length>0&&w[0].isRenderPass===!0;const R=a.width,g=a.height;w.length>0&&o===null&&(o=new Tn(R,g,{type:An,depthBuffer:!1,stencilBuffer:!1}),c=new Tn(R,g,{type:An,depthBuffer:!1,stencilBuffer:!1}));const E=s===!0&&w.some(L=>L.needsDepthTexture===!0);E!==(a.depthTexture!==null)&&(E===!0&&l===null&&(l=new $i(R,g),r===!0&&(l.format=Jn,l.type=Yi)),a.dispose(),a.depthTexture=E?l:null,a.resolveDepthBuffer=E,a.storeMultisampledDepthBuffer=E);for(let L=0;L<w.length;L++){const P=w[L];P.setSize&&P.setSize(R,g),E&&P.needsDepthTexture===!0&&P.setDepthTexture&&P.setDepthTexture(l)}},this.begin=function(A,R){if(m||A.toneMapping===Bn&&w.length===0)return!1;if(M=R,R!==null){const g=R.width,E=R.height;(a.width!==g||a.height!==E)&&this.setSize(g,E)}return S===!1&&A.setRenderTarget(a),p=A.toneMapping,A.toneMapping=Bn,!0},this.hasRenderPass=function(){return S},this.end=function(A,R){A.toneMapping=p,m=!0;let g=a,E=o;for(let L=0;L<w.length;L++){const P=w[L];P.enabled!==!1&&(P.render(A,E,g,R),P.needsSwap!==!1&&(g=E,E=E===o?c:o))}if(_!==A.outputColorSpace||x!==A.toneMapping){_=A.outputColorSpace,x=A.toneMapping,d.defines={},jt.getTransfer(_)===oe&&(d.defines.SRGB_TRANSFER="");const L=Im[x];L&&(d.defines[L]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=g.texture,A.setRenderTarget(M),A.render(h,f),M=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}const Gc=new $e,Vc=new $i(1,1),Wc=new Lc(1),Xc=new Tc,qc=new ju,Yc=new Dc,vl=[],Ml=[],Sl=new Float32Array(16),yl=new Float32Array(9),El=new Float32Array(4);function ts(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=vl[s];if(r===void 0&&(r=new Float32Array(s),vl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Re(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Cr(i,t){let e=Ml[t];e===void 0&&(e=new Int32Array(t),Ml[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Um(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Fm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function Om(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function Bm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;El.set(n),i.uniformMatrix2fv(this.addr,!1,El),Ce(e,n)}}function km(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;yl.set(n),i.uniformMatrix3fv(this.addr,!1,yl),Ce(e,n)}}function Hm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Sl.set(n),i.uniformMatrix4fv(this.addr,!1,Sl),Ce(e,n)}}function Gm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Vm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function Wm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function Xm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function qm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Ym(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function $m(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function Zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function Pr(i){return i.version===0&&(i.compareFunction=Mc,i.needsUpdate=!0),i}function Km(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Pr(Vc):r=Gc,e.setTexture2D(t||r,s)}function Jm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||qc,s)}function Qm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Pr(Wc):r=Yc,e.setTextureCube(t||r,s)}function jm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Xc,s)}function tg(i){switch(i){case 5126:return Um;case 35664:return Fm;case 35665:return Om;case 35666:return zm;case 35674:return Bm;case 35675:return km;case 35676:return Hm;case 5124:case 35670:return Gm;case 35667:case 35671:return Vm;case 35668:case 35672:return Wm;case 35669:case 35673:return Xm;case 5125:return qm;case 36294:return Ym;case 36295:return $m;case 36296:return Zm;case 35678:case 36198:case 36298:case 36306:case 35682:return Km;case 35679:case 36299:case 36307:return Jm;case 35680:case 36300:case 36308:case 36293:return Qm;case 36289:case 36303:case 36311:case 36292:return jm}}function eg(i,t){i.uniform1fv(this.addr,t)}function ng(i,t){const e=ts(t,this.size,2);i.uniform2fv(this.addr,e)}function ig(i,t){const e=ts(t,this.size,3);i.uniform3fv(this.addr,e)}function sg(i,t){const e=ts(t,this.size,4);i.uniform4fv(this.addr,e)}function rg(i,t){const e=ts(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function ag(i,t){const e=ts(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function og(i,t){const e=ts(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function lg(i,t){i.uniform1iv(this.addr,t)}function cg(i,t){i.uniform2iv(this.addr,t)}function hg(i,t){i.uniform3iv(this.addr,t)}function ug(i,t){i.uniform4iv(this.addr,t)}function dg(i,t){i.uniform1uiv(this.addr,t)}function fg(i,t){i.uniform2uiv(this.addr,t)}function pg(i,t){i.uniform3uiv(this.addr,t)}function mg(i,t){i.uniform4uiv(this.addr,t)}function gg(i,t,e){const n=this.cache,s=t.length,r=Cr(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Pr(Vc):a=Gc;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function _g(i,t,e){const n=this.cache,s=t.length,r=Cr(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||qc,r[a])}function xg(i,t,e){const n=this.cache,s=t.length,r=Cr(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=Pr(Wc):a=Yc;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function vg(i,t,e){const n=this.cache,s=t.length,r=Cr(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Xc,r[a])}function Mg(i){switch(i){case 5126:return eg;case 35664:return ng;case 35665:return ig;case 35666:return sg;case 35674:return rg;case 35675:return ag;case 35676:return og;case 5124:case 35670:return lg;case 35667:case 35671:return cg;case 35668:case 35672:return hg;case 35669:case 35673:return ug;case 5125:return dg;case 36294:return fg;case 36295:return pg;case 36296:return mg;case 35678:case 36198:case 36298:case 36306:case 35682:return gg;case 35679:case 36299:case 36307:return _g;case 35680:case 36300:case 36308:case 36293:return xg;case 36289:case 36303:case 36311:case 36292:return vg}}class Sg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=tg(e.type)}}class yg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Mg(e.type)}}class Eg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const oa=/(\w+)(\])?(\[|\.)?/g;function bl(i,t){i.seq.push(t),i.map[t.id]=t}function bg(i,t,e){const n=i.name,s=n.length;for(oa.lastIndex=0;;){const r=oa.exec(n),a=oa.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){bl(e,l===void 0?new Sg(o,i,t):new yg(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new Eg(o),bl(e,d)),e=d}}}class xr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);bg(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Tl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Tg=37297;let wg=0;function Ag(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const wl=new kt;function Rg(i){jt._getMatrix(wl,jt.workingColorSpace,i);const t=`mat3( ${wl.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(i)){case br:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return Ot("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Al(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Ag(i.getShaderSource(t),o)}else return r}function Cg(i,t){const e=Rg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const Pg={[ic]:"Linear",[sc]:"Reinhard",[rc]:"Cineon",[ac]:"ACESFilmic",[lc]:"AgX",[cc]:"Neutral",[oc]:"Custom"};function Dg(i,t){const e=Pg[t];return e===void 0?(Ot("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const cr=new V;function Lg(){jt.getLuminanceCoefficients(cr);const i=cr.x.toFixed(4),t=cr.y.toFixed(4),e=cr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ig(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ps).join(`
`)}function Ng(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Ug(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ps(i){return i!==""}function Rl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Cl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Fg=/^[ \t]*#include +<([\w\d./]+)>/gm;function no(i){return i.replace(Fg,Og)}function Og(i,t){const e=Wt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return no(e)}const zg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pl(i){return i.replace(zg,Bg)}function Bg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Dl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const kg={[ur]:"SHADOWMAP_TYPE_PCF",[fs]:"SHADOWMAP_TYPE_VSM"};function Hg(i){return kg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Gg={[ws]:"ENVMAP_MODE_REFRACTION"};function Vg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Gg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Wg={[nc]:"ENVMAP_BLENDING_MULTIPLY",[_u]:"ENVMAP_BLENDING_MIX",[xu]:"ENVMAP_BLENDING_ADD"};function Xg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Wg[i.combine]||"ENVMAP_BLENDING_NONE"}function qg(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Hg(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=Vg(e),d=Xg(e),h=Ig(e),f=Ng(r),_=s.createProgram();let x,m,p=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(ps).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(ps).join(`
`),m.length>0&&(m+=`
`)):(x=[Dl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),m=[Dl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bn?"#define TONE_MAPPING":"",e.toneMapping!==Bn?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Bn?Dg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,Cg("linearToOutputTexel",e.outputColorSpace),Lg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ps).join(`
`)),a=no(a),a=Rl(a,e),a=Cl(a,e),o=no(o),o=Rl(o,e),o=Cl(o,e),a=Pl(a),o=Pl(o),e.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,x=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",e.glslVersion===Go?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Go?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=p+x+a,w=p+m+o,S=Tl(s,s.VERTEX_SHADER,M),A=Tl(s,s.FRAGMENT_SHADER,w);s.attachShader(_,S),s.attachShader(_,A),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(P){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(_)||"",I=s.getShaderInfoLog(S)||"",G=s.getShaderInfoLog(A)||"",T=N.trim(),D=I.trim(),O=G.trim();let F=!0,$=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(F=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,S,A);else{const H=Al(s,S,"vertex"),q=Al(s,A,"fragment");se("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+T+`
`+H+`
`+q)}else T!==""?Ot("WebGLProgram: Program Info Log:",T):(D===""||O==="")&&($=!1);$&&(P.diagnostics={runnable:F,programLog:T,vertexShader:{log:D,prefix:x},fragmentShader:{log:O,prefix:m}})}s.deleteShader(S),s.deleteShader(A),g=new xr(s,_),E=Ug(s,_)}let g;this.getUniforms=function(){return g===void 0&&R(this),g};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(_,Tg)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=wg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=A,this}let Yg=0;class $g{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Zg(t),e.set(t,n)),n}}class Zg{constructor(t){this.id=Yg++,this.code=t,this.usedTimes=0}}function Kg(i){return i===_i||i===Sr||i===yr}function Jg(i,t,e,n,s,r){const a=new wc,o=new $g,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(g){return c.add(g),g===0?"uv":`uv${g}`}function _(g,E,L,P,N,I){const G=P.fog,T=N.geometry,D=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?P.environment:null,O=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,F=t.get(g.envMap||D,O),$=h[g.type];let H=n.precision;g.precision!==null&&(H=n.getMaxPrecision(g.precision),H!==g.precision&&Ot("WebGLProgram.getParameters:",g.precision,"not supported, using",H,"instead."));const q=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,et=q!==void 0?q.length:0;let gt=0;T.morphAttributes.position!==void 0&&(gt=1),T.morphAttributes.normal!==void 0&&(gt=2),T.morphAttributes.color!==void 0&&(gt=3);let Q,B,Z,rt;if($){const St=Mn[$];Q=St.vertexShader,B=St.fragmentShader}else{Q=g.vertexShader,B=g.fragmentShader;const St=o.getVertexShaderStage(g),ne=o.getFragmentShaderStage(g);o.update(g,St,ne),Z=St.id,rt=ne.id}const st=i.getRenderTarget(),lt=i.state.buffers.depth.getReversed(),It=N.isInstancedMesh===!0,Kt=N.isBatchedMesh===!0,Tt=!!g.map,Vt=!!g.matcap,qt=!!F,Ft=qt&&F.isPMREMTexture===!0,ue=!!g.aoMap,_e=!!g.lightMap,we=!!g.bumpMap&&g.wireframe===!1,pe=!!g.normalMap,Pe=!!g.displacementMap,Bt=!!g.emissiveMap,Oe=!!g.metalnessMap,Ie=!!g.roughnessMap,Ve=g.anisotropy>0,k=g.clearcoat>0,We=g.diffuseRoughness>0,le=g.dispersion>0,ce=g.retroreflectivity>0,xt=g.iridescence>0,de=g.sheen>0,pt=g.transmission>0,Ut=Ve&&!!g.anisotropyMap,C=k&&!!g.clearcoatMap,y=k&&!!g.clearcoatNormalMap,W=k&&!!g.clearcoatRoughnessMap,at=We&&!!g.diffuseRoughnessMap,it=xt&&!!g.iridescenceMap,ht=xt&&!!g.iridescenceThicknessMap,_t=de&&!!g.sheenColorMap,j=de&&!!g.sheenRoughnessMap,tt=!!g.specularMap,dt=!!g.specularColorMap,U=!!g.specularIntensityMap,nt=pt&&!!g.transmissionMap,J=pt&&!!g.thicknessMap,ft=!!g.gradientMap,ct=!!g.alphaMap,ut=g.alphaTest>0,Dt=!!g.alphaHash,Lt=!!g.extensions;let ot=Bn;g.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(ot=i.toneMapping);const Nt=Ft?F.isCompressedCubeTexture?F.image[0].mipmaps:F.mipmaps:null,Gt={shaderID:$,shaderType:g.type,shaderName:g.name,vertexShader:Q,fragmentShader:B,defines:g.defines,customVertexShaderID:Z,customFragmentShaderID:rt,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:H,batching:Kt,batchingColor:Kt&&N._colorsTexture!==null,instancing:It,instancingColor:It&&N.instanceColor!==null,instancingMorph:It&&N.morphTexture!==null,outputColorSpace:st===null?i.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:jt.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:Tt,matcap:Vt,envMap:qt,envMapMode:qt&&F.mapping,envMapPMREM:Ft,envMapMaxLod:Ft?Nt.length-1:null,envMapSize:Ft?Nt[0].width:null,aoMap:ue,lightMap:_e,bumpMap:we,normalMap:pe,displacementMap:Pe,emissiveMap:Bt,normalMapObjectSpace:pe&&g.normalMapType===Su,normalMapTangentSpace:pe&&g.normalMapType===to,packedNormalMap:pe&&g.normalMapType===to&&Kg(g.normalMap.format),metalnessMap:Oe,roughnessMap:Ie,anisotropy:Ve,anisotropyMap:Ut,clearcoat:k,clearcoatMap:C,clearcoatNormalMap:y,clearcoatRoughnessMap:W,diffuseRoughness:We,diffuseRoughnessMap:at,dispersion:le,retroreflection:ce,iridescence:xt,iridescenceMap:it,iridescenceThicknessMap:ht,sheen:de,sheenColorMap:_t,sheenRoughnessMap:j,specularMap:tt,specularColorMap:dt,specularIntensityMap:U,transmission:pt,transmissionMap:nt,thicknessMap:J,gradientMap:ft,opaque:g.transparent===!1&&g.blending===vs&&g.alphaToCoverage===!1,alphaMap:ct,alphaTest:ut,alphaHash:Dt,combine:g.combine,mapUv:Tt&&f(g.map.channel),aoMapUv:ue&&f(g.aoMap.channel),lightMapUv:_e&&f(g.lightMap.channel),bumpMapUv:we&&f(g.bumpMap.channel),normalMapUv:pe&&f(g.normalMap.channel),displacementMapUv:Pe&&f(g.displacementMap.channel),emissiveMapUv:Bt&&f(g.emissiveMap.channel),metalnessMapUv:Oe&&f(g.metalnessMap.channel),roughnessMapUv:Ie&&f(g.roughnessMap.channel),anisotropyMapUv:Ut&&f(g.anisotropyMap.channel),clearcoatMapUv:C&&f(g.clearcoatMap.channel),clearcoatNormalMapUv:y&&f(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:W&&f(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:at&&f(g.diffuseRoughnessMap.channel),iridescenceMapUv:it&&f(g.iridescenceMap.channel),iridescenceThicknessMapUv:ht&&f(g.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&f(g.sheenColorMap.channel),sheenRoughnessMapUv:j&&f(g.sheenRoughnessMap.channel),specularMapUv:tt&&f(g.specularMap.channel),specularColorMapUv:dt&&f(g.specularColorMap.channel),specularIntensityMapUv:U&&f(g.specularIntensityMap.channel),transmissionMapUv:nt&&f(g.transmissionMap.channel),thicknessMapUv:J&&f(g.thicknessMap.channel),alphaMapUv:ct&&f(g.alphaMap.channel),vertexTangents:!!T.attributes.tangent&&(pe||Ve),vertexNormals:!!T.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!T.attributes.color&&T.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!T.attributes.uv&&(Tt||ct),fog:!!G,useFog:g.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||T.attributes.normal===void 0&&pe===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:lt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:T.attributes.position!==void 0,morphTargets:T.morphAttributes.position!==void 0,morphNormals:T.morphAttributes.normal!==void 0,morphColors:T.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:gt,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:I.filter(St=>St.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:ot,decodeVideoTexture:Tt&&g.map.isVideoTexture===!0&&jt.getTransfer(g.map.colorSpace)===oe,decodeVideoTextureEmissive:Bt&&g.emissiveMap.isVideoTexture===!0&&jt.getTransfer(g.emissiveMap.colorSpace)===oe,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===dn,flipSided:g.side===Qe,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Lt&&g.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&g.extensions.multiDraw===!0||Kt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Gt.vertexUv1s=c.has(1),Gt.vertexUv2s=c.has(2),Gt.vertexUv3s=c.has(3),c.clear(),Gt}function x(g){const E=[];if(g.shaderID?E.push(g.shaderID):(E.push(g.customVertexShaderID),E.push(g.customFragmentShaderID)),g.defines!==void 0)for(const L in g.defines)E.push(L),E.push(g.defines[L]);return g.isRawShaderMaterial===!1&&(m(E,g),p(E,g),E.push(i.outputColorSpace)),E.push(g.customProgramCacheKey),E.join()}function m(g,E){g.push(E.precision),g.push(E.outputColorSpace),g.push(E.envMapMode),g.push(E.envMapPMREM),g.push(E.envMapMaxLod),g.push(E.envMapSize),g.push(E.mapUv),g.push(E.alphaMapUv),g.push(E.lightMapUv),g.push(E.aoMapUv),g.push(E.bumpMapUv),g.push(E.normalMapUv),g.push(E.displacementMapUv),g.push(E.emissiveMapUv),g.push(E.metalnessMapUv),g.push(E.roughnessMapUv),g.push(E.anisotropyMapUv),g.push(E.clearcoatMapUv),g.push(E.clearcoatNormalMapUv),g.push(E.clearcoatRoughnessMapUv),g.push(E.diffuseRoughnessMapUv),g.push(E.iridescenceMapUv),g.push(E.iridescenceThicknessMapUv),g.push(E.sheenColorMapUv),g.push(E.sheenRoughnessMapUv),g.push(E.specularMapUv),g.push(E.specularColorMapUv),g.push(E.specularIntensityMapUv),g.push(E.transmissionMapUv),g.push(E.thicknessMapUv),g.push(E.combine),g.push(E.fogExp2),g.push(E.sizeAttenuation),g.push(E.morphTargetsCount),g.push(E.numSunLights),g.push(E.numDirLights),g.push(E.numPointLights),g.push(E.numSpotLights),g.push(E.numSpotLightMaps),g.push(E.numHemiLights),g.push(E.numRectAreaLights),g.push(E.numSunLightShadows),g.push(E.numDirLightShadows),g.push(E.numPointLightShadows),g.push(E.numSpotLightShadows),g.push(E.numSpotLightShadowsWithMaps),g.push(E.numLightProbes),g.push(E.numLightProbeGrids),g.push(E.shadowMapType),g.push(E.toneMapping),g.push(E.numClippingPlanes),g.push(E.numClipIntersection),g.push(E.depthPacking)}function p(g,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.diffuseRoughness&&a.enable(25),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function M(g){const E=h[g.type];let L;if(E){const P=Mn[E];L=xd.clone(P.uniforms)}else L=g.uniforms;return L}function w(g,E){let L=u.get(E);return L!==void 0?++L.usedTimes:(L=new qg(i,E,g,s),l.push(L),u.set(E,L)),L}function S(g){if(--g.usedTimes===0){const E=l.indexOf(g);l[E]=l[l.length-1],l.pop(),u.delete(g.cacheKey),g.destroy()}}function A(g){o.remove(g)}function R(){o.dispose()}return{getParameters:_,getProgramCacheKey:x,getUniforms:M,acquireProgram:w,releaseProgram:S,releaseShaderCache:A,programs:l,dispose:R}}function Qg(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function jg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Ll(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Il(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,_,x,m,p){let M=i[t];return M===void 0?(M={id:h.id,object:h,geometry:f,material:_,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:m,group:p},i[t]=M):(M.id=h.id,M.object=h,M.geometry=f,M.material=_,M.materialVariant=a(h),M.groupOrder=x,M.renderOrder=h.renderOrder,M.z=m,M.group=p),t++,M}function c(h,f,_,x,m,p,M){M.reversedDepth===!0&&(m=-m);const w=o(h,f,_,x,m,p);_.transmission>0?n.push(w):_.transparent===!0?s.push(w):e.push(w)}function l(h,f,_,x,m,p){const M=o(h,f,_,x,m,p);_.transmission>0?n.unshift(M):_.transparent===!0?s.unshift(M):e.unshift(M)}function u(h,f){e.length>1&&e.sort(h||jg),n.length>1&&n.sort(f||Ll),s.length>1&&s.sort(f||Ll)}function d(){for(let h=t,f=i.length;h<f;h++){const _=i[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:u}}function t0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Il,i.set(n,[a])):s>=r.length?(a=new Il,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function e0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new V,color:new Zt};break;case"SpotLight":e={position:new V,direction:new V,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":e={color:new Zt,position:new V,halfWidth:new V,halfHeight:new V};break}return i[t.id]=e,e}}}function n0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let i0=0;function s0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function r0(i){const t=new e0,e=n0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new V);const s=new V,r=new me,a=new me;function o(l){let u=0,d=0,h=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let f=0,_=0,x=0,m=0,p=0,M=0,w=0,S=0,A=0,R=0,g=0,E=0,L=0,P=0;l.sort(s0);for(let I=0,G=l.length;I<G;I++){const T=l[I],D=T.color,O=T.intensity,F=T.distance;let $=null;if(T.shadow&&T.shadow.map&&(T.shadow.map.texture.format===_i?$=T.shadow.map.texture:$=T.shadow.map.depthTexture||T.shadow.map.texture),T.isAmbientLight)u+=D.r*O,d+=D.g*O,h+=D.b*O;else if(T.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(T.sh.coefficients[H],O);P++}else if(T.isSunLight){const H=t.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const q=T.shadow,et=e.get(T);et.shadowIntensity=q.intensity,et.shadowBias=q.bias,et.shadowNormalBias=q.normalBias,et.shadowRadius=q.radius,et.shadowMapSize.copy(q.mapSize).multiply(q.getFrameExtents()),n.sunShadow[_]=et,n.sunShadowMap[_]=$;const gt=q.getViewportCount();for(let Q=0;Q<gt;Q++)n.sunShadowMatrix[x+Q]=q.getMatrix(Q),n.sunShadowCascade[x+Q]=q._cascadeData[Q];x+=gt,_++}n.sun[f]=H,f++}else if(T.isDirectionalLight){const H=t.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const q=T.shadow,et=e.get(T);et.shadowIntensity=q.intensity,et.shadowBias=q.bias,et.shadowNormalBias=q.normalBias,et.shadowRadius=q.radius,et.shadowMapSize=q.mapSize,n.directionalShadow[m]=et,n.directionalShadowMap[m]=$,n.directionalShadowMatrix[m]=T.shadow.matrix,A++}n.directional[m]=H,m++}else if(T.isSpotLight){const H=t.get(T);H.position.setFromMatrixPosition(T.matrixWorld),H.color.copy(D).multiplyScalar(O),H.distance=F,H.coneCos=Math.cos(T.angle),H.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),H.decay=T.decay,n.spot[M]=H;const q=T.shadow;if(T.map&&(n.spotLightMap[E]=T.map,E++,q.updateMatrices(T),T.castShadow&&L++),n.spotLightMatrix[M]=q.matrix,T.castShadow){const et=e.get(T);et.shadowIntensity=q.intensity,et.shadowBias=q.bias,et.shadowNormalBias=q.normalBias,et.shadowRadius=q.radius,et.shadowMapSize=q.mapSize,n.spotShadow[M]=et,n.spotShadowMap[M]=$,g++}M++}else if(T.isRectAreaLight){const H=t.get(T);H.color.copy(D).multiplyScalar(O),H.halfWidth.set(T.width*.5,0,0),H.halfHeight.set(0,T.height*.5,0),n.rectArea[w]=H,w++}else if(T.isPointLight){const H=t.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),H.distance=T.distance,H.decay=T.decay,T.castShadow){const q=T.shadow,et=e.get(T);et.shadowIntensity=q.intensity,et.shadowBias=q.bias,et.shadowNormalBias=q.normalBias,et.shadowRadius=q.radius,et.shadowMapSize=q.mapSize,et.shadowCameraNear=q.camera.near,et.shadowCameraFar=q.camera.far,n.pointShadow[p]=et,n.pointShadowMap[p]=$,n.pointShadowMatrix[p]=T.shadow.matrix,R++}n.point[p]=H,p++}else if(T.isHemisphereLight){const H=t.get(T);H.skyColor.copy(T.color).multiplyScalar(O),H.groundColor.copy(T.groundColor).multiplyScalar(O),n.hemi[S]=H,S++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=yt.LTC_FLOAT_1,n.rectAreaLTC2=yt.LTC_FLOAT_2):(n.rectAreaLTC1=yt.LTC_HALF_1,n.rectAreaLTC2=yt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const N=n.hash;(N.sunLength!==f||N.directionalLength!==m||N.pointLength!==p||N.spotLength!==M||N.rectAreaLength!==w||N.hemiLength!==S||N.numSunShadows!==_||N.numDirectionalShadows!==A||N.numPointShadows!==R||N.numSpotShadows!==g||N.numSpotMaps!==E||N.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=m,n.spot.length=M,n.rectArea.length=w,n.point.length=p,n.hemi.length=S,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=R,n.pointShadowMap.length=R,n.pointShadowMatrix.length=R,n.spotShadow.length=g,n.spotShadowMap.length=g,n.spotLightMatrix.length=g+E-L,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=L,n.numLightProbes=P,N.sunLength=f,N.directionalLength=m,N.pointLength=p,N.spotLength=M,N.rectAreaLength=w,N.hemiLength=S,N.numSunShadows=_,N.numDirectionalShadows=A,N.numPointShadows=R,N.numSpotShadows=g,N.numSpotMaps=E,N.numLightProbes=P,n.version=i0++)}function c(l,u){let d=0,h=0,f=0,_=0,x=0,m=0;const p=u.matrixWorldInverse;for(let M=0,w=l.length;M<w;M++){const S=l[M];if(S.isSunLight){const A=n.sun[d];A.direction.setFromMatrixPosition(S.matrixWorld),A.direction.transformDirection(p),d++}else if(S.isDirectionalLight){const A=n.directional[h];A.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(p),h++}else if(S.isSpotLight){const A=n.spot[_];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(p),_++}else if(S.isRectAreaLight){const A=n.rectArea[x];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(p),a.identity(),r.copy(S.matrixWorld),r.premultiply(p),a.extractRotation(r),A.halfWidth.set(S.width*.5,0,0),A.halfHeight.set(0,S.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),x++}else if(S.isPointLight){const A=n.point[f];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(p),f++}else if(S.isHemisphereLight){const A=n.hemi[m];A.direction.setFromMatrixPosition(S.matrixWorld),A.direction.transformDirection(p),m++}}}return{setup:o,setupView:c,state:n}}function Nl(i){const t=new r0(i),e=[],n=[],s=[];function r(d){u.camera=d,e.length=0,n.length=0,s.length=0}function a(d){d.isLightProbeGrid?s.push(d):e.push(d)}function o(d){n.push(d)}function c(){t.setup(e),s.sort((d,h)=>d.priority-h.priority||d.id-h.id)}function l(d){t.setupView(e,d)}const u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function a0(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Nl(i),t.set(s,[o])):r>=a.length?(o=new Nl(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const o0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,l0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,c0=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],h0=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],Ul=new me,hs=new V,la=new V;function u0(i,t,e){let n=new Ps;const s=new zt,r=new zt,a=new ve,o=new yd,c=new Ed,l={},u=e.maxTextureSize,d={[gi]:Qe,[Qe]:gi,[dn]:dn},h=new vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:o0,fragmentShader:l0}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const _=new rn;_.setAttribute("position",new mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Se(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ur;let p=this.type;this.render=function(R,g,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;this.type===jl&&(Ot("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ur);const L=i.getRenderTarget(),P=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),I=i.state;I.setBlending(Wi),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const G=p!==this.type;G&&g.traverse(function(T){T.material&&(Array.isArray(T.material)?T.material.forEach(D=>D.needsUpdate=!0):T.material.needsUpdate=!0)});for(let T=0,D=R.length;T<D;T++){const O=R[T],F=O.shadow;if(F===void 0){Ot("WebGLShadowMap:",O,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);const $=F.getFrameExtents();s.multiply($),r.copy(F.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/$.x),s.x=r.x*$.x,F.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/$.y),s.y=r.y*$.y,F.mapSize.y=r.y));const H=i.state.buffers.depth.getReversed();if(F.camera._reversedDepth=H,F.map===null||G===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===fs){if(O.isPointLight){Ot("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new Tn(s.x,s.y,{format:_i,type:An,minFilter:Je,magFilter:Je,generateMipmaps:!1}),F.map.texture.name=O.name+".shadowMap",F.map.depthTexture=new $i(s.x,s.y,Sn),F.map.depthTexture.name=O.name+".shadowMapDepth",F.map.depthTexture.format=ti,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Ue,F.map.depthTexture.magFilter=Ue}else O.isPointLight?(F.map=new wo(s.x),F.map.depthTexture=new Lc(s.x,wn)):(F.map=new Tn(s.x,s.y),F.map.depthTexture=new $i(s.x,s.y,wn)),F.map.depthTexture.name=O.name+".shadowMap",F.map.depthTexture.format=ti,this.type===ur?(F.map.depthTexture.compareFunction=H?vc:xc,F.map.depthTexture.minFilter=Je,F.map.depthTexture.magFilter=Je):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Ue,F.map.depthTexture.magFilter=Ue);F.camera.updateProjectionMatrix()}F.map.isWebGLCubeRenderTarget!==!0&&(F.map.width!==s.x||F.map.height!==s.y)&&F.map.setSize(s.x,s.y);const q=F.map.isWebGLCubeRenderTarget?6:F.getViewportCount();O.isPointLight!==!0&&F.updateMatrices(O,E);const et=(F.camera.layers.mask&4294967294)!==0?F.camera.layers:E.layers;for(let gt=0;gt<q;gt++){const Q=F.getCamera(gt);if(O.isPointLight){const B=F.camera,Z=F.matrix,rt=O.distance||B.far;rt!==B.far&&(B.far=rt,B.updateProjectionMatrix()),hs.setFromMatrixPosition(O.matrixWorld),B.position.copy(hs),la.copy(B.position),la.add(c0[gt]),B.up.copy(h0[gt]),B.lookAt(la),B.updateMatrixWorld(),Z.makeTranslation(-hs.x,-hs.y,-hs.z),Ul.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),F._frustum.setFromProjectionMatrix(Ul,B.coordinateSystem,B.reversedDepth)}if(F.map.isWebGLCubeRenderTarget)i.setRenderTarget(F.map,gt),i.clear();else{gt===0&&(i.setRenderTarget(F.map),i.clear());const B=F.getViewport(gt);a.set(r.x*B.x,r.y*B.y,r.x*B.z,r.y*B.w),I.viewport(a)}n=F.getFrustum(gt),S(g,E,Q,O,et,this.type)}F.isPointLightShadow!==!0&&this.type===fs&&M(F,E),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(L,P,N)};function M(R,g){const E=t.update(x);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null?R.mapPass=new Tn(s.x,s.y,{format:_i,type:An}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),h.uniforms.shadow_pass.value=R.map.depthTexture,h.uniforms.resolution.value.set(R.map.width,R.map.height),h.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(g,null,E,h,x,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value.set(R.map.width,R.map.height),f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(g,null,E,f,x,null)}function w(R,g,E,L){let P=null;const N=E.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(N!==void 0)P=N;else if(P=E.isPointLight===!0?c:o,i.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){const I=P.uuid,G=g.uuid;let T=l[I];T===void 0&&(T={},l[I]=T);let D=T[G];D===void 0&&(D=P.clone(),T[G]=D,g.addEventListener("dispose",A)),P=D}if(P.visible=g.visible,P.wireframe=g.wireframe,L===fs?P.side=g.shadowSide!==null?g.shadowSide:g.side:P.side=g.shadowSide!==null?g.shadowSide:d[g.side],P.alphaMap=g.alphaMap,P.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,P.map=g.map,P.clipShadows=g.clipShadows,P.clippingPlanes=g.clippingPlanes,P.clipIntersection=g.clipIntersection,P.displacementMap=g.displacementMap,P.displacementScale=g.displacementScale,P.displacementBias=g.displacementBias,P.wireframeLinewidth=g.wireframeLinewidth,P.linewidth=g.linewidth,E.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const I=i.properties.get(P);I.light=E}return P}function S(R,g,E,L,P,N){if(R.visible===!1)return;if(R.layers.test(P)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&N===fs)&&(!R.frustumCulled||R.intersectsFrustum(n))){R.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,R.matrixWorld);const T=t.update(R),D=R.material;if(Array.isArray(D)){const O=T.groups;for(let F=0,$=O.length;F<$;F++){const H=O[F],q=D[H.materialIndex];if(q&&q.visible){const et=w(R,q,L,N);R.onBeforeShadow(i,R,g,E,T,et,H),i.renderBufferDirect(E,null,T,et,R,H),R.onAfterShadow(i,R,g,E,T,et,H)}}}else if(D.visible){const O=w(R,D,L,N);R.onBeforeShadow(i,R,g,E,T,O,null),i.renderBufferDirect(E,null,T,O,R,null),R.onAfterShadow(i,R,g,E,T,O,null)}}const G=R.children;for(let T=0,D=G.length;T<D;T++)S(G[T],g,E,L,P,N)}function A(R){R.target.removeEventListener("dispose",A);for(const E in l){const L=l[E],P=R.target.uuid;P in L&&(L[P].dispose(),delete L[P])}}}function d0(i,t){function e(){let U=!1;const nt=new ve;let J=null;const ft=new ve(0,0,0,0);return{setMask:function(ct){J!==ct&&!U&&(i.colorMask(ct,ct,ct,ct),J=ct)},setLocked:function(ct){U=ct},setClear:function(ct,ut,Dt,Lt,ot){ot===!0&&(ct*=Lt,ut*=Lt,Dt*=Lt),nt.set(ct,ut,Dt,Lt),ft.equals(nt)===!1&&(i.clearColor(ct,ut,Dt,Lt),ft.copy(nt))},reset:function(){U=!1,J=null,ft.set(-1,0,0,0)}}}function n(){let U=!1,nt=!1,J=null,ft=null,ct=null;return{setReversed:function(ut){if(nt!==ut){const Dt=t.get("EXT_clip_control");ut?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT),nt=ut;const Lt=ct;ct=null,this.setClear(Lt)}},getReversed:function(){return nt},setTest:function(ut){ut?lt(i.DEPTH_TEST):It(i.DEPTH_TEST)},setMask:function(ut){J!==ut&&!U&&(i.depthMask(ut),J=ut)},setFunc:function(ut){if(nt&&(ut=Lu[ut]),ft!==ut){switch(ut){case ma:i.depthFunc(i.NEVER);break;case ga:i.depthFunc(i.ALWAYS);break;case _a:i.depthFunc(i.LESS);break;case Ts:i.depthFunc(i.LEQUAL);break;case xa:i.depthFunc(i.EQUAL);break;case va:i.depthFunc(i.GEQUAL);break;case Ma:i.depthFunc(i.GREATER);break;case Sa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ft=ut}},setLocked:function(ut){U=ut},setClear:function(ut){ct!==ut&&(ct=ut,nt&&(ut=1-ut),i.clearDepth(ut))},reset:function(){U=!1,J=null,ft=null,ct=null,nt=!1}}}function s(){let U=!1,nt=null,J=null,ft=null,ct=null,ut=null,Dt=null,Lt=null,ot=null;return{setTest:function(Nt){U||(Nt?lt(i.STENCIL_TEST):It(i.STENCIL_TEST))},setMask:function(Nt){nt!==Nt&&!U&&(i.stencilMask(Nt),nt=Nt)},setFunc:function(Nt,Gt,St){(J!==Nt||ft!==Gt||ct!==St)&&(i.stencilFunc(Nt,Gt,St),J=Nt,ft=Gt,ct=St)},setOp:function(Nt,Gt,St){(ut!==Nt||Dt!==Gt||Lt!==St)&&(i.stencilOp(Nt,Gt,St),ut=Nt,Dt=Gt,Lt=St)},setLocked:function(Nt){U=Nt},setClear:function(Nt){ot!==Nt&&(i.clearStencil(Nt),ot=Nt)},reset:function(){U=!1,nt=null,J=null,ft=null,ct=null,ut=null,Dt=null,Lt=null,ot=null}}}const r=new e,a=new n,o=new s;let c={};const l=new WeakMap;let u={},d={},h={},f=new WeakMap,_=[],x=null,m=!1,p=null,M=null,w=null,S=null,A=null,R=null,g=null,E=new Zt(0,0,0),L=0,P=!1,N=null,I=null,G=null,T=null,D=null;const O=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,$=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(H)[1]),F=$>=1):H.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),F=$>=2);let q=null,et={};const gt=i.getParameter(i.SCISSOR_BOX),Q=i.getParameter(i.VIEWPORT),B=new ve().fromArray(gt),Z=new ve().fromArray(Q);function rt(U,nt,J,ft){const ct=new Uint8Array(4),ut=i.createTexture();i.bindTexture(U,ut),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Dt=0;Dt<J;Dt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(nt,0,i.RGBA,1,1,ft,0,i.RGBA,i.UNSIGNED_BYTE,ct):i.texImage2D(nt+Dt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ct);return ut}const st={};st[i.TEXTURE_2D]=rt(i.TEXTURE_2D,i.TEXTURE_2D,1),st[i.TEXTURE_CUBE_MAP]=rt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[i.TEXTURE_2D_ARRAY]=rt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),st[i.TEXTURE_3D]=rt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),lt(i.DEPTH_TEST),a.setFunc(Ts),we(!1),pe(zo),lt(i.CULL_FACE),ue(Wi);function lt(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function It(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Kt(U,nt){return h[U]!==nt?(i.bindFramebuffer(U,nt),h[U]=nt,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=nt),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=nt),!0):!1}function Tt(U,nt){let J=_,ft=!1;if(U){J=f.get(nt),J===void 0&&(J=[],f.set(nt,J));const ct=U.textures;if(J.length!==ct.length||J[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,Dt=ct.length;ut<Dt;ut++)J[ut]=i.COLOR_ATTACHMENT0+ut;J.length=ct.length,ft=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ft=!0);ft&&i.drawBuffers(J)}function Vt(U){return x!==U?(i.useProgram(U),x=U,!0):!1}const qt={[Oi]:i.FUNC_ADD,[tu]:i.FUNC_SUBTRACT,[eu]:i.FUNC_REVERSE_SUBTRACT};qt[nu]=i.MIN,qt[iu]=i.MAX;const Ft={[su]:i.ZERO,[ru]:i.ONE,[au]:i.SRC_COLOR,[tc]:i.SRC_ALPHA,[du]:i.SRC_ALPHA_SATURATE,[hu]:i.DST_COLOR,[lu]:i.DST_ALPHA,[ou]:i.ONE_MINUS_SRC_COLOR,[ec]:i.ONE_MINUS_SRC_ALPHA,[uu]:i.ONE_MINUS_DST_COLOR,[cu]:i.ONE_MINUS_DST_ALPHA,[fu]:i.CONSTANT_COLOR,[pu]:i.ONE_MINUS_CONSTANT_COLOR,[mu]:i.CONSTANT_ALPHA,[gu]:i.ONE_MINUS_CONSTANT_ALPHA};function ue(U,nt,J,ft,ct,ut,Dt,Lt,ot,Nt){if(U===Wi){m===!0&&(It(i.BLEND),m=!1);return}if(m===!1&&(lt(i.BLEND),m=!0),U!==jh){if(U!==p||Nt!==P){if((M!==Oi||A!==Oi)&&(i.blendEquation(i.FUNC_ADD),M=Oi,A=Oi),Nt)switch(U){case vs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bo:i.blendFunc(i.ONE,i.ONE);break;case ko:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ho:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:se("WebGLState: Invalid blending: ",U);break}else switch(U){case vs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ko:se("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ho:se("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:se("WebGLState: Invalid blending: ",U);break}w=null,S=null,R=null,g=null,E.set(0,0,0),L=0,p=U,P=Nt}return}ct=ct||nt,ut=ut||J,Dt=Dt||ft,(nt!==M||ct!==A)&&(i.blendEquationSeparate(qt[nt],qt[ct]),M=nt,A=ct),(J!==w||ft!==S||ut!==R||Dt!==g)&&(i.blendFuncSeparate(Ft[J],Ft[ft],Ft[ut],Ft[Dt]),w=J,S=ft,R=ut,g=Dt),(Lt.equals(E)===!1||ot!==L)&&(i.blendColor(Lt.r,Lt.g,Lt.b,ot),E.copy(Lt),L=ot),p=U,P=!1}function _e(U,nt){U.side===dn?It(i.CULL_FACE):lt(i.CULL_FACE);let J=U.side===Qe;nt&&(J=!J),we(J),U.blending===vs&&U.transparent===!1?ue(Wi):ue(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const ft=U.stencilWrite;o.setTest(ft),ft&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Bt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?lt(i.SAMPLE_ALPHA_TO_COVERAGE):It(i.SAMPLE_ALPHA_TO_COVERAGE)}function we(U){N!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),N=U)}function pe(U){U!==Jh?(lt(i.CULL_FACE),U!==I&&(U===zo?i.cullFace(i.BACK):U===Qh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):It(i.CULL_FACE),I=U}function Pe(U){U!==G&&(F&&i.lineWidth(U),G=U)}function Bt(U,nt,J){U?(lt(i.POLYGON_OFFSET_FILL),(T!==nt||D!==J)&&(T=nt,D=J,a.getReversed()&&(nt=-nt,J=-J),i.polygonOffset(nt,J))):It(i.POLYGON_OFFSET_FILL)}function Oe(U){U?lt(i.SCISSOR_TEST):It(i.SCISSOR_TEST)}function Ie(U){U===void 0&&(U=i.TEXTURE0+O-1),q!==U&&(i.activeTexture(U),q=U)}function Ve(U,nt,J){J===void 0&&(q===null?J=i.TEXTURE0+O-1:J=q);let ft=et[J];ft===void 0&&(ft={type:void 0,texture:void 0},et[J]=ft),(ft.type!==U||ft.texture!==nt)&&(q!==J&&(i.activeTexture(J),q=J),i.bindTexture(U,nt||st[U]),ft.type=U,ft.texture=nt)}function k(){const U=et[q];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function We(){try{i.compressedTexImage2D(...arguments)}catch(U){se("WebGLState:",U)}}function le(){try{i.compressedTexImage3D(...arguments)}catch(U){se("WebGLState:",U)}}function ce(){try{i.texSubImage2D(...arguments)}catch(U){se("WebGLState:",U)}}function xt(){try{i.texSubImage3D(...arguments)}catch(U){se("WebGLState:",U)}}function de(){try{i.compressedTexSubImage2D(...arguments)}catch(U){se("WebGLState:",U)}}function pt(){try{i.compressedTexSubImage3D(...arguments)}catch(U){se("WebGLState:",U)}}function Ut(){try{i.texStorage2D(...arguments)}catch(U){se("WebGLState:",U)}}function C(){try{i.texStorage3D(...arguments)}catch(U){se("WebGLState:",U)}}function y(){try{i.texImage2D(...arguments)}catch(U){se("WebGLState:",U)}}function W(){try{i.texImage3D(...arguments)}catch(U){se("WebGLState:",U)}}function at(U){return d[U]!==void 0?d[U]:i.getParameter(U)}function it(U,nt){d[U]!==nt&&(i.pixelStorei(U,nt),d[U]=nt)}function ht(U){B.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),B.copy(U))}function _t(U){Z.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Z.copy(U))}function j(U,nt){let J=l.get(nt);J===void 0&&(J=new WeakMap,l.set(nt,J));let ft=J.get(U);ft===void 0&&(ft=i.getUniformBlockIndex(nt,U.name),i.uniformBlockBinding(nt,ft,ft),J.set(U,ft))}function tt(U,nt,J){const ct=l.get(nt).get(U);c[ct]!==J&&(i.bindBufferBase(i.UNIFORM_BUFFER,ct,J),c[ct]=J)}function dt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},q=null,et={},h={},c={},f=new WeakMap,_=[],x=null,m=!1,p=null,M=null,w=null,S=null,A=null,R=null,g=null,E=new Zt(0,0,0),L=0,P=!1,N=null,I=null,G=null,T=null,D=null,B.set(0,0,i.canvas.width,i.canvas.height),Z.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:lt,disable:It,bindFramebuffer:Kt,drawBuffers:Tt,useProgram:Vt,setBlending:ue,setMaterial:_e,setFlipSided:we,setCullFace:pe,setLineWidth:Pe,setPolygonOffset:Bt,setScissorTest:Oe,activeTexture:Ie,bindTexture:Ve,unbindTexture:k,compressedTexImage2D:We,compressedTexImage3D:le,texImage2D:y,texImage3D:W,pixelStorei:it,getParameter:at,updateUBOMapping:j,uniformBlockBinding:tt,texStorage2D:Ut,texStorage3D:C,texSubImage2D:ce,texSubImage3D:xt,compressedTexSubImage2D:de,compressedTexSubImage3D:pt,scissor:ht,viewport:_t,reset:dt}}function f0(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new zt,u=new WeakMap,d=new Set;let h;const f=new WeakMap,_=new Set,x=new FinalizationRegistry(C=>_.delete(C));let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(C,y){return m?new OffscreenCanvas(C,y):Tr("canvas")}function M(C,y,W){let at=1;const it=Ut(C);if((it.width>W||it.height>W)&&(at=W/Math.max(it.width,it.height)),at<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const ht=Math.floor(at*it.width),_t=Math.floor(at*it.height);h===void 0&&(h=p(ht,_t));const j=y?p(ht,_t):h;return j.width=ht,j.height=_t,j.getContext("2d").drawImage(C,0,0,ht,_t),Ot("WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+ht+"x"+_t+")."),j}else return"data"in C&&Ot("WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),C;return C}function w(C){return C.generateMipmaps}function S(C){i.generateMipmap(C)}function A(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function R(C,y,W,at,it,ht=!1){if(C!==null){if(i[C]!==void 0)return i[C];Ot("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let _t;at&&(_t=t.get("EXT_texture_norm16"),_t||Ot("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=y;if(y===i.RED&&(W===i.FLOAT&&(j=i.R32F),W===i.HALF_FLOAT&&(j=i.R16F),W===i.UNSIGNED_BYTE&&(j=i.R8),W===i.UNSIGNED_SHORT&&_t&&(j=_t.R16_EXT),W===i.SHORT&&_t&&(j=_t.R16_SNORM_EXT)),y===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(j=i.R8UI),W===i.UNSIGNED_SHORT&&(j=i.R16UI),W===i.UNSIGNED_INT&&(j=i.R32UI),W===i.BYTE&&(j=i.R8I),W===i.SHORT&&(j=i.R16I),W===i.INT&&(j=i.R32I)),y===i.RG&&(W===i.FLOAT&&(j=i.RG32F),W===i.HALF_FLOAT&&(j=i.RG16F),W===i.UNSIGNED_BYTE&&(j=i.RG8),W===i.UNSIGNED_SHORT&&_t&&(j=_t.RG16_EXT),W===i.SHORT&&_t&&(j=_t.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(j=i.RG8UI),W===i.UNSIGNED_SHORT&&(j=i.RG16UI),W===i.UNSIGNED_INT&&(j=i.RG32UI),W===i.BYTE&&(j=i.RG8I),W===i.SHORT&&(j=i.RG16I),W===i.INT&&(j=i.RG32I)),y===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(j=i.RGB8UI),W===i.UNSIGNED_SHORT&&(j=i.RGB16UI),W===i.UNSIGNED_INT&&(j=i.RGB32UI),W===i.BYTE&&(j=i.RGB8I),W===i.SHORT&&(j=i.RGB16I),W===i.INT&&(j=i.RGB32I)),y===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),W===i.UNSIGNED_INT&&(j=i.RGBA32UI),W===i.BYTE&&(j=i.RGBA8I),W===i.SHORT&&(j=i.RGBA16I),W===i.INT&&(j=i.RGBA32I)),y===i.RGB&&(W===i.UNSIGNED_SHORT&&_t&&(j=_t.RGB16_EXT),W===i.SHORT&&_t&&(j=_t.RGB16_SNORM_EXT),W===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),y===i.RGBA){const tt=ht?br:jt.getTransfer(it);W===i.FLOAT&&(j=i.RGBA32F),W===i.HALF_FLOAT&&(j=i.RGBA16F),W===i.UNSIGNED_BYTE&&(j=tt===oe?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT&&_t&&(j=_t.RGBA16_EXT),W===i.SHORT&&_t&&(j=_t.RGBA16_SNORM_EXT),W===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function g(C,y){let W;return C?y===null||y===wn||y===Yi?W=i.DEPTH24_STENCIL8:y===Sn?W=i.DEPTH32F_STENCIL8:y===As&&(W=i.DEPTH24_STENCIL8,Ot("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===wn||y===Yi?W=i.DEPTH_COMPONENT24:y===Sn?W=i.DEPTH_COMPONENT32F:y===As&&(W=i.DEPTH_COMPONENT16),W}function E(C,y){return w(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ue&&C.minFilter!==Je?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function L(C){const y=new WeakRef(C);n.get(C).__ref=y,_.add(y),x.register(C,y,y)}function P(C){const y=n.get(C).__ref;y!==void 0&&(_.delete(y),x.unregister(y))}function N(C){G(C.target)}function I(C){T(C.target)}function G(C){C.removeEventListener("dispose",N),P(C),O(C),C.isVideoTexture&&u.delete(C),C.isHTMLTexture&&d.delete(C)}function T(C){C.removeEventListener("dispose",I),P(C),$(C)}function D(){for(const C of _){const y=C.deref();y!==void 0&&(y.isRenderTarget===!0?T(y):G(y))}_.clear(),d.clear()}function O(C){const y=n.get(C);if(y.__webglInit===void 0)return;const W=C.source,at=f.get(W);if(at){const it=at[y.__cacheKey];it.usedTimes--,it.usedTimes===0&&F(C),Object.keys(at).length===0&&f.delete(W)}n.remove(C)}function F(C){const y=n.get(C);i.deleteTexture(y.__webglTexture);const W=C.source,at=f.get(W);delete at[y.__cacheKey],a.memory.textures--}function $(C){const y=n.get(C);y.__depthDisposeCallback&&y.__depthDisposeCallback();const W=C.depthTexture;if(W&&W.renderTarget===C&&G(W),C.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(y.__webglFramebuffer[it]))for(let ht=0;ht<y.__webglFramebuffer[it].length;ht++)i.deleteFramebuffer(y.__webglFramebuffer[it][ht]);else i.deleteFramebuffer(y.__webglFramebuffer[it]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[it])}else{if(Array.isArray(y.__webglFramebuffer))for(let it=0;it<y.__webglFramebuffer.length;it++)i.deleteFramebuffer(y.__webglFramebuffer[it]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let it=0;it<y.__webglColorRenderbuffer.length;it++)y.__webglColorRenderbuffer[it]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[it]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const at=C.textures;for(let it=0,ht=at.length;it<ht;it++){const _t=n.get(at[it]);_t.__webglTexture&&(i.deleteTexture(_t.__webglTexture),a.memory.textures--),n.remove(at[it])}n.remove(C)}let H=0;function q(){H=0}function et(){return H}function gt(C){H=C}function Q(){const C=H;return C>=s.maxTextures&&Ot("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),H+=1,C}function B(C){const y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.mipmapsAutoUpdate),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function Z(C,y){const W=n.get(C);if(C.isVideoTexture&&de(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&W.__version!==C.version){const at=C.image;if(at===null)Ot("WebGLRenderer: Texture marked for update but no image data found.");else if(at.complete===!1)Ot("WebGLRenderer: Texture marked for update but image is incomplete");else{_e(W,C,y);return}}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+y)}function rt(C,y){const W=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){_e(W,C,y);return}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+y)}function st(C,y){const W=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){_e(W,C,y);return}e.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+y)}function lt(C,y){const W=n.get(C);if(C.version>0&&W.__version!==C.version){we(W,C,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+y)}const It={[ya]:i.REPEAT,[zn]:i.CLAMP_TO_EDGE,[Ea]:i.MIRRORED_REPEAT},Kt={[Ue]:i.NEAREST,[vu]:i.NEAREST_MIPMAP_NEAREST,[Gs]:i.NEAREST_MIPMAP_LINEAR,[Je]:i.LINEAR,[zr]:i.LINEAR_MIPMAP_NEAREST,[Kn]:i.LINEAR_MIPMAP_LINEAR},Tt={[Eu]:i.NEVER,[Mc]:i.ALWAYS,[bu]:i.LESS,[xc]:i.LEQUAL,[Tu]:i.EQUAL,[vc]:i.GEQUAL,[wu]:i.GREATER,[Au]:i.NOTEQUAL};function Vt(C,y){if(y.type===Sn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Je||y.magFilter===zr||y.magFilter===Gs||y.magFilter===Kn||y.minFilter===Je||y.minFilter===zr||y.minFilter===Gs||y.minFilter===Kn)&&Ot("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,It[y.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,It[y.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,It[y.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,Kt[y.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,Kt[y.minFilter]),y.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Tt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ue||y.minFilter!==Gs&&y.minFilter!==Kn||y.type===Sn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function qt(C,y){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",N),L(y));const at=y.source;let it=f.get(at);it===void 0&&(it={},f.set(at,it));const ht=B(y);if(ht!==C.__cacheKey){it[ht]===void 0&&(it[ht]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),it[ht].usedTimes++;const _t=it[C.__cacheKey];_t!==void 0&&(it[C.__cacheKey].usedTimes--,_t.usedTimes===0&&F(y)),C.__cacheKey=ht,C.__webglTexture=it[ht].texture}return W}function Ft(C,y,W){return Math.floor(Math.floor(C/W)/y)}function ue(C,y,W,at){const ht=C.updateRanges;if(ht.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,W,at,y.data);else{ht.sort((U,nt)=>U.start-nt.start);let _t=0;for(let U=1;U<ht.length;U++){const nt=ht[_t],J=ht[U],ft=nt.start+nt.count,ct=Ft(J.start,y.width,4),ut=Ft(nt.start,y.width,4);J.start<=ft+1&&ct===ut&&Ft(J.start+J.count-1,y.width,4)===ct?nt.count=Math.max(nt.count,J.start+J.count-nt.start):(++_t,ht[_t]=J)}ht.length=_t+1;const j=e.getParameter(i.UNPACK_ROW_LENGTH),tt=e.getParameter(i.UNPACK_SKIP_PIXELS),dt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let U=0,nt=ht.length;U<nt;U++){const J=ht[U],ft=Math.floor(J.start/4),ct=Math.ceil(J.count/4),ut=ft%y.width,Dt=Math.floor(ft/y.width),Lt=ct,ot=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,ut),e.pixelStorei(i.UNPACK_SKIP_ROWS,Dt),e.texSubImage2D(i.TEXTURE_2D,0,ut,Dt,Lt,ot,W,at,y.data)}C.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,j),e.pixelStorei(i.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(i.UNPACK_SKIP_ROWS,dt)}}function _e(C,y,W){let at=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(at=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(at=i.TEXTURE_3D);const it=qt(C,y),ht=y.source;e.bindTexture(at,C.__webglTexture,i.TEXTURE0+W);const _t=n.get(ht);if(ht.version!==_t.__version||it===!0){if(e.activeTexture(i.TEXTURE0+W),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const ot=jt.getPrimaries(jt.workingColorSpace),Nt=y.colorSpace===Zn?null:jt.getPrimaries(y.colorSpace),Gt=y.colorSpace===Zn||ot===Nt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt)}e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let tt=M(y.image,!1,s.maxTextureSize);tt=pt(y,tt);const dt=r.convert(y.format,y.colorSpace),U=r.convert(y.type);let nt=R(y.internalFormat,dt,U,y.normalized,y.colorSpace,y.isVideoTexture);Vt(at,y);let J;const ft=y.mipmaps,ct=y.isVideoTexture!==!0,ut=_t.__version===void 0||it===!0,Dt=ht.dataReady,Lt=E(y,tt);if(y.isDepthTexture)nt=g(y.format===Jn,y.type),ut&&(ct?e.texStorage2D(i.TEXTURE_2D,1,nt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,nt,tt.width,tt.height,0,dt,U,null));else if(y.isDataTexture)if(ft.length>0){ct&&ut&&e.texStorage2D(i.TEXTURE_2D,Lt,nt,ft[0].width,ft[0].height);for(let ot=0,Nt=ft.length;ot<Nt;ot++)J=ft[ot],ct?Dt&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,J.width,J.height,dt,U,J.data):e.texImage2D(i.TEXTURE_2D,ot,nt,J.width,J.height,0,dt,U,J.data);y.generateMipmaps=!1}else ct?(ut&&e.texStorage2D(i.TEXTURE_2D,Lt,nt,tt.width,tt.height),Dt&&ue(y,tt,dt,U)):e.texImage2D(i.TEXTURE_2D,0,nt,tt.width,tt.height,0,dt,U,tt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ct&&ut&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Lt,nt,ft[0].width,ft[0].height,tt.depth);for(let ot=0,Nt=ft.length;ot<Nt;ot++)if(J=ft[ot],y.format!==yn)if(dt!==null)if(ct){if(Dt)if(y.layerUpdates.size>0){const Gt=pl(J.width,J.height,y.format,y.type);for(const St of y.layerUpdates){const ne=J.data.subarray(St*Gt/J.data.BYTES_PER_ELEMENT,(St+1)*Gt/J.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,St,J.width,J.height,1,dt,ne)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,J.width,J.height,tt.depth,dt,J.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ot,nt,J.width,J.height,tt.depth,0,J.data,0,0);else Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ct?Dt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,J.width,J.height,tt.depth,dt,U,J.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ot,nt,J.width,J.height,tt.depth,0,dt,U,J.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{ct&&ut&&e.texStorage2D(i.TEXTURE_2D,Lt,nt,ft[0].width,ft[0].height);for(let ot=0,Nt=ft.length;ot<Nt;ot++)J=ft[ot],y.format!==yn?dt!==null?ct?Dt&&e.compressedTexSubImage2D(i.TEXTURE_2D,ot,0,0,J.width,J.height,dt,J.data):e.compressedTexImage2D(i.TEXTURE_2D,ot,nt,J.width,J.height,0,J.data):Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ct?Dt&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,J.width,J.height,dt,U,J.data):e.texImage2D(i.TEXTURE_2D,ot,nt,J.width,J.height,0,dt,U,J.data)}else if(y.isDataArrayTexture)if(ct){if(ut&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Lt,nt,tt.width,tt.height,tt.depth),Dt)if(y.layerUpdates.size>0){const ot=pl(tt.width,tt.height,y.format,y.type);for(const Nt of y.layerUpdates){const Gt=tt.data.subarray(Nt*ot/tt.data.BYTES_PER_ELEMENT,(Nt+1)*ot/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Nt,tt.width,tt.height,1,dt,U,Gt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,dt,U,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,nt,tt.width,tt.height,tt.depth,0,dt,U,tt.data);else if(y.isData3DTexture)ct?(ut&&e.texStorage3D(i.TEXTURE_3D,Lt,nt,tt.width,tt.height,tt.depth),Dt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,dt,U,tt.data)):e.texImage3D(i.TEXTURE_3D,0,nt,tt.width,tt.height,tt.depth,0,dt,U,tt.data);else if(y.isFramebufferTexture){if(ut)if(ct)e.texStorage2D(i.TEXTURE_2D,Lt,nt,tt.width,tt.height);else{let ot=tt.width,Nt=tt.height;for(let Gt=0;Gt<Lt;Gt++)e.texImage2D(i.TEXTURE_2D,Gt,nt,ot,Nt,0,dt,U,null),ot>>=1,Nt>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){const ot=i.canvas;if(ot.hasAttribute("layoutsubtree")||ot.setAttribute("layoutsubtree","true"),tt.parentNode!==ot){ot.appendChild(tt),d.add(y),ot.onpaint=Nt=>{const Gt=Nt.changedElements;for(const St of d)Gt.includes(St.image)&&(St.needsUpdate=!0)},ot.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,tt);else{const Gt=i.RGBA,St=i.RGBA,ne=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Gt,St,ne,tt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ft.length>0){if(ct&&ut){const ot=Ut(ft[0]);e.texStorage2D(i.TEXTURE_2D,Lt,nt,ot.width,ot.height)}for(let ot=0,Nt=ft.length;ot<Nt;ot++)J=ft[ot],ct?Dt&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,dt,U,J):e.texImage2D(i.TEXTURE_2D,ot,nt,dt,U,J);y.generateMipmaps=!1}else if(ct){if(ut){const ot=Ut(tt);e.texStorage2D(i.TEXTURE_2D,Lt,nt,ot.width,ot.height)}Dt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,dt,U,tt)}else e.texImage2D(i.TEXTURE_2D,0,nt,dt,U,tt);w(y)&&y.mipmapsAutoUpdate===!0&&S(at),_t.__version=ht.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function we(C,y,W){if(y.image.length!==6)return;const at=qt(C,y),it=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+W);const ht=n.get(it);if(it.version!==ht.__version||at===!0){e.activeTexture(i.TEXTURE0+W);const _t=jt.getPrimaries(jt.workingColorSpace),j=y.colorSpace===Zn?null:jt.getPrimaries(y.colorSpace),tt=y.colorSpace===Zn||_t===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);const dt=y.isCompressedTexture||y.image[0].isCompressedTexture,U=y.image[0]&&y.image[0].isDataTexture,nt=[];for(let St=0;St<6;St++)!dt&&!U?nt[St]=M(y.image[St],!0,s.maxCubemapSize):nt[St]=U?y.image[St].image:y.image[St],nt[St]=pt(y,nt[St]);const J=nt[0],ft=r.convert(y.format,y.colorSpace),ct=r.convert(y.type);let ut=R(y.internalFormat,ft,ct,y.normalized,y.colorSpace);const Dt=y.isVideoTexture!==!0,Lt=ht.__version===void 0||at===!0,ot=it.dataReady;let Nt=E(y,J);Vt(i.TEXTURE_CUBE_MAP,y);let Gt;if(y.isDepthTexture){if(ut=g(y.format===Jn,y.type),Lt)if(Dt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,ut,J.width,J.height);else for(let St=0;St<6;St++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ut,J.width,J.height,0,ft,ct,null)}else if(dt){Dt&&Lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Nt,ut,J.width,J.height);for(let St=0;St<6;St++){Gt=nt[St].mipmaps;for(let ne=0;ne<Gt.length;ne++){const Ee=Gt[ne];y.format!==yn?ft!==null?Dt?ot&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,ne,0,0,Ee.width,Ee.height,ft,Ee.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,ne,ut,Ee.width,Ee.height,0,Ee.data):Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,ne,0,0,Ee.width,Ee.height,ft,ct,Ee.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,ne,ut,Ee.width,Ee.height,0,ft,ct,Ee.data)}}}else{if(Gt=y.mipmaps,Dt&&Lt){Gt.length>0&&Nt++;const St=Ut(nt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Nt,ut,St.width,St.height)}for(let St=0;St<6;St++)if(U){Dt?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,0,0,nt[St].width,nt[St].height,ft,ct,nt[St].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ut,nt[St].width,nt[St].height,0,ft,ct,nt[St].data);for(let ne=0;ne<Gt.length;ne++){const mn=Gt[ne].image[St].image;Dt?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,ne+1,0,0,mn.width,mn.height,ft,ct,mn.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,ne+1,ut,mn.width,mn.height,0,ft,ct,mn.data)}}else{Dt?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,0,0,ft,ct,nt[St]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ut,ft,ct,nt[St]);for(let ne=0;ne<Gt.length;ne++){const Ee=Gt[ne];Dt?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,ne+1,0,0,ft,ct,Ee.image[St]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+St,ne+1,ut,ft,ct,Ee.image[St])}}}w(y)&&y.mipmapsAutoUpdate===!0&&S(i.TEXTURE_CUBE_MAP),ht.__version=it.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function pe(C,y,W,at,it,ht){const _t=r.convert(W.format,W.colorSpace),j=r.convert(W.type),tt=R(W.internalFormat,_t,j,W.normalized,W.colorSpace),dt=n.get(y),U=n.get(W);if(U.__renderTarget=y,!dt.__hasExternalTextures){const nt=Math.max(1,y.width>>ht),J=Math.max(1,y.height>>ht);it===i.TEXTURE_3D||it===i.TEXTURE_2D_ARRAY?e.texImage3D(it,ht,tt,nt,J,y.depth,0,_t,j,null):e.texImage2D(it,ht,tt,nt,J,0,_t,j,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),xt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,at,it,U.__webglTexture,0,ce(y)):(it===i.TEXTURE_2D||it>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,at,it,U.__webglTexture,ht),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(C,y,W){if(i.bindRenderbuffer(i.RENDERBUFFER,C),y.depthBuffer){const at=y.depthTexture,it=at&&at.isDepthTexture?at.type:null,ht=g(y.stencilBuffer,it),_t=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;xt(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce(y),ht,y.width,y.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce(y),ht,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ht,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,_t,i.RENDERBUFFER,C)}else{const at=y.textures;for(let it=0;it<at.length;it++){const ht=at[it],_t=r.convert(ht.format,ht.colorSpace),j=r.convert(ht.type),tt=R(ht.internalFormat,_t,j,ht.normalized,ht.colorSpace);xt(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce(y),tt,y.width,y.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce(y),tt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,tt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Bt(C,y,W){const at=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const it=n.get(y.depthTexture);it.__renderTarget=y;const ht=at?y.depthTexture.image[0]:y.depthTexture.image;(!it.__webglTexture||ht.width!==y.width||ht.height!==y.height)&&(ht.width=y.width,ht.height=y.height,y.depthTexture.needsUpdate=!0),at?lt(y.depthTexture,0):Z(y.depthTexture,0);const _t=it.__webglTexture,j=ce(y),tt=at?i.TEXTURE_CUBE_MAP_POSITIVE_X+W:i.TEXTURE_2D,dt=y.depthTexture.format===Jn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===ti)xt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,dt,tt,_t,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,dt,tt,_t,0);else if(y.depthTexture.format===Jn)xt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,dt,tt,_t,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,dt,tt,_t,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Oe(C){const y=n.get(C),W=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){const at=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),at){const it=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,at.removeEventListener("dispose",it)};at.addEventListener("dispose",it),y.__depthDisposeCallback=it}y.__boundDepthTexture=at}if(C.depthTexture&&!y.__autoAllocateDepthBuffer)if(W)for(let at=0;at<6;at++)Bt(y.__webglFramebuffer[at],C,at);else C.texture.mipmaps.length>0?Bt(y.__webglFramebuffer[0],C,0):Bt(y.__webglFramebuffer,C,0);else if(W){y.__webglDepthbuffer=[];for(let at=0;at<6;at++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[at]),y.__webglDepthbuffer[at]===void 0)y.__webglDepthbuffer[at]=i.createRenderbuffer(),Pe(y.__webglDepthbuffer[at],C,!1);else{const it=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=y.__webglDepthbuffer[at];i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,ht)}}else if(C.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Pe(y.__webglDepthbuffer,C,!1);else{const it=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,ht)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(C,y,W){const at=n.get(C);y!==void 0&&pe(at.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&Oe(C)}function Ve(C){const y=C.texture,W=n.get(C),at=n.get(y);C.addEventListener("dispose",I),L(C);const it=C.textures,ht=C.isWebGLCubeRenderTarget===!0,_t=it.length>1;if(_t||(at.__webglTexture===void 0&&(at.__webglTexture=i.createTexture()),at.__version=y.version,a.memory.textures++),ht){W.__webglFramebuffer=[];for(let j=0;j<6;j++)if(y.mipmaps.length>0){W.__webglFramebuffer[j]=[];for(let tt=0;tt<y.mipmaps.length;tt++)W.__webglFramebuffer[j][tt]=i.createFramebuffer()}else W.__webglFramebuffer[j]=i.createFramebuffer()}else{if(y.mipmaps.length>0){W.__webglFramebuffer=[];for(let j=0;j<y.mipmaps.length;j++)W.__webglFramebuffer[j]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(_t)for(let j=0,tt=it.length;j<tt;j++){const dt=n.get(it[j]);dt.__webglTexture===void 0&&(dt.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&xt(C)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let j=0;j<it.length;j++){const tt=it[j];W.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[j]);const dt=r.convert(tt.format,tt.colorSpace),U=r.convert(tt.type),nt=R(tt.internalFormat,dt,U,tt.normalized,tt.colorSpace,C.isXRRenderTarget===!0),J=ce(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,J,nt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,W.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),Pe(W.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ht){e.bindTexture(i.TEXTURE_CUBE_MAP,at.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,y);for(let j=0;j<6;j++)if(y.mipmaps.length>0)for(let tt=0;tt<y.mipmaps.length;tt++)pe(W.__webglFramebuffer[j][tt],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,tt);else pe(W.__webglFramebuffer[j],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);w(y)?S(i.TEXTURE_CUBE_MAP):y.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}else if(_t){for(let j=0,tt=it.length;j<tt;j++){const dt=it[j],U=n.get(dt);let nt=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(nt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(nt,U.__webglTexture),Vt(nt,dt),pe(W.__webglFramebuffer,C,dt,i.COLOR_ATTACHMENT0+j,nt,0),w(dt)&&S(nt)}e.unbindTexture()}else{let j=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(j=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(j,at.__webglTexture),Vt(j,y),y.mipmaps.length>0)for(let tt=0;tt<y.mipmaps.length;tt++)pe(W.__webglFramebuffer[tt],C,y,i.COLOR_ATTACHMENT0,j,tt);else pe(W.__webglFramebuffer,C,y,i.COLOR_ATTACHMENT0,j,0);w(y)?S(j):y.mipmaps.length>0&&i.texParameteri(j,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}C.depthBuffer&&Oe(C)}function k(C){const y=C.textures;for(let W=0,at=y.length;W<at;W++){const it=y[W];if(w(it)&&it.mipmapsAutoUpdate===!0){const ht=A(C),_t=n.get(it).__webglTexture;e.bindTexture(ht,_t),S(ht),e.unbindTexture()}}}const We=[];function le(C){if(C.samples>0){if(xt(C)===!1){const y=C.textures,W=C.width,at=C.height;let it=i.COLOR_BUFFER_BIT;const ht=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_t=n.get(C),j=y.length>1;if(j)for(let dt=0;dt<y.length;dt++)e.bindFramebuffer(i.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,_t.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,_t.__webglMultisampledFramebuffer),C.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,_t.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let dt=0;dt<y.length;dt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(it|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(it|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_t.__webglColorRenderbuffer[dt]);const U=n.get(y[dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,U,0)}i.blitFramebuffer(0,0,W,at,0,0,W,at,it,i.NEAREST),c===!0&&(We.length=0,We.push(i.COLOR_ATTACHMENT0+dt),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&We.push(ht),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,We))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let dt=0;dt<y.length;dt++){e.bindFramebuffer(i.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,_t.__webglColorRenderbuffer[dt]);const U=n.get(y[dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,_t.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,U,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,_t.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){const y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function ce(C){return Math.min(s.maxSamples,C.samples)}function xt(C){const y=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function de(C){const y=a.render.frame;u.get(C)!==y&&(u.set(C,y),C.update())}function pt(C,y){const W=C.colorSpace,at=C.format,it=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||W!==Er&&W!==Zn&&(jt.getTransfer(W)===oe?(at!==yn||it!==en)&&Ot("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):se("WebGLTextures: Unsupported texture color space:",W)),y}function Ut(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=Q,this.resetTextureUnits=q,this.getTextureUnits=et,this.setTextureUnits=gt,this.setTexture2D=Z,this.setTexture2DArray=rt,this.setTexture3D=st,this.setTextureCube=lt,this.rebindTextures=Ie,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=k,this.updateMultisampleRenderTarget=le,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=xt,this.dispose=D}function p0(i,t){function e(n,s=Zn){let r;const a=jt.getTransfer(s);if(n===en)return i.UNSIGNED_BYTE;if(n===co)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ho)return i.UNSIGNED_SHORT_5_5_5_1;if(n===fc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===pc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===uc)return i.BYTE;if(n===dc)return i.SHORT;if(n===As)return i.UNSIGNED_SHORT;if(n===lo)return i.INT;if(n===wn)return i.UNSIGNED_INT;if(n===Sn)return i.FLOAT;if(n===An)return i.HALF_FLOAT;if(n===mc)return i.ALPHA;if(n===gc)return i.RGB;if(n===yn)return i.RGBA;if(n===ti)return i.DEPTH_COMPONENT;if(n===Jn)return i.DEPTH_STENCIL;if(n===_c)return i.RED;if(n===uo)return i.RED_INTEGER;if(n===_i)return i.RG;if(n===fo)return i.RG_INTEGER;if(n===po)return i.RGBA_INTEGER;if(n===dr||n===fr||n===pr||n===mr)if(a===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===dr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===dr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ba||n===Ta||n===wa||n===Aa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ba)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ta)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Aa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ra||n===Ca||n===Pa||n===Da||n===La||n===Sr||n===Ia)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ra||n===Ca)return a===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Pa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Da)return r.COMPRESSED_R11_EAC;if(n===La)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Sr)return r.COMPRESSED_RG11_EAC;if(n===Ia)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Na||n===Ua||n===Fa||n===Oa||n===za||n===Ba||n===ka||n===Ha||n===Ga||n===Va||n===Wa||n===Xa||n===qa||n===Ya)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Na)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ua)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Oa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===za)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ba)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ka)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ha)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ga)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Va)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===qa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ya)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$a||n===Za||n===Ka)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===$a)return a===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Za)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ka)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ja||n===Qa||n===yr||n===ja)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ja)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Qa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===yr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ja)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Yi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const m0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,g0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class _0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Ic(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new vi({vertexShader:m0,fragmentShader:g0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Se(new Rr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class x0 extends si{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,_=null;const x=typeof XRWebGLBinding<"u",m=new _0,p={},M=e.getContextAttributes();let w=null,S=null;const A=[],R=[],g=new zt;let E=null,L=null;const P=new un;P.viewport=new ve;const N=new un;N.viewport=new ve;const I=[P,N],G=new Ad;let T=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let Z=A[B];return Z===void 0&&(Z=new Xr,A[B]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(B){let Z=A[B];return Z===void 0&&(Z=new Xr,A[B]=Z),Z.getGripSpace()},this.getHand=function(B){let Z=A[B];return Z===void 0&&(Z=new Xr,A[B]=Z),Z.getHandSpace()};function O(B){const Z=R.indexOf(B.inputSource);if(Z===-1)return;const rt=A[Z];rt!==void 0&&(rt.update(B.inputSource,B.frame,l||a),rt.dispatchEvent({type:B.type,data:B.inputSource}))}function F(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",$);for(let B=0;B<A.length;B++){const Z=R[B];Z!==null&&(R[B]=null,A[B].disconnect(Z))}T=null,D=null,m.reset();for(const B in p)delete p[B];if(t.setRenderTarget(w),f=null,h=null,d=null,s=null,S=null,Q.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(g.width,g.height,!1),L!==null){const B=L.camera;B.fov=L.fov,B.zoom=L.zoom,B.updateProjectionMatrix(),L=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){r=B,n.isPresenting===!0&&Ot("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){o=B,n.isPresenting===!0&&Ot("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(B){l=B},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(B){if(s=B,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",F),s.addEventListener("inputsourceschange",$),M.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(g),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let rt=null,st=null,lt=null;M.depth&&(lt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=M.stencil?Jn:ti,st=M.stencil?Yi:wn);const It={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(It),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new Tn(h.textureWidth,h.textureHeight,{format:yn,type:en,depthTexture:new $i(h.textureWidth,h.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const rt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Tn(f.framebufferWidth,f.framebufferHeight,{format:yn,type:en,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Q.setContext(s),Q.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function $(B){for(let Z=0;Z<B.removed.length;Z++){const rt=B.removed[Z],st=R.indexOf(rt);st>=0&&(R[st]=null,A[st].disconnect(rt))}for(let Z=0;Z<B.added.length;Z++){const rt=B.added[Z];let st=R.indexOf(rt);if(st===-1){for(let It=0;It<A.length;It++)if(It>=R.length){R.push(rt),st=It;break}else if(R[It]===null){R[It]=rt,st=It;break}if(st===-1)break}const lt=A[st];lt&&lt.connect(rt)}}function H(B,Z){Z===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(Z.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(s===null)return;let Z=B.near,rt=B.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(rt=m.depthFar)),G.near=N.near=P.near=Z,G.far=N.far=P.far=rt,(T!==G.near||D!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),T=G.near,D=G.far),G.layers.mask=B.layers.mask|6,P.layers.mask=G.layers.mask&-5,N.layers.mask=G.layers.mask&-3;const st=B.parent,lt=G.cameras;H(G,st);for(let It=0;It<lt.length;It++)H(lt[It],st);G.projectionMatrix.copy(P.projectionMatrix),G.projectionMatrixInverse.copy(P.projectionMatrixInverse),L===null&&B.isPerspectiveCamera&&(L={camera:B,fov:B.fov,zoom:B.zoom}),q(B,G,st)};function q(B,Z,rt){rt===null?B.matrix.copy(Z.matrixWorld):(B.matrix.copy(rt.matrixWorld),B.matrix.invert(),B.matrix.multiply(Z.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(Z.projectionMatrix),B.projectionMatrixInverse.copy(Z.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=Cs*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(B){c=B,h!==null&&(h.fixedFoveation=B),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=B)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(G)},this.getCameraTexture=function(B){return p[B]};let et=null;function gt(B,Z){if(u=Z.getViewerPose(l||a),_=Z,u!==null){const rt=u.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let st=!1;rt.length!==G.cameras.length&&(G.cameras.length=0,st=!0);for(let Tt=0;Tt<rt.length;Tt++){const Vt=rt[Tt];let qt=null;if(f!==null)qt=f.getViewport(Vt);else{const ue=d.getViewSubImage(h,Vt);qt=ue.viewport,Tt===0&&(t.setRenderTargetTextures(S,ue.colorTexture,ue.depthStencilTexture),t.setRenderTarget(S))}let Ft=I[Tt];Ft===void 0&&(Ft=new un,Ft.layers.enable(Tt),Ft.viewport=new ve,I[Tt]=Ft),Ft.matrix.fromArray(Vt.transform.matrix),Ft.matrix.decompose(Ft.position,Ft.quaternion,Ft.scale),Ft.projectionMatrix.fromArray(Vt.projectionMatrix),Ft.projectionMatrixInverse.copy(Ft.projectionMatrix).invert(),Ft.viewport.set(qt.x,qt.y,qt.width,qt.height),Tt===0&&(G.matrix.copy(Ft.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),st===!0&&G.cameras.push(Ft)}const lt=s.enabledFeatures;if(lt&&lt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();const Tt=d.getDepthInformation(rt[0]);Tt&&Tt.isValid&&Tt.texture&&m.init(Tt,s.renderState)}if(lt&&lt.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let Tt=0;Tt<rt.length;Tt++){const Vt=rt[Tt].camera;if(Vt){let qt=p[Vt];qt||(qt=new Ic,p[Vt]=qt);const Ft=d.getCameraImage(Vt);qt.sourceTexture=Ft}}}}for(let rt=0;rt<A.length;rt++){const st=R[rt],lt=A[rt];st!==null&&lt!==void 0&&lt.update(st,Z,l||a)}et&&et(B,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),_=null}const Q=new zc;Q.setAnimationLoop(gt),this.setAnimationLoop=function(B){et=B},this.dispose=function(){}}}const v0=new me,$c=new kt;$c.set(-1,0,0,0,1,0,0,0,1);function M0(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Nc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,w,S){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,M,w):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Qe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Qe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),w=M.envMap,S=M.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(v0.makeRotationFromEuler(S)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply($c),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=w*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.diffuseRoughness>0&&(m.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=p.diffuseRoughnessMap,e(p.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Qe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function S0(i,t,e,n){let s={},r={};function a(M,w){const S=w.program;n.uniformBlockBinding(M,S,s[M.id])}function o(M,w){let S=s[M.id];S===void 0&&(_(M),S=c(M),s[M.id]=S,M.addEventListener("dispose",m));const A=w.program;n.updateUBOMapping(M,A);const R=t.render.frame;r[M.id]!==R&&(l(M),r[M.id]=R)}function c(M){const w=i.createBuffer(),S=M.__size,A=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,S,A),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function l(M){const w=s[M.id],S=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let R=0,g=S.length;R<g;R++){const E=S[R];if(Array.isArray(E))for(let L=0,P=E.length;L<P;L++)u(E[L],R,L,A);else u(E,R,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(M,w,S,A){if(h(M,w,S,A)===!0){const R=M.__offset,g=M.value;if(Array.isArray(g)){let E=0;for(let L=0;L<g.length;L++){const P=g[L],N=x(P,!0);d(P,M.__data,E),E+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else d(g,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,R,M.__data)}}function d(M,w,S){typeof M=="number"||typeof M=="boolean"?w[S]=M:M.isMatrix3?(w[S]=M.elements[0],w[S+1]=M.elements[1],w[S+2]=M.elements[2],w[S+3]=0,w[S+4]=M.elements[3],w[S+5]=M.elements[4],w[S+6]=M.elements[5],w[S+7]=0,w[S+8]=M.elements[6],w[S+9]=M.elements[7],w[S+10]=M.elements[8],w[S+11]=0):ArrayBuffer.isView(M)?w.set(M.subarray(0,w.length-S),S):M.toArray(w,S)}function h(M,w,S,A){const R=M.value,g=w+"_"+S;if(Array.isArray(R)){A[g]===void 0&&(A[g]=[]);const E=A[g];let L=!1;for(let P=0;P<R.length;P++)f(R[P],E,P)===!0&&(L=!0);return L}return f(R,A,g)}function f(M,w,S){if(w[S]===void 0)return typeof M=="number"||typeof M=="boolean"?w[S]=M:ArrayBuffer.isView(M)?w[S]=M.slice():w[S]=M.clone(),!0;{const A=w[S];if(typeof M=="number"||typeof M=="boolean"){if(A!==M)return w[S]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(A.equals(M)===!1)return A.copy(M),!0}}return!1}function _(M){const w=M.uniforms;let S=0;const A=16;for(let g=0,E=w.length;g<E;g++){const L=Array.isArray(w[g])?w[g]:[w[g]];for(let P=0,N=L.length;P<N;P++){const I=L[P],G=Array.isArray(I.value)?I.value:[I.value],T=Array.isArray(w[g])||Array.isArray(I.value);let D=S;for(let F=0,$=G.length;F<$;F++){const H=G[F],q=x(H,T),et=S%A,gt=et%q.boundary,Q=et+gt;S+=gt,Q!==0&&A-Q<q.storage&&(S+=A-Q),F===0&&(D=S),S+=q.storage}const O=I.type==="int"?Int32Array:I.type==="uint"?Uint32Array:Float32Array;I.__data=new O((S-D)/Float32Array.BYTES_PER_ELEMENT),I.__offset=D}}const R=S%A;return R>0&&(S+=A-R),M.__size=S,M.__cache={},this}function x(M,w){const S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=16,S.storage=48):M.isMatrix4?(S.boundary=16,S.storage=64):M.isTexture?Ot("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(S.boundary=16,S.storage=M.byteLength):Ot("WebGLRenderer: Unsupported uniform value type.",M),w===!0&&(S.boundary=16,S.storage=Math.ceil(S.storage/16)*16),S}function m(M){const w=M.target;w.removeEventListener("dispose",m),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);s={},r={}}return{bind:a,update:o,dispose:p}}const y0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let vn=null;function E0(){return vn===null&&(vn=new md(y0,16,16,_i,An),vn.name="DFG_LUT",vn.minFilter=Je,vn.magFilter=Je,vn.wrapS=zn,vn.wrapT=zn,vn.generateMipmaps=!1,vn.needsUpdate=!0),vn}class b0{constructor(t={}){const{canvas:e=Pu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=en}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const x=f,m=new Set([po,fo,uo]),p=new Set([en,wn,As,Yi,co,ho]),M=new Uint32Array(4),w=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]};let A=null,R=null;const g=[],E=[];let L=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let N=!1,I=null,G=null,T=null,D=null;this._outputColorSpace=sn;let O=0,F=0,$=null,H=-1,q=null;const et=new ve,gt=new ve;let Q=null;const B=new Zt(0);let Z=0,rt=e.width,st=e.height,lt=1,It=null,Kt=null;const Tt=new ve(0,0,rt,st),Vt=new ve(0,0,rt,st);let qt=!1;const Ft=new Ps,ue=new So;let _e=!1,we=!1;const pe=new me,Pe=new V,Bt=new ve,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ie=!1;function Ve(){return $===null?lt:1}let k=n;function We(b,z){return e.getContext(b,z)}let le,ce,xt,de,pt,Ut,C,y,W,at,it,ht,_t,j,tt,dt,U,nt,J,ft,ct,ut,Dt;try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${oo}`),e.addEventListener("webglcontextlost",Nt,!1),e.addEventListener("webglcontextrestored",Gt,!1),e.addEventListener("webglcontextcreationerror",St,!1),k===null){const z="webgl2";if(k=We(z,b),k===null)throw We(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Lt()}catch(b){throw e.removeEventListener("webglcontextlost",Nt,!1),e.removeEventListener("webglcontextrestored",Gt,!1),e.removeEventListener("webglcontextcreationerror",St,!1),se("WebGLRenderer: "+b.message),b}function Lt(){le=new Am(k),le.init(),ct=new p0(k,le),ce=new gm(k,le,t,ct),xt=new d0(k,le),ce.reversedDepthBuffer&&h&&xt.buffers.depth.setReversed(!0),G=k.createFramebuffer(),T=k.createFramebuffer(),D=k.createFramebuffer(),de=new Pm(k),pt=new Qg,Ut=new f0(k,le,xt,pt,ce,ct,de),C=new wm(P),y=new Dd(k),ut=new pm(k,y),W=new Rm(k,y,de,ut),at=new Lm(k,W,y,ut,de),nt=new Dm(k,ce,Ut),tt=new _m(pt),it=new Jg(P,C,le,ce,ut,tt),ht=new M0(P,pt),_t=new t0,j=new a0(le),U=new fm(P,C,xt,at,_,c),dt=new u0(P,at,ce),Dt=new S0(k,de,ce,xt),J=new mm(k,le,de),ft=new Cm(k,le,de),de.programs=it.programs,P.capabilities=ce,P.extensions=le,P.properties=pt,P.renderLists=_t,P.shadowMap=dt,P.state=xt,P.info=de}x!==en&&(L=new Nm(x,e.width,e.height,o,s,r));const ot=new x0(P,k);this.xr=ot,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const b=le.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=le.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return lt},this.setPixelRatio=function(b){b!==void 0&&(lt=b,this.setSize(rt,st,!1))},this.getSize=function(b){return b.set(rt,st)},this.setSize=function(b,z,K=!0){if(ot.isPresenting){Ot("WebGLRenderer: Can't change size while VR device is presenting.");return}rt=b,st=z,e.width=Math.floor(b*lt),e.height=Math.floor(z*lt),K===!0&&(e.style.width=b+"px",e.style.height=z+"px"),L!==null&&L.setSize(e.width,e.height),this.setViewport(0,0,b,z)},this.getDrawingBufferSize=function(b){return b.set(rt*lt,st*lt).floor()},this.setDrawingBufferSize=function(b,z,K){rt=b,st=z,lt=K,e.width=Math.floor(b*K),e.height=Math.floor(z*K),this.setViewport(0,0,b,z)},this.setEffects=function(b){if(x===en){se("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let z=0;z<b.length;z++)if(b[z].isOutputPass===!0){Ot("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(et)},this.getViewport=function(b){return b.copy(Tt)},this.setViewport=function(b,z,K,X){b.isVector4?Tt.set(b.x,b.y,b.z,b.w):Tt.set(b,z,K,X),xt.viewport(et.copy(Tt).multiplyScalar(Ve()).round())},this.getScissor=function(b){return b.copy(Vt)},this.setScissor=function(b,z,K,X){b.isVector4?Vt.set(b.x,b.y,b.z,b.w):Vt.set(b,z,K,X),xt.scissor(gt.copy(Vt).multiplyScalar(Ve()).round())},this.getScissorTest=function(){return qt},this.setScissorTest=function(b){xt.setScissorTest(qt=b)},this.setOpaqueSort=function(b){It=b},this.setTransparentSort=function(b){Kt=b},this.getClearColor=function(b){return b.copy(U.getClearColor())},this.setClearColor=function(){U.setClearColor(...arguments)},this.getClearAlpha=function(){return U.getClearAlpha()},this.setClearAlpha=function(){U.setClearAlpha(...arguments)},this.clear=function(b=!0,z=!0,K=!0){let X=0;if(b){let Y=!1;if($!==null){const Mt=$.texture.format;Y=m.has(Mt)}if(Y){const Mt=$.texture.type,wt=p.has(Mt),vt=U.getClearColor(),Et=U.getClearAlpha(),Pt=vt.r,Ht=vt.g,Yt=vt.b;wt?(M[0]=Pt,M[1]=Ht,M[2]=Yt,M[3]=Et,k.clearBufferuiv(k.COLOR,0,M)):(w[0]=Pt,w[1]=Ht,w[2]=Yt,w[3]=Et,k.clearBufferiv(k.COLOR,0,w))}else X|=k.COLOR_BUFFER_BIT}z&&(X|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(X|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&k.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),I=b},this.dispose=function(){e.removeEventListener("webglcontextlost",Nt,!1),e.removeEventListener("webglcontextrestored",Gt,!1),e.removeEventListener("webglcontextcreationerror",St,!1),U.dispose(),_t.dispose(),j.dispose(),Ut.dispose(),pt.dispose(),C.dispose(),at.dispose(),W.dispose(),ut.dispose(),Dt.dispose(),it.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",Si),ot.removeEventListener("sessionend",ns),gn.stop()};function Nt(b){b.preventDefault(),Wo("WebGLRenderer: Context Lost."),N=!0}function Gt(){Wo("WebGLRenderer: Context Restored."),N=!1;const b=de.autoReset,z=dt.enabled,K=dt.autoUpdate,X=dt.needsUpdate,Y=dt.type;Lt(),de.autoReset=b,dt.enabled=z,dt.autoUpdate=K,dt.needsUpdate=X,dt.type=Y}function St(b){se("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ne(b){const z=b.target;z.removeEventListener("dispose",ne),Ee(z)}function Ee(b){mn(b),pt.remove(b)}function mn(b){const z=pt.get(b).programs;z!==void 0&&(z.forEach(function(K){it.releaseProgram(K)}),b.isShaderMaterial&&it.releaseShaderCache(b))}this.renderBufferDirect=function(b,z,K,X,Y,Mt){z===null&&(z=Oe);const wt=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,vt=Os(b,z,K,X,Y);xt.setMaterial(X,wt);let Et=K.index,Pt=1;if(X.wireframe===!0){if(Et=W.getWireframeAttribute(K),Et===void 0)return;Pt=2}const Ht=K.drawRange,Yt=K.attributes.position;let At=Ht.start*Pt,$t=(Ht.start+Ht.count)*Pt;Mt!==null&&(At=Math.max(At,Mt.start*Pt),$t=Math.min($t,(Mt.start+Mt.count)*Pt)),Et!==null?(At=Math.max(At,0),$t=Math.min($t,Et.count)):Yt!=null&&(At=Math.max(At,0),$t=Math.min($t,Yt.count));const be=$t-At;if(be<0||be===1/0)return;ut.setup(Y,X,vt,K,Et);let fe,he=J;if(Et!==null&&(fe=y.get(Et),he=ft,he.setIndex(fe)),Y.isMesh)X.wireframe===!0?(xt.setLineWidth(X.wireframeLinewidth*Ve()),he.setMode(k.LINES)):he.setMode(k.TRIANGLES);else if(Y.isLine){let Be=X.linewidth;Be===void 0&&(Be=1),xt.setLineWidth(Be*Ve()),Y.isLineSegments?he.setMode(k.LINES):Y.isLineLoop?he.setMode(k.LINE_LOOP):he.setMode(k.LINE_STRIP)}else Y.isPoints?he.setMode(k.POINTS):Y.isSprite&&he.setMode(k.TRIANGLES);if(Y.isBatchedMesh)if(le.get("WEBGL_multi_draw"))he.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Be=Y._multiDrawStarts,Rt=Y._multiDrawCounts,Xe=Y._multiDrawCount,ie=Et?y.get(Et).bytesPerElement:1,ri=pt.get(X).currentProgram.getUniforms();for(let ke=0;ke<Xe;ke++)ri.setValue(k,"_gl_DrawID",ke),he.render(Be[ke]/ie,Rt[ke])}else if(Y.isInstancedMesh)he.renderInstances(At,be,Y.count);else if(K.isInstancedBufferGeometry){const Be=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Rt=Math.min(K.instanceCount,Be);he.renderInstances(At,be,Rt)}else he.render(At,be)};function Us(b,z,K,X){I!==null&&b.isNodeMaterial&&I.setObject(X,b),_e===!0&&tt.setState(b,K,!1),b.transparent===!0&&b.side===dn&&b.forceSinglePass===!1?(b.side=Qe,b.needsUpdate=!0,ae(b,z,X),b.side=gi,b.needsUpdate=!0,ae(b,z,X),b.side=dn):ae(b,z,X)}this.compile=function(b,z,K=null){K===null&&(K=b),I!==null&&I.renderStart(b,z,K),R=j.get(K),R.init(z),E.push(R),K.traverseVisible(function(Y){Y.isLight&&Y.layers.test(z.layers)&&(R.pushLight(Y),Y.castShadow&&R.pushShadow(Y))}),b!==K&&b.traverseVisible(function(Y){Y.isLight&&Y.layers.test(z.layers)&&(R.pushLight(Y),Y.castShadow&&R.pushShadow(Y))}),R.setupLights(),I!==null&&I.updateLights(R.state.lightsArray),we=this.localClippingEnabled,_e=tt.init(this.clippingPlanes,we),_e===!0&&tt.setGlobalState(this.clippingPlanes,z),I!==null&&dt.render(R.state.shadowsArray,K,z);const X=new Set;return b.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const Mt=Y.material;if(Mt)if(Array.isArray(Mt))for(let wt=0;wt<Mt.length;wt++){const vt=Mt[wt];Us(vt,K,z,Y),X.add(vt)}else Us(Mt,K,z,Y),X.add(Mt)}),R=E.pop(),I!==null&&I.renderEnd(),X},this.compileAsync=function(b,z,K=null){const X=this.compile(b,z,K);return new Promise(Y=>{function Mt(){if(X.forEach(function(wt){const Et=pt.get(wt).currentProgram;(Et===void 0||Et.isReady())&&X.delete(wt)}),X.size===0){Y(b);return}setTimeout(Mt,10)}le.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let es=null;function Fs(b){es&&es(b)}function Si(){gn.stop()}function ns(){gn.start()}const gn=new zc;gn.setAnimationLoop(Fs),typeof self<"u"&&gn.setContext(self),this.setAnimationLoop=function(b){es=b,ot.setAnimationLoop(b),b===null?gn.stop():gn.start()},ot.addEventListener("sessionstart",Si),ot.addEventListener("sessionend",ns),this.render=function(b,z){if(z!==void 0&&z.isCamera!==!0){se("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;I!==null&&I.renderStart(b,z);const K=ot.enabled===!0&&ot.isPresenting===!0,X=L!==null&&($===null||K)&&L.begin(P,$);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(z),z=ot.getCamera()),b.isScene===!0&&b.onBeforeRender(P,b,z,$),R=j.get(b,E.length),R.init(z),R.state.textureUnits=Ut.getTextureUnits(),E.push(R),pe.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),z.isArrayCamera?ue.setFromArrayCamera(z):Ft.setFromProjectionMatrix(pe,pn,z.reversedDepth),we=this.localClippingEnabled,_e=tt.init(this.clippingPlanes,we),A=_t.get(b,g.length),A.init(),g.push(A),this.info.render.frame++,ot.enabled===!0&&ot.isPresenting===!0){const wt=P.xr.getDepthSensingMesh();wt!==null&&yi(wt,z,-1/0,P.sortObjects)}yi(b,z,0,P.sortObjects),A.finish(),I!==null&&I.updateLights(R.state.lightsArray),P.sortObjects===!0&&A.sort(It,Kt),Ie=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,Ie&&U.addToRenderList(A,b),this.info.autoReset===!0&&this.info.reset(),_e===!0&&tt.beginShadows();const Y=R.state.shadowsArray;if(dt.render(Y,b,z),_e===!0&&tt.endShadows(),(X&&L.hasRenderPass())===!1){const wt=A.opaque,vt=A.transmissive;if(R.setupLights(),z.isArrayCamera){const Et=z.cameras;if(vt.length>0)for(let Pt=0,Ht=Et.length;Pt<Ht;Pt++){const Yt=Et[Pt];mt(wt,vt,b,Yt)}Ie&&U.render(b);for(let Pt=0,Ht=Et.length;Pt<Ht;Pt++){const Yt=Et[Pt];is(A,b,Yt,Yt.viewport)}}else vt.length>0&&mt(wt,vt,b,z),Ie&&U.render(b),is(A,b,z)}$!==null&&F===0&&(Ut.updateMultisampleRenderTarget($),Ut.updateRenderTargetMipmap($)),X&&L.end(P),b.isScene===!0&&b.onAfterRender(P,b,z),ut.resetDefaultState(),H=-1,q=null,E.pop(),E.length>0?(R=E[E.length-1],Ut.setTextureUnits(R.state.textureUnits),_e===!0&&tt.setGlobalState(P.clippingPlanes,R.state.camera)):R=null,g.pop(),g.length>0?A=g[g.length-1]:A=null,I!==null&&I.renderEnd()};function yi(b,z,K,X){if(b.visible===!1)return;if(b.layers.test(z.layers)){if(b.isGroup)K=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(z);else if(b.isLight)R.pushLight(b),b.castShadow&&R.pushShadow(b);else if(b.isSprite){const wt=z.isArrayCamera?ue:Ft;if(!b.frustumCulled||b.intersectsFrustum(wt)){X&&Bt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(pe);const vt=at.update(b),Et=b.material;Et.visible&&A.push(b,vt,Et,K,Bt.z,null,z)}}else if(b.isMesh||b.isLine||b.isPoints){const wt=z.isArrayCamera?ue:Ft;if(!b.frustumCulled||b.intersectsFrustum(wt)){const vt=at.update(b),Et=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Bt.copy(b.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Bt.copy(vt.boundingSphere.center)),Bt.applyMatrix4(b.matrixWorld).applyMatrix4(pe)),Array.isArray(Et)){const Pt=vt.groups;for(let Ht=0,Yt=Pt.length;Ht<Yt;Ht++){const At=Pt[Ht],$t=Et[At.materialIndex];$t&&$t.visible&&A.push(b,vt,$t,K,Bt.z,At,z)}}else Et.visible&&A.push(b,vt,Et,K,Bt.z,null,z)}}}const Mt=b.children;for(let wt=0,vt=Mt.length;wt<vt;wt++)yi(Mt[wt],z,K,X)}function is(b,z,K,X){const{opaque:Y,transmissive:Mt,transparent:wt}=b;R.setupLightsView(K),_e===!0&&tt.setGlobalState(P.clippingPlanes,K),X&&xt.viewport(et.copy(X)),Y.length>0&&Ct(Y,z,K),Mt.length>0&&Ct(Mt,z,K),wt.length>0&&Ct(wt,z,K),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function mt(b,z,K,X){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[X.id]===void 0){const At=le.has("EXT_color_buffer_half_float")||le.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[X.id]=new Tn(1,1,{generateMipmaps:!0,type:At?An:en,minFilter:Kn,samples:Math.max(4,ce.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:jt.workingColorSpace})}const Mt=R.state.transmissionRenderTarget[X.id],wt=X.viewport||et;Mt.setSize(wt.z*P.transmissionResolutionScale,wt.w*P.transmissionResolutionScale);const vt=P.getRenderTarget(),Et=P.getActiveCubeFace(),Pt=P.getActiveMipmapLevel();P.setRenderTarget(Mt),P.getClearColor(B),Z=P.getClearAlpha(),Z<1&&P.setClearColor(16777215,.5),P.clear(),Ie&&U.render(K);const Ht=P.toneMapping;P.toneMapping=Bn;const Yt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),R.setupLightsView(X),_e===!0&&tt.setGlobalState(P.clippingPlanes,X),Ct(b,K,X),Ut.updateMultisampleRenderTarget(Mt),Ut.updateRenderTargetMipmap(Mt),le.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let $t=0,be=z.length;$t<be;$t++){const fe=z[$t],{object:he,geometry:Be,material:Rt,group:Xe}=fe;if(Rt.side===dn&&he.layers.test(X.layers)){const ie=Rt.side;Rt.side=Qe,Rt.needsUpdate=!0,Jt(he,K,X,Be,Rt,Xe),Rt.side=ie,Rt.needsUpdate=!0,At=!0}}At===!0&&(Ut.updateMultisampleRenderTarget(Mt),Ut.updateRenderTargetMipmap(Mt))}P.setRenderTarget(vt,Et,Pt),P.setClearColor(B,Z),Yt!==void 0&&(X.viewport=Yt),P.toneMapping=Ht}function Ct(b,z,K){const X=z.isScene===!0?z.overrideMaterial:null;for(let Y=0,Mt=b.length;Y<Mt;Y++){const wt=b[Y],{object:vt,geometry:Et,group:Pt}=wt;let Ht=wt.material;Ht.allowOverride===!0&&X!==null&&(Ht=X),vt.layers.test(K.layers)&&Jt(vt,z,K,Et,Ht,Pt)}}function Jt(b,z,K,X,Y,Mt){I!==null&&Y.isNodeMaterial&&I.setObject(b,Y),b.onBeforeRender(P,z,K,X,Y,Mt),b.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),Y.onBeforeRender(P,z,K,X,b,Mt),Y.transparent===!0&&Y.side===dn&&Y.forceSinglePass===!1?(Y.side=Qe,Y.needsUpdate=!0,P.renderBufferDirect(K,z,X,Y,b,Mt),Y.side=gi,Y.needsUpdate=!0,P.renderBufferDirect(K,z,X,Y,b,Mt),Y.side=dn):P.renderBufferDirect(K,z,X,Y,b,Mt),b.onAfterRender(P,z,K,X,Y,Mt)}function te(b){let z=0;for(const K of b)K.texture!==null&&z++;return z}function ae(b,z,K){z.isScene!==!0&&(z=Oe);const X=pt.get(b),Y=R.state.lights,Mt=R.state.shadowsArray,wt=Y.state.version,vt=it.getParameters(b,Y.state,Mt,z,K,R.state.lightProbeGridArray),Et=it.getProgramCacheKey(vt);let Pt=X.programs;X.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?z.environment:null,X.fog=z.fog;const Ht=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;X.envMap=C.get(b.envMap||X.environment,Ht),X.envMapRotation=X.environment!==null&&b.envMap===null?z.environmentRotation:b.envMapRotation,Pt===void 0&&(b.addEventListener("dispose",ne),Pt=new Map,X.programs=Pt,X.programVariants=new Map);let Yt=Pt.get(Et);if(Yt!==void 0){if(X.currentProgram===Yt&&X.lightsStateVersion===wt)return _n(b,vt),Yt}else vt.uniforms=it.getUniforms(b),I!==null&&b.isNodeMaterial&&I.build(b,K,vt),b.onBeforeCompile(vt,P),Yt=it.acquireProgram(vt,Et),Pt.set(Et,Yt),X.uniforms=vt.uniforms;const At=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(At.clippingPlanes=tt.uniform),_n(b,vt),X.needsLights=ye(b),X.lightsStateVersion=wt,X.needsLights&&(At.ambientLightColor.value=Y.state.ambient,At.lightProbe.value=Y.state.probe,At.sunLights.value=Y.state.sun,At.sunLightShadows.value=Y.state.sunShadow,At.directionalLights.value=Y.state.directional,At.directionalLightShadows.value=Y.state.directionalShadow,At.spotLights.value=Y.state.spot,At.spotLightShadows.value=Y.state.spotShadow,At.rectAreaLights.value=Y.state.rectArea,At.ltc_1.value=Y.state.rectAreaLTC1,At.ltc_2.value=Y.state.rectAreaLTC2,At.pointLights.value=Y.state.point,At.pointLightShadows.value=Y.state.pointShadow,At.hemisphereLights.value=Y.state.hemi,At.sunShadowMatrix.value=Y.state.sunShadowMatrix,At.sunShadowCascade.value=Y.state.sunShadowCascade,At.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,At.spotLightMatrix.value=Y.state.spotLightMatrix,At.spotLightMap.value=Y.state.spotLightMap,At.pointShadowMatrix.value=Y.state.pointShadowMatrix),X.numLightProbeGrids=te(R.state.lightProbeGridArray),X.currentProgram=Yt,X.uniformsList=null,Yt}function Me(b,z,K,X,Y){const Mt=pt.get(b),wt=Mt.currentProgram.id+","+X+","+Y;let vt=Mt.programVariants.get(wt);return vt===void 0?(vt=ae(b,z,K),Mt.programVariants.set(wt,vt)):(Mt.currentProgram=vt,Mt.uniformsList=null,Mt.outputColorSpace=X,Mt.toneMapping=Y),vt}function ze(b){if(b.uniformsList===null){const z=b.currentProgram.getUniforms();b.uniformsList=xr.seqWithValue(z.seq,b.uniforms)}return b.uniformsList}function _n(b,z){const K=pt.get(b);K.outputColorSpace=z.outputColorSpace,K.batching=z.batching,K.batchingColor=z.batchingColor,K.instancing=z.instancing,K.instancingColor=z.instancingColor,K.instancingMorph=z.instancingMorph,K.skinning=z.skinning,K.morphTargets=z.morphTargets,K.morphNormals=z.morphNormals,K.morphColors=z.morphColors,K.morphTargetsCount=z.morphTargetsCount,K.numClippingPlanes=z.numClippingPlanes,K.numIntersection=z.numClipIntersection,K.vertexAlphas=z.vertexAlphas,K.vertexTangents=z.vertexTangents,K.toneMapping=z.toneMapping}function Os(b,z,K,X,Y){z.isScene!==!0&&(z=Oe),Ut.resetTextureUnits();const Mt=z.fog,wt=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?z.environment:null,vt=$===null?P.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:jt.workingColorSpace,Et=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Pt=C.get(X.envMap||wt,Et),Ht=X.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Yt=!!K.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),At=!!K.morphAttributes.position,$t=!!K.morphAttributes.normal,be=!!K.morphAttributes.color;let fe=Bn;X.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(fe=P.toneMapping);const he=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Be=he!==void 0?he.length:0,Rt=pt.get(X),Xe=R.state.lights;if(_e===!0&&(we===!0||b!==q)){const xe=b===q&&X.id===H;tt.setState(X,b,xe)}let ie=!1,ri=!1;X.version===Rt.__version?Rt.needsLights&&Rt.lightsStateVersion!==Xe.state.version||Y.isBatchedMesh&&Rt.batching===!1||!Y.isBatchedMesh&&Rt.batching===!0||Y.isBatchedMesh&&Rt.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&Rt.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&Rt.instancing===!1||!Y.isInstancedMesh&&Rt.instancing===!0||Y.isSkinnedMesh&&Rt.skinning===!1||!Y.isSkinnedMesh&&Rt.skinning===!0||Y.isInstancedMesh&&Rt.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Rt.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Rt.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Rt.instancingMorph===!1&&Y.morphTexture!==null||Rt.envMap!==Pt||X.fog===!0&&Rt.fog!==Mt||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==tt.numPlanes||Rt.numIntersection!==tt.numIntersection)||Rt.vertexAlphas!==Ht||Rt.vertexTangents!==Yt||Rt.morphTargets!==At||Rt.morphNormals!==$t||Rt.morphColors!==be||Rt.morphTargetsCount!==Be||Rt.numLightProbeGrids!==te(R.state.lightProbeGridArray)?ie=!0:(Rt.outputColorSpace!==vt||Rt.toneMapping!==fe)&&(ri=!0):(ie=!0,Rt.__version=X.version);let ke=Rt.currentProgram;(ie===!0||ri===!0)&&(ke=ri===!0?Me(X,z,Y,vt,fe):ae(X,z,Y),I&&X.isNodeMaterial&&I.onUpdateProgram(X,ke,Rt));let Bs=!1,Gn=!1,ai=!1;const ee=ke.getUniforms(),Ne=Rt.uniforms;if(xt.useProgram(ke.program)&&(Bs=!0,Gn=!0,ai=!0),X.id!==H&&(H=X.id,Gn=!0),Bs||q!==b){xt.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ee.setValue(k,"projectionMatrix",b.projectionMatrix),ee.setValue(k,"viewMatrix",b.matrixWorldInverse);const De=ee.map.cameraPosition;De!==void 0&&De.setValue(k,Pe.setFromMatrixPosition(b.matrixWorld)),ce.logarithmicDepthBuffer&&ee.setValue(k,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&ee.setValue(k,"isOrthographic",b.isOrthographicCamera===!0),q!==b&&(q=b,Gn=!0,ai=!0)}if(Rt.needsLights&&(Xe.state.sunShadowMap.length>0&&ee.setValue(k,"sunShadowMap",Xe.state.sunShadowMap,Ut),Xe.state.directionalShadowMap.length>0&&ee.setValue(k,"directionalShadowMap",Xe.state.directionalShadowMap,Ut),Xe.state.spotShadowMap.length>0&&ee.setValue(k,"spotShadowMap",Xe.state.spotShadowMap,Ut),Xe.state.pointShadowMap.length>0&&ee.setValue(k,"pointShadowMap",Xe.state.pointShadowMap,Ut)),Y.isSkinnedMesh){ee.setOptional(k,Y,"bindMatrix"),ee.setOptional(k,Y,"bindMatrixInverse");const xe=Y.skeleton;xe&&(xe.boneTexture===null&&xe.computeBoneTexture(),ee.setValue(k,"boneTexture",xe.boneTexture,Ut))}Y.isBatchedMesh&&(ee.setOptional(k,Y,"batchingTexture"),ee.setValue(k,"batchingTexture",Y._matricesTexture,Ut),ee.setOptional(k,Y,"batchingIdTexture"),ee.setValue(k,"batchingIdTexture",Y._indirectTexture,Ut),ee.setOptional(k,Y,"batchingColorTexture"),Y._colorsTexture!==null&&ee.setValue(k,"batchingColorTexture",Y._colorsTexture,Ut));const an=K.morphAttributes;if((an.position!==void 0||an.normal!==void 0||an.color!==void 0)&&nt.update(Y,K,ke),(Gn||Rt.receiveShadow!==Y.receiveShadow)&&(Rt.receiveShadow=Y.receiveShadow,ee.setValue(k,"receiveShadow",Y.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&z.environment!==null&&(Ne.envMapIntensity.value=z.environmentIntensity),Ne.dfgLUT!==void 0&&(Ne.dfgLUT.value=E0()),Gn){if(ee.setValue(k,"toneMappingExposure",P.toneMappingExposure),Rt.needsLights&&zs(Ne,ai),Mt&&X.fog===!0&&ht.refreshFogUniforms(Ne,Mt),ht.refreshMaterialUniforms(Ne,X,lt,st,R.state.transmissionRenderTarget[b.id]),Rt.needsLights&&Rt.numLightProbeGrids>0){const xe=S;let De=0;for(const Cn of R.state.lightProbeGridArray)Cn.texture!==null&&(xe.textures[De]=Cn.texture,xe.min[De]=Cn.boundingBox.min,xe.max[De]=Cn.boundingBox.max,xe.resolution[De]=Cn.resolution,De++);for(const Cn in xe)xe[Cn].length=De;Ne.probesSH.value=xe.textures,Ne.probesMin.value=xe.min,Ne.probesMax.value=xe.max,Ne.probesResolution.value=xe.resolution}xr.upload(k,ze(Rt),Ne,Ut)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(xr.upload(k,ze(Rt),Ne,Ut),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&ee.setValue(k,"center",Y.center),ee.setValue(k,"modelViewMatrix",Y.modelViewMatrix),ee.setValue(k,"normalMatrix",Y.normalMatrix),ee.setValue(k,"modelMatrix",Y.matrixWorld),X.uniformsGroups!==void 0){const xe=X.uniformsGroups;for(let De=0,Cn=xe.length;De<Cn;De++){const No=xe[De];Dt.update(No,ke),Dt.bind(No,ke)}}return ke}function zs(b,z){b.ambientLightColor.needsUpdate=z,b.lightProbe.needsUpdate=z,b.sunLights.needsUpdate=z,b.sunLightShadows.needsUpdate=z,b.directionalLights.needsUpdate=z,b.directionalLightShadows.needsUpdate=z,b.pointLights.needsUpdate=z,b.pointLightShadows.needsUpdate=z,b.spotLights.needsUpdate=z,b.spotLightShadows.needsUpdate=z,b.rectAreaLights.needsUpdate=z,b.hemisphereLights.needsUpdate=z}function ye(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(b,z,K){const X=pt.get(b);X.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),pt.get(b.texture).__webglTexture=z,pt.get(b.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:K,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,z){const K=pt.get(b);K.__webglFramebuffer=z,K.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(b,z=0,K=0){$=b,O=z,F=K;let X=null,Y=!1,Mt=!1;if(b){const vt=pt.get(b);if(vt.__useDefaultFramebuffer!==void 0){xt.bindFramebuffer(k.FRAMEBUFFER,vt.__webglFramebuffer),et.copy(b.viewport),gt.copy(b.scissor),Q=b.scissorTest,xt.viewport(et),xt.scissor(gt),xt.setScissorTest(Q),H=-1;return}else if(vt.__webglFramebuffer===void 0)Ut.setupRenderTarget(b);else if(vt.__hasExternalTextures)Ut.rebindTextures(b,pt.get(b.texture).__webglTexture,pt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ht=b.depthTexture;if(vt.__boundDepthTexture!==Ht){if(Ht!==null&&pt.has(Ht)&&(b.width!==Ht.image.width||b.height!==Ht.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ut.setupDepthRenderbuffer(b)}}const Et=b.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(Mt=!0);const Pt=pt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Pt[z])?X=Pt[z][K]:X=Pt[z],Y=!0):b.samples>0&&Ut.useMultisampledRTT(b)===!1?X=pt.get(b).__webglMultisampledFramebuffer:Array.isArray(Pt)?X=Pt[K]:X=Pt,et.copy(b.viewport),gt.copy(b.scissor),Q=b.scissorTest}else et.copy(Tt).multiplyScalar(lt).floor(),gt.copy(Vt).multiplyScalar(lt).floor(),Q=qt;if(K!==0&&(X=G),xt.bindFramebuffer(k.FRAMEBUFFER,X)&&xt.drawBuffers(b,X),xt.viewport(et),xt.scissor(gt),xt.setScissorTest(Q),Y){const vt=pt.get(b.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+z,vt.__webglTexture,K)}else if(Mt){const vt=z;for(let Et=0;Et<b.textures.length;Et++){const Pt=pt.get(b.textures[Et]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Et,Pt.__webglTexture,K,vt)}}else if(b!==null&&K!==0){const vt=pt.get(b.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,vt.__webglTexture,K)}H=-1};function Rn(b){const z=pt.get(b);return(z.__readFormat!==b.format||z.__readType!==b.type)&&(z.__readFormat=b.format,z.__readType=b.type,z.__formatReadable=ce.textureFormatReadable(b.format),z.__typeReadable=ce.textureTypeReadable(b.type)),z}this.readRenderTargetPixels=function(b,z,K,X,Y,Mt,wt,vt=0){if(!(b&&b.isWebGLRenderTarget)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=pt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&wt!==void 0&&(Et=Et[wt],Array.isArray(Et)&&(Et=Et[0])),Et){xt.bindFramebuffer(k.FRAMEBUFFER,Et);try{const Pt=b.textures[vt],Ht=Pt.format,Yt=Pt.type;b.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+vt);const At=Rn(Pt);if(At.__formatReadable===!1){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(At.__typeReadable===!1){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=b.width-X&&K>=0&&K<=b.height-Y&&k.readPixels(z,K,X,Y,ct.convert(Ht),ct.convert(Yt),Mt)}finally{const Pt=$!==null?pt.get($).__webglFramebuffer:null;xt.bindFramebuffer(k.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(b,z,K,X,Y,Mt,wt,vt=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=pt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&wt!==void 0&&(Et=Et[wt],Array.isArray(Et)&&(Et=Et[0])),Et)if(z>=0&&z<=b.width-X&&K>=0&&K<=b.height-Y){xt.bindFramebuffer(k.FRAMEBUFFER,Et);const Pt=b.textures[vt],Ht=Pt.format,Yt=Pt.type;b.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+vt);const At=Rn(Pt);if(At.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(At.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $t=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,$t),k.bufferData(k.PIXEL_PACK_BUFFER,Mt.byteLength,k.STREAM_READ),k.readPixels(z,K,X,Y,ct.convert(Ht),ct.convert(Yt),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);const be=$!==null?pt.get($).__webglFramebuffer:null;xt.bindFramebuffer(k.FRAMEBUFFER,be);const fe=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Du(k,fe,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,$t),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Mt),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer($t),k.deleteSync(fe),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,z=null,K=0){const X=Math.pow(2,-K),Y=Math.floor(b.image.width*X),Mt=Math.floor(b.image.height*X),wt=z!==null?z.x:0,vt=z!==null?z.y:0;Ut.setTexture2D(b,0),k.copyTexSubImage2D(k.TEXTURE_2D,K,0,0,wt,vt,Y,Mt),xt.unbindTexture()},this.copyTextureToTexture=function(b,z,K=null,X=null,Y=0,Mt=0){let wt,vt,Et,Pt,Ht,Yt,At,$t,be;const fe=b.isCompressedTexture?b.mipmaps[Mt]:b.image;if(K!==null)wt=K.max.x-K.min.x,vt=K.max.y-K.min.y,Et=K.isBox3?K.max.z-K.min.z:1,Pt=K.min.x,Ht=K.min.y,Yt=K.isBox3?K.min.z:0;else{const ee=Math.pow(2,-Y);wt=Math.floor(fe.width*ee),vt=Math.floor(fe.height*ee),b.isDataArrayTexture?Et=fe.depth:b.isData3DTexture?Et=Math.floor(fe.depth*ee):Et=1,Pt=0,Ht=0,Yt=0}X!==null?(At=X.x,$t=X.y,be=X.z):(At=0,$t=0,be=0);const he=ct.convert(z.format),Be=ct.convert(z.type);let Rt;z.isData3DTexture?(Ut.setTexture3D(z,0),Rt=k.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Ut.setTexture2DArray(z,0),Rt=k.TEXTURE_2D_ARRAY):(Ut.setTexture2D(z,0),Rt=k.TEXTURE_2D),xt.activeTexture(k.TEXTURE0),xt.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,z.flipY),xt.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),xt.pixelStorei(k.UNPACK_ALIGNMENT,z.unpackAlignment);const Xe=xt.getParameter(k.UNPACK_ROW_LENGTH),ie=xt.getParameter(k.UNPACK_IMAGE_HEIGHT),ri=xt.getParameter(k.UNPACK_SKIP_PIXELS),ke=xt.getParameter(k.UNPACK_SKIP_ROWS),Bs=xt.getParameter(k.UNPACK_SKIP_IMAGES);xt.pixelStorei(k.UNPACK_ROW_LENGTH,fe.width),xt.pixelStorei(k.UNPACK_IMAGE_HEIGHT,fe.height),xt.pixelStorei(k.UNPACK_SKIP_PIXELS,Pt),xt.pixelStorei(k.UNPACK_SKIP_ROWS,Ht),xt.pixelStorei(k.UNPACK_SKIP_IMAGES,Yt);const Gn=b.isDataArrayTexture||b.isData3DTexture,ai=z.isDataArrayTexture||z.isData3DTexture;if(b.isDepthTexture){const ee=pt.get(b),Ne=pt.get(z),an=pt.get(ee.__renderTarget),xe=pt.get(Ne.__renderTarget);xt.bindFramebuffer(k.READ_FRAMEBUFFER,an.__webglFramebuffer),xt.bindFramebuffer(k.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let De=0;De<Et;De++)Gn&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,pt.get(b).__webglTexture,Y,Yt+De),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,pt.get(z).__webglTexture,Mt,be+De)),k.blitFramebuffer(Pt,Ht,Pt+wt,Ht+vt,At,$t,At+wt,$t+vt,k.DEPTH_BUFFER_BIT,k.NEAREST);xt.bindFramebuffer(k.READ_FRAMEBUFFER,null),xt.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(Y!==0||b.isRenderTargetTexture||pt.has(b)){const ee=pt.get(b),Ne=pt.get(z);xt.bindFramebuffer(k.READ_FRAMEBUFFER,T),xt.bindFramebuffer(k.DRAW_FRAMEBUFFER,D);for(let an=0;an<Et;an++)Gn?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ee.__webglTexture,Y,Yt+an):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ee.__webglTexture,Y),ai?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ne.__webglTexture,Mt,be+an):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ne.__webglTexture,Mt),Y!==0?k.blitFramebuffer(Pt,Ht,Pt+wt,Ht+vt,At,$t,At+wt,$t+vt,k.COLOR_BUFFER_BIT,k.NEAREST):ai?k.copyTexSubImage3D(Rt,Mt,At,$t,be+an,Pt,Ht,wt,vt):k.copyTexSubImage2D(Rt,Mt,At,$t,Pt,Ht,wt,vt);xt.bindFramebuffer(k.READ_FRAMEBUFFER,null),xt.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else ai?b.isDataTexture||b.isData3DTexture?k.texSubImage3D(Rt,Mt,At,$t,be,wt,vt,Et,he,Be,fe.data):z.isCompressedArrayTexture?k.compressedTexSubImage3D(Rt,Mt,At,$t,be,wt,vt,Et,he,fe.data):k.texSubImage3D(Rt,Mt,At,$t,be,wt,vt,Et,he,Be,fe):b.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Mt,At,$t,wt,vt,he,Be,fe.data):b.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Mt,At,$t,fe.width,fe.height,he,fe.data):k.texSubImage2D(k.TEXTURE_2D,Mt,At,$t,wt,vt,he,Be,fe);xt.pixelStorei(k.UNPACK_ROW_LENGTH,Xe),xt.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ie),xt.pixelStorei(k.UNPACK_SKIP_PIXELS,ri),xt.pixelStorei(k.UNPACK_SKIP_ROWS,ke),xt.pixelStorei(k.UNPACK_SKIP_IMAGES,Bs),Mt===0&&z.generateMipmaps===!0&&z.mipmapsAutoUpdate===!0&&k.generateMipmap(Rt),xt.unbindTexture()},this.initRenderTarget=function(b){pt.get(b).__webglFramebuffer===void 0&&Ut.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Ut.setTextureCube(b,0):b.isData3DTexture?Ut.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Ut.setTexture2DArray(b,0):Ut.setTexture2D(b,0),xt.unbindTexture()},this.resetState=function(){O=0,F=0,$=null,xt.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}const Fl={type:"change"},Ao={type:"start"},Zc={type:"end"},hr=new Pc,Ol=new Un,T0=Math.cos(70*_r.DEG2RAD),Ae=new V,Ze=2*Math.PI,re={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ca=1e-6;class w0 extends Cd{constructor(t,e=null){super(t,e),this.state=re.NONE,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Vi.ROTATE,MIDDLE:Vi.DOLLY,RIGHT:Vi.PAN},this.touches={ONE:Hi.ROTATE,TWO:Hi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new V,this._lastQuaternion=new ei,this._lastTargetPosition=new V,this._quat=new ei().setFromUnitVectors(t.up,new V(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new fl,this._sphericalDelta=new fl,this._scale=1,this._panOffset=new V,this._rotateStart=new zt,this._rotateEnd=new zt,this._rotateDelta=new zt,this._panStart=new zt,this._panEnd=new zt,this._panDelta=new zt,this._dollyStart=new zt,this._dollyEnd=new zt,this._dollyDelta=new zt,this._dollyDirection=new V,this._mouse=new zt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=R0.bind(this),this._onPointerDown=A0.bind(this),this._onPointerUp=C0.bind(this),this._onContextMenu=F0.bind(this),this._onMouseWheel=L0.bind(this),this._onKeyDown=I0.bind(this),this._onTouchStart=N0.bind(this),this._onTouchMove=U0.bind(this),this._onMouseDown=P0.bind(this),this._onMouseMove=D0.bind(this),this._interceptControlDown=O0.bind(this),this._interceptControlUp=z0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=re.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Fl),this.update(),this.state=re.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Ae.copy(e).sub(this.target),Ae.applyQuaternion(this._quat),this._spherical.setFromVector3(Ae),this.autoRotate&&this.state===re.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ze:n>Math.PI&&(n-=Ze),s<-Math.PI?s+=Ze:s>Math.PI&&(s-=Ze),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ae.setFromSpherical(this._spherical),Ae.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ae),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ae.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new V(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new V(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Ae.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(hr.origin.copy(this.object.position),hr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(hr.direction))<T0?this.object.lookAt(this.target):(Ol.setFromNormalAndCoplanarPoint(this.object.up,this.target),hr.intersectPlane(Ol,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ca||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ca||this._lastTargetPosition.distanceToSquared(this.target)>ca?(this.dispatchEvent(Fl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ze/60*this.autoRotateSpeed*t:Ze/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ae.setFromMatrixColumn(e,0),Ae.multiplyScalar(-t),this._panOffset.add(Ae)}_panUp(t,e){this.screenSpacePanning===!0?Ae.setFromMatrixColumn(e,1):(Ae.setFromMatrixColumn(e,0),Ae.crossVectors(this.object.up,Ae)),Ae.multiplyScalar(t),this._panOffset.add(Ae)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ae.copy(s).sub(this.target);let r=Ae.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientY),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ze*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ze*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ze*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ze*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new zt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function A0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function R0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function C0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Zc),this.state=re.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function P0(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Vi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=re.DOLLY;break;case Vi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=re.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=re.ROTATE}break;case Vi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=re.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=re.PAN}break;default:this.state=re.NONE}this.state!==re.NONE&&this.dispatchEvent(Ao)}function D0(i){switch(this.state){case re.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case re.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case re.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function L0(i){this.enabled===!1||this.enableZoom===!1||this.state!==re.NONE||(i.preventDefault(),this.dispatchEvent(Ao),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Zc))}function I0(i){this.enabled!==!1&&this._handleKeyDown(i)}function N0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Hi.ROTATE:if(this.enableRotate===!1){this.state=re.NONE;break}this._handleTouchStartRotate(i),this.state=re.TOUCH_ROTATE;break;case Hi.PAN:if(this.enablePan===!1){this.state=re.NONE;break}this._handleTouchStartPan(i),this.state=re.TOUCH_PAN;break;default:this.state=re.NONE}break;case 2:switch(this.touches.TWO){case Hi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=re.TOUCH_DOLLY_PAN;break;case Hi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=re.TOUCH_DOLLY_ROTATE;break;default:this.state=re.NONE}break;default:this.state=re.NONE}this.state!==re.NONE&&this.dispatchEvent(Ao)}function U0(i){switch(this._trackPointer(i),this.state){case re.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case re.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case re.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case re.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=re.NONE}}function F0(i){this.enabled!==!1&&i.preventDefault()}function O0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function z0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ro(i,t){const e=new b0({antialias:!0,preserveDrawingBuffer:!0});e.setPixelRatio(Math.min(2,window.devicePixelRatio)),e.shadowMap.enabled=!0,e.shadowMap.type=jl,i.appendChild(e.domElement),e.domElement.style.width="100%",e.domElement.style.height="100%",e.domElement.style.display="block";const n=new od;n.background=new Zt(659492),n.fog=new xo(659492,2.2,5);const s=new un(45,1,.02,20);s.position.set(...t?.cameraPos??[.55,.85,-1.35]);const r=new w0(s,e.domElement);r.target.set(...t?.target??[0,.5,-.02]),r.enableDamping=!0,r.dampingFactor=.08,r.maxPolarAngle=Math.PI*.52,r.minDistance=.3,r.maxDistance=3.5;const a=new bd(12572927,2760728,.85);n.add(a);const o=new dl(16777215,1.5);o.position.set(-1.2,2.4,-1.4),o.castShadow=!0,o.shadow.mapSize.set(1024,1024),o.shadow.camera.near=.1,o.shadow.camera.far=6,o.shadow.camera.left=-1.5,o.shadow.camera.right=1.5,o.shadow.camera.top=1.5,o.shadow.camera.bottom=-1.5,n.add(o);const c=new dl(6737151,.5);c.position.set(1,1.2,1.5),n.add(c);const l=()=>{const x=i.clientWidth||640,m=i.clientHeight||460;e.setSize(x,m,!1),s.aspect=x/m,s.updateProjectionMatrix()},u=new ResizeObserver(l);u.observe(i),l();const d=new Set,h=new Rd;let f=0;const _=()=>{f=requestAnimationFrame(_);const x=h.getDelta(),m=h.elapsedTime;d.forEach(p=>p(x,m)),r.update(),e.render(n,s)};return _(),{renderer:e,scene:n,camera:s,controls:r,raf:f,onFrame:x=>d.add(x),dispose:()=>{cancelAnimationFrame(f),u.disconnect(),r.dispose(),e.dispose(),e.domElement.remove()}}}const B0={floor:7041664,body:10120015,udder:15907014,teat:16030400,legL:9067069,legR:8146740,tail:5979432,hoof:2826520};function k0(i,t=1){return new ii({color:B0[i]??13408665,roughness:i==="teat"?.35:.85,metalness:0,transparent:t<1,opacity:t})}function H0(i){const t=k0(i.part);if(i.kind==="sphere"){const c=new Se(new Zi(i.r,24,18),t);return c.position.set(i.c.x,i.c.y,i.c.z),c}if(i.kind==="ellipsoid"){const c=new Se(new Zi(1,28,20),t);c.position.set(i.c.x,i.c.y,i.c.z);const l=new me().makeBasis(new V(i.e0.x,i.e0.y,i.e0.z),new V(i.e1.x,i.e1.y,i.e1.z),new V(i.e2.x,i.e2.y,i.e2.z));return c.quaternion.setFromRotationMatrix(l),c.scale.set(i.r.x,i.r.y,i.r.z),c}const e=new V(i.a.x,i.a.y,i.a.z),n=new V(i.b.x,i.b.y,i.b.z),s=e.distanceTo(n),r=new yo(i.r,Math.max(.001,s-2*i.r),8,18),a=new Se(r,t);a.position.copy(e).add(n).multiplyScalar(.5);const o=n.clone().sub(e).normalize();return a.quaternion.setFromUnitVectors(new V(0,1,0),o),a}function Co(i,t={}){const e=new Qn;for(const s of i.prims){const r=H0(s);r&&(r.castShadow=!0,r.receiveShadow=!0,e.add(r))}const n=new Se(new Eo(2.2,48),new ii({color:3817810,roughness:1}));return n.rotation.x=-Math.PI/2,n.receiveShadow=!0,e.add(n),i.gtTips.forEach((s,r)=>{const a=new Se(new Zi(.008,14,10),new Mo({color:2293640}));a.position.set(s.x,s.y,s.z),a.name=`gt-tip-${r}`,e.add(a)}),e}function G0(){const i=new Qn,t=new Se(new ji(.09,.07,.16),new ii({color:2845872,roughness:.4,metalness:.3}));i.add(t);const e=new Se(new xi(.028,.034,.05,20),new ii({color:1120295,roughness:.2,metalness:.6}));e.rotation.x=Math.PI/2,e.position.z=.09,i.add(e);const n=new Se(new bo(.32,.7,32,1,!0),new Mo({color:3718648,transparent:!0,opacity:.08,side:dn,depthWrite:!1}));return n.rotation.x=-Math.PI/2,n.position.z=.45,n.name="fov",i.add(n),i}function V0(i=16096779){const t=new Qn,e=new Se(new xi(.028,.022,.07,20,1,!0),new ii({color:i,roughness:.3,metalness:.5,side:dn}));t.add(e);const n=new Se(new To(.028,.004,10,24),new ii({color:16639626,metalness:.7,roughness:.25}));return n.rotation.x=Math.PI/2,n.position.y=.035,t.add(n),t}let Gi=null,zi=null;function W0(){const i=ao(),t=io(i),e=v("div",null),n=v("div",{class:"canvas-host"},v("div",{class:"view3d",id:"model-view",style:"height:560px"})),s=v("div",{class:"kv mt12"});function r(){if(!Gi)return;zi&&(Gi.scene.remove(zi),zi.traverse(u=>{u instanceof Se&&u.geometry.dispose()}));const l=On(i,t);zi=Co(l),Gi.scene.add(zi),s.innerHTML="",l.gtTips.forEach((u,d)=>{s.append(v("dt",null,ms[d]),v("dd",{class:"mono small"},`X${(u.x*1e3).toFixed(0)} Y${(u.y*1e3).toFixed(0)} Z${(u.z*1e3).toFixed(0)} mm`))})}const a=(l,u,d,h,f,_,x=m=>m.toFixed(2))=>v("label",{class:"field"},v("span",{class:"row"},l,v("output",null,x(u()))),v("input",{type:"range",min:h,max:f,step:_,value:String(u()),oninput:m=>{const p=m.target;d(Number(p.value)),p.parentElement.querySelector("output").textContent=x(u()),r()}})),o=l=>v("div",{class:"card",style:"padding:12px"},v("b",{class:"small"},ms[l]),a("长度 mm",()=>t.teats[l].lengthMm,u=>t.teats[l].lengthMm=u,12,80,1,u=>`${u.toFixed(0)}`),a("半径 mm",()=>t.teats[l].radiusMm,u=>t.teats[l].radiusMm=u,3,20,.5,u=>u.toFixed(1)),a("倾角°",()=>t.teats[l].tiltDeg,u=>t.teats[l].tiltDeg=u,0,60,1,u=>`${u.toFixed(0)}`),a("偏航°",()=>t.teats[l].yawDeg,u=>t.teats[l].yawDeg=u,-180,180,1,u=>`${u.toFixed(0)}`)),c=v("div",{class:"rowgap"},v("div",{class:"card"},v("h3",null,"整体与泌乳状态"),v("label",{class:"field"},v("span",null,"选择牛只"),v("select",{onchange:l=>{location.hash="#/model?ear="+l.target.value}},...bt.cows.map(l=>v("option",{value:l.earTag,selected:l.earTag===i.earTag},`${l.earTag}${l.kind==="heifer"?"（后备）":""}`)))),a("挤奶状态（0 刚挤完 → 1 高度充盈）",()=>t.milkState,l=>t.milkState=l,0,1,.02),a("泌乳天数 DIM（影响乳区曲线）",()=>t.dim,l=>t.dim=l,1,380,1,l=>`${l.toFixed(0)}d`),a("沾水程度",()=>t.wetness,l=>t.wetness=l,0,1,.05)),v("div",{class:"card"},v("h3",null,"四个乳区饱满度"),v("div",{class:"form-grid"},...[0,1,2,3].map(l=>a(ms[l],()=>t.quarterFullness[l],u=>t.quarterFullness[l]=u,.7,1.25,.01)))),v("div",{class:"card"},v("h3",null,"站姿"),a("左右侧倾°",()=>t.stance.rollDeg,l=>t.stance.rollDeg=l,-8,8,.1,l=>`${l.toFixed(1)}°`),a("前后倾°",()=>t.stance.pitchDeg,l=>t.stance.pitchDeg=l,-6,6,.1,l=>`${l.toFixed(1)}°`),a("后肢开张",()=>t.stance.legSpread,l=>t.stance.legSpread=l,.8,1.3,.01),a("尾巴摆角°",()=>t.stance.tailSwingDeg,l=>t.stance.tailSwingDeg=l,-45,45,1,l=>`${l.toFixed(0)}°`)));return e.append(v("div",{class:"page-head"},v("div",null,v("h1",null,"乳房参数化建模"),v("p",null,"由线性评定数据生成乳区/乳头/后腿/尾巴网格，参数与相机求交模型完全一致"))),v("div",{class:"grid cols-2"},v("div",{class:"rowgap"},c,v("div",{class:"card"},v("h3",null,"真值乳头尖坐标"),s)),v("div",{class:"rowgap"},v("div",{class:"card"},v("h3",null,"实时 3D 模型（绿球=乳头尖真值）"),n),v("div",{class:"grid cols-2-equal"},o(0),o(1),o(2),o(3))))),setTimeout(()=>{const l=e.querySelector("#model-view");l&&(Gi=Ro(l,{cameraPos:[.5,.75,-1.1]}),r())},30),e}function X0(){Gi?.dispose(),Gi=null,zi=null}function q0(i,t,e,n){const{width:s,height:r}=t;i.width=s,i.height=r;const a=i.getContext("2d"),o=a.createImageData(s,r),c=.25,l=1.15;for(let u=0;u<s*r;u++){let d=8,h=12,f=24;const _=t.depth[u];if(Number.isFinite(_)){const x=Math.max(0,Math.min(1,(_-c)/(l-c)));if(x<.33){const m=x/.33;d=0,h=Math.round(120+120*m),f=220}else if(x<.66){const m=(x-.33)/.33;d=Math.round(255*m),h=240,f=Math.round(220-180*m)}else{const m=(x-.66)/.34;d=255,h=Math.round(220-160*m),f=Math.round(40+40*m)}t.flying[u]&&(d=255,h=255,f=255),t.multipath[u]&&n?.showNoise}else t.saturated[u]&&(d=255,h=40,f=40);o.data[u*4]=d,o.data[u*4+1]=h,o.data[u*4+2]=f,o.data[u*4+3]=255}a.putImageData(o,0,0),e&&(a.lineWidth=1,e.tips.forEach(u=>{const[d,h,f,_]=u.bbox}))}function Y0(i,t){const{width:e,height:n}=t;i.width=e,i.height=n;const s=i.getContext("2d"),r=s.createImageData(e,n);for(let a=0;a<e*n;a++){let o=t.ir[a];t.saturated[a]&&(o=255),o=Math.round(Math.pow(o/255,.85)*255),r.data[a*4]=o,r.data[a*4+1]=o,r.data[a*4+2]=Math.min(255,o+8),r.data[a*4+3]=255}s.putImageData(r,0,0)}function $0(i,t,e,n,s,r){i.width=t,i.height=e;const a=i.getContext("2d");a.clearRect(0,0,t,e),r?.forEach((o,c)=>{const l=n(o);if(!l)return;const[u,d]=l;a.strokeStyle="#22ff88",a.lineWidth=1.5,a.beginPath(),a.arc(u,d,7,0,Math.PI*2),a.stroke(),a.fillStyle="#22ff88",a.font="bold 9px sans-serif",a.fillText(`T${c+1}`,u+8,d-6)}),s?.tips.forEach(o=>{const c=n(o.tip);if(!c)return;const[l,u]=c,d=o.isFalsePositive?"#ff9500":o.errorMm!==void 0&&o.errorMm<=3?"#ff3b5c":"#ffd60a";a.strokeStyle=d,a.lineWidth=2,a.beginPath(),a.moveTo(l-4,u-4),a.lineTo(l+4,u+4),a.moveTo(l+4,u-4),a.lineTo(l-4,u+4),a.stroke(),o.errorMm!==void 0&&(a.fillStyle=d,a.font="9px ui-monospace, monospace",a.fillText(`${o.errorMm.toFixed(1)}`,l+6,u+10))})}function Z0(i,t,e,n,s){const d=52+e.length*64+14,h=14+t.length*40+34;i.width=d*2,i.height=h*2,i.style.width=`${d}px`,i.style.height=`${h}px`;const f=i.getContext("2d");f.scale(2,2),f.fillStyle="#0e1424",f.fillRect(0,0,d,h),f.font="11px sans-serif",f.textAlign="center",e.forEach((_,x)=>{const m=52+x*64+32;f.fillStyle="#9fb0d0",f.fillText(`${_}°`,m,h-14)}),t.forEach((_,x)=>{const m=14+x*40+20;f.fillStyle="#9fb0d0",f.textAlign="right",f.fillText(`${_.toFixed(2)}m`,44,m+4)}),f.textAlign="center";for(let _=0;_<t.length;_++)for(let x=0;x<e.length;x++){const m=n[_]?.[x]??0,p=52+x*64,M=14+_*40,w=m<.5?230:Math.round(230-(m-.5)*360),S=m<.5?Math.round(60+m*2*150):210,A=70;f.fillStyle=`rgb(${w},${S},${A})`,f.fillRect(p+2,M+2,60,36),f.fillStyle=m>.45?"#10151f":"#e8eefc",f.font="bold 12px sans-serif",f.fillText(`${Math.round(m*100)}`,p+64/2,M+40/2+4),s&&Math.abs(t[_]-s.h)<1e-6&&e[x]===s.p&&(f.strokeStyle="#fff",f.lineWidth=2.5,f.strokeRect(p+3,M+3,58,34))}f.fillStyle="#cdd9f5",f.font="12px sans-serif",f.textAlign="left",f.fillText("俯仰角 →",52,h-0),f.save(),f.translate(12,14+t.length*40/2),f.rotate(-Math.PI/2),f.textAlign="center",f.fillText("安装高度",0,0),f.restore()}let di=null,Bi=null,ki=null,ha=null;function Kc(){const i=ao();bn(i.earTag);const t=On(i);ha=io(i);const e={...gs[2]},n={preset:e,pose:fa(t),noise:{...bt.settings.defaultNoise},seed:bt.settings.defaultSeed},s=v("div",null),r=v("canvas",{class:"raw"}),a=v("canvas",{class:"raw"}),o=v("canvas",{class:"overlay"});v("div",{class:"cap"},r,o);const c=v("span",{class:"badge-hash"},"帧哈希 —"),l=v("div",null,"尚未运行"),u=v("div",{class:"canvas-host"},v("div",{class:"view3d",id:"cam-view"}));function d(T){const D=ql(n.pose,n.preset),O=T.x-D.eye.x,F=T.y-D.eye.y,$=T.z-D.eye.z,H=O*D.forward.x+F*D.forward.y+$*D.forward.z;if(H<=.02)return null;const q=O*D.right.x+F*D.right.y+$*D.right.z,et=O*D.up.x+F*D.up.y+$*D.up.z;return[n.preset.width/2+q/H*D.fx,n.preset.height/2-et/H*D.fy]}function h(){ki&&(ki.position.set(n.pose.position.x,n.pose.position.y,n.pose.position.z),ki.rotation.set(_r.degToRad(n.pose.rollDeg),_r.degToRad(n.pose.yawDeg),_r.degToRad(-n.pose.pitchDeg),"XYZ"))}function f(){if(!di)return;Bi&&(di.scene.remove(Bi),Bi.traverse(D=>{D instanceof Se&&D.geometry.dispose()}));const T=On(i,ha);Bi=Co(T),di.scene.add(Bi)}function _(){const T=On(i,ha),D=vr(i,n,T);return q0(r,D.frame,D.reco),Y0(a,D.frame),$0(o,n.preset.width,n.preset.height,d,D.reco,T.gtTips),c.textContent=`帧哈希 ${D.hash} · 种子 ${n.seed} · 识别 ${D.reco.elapsedMs.toFixed(0)}ms`,x(D),D}function x(T){const D=T.reco,O=ms.map((F,$)=>{const H=D.errorsMm[$],q=D.tips.find(et=>et.matchedTeat===$);return v("tr",null,v("td",null,F),v("td",{class:H===null?"faint":H<=3?"err-ok":"err-bad"},H===null?"未匹配":`${nh(H)} mm`),v("td",{class:"muted"},q?`${q.radiusMm.toFixed(1)}mm / ${q.pixelCount}px`:"—"))});l.innerHTML="",l.append(v("div",{class:"spread mb12"},v("b",null,`匹配 ${D.matchedCount}/4 · 误报 ${D.falsePositives.length}`),v("span",{class:"small"},v("span",{style:"color:#60a5fa"},` 腿×${D.legFalseCount} `),v("span",{style:"color:#fde047"},` 尾×${D.tailFalseCount}`))),v("table",null,v("thead",null,v("tr",null,v("th",null,"乳头"),v("th",null,"误差"),v("th",null,"半径/点数"))),v("tbody",null,...O)),D.falsePositives.length?v("div",{class:"mt12 small",style:"color:#fbbf24"},"⚠ 橙叉为误识别：",D.falsePositives.map(F=>F.truePart==="tail"?"尾巴":F.truePart?.startsWith("leg")?"后腿":F.truePart).join("、")):v("div",{class:"mt12 small err-ok"},"无误识别"))}const m=(T,D,O,F,$)=>v("label",{class:"field"},v("span",{class:"row"},D,v("output",null,n.pose.position[T].toFixed(2))),v("input",{type:"range",min:O,max:F,step:$,value:String(n.pose.position[T]),oninput:H=>{const q=H.target;n.pose.position[T]=Number(q.value),q.previousElementSibling.querySelector("output").textContent=n.pose.position[T].toFixed(2),h()}})),p=(T,D,O,F)=>v("label",{class:"field"},v("span",{class:"row"},D,v("output",null,`${n.pose[T].toFixed(0)}°`)),v("input",{type:"range",min:O,max:F,step:"1",value:String(n.pose[T]),oninput:$=>{const H=$.target;n.pose[T]=Number(H.value),H.previousElementSibling.querySelector("output").textContent=`${n.pose[T].toFixed(0)}°`,h()}})),M=v("select",{onchange:T=>{const D=gs.find(O=>O.id===T.target.value);Object.assign(e,D),w.value=String(e.width),S.value=String(e.height),A.value=String(e.fovXDeg),R.value=String(e.workDistM),g.value=String(e.modFreqMhz),Ke(`已载入 ${D.label}`)}},...gs.map(T=>v("option",{value:T.id,selected:T.id===e.id},T.label))),w=v("input",{type:"number",value:String(e.width),oninput:T=>e.width=Number(T.target.value)}),S=v("input",{type:"number",value:String(e.height),oninput:T=>e.height=Number(T.target.value)}),A=v("input",{type:"number",value:String(e.fovXDeg),oninput:T=>e.fovXDeg=Number(T.target.value)}),R=v("input",{type:"number",step:"0.05",value:String(e.workDistM),oninput:T=>e.workDistM=Number(T.target.value)}),g=v("input",{type:"number",value:String(e.modFreqMhz),oninput:T=>e.modFreqMhz=Number(T.target.value)}),E=v("input",{type:"number",value:String(n.seed),oninput:T=>n.seed=Number(T.target.value)}),L=(T,D)=>v("label",{class:"check"},v("input",{type:"checkbox",checked:n.noise[T],onchange:O=>n.noise[T]=O.target.checked}),D),P=v("select",{onchange:T=>{bn(T.target.value),location.hash="#/camera"}},...bt.cows.filter(T=>T.kind!=="heifer").map(T=>v("option",{value:T.earTag,selected:T.earTag===i.earTag},`${T.earTag} · P${T.parity} · 底${T.traits.udderFloorHeightMm}`))),N=v("div",{class:"card rowgap"},v("h3",null,"相机与机位"),v("label",{class:"field"},v("span",null,"选择牛只"),P),v("button",{class:"btn",onclick:()=>{n.pose=fa(On(i)),I(),h()}},"🎯 回到推荐机位"),m("x","横向 X (m)",-.3,.3,.01),m("y","安装高度 Y (m)",.2,.85,.01),m("z","前后 Z (m)",-.95,-.25,.01),p("pitchDeg","俯仰角（正=仰视）",-10,60),p("yawDeg","偏航角",-25,25),v("h3",{class:"mt8"},"ToF 模组参数"),v("label",{class:"field"},v("span",null,"模组预设"),M),v("div",{class:"form-grid"},v("label",{class:"field"},v("span",null,"宽 px"),w),v("label",{class:"field"},v("span",null,"高 px"),S),v("label",{class:"field"},v("span",null,"水平 FOV°"),A),v("label",{class:"field"},v("span",null,"工作距离 m"),R),v("label",{class:"field"},v("span",null,"调制频率 MHz"),g),v("label",{class:"field"},v("span",null,"随机种子"),E)),v("h3",{class:"mt8"},"噪声模型"),L("enabled","启用 ToF 噪声"),L("flyingPixels","边缘飞点"),L("multipath","凹处多径偏远"),L("wetSaturation","沾水饱和无效"),v("label",{class:"field"},v("span",{class:"row"},"噪声强度",v("output",null,n.noise.depthNoiseScale.toFixed(1))),v("input",{type:"range",min:"0",max:"2.5",step:"0.1",value:String(n.noise.depthNoiseScale),oninput:T=>{n.noise.depthNoiseScale=Number(T.target.value)}})),v("div",{class:"btn-row mt8"},v("button",{class:"btn primary",onclick:()=>_()},"▶ 运行仿真"),v("button",{class:"btn",onclick:()=>{const T=_(),D=da([T.frame.depth,T.frame.ir]),O=_(),F=da([O.frame.depth,O.frame.ir]);Ke(D===F&&JSON.stringify(T.reco.tips.map($=>$.tip))===JSON.stringify(O.reco.tips.map($=>$.tip))?"确定性校验通过：两帧完全一致":"两次结果不一致！",D===F?"ok":"err")}},"🔁 确定性自检"),v("button",{class:"btn green",onclick:()=>location.hash="#/replay"},"套杯回放 →")));function I(){Jc();const T=Kc();s.replaceWith(T)}const G=v("div",{class:"rowgap"},v("div",{class:"card"},v("h3",null,"机械臂末端 / 相机位姿 3D"),u),v("div",{class:"card"},v("h3",null,"ToF 深度图 与 红外强度图 ",v("span",{class:"sub"},"绿圈=真值，红叉=≤3mm，黄叉=超差，橙叉=误识")),v("div",{class:"depth-grid"},v("div",{class:"cap"},r,o),v("div",{class:"cap"},a)),v("div",{class:"spread mt8"},c,v("span",{class:"legend"},v("span",null,"近"),v("span",{class:"bar"}),v("span",null,"远")))),v("div",{class:"card"},v("h3",null,"乳头识别与评分"),l));return s.append(v("div",{class:"page-head"},v("div",null,v("h1",null,"相机仿真与乳头识别"),v("p",null,"按真实 ToF 模组参数渲染深度/红外，点云分割求四个乳头尖并与模型真值比对"))),v("div",{class:"grid cols-2"},N,G)),setTimeout(()=>{const T=s.querySelector("#cam-view");T&&(di=Ro(T,{cameraPos:[.5,.8,-1.2]}),f(),ki=G0(),di.scene.add(ki),h(),_())},30),s}function Jc(){di?.dispose(),di=null,Bi=null,ki=null}let fi=null;function zl(){const t=[...bt.cows.filter(e=>e.kind==="lactating"&&!e.flags.crossedRearTeats&&!e.flags.veryShortTeats&&!e.flags.nearGroundUdder)].sort((e,n)=>{const s=r=>r.traits.udderFloorHeightMm-Math.abs(r.stance.rollDeg)*6-Math.abs(r.stance.tailSwingDeg)*1.2;return s(n)-s(e)});return t[Math.floor(t.length*.4)]??ao()}function K0(){const i=bt.selectedEarTag?bt.cows.find(w=>w.earTag===bt.selectedEarTag)??zl():zl();bn(i.earTag);const t=v("div",null),e=v("select",{style:"width:auto;min-width:220px",onchange:w=>{bn(w.target.value),window.dispatchEvent(new HashChangeEvent("hashchange"))}},...bt.cows.filter(w=>w.kind!=="heifer").slice(0,160).map(w=>v("option",{value:w.earTag,selected:w.earTag===i.earTag},`${w.earTag} · P${w.parity} · 底${w.traits.udderFloorHeightMm}`))),n=v("div",{class:"canvas-host"},v("div",{class:"view3d",id:"replay-view",style:"height:540px"})),s=On(i),r=$l(bt.settings.defaultSeed);r.pose=fa(s);const a=Th(i,r),o=a.durationS;let c=0,l=!0,u=1;const d=v("input",{type:"range",min:"0",max:String(o),step:"0.05",value:"0",style:"flex:1"}),h=v("span",{class:"mono small muted"},`0.0 / ${o.toFixed(0)}s`),f=v("button",{class:"btn primary"},"⏸ 暂停"),_=v("span",{class:"tag watch"},`重扫 ${a.totalRescans} 次`),x=v("span",{class:`tag ${a.success?"robot":"parlor"}`},a.success?"四杯成功":"需人工介入"),m=[],p=v("div",{class:"timeline"},...a.events.map(w=>{const S=v("div",{class:`tl-item ${w.type}`},v("span",{class:"tl-time mono"},`${w.t.toFixed(1)}s`),w.text);return m.push(S),S})),M=v("div",{class:"grid cols-2-equal mt12"},...a.cups.map((w,S)=>v("div",{class:"stat",style:"padding:12px"},v("div",{class:"spread"},v("b",null,ms[S]),v("span",{class:`tag ${w.success?"robot":"parlor"}`},w.success?"套上":"失败")),v("div",{class:"small muted mt8"},`路径遮挡采样 ${w.blockedSamples} · 重扫 ${w.rescans}`))));return t.append(v("div",{class:"page-head"},v("div",null,v("h1",null,"套杯过程回放"),v("p",null,"机械臂从进牛位到四杯依次套上；红色事件为后腿/尾巴遮挡，黄色为重扫")),e),v("div",{class:"grid cols-2"},v("div",{class:"card"},v("h3",null,"3D 回放"),n,v("div",{class:"spread mt12"},f,d,h,v("select",{style:"width:auto",onchange:w=>u=Number(w.target.value)},v("option",{value:"0.5"},"0.5×"),v("option",{value:"1",selected:!0},"1×"),v("option",{value:"2"},"2×")),_,x)),v("div",{class:"card"},v("h3",null,"事件时间线"),p,v("h3",{class:"mt16"},"每杯路径评估"),M))),setTimeout(()=>{const w=t.querySelector("#replay-view");if(!w)return;fi=Ro(w,{cameraPos:[.7,.8,-1.25]}),fi.scene.add(Co(s));const S=new Qn,A=new ii({color:16347926,roughness:.4,metalness:.4}),R=new Se(new xi(.03,.035,.4,16),A);R.position.y=.2,S.add(R);const g=new Se(new xi(.022,.028,.34,16),A);g.position.set(0,.42,.12),g.rotation.x=.7,S.add(g);const E=new Se(new Zi(.045,18,14),new ii({color:3718648,metalness:.5,roughness:.3}));E.position.set(0,.5,.24),S.add(E),fi.scene.add(S);const L=a.cups.map(N=>{const I=V0();return fi.scene.add(I),I});function P(N){const I=a.armTimeline;for(let G=0;G<I.length-1;G++)if(N>=I[G].t&&N<=I[G+1].t){const T=(N-I[G].t)/Math.max(.01,I[G+1].t-I[G].t),D=I[G].position,O=I[G+1].position;return{x:D.x+(O.x-D.x)*T,y:D.y+(O.y-D.y)*T,z:D.z+(O.z-D.z)*T}}return I[I.length-1].position}fi.onFrame(N=>{l&&(c+=N*u,c>o&&(c=0),d.value=c.toFixed(2));const I=P(c);S.position.set(I.x,I.y-.5,I.z),h.textContent=`${c.toFixed(1)} / ${o.toFixed(0)}s`,a.cups.forEach((T,D)=>{const O=L[D],F=5.5+D*3.6,$=(c-F)/3.2;if($<0){O.visible=!1;return}O.visible=!0;const H=T.waypoints;if($>=1){const Z=H[H.length-1];O.position.set(Z.x,Z.y+.035,Z.z);return}const q=$*(H.length-1),et=Math.min(H.length-2,Math.floor(q)),gt=q-et,Q=H[et],B=H[et+1];O.position.set(Q.x+(B.x-Q.x)*gt,Q.y+(B.y-Q.y)*gt+.035,Q.z+(B.z-Q.z)*gt)});let G=-1;a.events.forEach((T,D)=>{T.t<=c&&(G=D)}),m.forEach((T,D)=>{T.style.opacity=D<=G?"1":"0.32"})}),f.onclick=()=>{l=!l,f.textContent=l?"⏸ 暂停":"▶ 播放"},d.oninput=()=>{c=Number(d.value),l=!1,f.textContent="▶ 播放"}},30),t}function J0(){fi?.dispose(),fi=null}let ys=null;function Bl(){return ys||(ys=new Worker(new URL(""+new URL("batch.worker-DeT065_C.js",import.meta.url).href,import.meta.url),{type:"module"})),ys}function Q0(){ys?.terminate(),ys=null}function j0(){const i=v("div",null);Ur(bt.results);const t=v("div",{class:"stat robot"},v("div",{class:"v"},"—"),v("div",{class:"k"},"能进机器人")),e=v("div",{class:"stat watch"},v("div",{class:"v"},"—"),v("div",{class:"k"},"要盯着")),n=v("div",{class:"stat parlor"},v("div",{class:"v"},"—"),v("div",{class:"k"},"只能去奶厅")),s=v("div",{class:"stat accent"},v("div",{class:"v"},"—"),v("div",{class:"k"},"平均套杯成功率"));function r(){const D=Ur(bt.results);t.querySelector(".v").textContent=bt.results.length?String(D.counts.robot):"—",e.querySelector(".v").textContent=bt.results.length?String(D.counts.watch):"—",n.querySelector(".v").textContent=bt.results.length?String(D.counts.parlor):"—",s.querySelector(".v").textContent=bt.results.length?ks(D.avgRate):"—"}r();const a=v("div",{class:"progress"},v("i")),o=v("span",{class:"small muted"},bt.results.length?`已有 ${bt.results.length} 头评测结果，可重新全群评测`:"尚未跑全群评测"),c=v("button",{class:"btn primary"},"🚀 全群评测（Web Worker，不卡界面）");c.onclick=()=>{c.disabled=!0,o.textContent="评测中…";const D=Bl();D.onmessage=O=>{const F=O.data;F.type==="progress"&&F.job==="screen"?(a.firstElementChild.style.width=`${F.done/F.total*100}%`,o.textContent=`评测中 ${F.done}/${F.total}`):F.type==="screen-done"&&(Zh(F.results),r(),S(),c.disabled=!1,o.textContent=`完成：${F.results.length} 头`,Ke("全群评测完成","ok"))},D.postMessage({type:"screen",cows:bt.cows,settings:bt.settings})};const l=v("canvas"),u=v("div",{class:"heatmap-wrap"},l),d=v("div",{class:"small muted"},"尚未扫描"),h=v("div",{class:"progress"},v("i")),f=v("button",{class:"btn"},"🌡 扫描安装高度×俯仰热图（抽样 90 头）"),_=v("button",{class:"btn"},"全群精确热图（较慢）");let x=[],m=null;function p(){const D=bt.settings.sweepHeights,O=bt.settings.sweepPitches,F=D.map($=>O.map(H=>x.find(q=>q.heightM===$&&q.pitchDeg===H)?.herdSuccess??0));Z0(l,D,O,F,m??void 0),m&&(d.innerHTML=`全群最优安装：<b class="err-ok">高度 ${m.h.toFixed(2)} m · 俯仰 ${m.p}° · 成功率 ${ks(m.v)}</b>`)}function M(D){const O=D?f:_;O.setAttribute("disabled","true");const F=Bl();F.onmessage=$=>{const H=$.data;H.type==="progress"&&H.job==="heatmap"?(h.firstElementChild.style.width=`${H.done/H.total*100}%`,d.textContent=`热图扫描 ${H.done}/${H.total} 格`):H.type==="heatmap-done"&&(x=H.cells,m=H.best,p(),O.removeAttribute("disabled"),Ke("热图扫描完成","ok"))},F.postMessage({type:"heatmap",cows:bt.cows,settings:bt.settings,sampleLimit:D})}f.onclick=()=>M(90),_.onclick=()=>M(0);const w=v("div");function S(){const D=["robot","watch","parlor"];w.innerHTML="";const O=v("div",{class:"grid",style:"grid-template-columns:repeat(3,1fr)"});window.innerWidth<1100&&(O.style.gridTemplateColumns="1fr");for(const F of D){const $=bt.results.filter(q=>q.tier===F).sort((q,et)=>et.successRate-q.successRate),H=v("div",{class:"card",style:"padding:12px"},v("h3",null,v("span",{class:`tag ${F}`},us[F]),v("span",{class:"sub"},`${$.length} 头`)),v("div",{class:"table-wrap",style:"max-height:340px"},v("table",null,v("thead",null,v("tr",null,v("th",null,"耳号"),v("th",null,"成功率"),v("th",null,"匹配"),v("th",null,"主要原因"))),v("tbody",null,...$.slice(0,60).map(q=>v("tr",{onclick:()=>{bn(q.earTag),location.hash="#/camera"}},v("td",null,v("b",null,q.earTag)),v("td",null,v("span",{style:`color:${q.successRate>=.8?"#4ade80":q.successRate>=.45?"#fbbf24":"#f87171"};font-weight:700`},ks(q.successRate))),v("td",null,`${q.matchedTeats}/4`),v("td",{class:"small muted",style:"white-space:normal"},q.failureReasons.slice(0,2).join("、")||"—")))))));O.appendChild(H)}w.append(O)}S();const A=bt.cows.filter(D=>D.kind==="heifer"),R=A.slice(0,40).map(D=>{const O=Ah(D,bt.settings);return v("tr",{onclick:()=>{bn(D.earTag),location.hash="#/report"}},v("td",null,v("b",null,D.earTag)),v("td",null,"P0"),v("td",null,`${O.predictedFloorMm}`),v("td",null,`${O.sagMm}`),v("td",null,v("span",{class:`tag ${O.predictedTier}`},us[O.predictedTier])))}),g=v("div",{class:"card"},v("h3",null,`后备牛头胎下垂预测（${A.length} 头，展示前 40）`,v("span",{class:"sub"},"由体高/体深/尻角线性预测产犊后乳房底高并跑仿真")),v("div",{class:"table-wrap",style:"max-height:300px"},v("table",null,v("thead",null,v("tr",null,v("th",null,"耳号"),v("th",null,"胎次"),v("th",null,"预测底高 mm"),v("th",null,"下垂 mm"),v("th",null,"预测档位"))),v("tbody",null,...R)))),E=v("select",null,...bt.cows.filter(D=>D.kind==="lactating").slice(0,120).map(D=>v("option",{value:D.earTag},`${D.earTag}（P${D.parity}）`))),L=v("div",null,"选择牛只后显示当前胎次及后推三胎");function P(){const D=bt.cows.find(F=>F.earTag===E.value),O=Rh(D,bt.settings);L.innerHTML="",L.append(O.firstUnsuitableParity!==null?v("div",{class:"tag parlor mb12",style:"font-size:13px;padding:5px 12px"},`该牛从第 ${O.firstUnsuitableParity} 胎开始不适合机器人`):v("div",{class:"tag robot mb12",style:"font-size:13px;padding:5px 12px"},"连推三胎仍可进机器人"),v("div",{class:"grid",style:"grid-template-columns:repeat(4,1fr)"},...O.rows.map(F=>v("div",{class:"stat",style:"padding:14px"},v("div",{class:"k"},`第 ${F.parity} 胎`),v("div",{class:"v",style:`font-size:22px;color:${F.tier==="robot"?"#4ade80":F.tier==="watch"?"#fbbf24":"#f87171"}`},ks(F.successRate)),v("div",{class:"small muted"},`底高 ${F.floorMm}mm`),v("span",{class:`tag ${F.tier} mt8`},us[F.tier])))))}E.onchange=P,setTimeout(P,0);const N=v("div",{class:"card"},v("h3",null,"胎次下垂推移（连推三胎）"),v("label",{class:"field"},v("span",null,"选择牛只"),E),L),I=v("button",{class:"btn green"},"📄 导出给场长（HTML 报告）");I.onclick=()=>T();const G=v("button",{class:"btn"},"⬇ 导出 CSV");G.onclick=()=>{const O=`earTag,tier,successRate,trials,matchedTeats,reasons
`+bt.results.map(F=>`${F.earTag},${F.tier},${F.successRate.toFixed(3)},${F.trials},${F.matchedTeats},"${F.failureReasons.join("；")}"`).join(`
`);ua(`筛牛报告_${new Date().toISOString().slice(0,10)}.csv`,"\uFEFF"+O,"text/csv;charset=utf-8"),Ke("CSV 已导出","ok")};function T(){const D=Ur(bt.results),O=[...bt.results].sort(($,H)=>H.successRate-$.successRate).map($=>`<tr><td>${$.earTag}</td><td>${us[$.tier]}</td><td>${($.successRate*100).toFixed(0)}%</td><td>${$.matchedTeats}/4</td><td>${$.failureReasons.join("；")}</td></tr>`).join(""),F=`<!doctype html><html lang="zh"><head><meta charset="utf-8"><title>机器人挤奶筛牛报告</title>
<style>body{font-family:"Microsoft YaHei",sans-serif;max-width:1000px;margin:30px auto;color:#1a2444;padding:0 20px}h1{color:#0369a1}table{border-collapse:collapse;width:100%;font-size:13px}th,td{border:1px solid #cbd5e1;padding:6px 9px;text-align:left}th{background:#e0f2fe}.c{display:flex;gap:16px;margin:18px 0}.b{flex:1;border-radius:10px;padding:16px;color:#fff}.r{background:#16a34a}.w{background:#d97706}.p{background:#dc2626}.b b{font-size:30px;display:block}</style></head><body>
<h1>挤奶机器人乳头识别与筛牛报告</h1>
<p>生成时间：${new Date().toLocaleString("zh-CN")} · 牛群 ${bt.cows.length} 头 · 已评测 ${bt.results.length} 头${m?` · 最优安装 ${m.h.toFixed(2)}m / ${m.p}°（${(m.v*100).toFixed(0)}%）`:""}</p>
<div class="c"><div class="b r"><b>${D.counts.robot}</b>能进机器人</div><div class="b w"><b>${D.counts.watch}</b>要盯着</div><div class="b p"><b>${D.counts.parlor}</b>只能去挤奶厅</div></div>
<p>平均套杯成功率 <strong>${(D.avgRate*100).toFixed(1)}%</strong>。分档阈值：≥${bt.settings.robotThreshold*100}% 机器人，≥${bt.settings.watchThreshold*100}% 观察，其余奶厅。</p>
<table><thead><tr><th>耳号</th><th>档位</th><th>成功率</th><th>平均匹配</th><th>主要风险</th></tr></thead><tbody>${O}</tbody></table>
<p style="color:#64748b;font-size:12px;margin-top:24px">本报告由挤奶机器人视觉仿真与筛牛系统生成，成功率为确定性仿真试验结果，仅供分群参考。</p>
</body></html>`;ua(`筛牛报告_${new Date().toISOString().slice(0,10)}.html`,F,"text/html;charset=utf-8"),Ke("HTML 报告已导出","ok")}return i.append(v("div",{class:"page-head"},v("div",null,v("h1",null,"筛牛报告与安装位姿优化"),v("p",null,"全群批量仿真不卡界面；点任意牛行可跳回它的相机仿真")),v("div",{class:"btn-row"},G,I)),v("div",{class:"grid cols-3 mb12"},t,e,n),v("div",{class:"card mb12"},v("div",{class:"spread"},s,v("div",{class:"btn-row"},c)),v("div",{class:"mt12"},a),v("div",{class:"mt8"},o)),v("div",{class:"card mb12"},v("h3",null,"相机安装高度 × 俯仰角 全群成功率热图"),v("div",{class:"btn-row mb12"},f,_),h,v("div",{class:"mt12"},u),v("div",{class:"mt8"},d)),v("div",{class:"mb12"},w),v("div",{class:"grid cols-2-equal mb12"},N,g)),i}let Es=null;function t_(){return Es||(Es=new Worker(new URL(""+new URL("batch.worker-DeT065_C.js",import.meta.url).href,import.meta.url),{type:"module"})),Es}function e_(){Es?.terminate(),Es=null}function n_(){const i=bt.settings,t=v("div",null),e=v("div",{class:"mt12"},"点击按钮在 Web Worker 中对全部泌乳牛跑无噪声严格识别。"),n=v("div",{class:"progress mt12"},v("i")),s=v("button",{class:"btn primary"},"🎯 全群精度自检 (320×240)"),r=v("button",{class:"btn"},"🔬 高精度自检 (640×480，较慢)");function a(w,S){S.disabled=!0;const A=t_();A.onmessage=R=>{const g=R.data;if(g.type==="progress"&&g.job==="precision")n.firstElementChild.style.width=`${g.done/g.total*100}%`,e.textContent=`检验中 ${g.done}/${g.total}…`;else if(g.type==="precision-done"){const E=g.stats;e.innerHTML="",e.append(v("div",{class:"grid cols-3 mb12"},v("div",{class:"stat accent"},v("div",{class:"v"},`${E.meanMm.toFixed(2)}`),v("div",{class:"k"},`平均误差 mm · P95 ${E.p95Mm.toFixed(2)}`)),v("div",{class:`stat ${E.pass?"robot":"watch"}`},v("div",{class:"v"},`${E.p95Mm.toFixed(2)}`),v("div",{class:"k"},"P95 误差 mm（尾部重扫）")),v("div",{class:"stat"},v("div",{class:"v"},`${E.cows4}/${E.cows}`),v("div",{class:"k"},`四乳头全匹配牛 · 认证 ${E.tips} 尖点`))),v("div",{class:E.pass?"err-ok":"err-bad",style:"font-size:15px;font-weight:700"},E.pass?"✅ 精度规格通过：认证尖点平均误差 ≤3mm":`⚠ 平均 ${E.meanMm.toFixed(2)} mm`),v("div",{class:"small muted mt8"},`最大 ${E.maxMm.toFixed(2)}mm；${E.over3} 个尖点 >3mm（极端遮挡/交叉视角，由置信门拦截并重扫）`),v("div",{class:`mt8 ${E.deterministic?"err-ok":"err-bad"}`},E.deterministic?"✅ 确定性通过：同牛同种子两遍深度帧与识别结果完全一致":"❌ 确定性失败"),...E.worst.length?[v("div",{class:"small muted mt8 mono"},"尾部：",E.worst.map(L=>`${L.earTag}#${L.teat}=${L.e}mm `).join(""))]:[]),S.disabled=!1,Ke(E.pass?"精度自检通过":"自检完成，存在超差",E.pass?"ok":"info")}},A.postMessage({type:"precision",cows:bt.cows,presetId:w})}s.onclick=()=>a("pmd-qvga",s),r.onclick=()=>a("blaze-vga",r);const o=v("input",{type:"range",min:"0.5",max:"0.95",step:"0.05",value:String(i.robotThreshold)}),c=v("input",{type:"range",min:"0.2",max:"0.7",step:"0.05",value:String(i.watchThreshold)}),l=v("input",{type:"number",min:"5",max:"30",value:String(i.cupToleranceMm)}),u=v("input",{type:"number",min:"4",max:"24",value:String(i.trialsPerCow)}),d=v("input",{type:"number",value:String(i.defaultSeed)}),h=v("output",null,`${Math.round(i.robotThreshold*100)}%`),f=v("output",null,`${Math.round(i.watchThreshold*100)}%`);o.oninput=()=>{h.textContent=`${Math.round(Number(o.value)*100)}%`},c.oninput=()=>{f.textContent=`${Math.round(Number(c.value)*100)}%`};const _=v("button",{class:"btn primary",onclick:async()=>{await $h({robotThreshold:Number(o.value),watchThreshold:Number(c.value),cupToleranceMm:Number(l.value),trialsPerCow:Number(u.value),defaultSeed:Number(d.value)}),Ke("设置已保存到 IndexedDB","ok")}},"保存设置"),x=v("button",{class:"btn amber",onclick:async()=>{confirm("重新生成 300 头测试牛？当前手动修改会被覆盖。")&&(await Vh(300),location.reload())}},"🔄 重新生成 300 头测试牛"),m=v("button",{class:"btn",onclick:()=>{const w={cows:bt.cows,settings:bt.settings,results:bt.results,exportedAt:new Date().toISOString()};ua(`robot-lab-db_${Date.now()}.json`,JSON.stringify(w,null,2),"application/json"),Ke("数据已导出 JSON","ok")}},"⬇ 导出全部数据"),p=v("input",{type:"file",accept:"application/json",style:"display:none"}),M=v("button",{class:"btn"},"⬆ 导入数据");return M.onclick=()=>p.click(),p.onchange=async()=>{const w=p.files?.[0];if(w)try{const S=JSON.parse(await w.text());Array.isArray(S.cows)&&(await ro(S.cows),Ke(`已导入 ${S.cows.length} 头牛，刷新中`,"ok"),setTimeout(()=>location.reload(),800))}catch{Ke("导入失败：文件格式错误","err")}},t.append(v("div",{class:"page-head"},v("div",null,v("h1",null,"设置与系统自检"),v("p",null,"精度门限、分档阈值、确定性与 IndexedDB 数据管理"))),v("div",{class:"grid cols-2"},v("div",{class:"card"},v("h3",null,"🎯 识别精度与确定性"),v("p",{class:"small muted"},"无噪声严格模式：点云分割 + 稳健轴 + 球拟合精修，所有报出尖点与模型真值逐头比对；同牛同种子两遍必须逐数组一致。"),v("div",{class:"btn-row"},s,r),n,e),v("div",{class:"card"},v("h3",null,"⚙ 分档与仿真参数"),v("label",{class:"field"},v("span",{class:"row"},"“能进机器人”成功率阈值",h),o),v("label",{class:"field"},v("span",{class:"row"},"“要盯着”下限阈值",f),c),v("div",{class:"form-grid"},v("label",{class:"field"},v("span",null,"套杯允许误差 mm"),l),v("label",{class:"field"},v("span",null,"每牛试验次数"),u),v("label",{class:"field"},v("span",null,"默认随机种子"),d)),_),v("div",{class:"card"},v("h3",null,"🗄 数据管理（IndexedDB）"),v("p",{class:"small muted"},`当前 ${bt.cows.length} 头牛、${bt.results.length} 条评测结果，均保存在浏览器本地 IndexedDB。`),v("div",{class:"btn-row"},x,m,M,p)),v("div",{class:"card"},v("h3",null,"ℹ 仿真可信度说明"),v("ul",{class:"small muted",style:"line-height:1.9;padding-left:18px"},v("li",null,"乳房/乳头/后腿/尾巴均为解析图元，CPU 光线求交生成深度，three.js 网格与求交模型同源。"),v("li",null,"红外强度按反射率·cosθ/距离² 衰减；弱回波增大深度高斯噪声。"),v("li",null,"深度边缘生成飞点；乳房-后腿凹处加多径偏远偏置；沾水湿斑像素饱和无效。"),v("li",null,"全部随机数来自种子化 mulberry32，相同输入深度帧与识别结果逐位一致。"),v("li",null,"300 头批量计算运行在 Web Worker，界面保持响应。"))))),t}const Qc=[{key:"herd",ico:"🐄",label:"牛群档案",hash:"#/herd"},{key:"model",ico:"🫧",label:"乳房建模",hash:"#/model"},{key:"camera",ico:"📷",label:"相机仿真",hash:"#/camera"},{key:"replay",ico:"🦾",label:"套杯回放",hash:"#/replay"},{key:"report",ico:"📊",label:"筛牛报告",hash:"#/report"},{key:"settings",ico:"⚙️",label:"设置",hash:"#/settings"}];function i_(){const i=location.hash||"#/herd",[t,e]=i.slice(1).split("?"),n=t.replace(/^\//,"")||"herd",s=new URLSearchParams(e??"").get("ear");return{route:Qc.some(r=>r.key===n)?n:"herd",ear:s}}function jc(){const{route:i,ear:t}=i_();t&&bn(t),X0(),Jc(),J0(),Q0(),e_(),document.querySelectorAll(".nav-item").forEach(s=>s.classList.toggle("active",s.dataset.route===i));const e=document.getElementById("page-host");e.innerHTML="";let n;switch(i){case"model":n=W0();break;case"camera":n=Kc();break;case"replay":n=K0();break;case"report":n=j0();break;case"settings":n=n_();break;default:n=Ql()}e.appendChild(n),window.scrollTo({top:0})}function s_(){const i=document.getElementById("app");i.innerHTML="";const t=v("aside",{class:"sidebar"},v("div",{class:"brand"},v("div",{class:"logo"},"🐮"),v("div",{class:"txt"},v("b",null,"乳头识别仿真"),v("small",null,"Milking Robot Vision Lab"))),...Qc.map(n=>v("div",{class:"nav-item","data-route":n.key,onclick:()=>{location.hash=n.hash}},v("span",{class:"ico"},n.ico),v("span",{class:"lbl"},n.label))),v("div",{class:"side-foot"},v("div",null,"TypeScript · three.js · ToF"),v("div",{id:"db-count"},"IndexedDB 初始化中…"))),e=v("main",{class:"main",id:"page-host"});i.appendChild(v("div",{class:"app-shell"},t,e))}window.addEventListener("hashchange",jc);(async function(){s_(),await Xh();const t=document.getElementById("db-count");t&&(t.textContent=`本地牛群 ${bt.cows.length} 头 · 结果 ${bt.results.length}`),location.hash||(location.hash="#/herd"),jc()})();
