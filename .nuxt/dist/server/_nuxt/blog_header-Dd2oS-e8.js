import { _ as _sfc_main$1 } from "./taptop-BxHDPFN5.js";
import { _ as _sfc_main$2 } from "./bread_crumbs-xGHmpE5E.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_CommonHeader = _sfc_main$1;
  const _component_CommonBreadcrumbBreadCrumbs = _sfc_main$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "inner-page" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_CommonHeader, null, null, _parent));
  _push(ssrRenderComponent(_component_CommonBreadcrumbBreadCrumbs, {
    main: "Home",
    title: "Blog"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blogs/Common/blog_header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __nuxt_component_0 as _
};
//# sourceMappingURL=blog_header-Dd2oS-e8.js.map
