const puppy = require('puppeteer');
const fs = require("fs");
const id = "jaskira24534723";
const pass = "random123";
async function main(){
    let browser = await puppy.launch({
        headless: false,
         defaultViewport: false
        });
       
  let tabs = await browser.pages();
   let tab = tabs[0];
   await tab.goto("https://twitter.com/login",{
    waitUntil: 'networkidle2',
  });
await tab.type(".css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv",id);
  await tab.type('input[name="session[password]"]',pass);
await tab.click(".css-901oao.r-1awozwy.r-jwli3a.r-6koalj.r-18u37iz.r-16y2uox.r-1qd0xha.r-a023e6.r-b88u0q.r-1777fci.r-rjixqe.r-dnmrzs.r-bcqeeo.r-q4m81j.r-qvutc0");
await tab.waitForSelector('a[aria-label="Search and explore"]', {visible: true});
await tab.click('a[aria-label="Search and explore"]');
await tab.waitForSelector('a[href="/explore/tabs/trending"]', {visible: true});
await tab.click('a[href="/explore/tabs/trending"]');
await tab.waitForSelector(".css-901oao.r-18jsvk2.r-1qd0xha.r-a023e6.r-b88u0q.r-rjixqe.r-bcqeeo.r-vmopo1.r-qvutc0", {visible: true});
let tweet = await tab.$$(".css-901oao.r-18jsvk2.r-1qd0xha.r-a023e6.r-b88u0q.r-rjixqe.r-bcqeeo.r-vmopo1.r-qvutc0");
let tweets = [];
    for(let i = 0; i < tweet.length&&i<15; i++) {
        let url = await tab.evaluate(function(ele) {
            return ele.innerText;
        }, tweet[i]);
        tweets.push(url);
    }
    console.log(tweets);
    await tab.waitForSelector('.r-jwli3a.r-4qtqp9.r-yyyyoo.r-1q142lx.r-50lct3.r-dnmrzs.r-bnwqim.r-1plcrui.r-lrvibr.r-1srniue',{visible:true});
    await tab.click('.r-jwli3a.r-4qtqp9.r-yyyyoo.r-1q142lx.r-50lct3.r-dnmrzs.r-bnwqim.r-1plcrui.r-lrvibr.r-1srniue');
    await tab.waitForSelector('.public-DraftStyleDefault-block.public-DraftStyleDefault-ltr',{visible:true});
    await tab.type('.public-DraftStyleDefault-block.public-DraftStyleDefault-ltr',"Top 15 trending tweets in india  ");
    for(let i=0;i<tweets.length;i++){
        await tab.type('.public-DraftStyleDefault-block.public-DraftStyleDefault-ltr',tweets[i]+"/n");
    }
await tab.waitForSelector('div[data-testid="tweetButton"]',{visible:true});
await tab.click('div[data-testid="tweetButton"]');
}


   main();