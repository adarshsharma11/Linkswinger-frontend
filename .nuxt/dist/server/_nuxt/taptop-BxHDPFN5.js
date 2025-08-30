import { _ as __nuxt_component_0$1 } from "./nuxt-link-Dd-93VsR.js";
import { mergeProps, withCtx, createVNode, useSSRContext, ref, unref, createTextVNode } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass } from "vue/server-renderer";
import { _ as _imports_0 } from "./virtual_public-DloTEvNs.js";
import { _ as _export_sfc, a as __nuxt_component_0$2 } from "../server.mjs";
import { _ as _imports_0$1 } from "./virtual_public-gvOZEf4Y.js";
const _sfc_main$4 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(ssrRenderComponent(_component_nuxt_link, mergeProps({
    class: "navbar-brand",
    to: "/messenger/messenger"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="logo-block"${_scopeId}><img class="img-fluid"${ssrRenderAttr("src", _imports_0)} alt="logo"${_scopeId}></div>`);
      } else {
        return [
          createVNode("div", { class: "logo-block" }, [
            createVNode("img", {
              class: "img-fluid",
              src: _imports_0,
              alt: "logo"
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/logo/logo.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_client_only = __nuxt_component_0$2;
  _push(ssrRenderComponent(_component_client_only, _attrs, {}, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/navbar/navbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$2 = {
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    ref(0);
    const fixedheader = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLogo = __nuxt_component_0;
      const _component_CommonNavbar = __nuxt_component_1;
      _push(`<header${ssrRenderAttrs(mergeProps({ id: "home" }, _attrs))}><div class="custom-container"><div class="row"><div class="col-12"><div class="${ssrRenderClass([unref(fixedheader) ? "fixed" : "", "landing-header"])}"><div class="main-menu"><nav class="navbar navbar-expand-sm navbar-light">`);
      _push(ssrRenderComponent(_component_CommonLogo, null, null, _parent));
      _push(`<button class="navbar-toggler d-xl-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>`);
      _push(ssrRenderComponent(_component_CommonNavbar, null, null, _parent));
      _push(`</nav></div></div></div></div></div></header>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/header/header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<footer${ssrRenderAttrs(_attrs)}><div class="container footer-main"><div class="row footer-block"><div class="col-lg-3 col-md-6"><div class="footer-title footer-mobile-title"><h3>About</h3></div><div class="about-payment footer-contant"><div class="logo">`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/messenger/messenger" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="logo"${_scopeId}>`);
      } else {
        return [
          createVNode("img", {
            src: _imports_0,
            alt: "logo"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><p> Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece Lorem fugit on looked ipsum. </p><ul class="social-group"><li><a class="icon-btn btn-google button-effect btn-sm" href="https://www.facebook.com/"><i class="fa fa-facebook"></i></a></li><li><a class="icon-btn btn-twiter button-effect btn-sm" href="https://twitter.com/"><i class="fa fa-twitter"></i></a></li><li><a class="icon-btn btn-linkedin button-effect btn-sm" href="https://www.linkedin.com/"><i class="fa fa-linkedin"></i></a></li><li><a class="icon-btn btn-instagram button-effect btn-sm" href="https://www.instagram.com/"><i class="fa fa-instagram"></i></a></li></ul></div></div><div class="col-lg-2 col-md-3"><div class="links"><div class="footer-title"><h3>Useful Links</h3></div><div class="footer-contant"><ul><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/messenger/messenger" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Home`);
      } else {
        return [
          createTextVNode("Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/bonus/about" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`About us`);
      } else {
        return [
          createTextVNode("About us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/bonus/faq" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`FAQ`);
      } else {
        return [
          createTextVNode("FAQ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/bonus/elements" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Elements`);
      } else {
        return [
          createTextVNode("Elements")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div></div><div class="col-lg-2 col-md-3"><div class="links"><div class="footer-title"><h3>Blog Links</h3></div><div class="footer-contant"><ul><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/blogs/blog_no-sidebar" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`No sidebar`);
      } else {
        return [
          createTextVNode("No sidebar")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/blogs/blog_left-sidebar" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Left sidebar`);
      } else {
        return [
          createTextVNode("Left sidebar")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/blogs/blog_right-sidebar" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Right sidebar`);
      } else {
        return [
          createTextVNode("Right sidebar")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/blogs/blog_details" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Details page`);
      } else {
        return [
          createTextVNode("Details page")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div></div><div class="col-lg-2 col-md-4"><div class="links"><div class="footer-title"><h3>Authentication</h3></div><div class="footer-contant"><ul><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/authentication/login" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Signin`);
      } else {
        return [
          createTextVNode("Signin")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/authentication/login-2" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Signin classic`);
      } else {
        return [
          createTextVNode("Signin classic")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/authentication/signup" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Signup`);
      } else {
        return [
          createTextVNode("Signup")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/authentication/signup-2" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Signup classic`);
      } else {
        return [
          createTextVNode("Signup classic")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div></div><div class="col-lg-3 col-md-4"><div class="downlaod"><div><div class="footer-title"><h3>Download Apps</h3></div><div class="footer-contant"><div class="footer-btn"><a class="btn active" href="https://www.apple.com/in/itunes/"><i class="fa fa-apple"></i><div><h6>Available on the</h6><h4>App store</h4></div></a><a class="btn" href="https://play.google.com/store"><i class="fa fa-play"></i><div><h6>Available on the</h6><h4>Google play</h4></div></a></div></div></div></div></div></div></div><div class="footer-back-block"><img class="img-fluid inner1"${ssrRenderAttr("src", _imports_0$1)} alt="footer-back-img"><img class="img-fluid inner2"${ssrRenderAttr("src", _imports_0$1)} alt="footer-back-img"></div><div class="container copyright-footer"><div class="row copyright"><div class="col-md-6 col-sm-12"><p class="footer-left">© 2021 Chitchat. All Rights Reserved</p></div><div class="col-md-6 col-sm-12 links_horizontal"><p class="text-end"> Made with <span>♥ </span>By Theme Pixelstrap </p></div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/footer/footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  name: "TapTop",
  data() {
    return {
      display: false
    };
  },
  mounted() {
    (void 0).addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    (void 0).removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    executeScroll() {
      (void 0).scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
    handleScroll() {
      if ((void 0).scrollY > 600) {
        this.display = true;
      } else {
        this.display = false;
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "tap-top",
    style: $data.display ? "display:block" : "display:none"
  }, _attrs))}><div><i class="fa fa-angle-double-up"></i></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/tap-to-top/taptop.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _sfc_main$2 as _,
  __nuxt_component_2 as a,
  __nuxt_component_3 as b
};
//# sourceMappingURL=taptop-BxHDPFN5.js.map
