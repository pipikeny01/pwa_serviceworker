/* eslint-disable no-console */

import { register } from "register-service-worker";

register(`${process.env.BASE_URL}sw.js`, {
  ready() {
    console.log(
      "App is being served from cache by a service worker.\n" +
        "For more details, visit https://goo.gl/AFskqB"
    );
    //詢問推播權限
    if ("Notification" in window) {
      console.log(
        "Notification permission default status:",
        Notification.permission
      );
      Notification.requestPermission(function (status) {
        console.log("User choice", status);
        if (status !== "granted") {
          displayNotification();
          console.log("No notification permission granted!");
        } else {
          console.log(status);
        }
      });
    }
  },
  registered() {
    console.log("Service worker has been registered.");
  },
  cached() {
    console.log("Content has been cached for offline use.");
  },
  updatefound() {
    console.log("New content is downloading.");
  },
  updated() {
    console.log("New content is available; please refresh.");
  },
  offline() {
    console.log(
      "No internet connection found. App is running in offline mode."
    );
  },
  error(error) {
    console.error("Error during service worker registration:", error);
  },
});
function displayNotification() {
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
  }
}
