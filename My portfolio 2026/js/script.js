/* ========================================
   PORTFOLIO JAVASCRIPT
======================================== */


/* ========================================
   1. ページ読み込み時のアニメーション
======================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    // Heroタイトルを1文字ずつ表示
    const heroTitle = document.querySelector(".hero-title");

    if (heroTitle) {
        splitHeroText(heroTitle);

        requestAnimationFrame(() => {
            heroTitle.classList.add("is-visible");
        });
    }

});


/* ========================================
   2. Heroタイトルを1文字ずつ分割
======================================== */

function splitHeroText(element) {

    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT
    );

    const textNodes = [];
    let node;

    while ((node = walker.nextNode())) {
        textNodes.push(node);
    }

    let charIndex = 0;

    textNodes.forEach((textNode) => {

        const fragment = document.createDocumentFragment();

        const text = textNode.textContent;

        [...text].forEach((char) => {

            const span = document.createElement("span");
            span.className = "hero-char";
            span.textContent = char === " " ? "\u00A0" : char;
            span.style.transitionDelay = `${charIndex * 0.045}s`;

            fragment.appendChild(span);
            charIndex++;

        });

        textNode.parentNode.replaceChild(fragment, textNode);

    });

}


/* ========================================
   3. スクロールアニメーション
======================================== */

const animationTargets = document.querySelectorAll(
    ".section-heading, .about-content, .work-card, .skill-item, .contact-inner"
);


// 初期状態を設定
animationTargets.forEach((element, index) => {

    element.style.opacity = "0";

    // 左右から交互に登場
    const direction = index % 2 === 0 ? -45 : 45;
    element.style.transform = `translateX(${direction}px) translateY(20px)`;

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s cubic-bezier(.2,.8,.2,1)";

});


// Intersection Observer
const animationObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateX(0) translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


// 監視開始
animationTargets.forEach((element) => {

    animationObserver.observe(element);

});


/* ========================================
   3. Worksの表示を少しずつ遅らせる
======================================== */

const workCards = document.querySelectorAll(".work-card");

workCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 0.1}s`;

});


/* ========================================
   4. Skillsの表示を少しずつ遅らせる
======================================== */

const skillItems = document.querySelectorAll(".skill-item");

skillItems.forEach((item, index) => {

    item.style.transitionDelay = `${index * 0.08}s`;

});


/* ========================================
   5. ヘッダーの表示制御
======================================== */

const header = document.querySelector(".header");

let previousScroll = window.scrollY;

window.addEventListener("scroll", () => {

    const currentScroll = window.scrollY;


    // ページ上部では常に表示
    if (currentScroll <= 50) {

        header.style.transform = "translateY(0)";

        previousScroll = currentScroll;

        return;

    }


    // 下にスクロール → ヘッダーを隠す
    if (currentScroll > previousScroll) {

        header.style.transform = "translateY(-100%)";

    }

    // 上にスクロール → ヘッダーを表示
    else {

        header.style.transform = "translateY(0)";

    }


    previousScroll = currentScroll;

});


/* ========================================
   6. ヘッダーのアニメーション
======================================== */

header.style.transition =
    "transform 0.4s ease";


/* ========================================
   7. ナビゲーションのスムーススクロール
======================================== */

const navigationLinks = document.querySelectorAll(
    '.nav-list a[href^="#"]'
);

navigationLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();


        const targetId = link.getAttribute("href");

        const targetElement = document.querySelector(targetId);


        if (!targetElement) {
            return;
        }


        const headerHeight = header.offsetHeight;

        const targetPosition =
            targetElement.offsetTop - headerHeight;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* ========================================
   8. Worksカードのマウス追従
======================================== */

workCards.forEach((card) => {

    const image = card.querySelector(".work-image");


    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();


        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            (y - centerY) / 30;

        const rotateY =
            (centerX - x) / 30;


        image.style.transform =
            `scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        image.style.transform =
            "scale(1) rotateX(0deg) rotateY(0deg)";

    });

});


/* ========================================
   9. ページトップへ戻る
======================================== */

const logo = document.querySelector(".logo");

logo.addEventListener("click", (event) => {

    event.preventDefault();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ========================================
   10. 現在の年を自動表示
======================================= */

const footer = document.querySelector(".footer");

if (footer) {

    const footerText = footer.querySelector("p");

    if (footerText) {

        const currentYear = new Date().getFullYear();

        footerText.textContent =
            `© ${currentYear} YM`;

    }

}
