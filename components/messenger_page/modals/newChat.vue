<template>
  <div class="modal fade add-popup msg-chat-modal" id="msgchatModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
               Create New Message</h2>
            <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <div class="chat-msg-search">
              <div class="input-group">
                <input class="form-control" type="text" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon21"/>
                <div class="input-group-append"><span class="input-group-text" id="basic-addon21">@</span></div>
              </div>
            </div>
            <ul class="chat-main custom-scroll">
        <MessengerPageChatDirectChatDirectchatuser/>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>

</script>
