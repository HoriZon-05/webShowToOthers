// 缓存 DOM 元素引用
const elements = {
    loginPage: document.getElementById('loginPage'),
    welcomePage: document.getElementById('welcomePage'),
    mainPage: document.getElementById('mainPage'),
    loginBtn: document.getElementById('loginBtn'),
    actionBtn: document.getElementById('actionBtn'),
    prevBtn: document.querySelector('.swiper-button-prev'),
    nextBtn: document.querySelector('.swiper-button-next'),
    loginContainer: document.querySelector('.login-container')
};

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
                updateActionButton();
            },
            slideChange: function () {
                updateNavigationButtons();
                updateActionButton();
            },
        },
    });
}

// 更新导航按钮显示状态
function updateNavigationButtons() {
    if (!swiper) return;
    
    // 第一页隐藏左按钮
    if (swiper.isBeginning) {
        elements.prevBtn.style.display = 'none';
    } else {
        elements.prevBtn.style.display = 'flex';
    }
    
    // 最后一页隐藏右按钮
    if (swiper.isEnd) {
        elements.nextBtn.style.display = 'none';
    } else {
        elements.nextBtn.style.display = 'flex';
    }
}

// 更新底部按钮显示状态
function updateActionButton() {
    if (!swiper) return;
    
    // 最后一页显示"完成"，否则显示"下一步"
    if (swiper.isEnd) {
        elements.actionBtn.textContent = '完成';
    } else {
        elements.actionBtn.textContent = '下一步';
    }
}

// 检查登录状态
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (isLoggedIn === 'true') {
        // 已登录
        elements.loginPage.classList.add('hidden');
        
        if (hasSeenWelcome !== 'true') {
            // 第一次登录，显示欢迎页
            elements.mainPage.classList.remove('active');
            elements.welcomePage.classList.add('active');
            showWelcomePage();
        } else {
            // 非第一次登录，直接显示主页
            elements.welcomePage.classList.remove('active');
            elements.mainPage.classList.add('active');
        }
    } else {
        // 未登录，显示登录页
        elements.loginPage.classList.remove('hidden');
        elements.welcomePage.classList.remove('active');
        elements.mainPage.classList.remove('active');
    }
}

// 处理登录
function handleLogin() {
    // 添加扩展动画类
    elements.loginBtn.classList.add('expand');
    
    // 等待动画完成后执行登录
    setTimeout(() => {
        performLogin();
    }, 600); // 与动画时长一致
}

function performLogin() {
    // 保存登录状态
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', 'User');
    
    // 隐藏登录页和按钮
    elements.loginPage.classList.add('hidden');
    elements.loginBtn.classList.add('hidden');
    elements.loginBtn.classList.remove('expand'); // 移除动画类
    
    // 显示欢迎页
    showWelcomePage();
}

// 显示欢迎页
function showWelcomePage() {
    // welcomePage.setAttribute('view-transition-name', 'login-button');
    elements.welcomePage.classList.add('active');
    
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
    elements.welcomePage.classList.remove('active');
    
    // 显示主页
    elements.mainPage.classList.add('active');
}

// 处理按钮点击
function handleActionBtn() {
    if (swiper.isEnd) {
        enterMainPage();
    } else {
        goToNextSlide();
    }
}

// 退出登录
function handleLogout() {
    // 重置页面显示
    elements.mainPage.classList.remove('active');
    elements.welcomePage.classList.remove('active');
    
    // 先显示登录页面（隐藏状态）
    elements.loginPage.classList.remove('hidden');
    elements.loginBtn.classList.remove('hidden');
    
    // 确保登录容器内容不可见
    if (elements.loginContainer) {
        elements.loginContainer.classList.remove('visible');
    }
    
    // 添加收缩动画类，让按钮从全屏变回圆形
    elements.loginBtn.classList.add('shrink');
    
    // 等待收缩动画完成后清除状态并显示完整登录页面
    setTimeout(() => {
        elements.loginBtn.classList.remove('shrink');
        
        // 淡入显示登录容器内容（标题和按钮文字）
        if (elements.loginContainer) {
            elements.loginContainer.classList.add('visible');
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
    elements.mainPage.classList.remove('active');
    elements.welcomePage.classList.add('active');
    
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
