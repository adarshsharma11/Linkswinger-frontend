import Lightgallery from "lightgallery/vue";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      LG: {
        Lightgallery,
        lgThumbnail,
        lgZoom,
        lgVideo,
      }
    }
  };
});
