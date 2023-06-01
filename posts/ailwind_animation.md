---
title: '💥 Intro to Tailwind CSS Animation'
date: '2023-06-01'
---

Gone are the days of static and dull webpages. With just a few lines of code, you can add motion, transitions, and effects using CSS animations to bring your website to life. 

Why did I choose CSS animations over other such as Javascript? Well, for starters, CSS animations are supported by all modern browsers, making them widely compatible. They also offer excellent performance since animations are handled by the browser's rendering engine, resulting in smooth and fluid motion. 

Additionally, I will use my go-to CSS framework, [Tailwind CSS](https://tailwindcss.com/). It comes with a wide range of pre-built classes, making it a breeze to add or create animations.

Here are some animations that Tailwind already provides: 
1. pulse: <div className="animate-pulse inline-block text-[1.5rem]"> ✨ </div>
```html
<div className="animate-pulse inline-block text-[1.5rem]"> ✨ </div>
```
2. bounce: <div className="animate-bounce inline-block text-[1.5rem]"> 🏀 </div>
```html
<div className="animate-bounce inline-block text-[1.5rem]"> 🏀 </div>
```
<section id="self-introduction">
          <p className="inline">Hi there! </p>
          <div class=" animate-bounce">✨</div>
          <div className="inline-block animate-wiggle text-[1.5rem]"> 👋 </div>
          <p className="inline"> My name is Gavin and I'll be sharing what I've learned about machine learning 🎛️, web dev 🌐, and all things about coding 💻 on this blog site ✍️</p>
        </section>