import { _ as __nuxt_component_0 } from './nuxt-link-Dd-93VsR.mjs';
import { ref, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';

const _imports_0$1 = publicAssetsURL("/images/landing/parallax/1.png");
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "section-pb-space secure-app-main" }, _attrs))}><div class="custom-container"><div class="row"><div class="col-lg-5 offset-lg-7 col-lg-5 offset-lg-2"><div class="secure-app-content"><div><div class="ply-main"><div class="ply-content"><i class="ti-shield"></i></div><h3>Secure Your <span>Messages</span></h3></div><h1>The world&#39;s top secure App</h1><h4><span>Desktop App </span>\u2013 Easy to use our chat app, Attractive and clean design, with many Features :- Dark &amp; light, Recent Chat And many more....... </h4>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: "/messenger/messenger",
    class: "btn pricing-btn"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` learn more`);
      } else {
        return [
          createTextVNode(" learn more")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div><div class="secure-back-content"><img class="img-fluid secure-img1"${ssrRenderAttr("src", _imports_0$1)} alt="parellex-img1"><img class="img-fluid secure-img2"${ssrRenderAttr("src", _imports_0$1)} alt="parellex-img1"></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing-page/secure-app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _imports_0 = publicAssetsURL("/images/landing/testimonial/icon1.png");
const _imports_1 = publicAssetsURL("/images/landing/testimonial/icon2.png");
const _imports_2 = publicAssetsURL("/images/landing/testimonial/icon3.png");
const _imports_3 = publicAssetsURL("/images/landing/testimonial/6.png");
const _sfc_main = {
  __name: "testimonial",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const swiperOption = ref({
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1070: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1600: {
          slidesPerView: 4
        }
      }
    });
    const testimonial = ref([
      {
        img: "/images/landing/testimonial/1.png",
        heart: true,
        manager: "project manager",
        equipment: "Advanced Equipment",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      },
      {
        img: "/images/landing/testimonial/2.png",
        heart: false,
        manager: "project manager",
        equipment: "Advanced Equipment",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      },
      {
        img: "/images/landing/testimonial/3.png",
        heart: true,
        manager: "project manager",
        equipment: "Advanced Equipment",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      },
      {
        img: "/images/landing/testimonial/4.png",
        heart: true,
        manager: "project manager",
        equipment: "Advanced Equipment",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      },
      {
        img: "/images/landing/testimonial/3.png",
        heart: true,
        manager: "project manager",
        equipment: "Advanced Equipment",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      }
    ]);
    const modules = [Pagination, Navigation];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "custom-container testimonial-main" }, _attrs))}><div class="row"><div class="col-12">`);
      _push(ssrRenderComponent(unref(Swiper), {
        breakpoints: unref(swiperOption).breakpoints,
        navigation: true,
        Swiper: "",
        slidesPerView: 4,
        mousewheel: true,
        spaceBetween: 10,
        loop: true,
        pagination: { clickable: true },
        modules,
        class: "swiper-wrapper"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(testimonial), (item, index) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                class: "swiper-slide",
                key: index
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="item"${_scopeId2}><div class="testimonial-box mt-0"${_scopeId2}><div class="test-img"${_scopeId2}><img class="img-fluid"${ssrRenderAttr("src", `${unref(config).public.baseURL}${item.img}`)} alt="test-img"${_scopeId2}>`);
                    if (item.heart) {
                      _push3(`<i class="test-wish fa fa-heart"${_scopeId2}></i>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><div class="test-contain"${_scopeId2}><h4${_scopeId2}>${ssrInterpolate(item.manager)}</h4><h3${_scopeId2}>${ssrInterpolate(item.equipment)}</h3><h6${_scopeId2}>${ssrInterpolate(item.desc)}</h6><ul class="test-icon"${_scopeId2}><li${_scopeId2}><a href="https://www.google.com/"${_scopeId2}><img class="img-fluid"${ssrRenderAttr("src", _imports_0)} alt="icon-google"${_scopeId2}></a></li><li${_scopeId2}><a href="https://twitter.com/"${_scopeId2}><img class="img-fluid"${ssrRenderAttr("src", _imports_1)} alt="icon-google"${_scopeId2}></a></li><li${_scopeId2}><a href="https://www.facebook.com/"${_scopeId2}><img class="img-fluid"${ssrRenderAttr("src", _imports_2)} alt="icon-google"${_scopeId2}></a></li></ul></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "item" }, [
                        createVNode("div", { class: "testimonial-box mt-0" }, [
                          createVNode("div", { class: "test-img" }, [
                            createVNode("img", {
                              class: "img-fluid",
                              src: `${unref(config).public.baseURL}${item.img}`,
                              alt: "test-img"
                            }, null, 8, ["src"]),
                            item.heart ? (openBlock(), createBlock("i", {
                              key: 0,
                              class: "test-wish fa fa-heart"
                            })) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "test-contain" }, [
                            createVNode("h4", null, toDisplayString(item.manager), 1),
                            createVNode("h3", null, toDisplayString(item.equipment), 1),
                            createVNode("h6", null, toDisplayString(item.desc), 1),
                            createVNode("ul", { class: "test-icon" }, [
                              createVNode("li", null, [
                                createVNode("a", { href: "https://www.google.com/" }, [
                                  createVNode("img", {
                                    class: "img-fluid",
                                    src: _imports_0,
                                    alt: "icon-google"
                                  })
                                ])
                              ]),
                              createVNode("li", null, [
                                createVNode("a", { href: "https://twitter.com/" }, [
                                  createVNode("img", {
                                    class: "img-fluid",
                                    src: _imports_1,
                                    alt: "icon-google"
                                  })
                                ])
                              ]),
                              createVNode("li", null, [
                                createVNode("a", { href: "https://www.facebook.com/" }, [
                                  createVNode("img", {
                                    class: "img-fluid",
                                    src: _imports_2,
                                    alt: "icon-google"
                                  })
                                ])
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
              (openBlock(true), createBlock(Fragment, null, renderList(unref(testimonial), (item, index) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  class: "swiper-slide",
                  key: index
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "item" }, [
                      createVNode("div", { class: "testimonial-box mt-0" }, [
                        createVNode("div", { class: "test-img" }, [
                          createVNode("img", {
                            class: "img-fluid",
                            src: `${unref(config).public.baseURL}${item.img}`,
                            alt: "test-img"
                          }, null, 8, ["src"]),
                          item.heart ? (openBlock(), createBlock("i", {
                            key: 0,
                            class: "test-wish fa fa-heart"
                          })) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "test-contain" }, [
                          createVNode("h4", null, toDisplayString(item.manager), 1),
                          createVNode("h3", null, toDisplayString(item.equipment), 1),
                          createVNode("h6", null, toDisplayString(item.desc), 1),
                          createVNode("ul", { class: "test-icon" }, [
                            createVNode("li", null, [
                              createVNode("a", { href: "https://www.google.com/" }, [
                                createVNode("img", {
                                  class: "img-fluid",
                                  src: _imports_0,
                                  alt: "icon-google"
                                })
                              ])
                            ]),
                            createVNode("li", null, [
                              createVNode("a", { href: "https://twitter.com/" }, [
                                createVNode("img", {
                                  class: "img-fluid",
                                  src: _imports_1,
                                  alt: "icon-google"
                                })
                              ])
                            ]),
                            createVNode("li", null, [
                              createVNode("a", { href: "https://www.facebook.com/" }, [
                                createVNode("img", {
                                  class: "img-fluid",
                                  src: _imports_2,
                                  alt: "icon-google"
                                })
                              ])
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
      _push(`</div></div><div class="testimonial-back-content"><img class="img-fluid test-img2"${ssrRenderAttr("src", _imports_3)} alt="testimonial"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing-page/testimonial.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { __nuxt_component_2 as _, _sfc_main as a };
//# sourceMappingURL=testimonial-DT0sx3hm.mjs.map
