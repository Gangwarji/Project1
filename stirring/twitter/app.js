const selectableTextArea = document.querySelectorAll(".selectable-text-area");
const twitterShareBtn = document.querySelector("#twitter-share-btn");

selectableTextArea.forEach(elem => {
  elem.addEventListener("mouseup", selectableTextAreaMouseUp);
});

twitterShareBtn.addEventListener("click", twitterShareBtnClick);

document.addEventListener("mousedown", documentMouseDown);

function selectableTextAreaMouseUp(event) {
  setTimeout(() => { // In order to avoid some weird behavior...
    const selectedText = window.getSelection().toString().trim();
    if(selectedText.length) { 
      const x = event.pageX;
      const y = event.pageY;

      if(document.activeElement !== twitterShareBtn) {
        twitterShareBtn.style.left = `${x - 20}px`;
        twitterShareBtn.style.top = `${y - 50}px`;
        twitterShareBtn.style.display = "block";
        twitterShareBtn.classList.add("btnEntrance");
      }
      else {
        twitterShareBtn.style.left = `${x - 20}px`;
        twitterShareBtn.style.top = `${y - 20}px`;
      }
    }    
  }, 0);
}

function documentMouseDown(event) {
  if(event.target.id!=="twitter-share-btn" && getComputedStyle(twitterShareBtn).display==="block") {
    twitterShareBtn.style.display = "none";
    twitterShareBtn.classList.remove("btnEntrance");
    window.getSelection().empty();
  }
}

function twitterShareBtnClick(event) {
  const selectedText = window.getSelection().toString().trim();
  if(selectedText.length) {
    // General Twitter Share URL: https://twitter.com/intent/tweet?text={title}&url={url}&hashtags={hash_tags}&via={user_id}
    const twitterShareUrl = "https://twitter.com/intent/tweet";
    const text = `${encodeURIComponent(selectedText)}`;
    const currentUrl = encodeURIComponent(window.location.href);
    const hashtags = "helloworld";
    const via = "nishantgangwar";
    window.open(`${twitterShareUrl}?text="${text}"&url=${currentUrl}&hashtags=${hashtags}&via=${via}`);

  }
}