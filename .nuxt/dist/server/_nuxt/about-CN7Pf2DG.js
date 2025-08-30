import { _ as _sfc_main$5, a as __nuxt_component_2$2, b as __nuxt_component_3 } from "./taptop-BxHDPFN5.js";
import { _ as _sfc_main$6 } from "./bread_crumbs-xGHmpE5E.js";
import { mergeProps, useSSRContext, ref, resolveComponent, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { _ as _export_sfc } from "../server.mjs";
import { a as _sfc_main$4, _ as __nuxt_component_2$1 } from "./testimonial-DT0sx3hm.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { _ as _imports_0$1 } from "./virtual_public-gvOZEf4Y.js";
import { u as useHead } from "./v3-B0AbSJf2.js";
import "./nuxt-link-Dd-93VsR.js";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/ufo/dist/index.mjs";
import "./virtual_public-DloTEvNs.js";
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
import "swiper/modules";
import "/Users/varun/Desktop/Data/projects/web/linkswinger/linkswinger/node_modules/@unhead/vue/dist/index.mjs";
const _imports_0 = publicAssetsURL("/images/about/1.jpg");
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "about-page section-py-space" }, _attrs))}><div class="custom-container"><div class="row"><div class="col-sm-8 offset-sm-2 text-center"><img class="img-fluid w-100 pb-4"${ssrRenderAttr("src", _imports_0)} alt="about"><div class="row"><div class="col-md-10 offset-md-1"><p> On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. </p></div></div></div></div></div></section>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bonus_page/about/about-page.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$2 = {
  __name: "counter",
  __ssrInlineRender: true,
  setup(__props) {
    const swiperOption = ref({
      breakpoints: {
        481: {
          slidesPerView: 2
        },
        576: {
          slidesPerView: 3
        },
        992: {
          slidesPerView: 4
        }
      }
    });
    const counterdata = ref([
      {
        tag: "counter-icon fa fa-user-o",
        count: 80,
        desc: "Happy Clients"
      },
      {
        tag: "counter-icon fa fa-square-o",
        count: 120,
        desc: "Project Completed"
      },
      {
        tag: "counter-icon fa fa-heart-o",
        count: 90,
        desc: "Photo Capture"
      },
      {
        tag: "counter-icon fa fa-comments-o",
        count: 140,
        desc: "Telephonic Talk"
      },
      {
        tag: "counter-icon fa fa-square-o",
        count: 120,
        desc: "Project Completed"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_number = resolveComponent("number");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "counter-sec section-py-space counter-main" }, _attrs))}><div class="container"><div class="counter-title"><h4 class="title-line">Counters</h4></div><div class="row"><div class="col-12"><div class="pt-0 counter-slider"><div>`);
      _push(ssrRenderComponent(unref(Swiper), {
        breakpoints: unref(swiperOption).breakpoints,
        slidesPerView: 4,
        mousewheel: true,
        spaceBetween: 10,
        loop: true,
        class: "swiper-wrapper"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(counterdata), (item, index) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                class: "swiper-slide",
                key: index
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="item"${_scopeId2}><div class="counter-box-second"${_scopeId2}><div class="counter-box"${_scopeId2}><div${_scopeId2}><i class="${ssrRenderClass(item.tag)}"${_scopeId2}></i><h6 class="counter-no count"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_number, {
                      class: "counter-no count",
                      ref_for: true,
                      ref: "number1",
                      from: 0,
                      to: item.count,
                      duration: 5,
                      delay: 0,
                      easing: "Power1.easeOut"
                    }, null, _parent3, _scopeId2));
                    _push3(`</h6><span${_scopeId2}>${ssrInterpolate(item.desc)}</span></div></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "item" }, [
                        createVNode("div", { class: "counter-box-second" }, [
                          createVNode("div", { class: "counter-box" }, [
                            createVNode("div", null, [
                              createVNode("i", {
                                class: item.tag
                              }, null, 2),
                              createVNode("h6", { class: "counter-no count" }, [
                                createVNode(_component_number, {
                                  class: "counter-no count",
                                  ref_for: true,
                                  ref: "number1",
                                  from: 0,
                                  to: item.count,
                                  duration: 5,
                                  delay: 0,
                                  easing: "Power1.easeOut"
                                }, null, 8, ["to"])
                              ]),
                              createVNode("span", null, toDisplayString(item.desc), 1)
                            ])
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(counterdata), (item, index) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  class: "swiper-slide",
                  key: index
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "item" }, [
                      createVNode("div", { class: "counter-box-second" }, [
                        createVNode("div", { class: "counter-box" }, [
                          createVNode("div", null, [
                            createVNode("i", {
                              class: item.tag
                            }, null, 2),
                            createVNode("h6", { class: "counter-no count" }, [
                              createVNode(_component_number, {
                                class: "counter-no count",
                                ref_for: true,
                                ref: "number1",
                                from: 0,
                                to: item.count,
                                duration: 5,
                                delay: 0,
                                easing: "Power1.easeOut"
                              }, null, 8, ["to"])
                            ]),
                            createVNode("span", null, toDisplayString(item.desc), 1)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bonus_page/about/counter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_BonusPageAboutPage = __nuxt_component_0;
  const _component_LandingPageTestimonial = _sfc_main$4;
  const _component_LandingPageSecureApp = __nuxt_component_2$1;
  const _component_BonusPageAboutCounter = _sfc_main$2;
  _push(`<div${ssrRenderAttrs(_attrs)}><ul class="page-decore"><li class="top"><img class="img-fluid inner2"${ssrRenderAttr("src", _imports_0$1)} alt="footer-back-img"></li><li class="bottom"><img class="img-fluid inner2"${ssrRenderAttr("src", _imports_0$1)} alt="footer-back-img"></li></ul>`);
  _push(ssrRenderComponent(_component_BonusPageAboutPage, null, null, _parent));
  _push(`<section class="section-py-space">`);
  _push(ssrRenderComponent(_component_LandingPageTestimonial, null, null, _parent));
  _push(`</section>`);
  _push(ssrRenderComponent(_component_LandingPageSecureApp, null, null, _parent));
  _push(ssrRenderComponent(_component_BonusPageAboutCounter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bonus_page/about/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Bonus About - Chat Messenger Nuxt Template"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonHeader = _sfc_main$5;
      const _component_CommonBreadcrumbBreadCrumbs = _sfc_main$6;
      const _component_BonusPageAbout = __nuxt_component_2;
      const _component_CommonFooter = __nuxt_component_2$2;
      const _component_CommonTapToTopTaptop = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="inner-page">`);
      _push(ssrRenderComponent(_component_CommonHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonBreadcrumbBreadCrumbs, {
        main: "Home",
        title: "About"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_BonusPageAbout, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CommonFooter, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonTapToTopTaptop, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bonus/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=about-CN7Pf2DG.js.map
