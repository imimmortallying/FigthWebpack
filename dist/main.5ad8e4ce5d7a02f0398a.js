(()=>{"use strict";console.log("11111");let e=document.querySelector("#progress-line");const t=document.querySelector("#slider");let n=document.querySelector("#generate-button");document.querySelector("#generate-text");const o=document.querySelector("#generated-password"),l=document.querySelector("#length-number"),c=document.querySelectorAll(".checkbox_input"),r=document.querySelectorAll(".strength-bar"),i=document.querySelector("#password-strength-name"),s=["NONE","MEDIUM","GOOD","STRONG","VERY STRONG"];t.addEventListener("input",(function(){let t=(12-(20-this.value))*(460/12);e.style.width=`${t}px`,l.innerHTML=this.value}));let u=3;for(let e=0;e<3;e++)r[e].classList.add("active");for(let e of c)e.addEventListener("click",(function(t){e.checked?(u++,m(),p(),a(),x(t)):(u--,m(),p(),a(),x(t))}));function a(){for(let e of c)1===u?!0===e.checked&&(e.checked=!1,e.disabled=!0):u>1&&!0===e.disabled&&(e.checked=!0,e.disabled=!1)}let d=1;t.addEventListener("input",(function(){g=+l.textContent,d=Math.floor((this.value-8)/3),m(),p()}));let h,f=3;function m(){f=u+d}function p(){h=Math.ceil(f/2);for(let e=h;e<r.length;e++)r[e].classList.remove("active");for(let e=0;e<h;e++)r[e].classList.add("active");i.textContent=s[h]}let g=+l.textContent,y=[];function v(){return y=[],b(g,u),y}function b(e,t){let n,o,l,c;0==y.length?(l=g,y.push(l),b(e,t)):y.length<t&&(l=Math.max(...y),c=y.indexOf(l),y.splice(c,1),n=Math.ceil(Math.random()*(l-1)),o=l-n,y.unshift(n),y.push(o),b(g,u))}let q=["uppercase","lowercase","numbers"];function x(e){if(e.target.closest("input").checked)q.push(e.target.closest("input").value);else{let t=q.indexOf(e.target.closest("input").value);q.splice(t,1)}}n.addEventListener("click",(function(){v(),function(){S={};let e=[];for(let t=0;t<q.length;t++)e[t]=`pool${t+1}`;for(let t=0;t<e.length;t++)S[e[t]]={name:q[t],quantity:y[t]}}(),function(){let e="",t="",n=Object.keys(S);for(let t of n)for(let n=0;n<S[t].quantity;n++)e+=M[S[t].name].charAt(Math.floor(Math.random()*M[S[t].name].length));t=e.split("").sort((function(){return.5-Math.random()})).join(""),o.textContent=t}()}));let S={},M={uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",lowercase:"abcdefghijklmnopqrstuvwxyz",numbers:"0123456789",symbols:"!()-.?[]_`~;:@#$%^&*+="};document.querySelector("#Layer_1").addEventListener("click",(()=>{navigator.clipboard.writeText(o.textContent)}))})();