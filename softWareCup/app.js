// 初始化 Swiper
let swiper;
function initSwiper() {
    swiper = new Swiper(".mySwiper", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        allowTouchMove: true,
        on: {
            init: function () {
                updateNavigationButtons();
            },
            slideChange: function () {
                updateNavigationButtons();
            },
        },
    });
}

// 更新导航按钮显示状态
function updateNavigationButtons() {
    if (!swiper) return;
    
    const prevBtn = document.querySelector('.swiper-button-prev');
    const nextBtn = document.querySelector('.swiper-button-next');
    
    if (!prevBtn || !nextBtn) return;
    
    // 第一页隐藏左按钮
    if (swiper.isBeginning) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
    }
    
    // 最后一页隐藏右按钮
    if (swiper.isEnd) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'flex';
    }
}

// 检查登录状态
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (isLoggedIn === 'true') {
        // 已登录
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('mainPage').classList.add('active');
        
        if (hasSeenWelcome !== 'true') {
            // 第一次登录，显示欢迎页
            showWelcomePage();
        }
    } else {
        // 未登录，显示登录页
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('welcomePage').classList.remove('active');
        document.getElementById('mainPage').classList.remove('active');
    }
}

// 处理登录
function handleLogin() {
    const loginBtn = document.getElementById('loginBtn');
    
    // 添加扩展动画类
    loginBtn.classList.add('expand');
    
    // 等待动画完成后执行登录
    setTimeout(() => {
        performLogin();
    }, 600); // 与动画时长一致
}

function performLogin() {
    const loginBtn = document.getElementById('loginBtn');
    
    // 保存登录状态
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', 'User');
    
    // 隐藏登录页和按钮
    document.getElementById('loginPage').classList.add('hidden');
    loginBtn.classList.add('hidden');
    loginBtn.classList.remove('expand'); // 移除动画类
    
    // 显示欢迎页
    showWelcomePage();
}

// 显示欢迎页
function showWelcomePage() {
    const welcomePage = document.getElementById('welcomePage');
    // welcomePage.setAttribute('view-transition-name', 'login-button');
    welcomePage.classList.add('active');
    
    // 初始化 Swiper
    if (!swiper) {
        initSwiper();
        // welcomePage.setAttribute('view-transition-name', 'no');
    }
}

// 进入主页
function enterMainPage() {
    // 标记已看过欢迎页
    localStorage.setItem('hasSeenWelcome', 'true');
    
    // 隐藏欢迎页
    document.getElementById('welcomePage').classList.remove('active');
    
    // 显示主页
    document.getElementById('mainPage').classList.add('active');
}

// 退出登录
function handleLogout() {
    const loginBtn = document.getElementById('loginBtn');
    const loginPage = document.getElementById('loginPage');
    const loginContainer = document.querySelector('.login-container');
    
    // 重置页面显示
    document.getElementById('mainPage').classList.remove('active');
    document.getElementById('welcomePage').classList.remove('active');
    
    // 先显示登录页面（隐藏状态）
    loginPage.classList.remove('hidden');
    loginBtn.classList.remove('hidden');
    
    // 确保登录容器内容不可见
    if (loginContainer) {
        loginContainer.classList.remove('visible');
    }
    
    // 添加收缩动画类，让按钮从全屏变回圆形
    loginBtn.classList.add('shrink');
    
    // 等待收缩动画完成后清除状态并显示完整登录页面
    setTimeout(() => {
        loginBtn.classList.remove('shrink');
        
        // 淡入显示登录容器内容（标题和按钮文字）
        if (loginContainer) {
            loginContainer.classList.add('visible');
        }
        
        // 清除登录状态
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('hasSeenWelcome');
        localStorage.removeItem('username');
        
        // 重置 Swiper 到第一页
        if (swiper) {
            swiper.slideTo(0);
        }
    }, 600);
}

// 查看教程 (重新显示欢迎页)
function showTutorial() {
    document.getElementById('mainPage').classList.remove('active');
    document.getElementById('welcomePage').classList.add('active');
    
    // 重置 Swiper 到第一页
    if (swiper) {
        swiper.slideTo(0);
    }
}

// 下一步按钮功能
function goToNextSlide() {
    if (swiper && !swiper.isEnd) {
        swiper.slideNext();
    }
}

// 页面加载时检查登录状态
window.addEventListener('load', () => {
    initSwiper();
    checkLoginStatus();
});
