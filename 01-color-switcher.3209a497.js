const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.body;let a=!1,n=null;t.addEventListener("click",(function(){if(a)return;a=!0,n=setInterval((()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(n),a=!1,t.disabled=!1,e.disabled=!0}));
//# sourceMappingURL=01-color-switcher.3209a497.js.map
