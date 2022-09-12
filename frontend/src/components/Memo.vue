<template>
  <div class="memo">
    <div class="act">
      <button class="btn btn-primary" @click="add()">+ 추가</button>
    </div>
    <ul>
      <li v-for="data in state.ListData" :key="data.id" @click.prevent.stop="edit(data.id)">
        {{ data.content }}
        <button class="btn btn-danger float-right" @click.prevent.stop="remove(data.id)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    const state = reactive({
      ListData: [],
    });

    let add = async () => {
      let content = prompt("내용을 입력해주세요.");

      if (content == "") {
        alert("내용을 입력해주세요.");
        return add();
      }

      await axios.post("http://localhost:3000/api/memos", { content }).then((응답) => {
        state.ListData = 응답.data;
      });
    };

    let edit = async (editId) => {
      let editContent = prompt("내용을 입력해주세요.", state.ListData.find((data) => data.id === editId).content);

      await axios.put("http://localhost:3000/api/memos/" + editId, { editContent }).then((응답) => {
        state.ListData = 응답.data;
      });
    };

    let remove = async (id) => {
      console.log("id: " + id);
      await axios.delete(`http://localhost:3000/api/memos/${id}`).then((응답) => {
        state.ListData = 응답.data;
      });
    };

    let MemoListDataLoad = async () => {
      await axios.get("http://localhost:3000/api/memos").then((응답) => {
        state.ListData = 응답.data;
      });
    };

    MemoListDataLoad();

    return { state, add, edit, remove };
  },
};
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped>
button {
  padding: 5px;
}
.memo {
  .act {
    padding: 10px 10px 5px 5px;
    text-align: right;
  }
  ul {
    list-style: none;
    padding: 15px;
    margin: 10px 0;
    li {
      padding: 15px;
      margin: 5px;
      border: 1px solid#eee;
    }
  }
}
</style>
