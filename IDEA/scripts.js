// 全局模糊效果，加平滑过渡
document.addEventListener('DOMContentLoaded',  function() {    
    document.querySelectorAll('.nav-item:not(#online-store)').forEach(item  => {
        item.addEventListener('mouseenter',  () => {
            document.querySelector('main').classList.add('blur'); 
        });
        
        item.addEventListener('mouseleave',  () => {
            document.querySelector('main').classList.remove('blur'); 
        });
    });  
});

// document.addEventListener('DOMContentLoaded', function () {
//     const menuToggle = document.querySelector('.menu-toggle');
//     const mainNav = document.querySelector('.main-nav');

//     menuToggle.addEventListener('click', function () {
//         mainNav.classList.toggle('active');
//     });
// });


// 修复后的滚动监听逻辑 
window.addEventListener('scroll', () => {
    const mainNav = document.querySelector('#fix-part'); 
    const scrollPosition = window.scrollY; 
    const navHeight = document.querySelector('.secondary-nav').offsetHeight; 
    
    if (scrollPosition > navHeight) {
        mainNav.classList.add('fixed'); 
    } else {
        mainNav.classList.remove('fixed'); 
    }
});

// 动态渐变效果
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.feature-btn'); // 选择所有 .feature-btn 按钮

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top } = button.getBoundingClientRect();
            const x = clientX - left;
            const y = clientY - top;
            const intensity = Math.min(window.innerWidth * 0.2, 600);

            requestAnimationFrame(() => {
                button.style.background = `
                    radial-gradient(
                        ${intensity}px circle at ${x}px ${y}px,
                        rgba(48, 127, 255, 0.8) 0%,
                        rgba(102, 164, 255, 0.4) 30%,
                        rgba(230, 242, 255, 0.3) 60%,
                        transparent 100%
                    ),
                    white
                `;
            });
        });

        button.addEventListener('mouseleave', () => {
            button.style.background = 'white';
        });
    });
});

// 图片轮播按钮的实现
document.addEventListener('DOMContentLoaded',  function() {
    const slider = document.getElementById('testimonialSlider'); 
    const prevBtn = document.getElementById('prevBtn'); 
    const nextBtn = document.getElementById('nextBtn'); 
    const testimonials = document.querySelectorAll('.testimonial'); 
    
    // 计算每屏显示的项目数量 
    function getVisibleItemsCount() {
        const sliderWidth = slider.offsetWidth; 
        const itemWidth = testimonials[0].offsetWidth + parseInt(getComputedStyle(slider).gap);
        return Math.floor(sliderWidth  / itemWidth) || 1;
    }
    
    // 计算滚动距离 
    function getScrollAmount() {
        const itemWidth = testimonials[0].offsetWidth + parseInt(getComputedStyle(slider).gap);
        return itemWidth * getVisibleItemsCount();
    }
    
    // 更新按钮状态 
    function updateButtons() {
        prevBtn.disabled  = slider.scrollLeft  <= 0;
        nextBtn.disabled  = slider.scrollLeft  + slider.offsetWidth  >= slider.scrollWidth  - 1;
    }
    
    // 响应式调整 
    let resizeTimer;
    window.addEventListener('resize',  function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            updateButtons();
        }, 250);
    });
    
    // 上一页 
    prevBtn.addEventListener('click',  function() {
        slider.scrollBy({ 
            left: -getScrollAmount(),
            behavior: 'smooth'
        });
    });
    
    // 下一页 
    nextBtn.addEventListener('click',  function() {
        slider.scrollBy({ 
            left: getScrollAmount(),
            behavior: 'smooth'
        });
    });
    
    // 滚动事件 
    slider.addEventListener('scroll',  updateButtons);
    
    // 初始化 
    updateButtons();
});