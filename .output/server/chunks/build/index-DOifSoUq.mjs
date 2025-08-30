import { _ as __nuxt_component_0 } from './blog_header-Dd2oS-e8.mjs';
import { _ as __nuxt_component_1$1 } from './blog_sidebar-C8cKCZ6w.mjs';
import { _ as _sfc_main$2 } from './blog_media-BP9-kuZo.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { a as __nuxt_component_2, b as __nuxt_component_3, c as _imports_0 } from './taptop-BxHDPFN5.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useHead } from './v3-B0AbSJf2.mjs';
import './bread_crumbs-xGHmpE5E.mjs';
import './nuxt-link-Dd-93VsR.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './virtual_public-DloTEvNs.mjs';
import 'pinia';
import 'vue-router';
import '@floating-ui/utils';

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_BlogsBlogSidebar = __nuxt_component_1$1;
  const _component_BlogsCommonBlogMedia = _sfc_main$2;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-py-space blog-page ratio2_3" }, _attrs))}><ul class="page-decore"><li class="top"><img class="img-fluid inner2"${ssrRenderAttr("src", _imports_0)} alt="footer-back-img"></li><li class="bottom"><img class="img-fluid inner2"${ssrRenderAttr("src", _imports_0)} alt="footer-back-img"></li></ul><div class="custom-container left-blog"><div class="row">`);
  _push(ssrRenderComponent(_component_BlogsBlogSidebar, null, null, _parent));
  _push(ssrRenderComponent(_component_BlogsCommonBlogMedia, null, null, _parent));
  _push(`</div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blogs/left-sidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Blog Left Sidebar- Chat Messenger Nuxt Template"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlogsCommonBlogHeader = __nuxt_component_0;
      const _component_BlogsLeftSidebar = __nuxt_component_1;
      const _component_CommonFooter = __nuxt_component_2;
      const _component_CommonTapToTopTaptop = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_BlogsCommonBlogHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_BlogsLeftSidebar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonFooter, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonTapToTopTaptop, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blogs/blog_left-sidebar/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DOifSoUq.mjs.map
