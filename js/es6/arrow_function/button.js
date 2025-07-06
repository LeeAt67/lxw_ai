// 业务流水账代码
// 封装
function Button(id) {
    this.element = document.querySelector(`#${id}`);
    console.log(this.element);
    this.bindEvent();
}

Button.prototype.bindEvent = function () {
    // this 丢失问题 // this Button
    this.element.addEventListener('click', this.setBgColor.bind(this)); //不用call是直接绑定一直显示  事件用bind是返回一个新的函数
}
Button.prototype.setBgColor = function () {
    this.element.style.backgroundColor = 'red';
    // this.element2..
}