let
  quoteContent = document.querySelector(".quote-content p"),
  quoteAuthor = document.querySelector(".quote-content span"),
  quoteBtn = document.querySelector(".quote-btn"),
  readBtn = document.querySelector(".read"),
  twitterBtn = document.querySelector(".twitter"),
  copyBtn = document.querySelector(".copy");


function quoteG() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading...";
  fetch("http://www.api.quotable.io/random").then(res => res.json()).then(result => {
    quoteContent.innerText = result.content;
    quoteAuthor.innerText = `- ${result.author}`;
    quoteBtn.classList.remove("loading");
    quoteBtn.innerText = "New Quote";
  })
}

readBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance();
  
  utterance.rate = .9;
  utterance.lang = 'es';
  utterance.text = `${quoteContent.innerText}`;
  readBtn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;
  readBtn.style.background = "#717ADA";
  readBtn.style.color = "#eee";
  utterance.addEventListener("end",()=>{
    readBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
    readBtn.style.background = "#eee";
    readBtn.style.color = "#717ADA";
  });
  window.speechSynthesis.speak(utterance);
});
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteContent.innerText);
  copyBtn.style.background = "#717ADA";
  copyBtn.style.color = "#eee";
  setTimeout(()=>{
    copyBtn.style.background = "#eee";
    copyBtn.style.color = "#717ADA";
  },800);
});
twitterBtn.addEventListener("click",()=>{
  let urlTwitter = `https://twitter.com/intent/tweet?url=${quoteContent.innerText} ${quoteAuthor.innerText}`;
  window.open(urlTwitter,"_blank");
});

quoteBtn.addEventListener("click", quoteG);
