<template>
  <div>
    <n-grid :cols="6">
      <n-grid-item >
        <div class="light-green" />
      </n-grid-item>
      <n-grid-item :span="4" >
        <div class="grid-items-video">
          <AddLinkVideo />
        </div>
      </n-grid-item>
      <n-grid-item>
        <div></div>
      </n-grid-item>
    </n-grid>
    <n-grid :cols="6">
      <n-gi>
        <div class="light-green" />
      </n-gi>
      <n-gi :span="4">
        <div class="grid-items">
          <PostContainer />
        </div>
      </n-gi>
      <n-gi>
        <div class="light-green" />
      </n-gi>
    </n-grid>
  </div>
</template>
<script></script>
<style scoped>
.grid-items {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  width: 100%;
}

.grid-items-video {
  justify-content: center;
  
  align-items: center;
  width: 100%;
  margin: 20px;
  padding-top: 3%;
}

.base-color {
  font-weight: normal;
  background-color: rgba(190, 190, 190, 0.562);
}
</style>
