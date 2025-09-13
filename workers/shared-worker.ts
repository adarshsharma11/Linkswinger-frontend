declare var self: SharedWorkerGlobalScope;

var socketId = ""
var is_reconnecting = false
var database: IDBDatabase | null = null