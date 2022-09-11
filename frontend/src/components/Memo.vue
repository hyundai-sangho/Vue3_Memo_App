<template>
  <div class="memo">
    <div class="act">
      <button class="btn btn-primary" @click="add()">+ 추가</button>
    </div>
    <ul>
      <li v-for="(data, index) in state.ListData" :key="index">{{ data }}</li>
    </ul>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      ListData: ["메모 1 내용", "메모 2 내용", "메모 3 내용", "메모 4 내용", "메모 5 내용"],
    });

    const add = () => {
      state.ListData.push("추가된 메모 내용");
    };

    return { state, add };
  },
};
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped>
.memo {
  .act {
    padding: 10px 10px 5px 5px;
    text-align: right;
  }
  ul {
    border-top: 1px solid #eee;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 15px;
      margin: 5px;
    }
  }
}
</style>
