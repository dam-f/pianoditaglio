(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),r=t(3),c=t.n(r),m=(t(9),t(1));var o=function(e){return n.a.createElement("div",{className:"bb b--black-30 pl3 flex justify-between pr3 items-center"},n.a.createElement("p",null,"- ",n.a.createElement("strong",null,e.numStecche)," stecche da"," ",n.a.createElement("strong",null,e.misuraStecca)," cm"),n.a.createElement("small",{className:""},n.a.createElement("input",{className:"",type:"button",value:"elimina"})))};function s(e){return n.a.createElement(o,{numStecche:e[0],misuraStecca:e[1]})}var i=function(e){return e.ordine?n.a.createElement("div",{className:"bg-white pa2 br4 pb4 bb bw2"},e.ordine.map(s)):n.a.createElement("div",null)};var u=function(e){return n.a.createElement("div",{className:"bb b--black-30 pl3 flex justify-between pr3 items-center"},n.a.createElement("p",null,"- ",n.a.createElement("strong",null,e.combPiano[0])," barre tagliate cos\xec:"," ",n.a.createElement("strong",null,e.combPiano[2].join(", ")),n.a.createElement("br",null),"(scarto ",Math.round(100*e.combPiano[4]+Number.EPSILON)/100," ","cm)"))};var b=function(e){let a=e.profilo,t=0;if("AL/1"===a?t=50:"AC/6"===a?t=10:"AL/2HD"===a?t=15:"AL/2"===a&&(t=30),e.piano){const a=e.piano,l=a[0][1],r=(a[0][3],Math.floor(l/t)),c=l%t;let m=a.slice(0);return m.shift(),m.pop(),m.pop(),n.a.createElement("div",null,n.a.createElement("div",{className:"bg-white pa2 br4 pb4 bb bw2"},n.a.createElement("p",{className:"tc bb b--black-30"},"BARRE NECESSARIE: ",n.a.createElement("strong",null,l)," (",n.a.createElement("strong",null,r)," pacchi e"," ",n.a.createElement("strong",null,c)," stecche)",n.a.createElement("br",null),n.a.createElement("br",null)),m.map(function(e){return n.a.createElement(u,{combPiano:e})}),n.a.createElement("p",{className:"bb b--black-30 pl3 pr3"},"Oh, e cerca tra gli sfridi qualcosa per tagliare ancora queste stecche:",n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("strong",null,a[a.length-1].join(",  ")),n.a.createElement("br",null),n.a.createElement("br",null))),n.a.createElement("p",null))}return n.a.createElement("div",null)};var p=function(){const e=Object(l.useState)({steccheCorrente:"",misuraCorrente:""}),a=Object(m.a)(e,2),t=a[0],r=a[1],c=Object(l.useState)([]),o=Object(m.a)(c,2),s=o[0],u=o[1],p=Object(l.useState)(),E=Object(m.a)(p,2),f=E[0],h=E[1],g=Object(l.useState)([]),d=Object(m.a)(g,2),w=(d[0],d[1],Object(l.useState)("AL/1")),N=Object(m.a)(w,2),v=N[0],S=N[1],C=Object(l.useState)({maxScarto:15,minSfrido:65,larghezzaLama:.5}),A=Object(m.a)(C,2),L=A[0],z=A[1];function O(e){const a=e.target.value,t=e.target.name;z(e=>"opzioneScarto"===t?{maxScarto:a,minSfrido:e.minSfrido,larghezzaLama:e.larghezzaLama}:"opzioneSfrido"===t?{maxScarto:e.maxScarto,minSfrido:a,larghezzaLama:e.larghezzaLama}:"opzioneLama"===t?{maxScarto:e.maxScarto,minSfrido:e.minSfrido,larghezzaLama:a}:void 0)}function k(e){const a=e.target.value,t=e.target.name;r(e=>"numStecche"===t?{steccheCorrente:a,misuraCorrente:e.misuraCorrente}:"misura"===t?{steccheCorrente:e.steccheCorrente,misuraCorrente:a}:void 0)}return n.a.createElement("div",{className:"flex flex-wrap"},n.a.createElement("div",{className:"min-vh-100-l bg-gray pt2 fl w-100-ns w-100-m w-40-l"},n.a.createElement("h1",{className:"pl2 pa1 bg-gold w-100"},"ORDINE"),n.a.createElement("div",{className:"pa3"},n.a.createElement("form",{className:"bg- br3 flex items-end pa2\r "},n.a.createElement("label",{className:"mr2"},n.a.createElement("strong",null,"N. stecche"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("input",{className:"input-reset ba b--black-20 pa2 mb2 db w-100",type:"number",id:"numStecche",name:"numStecche",value:t.steccheCorrente,onChange:k})),n.a.createElement("label",{className:"mr2"},n.a.createElement("strong",null,"Misura taglio"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("input",{className:"input-reset ba b--black-20 pa2 mb2 db w-100",type:"number",id:"misura",name:"misura",value:t.misuraCorrente,onChange:k})),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("label",null,n.a.createElement("input",{className:"input-reset bg-blue white b ba b--black-20 pa2 mb2 db w-100",type:"submit",value:"Aggiungi",onClick:function(e){e.preventDefault(),u(e=>t.steccheCorrente&&t.misuraCorrente&&t.steccheCorrente>0&&t.misuraCorrente>0?[...e,[Number(t.steccheCorrente),Number(t.misuraCorrente)]]:e),r({steccheCorrente:"",misuraCorrente:""})}}))),n.a.createElement("br",null),n.a.createElement("div",{className:"pa2 br4"},n.a.createElement(i,{ordine:s})))),n.a.createElement("div",{className:"bg-blue pt2 fl w-100-ns w-100-m w-20-l"},n.a.createElement("h1",{className:"pl2 pa1 bg-gold w-100"},"OPZIONI"),n.a.createElement("div",{className:"flex items-start flex-wrap pa3"},n.a.createElement("label",{className:"w-third pa2"},n.a.createElement("strong",null,"SCARTO MAX"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("input",{className:"input-reset ba b--black-20 pa2 mb2 db w-100",name:"opzioneScarto",type:"number",value:L.maxScarto,onChange:O}),n.a.createElement("small",{id:"name-desc",class:"f6 db mb2"},"Lunghezza massimo scarto")),n.a.createElement("label",{className:"w-third pa2"},n.a.createElement("strong",null,"SCARTO MIN"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("input",{className:"input-reset ba b--black-20 pa2 mb2 db w-100",name:"opzioneSfrido",type:"number",value:L.minSfrido,onChange:O}),n.a.createElement("small",{id:"name-desc",class:"f6 db mb2"},"Lunghezza minima sfrido")),n.a.createElement("label",{className:"w-third pa2"},n.a.createElement("strong",null,"LAMA"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("input",{className:"input-reset ba b--black-20 pa2 mb2 db w-100",name:"opzioneLama",type:"number",value:L.larghezzaLama,onChange:O}),n.a.createElement("small",{id:"name-desc",class:"f6 db mb2"},"Larghezza lama (imposta 0.5 per alluminio, 0.2 per acciaio):")),n.a.createElement("label",{className:"w-third pa2"},n.a.createElement("strong",null,"PROFILO"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("fieldset",{className:"input-reset bw0 pa0 w-100",onChange:function(e){const a=e.target.value;"AL/1"===a?S("AL/1"):"AC/6"===a?S("AC/6"):"AL/2HD"===a?S("AL/2HD"):"AL/2"===a&&S("AL/2")}},n.a.createElement("select",{name:"profilo",className:"input-reset ba b--black-20 pa2 mb2 db w-100"},n.a.createElement("option",{value:"AL/1",selected:"selected"},"AL/1"),n.a.createElement("option",{value:"AC/6"},"AC/6"),n.a.createElement("option",{value:"AL/2HD"},"AL/2 HD"),n.a.createElement("option",{value:"AL/2"},"AL/2"))),n.a.createElement("small",{id:"name-desc",class:"f6 db mb2"},"Info usata per calcolare il numero dei pacchi necessari:")))),n.a.createElement("div",{className:"bg-gold pt2 fl w-100 w-100-ns w-100-m w-40-l pa3"},n.a.createElement("h1",{className:"pl2 pa1"},"PIANO"),n.a.createElement("p",{className:"pl2 tc"},n.a.createElement("input",{className:"input-reset bg-blue b white bw2 bb-black bt-0 bl-0 br-0 pa2 mb2 w-50 br3",type:"button",name:"creaPiano",onClick:function(){let e,a=[],t=[],l=[],n=0,r=0,c=[];function m(e,a,t=650){let l=a.reduce(function(e,a){return e+a},0)+L.larghezzaLama*a.length;return e<650-l&&(650-l-e>L.minSfrido||650-l-e<L.maxScarto)}function o(n){a=[];const r=[];n.forEach((e,a)=>r.push(e[1])),r.sort(function(e,a){return a[1]-e[1]}),function(e){let l=e[e.length-1];for(let c=0;c<e.length;c++)n=e[c],(t=[]).push(n),a.push(t);var n;let r=Math.round(650/(l+.5));for(let t=0;t<r;t++){let t=a.length;for(let l=0;l<t;l++){let t=650-a[l].reduce(function(e,a){return e+a},0);for(let n=0;n<e.length;n++)if(m(e[n],a[l],t)){let t=a[l].slice(0);t.push(e[n]),a.push(t)}}}}(r),function(e,a){let t=0,n=!1,r=e[0].slice(0),m=[];for(let l=0;l<a.length;l++)m[l]=a[l].slice();let o,s=!1;for(;!s;){for(let e=0;e<r.length;e++)for(let a=0;a<m.length;a++)r[e]===m[a][1]&&(m[a][0]=m[a][0]-1,0===m[a][0]&&(console.log("Ho finito di tagliare la misura fittizia ",m[a][1]),s=!0,o=m[a][1]));t++}let i=!1;for(let l=0;l<m.length;l++)m[l][0]<0&&(i=!0,c.push(m[l][1]));if(i&&t--,i)for(let l=0;l<t;l++)for(let t=0;t<e[0].length;t++)for(let l=0;l<a.length;l++)e[0][t]===a[l][1]&&(a[l][0]=a[l][0]-1);else for(;!n;)for(let t=0;t<e[0].length;t++)for(let l=0;l<a.length;l++)e[0][t]===a[l][1]&&(a[l][0]=a[l][0]-1,0===a[l][0]&&(console.log("Ho finito di tagliare la misura ",a[l][1]),n=!0,a.splice(l,1)));for(let l=0;l<a.length;l++)a[l][1]===o&&a.splice(l,1);l.push([t,"barre tagliate cos\xec: ",e[0]," con scarto: ",e[1]])}(e=function(e){let a=[e[0]];for(let t=0;t<e.length;t++){let l=650-a[0].reduce(function(e,a){return e+a},0),n=650-e[t].reduce(function(e,a){return e+a},0);l>n&&(a=[e[t],n])}return a}(a),n),n.length>0&&o(n)}o(s),function(e){for(let a=0;a<e.length;a++)n+=e[a][0],r+=e[a][4]*e[a][0]}(l),l.unshift(["Barre utilizzate: ",n,"Scarto totale: ",r]),l.push("(SOLUZ. TEMPORANEA) Infine taglia queste stecche dagli sfridi o da una nuova barra (se sono molte puoi calcolare un nuovo piano di taglio) :",c),h(l)},value:"CREA PIANO"})),n.a.createElement(b,{piano:f,profilo:v})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(10);c.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()}).catch(e=>{console.error(e.message)})},4:function(e,a,t){e.exports=t(11)},9:function(e,a,t){}},[[4,1,2]]]);
//# sourceMappingURL=main.e2efb7d7.chunk.js.map