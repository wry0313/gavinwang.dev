---
title: '🧑‍🏭 How I Build a Chrome Extension Without Pior Knowledge'
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

In addition, while the time tracker function in background.js was working, it was not working correctly enough. It only records the website titles when I refresh the page. And because nowadays all websites are rendered by JavaScript, when I clicked a new link within a website, the function wouldn't record any title change. Luckily, ChatGPT also had the capability to fix that. I simply told it about the code's problem, and ChatGPT gave me a revised version that worked exactly as I wanted (I still have to make some small adjustments, but those are easy to do):

``` Python
let lastTitle = null;
let startTime = null;
const timeTracker = new Map();

function handleActiveTabChange() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    var tabTitle = activeTab.title;
    const currentTime = Date.now();
    if (!lastTitle) {
      lastTitle = tabTitle;
      startTime = currentTime;
    } else {
      const elapsedTime = (currentTime - startTime) / 1000;
      if (timeTracker.has(lastTitle)) {
        const totalTime = timeTracker.get(lastTitle) + elapsedTime;
        timeTracker.set(lastTitle, totalTime);
      } else {
        timeTracker.set(lastTitle, elapsedTime);
      }
      lastTitle = tabTitle;
      startTime = currentTime;
    }
  });
}

// Event listener for tab activation change
chrome.tabs.onActivated.addListener(handleActiveTabChange);

// Event listener for tab title update
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.title) {
    // If the tab title is updated, call the handleActiveTabChange function
    handleActiveTabChange();
  }
});

function printMap(map) {
  map.forEach((value, key) => {
    console.debug(key + ' => ' + value);
  });
}
```
Now that the time tracking is working, the next challenge is connecting the Chrome extension to the ChatGPT server. Having no clue, I turned to ChatGPT itself for advice. In response, ChatGPT suggested a solution that involved having users input their OpenAI access token, which would enable the extension to establish a connection with the OpenAI server. Sadly, this approach is not feasible as it requires money to get an access token, and no one's paying for that just to use my extension.

When I raised the concern that extension users may not have API access tokens, ChatGPT presented me with three alternative options:

1. Server-side Proxy: Set up a server application that acts as an intermediary between the extension and the ChatGPT API. The server handles authentication and API calls on behalf of users.
2. Public API Endpoint: Create a public API endpoint for the extension to directly communicate with the ChatGPT server. Care must be taken to ensure proper implementation and security measures.
3. Partner with OpenAI: Explore a partnership or licensing agreement with OpenAI to offer ChatGPT capabilities directly within the extension, bypassing the need for individual API access tokens.

Option 1 sounds promising; however, once again, I have no idea how to authenticate or make API calls (what is an API?). Option 2 wouldn't work either, as I would have to buy my own access token for the server, and there is a lack of authentication, which can lead to unauthorized usage. So the obvious answer is that I settled on option 3 because my uncle works for OpenAI, and he can arrange a partnership for me.

Anyways to make option 1 work, I tried asking ChatGPT. But it yielded nothing as ChatGPT doesn't know the specifics of authentication and what the OpenAI endpoints are. I knew I had to rely on myself for this part, so I scoured the internet for any info. For a while, I didn't find any breakthrough, and I was stuck making me doubt if I was able to complete this project. I suddenly got the idea to try out another Chrome extension that also uses ChatGPT and see if I can reverse engineer it. So I did and downloaded one called [ChatGPT Writer - Write mail, messages with AI](https://chrome.google.com/webstore/detail/chatgpt-writer-write-mail/pdnenlnelpdomajfejgapbdpmjkfpjkp). Once I opened it, it was able to connect to ChatGPT without any access token, so I knew it had a way of communicating with the server. And I figured out that when I logged out of my OpenAI account, the extension would ask me to log in, so I knew that it was using my account to connect to OpenAI rather than someone else's access token.


So if I could figure out how this extension works, I can apply its code to my own project! I tried using [Chrome extension source viewer](https://chrome.google.com/webstore/detail/chrome-extension-source-v/jifpbeccnghkjeaalbbjmodiffmgedin), which honestly felt kind of unethical. It didn't work, as it outputted a jumble mess of code with no apparent meaning, and the only thing I could decipher out of it was that it used the fetch() function and somehow was able to get my access token to the OpenAI server. Then I thought maybe I can find an extension project that uses ChatGPT, and maybe the creator would be kind enough to open-source it. Luckily, I found one: [ChatGPT for Google](https://chatgpt4google.com/), an extension that shows ChatGPT responses alongside normal search engine results, and their entire project was entirely open source! [wong2/chatgpt-google-extension](https://github.com/wong2/chatgpt-google-extension). 

The next couple of days was me vs the chatgpt for google github repo. I spent painstakingly amout of time reading every single line of code in the src folder. I learned that the basic whole functionality resides in the [chatgpt.ts file](https://github.com/wong2/chatgpt-google-extension/blob/main/src/background/providers/chatgpt.ts). And just like everything about coding, I quickly encountered some problems. 

1. the file was written in .ts which I never learened before. Solution: .ts is very similar to .js so I was able to get the hang of it pretty quick
2. the file uses external libraries such as 'expiry-map' and 'uuid'. and when I install these librarys using npm, import them, and load the extension, the browswer was able to access the libraries which were in the development directory. So I needed a way to bundle the libraries with the extension. Luckily I was able to get everything working after following through a fantastic video on how to set up a chrome extension with a technology called Webpack which allowed me to bundle everything together: [Build a Chrome Extension With React & Webpack](https://www.youtube.com/watch?v=8OCEfOKzpAw)