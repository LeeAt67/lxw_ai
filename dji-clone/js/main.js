// 主JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 处理滚动时导航栏的样式变化
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 模拟产品数据加载
    setTimeout(function() {
        console.log('产品数据加载完成');
    }, 1000);

    // 处理移动端菜单（如果需要实现）
    // 这里可以添加移动端菜单的展开/收起逻辑
});