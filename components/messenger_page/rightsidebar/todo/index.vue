<template>

  <div class="tab-pane" :class="activerightsidebarmenu == 3 ? 'active' : ''">
    <li id="todo">
      <div class="todo-main">
        <div class="theme-title">
          <div class="d-flex">
            <div>
              <h2>Todo</h2>
              <h4>to create your task</h4>
            </div>
            <div class="flex-grow-1 text-end">
              <a
                class="icon-btn btn-sm btn-outline-light close-apps"
                href="javascript:void(0)"
                @click="close(0)"
                ><Icon name="lucide:x" size="15" height="15"></Icon></a>
            </div>
          </div>
        </div>
        <div class="todo-name">
          <form class="default-form">
            <select class="custom-scroll" name="support[support_type]">
              <option>All Conversations</option>
              <option>Josephin water</option>
              <option>Jony Lynetin</option>
              <option>Sufiya Elija</option>
              <option>Mukrani Pabelo</option>
              <option>Jhon Deo</option>
            </select>
          </form>
        </div>
        <div class="todo-tab theme-tab custom-scroll">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a
                class="nav-link button-effect"
                :class="activetabindex == 1 ? 'active' : ''"
                data-toggle="pill"
                href="#todo1"
                @click="activetab(1)"
                >All</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link button-effect"
                :class="activetabindex == 2 ? 'active' : ''"
                data-toggle="pill"
                href="#todo2"
                @click="activetab(2)"
                >My to-dos</a
              >
            </li>
            <li>
              <a
                class="icon-btn btn-light button-effect btn-sm"
               data-bs-toggle="modal" data-bs-target="#todoModal"
                ><Icon name="lucide:plus" size="15" height="15"></Icon
                  ></a>
            </li>
          </ul>
          <div class="tab-content">
            <div
              class="tab-pane"
              :class="activetabindex == 1 ? 'active show' : ''"
              id="todo1"
            >
              <div class="tab-card text-left">
                <div class="todo-task">
                  <h4>Designer Discussion</h4>
                  <div class="todo-main-content">
                    <div class="input-text">
                      <input
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />
                      <input
                        id="user_input12"
                        type="text"
                        name="todo-text"
                        placeholder="Give me review on our side"
                      />
                    </div>
                    <MessengerPageCommonUserdropdown/>
                  </div>
                  <div class="todo-list">
                    <div class="element" id="div_3">
                      <span class="add add-to-do">Add-To-Do</span>
                    </div>
                  </div>
                  <div class="todo-main-content">
                    <div class="input-text">
                      <input
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />
                      <input
                        id="user_input13"
                        type="text"
                        name="todo-text"
                        placeholder="Redesign Your Design"
                      />
                    </div>
                   <MessengerPageCommonUserdropdown/>
                  </div>
                  <div class="todo-list">
                    <div class="element" id="div_2">
                      <span class="add add-to-do">Add-To-Do</span>
                    </div>
                  </div>
                  <div class="todo-main-content">
                    <div class="input-text">
                      <input
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />
                      <input
                        id="user_input14"
                        type="text"
                        name="todo-text"
                        placeholder=" Complete Project report"
                      />
                    </div>
                   <MessengerPageCommonUserdropdown/>
                  </div>
                  <div class="todo-list" v-for="(todo, index) in todo" :key="todo.id">
                    <div class="element" id="div_1" @click="addtodo()">
                      <span class="add add-to-do">Add-To-Do</span>
                    </div>
                    <div >
                      <form class="p-15">
                        <div class="form-group mb-2" style="display:flex">
                          <input type="checkbox" id="txt_2" />
                          <input type="text" class="m-l-15 " placeholder="Completed Project Report"/>
                        </div>
                        <div class="todo-buttons">
                          <a
                            class="badge badge-success font_label"
                            href="javascript:void(0)"
                            style="padding: 7px 12px"
                            >Save</a
                          >
                          <a
                            class="badge badge-outline-primary font_label"
                            href="javascript:void(0)"
                            style="padding: 7px 12px"
                            >Cancel</a
                          >
                          <span
                            id="remove_2"
                            class="remove"
                            @click="removetodo(index)"
                            ><i class="fa fa-trash" style="font-size : 20px"></i
                          ></span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              :class="activetabindex == 2 ? 'active show' : ''"
              id="todo2"
            >
              <div class="converstaion-docs tab-card">
                <i class="fa fa-sticky-note-o"></i>
                <h5 class="mb-3">No Open To-Dos Here</h5>
                <a
                  class="btn btn-primary btn-sm"
                 data-bs-toggle="modal" data-bs-target="#createtodoModal"
                  >Create A To-Do</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </div>
 
</template>
<script setup>
import { MessengerPageCommonUserdropdown } from "#components";
import { useCommonStore } from "@/store/common";


const commonStore = useCommonStore();
const activetabindex = ref(1);
const todo = ref([]);
const activerightsidebarmenu = computed(() => commonStore.activerightsidebarmenu);

const todoComponent = ref(null);
const createtodoComponent = ref(null);

const close = (id) => {
  commonStore.activerightsidebarmenu = id;
  document.getElementById("content")?.classList.add("small-sidebar");
};

const activetab = (id) => {
  activetabindex.value = id;
};

const showTodoModal = () => {
  todoComponent.value?.show();
};

const showCreateTodoModal = () => {
  createtodoComponent.value?.show();
};

const addtodo = () => {
  todo.value.push(1);
};

const removetodo = (index) => {
  if (index !== -1) {
    todo.value.splice(index, 1);
  }
};
</script>

