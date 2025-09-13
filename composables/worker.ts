import { v4 as uuid } from 'uuid';
import { idStore } from '~/store/appstores'
import mitt from 'mitt'

const uniqueId = uuid();
var is_connected = false
let sharedWorker: SharedWorker
const emitter = mitt<Events>()
type Events = {
  serverTime: Date ,
}

export function initworker() {

  const id_store = idStore();
  var vendorId = id_store.getVendorId
  if (vendorId.length === 0) {
    vendorId = uniqueId
    id_store.setVendorId(uniqueId)
  }
  sharedWorker = new SharedWorker(
    new URL('@/workers/shared-worker.ts', import.meta.url),
    { name: 'mySharedWorker' }
  );

  sharedWorker.port.onmessage = async (event) => {
    await handleworkerevent(event)
  };
  
  sharedWorker.port.start();
}

export function sendmsgtoworker(message: any) {
  sharedWorker.port.postMessage(message)
}
export function useServerTime(initialServerTime : string) {
   let serverTime = new Date(initialServerTime)
   emitter.emit('serverTime', serverTime)
}
export function isSocketConnected()
{
  return is_connected
}
async function handleworkerevent(event: MessageEvent<any>) {

}
