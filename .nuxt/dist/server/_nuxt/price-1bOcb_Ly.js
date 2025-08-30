import { _ as _export_sfc, a as __nuxt_component_0$1 } from "../server.mjs";
import { useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { u as useHead } from "./v3-B0AbSJf2.js";
import "ofetch";
import "#internal/nuxt/paths";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/hookable/dist/index.mjs";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/unctx/dist/index.mjs";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/h3/dist/index.mjs";
import "pinia";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/radix3/dist/index.mjs";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/ufo/dist/index.mjs";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/klona/dist/index.mjs";
import "@floating-ui/utils";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_client_only = __nuxt_component_0$1;
  _push(ssrRenderComponent(_component_client_only, _attrs, {}, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bonus_page/price/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "price",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Bonus Price - Chat Messenger Nuxt Template"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BonusPagePrice = __nuxt_component_0;
      _push(ssrRenderComponent(_component_BonusPagePrice, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bonus/price.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=price-1bOcb_Ly.js.map
