import { _ as _sfc_main$2$1, a as __nuxt_component_2$2, b as __nuxt_component_3$1 } from './taptop-BxHDPFN5.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dd-93VsR.mjs';
import { mergeProps, ref, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { _ as _imports_0$6 } from './virtual_public-DloTEvNs.mjs';
import { _ as _imports_1$3 } from './virtual_public-BZCgBRg3.mjs';
import { _ as __nuxt_component_2$1, a as _sfc_main$9 } from './testimonial-DT0sx3hm.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';
import '@floating-ui/utils';

const _imports_0$5 = publicAssetsURL("/images/landing/2.png");
const _imports_1$2 = publicAssetsURL("/images/landing/header/1.png");
const _sfc_main$8 = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "slider-block" }, _attrs))}><div class="custom-container"><div class="row"><div class="col-12"><div class="slider-main"><div class="slider-contain"><h1>Easy To Use Our Chat App</h1><h4><span>Desktop App </span>\u2013 Easy to use our chat app, Attractive and<br> clean design, with many Features Dark &amp; light, Recent Chat And many more....... </h4><div class="downlaod"><div class="footer-btn">`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    class: "btn active",
    to: "/messenger/messenger"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Start for free`);
      } else {
        return [
          createTextVNode("Start for free")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div></div></div><img class="img-fluid chat-slide"${ssrRenderAttr("src", _imports_0$5)} alt="inner"><img class="img-fluid inner1"${ssrRenderAttr("src", _imports_1$2)} alt="inner1"></section>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing-page/slider.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$6]]);
const _imports_0$4 = publicAssetsURL("/images/landing/app/hover.png");
const _sfc_main$7 = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "section-py-space app-design-block",
    id: "features"
  }, _attrs))}><div class="container-fluid"><div class="row"><div class="col-12"><div class="landing-title"><div><h1>about app</h1></div><div class="sub-title"><div><h4>Exclusive Features</h4><h2>We provide best feature for app design and coding</h2></div></div></div></div></div></div><div class="container"><div class="row app-code-block"><div class="col-md-4"><div class="app-design-main"><div class="icon-box"><i class="ti-wand"></i></div><img class="img-fluid app-hover"${ssrRenderAttr("src", _imports_0$4)} alt="app hover img"><div class="contant-box"><h2>latest design</h2><h4> Easy to use our chat app, Attractive Features Dark &amp; light. </h4></div></div></div><div class="col-md-4"><div class="app-design-main hover"><div class="icon-box"><i class="ti-mobile"></i></div><img class="img-fluid app-hover"${ssrRenderAttr("src", _imports_0$4)} alt="app hover img"><div class="contant-box"><h2>fully responsive</h2><h4> Easy to use our chat app, Attractive Features Dark &amp; light. </h4></div></div></div><div class="col-md-4"><div class="app-design-main"><div class="icon-box"><i class="ti-shortcode"></i></div><img class="img-fluid app-hover"${ssrRenderAttr("src", _imports_0$4)} alt="app hover img"><div class="contant-box"><h2>clean code</h2><h4> Easy to use our chat app, Attractive Features Dark &amp; light. </h4></div></div></div><div class="col-12 text-center">`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    class: "btn app-btn",
    to: "/"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`view more `);
      } else {
        return [
          createTextVNode("view more ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></section>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing-page/app-design.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$5]]);
const _imports_0$3 = publicAssetsURL("/images/landing/chitchat/4.png");
const _imports_3$1 = publicAssetsURL("/images/landing/chitchat/1.png");
const _imports_4$1 = publicAssetsURL("/images/landing/chitchat/3.png");
const _sfc_main$6 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-py-space chitchat-main light-bg" }, _attrs))}><div class="container-fluid"><div class="landing-title"><div><h1>why chooce</h1></div><div class="sub-title"><div><h4>Why Chooce Chitchat</h4><h2>Chitchat is fully responsive excellent choice</h2></div></div></div></div><div class="custom-container"><div class="row chit-chat-block"><div class="col-md-6"><div class="chitchat-contain"><img class="img-fluid chitchat-img"${ssrRenderAttr("src", _imports_0$3)} alt="chit-chat"></div></div><div class="col-md-6"><div class="chitchat-contain"><div><div class="chitchat-logo"><img class="img-fluid"${ssrRenderAttr("src", _imports_0$6)} alt="landing-logo"></div><h3>Easy to use<span> Our Application</span></h3><h1>All-in-one responsive app for you</h1><h4> It is about us being able to offer help with the branding campaign, product presentation, and advertisement running across social media. </h4><ul class="detial-price"><li><i class="fa fa-check"></i>Customer First Content-focused Displaying Effects </li><li><i class="fa fa-check"></i>High Definition Full-screen Sliders &amp; Backgrounds </li><li><i class="fa fa-check"></i>Try for free, Forever!</li></ul>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: "/messenger/messenger",
    class: "btn pricing-btn"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` view more`);
      } else {
        return [
          createTextVNode(" view more")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div><div class="chitchat-back-block"><img class="img-fluid chit-chat1"${ssrRenderAttr("src", _imports_1$3)} alt="chit-chat-back-img"><img class="img-fluid chit-chat2"${ssrRenderAttr("src", _imports_3$1)} alt="chit-chat-back-img"><img class="img-fluid chit-chat3"${ssrRenderAttr("src", _imports_4$1)} alt="chit-chat-back-img"></div></section>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing-page/chit-chat.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$4]]);
const _imports_0$2 = publicAssetsURL("/images/landing/teamwork/5.png");
const _imports_1$1 = publicAssetsURL("/images/landing/teamwork/1.png");
const _imports_2 = publicAssetsURL("/images/landing/teamwork/2.png");
const _imports_3 = publicAssetsURL("/images/landing/teamwork/3.png");
const _imports_4 = publicAssetsURL("/images/landing/teamwork/4.png");
const _imports_5 = publicAssetsURL("/images/landing/slider/6.png");
const _sfc_main$5 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "section-py-space team-work-main",
    id: "team"
  }, _attrs))}><div class="custom-container"><div class="row team-block"><div class="col-md-6"><div class="team-work-content"><div><div class="ply-main"><div class="ply-content"><div class="ply-sub-content"><i class="fa fa-play"></i></div></div><h3>See Our <span>Team work</span></h3></div><h1>Efficient teamwork for every enterprise</h1><h4> Big companies save time with Slack by securely collaborating across teams, departments, offices and countries. </h4>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    class: "btn pricing-btn",
    to: "/messenger/messenger"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Chitchat for enterprise`);
      } else {
        return [
          createTextVNode(" Chitchat for enterprise")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div><div class="col-md-6"><div class="team-work-content"><img class="img-fluid team-main"${ssrRenderAttr("src", _imports_0$2)} alt="chit-chat"></div></div></div></div><img class="img-fluid team1"${ssrRenderAttr("src", _imports_1$1)} alt="team-work"><img class="img-fluid team2"${ssrRenderAttr("src", _imports_2)} alt="team-work"><img class="img-fluid team3"${ssrRenderAttr("src", _imports_3)} alt="team-work"><img class="img-fluid team4"${ssrRenderAttr("src", _imports_4)} alt="team-work"><img class="img-fluid team5"${ssrRenderAttr("src", _imports_5)} alt="team-work"></section>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing-page/team-work.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$3]]);
const _imports_0$1 = publicAssetsURL("/images/landing/finger-tips/main.jpg");
const _sfc_main$4 = {
  data() {
    return {
      activeitem: 1
    };
  },
  methods: {
    activemenu(id) {
      this.activeitem = id;
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "collaboration-main section-py-space" }, _attrs))}><div class="container-fluid"><div class="row"><div class="col-12"><div class="landing-title"><div><h1>finger tips</h1></div><div class="sub-title"><div><h4>Exclusive Features</h4><h2>Put collaboration at your fingertips</h2></div></div></div></div></div></div><div class="custom-container"><div class="row"><div class="col-12"><div class="collaboration-content"><ul class="collab-tab nav nav-pills"><li class="nav-item"><a data-toggle="pill" class="${ssrRenderClass([$data.activeitem == 1 ? "active show" : "", "nav-link"])}"><div class="tab-main"><div class="tab-img"><i class="ti-thought"></i></div><div class="tab-content"><h3>Organise</h3><p>conversation</p></div></div></a></li><li class="nav-item"><a data-toggle="pill" class="${ssrRenderClass([$data.activeitem == 2 ? "active show" : "", "nav-link"])}"><div class="tab-main"><div class="tab-img"><i class="ti-zip"></i></div><div class="tab-content"><h3>Shared</h3><p>file and etc</p></div></div></a></li><li class="nav-item"><a data-toggle="pill" class="${ssrRenderClass([$data.activeitem == 3 ? "active show" : "", "nav-link"])}"><div class="tab-main"><div class="tab-img"><i class="ti-search"></i></div><div class="tab-content"><h3>Search</h3><p>everything</p></div></div></a></li><li class="nav-item"><a data-toggle="pill" class="${ssrRenderClass([$data.activeitem == 4 ? "active show" : "", "nav-link"])}"><div class="tab-main"><div class="tab-img"><i class="ti-video-camera"></i></div><div class="tab-content"><h3>talk in</h3><p>video call</p></div></div></a></li></ul></div><div class="tab-detail"><div class="tab-content"><div id="tab1" class="${ssrRenderClass([$data.activeitem == 1 ? "active show" : "", "tab-pane container"])}"><img class="img-fluid"${ssrRenderAttr("src", _imports_0$1)} alt="tab-detail-img"></div><div id="tab2" class="${ssrRenderClass([$data.activeitem == 2 ? "active show" : "", "tab-pane container fade"])}"><img class="img-fluid"${ssrRenderAttr("src", _imports_0$1)} alt="tab-detail-img"></div><div id="tab3" class="${ssrRenderClass([$data.activeitem == 3 ? "active show" : "", "tab-pane container fade"])}"><img class="img-fluid"${ssrRenderAttr("src", _imports_0$1)} alt="tab-detail-img"></div><div id="tab4" class="${ssrRenderClass([$data.activeitem == 4 ? "active show" : "", "tab-pane container fade"])}"><img class="img-fluid"${ssrRenderAttr("src", _imports_0$1)} alt="tab-detail-img"></div></div></div></div></div></div></section>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing-page/collaboration.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$3 = {
  __name: "pricing-plan",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    let swiperOption = ref({
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 0
        },
        1070: {
          slidesPerView: 3,
          spaceBetween: 0
        },
        1600: {
          slidesPerView: 3
        }
      }
    });
    let plans = [
      {
        img: "/images/landing/pricing-plan/1.png",
        plan: "Free Plan",
        price: "$0",
        palne: "Totally Free Plane",
        feature1: "Common Feature is Available",
        feature2: "sxgsgerggregrterett",
        feature3: "Try for free, Forever!"
      },
      {
        img: "/images/landing/pricing-plan/2.png",
        plan: "Professional",
        price: "$59",
        palne: "Professional Plane",
        feature1: "All Features is Available",
        feature2: "High Definition Full-screen",
        feature3: "24/7 phone and email support"
      },
      {
        img: "/images/landing/pricing-plan/3.png",
        plan: "Advanced",
        price: "$99",
        palne: "Advance Plane",
        feature1: "All Features is Available",
        feature2: "High Definition Full-screen",
        feature3: "24/7 phone and email support"
      },
      {
        img: "/images/landing/pricing-plan/2.png",
        plan: "Professional",
        price: "$59",
        palne: "Professional Plane",
        feature1: "All Features is Available",
        feature2: "High Definition Full-screen",
        feature3: "24/7 phone and email support"
      }
    ];
    let modules = [Pagination];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-py-space",
        id: "price"
      }, _attrs))}><div class="container-fluid"><div class="row"><div class="col-12"><div class="landing-title"><div><h1>pricing plan</h1></div><div class="sub-title"><div><h4>Choose Your Pricing Plan</h4><h2>Affordable for everyone!</h2></div></div></div></div></div></div><div class="custom-container"><div class="row"><div class="col-12"><div><div>`);
      _push(ssrRenderComponent(unref(Swiper), {
        breakpoints: unref(swiperOption).breakpoints,
        Swiper: "",
        slidesPerView: 4,
        mousewheel: true,
        spaceBetween: 10,
        loop: true,
        pagination: { clickable: true },
        modules: unref(modules),
        class: "swiper-wrapper"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(plans), (item, index) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                class: "swiper-slide",
                key: index
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="item"${_scopeId2}><div class="pricing-box"${_scopeId2}><div${_scopeId2}><div class="pricing-icon"${_scopeId2}><img class="img-fluid"${ssrRenderAttr("src", `${unref(config).public.baseURL}${item.img}`)} alt="test-img"${_scopeId2}></div><div class="pricing-content"${_scopeId2}><h2${_scopeId2}>${ssrInterpolate(item.plan)}</h2><h4${_scopeId2}>${ssrInterpolate(item.price)} | ${ssrInterpolate(item.palne)}</h4>`);
                    _push3(ssrRenderComponent(_component_nuxt_link, {
                      class: "btn pricing-btn",
                      to: "/bonus/price"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`get started`);
                        } else {
                          return [
                            createTextVNode("get started")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div><ul class="avb-price"${_scopeId2}><li${_scopeId2}><i class="fa fa-check"${_scopeId2}></i>${ssrInterpolate(item.feature1)}</li><li${_scopeId2}><i class="fa fa-check"${_scopeId2}></i>${ssrInterpolate(item.feature2)}</li><li${_scopeId2}><i class="fa fa-check"${_scopeId2}></i>${ssrInterpolate(item.feature3)}</li></ul></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "item" }, [
                        createVNode("div", { class: "pricing-box" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "pricing-icon" }, [
                              createVNode("img", {
                                class: "img-fluid",
                                src: `${unref(config).public.baseURL}${item.img}`,
                                alt: "test-img"
                              }, null, 8, ["src"])
                            ]),
                            createVNode("div", { class: "pricing-content" }, [
                              createVNode("h2", null, toDisplayString(item.plan), 1),
                              createVNode("h4", null, toDisplayString(item.price) + " | " + toDisplayString(item.palne), 1),
                              createVNode(_component_nuxt_link, {
                                class: "btn pricing-btn",
                                to: "/bonus/price"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("get started")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("ul", { class: "avb-price" }, [
                              createVNode("li", null, [
                                createVNode("i", { class: "fa fa-check" }),
                                createTextVNode(toDisplayString(item.feature1), 1)
                              ]),
                              createVNode("li", null, [
                                createVNode("i", { class: "fa fa-check" }),
                                createTextVNode(toDisplayString(item.feature2), 1)
                              ]),
                              createVNode("li", null, [
                                createVNode("i", { class: "fa fa-check" }),
                                createTextVNode(toDisplayString(item.feature3), 1)
                              ])
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
              (openBlock(true), createBlock(Fragment, null, renderList(unref(plans), (item, index) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  class: "swiper-slide",
                  key: index
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "item" }, [
                      createVNode("div", { class: "pricing-box" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "pricing-icon" }, [
                            createVNode("img", {
                              class: "img-fluid",
                              src: `${unref(config).public.baseURL}${item.img}`,
                              alt: "test-img"
                            }, null, 8, ["src"])
                          ]),
                          createVNode("div", { class: "pricing-content" }, [
                            createVNode("h2", null, toDisplayString(item.plan), 1),
                            createVNode("h4", null, toDisplayString(item.price) + " | " + toDisplayString(item.palne), 1),
                            createVNode(_component_nuxt_link, {
                              class: "btn pricing-btn",
                              to: "/bonus/price"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("get started")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("ul", { class: "avb-price" }, [
                            createVNode("li", null, [
                              createVNode("i", { class: "fa fa-check" }),
                              createTextVNode(toDisplayString(item.feature1), 1)
                            ]),
                            createVNode("li", null, [
                              createVNode("i", { class: "fa fa-check" }),
                              createTextVNode(toDisplayString(item.feature2), 1)
                            ]),
                            createVNode("li", null, [
                              createVNode("i", { class: "fa fa-check" }),
                              createTextVNode(toDisplayString(item.feature3), 1)
                            ])
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing-page/pricing-plan.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/images/landing/subscribe/1.png");
const _imports_1 = publicAssetsURL("/images/landing/subscribe/2.png");
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "section-py-space subscribe-main light-bg",
    id: "subscribe"
  }, _attrs))}><div class="container-fluid"><div class="row"><div class="col-12"><div class="landing-title"><div><h1>subscribe</h1></div><div class="sub-title"><div><h4>Subscribe Newsletter</h4><h2>Subscribe to receive updates</h2></div></div></div></div></div></div><div class="custom-container"><div class="row subscribe-block"><div class="col-md-6"><div class="subscribe-content"><img class="img-fluid"${ssrRenderAttr("src", _imports_0)} alt="subscribe-landing"></div></div><div class="col-md-6"><div class="subscribe-content"><div><h1>Subscribe our Newsletter get new update.</h1><form class="form-inline d-flex"><input class="form-control" placeholder="your name"><input class="form-control" placeholder="email"><button class="btn">Submit</button></form><h4>Check Features. <span>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/messenger/messenger" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Learn More `);
      } else {
        return [
          createTextVNode("Learn More ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</span></h4></div></div></div></div></div><div class="subscribe-back-content"><img class="img-fluid subscribe-img1"${ssrRenderAttr("src", _imports_1)} alt="subscribe-back-img"></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing-page/subscribe-update.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_9 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_CommonHeader = _sfc_main$2$1;
  const _component_LandingPageSlider = __nuxt_component_1;
  const _component_LandingPageAppDesign = __nuxt_component_2;
  const _component_LandingPageChitChat = __nuxt_component_3;
  const _component_LandingPageTeamWork = __nuxt_component_4;
  const _component_LandingPageSecureApp = __nuxt_component_2$1;
  const _component_LandingPageCollaboration = __nuxt_component_6;
  const _component_LandingPageTestimonial = _sfc_main$9;
  const _component_LandingPagePricingPlan = _sfc_main$3;
  const _component_LandingPageSubscribeUpdate = __nuxt_component_9;
  const _component_CommonFooter = __nuxt_component_2$2;
  const _component_CommonTapToTopTaptop = __nuxt_component_3$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "theme-landing" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_CommonHeader, null, null, _parent));
  _push(ssrRenderComponent(_component_LandingPageSlider, null, null, _parent));
  _push(ssrRenderComponent(_component_LandingPageAppDesign, null, null, _parent));
  _push(ssrRenderComponent(_component_LandingPageChitChat, null, null, _parent));
  _push(ssrRenderComponent(_component_LandingPageTeamWork, null, null, _parent));
  _push(ssrRenderComponent(_component_LandingPageSecureApp, null, null, _parent));
  _push(ssrRenderComponent(_component_LandingPageCollaboration, null, null, _parent));
  _push(`<section class="section-py-space light-bg"><div class="landing-title"><div><h1>Team</h1></div><div class="sub-title"><div><h4>Team</h4><h2>Our Experts</h2></div></div></div>`);
  _push(ssrRenderComponent(_component_LandingPageTestimonial, null, null, _parent));
  _push(`</section>`);
  _push(ssrRenderComponent(_component_LandingPagePricingPlan, null, null, _parent));
  _push(ssrRenderComponent(_component_LandingPageSubscribeUpdate, null, null, _parent));
  _push(ssrRenderComponent(_component_CommonFooter, null, null, _parent));
  _push(ssrRenderComponent(_component_CommonTapToTopTaptop, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing-page/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Chitchat - Chat Messenger Nuxt Template"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LandingPage = __nuxt_component_0;
      _push(ssrRenderComponent(_component_LandingPage, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DlaSLKo3.mjs.map
