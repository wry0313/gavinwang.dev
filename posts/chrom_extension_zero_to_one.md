---
title: '🧑‍🏭 How I Build a Chrome Extension With no Pior Knowledge'
date: '2023-05-29'
---

So I recently had the idea of making a Chrome extension that would use ChatGPT in some way. While it was intimidating at first because I had no clue how to make a Chrome extension, I knew I could get substantial help just by asking ChatGPT.

To start the project, I simply asked ChatGPT for some ideas for extensions that use ChatGPT in some way. Surprisingly, it provided really good ideas such as:
* Grammar Guru: extension uses ChatGPT's language capabilities to help users improve their grammar and writing skills.
* Knowledge Navigator: extension harnesses the power of ChatGPT to assist users in navigating and exploring vast amounts of information
* Language Learner's Companion: extension utilizes ChatGPT's language proficiency to assist users in their journey of learning a new language
* Research Assistant: extension leverages ChatGPT's knowledge and research capabilities to support users in conducting in-depth research on various topics

While I liked all of the above ideas, I felt that there already existed good implementations of them, so I settled on:

* Mindful Browsing: extension utilizes ChatGPT's insights to promote mindful and focused browsing habits. It aims to mitigate distractions and encourage intentional internet usage for improved productivity. 

ChatGPT also provided specific features to implement:

1. Integrate with time-tracking tools to provide a comprehensive overview of the user's productive and non-productive time.
2. Implement a feature to encourage breaks and suggest mindful activities during those breaks, such as meditation exercises or stretching routines.
3. Offer customization options for blocking or allowing specific websites based on the user's preferences and priorities.
4. Provide user-friendly analytics and progress reports to showcase improvements in browsing habits and productivity.

For the sake of using this project as an intro to creating an extension, I aimed to implement features one and four. The basic premise would be an extension that collects data on tab titles and the time the user spent on them, creates a prompt, sends it to ChatGPT to ask for an overview of the user's time and how they can improve productivity.To start, I asked ChatGPT to output a base for the project, and it gave me a manifest.json file and a background file that would track time. However, problems soon arose: ChatGPT 3.5 was trained on data up to September 2021, which meant that the technology it knows is also up to September 2021. When I loaded the development extension, Chrome showed me an error that said the manifest.json file is v2, which is outdated and should be upgraded to v3. Luckily, v2 and v3 aren't too different, and through some simple Google searches, I was able to change it to v3. While not too big of a problem in this case, it shows that when using ChatGPT 3.5 for development, it is important to bear in mind that the code it outputs might be outdated, and newer technologies might be available. So being open-minded and not overly reliant on ChatGPT is important.

To start, I asked chatGPT to output me a base of the project, to which it gave me a manifest.json file and a background file that would track time. However, problems soon arise: ChatGPT 3.5 was trained on data up to September 2021 which meant that the technology it knows is also up to September 2021. And when I loaded the development extension, chrome shows me an error that says the manifest.json file was v2 which was outdated and should be upgraded to v3. Luckily, v2 and v3 aren't too different and through some simple google searches, I was able to change it to v3. While not too big of a problem in this case, it shows that when using chatgpt 3.5 to develop, it is important to bear in mind that the code it outputs might be outdated and that newer technologies might be availabele. So being open-minded and not being too overly reliant on chatGPT is important. 

In addition, while the time tracker function in background.js was working, it was not working correctly enough. It only records the website titles when I refresh the page. And because nowadays all websites are rendered by JavaScript, when I clicked a new link within a website, the function wouldn't record any title change. Luckily, ChatGPT also had the capability to fix that. I simply told it about the code's problem, and ChatGPT gave me a revised version that worked exactly as I wanted (I still have to make some small adjustments, but those are easy to do). It basically used a map called timeTracker which maps a website title key to its value which is time spent. And whenever the user gets different tab title, the function will update timeTracker.

I didn't realize until much later, after I had already published the extension on the web store, that I also have to save the time tracker map into Chrome's local storage. Otherwise, it will reset every couple minutes.

Now that the time tracking is working, the next challenge is connecting the Chrome extension to the ChatGPT server. Having no clue, I turned to ChatGPT itself for advice. In response, ChatGPT suggested a solution that involves having users input their OpenAI access token. This would enable the extension to establish a connection with the OpenAI server. Sadly, this approach is not feasible as it requires money to get an access token, and no one is willing to pay for that just to use my extension.

When I raised the concern that extension users may not have API access tokens, ChatGPT presented me with three alternative options:

1. Server-side Proxy: Set up a server application that acts as an intermediary between the extension and the ChatGPT API. The server handles authentication and API calls on behalf of users.
2. Public API Endpoint: Create a public API endpoint for the extension to directly communicate with the ChatGPT server. Care must be taken to ensure proper implementation and security measures.
3. Partner with OpenAI: Explore a partnership or licensing agreement with OpenAI to offer ChatGPT capabilities directly within the extension, bypassing the need for individual API access tokens.

Option 1 sounded promising. However, I had no idea how to authenticate or make API calls. Option 2 was also not feasible because I would have to purchase my own access token for the server, and there would be a lack of authentication, which could lead to unauthorized usage. So the obvious choice for me was option 3, as my uncle works for OpenAI, and he can arrange a partnership for me.

To make option 1 work, I tried asking ChatGPT for help. Unfortunately, ChatGPT doesn't have the specific knowledge about authentication and the OpenAI endpoints. So I had to rely on myself and search the internet for information. For a while, I couldn't find any breakthrough, and I felt stuck, which made me doubt if I could complete this project. Then I had the idea to try out another Chrome extension that also uses ChatGPT and see if I could reverse engineer it. I downloaded an extension called [ChatGPT Writer - Write mail, messages with AI](https://chrome.google.com/webstore/detail/chatgpt-writer-write-mail/pdnenlnelpdomajfejgapbdpmjkfpjkp). When I opened it, I noticed that it was able to connect to ChatGPT without requiring an access token. This gave me hope that it had a way of communicating with the server. I also realized that when I logged out of my OpenAI account, the extension prompted me to log in, indicating that it was using my account to connect to OpenAI instead of relying on someone else's access token.


So if I could figure out how this extension works, I could apply its code to my own project! I tried using[Chrome extension source viewer](https://chrome.google.com/webstore/detail/chrome-extension-source-v/jifpbeccnghkjeaalbbjmodiffmgedin), but it didn't yield meaningful results. The output was a jumbled mess of code, and the only thing I could understand was that it used the fetch() function and somehow obtained my access token for the OpenAI server. Then I thought maybe I could find another extension project that uses ChatGPT, and perhaps the creator would be kind enough to open-source it. Luckily, I found one called [ChatGPT for Google](https://chatgpt4google.com/), an extension that displays ChatGPT responses alongside regular search engine results. The entire project was open source, which I found it on GitHub at [wong2/chatgpt-google-extension](https://github.com/wong2/chatgpt-google-extension) :)

The next couple of days was a grind. I devoted a considerable amount of time to meticulously reading every line of code in the "src" folder. I discovered that the majority of the ChatGPT communication functionality is located in the  [chatgpt.ts file](https://github.com/wong2/chatgpt-google-extension/blob/main/src/background/providers/chatgpt.ts) file. However, as is often the case with coding, I soon encountered several problems.

1. The file was written in .ts, a language I hadn't learned before. Fortunately, .ts is quite similar to .js, so I was able to grasp it quickly.

2. The file relied on external libraries like ['expiry-map'](https://www.npmjs.com/package/expiry-map) and ['uuid'](https://www.npmjs.com/package/uuid). However, when I installed these libraries using npm, imported them in the code, and loaded the extension, the browser couldn't access the libraries, as they were in the development directory. I needed a way to bundle the libraries with the extension. Fortunately, I found an excellent video tutorial that guided me through setting up a chrome extension with Webpack. This technology allowed me to bundle everything together. You can check out the tutorial here: [Build a Chrome Extension With React & Webpack](https://www.youtube.com/watch?v=8OCEfOKzpAw)

3. The file imported numerous other files from the project, which meant that to utilize the ChatGPT functionality, I also had to manually copy and paste all those other files. That's precisely what I did to ensure everything worked seamlessly.

After a few days of work, I was able to successfully implement the ChatGPT communication feature into my developing extension. The basic logic involves making HTTP requests to the ChatGPT web version API, which unfortunately doesn't have public documentation. To obtain the browser's access token for ChatGPT, I retrieve it through the link https://chat.openai.com/api/auth/session and store it in a cache. This access token is then used to communicate with ChatGPT's web server.

It's important to note that ChatGPT utilizes Server-Sent Events (SSE) to transmit information. SSE allows the server to push data to the client over a single HTTP connection, eliminating the need for constant connections. This approach is commonly used for real-time updates, such as stock price or sports score updates. In the case of ChatGPT, SSE is utilized to send events for each word generated by ChatGPT. This enables the user to observe the construction of the answer in real-time.
![](/article/sse.gif)

Now that I can establish connections to the ChatGPT server, it's time to consider a prompt that aligns with the intended functionality of my extension. After some trial and error, I settled on the following prompt:

"In the perspective of a mentor, help the user understand their focus and accomplishments for the day. Please limit your response to 100-200 words. Additionally, provide suggestions for improvement and assign a productivity rating out of 100."

After this prompt, I would concatenate a string representation of the user's website usage. The resulting output would resemble the following:

> Today, your focus seems to be on web development, particularly exploring topics related to Chrome extensions, CSS, and React. You spent time on Stack Overflow, seeking assistance on adding a GIF to a Markdown file. It's great that you're utilizing online resources to find solutions to specific challenges. You also engaged with various learning materials, including YouTube tutorials on building Chrome extensions and GPT from scratch. Additionally, you visited developer websites, explored web developer portfolios for inspiration, and searched for random number generators and Tailwind CSS-related topics. In terms of personal projects, you spent time on your own website, gavinwang.dev, and worked on a Dog vs. Cat Classifier. You also visited your GitHub repositories and explored how to build a random quote generator app with React and Tailwind CSS. It seems you also took some time to read articles on Medium, particularly from authors such as Sracha and Gavin Wang. To improve your productivity, I suggest setting specific goals for your web development projects and allocating time for focused coding sessions. Consider documenting your progress and learnings in a personal journal or blog. Additionally, try to actively engage with coding communities and seek feedback on your projects. Keep up the good work! Productivity rating: 85/100.

With the background script in place, it was time to implement the user interface using React. Prior to this project, my knowledge of React was virtually nonexistent, except for a Tic Tac Toe React demo I created two years ago (which I had since forgotten). The most challenging part for me was setting up the React environment. However, with the help of the video tutorial mentioned earlier [Build a Chrome Extension With React & Webpack](https://www.youtube.com/watch?v=8OCEfOKzpAw), I was able to overcome this hurdle.

To learn React, I watched YouTube tutorials on React hooks such as useState and useEffect, which were essentially all I needed for my basic ChatGPT extension. One of the helpful resources I utilized was [a YouTube video on React hooks](https://www.youtube.com/watch?v=O6P86uwfdR0).

Lastly, I wanted my extension to have an appealing visual design, so I turned to Tailwind CSS. I had previously used Tailwind CSS for my own personal website and fell in love with its ease of use. For my extension, I opted for a cyan-to-blue gradient theme, and I'm quite pleased with the final result.

![Mentor GPT showcase](/article/GPT_Mentor_Showcase.png)

The process of publishing the extension turned out to be surprisingly easy, thanks to Google's Chrome Web Store developer dashboard. With its help, I was able to publish my extension within just one day. One important aspect I learned about during the publishing process was the requirement of creating a privacy policy for the product. You can find the privacy policy for my extension at [Mentor GPT Privacy Policy Wiki](https://github.com/wry0313/GPT_mentor_extension/wiki/Privacy-Policy).

Now, if you've actually managed to read through all of this, you must be truly dedicated! Thank you so much. I would greatly appreciate it if you could check out my extension on the Chrome Web Store and, if you find it useful, leave a positive review at: [GPT Mentor](https://chrome.google.com/webstore/detail/gpt-mentor/bmlbikjekoeckeopfnokkafbohkdfggm).

All in all, I was able to create this extension with no prior knowledge, thanks to the assistance of ChatGPT, an open-sourced GitHub repository, and countless Google searches. It was a fun and rewarding process, and the key takeaway for me was that the best way to learn coding is by taking on tangible real-world projects. In my case, taking on this project allowed me to learn React.js, Webpack, typescript, fetching and connecting to API's using promise and async functions, Tailwind CSS, and project structure setup all in one go. And it's incredibly motivating to witness your extension evolve from a budding prototype into a fully functional finished product!