import { _ as __nuxt_component_0 } from "./nuxt-link-Dd-93VsR.js";
import { ref, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { u as useRuntimeConfig } from "../server.mjs";
const _sfc_main = {
  __name: "blog_media",
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
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "col-xl-9 col-lg-8 col-md-7" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(blogDetail), (item, index) => {
        _push(`<div class="row blog-media"><div class="col-xl-6"><div class="blog-side"><div class="blog-left"><a href="javascript:void(0)"><img class="img-fluid"${ssrRenderAttr("src", `${unref(config).public.baseURL}${item.img}`)} alt=""></a></div><div class="blog-right"><div><h6>${ssrInterpolate(item.date)}</h6>`);
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
        _push(`<ul class="post-social"><li><i class="fa fa-user"></i>${ssrInterpolate(item.user)}</li><li><i class="fa fa-comments"></i> ${ssrInterpolate(item.comment)}</li></ul><p>${ssrInterpolate(item.longDesc)}</p></div></div></div></div><div class="col-xl-6"><div class="blog-side"><div class="blog-left"><a href="javascript:void(0)"><img class="img-fluid"${ssrRenderAttr("src", `${unref(config).public.baseURL}${item.img1}`)} alt=""></a></div><div class="blog-right"><div><h6>${ssrInterpolate(item.date)}</h6>`);
        _push(ssrRenderComponent(_component_nuxt_link, { to: "/blogs/blog_details" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<a href="javascript:void(0)"${_scopeId}><h4${_scopeId}>${ssrInterpolate(item.shortDesc)}</h4></a>`);
            } else {
              return [
                createVNode("a", { href: "javascript:void(0)" }, [
                  createVNode("h4", null, toDisplayString(item.shortDesc), 1)
                ])
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blogs/Common/blog_media.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=blog_media-BP9-kuZo.js.map
