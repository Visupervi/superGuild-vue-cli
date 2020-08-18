/**
 * @Author: visupervi
 * @Date: 2020-08-18 10:58
 * @return:
 * @Description 解决安卓手机输入框，文本框被遮挡问题
*/

export const inputUp = () => {
  //安卓机型，自动上滑露出输入框
  if (/Android/.test(navigator.appVersion)) {
    // console.log("12212121");
    // console.log(document.querySelector('.header'));

    window.addEventListener("resize", () => {
      // console.log("document.querySelector('.header')", document.querySelector('.header'));
      // console.log("document.activeElement.tagName", document.activeElement);
      // console.log("document.querySelector('.coment')",document.querySelector('.breakThrough'));
      if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA" || document.activeElement._prevClass === 'van-field_control') {
        if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
          document.activeElement.tagName.scrollIntoView({behavior: "instant", block: "start", inline: "start"})
        } else {
          // if()
          // console.log("document.querySelector('.coment')",document.querySelector('.coment'));
          document.querySelector('.header').scrollIntoView({behavior: "instant", block: "start", inline: "start"});
          document.querySelector('.breakThrough').scrollIntoView({behavior: "instant", block: "start", inline: "start"});
        }
        // document.querySelector('.header').scrollViewIfNeeded()
      }
    })
  }
};

