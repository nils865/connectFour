(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerpolicy&&(o.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?o.credentials="include":l.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();function x(){}function R(e){return e()}function F(){return Object.create(null)}function N(e){e.forEach(R)}function Y(e){return typeof e=="function"}function D(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function re(e){return Object.keys(e).length===0}function k(e,t){e.appendChild(t)}function O(e,t,n){e.insertBefore(t,n||null)}function L(e){e.parentNode&&e.parentNode.removeChild(e)}function J(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function v(e){return document.createElement(e)}function Q(e){return document.createTextNode(e)}function U(){return Q(" ")}function le(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function p(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ie(e){return Array.from(e.childNodes)}function oe(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}let M;function C(e){M=e}const E=[],G=[],A=[],W=[],ce=Promise.resolve();let P=!1;function se(){P||(P=!0,ce.then(V))}function S(e){A.push(e)}const q=new Set;let b=0;function V(){if(b!==0)return;const e=M;do{try{for(;b<E.length;){const t=E[b];b++,C(t),fe(t.$$)}}catch(t){throw E.length=0,b=0,t}for(C(null),E.length=0,b=0;G.length;)G.pop()();for(let t=0;t<A.length;t+=1){const n=A[t];q.has(n)||(q.add(n),n())}A.length=0}while(E.length);for(;W.length;)W.pop()();P=!1,q.clear(),C(e)}function fe(e){if(e.fragment!==null){e.update(),N(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(S)}}const B=new Set;let ue;function X(e,t){e&&e.i&&(B.delete(e),e.i(t))}function ae(e,t,n,r){if(e&&e.o){if(B.has(e))return;B.add(e),ue.c.push(()=>{B.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}else r&&r()}function de(e){e&&e.c()}function Z(e,t,n,r){const{fragment:l,after_update:o}=e.$$;l&&l.m(t,n),r||S(()=>{const f=e.$$.on_mount.map(R).filter(Y);e.$$.on_destroy?e.$$.on_destroy.push(...f):N(f),e.$$.on_mount=[]}),o.forEach(S)}function ee(e,t){const n=e.$$;n.fragment!==null&&(N(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function me(e,t){e.$$.dirty[0]===-1&&(E.push(e),se(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function te(e,t,n,r,l,o,f,c=[-1]){const a=M;C(e);const u=e.$$={fragment:null,ctx:[],props:o,update:x,not_equal:l,bound:F(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(a?a.$$.context:[])),callbacks:F(),dirty:c,skip_bound:!1,root:t.target||a.$$.root};f&&f(u.root);let m=!1;if(u.ctx=n?n(e,t.props||{},(h,d,...y)=>{const g=y.length?y[0]:d;return u.ctx&&l(u.ctx[h],u.ctx[h]=g)&&(!u.skip_bound&&u.bound[h]&&u.bound[h](g),m&&me(e,h)),d}):[],u.update(),m=!0,N(u.before_update),u.fragment=r?r(u.ctx):!1,t.target){if(t.hydrate){const h=ie(t.target);u.fragment&&u.fragment.l(h),h.forEach(L)}else u.fragment&&u.fragment.c();t.intro&&X(e.$$.fragment),Z(e,t.target,t.anchor,t.customElement),V()}C(a)}class ne{$destroy(){ee(this,1),this.$destroy=x}$on(t,n){if(!Y(n))return x;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const l=r.indexOf(n);l!==-1&&r.splice(l,1)}}$set(t){this.$$set&&!re(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function z(e,t,n){const r=e.slice();return r[8]=t[n],r[10]=n,r}function he(e,t,n){const r=e.slice();return r[8]=t[n],r}function ge(e){let t;return{c(){t=v("div"),t.innerHTML="<div></div>",p(t,"class","slot svelte-1gqs8ge")},m(n,r){O(n,t,r)},p:x,d(n){n&&L(t)}}}function H(e){let t,n,r,l,o=Array(j),f=[];for(let c=0;c<o.length;c+=1)f[c]=ge(he(e,o,c));return{c(){t=v("div");for(let c=0;c<f.length;c+=1)f[c].c();n=U(),p(t,"id","column"+e[10]),p(t,"class","column svelte-1gqs8ge")},m(c,a){O(c,t,a);for(let u=0;u<f.length;u+=1)f[u].m(t,null);k(t,n),r||(l=le(t,"click",e[1]),r=!0)},p:x,d(c){c&&L(t),J(f,c),r=!1,l()}}}function _e(e){let t,n,r,l,o,f=Array($),c=[];for(let a=0;a<f.length;a+=1)c[a]=H(z(e,f,a));return{c(){t=v("div"),n=v("h1"),r=Q(e[0]),l=U(),o=v("div");for(let a=0;a<c.length;a+=1)c[a].c();p(n,"class","svelte-1gqs8ge"),p(o,"id","gamefield"),p(o,"class","svelte-1gqs8ge")},m(a,u){O(a,t,u),k(t,n),k(n,r),k(t,l),k(t,o);for(let m=0;m<c.length;m+=1)c[m].m(o,null)},p(a,[u]){if(u&1&&oe(r,a[0]),u&2){f=Array($);let m;for(m=0;m<f.length;m+=1){const h=z(a,f,m);c[m]?c[m].p(h,u):(c[m]=H(h),c[m].c(),c[m].m(o,null))}for(;m<c.length;m+=1)c[m].d(1);c.length=f.length}},i:x,o:x,d(a){a&&L(t),J(c,a)}}}const $=7,j=6;function K(e){return e.children[0].classList.contains("redCoin")?"redCoin":e.children[0].classList.contains("yellowCoin")?"yellowCoin":null}function ye(e,t,n){let r="redCoin",l=!1,o="It's reds turn";function f(h){l=!0,h==="redCoin"?n(0,o="Red won!"):n(0,o="Yellow won!")}function c(){r==="redCoin"?r="yellowCoin":r="redCoin"}function a(h,d){const y=h[d],g=K(y);let _=1;for(let i=d+1;i<=5;i++){if(g!=K(h[i])){_=1;break}_++,_>=4&&f(g)}const I=(i=>parseInt(i.id[i.id.length-1]))(y.parentElement);let T=I;for(let i=I;i>0&&document.getElementById(`column${i-1}`).children[d].children[0].classList.contains(g);i--)T=i-1;_=0;for(let i=T;i<$&&document.getElementById(`column${i}`).children[d].children[0].classList.contains(g);i++){_++;_>=4&&f(g)}let s={x:I,y:d};for(let i=s.x;i>=0&&!(s.x-1<0||s.y+1>=j);i--)if(document.getElementById(`column${i-1}`).children[s.y+1].children[0].classList.contains(g))s.x=i-1,s.y=s.y+1;else break;_=1;for(let i=s.x;i<$&&!(s.x+1>=$||s.y-1<0);i++){if(document.getElementById(`column${i+1}`).children[s.y-1].children[0].classList.contains(g))s.x=i+1,s.y=s.y-1,_++;else break;_>=4&&f(g)}s={x:I,y:d};for(let i=s.x;i>=0&&!(s.x-1<0||s.y-1<0);i--)if(document.getElementById(`column${i-1}`).children[s.y-1].children[0].classList.contains(g))s.x=i-1,s.y=s.y-1;else break;_=1;for(let i=s.x;i<$&&!(s.x+1>=$||s.y+1>=j);i++){if(document.getElementById(`column${i+1}`).children[s.y+1].children[0].classList.contains(g))s.x=i+1,s.y=s.y+1,_++;else break;_>=4&&f(g)}}function u(h){const d=h.children;for(let y=d.length-1;y>=0;y--){const g=d[y];if(!g.children[0].classList.contains("coin")){g.children[0].classList.add(r),g.children[0].classList.add("coin"),a(d,y),c();break}}}function m(h){if(l)return;let d=h.target;d.classList.contains("coin")&&(d=d.parentElement),d.classList.contains("slot")&&(d=d.parentElement),d.classList.contains("column")&&d.id.startsWith("column")&&u(d),!l&&(r=="redCoin"?n(0,o="It's reds turn"):r=="yellowCoin"&&n(0,o="It's yellows turn"))}return[o,m]}class pe extends ne{constructor(t){super(),te(this,t,ye,_e,D,{})}}function xe(e){let t,n,r;return n=new pe({}),{c(){t=v("div"),de(n.$$.fragment),p(t,"id","mainPage"),p(t,"class","svelte-51hzl6")},m(l,o){O(l,t,o),Z(n,t,null),r=!0},p:x,i(l){r||(X(n.$$.fragment,l),r=!0)},o(l){ae(n.$$.fragment,l),r=!1},d(l){l&&L(t),ee(n)}}}class $e extends ne{constructor(t){super(),te(this,t,null,xe,D,{})}}new $e({target:document.getElementById("app")});
