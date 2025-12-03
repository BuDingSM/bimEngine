(function(e,n){typeof exports=="object"&&typeof module<"u"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(e=typeof globalThis<"u"?globalThis:e||self,n(e.BimEngineSDK={}))})(this,(function(e){"use strict";class n{container;constructor(i){const t=typeof i=="string"?document.getElementById(i):i;if(!t)throw new Error("Container not found");this.container=t,this.init()}init(){this.container.innerHTML=`
            <div style="font-family: sans-serif; color: #333;">
                <h1>BimEngine</h1>
                <p>这是一个纯 TypeScript 组件入口。</p>
            </div>
        `}}e.BimEngine=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));
//# sourceMappingURL=bim-engine-sdk.umd.js.map
