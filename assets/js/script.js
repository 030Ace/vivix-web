// Main Interactivity Script
document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Logic ---
    const menuBtn = document.querySelector('.hamburger-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (menuBtn && menuOverlay) {
        // Toggle Menu
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            menuOverlay.classList.toggle('open');
            body.classList.toggle('no-scroll');
        });

        // Close menu on navigation
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                menuOverlay.classList.remove('open');
                body.classList.remove('no-scroll');
            });
        });
    }

    // --- FAQ Accordion Logic ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentNode;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Close all other items (Accordion behavior)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');

            // Explicitly handle max-height for CSS transition
            if (!isActive) {
                // Expanding: Set to scrollHeight
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.opacity = "1";
            } else {
                // Collapsing: Set to null (or 0)
                answer.style.maxHeight = null;
                answer.style.opacity = "0";
            }
        });
    });

    // --- Basic GSAP Animations (If ScrollTrigger is available) ---
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // General Fade In Up
        const fadeElements = document.querySelectorAll('.fade-in-up');
        fadeElements.forEach(el => {
            gsap.fromTo(el,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Specific delay handling via classes (delay-1, delay-2, etc.)
        // This is handled by CSS in some setups, but if we want JS control:
        // (Leaving simple for now as per previous robust setups)
    }


    // --- Custom Cursor Logic ---
    const cursor = document.querySelector('.cursor-dot-outline');

    if (cursor) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Using left/top for position to preserve CSS transform(-50%, -50%)
            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;
        });

        // Optional: Hover Effect for Links & Buttons
        const interactiveElements = document.querySelectorAll('a, button, .faq-question, .package-card, .check-icon');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '60px';
                cursor.style.height = '60px';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
            });
        });
    }


    // --- Mouse Follower Glow Logic ---
    const glow = document.querySelector('.mouse-follower-glow');
    if (glow) {
        // Fade in glow on first mouse move
        window.addEventListener('mousemove', () => {
            glow.style.opacity = '1';
        }, { once: true });

        // Upgraded to quickTo for performance
        if (window.gsap) {
            gsap.set(glow, { xPercent: -50, yPercent: -50 });
            const xTo = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3" });
            const yTo = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3" });

            window.addEventListener("mousemove", e => {
                xTo(e.clientX);
                yTo(e.clientY);
            });
        }
    }


    // --- Menu Gallery Population Logic ---
    const colUp = document.querySelector('.col-up');
    const colDown = document.querySelector('.col-down');

    // Ensure menuImages is available (from content.js)
    if (colUp && colDown && typeof menuImages !== 'undefined' && menuImages.length > 0) {

        // Shuffle helper
        const shuffle = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const shuffledImages = shuffle([...menuImages]);

        // Split images into two sets
        const midIndex = Math.ceil(shuffledImages.length / 2);
        const imagesUp = shuffledImages.slice(0, midIndex);
        const imagesDown = shuffledImages.slice(midIndex);

        // Function to create and append items (duplicated for infinite scroll)
        const populateColumn = (col, images) => {
            // Duplicate 4 times to ensure enough height for loop
            for (let i = 0; i < 4; i++) {
                images.forEach(imgData => {
                    const linkEl = document.createElement('a');
                    linkEl.href = imgData.link && imgData.link !== "" ? imgData.link : "#";
                    // Only open in new tab if it's not a hash link
                    linkEl.target = (imgData.link && imgData.link !== "#" && !imgData.link.startsWith('#')) ? "_blank" : "_self";
                    linkEl.classList.add('gallery-link');
                    // Check if it's external link for security
                    if (linkEl.target === "_blank") {
                        linkEl.rel = "noopener noreferrer";
                    }

                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('gallery-item');
                    itemDiv.style.backgroundImage = `url('${imgData.src}')`;

                    linkEl.appendChild(itemDiv);
                    col.appendChild(linkEl);
                });
            }
        };

        populateColumn(colUp, imagesUp);
        populateColumn(colDown, imagesDown);
    }

    // --- About Us Horizontal Scroll Logic (Responsive via matchMedia) ---
    const processWrapper = document.querySelector('.about-process-wrapper');
    const processStrip = document.querySelector('.process-strip');

    if (processWrapper && processStrip && window.gsap && window.ScrollTrigger) {

        ScrollTrigger.matchMedia({
            // Desktop/Tablet only (min-width: 769px)
            "(min-width: 769px)": function () {
                const stripWidth = processStrip.scrollWidth;
                const windowWidth = window.innerWidth;
                const amountToScroll = stripWidth - windowWidth + (windowWidth * 0.2);

                gsap.to(processStrip, {
                    x: -amountToScroll,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".about-process-wrapper",
                        start: "top top",
                        end: "+=3000",
                        pin: ".process-sticky-container",
                        scrub: 1,
                        invalidateOnRefresh: true
                    }
                });
            },

            // Mobile (max-width: 768px) - explicit kill/reset handled by matchMedia automatically
            "(max-width: 768px)": function () {
                // Optional: ensure transform is cleared if switching
                gsap.set(processStrip, { clearProps: "all" });
            }
        });
    }

    // --- Awwwards Visual Upgrades Logic (Parallax, Line, Reveal, Tilt) ---

    // 1. Layer 3: Parallax Typography
    if (document.querySelector('.parallax-typography')) {
        gsap.utils.toArray('.parallax-word').forEach((word, i) => {
            // Randomize direction and speed slightly
            const yMove = (i % 2 === 0 ? -300 : 300);
            const rotMove = (i % 2 === 0 ? 15 : -15);

            gsap.to(word, {
                y: yMove,
                rotation: rotMove,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5 // Smoother scrub
                }
            });
        });
    }

    // 2. Layer 4: Storytelling Line Drawing
    const storyPath = document.querySelector('.story-path');
    if (storyPath) {
        // Simple draw effect linked to scroll
        gsap.fromTo(storyPath,
            { strokeDashoffset: 5000 },
            {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            }
        );
    }

    // 3. Micro-Interaction: Scroll Reveal
    // Add 'reveal-on-scroll' class to elements you want to animate in about.html first? 
    // Or just target common elements if they don't have the class yet.
    // For now, logic expects class 'reveal-on-scroll'.
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
        revealElements.forEach(elem => {
            ScrollTrigger.create({
                trigger: elem,
                start: "top 85%",
                onEnter: () => elem.classList.add('active'),
                once: true // Reveal only once
            });
        });
    }

    // 4. Micro-Interaction: 3D Tilt on Hover
    const tiltContainers = document.querySelectorAll('.tilt-image-container');
    tiltContainers.forEach(container => {
        const image = container.querySelector('.tilt-image'); // Ensure image has this class or targeted correctly
        if (!image) return;

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Limit rotation to +/- 5 deg to be subtle
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        container.addEventListener('mouseleave', () => {
            image.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });



});

/* =========================================
   MAGNETIC BUTTON EFFECT (The Magnetic Void)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const magneticBtn = document.querySelector('.magnetic-btn');
    const btnWrapper = document.querySelector('.magnetic-btn-wrapper');

    if (magneticBtn && btnWrapper) {

        // Config
        const magneticPull = 0.4; // How strongly it follows (0.1 = weak, 1 = direct 1:1)
        const dampening = 0.1;    // Smoothness

        // Mouse Move Listener on the WRAPPER (Area of influence)
        // We can make the wrapper slightly larger via padding in CSS if we want a bigger field,
        // or just listen to the button itself but map the movement relative to center.

        btnWrapper.addEventListener('mousemove', (e) => {
            const rect = btnWrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Distance from center
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            // Apply magnetic pull
            // We move the BUTTON inner element, while the wrapper stays put.
            gsap.to(magneticBtn, {
                x: deltaX * magneticPull,
                y: deltaY * magneticPull,
                duration: 0.5,
                ease: 'power3.out'
            });
        });

        // Reset on Leave
        btnWrapper.addEventListener('mouseleave', () => {
            gsap.to(magneticBtn, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)' // Elastic snap back
            });
        });
    }
});
