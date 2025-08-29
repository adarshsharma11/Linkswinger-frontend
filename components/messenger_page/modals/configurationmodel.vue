<template>
     <div class="modal fade" id="configModal" tabindex="-1" aria-labelledby="configModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="configModalLabel">Modal title</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-header modal-copy-header">
                            <h3 class="headerTitle mb-0">Customizer configuration</h3>
                        </div>
                        <div class="modal-body">
                            <div class="config-popup">
                                <p>
                                    To replace our design with your desired theme. Please do
                                    configuration as mention
                                </p>
                                <p>
                                    <b>Path : src > data > layout.json</b>
                                </p>
                                <div>
                                    <pre class="overflow-hidden">
                                                                                                            <code>
                                                                                                              {{store.layout}}
                                                    </code>
   </pre>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary" @click="copy()">
                                Copy text
                            </button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
</template>
<script setup>
import {useLayoutStore} from "@/store/layout"
let store=useLayoutStore()
const layout = computed(() => store.layout.layout);
</script>