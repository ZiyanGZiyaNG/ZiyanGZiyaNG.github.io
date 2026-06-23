const text = "Ziyang."; // 想要打出來的文字
const target = document.getElementById("typing-target");
let index = 0;
const speed = 150; // 每個字母跳出來的速度（毫秒）

function typeWriter() {
    if (index < text.length) {
        target.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

// 網頁載入完成後自動執行
window.onload = typeWriter;