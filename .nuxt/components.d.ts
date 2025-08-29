
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AuthenticationForgetPassword': typeof import("../components/Authentication/forget-password.vue")['default']
    'AuthenticationLogin2': typeof import("../components/Authentication/login-2.vue")['default']
    'AuthenticationLogin': typeof import("../components/Authentication/login.vue")['default']
    'AuthenticationSignup2': typeof import("../components/Authentication/signup-2.vue")['default']
    'AuthenticationSignup': typeof import("../components/Authentication/signup.vue")['default']
    'BlogsCommonBlogFollowUs': typeof import("../components/blogs/Common/blog_follow_us.vue")['default']
    'BlogsCommonBlogHeader': typeof import("../components/blogs/Common/blog_header.vue")['default']
    'BlogsCommonBlogMedia': typeof import("../components/blogs/Common/blog_media.vue")['default']
    'BlogsCommonBlogPopular': typeof import("../components/blogs/Common/blog_popular.vue")['default']
    'BlogsCommonBlogRecent': typeof import("../components/blogs/Common/blog_recent.vue")['default']
    'BlogsCommonBlogSearch': typeof import("../components/blogs/Common/blog_search.vue")['default']
    'BlogsCommonBlogTags': typeof import("../components/blogs/Common/blog_tags.vue")['default']
    'BlogsBlogCard': typeof import("../components/blogs/blog_card/blog_card.vue")['default']
    'BlogsBlogDetailsBlogDetail': typeof import("../components/blogs/blog_details/blog_detail.vue")['default']
    'BlogsBlogNoSidebar': typeof import("../components/blogs/blog_no-sidebar/blog_no-sidebar.vue")['default']
    'BlogsBlogSidebar': typeof import("../components/blogs/blog_sidebar/blog_sidebar.vue")['default']
    'BlogsComments': typeof import("../components/blogs/comments/comments.vue")['default']
    'BlogsDetails': typeof import("../components/blogs/details.vue")['default']
    'BlogsLeaveComentsLeaveComments': typeof import("../components/blogs/leave_coments/leave_comments.vue")['default']
    'BlogsLeftSidebar': typeof import("../components/blogs/left-sidebar.vue")['default']
    'BlogsNoSidebar': typeof import("../components/blogs/no-sidebar.vue")['default']
    'BlogsRightSidebar': typeof import("../components/blogs/right-sidebar.vue")['default']
    'BonusPageAboutPage': typeof import("../components/bonus_page/about/about-page.vue")['default']
    'BonusPageAboutCounter': typeof import("../components/bonus_page/about/counter.vue")['default']
    'BonusPageAbout': typeof import("../components/bonus_page/about/index.vue")['default']
    'BonusPageElementsBackgroundcolor': typeof import("../components/bonus_page/elements/backgroundcolor.vue")['default']
    'BonusPageElementsBadge': typeof import("../components/bonus_page/elements/badge.vue")['default']
    'BonusPageElementsBadgeWithIcons': typeof import("../components/bonus_page/elements/badgeWithIcons.vue")['default']
    'BonusPageElementsBadgeWithSmallLabelIcon': typeof import("../components/bonus_page/elements/badgeWithSmallLabelIcon.vue")['default']
    'BonusPageElementsBadgeWithTypography': typeof import("../components/bonus_page/elements/badgeWithTypography.vue")['default']
    'BonusPageElementsBadgeWithstatus': typeof import("../components/bonus_page/elements/badgeWithstatus.vue")['default']
    'BonusPageElementsButtonbackground': typeof import("../components/bonus_page/elements/buttonbackground.vue")['default']
    'BonusPageElementsButtons': typeof import("../components/bonus_page/elements/buttons.vue")['default']
    'BonusPageElementsFonts': typeof import("../components/bonus_page/elements/fonts.vue")['default']
    'BonusPageElementsIcons': typeof import("../components/bonus_page/elements/icons.vue")['default']
    'BonusPageElementsImages': typeof import("../components/bonus_page/elements/images.vue")['default']
    'BonusPageElements': typeof import("../components/bonus_page/elements/index.vue")['default']
    'BonusPageElementsLabelFonts': typeof import("../components/bonus_page/elements/label-fonts.vue")['default']
    'BonusPageElementsMainChat': typeof import("../components/bonus_page/elements/mainChat.vue")['default']
    'BonusPageElementsMessageBox': typeof import("../components/bonus_page/elements/messageBox.vue")['default']
    'BonusPageElementsPhoneButton': typeof import("../components/bonus_page/elements/phoneButton.vue")['default']
    'BonusPageElementsSharedDoc': typeof import("../components/bonus_page/elements/sharedDoc.vue")['default']
    'BonusPageElementsSpanParag': typeof import("../components/bonus_page/elements/span-parag.vue")['default']
    'BonusPageElementsThemebuttons': typeof import("../components/bonus_page/elements/themebuttons.vue")['default']
    'BonusPageElementsTypography': typeof import("../components/bonus_page/elements/typography.vue")['default']
    'BonusPageFaq': typeof import("../components/bonus_page/faq/index.vue")['default']
    'BonusPagePriceBonusprice': typeof import("../components/bonus_page/price/bonusprice.vue")['default']
    'BonusPagePrice': typeof import("../components/bonus_page/price/index.vue")['default']
    'CommonBreadcrumbBreadCrumbs': typeof import("../components/common/breadcrumb/bread_crumbs.vue")['default']
    'CommonFooter': typeof import("../components/common/footer/footer.vue")['default']
    'CommonHeader': typeof import("../components/common/header/header.vue")['default']
    'CommonLogo': typeof import("../components/common/logo/logo.vue")['default']
    'CommonNavbar': typeof import("../components/common/navbar/navbar.vue")['default']
    'CommonTapToTopTaptop': typeof import("../components/common/tap-to-top/taptop.vue")['default']
    'LandingPageAppDesign': typeof import("../components/landing-page/app-design.vue")['default']
    'LandingPageChitChat': typeof import("../components/landing-page/chit-chat.vue")['default']
    'LandingPageCollaboration': typeof import("../components/landing-page/collaboration.vue")['default']
    'LandingPage': typeof import("../components/landing-page/index.vue")['default']
    'LandingPagePricingPlan': typeof import("../components/landing-page/pricing-plan.vue")['default']
    'LandingPageSecureApp': typeof import("../components/landing-page/secure-app.vue")['default']
    'LandingPageSlider': typeof import("../components/landing-page/slider.vue")['default']
    'LandingPageSubscribeUpdate': typeof import("../components/landing-page/subscribe-update.vue")['default']
    'LandingPageTeamWork': typeof import("../components/landing-page/team-work.vue")['default']
    'LandingPageTestimonial': typeof import("../components/landing-page/testimonial.vue")['default']
    'MessengerPageCallsAllcalls': typeof import("../components/messenger_page/calls/allcalls.vue")['default']
    'MessengerPageCallsCallcontent': typeof import("../components/messenger_page/calls/callcontent.vue")['default']
    'MessengerPageCallsDial': typeof import("../components/messenger_page/calls/dial.vue")['default']
    'MessengerPageCalls': typeof import("../components/messenger_page/calls/index.vue")['default']
    'MessengerPageCallsMissed': typeof import("../components/messenger_page/calls/missed.vue")['default']
    'MessengerPageCallsReceived': typeof import("../components/messenger_page/calls/received.vue")['default']
    'MessengerPageChat': typeof import("../components/messenger_page/chat.vue")['default']
    'MessengerPageChatDirectChatDirectchatheader': typeof import("../components/messenger_page/chat/DirectChat/directchatheader.vue")['default']
    'MessengerPageChatDirectChatDirectchatuser': typeof import("../components/messenger_page/chat/DirectChat/directchatuser.vue")['default']
    'MessengerPageChatDirectChatDirectcustomchat': typeof import("../components/messenger_page/chat/DirectChat/directcustomchat.vue")['default']
    'MessengerPageChatGroupChatGroupchatheader': typeof import("../components/messenger_page/chat/GroupChat/groupchatheader.vue")['default']
    'MessengerPageChatGroupChatGroupchatuser': typeof import("../components/messenger_page/chat/GroupChat/groupchatuser.vue")['default']
    'MessengerPageChatGroupChatGroupcustomchat': typeof import("../components/messenger_page/chat/GroupChat/groupcustomchat.vue")['default']
    'MessengerPageCommonDocumentslist': typeof import("../components/messenger_page/common/documentslist.vue")['default']
    'MessengerPageCommonDropdown': typeof import("../components/messenger_page/common/dropdown.vue")['default']
    'MessengerPageCommonProfile': typeof import("../components/messenger_page/common/profile.vue")['default']
    'MessengerPageCommonShareddoc': typeof import("../components/messenger_page/common/shareddoc.vue")['default']
    'MessengerPageCommonUserdropdown': typeof import("../components/messenger_page/common/userdropdown.vue")['default']
    'MessengerPageContactsContactcontent': typeof import("../components/messenger_page/contacts/contactcontent.vue")['default']
    'MessengerPageContacts': typeof import("../components/messenger_page/contacts/contacts.vue")['default']
    'MessengerPageCustomizerChatwallpaper': typeof import("../components/messenger_page/customizer/chatwallpaper.vue")['default']
    'MessengerPageCustomizerChoosecolor': typeof import("../components/messenger_page/customizer/choosecolor.vue")['default']
    'MessengerPageCustomizerCustomizesetting': typeof import("../components/messenger_page/customizer/customizesetting.vue")['default']
    'MessengerPageCustomizer': typeof import("../components/messenger_page/customizer/index.vue")['default']
    'MessengerPageCustomizerLayout': typeof import("../components/messenger_page/customizer/layout.vue")['default']
    'MessengerPageCustomizerSidebar': typeof import("../components/messenger_page/customizer/sidebar.vue")['default']
    'MessengerPage': typeof import("../components/messenger_page/index.vue")['default']
    'MessengerPageLefsidebarContactList': typeof import("../components/messenger_page/lefsidebar/contact_list.vue")['default']
    'MessengerPageLefsidebarDocument': typeof import("../components/messenger_page/lefsidebar/document.vue")['default']
    'MessengerPageLefsidebarFavourite': typeof import("../components/messenger_page/lefsidebar/favourite.vue")['default']
    'MessengerPageLefsidebarNotification': typeof import("../components/messenger_page/lefsidebar/notification.vue")['default']
    'MessengerPageLefsidebarRecentchat': typeof import("../components/messenger_page/lefsidebar/recentchat.vue")['default']
    'MessengerPageLefsidebarSettingAccount': typeof import("../components/messenger_page/lefsidebar/setting/account.vue")['default']
    'MessengerPageLefsidebarSettingChat': typeof import("../components/messenger_page/lefsidebar/setting/chat.vue")['default']
    'MessengerPageLefsidebarSettingHelp': typeof import("../components/messenger_page/lefsidebar/setting/help.vue")['default']
    'MessengerPageLefsidebarSettingIntegratin': typeof import("../components/messenger_page/lefsidebar/setting/integratin.vue")['default']
    'MessengerPageLefsidebarSettings': typeof import("../components/messenger_page/lefsidebar/settings.vue")['default']
    'MessengerPageLefsidebarStatus': typeof import("../components/messenger_page/lefsidebar/status.vue")['default']
    'MessengerPageLeftSidebar': typeof import("../components/messenger_page/left-sidebar.vue")['default']
    'MessengerPageModalsAudiocall1': typeof import("../components/messenger_page/modals/audiocall1.vue")['default']
    'MessengerPageModalsAudiocall2': typeof import("../components/messenger_page/modals/audiocall2.vue")['default']
    'MessengerPageModalsCodesnippets': typeof import("../components/messenger_page/modals/codesnippets.vue")['default']
    'MessengerPageModalsConfigurationmodel': typeof import("../components/messenger_page/modals/configurationmodel.vue")['default']
    'MessengerPageModalsCreatetodo': typeof import("../components/messenger_page/modals/createtodo.vue")['default']
    'MessengerPageModalsGroupaudiocall': typeof import("../components/messenger_page/modals/groupaudiocall.vue")['default']
    'MessengerPageModalsGroupvediocall': typeof import("../components/messenger_page/modals/groupvediocall.vue")['default']
    'MessengerPageModalsNewCall': typeof import("../components/messenger_page/modals/newCall.vue")['default']
    'MessengerPageModalsNewChat': typeof import("../components/messenger_page/modals/newChat.vue")['default']
    'MessengerPageModalsNewContact': typeof import("../components/messenger_page/modals/newContact.vue")['default']
    'MessengerPageModalsNotesmodal': typeof import("../components/messenger_page/modals/notesmodal.vue")['default']
    'MessengerPageModalsPollModal': typeof import("../components/messenger_page/modals/pollModal.vue")['default']
    'MessengerPageModalsSetreminder': typeof import("../components/messenger_page/modals/setreminder.vue")['default']
    'MessengerPageModalsTodo': typeof import("../components/messenger_page/modals/todo.vue")['default']
    'MessengerPageModalsVediocall': typeof import("../components/messenger_page/modals/vediocall.vue")['default']
    'MessengerPageNav': typeof import("../components/messenger_page/nav.vue")['default']
    'MessengerPageRightsidebarFiles': typeof import("../components/messenger_page/rightsidebar/files/index.vue")['default']
    'MessengerPageRightsidebarFilesLink': typeof import("../components/messenger_page/rightsidebar/files/link.vue")['default']
    'MessengerPageRightsidebarFilesMedia': typeof import("../components/messenger_page/rightsidebar/files/media.vue")['default']
    'MessengerPageRightsidebar': typeof import("../components/messenger_page/rightsidebar/index.vue")['default']
    'MessengerPageRightsidebarNotes': typeof import("../components/messenger_page/rightsidebar/notes/index.vue")['default']
    'MessengerPageRightsidebarProfileCommongroup': typeof import("../components/messenger_page/rightsidebar/profile/commongroup.vue")['default']
    'MessengerPageRightsidebarProfileContactinfo': typeof import("../components/messenger_page/rightsidebar/profile/contactinfo.vue")['default']
    'MessengerPageRightsidebarProfile': typeof import("../components/messenger_page/rightsidebar/profile/index.vue")['default']
    'MessengerPageRightsidebarProfilePersonalinfo': typeof import("../components/messenger_page/rightsidebar/profile/personalinfo.vue")['default']
    'MessengerPageRightsidebarProfileStarredmessages': typeof import("../components/messenger_page/rightsidebar/profile/starredmessages.vue")['default']
    'MessengerPageRightsidebarProfileStatus': typeof import("../components/messenger_page/rightsidebar/profile/status.vue")['default']
    'MessengerPageRightsidebarReminder': typeof import("../components/messenger_page/rightsidebar/reminder/index.vue")['default']
    'MessengerPageRightsidebarTodo': typeof import("../components/messenger_page/rightsidebar/todo/index.vue")['default']
    'MessengerPageStickers': typeof import("../components/messenger_page/stickers.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'Icon': typeof import("../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']
    'IconCSS': typeof import("../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyAuthenticationForgetPassword': LazyComponent<typeof import("../components/Authentication/forget-password.vue")['default']>
    'LazyAuthenticationLogin2': LazyComponent<typeof import("../components/Authentication/login-2.vue")['default']>
    'LazyAuthenticationLogin': LazyComponent<typeof import("../components/Authentication/login.vue")['default']>
    'LazyAuthenticationSignup2': LazyComponent<typeof import("../components/Authentication/signup-2.vue")['default']>
    'LazyAuthenticationSignup': LazyComponent<typeof import("../components/Authentication/signup.vue")['default']>
    'LazyBlogsCommonBlogFollowUs': LazyComponent<typeof import("../components/blogs/Common/blog_follow_us.vue")['default']>
    'LazyBlogsCommonBlogHeader': LazyComponent<typeof import("../components/blogs/Common/blog_header.vue")['default']>
    'LazyBlogsCommonBlogMedia': LazyComponent<typeof import("../components/blogs/Common/blog_media.vue")['default']>
    'LazyBlogsCommonBlogPopular': LazyComponent<typeof import("../components/blogs/Common/blog_popular.vue")['default']>
    'LazyBlogsCommonBlogRecent': LazyComponent<typeof import("../components/blogs/Common/blog_recent.vue")['default']>
    'LazyBlogsCommonBlogSearch': LazyComponent<typeof import("../components/blogs/Common/blog_search.vue")['default']>
    'LazyBlogsCommonBlogTags': LazyComponent<typeof import("../components/blogs/Common/blog_tags.vue")['default']>
    'LazyBlogsBlogCard': LazyComponent<typeof import("../components/blogs/blog_card/blog_card.vue")['default']>
    'LazyBlogsBlogDetailsBlogDetail': LazyComponent<typeof import("../components/blogs/blog_details/blog_detail.vue")['default']>
    'LazyBlogsBlogNoSidebar': LazyComponent<typeof import("../components/blogs/blog_no-sidebar/blog_no-sidebar.vue")['default']>
    'LazyBlogsBlogSidebar': LazyComponent<typeof import("../components/blogs/blog_sidebar/blog_sidebar.vue")['default']>
    'LazyBlogsComments': LazyComponent<typeof import("../components/blogs/comments/comments.vue")['default']>
    'LazyBlogsDetails': LazyComponent<typeof import("../components/blogs/details.vue")['default']>
    'LazyBlogsLeaveComentsLeaveComments': LazyComponent<typeof import("../components/blogs/leave_coments/leave_comments.vue")['default']>
    'LazyBlogsLeftSidebar': LazyComponent<typeof import("../components/blogs/left-sidebar.vue")['default']>
    'LazyBlogsNoSidebar': LazyComponent<typeof import("../components/blogs/no-sidebar.vue")['default']>
    'LazyBlogsRightSidebar': LazyComponent<typeof import("../components/blogs/right-sidebar.vue")['default']>
    'LazyBonusPageAboutPage': LazyComponent<typeof import("../components/bonus_page/about/about-page.vue")['default']>
    'LazyBonusPageAboutCounter': LazyComponent<typeof import("../components/bonus_page/about/counter.vue")['default']>
    'LazyBonusPageAbout': LazyComponent<typeof import("../components/bonus_page/about/index.vue")['default']>
    'LazyBonusPageElementsBackgroundcolor': LazyComponent<typeof import("../components/bonus_page/elements/backgroundcolor.vue")['default']>
    'LazyBonusPageElementsBadge': LazyComponent<typeof import("../components/bonus_page/elements/badge.vue")['default']>
    'LazyBonusPageElementsBadgeWithIcons': LazyComponent<typeof import("../components/bonus_page/elements/badgeWithIcons.vue")['default']>
    'LazyBonusPageElementsBadgeWithSmallLabelIcon': LazyComponent<typeof import("../components/bonus_page/elements/badgeWithSmallLabelIcon.vue")['default']>
    'LazyBonusPageElementsBadgeWithTypography': LazyComponent<typeof import("../components/bonus_page/elements/badgeWithTypography.vue")['default']>
    'LazyBonusPageElementsBadgeWithstatus': LazyComponent<typeof import("../components/bonus_page/elements/badgeWithstatus.vue")['default']>
    'LazyBonusPageElementsButtonbackground': LazyComponent<typeof import("../components/bonus_page/elements/buttonbackground.vue")['default']>
    'LazyBonusPageElementsButtons': LazyComponent<typeof import("../components/bonus_page/elements/buttons.vue")['default']>
    'LazyBonusPageElementsFonts': LazyComponent<typeof import("../components/bonus_page/elements/fonts.vue")['default']>
    'LazyBonusPageElementsIcons': LazyComponent<typeof import("../components/bonus_page/elements/icons.vue")['default']>
    'LazyBonusPageElementsImages': LazyComponent<typeof import("../components/bonus_page/elements/images.vue")['default']>
    'LazyBonusPageElements': LazyComponent<typeof import("../components/bonus_page/elements/index.vue")['default']>
    'LazyBonusPageElementsLabelFonts': LazyComponent<typeof import("../components/bonus_page/elements/label-fonts.vue")['default']>
    'LazyBonusPageElementsMainChat': LazyComponent<typeof import("../components/bonus_page/elements/mainChat.vue")['default']>
    'LazyBonusPageElementsMessageBox': LazyComponent<typeof import("../components/bonus_page/elements/messageBox.vue")['default']>
    'LazyBonusPageElementsPhoneButton': LazyComponent<typeof import("../components/bonus_page/elements/phoneButton.vue")['default']>
    'LazyBonusPageElementsSharedDoc': LazyComponent<typeof import("../components/bonus_page/elements/sharedDoc.vue")['default']>
    'LazyBonusPageElementsSpanParag': LazyComponent<typeof import("../components/bonus_page/elements/span-parag.vue")['default']>
    'LazyBonusPageElementsThemebuttons': LazyComponent<typeof import("../components/bonus_page/elements/themebuttons.vue")['default']>
    'LazyBonusPageElementsTypography': LazyComponent<typeof import("../components/bonus_page/elements/typography.vue")['default']>
    'LazyBonusPageFaq': LazyComponent<typeof import("../components/bonus_page/faq/index.vue")['default']>
    'LazyBonusPagePriceBonusprice': LazyComponent<typeof import("../components/bonus_page/price/bonusprice.vue")['default']>
    'LazyBonusPagePrice': LazyComponent<typeof import("../components/bonus_page/price/index.vue")['default']>
    'LazyCommonBreadcrumbBreadCrumbs': LazyComponent<typeof import("../components/common/breadcrumb/bread_crumbs.vue")['default']>
    'LazyCommonFooter': LazyComponent<typeof import("../components/common/footer/footer.vue")['default']>
    'LazyCommonHeader': LazyComponent<typeof import("../components/common/header/header.vue")['default']>
    'LazyCommonLogo': LazyComponent<typeof import("../components/common/logo/logo.vue")['default']>
    'LazyCommonNavbar': LazyComponent<typeof import("../components/common/navbar/navbar.vue")['default']>
    'LazyCommonTapToTopTaptop': LazyComponent<typeof import("../components/common/tap-to-top/taptop.vue")['default']>
    'LazyLandingPageAppDesign': LazyComponent<typeof import("../components/landing-page/app-design.vue")['default']>
    'LazyLandingPageChitChat': LazyComponent<typeof import("../components/landing-page/chit-chat.vue")['default']>
    'LazyLandingPageCollaboration': LazyComponent<typeof import("../components/landing-page/collaboration.vue")['default']>
    'LazyLandingPage': LazyComponent<typeof import("../components/landing-page/index.vue")['default']>
    'LazyLandingPagePricingPlan': LazyComponent<typeof import("../components/landing-page/pricing-plan.vue")['default']>
    'LazyLandingPageSecureApp': LazyComponent<typeof import("../components/landing-page/secure-app.vue")['default']>
    'LazyLandingPageSlider': LazyComponent<typeof import("../components/landing-page/slider.vue")['default']>
    'LazyLandingPageSubscribeUpdate': LazyComponent<typeof import("../components/landing-page/subscribe-update.vue")['default']>
    'LazyLandingPageTeamWork': LazyComponent<typeof import("../components/landing-page/team-work.vue")['default']>
    'LazyLandingPageTestimonial': LazyComponent<typeof import("../components/landing-page/testimonial.vue")['default']>
    'LazyMessengerPageCallsAllcalls': LazyComponent<typeof import("../components/messenger_page/calls/allcalls.vue")['default']>
    'LazyMessengerPageCallsCallcontent': LazyComponent<typeof import("../components/messenger_page/calls/callcontent.vue")['default']>
    'LazyMessengerPageCallsDial': LazyComponent<typeof import("../components/messenger_page/calls/dial.vue")['default']>
    'LazyMessengerPageCalls': LazyComponent<typeof import("../components/messenger_page/calls/index.vue")['default']>
    'LazyMessengerPageCallsMissed': LazyComponent<typeof import("../components/messenger_page/calls/missed.vue")['default']>
    'LazyMessengerPageCallsReceived': LazyComponent<typeof import("../components/messenger_page/calls/received.vue")['default']>
    'LazyMessengerPageChat': LazyComponent<typeof import("../components/messenger_page/chat.vue")['default']>
    'LazyMessengerPageChatDirectChatDirectchatheader': LazyComponent<typeof import("../components/messenger_page/chat/DirectChat/directchatheader.vue")['default']>
    'LazyMessengerPageChatDirectChatDirectchatuser': LazyComponent<typeof import("../components/messenger_page/chat/DirectChat/directchatuser.vue")['default']>
    'LazyMessengerPageChatDirectChatDirectcustomchat': LazyComponent<typeof import("../components/messenger_page/chat/DirectChat/directcustomchat.vue")['default']>
    'LazyMessengerPageChatGroupChatGroupchatheader': LazyComponent<typeof import("../components/messenger_page/chat/GroupChat/groupchatheader.vue")['default']>
    'LazyMessengerPageChatGroupChatGroupchatuser': LazyComponent<typeof import("../components/messenger_page/chat/GroupChat/groupchatuser.vue")['default']>
    'LazyMessengerPageChatGroupChatGroupcustomchat': LazyComponent<typeof import("../components/messenger_page/chat/GroupChat/groupcustomchat.vue")['default']>
    'LazyMessengerPageCommonDocumentslist': LazyComponent<typeof import("../components/messenger_page/common/documentslist.vue")['default']>
    'LazyMessengerPageCommonDropdown': LazyComponent<typeof import("../components/messenger_page/common/dropdown.vue")['default']>
    'LazyMessengerPageCommonProfile': LazyComponent<typeof import("../components/messenger_page/common/profile.vue")['default']>
    'LazyMessengerPageCommonShareddoc': LazyComponent<typeof import("../components/messenger_page/common/shareddoc.vue")['default']>
    'LazyMessengerPageCommonUserdropdown': LazyComponent<typeof import("../components/messenger_page/common/userdropdown.vue")['default']>
    'LazyMessengerPageContactsContactcontent': LazyComponent<typeof import("../components/messenger_page/contacts/contactcontent.vue")['default']>
    'LazyMessengerPageContacts': LazyComponent<typeof import("../components/messenger_page/contacts/contacts.vue")['default']>
    'LazyMessengerPageCustomizerChatwallpaper': LazyComponent<typeof import("../components/messenger_page/customizer/chatwallpaper.vue")['default']>
    'LazyMessengerPageCustomizerChoosecolor': LazyComponent<typeof import("../components/messenger_page/customizer/choosecolor.vue")['default']>
    'LazyMessengerPageCustomizerCustomizesetting': LazyComponent<typeof import("../components/messenger_page/customizer/customizesetting.vue")['default']>
    'LazyMessengerPageCustomizer': LazyComponent<typeof import("../components/messenger_page/customizer/index.vue")['default']>
    'LazyMessengerPageCustomizerLayout': LazyComponent<typeof import("../components/messenger_page/customizer/layout.vue")['default']>
    'LazyMessengerPageCustomizerSidebar': LazyComponent<typeof import("../components/messenger_page/customizer/sidebar.vue")['default']>
    'LazyMessengerPage': LazyComponent<typeof import("../components/messenger_page/index.vue")['default']>
    'LazyMessengerPageLefsidebarContactList': LazyComponent<typeof import("../components/messenger_page/lefsidebar/contact_list.vue")['default']>
    'LazyMessengerPageLefsidebarDocument': LazyComponent<typeof import("../components/messenger_page/lefsidebar/document.vue")['default']>
    'LazyMessengerPageLefsidebarFavourite': LazyComponent<typeof import("../components/messenger_page/lefsidebar/favourite.vue")['default']>
    'LazyMessengerPageLefsidebarNotification': LazyComponent<typeof import("../components/messenger_page/lefsidebar/notification.vue")['default']>
    'LazyMessengerPageLefsidebarRecentchat': LazyComponent<typeof import("../components/messenger_page/lefsidebar/recentchat.vue")['default']>
    'LazyMessengerPageLefsidebarSettingAccount': LazyComponent<typeof import("../components/messenger_page/lefsidebar/setting/account.vue")['default']>
    'LazyMessengerPageLefsidebarSettingChat': LazyComponent<typeof import("../components/messenger_page/lefsidebar/setting/chat.vue")['default']>
    'LazyMessengerPageLefsidebarSettingHelp': LazyComponent<typeof import("../components/messenger_page/lefsidebar/setting/help.vue")['default']>
    'LazyMessengerPageLefsidebarSettingIntegratin': LazyComponent<typeof import("../components/messenger_page/lefsidebar/setting/integratin.vue")['default']>
    'LazyMessengerPageLefsidebarSettings': LazyComponent<typeof import("../components/messenger_page/lefsidebar/settings.vue")['default']>
    'LazyMessengerPageLefsidebarStatus': LazyComponent<typeof import("../components/messenger_page/lefsidebar/status.vue")['default']>
    'LazyMessengerPageLeftSidebar': LazyComponent<typeof import("../components/messenger_page/left-sidebar.vue")['default']>
    'LazyMessengerPageModalsAudiocall1': LazyComponent<typeof import("../components/messenger_page/modals/audiocall1.vue")['default']>
    'LazyMessengerPageModalsAudiocall2': LazyComponent<typeof import("../components/messenger_page/modals/audiocall2.vue")['default']>
    'LazyMessengerPageModalsCodesnippets': LazyComponent<typeof import("../components/messenger_page/modals/codesnippets.vue")['default']>
    'LazyMessengerPageModalsConfigurationmodel': LazyComponent<typeof import("../components/messenger_page/modals/configurationmodel.vue")['default']>
    'LazyMessengerPageModalsCreatetodo': LazyComponent<typeof import("../components/messenger_page/modals/createtodo.vue")['default']>
    'LazyMessengerPageModalsGroupaudiocall': LazyComponent<typeof import("../components/messenger_page/modals/groupaudiocall.vue")['default']>
    'LazyMessengerPageModalsGroupvediocall': LazyComponent<typeof import("../components/messenger_page/modals/groupvediocall.vue")['default']>
    'LazyMessengerPageModalsNewCall': LazyComponent<typeof import("../components/messenger_page/modals/newCall.vue")['default']>
    'LazyMessengerPageModalsNewChat': LazyComponent<typeof import("../components/messenger_page/modals/newChat.vue")['default']>
    'LazyMessengerPageModalsNewContact': LazyComponent<typeof import("../components/messenger_page/modals/newContact.vue")['default']>
    'LazyMessengerPageModalsNotesmodal': LazyComponent<typeof import("../components/messenger_page/modals/notesmodal.vue")['default']>
    'LazyMessengerPageModalsPollModal': LazyComponent<typeof import("../components/messenger_page/modals/pollModal.vue")['default']>
    'LazyMessengerPageModalsSetreminder': LazyComponent<typeof import("../components/messenger_page/modals/setreminder.vue")['default']>
    'LazyMessengerPageModalsTodo': LazyComponent<typeof import("../components/messenger_page/modals/todo.vue")['default']>
    'LazyMessengerPageModalsVediocall': LazyComponent<typeof import("../components/messenger_page/modals/vediocall.vue")['default']>
    'LazyMessengerPageNav': LazyComponent<typeof import("../components/messenger_page/nav.vue")['default']>
    'LazyMessengerPageRightsidebarFiles': LazyComponent<typeof import("../components/messenger_page/rightsidebar/files/index.vue")['default']>
    'LazyMessengerPageRightsidebarFilesLink': LazyComponent<typeof import("../components/messenger_page/rightsidebar/files/link.vue")['default']>
    'LazyMessengerPageRightsidebarFilesMedia': LazyComponent<typeof import("../components/messenger_page/rightsidebar/files/media.vue")['default']>
    'LazyMessengerPageRightsidebar': LazyComponent<typeof import("../components/messenger_page/rightsidebar/index.vue")['default']>
    'LazyMessengerPageRightsidebarNotes': LazyComponent<typeof import("../components/messenger_page/rightsidebar/notes/index.vue")['default']>
    'LazyMessengerPageRightsidebarProfileCommongroup': LazyComponent<typeof import("../components/messenger_page/rightsidebar/profile/commongroup.vue")['default']>
    'LazyMessengerPageRightsidebarProfileContactinfo': LazyComponent<typeof import("../components/messenger_page/rightsidebar/profile/contactinfo.vue")['default']>
    'LazyMessengerPageRightsidebarProfile': LazyComponent<typeof import("../components/messenger_page/rightsidebar/profile/index.vue")['default']>
    'LazyMessengerPageRightsidebarProfilePersonalinfo': LazyComponent<typeof import("../components/messenger_page/rightsidebar/profile/personalinfo.vue")['default']>
    'LazyMessengerPageRightsidebarProfileStarredmessages': LazyComponent<typeof import("../components/messenger_page/rightsidebar/profile/starredmessages.vue")['default']>
    'LazyMessengerPageRightsidebarProfileStatus': LazyComponent<typeof import("../components/messenger_page/rightsidebar/profile/status.vue")['default']>
    'LazyMessengerPageRightsidebarReminder': LazyComponent<typeof import("../components/messenger_page/rightsidebar/reminder/index.vue")['default']>
    'LazyMessengerPageRightsidebarTodo': LazyComponent<typeof import("../components/messenger_page/rightsidebar/todo/index.vue")['default']>
    'LazyMessengerPageStickers': LazyComponent<typeof import("../components/messenger_page/stickers.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyIcon': LazyComponent<typeof import("../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']>
    'LazyIconCSS': LazyComponent<typeof import("../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AuthenticationForgetPassword: typeof import("../components/Authentication/forget-password.vue")['default']
export const AuthenticationLogin2: typeof import("../components/Authentication/login-2.vue")['default']
export const AuthenticationLogin: typeof import("../components/Authentication/login.vue")['default']
export const AuthenticationSignup2: typeof import("../components/Authentication/signup-2.vue")['default']
export const AuthenticationSignup: typeof import("../components/Authentication/signup.vue")['default']
export const BlogsCommonBlogFollowUs: typeof import("../components/blogs/Common/blog_follow_us.vue")['default']
export const BlogsCommonBlogHeader: typeof import("../components/blogs/Common/blog_header.vue")['default']
export const BlogsCommonBlogMedia: typeof import("../components/blogs/Common/blog_media.vue")['default']
export const BlogsCommonBlogPopular: typeof import("../components/blogs/Common/blog_popular.vue")['default']
export const BlogsCommonBlogRecent: typeof import("../components/blogs/Common/blog_recent.vue")['default']
export const BlogsCommonBlogSearch: typeof import("../components/blogs/Common/blog_search.vue")['default']
export const BlogsCommonBlogTags: typeof import("../components/blogs/Common/blog_tags.vue")['default']
export const BlogsBlogCard: typeof import("../components/blogs/blog_card/blog_card.vue")['default']
export const BlogsBlogDetailsBlogDetail: typeof import("../components/blogs/blog_details/blog_detail.vue")['default']
export const BlogsBlogNoSidebar: typeof import("../components/blogs/blog_no-sidebar/blog_no-sidebar.vue")['default']
export const BlogsBlogSidebar: typeof import("../components/blogs/blog_sidebar/blog_sidebar.vue")['default']
export const BlogsComments: typeof import("../components/blogs/comments/comments.vue")['default']
export const BlogsDetails: typeof import("../components/blogs/details.vue")['default']
export const BlogsLeaveComentsLeaveComments: typeof import("../components/blogs/leave_coments/leave_comments.vue")['default']
export const BlogsLeftSidebar: typeof import("../components/blogs/left-sidebar.vue")['default']
export const BlogsNoSidebar: typeof import("../components/blogs/no-sidebar.vue")['default']
export const BlogsRightSidebar: typeof import("../components/blogs/right-sidebar.vue")['default']
export const BonusPageAboutPage: typeof import("../components/bonus_page/about/about-page.vue")['default']
export const BonusPageAboutCounter: typeof import("../components/bonus_page/about/counter.vue")['default']
export const BonusPageAbout: typeof import("../components/bonus_page/about/index.vue")['default']
export const BonusPageElementsBackgroundcolor: typeof import("../components/bonus_page/elements/backgroundcolor.vue")['default']
export const BonusPageElementsBadge: typeof import("../components/bonus_page/elements/badge.vue")['default']
export const BonusPageElementsBadgeWithIcons: typeof import("../components/bonus_page/elements/badgeWithIcons.vue")['default']
export const BonusPageElementsBadgeWithSmallLabelIcon: typeof import("../components/bonus_page/elements/badgeWithSmallLabelIcon.vue")['default']
export const BonusPageElementsBadgeWithTypography: typeof import("../components/bonus_page/elements/badgeWithTypography.vue")['default']
export const BonusPageElementsBadgeWithstatus: typeof import("../components/bonus_page/elements/badgeWithstatus.vue")['default']
export const BonusPageElementsButtonbackground: typeof import("../components/bonus_page/elements/buttonbackground.vue")['default']
export const BonusPageElementsButtons: typeof import("../components/bonus_page/elements/buttons.vue")['default']
export const BonusPageElementsFonts: typeof import("../components/bonus_page/elements/fonts.vue")['default']
export const BonusPageElementsIcons: typeof import("../components/bonus_page/elements/icons.vue")['default']
export const BonusPageElementsImages: typeof import("../components/bonus_page/elements/images.vue")['default']
export const BonusPageElements: typeof import("../components/bonus_page/elements/index.vue")['default']
export const BonusPageElementsLabelFonts: typeof import("../components/bonus_page/elements/label-fonts.vue")['default']
export const BonusPageElementsMainChat: typeof import("../components/bonus_page/elements/mainChat.vue")['default']
export const BonusPageElementsMessageBox: typeof import("../components/bonus_page/elements/messageBox.vue")['default']
export const BonusPageElementsPhoneButton: typeof import("../components/bonus_page/elements/phoneButton.vue")['default']
export const BonusPageElementsSharedDoc: typeof import("../components/bonus_page/elements/sharedDoc.vue")['default']
export const BonusPageElementsSpanParag: typeof import("../components/bonus_page/elements/span-parag.vue")['default']
export const BonusPageElementsThemebuttons: typeof import("../components/bonus_page/elements/themebuttons.vue")['default']
export const BonusPageElementsTypography: typeof import("../components/bonus_page/elements/typography.vue")['default']
export const BonusPageFaq: typeof import("../components/bonus_page/faq/index.vue")['default']
export const BonusPagePriceBonusprice: typeof import("../components/bonus_page/price/bonusprice.vue")['default']
export const BonusPagePrice: typeof import("../components/bonus_page/price/index.vue")['default']
export const CommonBreadcrumbBreadCrumbs: typeof import("../components/common/breadcrumb/bread_crumbs.vue")['default']
export const CommonFooter: typeof import("../components/common/footer/footer.vue")['default']
export const CommonHeader: typeof import("../components/common/header/header.vue")['default']
export const CommonLogo: typeof import("../components/common/logo/logo.vue")['default']
export const CommonNavbar: typeof import("../components/common/navbar/navbar.vue")['default']
export const CommonTapToTopTaptop: typeof import("../components/common/tap-to-top/taptop.vue")['default']
export const LandingPageAppDesign: typeof import("../components/landing-page/app-design.vue")['default']
export const LandingPageChitChat: typeof import("../components/landing-page/chit-chat.vue")['default']
export const LandingPageCollaboration: typeof import("../components/landing-page/collaboration.vue")['default']
export const LandingPage: typeof import("../components/landing-page/index.vue")['default']
export const LandingPagePricingPlan: typeof import("../components/landing-page/pricing-plan.vue")['default']
export const LandingPageSecureApp: typeof import("../components/landing-page/secure-app.vue")['default']
export const LandingPageSlider: typeof import("../components/landing-page/slider.vue")['default']
export const LandingPageSubscribeUpdate: typeof import("../components/landing-page/subscribe-update.vue")['default']
export const LandingPageTeamWork: typeof import("../components/landing-page/team-work.vue")['default']
export const LandingPageTestimonial: typeof import("../components/landing-page/testimonial.vue")['default']
export const MessengerPageCallsAllcalls: typeof import("../components/messenger_page/calls/allcalls.vue")['default']
export const MessengerPageCallsCallcontent: typeof import("../components/messenger_page/calls/callcontent.vue")['default']
export const MessengerPageCallsDial: typeof import("../components/messenger_page/calls/dial.vue")['default']
export const MessengerPageCalls: typeof import("../components/messenger_page/calls/index.vue")['default']
export const MessengerPageCallsMissed: typeof import("../components/messenger_page/calls/missed.vue")['default']
export const MessengerPageCallsReceived: typeof import("../components/messenger_page/calls/received.vue")['default']
export const MessengerPageChat: typeof import("../components/messenger_page/chat.vue")['default']
export const MessengerPageChatDirectChatDirectchatheader: typeof import("../components/messenger_page/chat/DirectChat/directchatheader.vue")['default']
export const MessengerPageChatDirectChatDirectchatuser: typeof import("../components/messenger_page/chat/DirectChat/directchatuser.vue")['default']
export const MessengerPageChatDirectChatDirectcustomchat: typeof import("../components/messenger_page/chat/DirectChat/directcustomchat.vue")['default']
export const MessengerPageChatGroupChatGroupchatheader: typeof import("../components/messenger_page/chat/GroupChat/groupchatheader.vue")['default']
export const MessengerPageChatGroupChatGroupchatuser: typeof import("../components/messenger_page/chat/GroupChat/groupchatuser.vue")['default']
export const MessengerPageChatGroupChatGroupcustomchat: typeof import("../components/messenger_page/chat/GroupChat/groupcustomchat.vue")['default']
export const MessengerPageCommonDocumentslist: typeof import("../components/messenger_page/common/documentslist.vue")['default']
export const MessengerPageCommonDropdown: typeof import("../components/messenger_page/common/dropdown.vue")['default']
export const MessengerPageCommonProfile: typeof import("../components/messenger_page/common/profile.vue")['default']
export const MessengerPageCommonShareddoc: typeof import("../components/messenger_page/common/shareddoc.vue")['default']
export const MessengerPageCommonUserdropdown: typeof import("../components/messenger_page/common/userdropdown.vue")['default']
export const MessengerPageContactsContactcontent: typeof import("../components/messenger_page/contacts/contactcontent.vue")['default']
export const MessengerPageContacts: typeof import("../components/messenger_page/contacts/contacts.vue")['default']
export const MessengerPageCustomizerChatwallpaper: typeof import("../components/messenger_page/customizer/chatwallpaper.vue")['default']
export const MessengerPageCustomizerChoosecolor: typeof import("../components/messenger_page/customizer/choosecolor.vue")['default']
export const MessengerPageCustomizerCustomizesetting: typeof import("../components/messenger_page/customizer/customizesetting.vue")['default']
export const MessengerPageCustomizer: typeof import("../components/messenger_page/customizer/index.vue")['default']
export const MessengerPageCustomizerLayout: typeof import("../components/messenger_page/customizer/layout.vue")['default']
export const MessengerPageCustomizerSidebar: typeof import("../components/messenger_page/customizer/sidebar.vue")['default']
export const MessengerPage: typeof import("../components/messenger_page/index.vue")['default']
export const MessengerPageLefsidebarContactList: typeof import("../components/messenger_page/lefsidebar/contact_list.vue")['default']
export const MessengerPageLefsidebarDocument: typeof import("../components/messenger_page/lefsidebar/document.vue")['default']
export const MessengerPageLefsidebarFavourite: typeof import("../components/messenger_page/lefsidebar/favourite.vue")['default']
export const MessengerPageLefsidebarNotification: typeof import("../components/messenger_page/lefsidebar/notification.vue")['default']
export const MessengerPageLefsidebarRecentchat: typeof import("../components/messenger_page/lefsidebar/recentchat.vue")['default']
export const MessengerPageLefsidebarSettingAccount: typeof import("../components/messenger_page/lefsidebar/setting/account.vue")['default']
export const MessengerPageLefsidebarSettingChat: typeof import("../components/messenger_page/lefsidebar/setting/chat.vue")['default']
export const MessengerPageLefsidebarSettingHelp: typeof import("../components/messenger_page/lefsidebar/setting/help.vue")['default']
export const MessengerPageLefsidebarSettingIntegratin: typeof import("../components/messenger_page/lefsidebar/setting/integratin.vue")['default']
export const MessengerPageLefsidebarSettings: typeof import("../components/messenger_page/lefsidebar/settings.vue")['default']
export const MessengerPageLefsidebarStatus: typeof import("../components/messenger_page/lefsidebar/status.vue")['default']
export const MessengerPageLeftSidebar: typeof import("../components/messenger_page/left-sidebar.vue")['default']
export const MessengerPageModalsAudiocall1: typeof import("../components/messenger_page/modals/audiocall1.vue")['default']
export const MessengerPageModalsAudiocall2: typeof import("../components/messenger_page/modals/audiocall2.vue")['default']
export const MessengerPageModalsCodesnippets: typeof import("../components/messenger_page/modals/codesnippets.vue")['default']
export const MessengerPageModalsConfigurationmodel: typeof import("../components/messenger_page/modals/configurationmodel.vue")['default']
export const MessengerPageModalsCreatetodo: typeof import("../components/messenger_page/modals/createtodo.vue")['default']
export const MessengerPageModalsGroupaudiocall: typeof import("../components/messenger_page/modals/groupaudiocall.vue")['default']
export const MessengerPageModalsGroupvediocall: typeof import("../components/messenger_page/modals/groupvediocall.vue")['default']
export const MessengerPageModalsNewCall: typeof import("../components/messenger_page/modals/newCall.vue")['default']
export const MessengerPageModalsNewChat: typeof import("../components/messenger_page/modals/newChat.vue")['default']
export const MessengerPageModalsNewContact: typeof import("../components/messenger_page/modals/newContact.vue")['default']
export const MessengerPageModalsNotesmodal: typeof import("../components/messenger_page/modals/notesmodal.vue")['default']
export const MessengerPageModalsPollModal: typeof import("../components/messenger_page/modals/pollModal.vue")['default']
export const MessengerPageModalsSetreminder: typeof import("../components/messenger_page/modals/setreminder.vue")['default']
export const MessengerPageModalsTodo: typeof import("../components/messenger_page/modals/todo.vue")['default']
export const MessengerPageModalsVediocall: typeof import("../components/messenger_page/modals/vediocall.vue")['default']
export const MessengerPageNav: typeof import("../components/messenger_page/nav.vue")['default']
export const MessengerPageRightsidebarFiles: typeof import("../components/messenger_page/rightsidebar/files/index.vue")['default']
export const MessengerPageRightsidebarFilesLink: typeof import("../components/messenger_page/rightsidebar/files/link.vue")['default']
export const MessengerPageRightsidebarFilesMedia: typeof import("../components/messenger_page/rightsidebar/files/media.vue")['default']
export const MessengerPageRightsidebar: typeof import("../components/messenger_page/rightsidebar/index.vue")['default']
export const MessengerPageRightsidebarNotes: typeof import("../components/messenger_page/rightsidebar/notes/index.vue")['default']
export const MessengerPageRightsidebarProfileCommongroup: typeof import("../components/messenger_page/rightsidebar/profile/commongroup.vue")['default']
export const MessengerPageRightsidebarProfileContactinfo: typeof import("../components/messenger_page/rightsidebar/profile/contactinfo.vue")['default']
export const MessengerPageRightsidebarProfile: typeof import("../components/messenger_page/rightsidebar/profile/index.vue")['default']
export const MessengerPageRightsidebarProfilePersonalinfo: typeof import("../components/messenger_page/rightsidebar/profile/personalinfo.vue")['default']
export const MessengerPageRightsidebarProfileStarredmessages: typeof import("../components/messenger_page/rightsidebar/profile/starredmessages.vue")['default']
export const MessengerPageRightsidebarProfileStatus: typeof import("../components/messenger_page/rightsidebar/profile/status.vue")['default']
export const MessengerPageRightsidebarReminder: typeof import("../components/messenger_page/rightsidebar/reminder/index.vue")['default']
export const MessengerPageRightsidebarTodo: typeof import("../components/messenger_page/rightsidebar/todo/index.vue")['default']
export const MessengerPageStickers: typeof import("../components/messenger_page/stickers.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const Icon: typeof import("../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']
export const IconCSS: typeof import("../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyAuthenticationForgetPassword: LazyComponent<typeof import("../components/Authentication/forget-password.vue")['default']>
export const LazyAuthenticationLogin2: LazyComponent<typeof import("../components/Authentication/login-2.vue")['default']>
export const LazyAuthenticationLogin: LazyComponent<typeof import("../components/Authentication/login.vue")['default']>
export const LazyAuthenticationSignup2: LazyComponent<typeof import("../components/Authentication/signup-2.vue")['default']>
export const LazyAuthenticationSignup: LazyComponent<typeof import("../components/Authentication/signup.vue")['default']>
export const LazyBlogsCommonBlogFollowUs: LazyComponent<typeof import("../components/blogs/Common/blog_follow_us.vue")['default']>
export const LazyBlogsCommonBlogHeader: LazyComponent<typeof import("../components/blogs/Common/blog_header.vue")['default']>
export const LazyBlogsCommonBlogMedia: LazyComponent<typeof import("../components/blogs/Common/blog_media.vue")['default']>
export const LazyBlogsCommonBlogPopular: LazyComponent<typeof import("../components/blogs/Common/blog_popular.vue")['default']>
export const LazyBlogsCommonBlogRecent: LazyComponent<typeof import("../components/blogs/Common/blog_recent.vue")['default']>
export const LazyBlogsCommonBlogSearch: LazyComponent<typeof import("../components/blogs/Common/blog_search.vue")['default']>
export const LazyBlogsCommonBlogTags: LazyComponent<typeof import("../components/blogs/Common/blog_tags.vue")['default']>
export const LazyBlogsBlogCard: LazyComponent<typeof import("../components/blogs/blog_card/blog_card.vue")['default']>
export const LazyBlogsBlogDetailsBlogDetail: LazyComponent<typeof import("../components/blogs/blog_details/blog_detail.vue")['default']>
export const LazyBlogsBlogNoSidebar: LazyComponent<typeof import("../components/blogs/blog_no-sidebar/blog_no-sidebar.vue")['default']>
export const LazyBlogsBlogSidebar: LazyComponent<typeof import("../components/blogs/blog_sidebar/blog_sidebar.vue")['default']>
export const LazyBlogsComments: LazyComponent<typeof import("../components/blogs/comments/comments.vue")['default']>
export const LazyBlogsDetails: LazyComponent<typeof import("../components/blogs/details.vue")['default']>
export const LazyBlogsLeaveComentsLeaveComments: LazyComponent<typeof import("../components/blogs/leave_coments/leave_comments.vue")['default']>
export const LazyBlogsLeftSidebar: LazyComponent<typeof import("../components/blogs/left-sidebar.vue")['default']>
export const LazyBlogsNoSidebar: LazyComponent<typeof import("../components/blogs/no-sidebar.vue")['default']>
export const LazyBlogsRightSidebar: LazyComponent<typeof import("../components/blogs/right-sidebar.vue")['default']>
export const LazyBonusPageAboutPage: LazyComponent<typeof import("../components/bonus_page/about/about-page.vue")['default']>
export const LazyBonusPageAboutCounter: LazyComponent<typeof import("../components/bonus_page/about/counter.vue")['default']>
export const LazyBonusPageAbout: LazyComponent<typeof import("../components/bonus_page/about/index.vue")['default']>
export const LazyBonusPageElementsBackgroundcolor: LazyComponent<typeof import("../components/bonus_page/elements/backgroundcolor.vue")['default']>
export const LazyBonusPageElementsBadge: LazyComponent<typeof import("../components/bonus_page/elements/badge.vue")['default']>
export const LazyBonusPageElementsBadgeWithIcons: LazyComponent<typeof import("../components/bonus_page/elements/badgeWithIcons.vue")['default']>
export const LazyBonusPageElementsBadgeWithSmallLabelIcon: LazyComponent<typeof import("../components/bonus_page/elements/badgeWithSmallLabelIcon.vue")['default']>
export const LazyBonusPageElementsBadgeWithTypography: LazyComponent<typeof import("../components/bonus_page/elements/badgeWithTypography.vue")['default']>
export const LazyBonusPageElementsBadgeWithstatus: LazyComponent<typeof import("../components/bonus_page/elements/badgeWithstatus.vue")['default']>
export const LazyBonusPageElementsButtonbackground: LazyComponent<typeof import("../components/bonus_page/elements/buttonbackground.vue")['default']>
export const LazyBonusPageElementsButtons: LazyComponent<typeof import("../components/bonus_page/elements/buttons.vue")['default']>
export const LazyBonusPageElementsFonts: LazyComponent<typeof import("../components/bonus_page/elements/fonts.vue")['default']>
export const LazyBonusPageElementsIcons: LazyComponent<typeof import("../components/bonus_page/elements/icons.vue")['default']>
export const LazyBonusPageElementsImages: LazyComponent<typeof import("../components/bonus_page/elements/images.vue")['default']>
export const LazyBonusPageElements: LazyComponent<typeof import("../components/bonus_page/elements/index.vue")['default']>
export const LazyBonusPageElementsLabelFonts: LazyComponent<typeof import("../components/bonus_page/elements/label-fonts.vue")['default']>
export const LazyBonusPageElementsMainChat: LazyComponent<typeof import("../components/bonus_page/elements/mainChat.vue")['default']>
export const LazyBonusPageElementsMessageBox: LazyComponent<typeof import("../components/bonus_page/elements/messageBox.vue")['default']>
export const LazyBonusPageElementsPhoneButton: LazyComponent<typeof import("../components/bonus_page/elements/phoneButton.vue")['default']>
export const LazyBonusPageElementsSharedDoc: LazyComponent<typeof import("../components/bonus_page/elements/sharedDoc.vue")['default']>
export const LazyBonusPageElementsSpanParag: LazyComponent<typeof import("../components/bonus_page/elements/span-parag.vue")['default']>
export const LazyBonusPageElementsThemebuttons: LazyComponent<typeof import("../components/bonus_page/elements/themebuttons.vue")['default']>
export const LazyBonusPageElementsTypography: LazyComponent<typeof import("../components/bonus_page/elements/typography.vue")['default']>
export const LazyBonusPageFaq: LazyComponent<typeof import("../components/bonus_page/faq/index.vue")['default']>
export const LazyBonusPagePriceBonusprice: LazyComponent<typeof import("../components/bonus_page/price/bonusprice.vue")['default']>
export const LazyBonusPagePrice: LazyComponent<typeof import("../components/bonus_page/price/index.vue")['default']>
export const LazyCommonBreadcrumbBreadCrumbs: LazyComponent<typeof import("../components/common/breadcrumb/bread_crumbs.vue")['default']>
export const LazyCommonFooter: LazyComponent<typeof import("../components/common/footer/footer.vue")['default']>
export const LazyCommonHeader: LazyComponent<typeof import("../components/common/header/header.vue")['default']>
export const LazyCommonLogo: LazyComponent<typeof import("../components/common/logo/logo.vue")['default']>
export const LazyCommonNavbar: LazyComponent<typeof import("../components/common/navbar/navbar.vue")['default']>
export const LazyCommonTapToTopTaptop: LazyComponent<typeof import("../components/common/tap-to-top/taptop.vue")['default']>
export const LazyLandingPageAppDesign: LazyComponent<typeof import("../components/landing-page/app-design.vue")['default']>
export const LazyLandingPageChitChat: LazyComponent<typeof import("../components/landing-page/chit-chat.vue")['default']>
export const LazyLandingPageCollaboration: LazyComponent<typeof import("../components/landing-page/collaboration.vue")['default']>
export const LazyLandingPage: LazyComponent<typeof import("../components/landing-page/index.vue")['default']>
export const LazyLandingPagePricingPlan: LazyComponent<typeof import("../components/landing-page/pricing-plan.vue")['default']>
export const LazyLandingPageSecureApp: LazyComponent<typeof import("../components/landing-page/secure-app.vue")['default']>
export const LazyLandingPageSlider: LazyComponent<typeof import("../components/landing-page/slider.vue")['default']>
export const LazyLandingPageSubscribeUpdate: LazyComponent<typeof import("../components/landing-page/subscribe-update.vue")['default']>
export const LazyLandingPageTeamWork: LazyComponent<typeof import("../components/landing-page/team-work.vue")['default']>
export const LazyLandingPageTestimonial: LazyComponent<typeof import("../components/landing-page/testimonial.vue")['default']>
export const LazyMessengerPageCallsAllcalls: LazyComponent<typeof import("../components/messenger_page/calls/allcalls.vue")['default']>
export const LazyMessengerPageCallsCallcontent: LazyComponent<typeof import("../components/messenger_page/calls/callcontent.vue")['default']>
export const LazyMessengerPageCallsDial: LazyComponent<typeof import("../components/messenger_page/calls/dial.vue")['default']>
export const LazyMessengerPageCalls: LazyComponent<typeof import("../components/messenger_page/calls/index.vue")['default']>
export const LazyMessengerPageCallsMissed: LazyComponent<typeof import("../components/messenger_page/calls/missed.vue")['default']>
export const LazyMessengerPageCallsReceived: LazyComponent<typeof import("../components/messenger_page/calls/received.vue")['default']>
export const LazyMessengerPageChat: LazyComponent<typeof import("../components/messenger_page/chat.vue")['default']>
export const LazyMessengerPageChatDirectChatDirectchatheader: LazyComponent<typeof import("../components/messenger_page/chat/DirectChat/directchatheader.vue")['default']>
export const LazyMessengerPageChatDirectChatDirectchatuser: LazyComponent<typeof import("../components/messenger_page/chat/DirectChat/directchatuser.vue")['default']>
export const LazyMessengerPageChatDirectChatDirectcustomchat: LazyComponent<typeof import("../components/messenger_page/chat/DirectChat/directcustomchat.vue")['default']>
export const LazyMessengerPageChatGroupChatGroupchatheader: LazyComponent<typeof import("../components/messenger_page/chat/GroupChat/groupchatheader.vue")['default']>
export const LazyMessengerPageChatGroupChatGroupchatuser: LazyComponent<typeof import("../components/messenger_page/chat/GroupChat/groupchatuser.vue")['default']>
export const LazyMessengerPageChatGroupChatGroupcustomchat: LazyComponent<typeof import("../components/messenger_page/chat/GroupChat/groupcustomchat.vue")['default']>
export const LazyMessengerPageCommonDocumentslist: LazyComponent<typeof import("../components/messenger_page/common/documentslist.vue")['default']>
export const LazyMessengerPageCommonDropdown: LazyComponent<typeof import("../components/messenger_page/common/dropdown.vue")['default']>
export const LazyMessengerPageCommonProfile: LazyComponent<typeof import("../components/messenger_page/common/profile.vue")['default']>
export const LazyMessengerPageCommonShareddoc: LazyComponent<typeof import("../components/messenger_page/common/shareddoc.vue")['default']>
export const LazyMessengerPageCommonUserdropdown: LazyComponent<typeof import("../components/messenger_page/common/userdropdown.vue")['default']>
export const LazyMessengerPageContactsContactcontent: LazyComponent<typeof import("../components/messenger_page/contacts/contactcontent.vue")['default']>
export const LazyMessengerPageContacts: LazyComponent<typeof import("../components/messenger_page/contacts/contacts.vue")['default']>
export const LazyMessengerPageCustomizerChatwallpaper: LazyComponent<typeof import("../components/messenger_page/customizer/chatwallpaper.vue")['default']>
export const LazyMessengerPageCustomizerChoosecolor: LazyComponent<typeof import("../components/messenger_page/customizer/choosecolor.vue")['default']>
export const LazyMessengerPageCustomizerCustomizesetting: LazyComponent<typeof import("../components/messenger_page/customizer/customizesetting.vue")['default']>
export const LazyMessengerPageCustomizer: LazyComponent<typeof import("../components/messenger_page/customizer/index.vue")['default']>
export const LazyMessengerPageCustomizerLayout: LazyComponent<typeof import("../components/messenger_page/customizer/layout.vue")['default']>
export const LazyMessengerPageCustomizerSidebar: LazyComponent<typeof import("../components/messenger_page/customizer/sidebar.vue")['default']>
export const LazyMessengerPage: LazyComponent<typeof import("../components/messenger_page/index.vue")['default']>
export const LazyMessengerPageLefsidebarContactList: LazyComponent<typeof import("../components/messenger_page/lefsidebar/contact_list.vue")['default']>
export const LazyMessengerPageLefsidebarDocument: LazyComponent<typeof import("../components/messenger_page/lefsidebar/document.vue")['default']>
export const LazyMessengerPageLefsidebarFavourite: LazyComponent<typeof import("../components/messenger_page/lefsidebar/favourite.vue")['default']>
export const LazyMessengerPageLefsidebarNotification: LazyComponent<typeof import("../components/messenger_page/lefsidebar/notification.vue")['default']>
export const LazyMessengerPageLefsidebarRecentchat: LazyComponent<typeof import("../components/messenger_page/lefsidebar/recentchat.vue")['default']>
export const LazyMessengerPageLefsidebarSettingAccount: LazyComponent<typeof import("../components/messenger_page/lefsidebar/setting/account.vue")['default']>
export const LazyMessengerPageLefsidebarSettingChat: LazyComponent<typeof import("../components/messenger_page/lefsidebar/setting/chat.vue")['default']>
export const LazyMessengerPageLefsidebarSettingHelp: LazyComponent<typeof import("../components/messenger_page/lefsidebar/setting/help.vue")['default']>
export const LazyMessengerPageLefsidebarSettingIntegratin: LazyComponent<typeof import("../components/messenger_page/lefsidebar/setting/integratin.vue")['default']>
export const LazyMessengerPageLefsidebarSettings: LazyComponent<typeof import("../components/messenger_page/lefsidebar/settings.vue")['default']>
export const LazyMessengerPageLefsidebarStatus: LazyComponent<typeof import("../components/messenger_page/lefsidebar/status.vue")['default']>
export const LazyMessengerPageLeftSidebar: LazyComponent<typeof import("../components/messenger_page/left-sidebar.vue")['default']>
export const LazyMessengerPageModalsAudiocall1: LazyComponent<typeof import("../components/messenger_page/modals/audiocall1.vue")['default']>
export const LazyMessengerPageModalsAudiocall2: LazyComponent<typeof import("../components/messenger_page/modals/audiocall2.vue")['default']>
export const LazyMessengerPageModalsCodesnippets: LazyComponent<typeof import("../components/messenger_page/modals/codesnippets.vue")['default']>
export const LazyMessengerPageModalsConfigurationmodel: LazyComponent<typeof import("../components/messenger_page/modals/configurationmodel.vue")['default']>
export const LazyMessengerPageModalsCreatetodo: LazyComponent<typeof import("../components/messenger_page/modals/createtodo.vue")['default']>
export const LazyMessengerPageModalsGroupaudiocall: LazyComponent<typeof import("../components/messenger_page/modals/groupaudiocall.vue")['default']>
export const LazyMessengerPageModalsGroupvediocall: LazyComponent<typeof import("../components/messenger_page/modals/groupvediocall.vue")['default']>
export const LazyMessengerPageModalsNewCall: LazyComponent<typeof import("../components/messenger_page/modals/newCall.vue")['default']>
export const LazyMessengerPageModalsNewChat: LazyComponent<typeof import("../components/messenger_page/modals/newChat.vue")['default']>
export const LazyMessengerPageModalsNewContact: LazyComponent<typeof import("../components/messenger_page/modals/newContact.vue")['default']>
export const LazyMessengerPageModalsNotesmodal: LazyComponent<typeof import("../components/messenger_page/modals/notesmodal.vue")['default']>
export const LazyMessengerPageModalsPollModal: LazyComponent<typeof import("../components/messenger_page/modals/pollModal.vue")['default']>
export const LazyMessengerPageModalsSetreminder: LazyComponent<typeof import("../components/messenger_page/modals/setreminder.vue")['default']>
export const LazyMessengerPageModalsTodo: LazyComponent<typeof import("../components/messenger_page/modals/todo.vue")['default']>
export const LazyMessengerPageModalsVediocall: LazyComponent<typeof import("../components/messenger_page/modals/vediocall.vue")['default']>
export const LazyMessengerPageNav: LazyComponent<typeof import("../components/messenger_page/nav.vue")['default']>
export const LazyMessengerPageRightsidebarFiles: LazyComponent<typeof import("../components/messenger_page/rightsidebar/files/index.vue")['default']>
export const LazyMessengerPageRightsidebarFilesLink: LazyComponent<typeof import("../components/messenger_page/rightsidebar/files/link.vue")['default']>
export const LazyMessengerPageRightsidebarFilesMedia: LazyComponent<typeof import("../components/messenger_page/rightsidebar/files/media.vue")['default']>
export const LazyMessengerPageRightsidebar: LazyComponent<typeof import("../components/messenger_page/rightsidebar/index.vue")['default']>
export const LazyMessengerPageRightsidebarNotes: LazyComponent<typeof import("../components/messenger_page/rightsidebar/notes/index.vue")['default']>
export const LazyMessengerPageRightsidebarProfileCommongroup: LazyComponent<typeof import("../components/messenger_page/rightsidebar/profile/commongroup.vue")['default']>
export const LazyMessengerPageRightsidebarProfileContactinfo: LazyComponent<typeof import("../components/messenger_page/rightsidebar/profile/contactinfo.vue")['default']>
export const LazyMessengerPageRightsidebarProfile: LazyComponent<typeof import("../components/messenger_page/rightsidebar/profile/index.vue")['default']>
export const LazyMessengerPageRightsidebarProfilePersonalinfo: LazyComponent<typeof import("../components/messenger_page/rightsidebar/profile/personalinfo.vue")['default']>
export const LazyMessengerPageRightsidebarProfileStarredmessages: LazyComponent<typeof import("../components/messenger_page/rightsidebar/profile/starredmessages.vue")['default']>
export const LazyMessengerPageRightsidebarProfileStatus: LazyComponent<typeof import("../components/messenger_page/rightsidebar/profile/status.vue")['default']>
export const LazyMessengerPageRightsidebarReminder: LazyComponent<typeof import("../components/messenger_page/rightsidebar/reminder/index.vue")['default']>
export const LazyMessengerPageRightsidebarTodo: LazyComponent<typeof import("../components/messenger_page/rightsidebar/todo/index.vue")['default']>
export const LazyMessengerPageStickers: LazyComponent<typeof import("../components/messenger_page/stickers.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyIcon: LazyComponent<typeof import("../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']>
export const LazyIconCSS: LazyComponent<typeof import("../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
