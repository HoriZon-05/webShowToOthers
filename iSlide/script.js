//深色模式按钮
document.getElementById('darkModeToggle').addEventListener('change', function () {
    const imageLight = document.querySelector('#imageLight');
    const imageDark = document.querySelector('#imageDark');
    const bannerImg = document.querySelector('#bannerImg');
    const movePart = document.querySelector('.movePart');
    const firstPage = document.querySelector('.firstPage');
    const box = document.querySelector('.Box');

    if (this.checked) {
        // 切换到深色模式
        imageLight.style.display = 'none';
        imageDark.style.display = 'block';
        document.documentElement.style.setProperty('color-scheme', 'dark');
        bannerImg.style.filter = 'invert(1) hue-rotate(180deg) brightness(0.8)';
        movePart.style.filter = 'invert(1) hue-rotate(180deg) ';
        box.style.filter = 'invert(1) hue-rotate(180deg) ';
        firstPage.style.background = 'black';
        document.documentElement.style.transition = 'all 0.5s ease';
    } else {
        // 切换回浅色模式
        imageLight.style.display = 'block';
        imageDark.style.display = 'none';
        document.documentElement.style.setProperty('color-scheme', 'light');
        bannerImg.style.filter = 'none';
        movePart.style.filter = 'none';
        box.style.filter = 'none';
        firstPage.style.background = 'white';
        document.documentElement.style.transition = 'all 0.5s ease';
    }
});


//  返回顶部按钮
const backToTopButton = document.getElementsByClassName("TOPbutton")[0];

window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
})

backToTopButton.addEventListener("click",() => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 添加平滑滚动
    });
})


//搜索框
const searchInput = document.getElementById("searchInput");
const glass = document.getElementById("glass");
const REALglass = document.getElementById("REALglassBtn");
const x = document.getElementById("xMark");
glass.addEventListener("click", function () {
    searchInput.style.visibility = "visible";
    searchInput.style.transform = "translateY(1px)";
    searchInput.style.transition = "all 0.5s ease-in-out";
    glass.style.visibility = "visible";
    glass.style.transform = "translateX(-1vw)";
    glass.style.transition = "all 0.5s ease-in-out";
    REALglass.style.visibility = "visible";
    REALglass.style.transform = "translateX(-3vw)";
    REALglass.style.transition = "all 0.5s ease-in-out";
    x.style.visibility = "visible";
    x.style.transform = "translateX(-4.5vw)";
    x.style.transition = "all 0.5s ease-in-out";
});
document.getElementById("xMark").addEventListener("click", function () {
    searchInput.style.visibility = "hidden"; // 添加这行代码来隐藏搜索框
    searchInput.style.transform = "translateY(-200px)";
    searchInput.style.transition = "all 0.5s ease-in-out";
    glass.style.transform = "translateX(1vw)";
    glass.style.transition = "all 0.5s ease-in-out";
    REALglass.style.transform = "translateX(3vw)";
    REALglass.style.transition = "all 0.5s ease-in-out";
    REALglass.style.visibility = "hidden";
    REALglass.style.opacity = "0";
    x.style.transform = "translateX(4.5vw)";
    x.style.transition = "all 0.5s ease-in-out";
    x.style.visibility = "hidden";
});



// 移动端的展开菜单
const unfoldMenuInput = document.querySelector('.unfoldMenu input');
const navCorn = document.querySelector('.navCorn');
const submenu = document.querySelector('.submenu');
// 检测屏幕宽度是否小于等于 900px
const mediaQuery = window.matchMedia('(max-width: 900px)');
const at = document.querySelectorAll('.navCorn a');
const navBackground = document.querySelector('.navBackground');
const body = document.querySelector('body');

// 监听 input 的 change 事件
unfoldMenuInput.addEventListener('change', function () {
    if (this.checked) {
        navCorn.classList.remove('negative');
        navCorn.classList.add('active');
        // body.style.overflowY = 'hidden';
    } else {
        navCorn.classList.remove('active');
        navCorn.classList.add('negative');
        // body.style.overflowY = 'auto';
    }
});
// 监听屏幕宽度变化
mediaQuery.addEventListener('change', (event) => {
    if (!event.matches) {// 屏幕宽度 > 900px 时执行的代码
        navCorn.classList.remove('negative');
        navCorn.classList.add('active');

    }
    else {
        unfoldMenuInput.checked = false;
        navCorn.classList.remove('active');
        navCorn.classList.add('negative');
    }
});
// 初始加载时判断
if (!mediaQuery.matches) {// 屏幕宽度 > 900px 时执行的代码
    navCorn.classList.remove('negative');
    navCorn.classList.add('active');
    unfoldMenuInput.checked = false;
} else {
    unfoldMenuInput.checked = false;
}


//移动端菜单用点击代替悬停
const foldableItems = document.querySelectorAll('.foldable');

// 遍历每个可折叠的菜单项
foldableItems.forEach(item => {
    // 获取对应的子菜单
    const submenu = item.querySelector('.submenu');

    // 监听点击事件
    item.addEventListener('click', function () {
        // 切换子菜单的 active 类
        submenu.classList.toggle('active');
    });
});

//鼠标悬停下拉菜单按钮恢复原色
document.querySelectorAll('.dropdown-menu li a').forEach(link => {
    link.addEventListener('mouseover', () => {
        document.getElementById('PCdownload').style.color = '#555';
    });

    link.addEventListener('mouseout', () => {
        document.getElementById('PCdownload').style.color = ''; // 恢复默认
    });
});

// 在视频还未加载出来之前实现gif占位,加载完成后替换为超清视频
document.addEventListener('DOMContentLoaded', function () {
    const video = document.querySelector('.videoContainer video'); // 获取视频元素
    const gifPlaceholder = document.querySelector('.videoContainer img'); // 获取GIF占位图
    const loadingText = document.querySelector('.loading-text'); // 获取加载提示文字

    // 预加载视频
    video.preload = 'auto';

    // 监听视频可以播放的事件
    video.addEventListener('canplaythrough', function () {
        // 隐藏GIF和加载文字
        gifPlaceholder.style.display = 'none';
        if (loadingText) loadingText.style.display = 'none';

        // 显示视频并开始播放
        video.style.display = 'block';
        video.play().catch(e => {
            console.log('自动播放被阻止:', e);
            // 如果自动播放被阻止，至少显示视频控件让用户手动播放
        });
    });

    // 错误处理
    video.addEventListener('error', function () {
        gifPlaceholder.src = 'error-placeholder.jpg'; // 替换为错误占位图
        if (loadingText) loadingText.textContent = '视频加载失败，请刷新重试';
        console.error('视频加载错误:', video.error);
    });

    // 开始加载视频（某些浏览器需要触发）
    video.load();
});
function handleError() {
    clearInterval(gifInterval);
    gifPlaceholder.style.display = 'block';
    video.style.display = 'none';
    if (loadingText) loadingText.textContent = '视频加载失败，请刷新重试';
}


//图片自动轮播在鼠标悬停时此行暂停
const scrollLines = document.querySelectorAll('.InfiniteScrollLine');

// 启动动画
function startAnimation(line) {
    line.style.animationPlayState = 'running';
}

// 暂停动画
function pauseAnimation(line) {
    line.style.animationPlayState = 'paused';
}

// 鼠标悬停时暂停当前行的动画，离开时恢复
scrollLines.forEach(line => {
    line.addEventListener('mouseenter', () => pauseAnimation(line));
    line.addEventListener('mouseleave', () => startAnimation(line));
});


//盒子浮起效果
function handleScrollAnimation(element) {
    const elementTopPosition = element.getBoundingClientRect().top;
    const elementBottomPosition = element.getBoundingClientRect().bottom;
    const screenPosition = window.innerHeight;

    if (elementTopPosition < screenPosition && elementBottomPosition > screenPosition) {
        element.classList.add('slide-up');
    }
    if (elementTopPosition > screenPosition * 1.2) {
        void element.offsetWidth; // 强制重绘
        element.classList.remove('slide-up');
    }
}
(function () {
    const topPageContainer = document.querySelector('.topPageContainer');
    topPageContainer.classList.add('slide-up');
    // handleScrollAnimation(topPageContainer);
})();
window.addEventListener('scroll', function () {
    const gallery = document.querySelector('.gallery');
    handleScrollAnimation(gallery);
});
window.addEventListener('scroll', function () {
    const features = document.querySelector('.features');
    handleScrollAnimation(features);
});
window.addEventListener('scroll', function () {
    const team = document.querySelector('.team');
    handleScrollAnimation(team);
});
window.addEventListener('scroll', function () {
    const testimonialSliderContainer = document.querySelector('.testimonial-slider-container');
    handleScrollAnimation(testimonialSliderContainer);
});
window.addEventListener('scroll', function () {
    const box = document.querySelector('.Box');
    handleScrollAnimation(box);
});

//接入卡片图片于testimonial-slider
document.addEventListener('DOMContentLoaded', function () {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    let partnersData = [];
    // 1. 获取数据 
    fetch('https://jxk.net.cn/img')
        .then(response => response.json())
        .then(data => {
            if (data.code === 200 && data.data?.length) {
                partnersData = data.data;
                initCarousel();
            }
        })
        .catch(console.error);
    // 2. 初始化轮播 
    function initCarousel() {
        // 渲染卡片
        renderCards(partnersData);
    }
    // 3. 渲染卡片 
    function renderCards(data) {
        testimonialSlider.innerHTML = '';
        data.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = ` 
                <div class="testimonial"> 
                    <img src="${item}" loading="lazy">  
                </div> 
            `;
            testimonialSlider.appendChild(card);
        });
    }
    //  4. 添加鼠标拖拽效果
let isDown = false;
let startX;
let scrollLeft;

testimonialSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    testimonialSlider.classList.add('active');
    startX = e.pageX - testimonialSlider.offsetLeft;
    scrollLeft = testimonialSlider.scrollLeft;
});

testimonialSlider.addEventListener('mouseleave', () => {
    isDown = false;
    testimonialSlider.classList.remove('active');
});

testimonialSlider.addEventListener('mouseup', () => {
    isDown = false;
    testimonialSlider.classList.remove('active');
});

testimonialSlider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialSlider.offsetLeft;
    const walk = x - startX;
    testimonialSlider.scrollLeft = scrollLeft - walk;
});
   
});

//Box内卡片翻页无限循环：
const carouselTrack = document.querySelector('.carousel-track');
const paginationDots = document.querySelector('.pagination-dots');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;
let partnersData = [];
let isTransitioning = false;
let timer = null;

// 1. 获取数据 
fetch('https://jxk.net.cn/content')
    .then(response => response.json())
    .then(data => {
        if (data.code === 200 && data.data?.length) {
            partnersData = data.data;
            initCarousel();
        }
    })
    .catch(console.error);

// 2. 初始化轮播
function initCarousel() {
    // 渲染卡片
    renderboxCards(partnersData);

    // 设置分页点
    renderPagination(partnersData.length);

    // 设置事件监听
    setupEventListeners();

    // 初始状态
    currentIndex = 0;
    updateCarousel();

    // 启动自动轮播
    startAutoPlay();

}

// 3. 渲染卡片
function renderboxCards(data) {
    carouselTrack.innerHTML = '';
    // 总宽度 = (原始数据 + 开头1张 + 结尾1张) * 100%
    carouselTrack.style.width = `${(data.length + 2) * 100}%`;

    // 1. 在开头添加最后一张图片 
    const lastboxCard = createboxCard(data[data.length - 1]);
    carouselTrack.appendChild(lastboxCard);

    // 2. 添加所有原始卡片 
    data.forEach(item => {
        const boxCard = createboxCard(item);
        carouselTrack.appendChild(boxCard);
    });

    // 3. 在末尾添加第一张图片 
    const firstboxCard = createboxCard(data[0]);
    carouselTrack.appendChild(firstboxCard);
}

// 创建卡片函数
function createboxCard(item) {
    const boxCard = document.createElement('div');
    boxCard.className = 'boxCard';
    boxCard.innerHTML = `
            <div class="boxCard-inner">
                <img class="boxCard-image" src="${item.imageUrl}" alt="${item.title}">
                <p class="boxCard-title"><strong>${item.title}</strong><br>${item.content}</p>
            </div>
        `;
    return boxCard;
}

// 4. 渲染分页点
function renderPagination(count) {
    paginationDots.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('li');
        dot.dataset.index = i;
        dot.innerHTML = `<a href="#${i + 1}">${i + 1}</a>`;
        dot.addEventListener('mouseenter', () => {
            goToSlide(i);
        });
        dot.addEventListener('mouseleave', () => {
            clearInterval(timer);
            startAutoPlay();
        });
        paginationDots.appendChild(dot);
    }
}

// 5. 设置事件监听
function setupEventListeners() {
    prevBtn.addEventListener('click', () => {
        clearInterval(timer);
        goToSlide(currentIndex - 1);
        startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(timer);
        goToSlide(currentIndex + 1);
        startAutoPlay();
    });

    // 监听过渡结束
    carouselTrack.addEventListener('transitionend', handleTransitionEnd);
}

// 6. 跳转到指定幻灯片
function goToSlide(index) {
    if (isTransitioning) return;

    isTransitioning = true;
    const boxCardWidth = carouselTrack.children[0].offsetWidth;

    // 边界处理
    if (index < 0) {
        // 1. 先无动画跳转到克隆的最后一张
        carouselTrack.style.transition = 'none';
        carouselTrack.style.transform = `translateX(${boxCardWidth}px)`;

        // 2. 强制重绘
        carouselTrack.offsetHeight; // 触发重绘

        // 3. 然后有动画移动到实际最后一张
        currentIndex = partnersData.length - 1;
        setTimeout(() => {
            carouselTrack.style.transition = 'transform 0.3s ease';
            updateCarousel();
        }, 0);
    }
    else if (index >= partnersData.length) {
        // 同理处理右边界
        carouselTrack.style.transition = 'none';
        carouselTrack.style.transform = `translateX(${(partnersData.length + 1) * boxCardWidth}px)`;
        carouselTrack.offsetHeight; // 触发重绘

        currentIndex = 0;
        setTimeout(() => {
            carouselTrack.style.transition = 'transform 0.3s ease';
            updateCarousel();
        }, 0);
    }
    else {
        currentIndex = index;
        updateCarousel();
    }
}

// 7. 更新轮播状态
function updateCarousel() {
    const boxCardWidth = carouselTrack.children[0].offsetWidth;
    const offset = (currentIndex) * boxCardWidth;
    carouselTrack.style.transform = `translateX(-${offset}px)`;
    carouselTrack.style.transition = 'transform 0.3s ease';

    updateActiveState();
}

// 8. 处理过渡结束
function handleTransitionEnd() {
    isTransitioning = false;
}

// 9. 更新激活状态
function updateActiveState() {
    const boxCards = carouselTrack.children;
    const realIndex = currentIndex % partnersData.length;

    // 更新卡片状态
    Array.from(boxCards).forEach((boxCard, i) => {
        const isActive = i === realIndex + 1; // +1对应开头克隆项
        boxCard.classList.toggle('active', isActive);

        // 更新内容可见性
        const title = boxCard.querySelector('.boxCard-title');
        const img = boxCard.querySelector('.boxCard-image');
        if (title && img) {
            title.style.visibility = isActive ? 'visible' : 'hidden';
            img.style.visibility = isActive ? 'visible' : 'hidden';
        }
    });

    // 更新分页点
    const dots = paginationDots.children;
    Array.from(dots).forEach(dot => {
        dot.classList.toggle('active',
            Number(dot.dataset.index) === realIndex);
    });
}

// 10. 自动轮播控制
function startAutoPlay() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        nextBtn.click();
    }, 3000);
}
