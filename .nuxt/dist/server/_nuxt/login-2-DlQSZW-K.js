import { _ as __nuxt_component_0$1 } from "./nuxt-link-Dd-93VsR.js";
import { mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_0 } from "./virtual_public-DloTEvNs.js";
import { _ as _imports_1 } from "./virtual_public-7a_eujvF.js";
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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page2 animat-rate" }, _attrs))}><div class="login-content-main"><div class="login-content2"><div class="theme-tab"><ul class="nav nav-tabs" id="myTab" role="tablist"><li class="nav-item"><a class="nav-link" id="login-tab" data-toggle="tab" href="javascript:void(0)" role="tab" aria-selected="false">login</a></li><li class="nav-item">`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: "/authentication/signup-2",
    class: "nav-link active",
    id: "signup-tab",
    "data-toggle": "tab",
    role: "tab",
    "aria-selected": "true"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Signup `);
      } else {
        return [
          createTextVNode(" Signup ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div><div class="login-content"><div class="login-content-header"><img class="img-fluid"${ssrRenderAttr("src", _imports_0)} alt="images"></div><h3>Hello Everyone , We are Chitchat</h3><h4>Welcome to chitchat please, login to your account.</h4><form class="form2"><div class="form-group"><label class="col-form-label" for="inputEmail3">Email Address</label><input class="form-control" id="inputEmail3" type="email" placeholder="Demo@123gmail.com"></div><div class="form-group"><label class="col-form-label" for="inputPassword3">Password</label><span></span><input class="form-control" id="inputPassword3" type="password" placeholder="Password"></div><div class="form-group"><div class="rememberchk"><input class="form-check-input" id="gridCheck1" type="checkbox"><label class="form-check-label ps-4" for="gridCheck1">Remember Me</label><h6 class="pull-right">`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/authentication/login" }, {
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
  _push(`</h6></div></div><ul class="medialogo"><li><a class="icon-btn btn-facebook button-effect rouded15" href="https://www.facebook.com/"><i class="fa fa-facebook-f"></i></a></li><li><a class="icon-btn btn-danger button-effect rouded15" href="https://www.google.com/"><i class="fa fa-google"></i></a></li><li><a class="icon-btn btn-primary button-effect rouded15" href="https://twitter.com/"><i class="fa fa-twitter"></i></a></li></ul><div class="form-group mb-0"><div class="buttons"><a class="btn button-effect btn-primary" href="javascript:void(0)">Login</a></div></div></form></div></div><div class="animation-block"><div class="bg_circle"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div class="cross"></div><div class="cross1"></div><div class="cross2"></div><div class="dot"></div><div class="dot1"></div><div class="top-circle"></div><div class="center-circle"></div><div class="bottom-circle1"></div><div class="right-circle"></div><div class="right-circle1"></div><div class="quarterCircle"></div><img class="cloud-logo"${ssrRenderAttr("src", _imports_1)} alt="login logo"><img class="cloud-logo1"${ssrRenderAttr("src", _imports_1)} alt="login logo"><img class="cloud-logo2"${ssrRenderAttr("src", _imports_1)} alt="login logo"><img class="cloud-logo3"${ssrRenderAttr("src", _imports_1)} alt="login logo"><img class="cloud-logo4"${ssrRenderAttr("src", _imports_1)} alt="login logo"><img class="cloud-logo5"${ssrRenderAttr("src", _imports_1)} alt="login logo"></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Authentication/login-2.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "login-2",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Login Two- Chat Messenger Nuxt Template"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AuthenticationLogin2 = __nuxt_component_0;
      _push(ssrRenderComponent(_component_AuthenticationLogin2, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/authentication/login-2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-2-DlQSZW-K.js.map
