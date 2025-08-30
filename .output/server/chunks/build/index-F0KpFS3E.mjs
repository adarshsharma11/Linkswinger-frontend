import { _ as __nuxt_component_0 } from './blog_header-Dd2oS-e8.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dd-93VsR.mjs';
import { mergeProps, ref, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { a as __nuxt_component_2, b as __nuxt_component_3, c as _imports_0 } from './taptop-BxHDPFN5.mjs';
import { u as useHead } from './v3-B0AbSJf2.mjs';
import './bread_crumbs-xGHmpE5E.mjs';
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
import 'pinia';
import 'vue-router';
import '@floating-ui/utils';
import './virtual_public-DloTEvNs.mjs';

const _sfc_main$2 = {
  __name: "blog_no-sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    let blogDetail = ref([
      {
        img: "/images/blog/1.jpg",
        img1: "/images/blog/2.jpg",
        date: "25 January 2021",
        shortDesc: "you how all this mistaken idea of denouncing pleasure.",
        user: "Admin",
        comment: "10 Comment",
        longDesc: "Consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure."
      },
      {
        img: "/images/blog/3.jpg",
        img1: "/images/blog/4.jpg",
        date: "25 January 2021",
        shortDesc: "you how all this mistaken idea of denouncing pleasure.",
        user: "Admin",
        comment: "10 Comment",
        longDesc: "Consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure."
      },
      {
        img: "/images/blog/1.jpg",
        img1: "/images/blog/2.jpg",
        date: "25 January 2021",
        shortDesc: "you how all this mistaken idea of denouncing pleasure.",
        user: "Admin",
        comment: "10 Comment",
        longDesc: "Consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure."
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "col-12 blog-list" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(blogDetail), (item, index) => {
        _push(`<div class="row blog-media"><div class="col-xl-6"><div class="blog-side"><div class="blog-left text-center"><a href="javascript:void(0)"><img class="img-fluid"${ssrRenderAttr("src", `${unref(config).public.baseURL}${item.img}`)} alt=""></a></div><div class="blog-right"><div><h6>${ssrInterpolate(item.date)}</h6>`);
        _push(ssrRenderComponent(_component_nuxt_link, { to: "/blogs/blog_details" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h4${_scopeId}>${ssrInterpolate(item.shortDesc)}</h4>`);
            } else {
              return [
                createVNode("h4", null, toDisplayString(item.shortDesc), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<ul class="post-social"><li><i class="fa fa-user"></i>${ssrInterpolate(item.user)}</li><li><i class="fa fa-comments"></i> ${ssrInterpolate(item.comment)}</li></ul><p>${ssrInterpolate(item.longDesc)}</p></div></div></div></div><div class="col-xl-6"><div class="blog-side"><div class="blog-left text-center"><a href="javascript:void(0)"><img class="img-fluid"${ssrRenderAttr("src", `${unref(config).public.baseURL}${item.img1}`)} alt=""></a></div><div class="blog-right"><div><h6>${ssrInterpolate(item.date)}</h6>`);
        _push(ssrRenderComponent(_component_nuxt_link, { to: "/blogs/blog_details" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h4${_scopeId}>${ssrInterpolate(item.shortDesc)}</h4>`);
            } else {
              return [
                createVNode("h4", null, toDisplayString(item.shortDesc), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<ul class="post-social"><li><i class="fa fa-user"></i>${ssrInterpolate(item.user)}</li><li><i class="fa fa-comments"></i> ${ssrInterpolate(item.comment)}</li></ul><p>${ssrInterpolate(item.longDesc)}</p></div></div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blogs/blog_no-sidebar/blog_no-sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_BlogsBlogNoSidebar = _sfc_main$2;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-py-space blog-page ratio2_3" }, _attrs))}><ul class="page-decore"><li class="top"><img class="img-fluid inner2"${ssrRenderAttr("src", _imports_0)} alt="footer-back-img"></li><li class="bottom"><img class="img-fluid inner2"${ssrRenderAttr("src", _imports_0)} alt="footer-back-img"></li></ul><div class="custom-container"><div class="row">`);
  _push(ssrRenderComponent(_component_BlogsBlogNoSidebar, null, null, _parent));
  _push(`</div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blogs/no-sidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Blog No Sidebar- Chat Messenger Nuxt Template"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlogsCommonBlogHeader = __nuxt_component_0;
      const _component_BlogsNoSidebar = __nuxt_component_1;
      const _component_CommonFooter = __nuxt_component_2;
      const _component_CommonTapToTopTaptop = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_BlogsCommonBlogHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_BlogsNoSidebar, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonFooter, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonTapToTopTaptop, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blogs/blog_no-sidebar/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-F0KpFS3E.mjs.map
