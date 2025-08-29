import { defineStore } from 'pinia';


import status from '~/data/status.json';
import favourite from '~/data/favourite.json';
import document from '~/data/document.json';
import contact from '~/data/contactList.json';
import notification from '~/data/notification.json';
import link from '~/data/files.json';
import media from "@/data/media.json"

export const useSidebarStore = defineStore('sidebar', () => {
 
  const statusData = ref(status.status_data);
  const favouriteData = ref(favourite.favourite_data);
  const documentData = ref(document.document_data);
  const contactData = ref(contact.contact_data);
  const notificationData = ref(notification.notification_data);
  const linkData = ref(link.link_data);
  const mediaData = ref(link.media_data);
  const mediaDatas=ref(media.media)

 
  
  return {
    statusData,
    favouriteData,
    documentData,
    contactData,
    notificationData,
    linkData,
    mediaData,
    mediaDatas
  };
});
