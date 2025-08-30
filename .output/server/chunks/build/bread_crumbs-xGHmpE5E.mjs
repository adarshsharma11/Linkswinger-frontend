import { _ as __nuxt_component_0 } from './nuxt-link-Dd-93VsR.mjs';
import { mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = {
  __name: "bread_crumbs",
  __ssrInlineRender: true,
  props: {
    title: {
      default: "home"
    },
    main: {
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "breadcrumb-main" }, _attrs))}><div class="custom-container"><h2>${ssrInterpolate(__props.title)}</h2><ul><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { to: "/messenger/messenger" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.main)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.main), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li><a href="javascript:void(0)">${ssrInterpolate(__props.title)}</a></li></ul></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/breadcrumb/bread_crumbs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=bread_crumbs-xGHmpE5E.mjs.map
