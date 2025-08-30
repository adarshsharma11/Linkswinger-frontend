import { _ as __nuxt_component_0$1 } from './nuxt-link-Dd-93VsR.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-DloTEvNs.mjs';
import { _ as _imports_1 } from './virtual_public-7a_eujvF.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useHead } from './v3-B0AbSJf2.mjs';
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

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page2 animat-rate" }, _attrs))}><div class="login-content-main"><div class="login-content"><div class="login-content-header"><img${ssrRenderAttr("src", _imports_0)} alt="sign-logo"></div><h3>Hello Everyone , We are Chitchat</h3><h4>Wellcome to chitchat please signup to your account.</h4><form class="form2"><div class="form-group"><label class="col-form-label" for="inputPassword3">New Password</label><span></span><input class="form-control" id="inputPassword3" type="password" name="login[password]" required placeholder="*********"></div><div class="form-group"><label class="col-form-label" for="inputPassword3">Retype Password</label><span></span><input class="form-control" id="inputPassword4" type="password" name="login[password]" required placeholder="*********"></div><div class="form-group"><div class="rememberchk"><input class="form-check-input" id="gridCheck1" type="checkbox"><label class="form-check-label ps-4" for="gridCheck1">Remember password</label></div></div><ul class="medialogo"><li><a class="icon-btn btn-facebook button-effect rouded15" href="https://www.facebook.com/"><i class="fa fa-facebook-f"></i></a></li><li><a class="icon-btn btn-danger button-effect rouded15" href="https://www.google.com/"><i class="fa fa-google"></i></a></li><li><a class="icon-btn btn-primary button-effect rouded15" href="https://twitter.com/"><i class="fa fa-twitter"></i></a></li></ul><div class="form-group mb-0"><div class="buttons">`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    class: "btn button-effect btn-primary signpbtn",
    to: "/messenger/messenger"
  }, {
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
  _push(`</div></div></form></div></div><div class="animat-block"><div class="bg_circle"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div class="cross"></div><div class="cross1"></div><div class="cross2"></div><div class="dot"></div><div class="dot1"></div><div class="top-circle"></div><div class="center-circle"></div><div class="bottom-circle1"></div><div class="right-circle"></div><div class="right-circle1"></div><div class="quarterCircle"></div><img class="cloud-logo"${ssrRenderAttr("src", _imports_1)} alt="login logo"><img class="cloud-logo1"${ssrRenderAttr("src", _imports_1)} alt="login logo"><img class="cloud-logo2"${ssrRenderAttr("src", _imports_1)} alt="login logo"><img class="cloud-logo3"${ssrRenderAttr("src", _imports_1)} alt="login logo"><img class="cloud-logo4"${ssrRenderAttr("src", _imports_1)} alt="login logo"><img class="cloud-logo5"${ssrRenderAttr("src", _imports_1)} alt="login logo"></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Authentication/forget-password.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "forget_password",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Forget Password- Chat Messenger Nuxt Template"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AuthenticationForgetPassword = __nuxt_component_0;
      _push(ssrRenderComponent(_component_AuthenticationForgetPassword, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/authentication/forget_password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=forget_password-BYQDK3Bh.mjs.map
