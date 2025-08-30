import { _ as __nuxt_component_0$1 } from "./nuxt-link-Dd-93VsR.js";
import { mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _imports_0 } from "./virtual_public-DloTEvNs.js";
import { _ as _imports_1, a as _imports_2, b as _imports_3, c as _imports_4, d as _imports_5 } from "./virtual_public-DGD0PMSh.js";
import { _ as _imports_1$1 } from "./virtual_public-7a_eujvF.js";
import { _ as _export_sfc } from "../server.mjs";
import { u as useHead } from "./v3-B0AbSJf2.js";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/ufo/dist/index.mjs";
import "#internal/nuxt/paths";
import "ofetch";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/hookable/dist/index.mjs";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/unctx/dist/index.mjs";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/h3/dist/index.mjs";
import "pinia";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/radix3/dist/index.mjs";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/klona/dist/index.mjs";
import "@floating-ui/utils";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page1" }, _attrs))}><div class="container-fluid p-0"></div><div class="row"><div class="col-12"><div class="login-contain-main"><div class="left-page"><div class="login-content"><div class="login-content-header"><img${ssrRenderAttr("src", _imports_0)} alt="images"></div><h3>Hello Everyone , We are Chitchat</h3><h4>Welcome to chitchat please Register to your account.</h4><form class="form1"><div class="form-group"><label class="col-form-label" for="uname">Username</label><input class="form-control" id="uname" type="text" placeholder="Demo@123"></div><div class="form-group"><label class="col-form-label" for="inputEmail3">Email Address</label><input class="form-control" id="inputEmail3" type="email" placeholder="Demo@123gmail.com"></div><div class="form-group"><label class="col-form-label" for="inputPassword3">Password</label><span></span><input class="form-control" id="inputPassword3" type="password" placeholder="********"></div><div class="form-group"><div class="rememberchk"><div class="input-text form-check ps-0"><input type="checkbox" id="gridCheck1"><label class="form-check-label ms-2 me-auto p-0" for="gridCheck1">Remember Me</label><h6 class="pull-right">`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/authentication/signup" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Forgot Password?`);
      } else {
        return [
          createTextVNode("Forgot Password?")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</h6></div></div></div><div class="form-group"><div class="buttons"><a class="btn btn-primary button-effect signpbtn" href="javascript:void(0)">Signup</a>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    class: "btn button-effect btn-signup",
    to: "/authentication/login"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Login `);
      } else {
        return [
          createTextVNode(" Login ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div><div class="line"><h6>OR Connect with</h6></div><div class="medialogo"><ul><li><a class="icon-btn btn-danger button-effect" href="https://www.google.com/"><i class="fa fa-google"></i></a></li><li><a class="icon-btn btn-primary button-effect" href="https://twitter.com/"><i class="fa fa-twitter"></i></a></li><li><a class="icon-btn btn-facebook button-effect" href="https://www.facebook.com/"><i class="fa fa-facebook-f"></i></a></li></ul></div></form><div class="termscondition"><h4><span>*</span>Terms and condition<b>&amp;</b>Privacy policy </h4></div></div></div><div class="right-page"><div class="right-login animat-rate"><div class="bg_circle"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div class="cross"></div><div class="cross1"></div><div class="cross2"></div><div class="dot"></div><div class="dot1"></div><div class="maincircle"></div><div class="top-circle"></div><div class="center-circle"></div><div class="bottom-circle"></div><div class="bottom-circle1"></div><div class="right-circle"></div><div class="right-circle1"></div><img class="heart-logo"${ssrRenderAttr("src", _imports_1)} alt="login logo"><img class="has-logo"${ssrRenderAttr("src", _imports_2)} alt="login logo"><img class="login-img"${ssrRenderAttr("src", _imports_3)} alt="login logo"><img class="boy-logo"${ssrRenderAttr("src", _imports_4)} alt="login boy logo"><img class="girl-logo"${ssrRenderAttr("src", _imports_5)} alt="girllogo"><img class="cloud-logo"${ssrRenderAttr("src", _imports_1$1)} alt="login logo"><img class="cloud-logo1"${ssrRenderAttr("src", _imports_1$1)} alt="login logo"><img class="cloud-logo2"${ssrRenderAttr("src", _imports_1$1)} alt="login logo"><img class="cloud-logo3"${ssrRenderAttr("src", _imports_1$1)} alt="login logo"><img class="cloud-logo4"${ssrRenderAttr("src", _imports_1$1)} alt="login logo"><img class="has-logo1"${ssrRenderAttr("src", _imports_2)} alt="login logo"></div></div></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Authentication/signup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Sign Up- Chat Messenger Nuxt Template"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AuthenticationSignup = __nuxt_component_0;
      _push(ssrRenderComponent(_component_AuthenticationSignup, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/authentication/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=signup-EYACqhyL.js.map
