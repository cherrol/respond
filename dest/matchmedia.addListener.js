/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
!function(e){if(e.matchMedia&&e.matchMedia("all").addListener)return!1;var t=e.matchMedia,a=t("only all").matches,n=!1,i=0,r=[],c=function(a){e.clearTimeout(i),i=e.setTimeout((function(){for(var a=0,n=r.length;a<n;a++){var i=r[a].mql,c=r[a].listeners||[],s=t(i.media).matches;if(s!==i.matches){i.matches=s;for(var l=0,m=c.length;l<m;l++)c[l].call(e,i)}}}),30)};e.matchMedia=function(i){var s=t(i),l=[],m=0;return s.addListener=function(t){a&&(n||(n=!0,e.addEventListener("resize",c,!0)),0===m&&(m=r.push({mql:s,listeners:l})),l.push(t))},s.removeListener=function(e){for(var t=0,a=l.length;t<a;t++)l[t]===e&&l.splice(t,1)},s}}(Window);