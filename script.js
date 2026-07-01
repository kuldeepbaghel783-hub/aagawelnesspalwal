

/* ==========================================================
   AAGA NATUROPATHY & WELLNESS CENTRE
   main.js - Part 1
   ========================================================== */

"use strict";

/* ==========================================================
   SELECTORS
========================================================== */

const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

const loader = document.querySelector(".loader");
const progressBar = document.querySelector(".progress-bar");

/* ==========================================================
   MOBILE MENU
========================================================== */

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        navLinks.classList.toggle("show");

        menuBtn.classList.toggle("active");

    });

}

/* Close menu when clicking a navigation link */

navItems.forEach(item=>{

    item.addEventListener("click",()=>{

        navLinks.classList.remove("show");

        menuBtn.classList.remove("active");

    });

});

/* ==========================================================
   STICKY NAVBAR
========================================================== */

window.addEventListener("scroll",()=>{

    if(window.scrollY>80){

        navbar.classList.add("sticky");

    }

    else{

        navbar.classList.remove("sticky");

    }

});

/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

function activeMenu(){

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;

        const height=section.offsetHeight;

        if(pageYOffset>=top && pageYOffset<top+height){

            current=section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll",activeMenu);

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

const target=document.querySelector(this.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/* ==========================================================
   LOADER
========================================================== */

window.addEventListener("load",()=>{

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},600);

}

});

/* ==========================================================
   PROGRESS BAR
========================================================== */

window.addEventListener("scroll",()=>{

if(progressBar){

const totalHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight;

const progress=(window.pageYOffset/totalHeight)*100;

progressBar.style.width=progress+"%";

}

});

/* ==========================================================
   HERO SLIDER
========================================================== */

const hero=document.querySelector(".hero");

const heroImages=[

"images/hero/hero1.jpg",

"images/hero/hero2.jpg",

"images/hero/hero3.jpg",

"images/hero/hero4.jpg"

];

let currentHero=0;

function heroSlider(){

if(!hero) return;

currentHero++;

if(currentHero>=heroImages.length){

currentHero=0;

}

hero.style.backgroundImage=`url('${heroImages[currentHero]}')`;

}

setInterval(heroSlider,5000);

/* ==========================================================
   COUNTER
========================================================== */

const counters=document.querySelectorAll(".count");

let counterStarted=false;

function runCounter(){

counters.forEach(counter=>{

const target=+counter.dataset.target;

let value=0;

const increment=target/150;

function update(){

value+=increment;

if(value<target){

counter.innerText=Math.ceil(value);

requestAnimationFrame(update);

}

else{

counter.innerText=target+"+";

}

}

update();

});

}

window.addEventListener("scroll",()=>{

const counter=document.querySelector(".counter");

if(!counter) return;

if(window.scrollY>counter.offsetTop-500){

if(!counterStarted){

runCounter();

counterStarted=true;

}

}

});

/* ==========================================================
   FAQ
========================================================== */

const questions=document.querySelectorAll(".faq-question");

questions.forEach(question=>{

question.addEventListener("click",()=>{

const answer=question.nextElementSibling;

document.querySelectorAll(".faq-answer").forEach(item=>{

if(item!==answer){

item.style.display="none";

}

});

if(answer.style.display==="block"){

answer.style.display="none";

}

else{

answer.style.display="block";

}

});

});

/* ==========================================================
   END OF PART 1
========================================================== */


/* ==========================================================
   AAGA NATUROPATHY & WELLNESS CENTRE
   main.js - Part 2
========================================================== */


/* ==========================================================
   GALLERY FILTER
========================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

if(filterButtons.length){

    filterButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            filterButtons.forEach(btn=>btn.classList.remove("active"));

            button.classList.add("active");

            const filter = button.dataset.filter;

            galleryItems.forEach(item=>{

                if(filter==="all"){

                    item.style.display="block";

                }

                else if(item.classList.contains(filter)){

                    item.style.display="block";

                }

                else{

                    item.style.display="none";

                }

            });

        });

    });

}


/* ==========================================================
   GALLERY LIGHTBOX
========================================================== */

const images=document.querySelectorAll(".gallery-item img");

if(images.length){

const lightbox=document.createElement("div");

lightbox.className="lightbox";

document.body.appendChild(lightbox);

images.forEach(image=>{

image.addEventListener("click",()=>{

lightbox.classList.add("show");

lightbox.innerHTML="";

const img=document.createElement("img");

img.src=image.src;

lightbox.appendChild(img);

});

});

lightbox.addEventListener("click",()=>{

lightbox.classList.remove("show");

});

}


/* ==========================================================
   SCROLL REVEAL
========================================================== */

const revealItems=document.querySelectorAll(

".card,.service-card,.why-card,.gallery-item,.package-card,.testimonial-card,.counter-box,.about-image,.about-content,.info-box"

);

function reveal(){

const windowHeight=window.innerHeight;

revealItems.forEach(item=>{

const top=item.getBoundingClientRect().top;

if(top<windowHeight-120){

item.classList.add("active-reveal");

}

});

}

window.addEventListener("scroll",reveal);

reveal();


/* ==========================================================
   BACK TO TOP BUTTON
========================================================== */

const topBtn=document.createElement("button");

topBtn.innerHTML="<i class='fa-solid fa-arrow-up'></i>";

topBtn.className="top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.classList.add("show");

}

else{

topBtn.classList.remove("show");

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});


/* ==========================================================
   FLOATING WHATSAPP BUTTON
========================================================== */

const whatsapp=document.createElement("a");

whatsapp.href="https://wa.me/919729990924";

whatsapp.target="_blank";

whatsapp.className="whatsapp-btn";

whatsapp.innerHTML="<i class='fa-brands fa-whatsapp'></i>";

document.body.appendChild(whatsapp);


/* ==========================================================
   TESTIMONIAL AUTO SLIDER
========================================================== */

const slider=document.querySelector(".testimonial-slider");

if(slider){

let index=0;

const cards=slider.querySelectorAll(".testimonial-card");

function slideTestimonials(){

if(cards.length===0) return;

index++;

if(index>=cards.length){

index=0;

}

slider.scrollTo({

left:cards[index].offsetLeft,

behavior:"smooth"

});

}

setInterval(slideTestimonials,5000);

}


/* ==========================================================
   CURRENT YEAR
========================================================== */

const currentYear=document.querySelector(".year");

if(currentYear){

currentYear.innerHTML=new Date().getFullYear();

}


/* ==========================================================
   CARD HOVER EFFECT
========================================================== */

const cards=document.querySelectorAll(

".card,.service-card,.package-card,.why-card"

);

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.setProperty("--mouse-x",x+"px");

card.style.setProperty("--mouse-y",y+"px");

});

});


/* ==========================================================
   SIMPLE PRELOADER TEXT ANIMATION
========================================================== */

if(loader){

let dots=0;

setInterval(()=>{

dots++;

if(dots>3) dots=0;

loader.innerHTML="AAGA"+".".repeat(dots);

},500);

}


/* ==========================================================
   END OF PART 2
========================================================== */

/* ==========================================================
   AAGA NATUROPATHY & WELLNESS CENTRE
   main.js - Part 3
========================================================== */


/* ==========================================================
   TYPING EFFECT
========================================================== */

const typingElement = document.querySelector(".typing-text");

if (typingElement) {

    const words = [
        "Natural Healing",
        "Hijama Therapy",
        "Deep Tissue Massage",
        "Steam Therapy",
        "Holistic Wellness"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, charIndex++);

            if (charIndex > currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;
            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length)
                    wordIndex = 0;

            }

        }

        setTimeout(typeEffect, deleting ? 40 : 100);

    }

    typeEffect();

}


/* ==========================================================
   PARALLAX HERO
========================================================== */

const heroSection = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (!heroSection) return;

    heroSection.style.backgroundPositionY =
        window.pageYOffset * 0.5 + "px";

});


/* ==========================================================
   IMAGE LAZY LOADING
========================================================== */

const lazyImages = document.querySelectorAll("img");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const img = entry.target;

            img.classList.add("loaded");

            observer.unobserve(img);

        }

    });

});

lazyImages.forEach(img => observer.observe(img));


/* ==========================================================
   SERVICE CARD ANIMATION
========================================================== */

const serviceCards =
document.querySelectorAll(".service-card");

serviceCards.forEach((card, index) => {

    card.style.animationDelay =
        `${index * 0.15}s`;

});


/* ==========================================================
   PAGE FADE IN
========================================================== */

document.body.style.opacity = "0";

window.addEventListener("load", () => {

    document.body.style.transition = "opacity .6s";

    document.body.style.opacity = "1";

});


/* ==========================================================
   SCROLL SPY
========================================================== */

const pageSections =
document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    const scrollY = window.pageYOffset;

    pageSections.forEach(current => {

        const sectionHeight = current.offsetHeight;

        const sectionTop = current.offsetTop - 120;

        const sectionId = current.getAttribute("id");

        const link =
            document.querySelector(
                '.nav-links a[href="#' +
                sectionId +
                '"]'
            );

        if (!link) return;

        if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
        ) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

});


/* ==========================================================
   APPOINTMENT FORM VALIDATION
========================================================== */

const form =
document.querySelector("form");

if (form) {

form.addEventListener("submit", function(e){

const inputs =
form.querySelectorAll("input[required], textarea[required]");

let valid = true;

inputs.forEach(input => {

if(input.value.trim()===""){

valid = false;

input.style.border = "2px solid red";

}

else{

input.style.border = "1px solid #ccc";

}

});

if(!valid){

e.preventDefault();

alert("Please fill all required fields.");

}

});

}


/* ==========================================================
   FLOATING ICON ANIMATION
========================================================== */

const floating =
document.querySelectorAll(".floating");

floating.forEach((item,index)=>{

item.style.animationDelay =
(index*0.4)+"s";

});


/* ==========================================================
   PREVENT IMAGE DRAGGING
========================================================== */

document.querySelectorAll("img").forEach(img=>{

img.setAttribute("draggable","false");

});


/* ==========================================================
   DISABLE RIGHT CLICK (OPTIONAL)
========================================================== */

// Uncomment if required

/*
document.addEventListener("contextmenu",(e)=>{

e.preventDefault();

});
*/


/* ==========================================================
   PERFORMANCE
========================================================== */

window.addEventListener("pageshow",()=>{

console.log("AAGA Website Loaded Successfully");

});


/* ==========================================================
   WEBSITE INITIALIZATION
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

console.log("Welcome to AAGA Naturopathy & Wellness Centre");

});


/* ==========================================================
   END OF PART 3
========================================================== */

/* ==========================================================
   AAGA NATUROPATHY & WELLNESS CENTRE
   main.js - Part 4 (Final)
========================================================== */


/* ==========================================================
   BUTTON RIPPLE EFFECT
========================================================== */

const buttons = document.querySelectorAll(".btn-primary,.btn-secondary");

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";

        ripple.className = "ripple";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/* ==========================================================
   SCROLL TO TOP AFTER PAGE REFRESH
========================================================== */

window.onbeforeunload = function () {

    window.scrollTo(0, 0);

};


/* ==========================================================
   NAVBAR SHADOW
========================================================== */

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 20) {

        navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,.15)";

    }

    else {

        navbar.style.boxShadow = "none";

    }

});


/* ==========================================================
   IMAGE HOVER ZOOM
========================================================== */

document.querySelectorAll(".gallery-item img,.service-card img").forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transform = "scale(1.08)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1)";

    });

});


/* ==========================================================
   CTA BUTTON ANIMATION
========================================================== */

const ctaButtons = document.querySelectorAll(".btn-primary");

ctaButtons.forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform = "translateY(-5px)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "translateY(0px)";

    });

});


/* ==========================================================
   SIMPLE PAGE TRANSITION
========================================================== */

document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        if (
            href &&
            !href.startsWith("#") &&
            !href.startsWith("tel:") &&
            !href.startsWith("mailto:") &&
            !href.startsWith("http")
        ) {

            document.body.classList.add("page-fade");

        }

    });

});


/* ==========================================================
   COPY EMAIL
========================================================== */

const emailLink = document.querySelector(".email-copy");

if (emailLink) {

    emailLink.addEventListener("click", () => {

        navigator.clipboard.writeText("aaga16.inc@gmail.com");

        alert("Email copied!");

    });

}


/* ==========================================================
   COPY PHONE
========================================================== */

const phoneLink = document.querySelector(".phone-copy");

if (phoneLink) {

    phoneLink.addEventListener("click", () => {

        navigator.clipboard.writeText("+919729990924");

        alert("Phone Number copied!");

    });

}


/* ==========================================================
   RANDOM HERO QUOTES
========================================================== */

const quoteElement = document.querySelector(".hero-quote");

if (quoteElement) {

const quotes = [

"Healing Begins With Nature.",

"Your Health Is Our Priority.",

"Natural Care For Every Family.",

"Restore Balance. Restore Life.",

"Healthy Body. Peaceful Mind."

];

let quote = 0;

setInterval(() => {

quote++;

if (quote >= quotes.length) {

quote = 0;

}

quoteElement.innerHTML = quotes[quote];

}, 4000);

}


/* ==========================================================
   AUTO CLOSE MOBILE MENU
========================================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        navLinks.classList.remove("show");

    }

});


/* ==========================================================
   SIMPLE SEARCH
========================================================== */

const searchInput = document.querySelector("#search");

if (searchInput) {

searchInput.addEventListener("keyup", function () {

const value = this.value.toLowerCase();

document.querySelectorAll(".service-card").forEach(card => {

const text = card.innerText.toLowerCase();

card.style.display = text.includes(value)
? "block"
: "none";

});

});

}


/* ==========================================================
   KEYBOARD SHORTCUTS
========================================================== */

document.addEventListener("keydown", e => {

if (e.key === "Home") {

window.scrollTo({

top: 0,

behavior: "smooth"

});

}

});


/* ==========================================================
   WEBSITE INFORMATION
========================================================== */

const website = {

name: "AAGA Naturopathy & Wellness Centre",

phone: "+91 97299 90924",

email: "aaga16.inc@gmail.com",

city: "Palwal",

state: "Haryana",

country: "India"

};

console.table(website);


/* ==========================================================
   INITIALIZE WEBSITE
========================================================== */

function initializeWebsite() {

console.log("===================================");

console.log("AAGA Website Initialized");

console.log("Developer Mode : ON");

console.log("Animations Loaded");

console.log("Responsive Layout Loaded");

console.log("JavaScript Loaded Successfully");

console.log("===================================");

}

initializeWebsite();


/* ==========================================================
   END OF main.js
========================================================== */