<template>
<!--Report popup-->
<div class="modal fade editstatus-modal" id="editstatusBtn" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
        <div class="modal-content text-white modal-inner editstatus-small">
          <!-- Header -->
			<div class="edt-sts-header">
			  <div class="edt-sts-corner-icon" title="Status">
				<img src="/images/badges/animated/150X150px/glass.gif" alt="GLASS icon">
			  </div>

			  <div class="edt-sts-title">
				<h2 id="modalTitle">Edit Your Status</h2>
				<p>Type your status and tap 🙂 to add emojis.</p>
			  </div>

			  <button class="edt-sts-close" id="closeBtn" aria-label="Close">×</button>
			</div>

          <!-- Body -->
			<div class="edt-sts-content">
			  <div class="edt-sts-input-row">
				<textarea id="statusInput" placeholder="What’s on your mind?"></textarea>

				<button class="edt-sts-emoji-btn" id="emojiBtn" type="button" aria-label="Add emoji">
				  <span class="edt-sts-smile">🙂</span>
				</button>
			  </div>

			  <div class="edt-sts-picker" id="picker">
				<div class="edt-sts-picker-top">
				  <span>Tap an emoji to insert</span>
				  <button type="button" id="hidePickerBtn">Hide</button>
				</div>
				<div class="edt-sts-emoji-grid" id="emojiGrid">
				  <div class="edt-sts-emoji">😀</div><div class="edt-sts-emoji">😁</div><div class="edt-sts-emoji">😂</div><div class="edt-sts-emoji">🤣</div><div class="edt-sts-emoji">😊</div>
				  <div class="edt-sts-emoji">😍</div><div class="edt-sts-emoji">😘</div><div class="edt-sts-emoji">😉</div><div class="edt-sts-emoji">😎</div><div class="edt-sts-emoji">🔥</div>
				  <div class="edt-sts-emoji">💋</div><div class="edt-sts-emoji">❤️</div><div class="edt-sts-emoji">💚</div><div class="edt-sts-emoji">✨</div><div class="edt-sts-emoji">🎉</div>
				  <div class="edt-sts-emoji">👀</div><div class="edt-sts-emoji">😈</div><div class="edt-sts-emoji">😇</div><div class="edt-sts-emoji">🥂</div><div class="edt-sts-emoji">💬</div>
				</div>
			  </div>

			  <div class="edt-sts-bottom-note">Status will be reset after 24h.</div>
			</div>
			<div class="edt-sts-footer">
			  <button class="edt-sts-btn" id="cancelBtn" type="button">Cancel</button>
			  <button class="edt-sts-btn edt-sts-primary" id="saveBtn" type="button">Save</button>
			</div>
		</div>
	</div>
</div> 
</template>
<style>
.edt-sts-header{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:12px;
  padding-bottom:14px;
  border-bottom:1px solid rgba(255,255,255,.08);
  position:relative;
}
.editstatus-small {
    max-width: 600px;
}
.edt-sts-corner-icon{
  width:50px;
  height:50px;
  border-radius:14px;
  border:1px solid rgba(255,43,43,.55);
  background: linear-gradient(180deg, rgba(255,43,43,.22), rgba(255,43,43,.06));
  display:grid;
  place-items:center;
  box-shadow: 0 10px 26px rgba(0,0,0,.45), 0 0 20px rgba(255,43,43,.18);
  overflow:hidden;
  flex:0 0 50px;
  margin-top:1px;
}
.edt-sts-corner-icon img{
  width:34px;
  height:34px;
  object-fit:contain;
  filter: drop-shadow(0 6px 10px rgba(0,0,0,.45));
}

.edt-sts-title{
  display:flex;
  flex-direction:column;
  gap:3px;
  flex:1;
  padding-top:2px;
}
.edt-sts-title h2{
  margin:0;
  font-size:18px;
  letter-spacing:.3px;
  line-height:1.15;
  color: #fff;
}
.edt-sts-title p{
  margin:0;
  font-size:12px;
  color:#b9b9c7;
}

/* X button + glow on hover (keep movement) */
.edt-sts-close{
  width:40px;height:40px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.10);
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03));
  color:#b9b9c7;
  cursor:pointer;
  display:grid;
  place-items:center;
  font-size:18px;
  box-shadow: 0 10px 22px rgba(0,0,0,.35);
  margin-top:4px;
  transition: transform .18s ease, filter .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.edt-sts-close:hover{
  transform: translateY(-1px);
  filter:brightness(1.12);
  border-color: rgba(255,43,43,.45);
  box-shadow:
	0 16px 30px rgba(0,0,0,.55),
	0 0 18px rgba(255,43,43,.22),
	0 0 40px rgba(255,43,43,.12);
}

.edt-sts-content{ padding-top:14px; }

.edt-sts-input-row{
  display:flex;
  align-items:stretch;
  gap:10px;
}

.editstatus-modal textarea{
  width:100%;
  min-height:120px;
  resize:none;
  border-radius:16px;
  padding:12px 12px;
  border:1px solid rgba(255,255,255,.10);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  color:#b9b9c7;
  outline:none;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.35), 0 12px 28px rgba(0,0,0,.35);
  font-size:14px;
}
.editstatus-modal textarea:focus{
  border-color: rgba(255,43,43,.60);
  box-shadow: 0 0 0 4px rgba(255,43,43,.14), inset 0 0 0 1px rgba(0,0,0,.35), 0 12px 28px rgba(0,0,0,.35);
}

/* Emoji button glow on hover (keep movement) */
.edt-sts-emoji-btn{
  width:56px;
  flex:0 0 56px;
  border-radius:16px;
  border:1px solid rgba(255,43,43,.60);
  background: linear-gradient(180deg, rgba(255,43,43,.30), rgba(255,43,43,.08));
  cursor:pointer;
  display:grid;
  place-items:center;
  box-shadow: 0 14px 30px rgba(0,0,0,.45), 0 0 22px rgba(255,43,43,.16);
  transition: transform .18s ease, filter .18s ease, box-shadow .18s ease, border-color .18s ease;
  position:relative;
}
.edt-sts-emoji-btn .edt-sts-smile{
  font-size:22px;
  filter: drop-shadow(0 6px 10px rgba(0,0,0,.45));
}
.edt-sts-emoji-btn:hover{
  transform: translateY(-1px);
  filter:brightness(1.12);
  border-color: rgba(255,43,43,.70);
  box-shadow:
	0 18px 36px rgba(0,0,0,.55),
	0 0 18px rgba(255,43,43,.22),
	0 0 44px rgba(255,43,43,.14);
}

.edt-sts-picker{
  margin-top:10px;
  display:none;
  padding:12px;
  border-radius:16px;
  border:1px solid rgba(255,43,43,.35);
  background:
	radial-gradient(600px 220px at 10% 0%, rgba(255,43,43,.18), transparent 60%),
	linear-gradient(180deg, rgba(18,18,26,.96), rgba(10,10,14,.96));
  box-shadow: 0 18px 40px rgba(0,0,0,.55);
}
.edt-sts-picker.show{ display:block; }

.edt-sts-picker-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  margin-bottom:10px;
}
.edt-sts-picker-top span{
  font-size:12px;
  color:var(--muted);
  letter-spacing:.2px;
}
.edt-sts-picker-top button{
  border:1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.06);
  color:#b9b9c7;
  border-radius:12px;
  padding:7px 10px;
  cursor:pointer;
  font-size:12px;
  box-shadow: 0 10px 22px rgba(0,0,0,.35);
  transition: transform .18s ease, filter .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.edt-sts-picker-top button:hover{
  transform: translateY(-1px);
  filter:brightness(1.12);
  border-color: rgba(255,43,43,.35);
  box-shadow: 0 16px 28px rgba(0,0,0,.55), 0 0 22px rgba(255,43,43,.10);
}

.edt-sts-emoji-grid{
  display:grid;
  grid-template-columns: repeat(10, 1fr);
  gap:7px;
}
.edt-sts-emoji{
  border:1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.04);
  border-radius:12px;
  height:36px;
  display:grid;
  place-items:center;
  cursor:pointer;
  font-size:18px;
  user-select:none;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.25);
  transition: transform .12s ease, filter .12s ease, box-shadow .12s ease, border-color .12s ease, background .12s ease;
}
.edt-sts-emoji:hover{
  transform: translateY(-1px);
  border-color: rgba(255,43,43,.55);
  background: rgba(255,43,43,.12);
  box-shadow: 0 0 0 4px rgba(255,43,43,.10);
  filter:brightness(1.08);
}

.edt-sts-bottom-note{
  margin-top:10px;
  font-size:12px;
  color:#b9b9c7;
  text-align:left;
  letter-spacing:.2px;
}

.edt-sts-footer{
  margin-top:14px;
  display:flex;
  justify-content:flex-end;
  gap:10px;
  padding-top:14px;
  border-top:1px solid rgba(255,255,255,.08);
}

/* Buttons: keep movement + add glow on hover */
.edt-sts-btn{
  border-radius:14px;
  padding:11px 14px;
  cursor:pointer;
  border:1px solid rgba(255,255,255,.12);
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03));
  color: #f4f4f8;
  font-weight: 600;
  letter-spacing:.2px;
  box-shadow: 0 14px 28px rgba(0,0,0,.35);
  transition: transform .18s ease, filter .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.edt-sts-btn:hover{
  transform: translateY(-1px);
  filter:brightness(1.12);
  border-color: rgba(255,43,43,.35);
  box-shadow:
	0 18px 34px rgba(0,0,0,.45),
	0 0 18px rgba(255,43,43,.18),
	0 0 44px rgba(255,43,43,.10);
}

.edt-sts-btn.edt-sts-primary{
  border-color: rgba(255,255,255,.14);
  background: linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.04));
}
.edt-sts-btn.edt-sts-primary:hover{
  border-color: rgba(255,43,43,.45);
  box-shadow:
	0 18px 34px rgba(0,0,0,.45),
	0 0 20px rgba(255,43,43,.22),
	0 0 52px rgba(255,43,43,.12);
}

@media (max-width:520px){
  .edt-sts-emoji-grid{ grid-template-columns: repeat(8, 1fr); }
  .edt-sts-emoji-btn{ width:52px; flex-basis:52px; }
  .edt-sts-corner-icon{ width:46px; height:46px; flex-basis:46px; }
  .edt-sts-corner-icon img{ width:32px; height:32px; }
  .edt-sts-input-row {
    flex-direction: column;
    align-items: flex-end;
}
}
</style> 
