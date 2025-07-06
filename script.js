// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // 数値カウントアップアニメーション
            if (entry.target.classList.contains('achievement-number')) {
                const target = entry.target;
                const endValue = parseInt(target.textContent);
                animateNumber(target, 0, endValue, 2000);
            }
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.querySelectorAll('.achievement-card, .content-card, .theme-card, .plan-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

document.querySelectorAll('.achievement-number').forEach(el => {
    observer.observe(el);
});

// 数値カウントアップアニメーション関数
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('部')) {
            element.textContent = Math.floor(current) + '部突破';
        } else if (element.textContent.includes('個')) {
            element.textContent = Math.floor(current) + '個';
        } else {
            element.textContent = Math.floor(current) + '部以上';
        }
    }, 16);
}

// CSSアニメーションクラス
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .plan-card {
        transition: all 0.3s ease;
    }
    
    .plan-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
    
    .plan-card.featured:hover {
        transform: scale(1.05) translateY(-10px);
    }
`;
document.head.appendChild(style);

// ヘッダーのスクロール効果
let lastScroll = 0;
const header = document.createElement('header');
header.className = 'header';
header.innerHTML = `
    <div class="container">
        <nav class="nav">
            <a href="#" class="logo">AIクリエイターズ・スタジオ</a>
            <div class="nav-links">
                <a href="#plans" class="nav-link">料金プラン</a>
                <a href="#plans" class="btn btn-primary nav-cta">今すぐ参加</a>
            </div>
        </nav>
    </div>
`;

// ヘッダースタイル
const headerStyle = document.createElement('style');
headerStyle.textContent = `
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateY(0);
        transition: transform 0.3s ease;
    }
    
    .header.hidden {
        transform: translateY(-100%);
    }
    
    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
    }
    
    .logo {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--text-dark);
        text-decoration: none;
    }
    
    .nav-links {
        display: flex;
        align-items: center;
        gap: 30px;
    }
    
    .nav-link {
        color: var(--text-dark);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
    }
    
    .nav-link:hover {
        color: var(--primary-color);
    }
    
    .nav-cta {
        padding: 10px 25px;
        font-size: 1rem;
    }
    
    body {
        padding-top: 80px;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            gap: 15px;
        }
        
        .nav-link {
            display: none;
        }
    }
`;

document.head.appendChild(headerStyle);
document.body.insertBefore(header, document.body.firstChild);

// スクロール時のヘッダー表示/非表示
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// パーティクル背景効果（ヒーローセクション）
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
    
    document.querySelector('.hero').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// パーティクルスタイル
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    .particle {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        animation: float-up 5s linear;
    }
    
    @keyframes float-up {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// パーティクル生成
setInterval(createParticle, 300);

// ページ読み込み完了時のアニメーション
window.addEventListener('load', () => {
    document.querySelector('.hero-content').style.opacity = '0';
    document.querySelector('.hero-content').style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.querySelector('.hero-content').style.transition = 'opacity 1s ease, transform 1s ease';
        document.querySelector('.hero-content').style.opacity = '1';
        document.querySelector('.hero-content').style.transform = 'translateY(0)';
    }, 100);
});