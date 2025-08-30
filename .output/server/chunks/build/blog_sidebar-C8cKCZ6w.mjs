import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';

const _sfc_main$5 = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-card" }, _attrs))}><h4>search</h4><div class="blog-search"><div class="input-group"><input class="form-control" type="text" placeholder="search in blog"><span><i class="fa fa-search"></i></span></div></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blogs/Common/blog_search.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$4 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-card" }, _attrs))}><h4>follow us</h4><ul class="blog-follow"><li><a href="https://www.facebook.com/"><i class="fa fa-facebook-square"></i></a></li><li><a href="https://twitter.com/"><i class="fa fa-twitter"></i></a></li><li><a href="https://www.instagram.com/"><i class="fa fa-instagram"></i></a></li><li><a href="https://www.skype.com/en/"><i class="fa fa-skype"></i></a></li><li><a href="https://www.linkedin.com/"><i class="fa fa-linkedin"></i></a></li></ul></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blogs/Common/blog_follow_us.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
const _imports_0 = publicAssetsURL("/images/blog/small/1.jpg");
const _imports_1 = publicAssetsURL("/images/blog/small/2.jpg");
const _imports_2 = publicAssetsURL("/images/blog/small/3.jpg");
const _imports_3 = publicAssetsURL("/images/blog/small/4.jpg");
const _sfc_main$3 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-card" }, _attrs))}><h4>Recent Blog</h4><ul class="recent-blog"><li><div class="d-flex"><img class="img-fluid blur-up lazyload"${ssrRenderAttr("src", _imports_0)} alt="Generic placeholder image"><div class="flex-grow-1 align-self-center"><h5>1 Dec 2020</h5><p>0 hits</p></div></div></li><li><div class="d-flex"><img class="img-fluid blur-up lazyload"${ssrRenderAttr("src", _imports_1)} alt="Generic placeholder image"><div class="flex-grow-1 align-self-center"><h5>2 Dec 2020</h5><p>0 hits</p></div></div></li><li><div class="d-flex"><img class="img-fluid blur-up lazyload"${ssrRenderAttr("src", _imports_2)} alt="Generic placeholder image"><div class="flex-grow-1 align-self-center"><h5>3 Dec 2020</h5><p>0 hits</p></div></div></li><li><div class="d-flex"><img class="img-fluid blur-up lazyload"${ssrRenderAttr("src", _imports_3)} alt="Generic placeholder image"><div class="flex-grow-1 align-self-center"><h5>4 Dec 2020</h5><p>0 hits</p></div></div></li><li><div class="d-flex"><img class="img-fluid blur-up lazyload"${ssrRenderAttr("src", _imports_1)} alt="Generic placeholder image"><div class="flex-grow-1 align-self-center"><h5>5 Dec 2020</h5><p>0 hits</p></div></div></li></ul></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blogs/Common/blog_recent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-card" }, _attrs))}><h4>Popular Blog</h4><ul class="popular-blog"><li><div class="d-flex"><div class="blog-date"><h3>03</h3><span>may</span></div><div class="flex-grow-1 align-self-center"><h5>Humour the like</h5><p> it look like readable English. Many desktop publishing text. </p></div></div></li><li><div class="d-flex"><div class="blog-date"><h3>03</h3><span>may</span></div><div class="flex-grow-1 align-self-center"><h5>Injected like</h5><p> it look like readable English. Many desktop publishing text. </p></div></div></li><li><div class="d-flex"><div class="blog-date"><h3>03</h3><span>may</span></div><div class="flex-grow-1 align-self-center"><h5>Injected like</h5><p> it look like readable English. Many desktop publishing text. </p></div></div></li><li><div class="d-flex"><div class="blog-date"><h3>03</h3><span>may</span></div><div class="flex-grow-1 align-self-center"><h5>Injected the</h5><p> it look like readable English. Many desktop publishing text. </p></div></div></li></ul></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blogs/Common/blog_popular.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-card" }, _attrs))}><ul class="tags"><li><a href="javascript:void(0)">Design</a></li><li><a href="javascript:void(0)">Clean</a></li><li><a href="javascript:void(0)">CSS3</a></li><li><a href="javascript:void(0)">Portfolio</a></li><li><a href="javascript:void(0)">Pixelstrap</a></li><li><a href="javascript:void(0)">Perfect</a></li><li><a href="javascript:void(0)">NoJquery </a></li></ul></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blogs/Common/blog_tags.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_BlogsCommonBlogSearch = __nuxt_component_0;
  const _component_BlogsCommonBlogFollowUs = __nuxt_component_1$1;
  const _component_BlogsCommonBlogRecent = __nuxt_component_2;
  const _component_BlogsCommonBlogPopular = __nuxt_component_3;
  const _component_BlogsCommonBlogTags = __nuxt_component_4;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "col-xl-3 col-lg-4 col-md-5" }, _attrs))}><div class="blog-sidebar">`);
  _push(ssrRenderComponent(_component_BlogsCommonBlogSearch, null, null, _parent));
  _push(ssrRenderComponent(_component_BlogsCommonBlogFollowUs, null, null, _parent));
  _push(ssrRenderComponent(_component_BlogsCommonBlogRecent, null, null, _parent));
  _push(ssrRenderComponent(_component_BlogsCommonBlogPopular, null, null, _parent));
  _push(ssrRenderComponent(_component_BlogsCommonBlogTags, null, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blogs/blog_sidebar/blog_sidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=blog_sidebar-C8cKCZ6w.mjs.map
