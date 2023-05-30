---
title: '🧑‍🏭 How I Build a Chrome Extension Without Pior Knowledge'
date: '2023-05-29'
---

So I recently had the idea of making a chrome extension that would use chatGPT in some way. While it was intimidating at first that I had no clue of how to make a chrome extension, I knew I could get substantial help from just asking chatGPT. 

To start the project, I simply asked chatGPT for some ideas of extensions that uses chatGPT in some way. Surprisingly, it outputed really good ideas such as:
* Grammar Guru: extension uses ChatGPT's language capabilities to help users improve their grammar and writing skills.
* Knowledge Navigator: extension harnesses the power of ChatGPT to assist users in navigating and exploring vast amounts of information
* Language Learner's Companion: extension utilizes ChatGPT's language proficiency to assist users in their journey of learning a new language
* Research Assistant: extension leverages ChatGPT's knowledge and research capabilities to support users in conducting in-depth research on various topics

While I liked all the above ideas, I felt there already existed good implementations of them, so I settled on: 

* Mindful Browsing: extension utilizes ChatGPT's insights to promote mindful and focused browsing habits. It aims to mitigate distractions and encourage intentional internet usage for improved productivity. 

ChatGPT also provided specific features to implement: 

1. Integrate with time-tracking tools to provide a comprehensive overview of the user's productive and non-productive time.
2. Implement a feature to encourage breaks and suggest mindful activities during those breaks, such as meditation exercises or stretching routines.
3. Offer customization options for blocking or allowing specific websites based on the user's preferences and priorities.
4. Provide user-friendly analytics and progress reports to showcase improvements in browsing habits and productivity.

For the sake of using this project as an intro to creating an extension, I aimed to implement feature one and four. The basic premise would be an extension that collects data on tab titles and the time user spent on it, create a prompt, send it to ChatGPT to ask for a overview of user's time and how the user can improve productivity. 

To start, I asked chatGPT to output me a base of the project, to which it gave me a manifest.json file and a background file that would track time. However, problems soon arise: ChatGPT 3.5 was trained on data up to September 2021 which meant that the technology it knows is also up to September 2021. And when I loaded the development extension, chrome shows me an error that says the manifest.json file is v2 which is outdated and should be upgraded to v3. Luckily, v2 and v3 aren't too different and through some simple google searches, I was able to change it to v3. While not too big of a problem in this case, it shows that when using chatgpt 3.5 to develop, it is important to bear in mind that the code it outputs might be outdated and that newer technologies might be availabele. So being open-minded and not being too overly reliant on chatGPT is important. 

In addition, while time tracker function in background.js is working, it is not working correctly enough. It would only record the website titles when I refresh the page. And because nowadays all the websites are rendered by javascript, when I click a new link wihtin a website, the function wouldn't record any title chagne. However, ChatGPT also has to capabiilty to fix that---I simply told about the code's problem, ChatGPT gave me a revised version which worked exactly as a wanted (I still have to make some small adjustments but those are easy to do):

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

