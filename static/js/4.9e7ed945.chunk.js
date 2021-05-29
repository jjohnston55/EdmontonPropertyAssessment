(this["webpackJsonpedmonton-property-assessment"]=this["webpackJsonpedmonton-property-assessment"]||[]).push([[4],{31:function(t,n,e){"use strict";e.r(n),e.d(n,"default",(function(){return f}));var i,r=e(2),a=(e(0),e(3)),s=e(1);function o(t){var n=t.title,e=t.description;return Object(s.jsxs)(d,{children:[Object(s.jsx)("h3",{className:"focus-in-expand",children:n}),Object(s.jsx)("h2",{className:"focus-in-expand",children:e})]})}var c,d=a.a.div(i||(i=Object(r.a)(["\n\tmargin: 0.5rem;\n\tbackground-color: rgba(255, 255, 255, 0.288);\n\tborder-radius: 5px;\n\tbox-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);\n\tpadding: 0 25px;\n\n\th3 {\n\t\tmargin: 15px;\n\t\tfont-weight: 100;\n\t\tfont-size: 1.5rem;\n\t}\n\n\th2 {\n\t\tmargin: 15px;\n\t\tfont-weight: 500;\n\t\tfont-size: 1.8rem;\n\t}\n\n\t.focus-in-expand {\n\t\t-webkit-animation: focus-in-expand 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s both;\n\t\tanimation: focus-in-expand 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s both;\n\t}\n\n\t@-webkit-keyframes focus-in-expand {\n\t\t0% {\n\t\t\tletter-spacing: -0.5em;\n\t\t\t-webkit-filter: blur(12px);\n\t\t\tfilter: blur(12px);\n\t\t\topacity: 0;\n\t\t}\n\t\t100% {\n\t\t\t-webkit-filter: blur(0px);\n\t\t\tfilter: blur(0px);\n\t\t\topacity: 1;\n\t\t}\n\t}\n\n\t@keyframes focus-in-expand {\n\t\t0% {\n\t\t\tletter-spacing: -0.5em;\n\t\t\t-webkit-filter: blur(12px);\n\t\t\tfilter: blur(12px);\n\t\t\topacity: 0;\n\t\t}\n\t\t100% {\n\t\t\t-webkit-filter: blur(0px);\n\t\t\tfilter: blur(0px);\n\t\t\topacity: 1;\n\t\t}\n\t}\n\n\t@media screen and (max-width: 1024px) {\n\t\tpadding: 0 10px;\n\n\t\th3 {\n\t\t\tfont-size: 1.1rem;\n\t\t}\n\t\th2 {\n\t\t\tfont-size: 1.2rem;\n\t\t}\n\t}\n\n\t@media screen and (max-width: 425px) {\n\t\tpadding: 0 5px;\n\t\tmax-width: 50%;\n\t\th3 {\n\t\t\tfont-size: 0.9rem;\n\t\t}\n\t\th2 {\n\t\t\tfont-size: 1rem;\n\t\t}\n\t}\n"]))),p=e(29);function l(t){var n={lat:t.latitude,lng:t.longitude};return Object(s.jsx)(m,{id:"map",children:Object(s.jsx)(p.a,{bootstrapURLKeys:{key:"",language:"en",libraries:["places"]},center:n,onGoogleApiLoaded:function(t){return function(t,e){return new e.Marker({position:n,map:t})}(t.map,t.maps)},yesIWantToUseGoogleMapApiInternals:!0,zoom:15})})}var b,x,h,u,m=a.a.div(c||(c=Object(r.a)(["\n\tbox-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);\n\theight: 100%;\n\twidth: 100;\n"])));function f(t){var n=t.property,e=t.neighbourhood,i=t.avg,r=new Intl.NumberFormat("en-CA",{currency:"CAD",style:"currency"});return Object(s.jsxs)(j,{children:[Object(s.jsx)(g,{children:Object(s.jsx)("div",{className:"map",children:Object(s.jsx)(l,{latitude:parseFloat(n.latitude),longitude:parseFloat(n.longitude)})})}),Object(s.jsxs)(w,{children:[Object(s.jsx)(o,{description:e.descriptive_name,title:"Neighbourhood"}),Object(s.jsx)(o,{description:r.format(n.assessed_value),title:"Assessed Value"}),Object(s.jsx)(o,{description:r.format(i),title:"Neighbourhood Average"})]}),Object(s.jsx)(g,{children:e.description?Object(s.jsx)(O,{children:e.description}):Object(s.jsx)(O,{children:"No description available for this neighbourhood"})})]})}var j=a.a.div(b||(b=Object(r.a)(["\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: center;\n\twidth: 100%;\n"]))),g=a.a.div(x||(x=Object(r.a)(["\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-evenly;\n\n\t.map {\n\t\twidth: 100%;\n\t\theight: 450px;\n\n\t\t@media screen and (max-width: 768px) {\n\t\t\theight: 200px;\n\t\t}\n\t}\n"]))),w=Object(a.a)(g)(h||(h=Object(r.a)(["\n\tflex-wrap: wrap;\n\tpadding: 0.5rem 0;\n"]))),O=a.a.p(u||(u=Object(r.a)(["\n\tfont-size: 1.4rem;\n\ttext-align: justify;\n\tmargin: 0 1.5rem;\n\tfont-weight: 300;\n\n\t@media screen and (max-width: 1024px) {\n\t\tfont-size: 1.2rem;\n\t}\n"])))}}]);
//# sourceMappingURL=4.9e7ed945.chunk.js.map