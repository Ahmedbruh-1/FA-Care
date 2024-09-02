chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: "http://localhost:4000/api/v1/user/login" });
  });
  