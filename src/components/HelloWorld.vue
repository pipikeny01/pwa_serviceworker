<template>
  <div class="hello">
    <h1>PWA 離線作業 DEMO</h1>
    <p>
      <button type="button" @click="displayNotification">
        displayNotification
      </button>
    </p>
    <h1 v-if="offline" style="color: red">正在離線模式</h1>
    <p>推播測試</p>
    <p>推播會在app開啟時以及在背景會通知成功</p>
    <p>基本上app有開著會正常通知</p>
    <p>
      要實現沒開app會通知可能需要實現server端的推播 ,
      讓serviceWorker的push事件接收
    </p>
    <p>參考資料</p>

    <p>
      <a
        target="_blank"
        href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers"
        >PWA
        離線作業(https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers)</a
      >
    </p>
    <p>
      <a
        target="_blank"
        href="https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/23496/"
        >PWA
        離線作業(https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/23496/)</a
      >
    </p>
    <p>
      <a
        target="_blank"
        href="https://jonny-huang.github.io/angular/training/21_pwa3/"
        >PWA推播(https://jonny-huang.github.io/angular/training/21_pwa3/)</a
      >
    </p>
    <p>
      <a target="_blank" href="https://www.letswrite.tw/pwa-web-push/"
        >PWA推播(https://www.letswrite.tw/pwa-web-push/)</a
      >
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  public offline: boolean = false;

  get appName() {
    return process.env.NODE_ENV === "production" ? "/pwa" : "";
  }
  //** 前端堆播*/
  // 還有後端推播給service-worker的push事件尚未實作 ,
  //可以參考https://jonny-huang.github.io/angular/training/21_pwa3/*/
  //瀏覽器偵錯模式有push可以測試
  public displayNotification() {
    if (Notification.permission == "granted") {
      navigator.serviceWorker.getRegistration().then((reg: any) => {
        var options = {
          icon: "./assets/images/android_048.png",
          body: "歡迎加入 Angular 社群",
          image:
            "https://augt-forum-upload.s3-ap-southeast-1.amazonaws.com/original/1X/6b3cd55281b7bedea101dc36a6ef24034806390b.png",
        };
        reg.showNotification("Angular User Group Taiwan", options);
        console.log("displayNotification");
      });
    } else {
      Notification.requestPermission((status) => {
        console.log("User choice", status);
        if (status !== "granted") {
          this.displayNotification();
          console.log("No notification permission granted!");
        } else {
          console.log(status);
        }
      });
    }
  }

  public mounted(): void {
    this.$http
      .get(`${this.appName}/offline.html?e=${new Date().getTime()}`)
      .then((response) => {
        this.offline = false;
      })
      .catch((e) => {
        this.offline = true;
        alert("網路線線失敗,是否要進入離線模式");
      })
      .finally(() => {});

    //測試前端推播
    // setInterval(() => {
    //   this.displayNotification();
    // }, 10000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
