// 获取父容器和图片列表
const slider = document.getElementById("slider");
const images = Array.from(slider.getElementsByTagName("img"));
let currentImage = 0; // 当前显示的图片索引

// 设置定时器，每隔 3 秒切换图片
setInterval(() => {
  // 移除当前图片的 active 类
  images[currentImage].classList.remove("active");

  // 计算下一张图片的索引，实现循环播放
  currentImage = (currentImage + 1) % images.length;

  // 给下一张图片添加 active 类，显示出来
  images[currentImage].classList.add("active");
}, 3000);
