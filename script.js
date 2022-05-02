var fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
translateBtn = document.querySelector("button");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if(id == 0 && country_code =="it-IT" ) {
            selected = "selected";
        } else if(id == 1 && country_code == "en-GB") {
            selected = "selected";
        }
        let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});
exchangeIcon.addEventListener("click", () => {
     // exchanging textarea and select tag values
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
    });

// API:  https://mymemory.translated.net/doc/spec.php
translateBtn.addEventListener("click", () => {
    let text = fromText.values;
    translateFrom = selectTag[0].value, //  getting fromSelect tag value
    translateTo = selectTag[1].value;  //  getting toSelect tag value
    // console.log(text, translateFrom, translateTo)
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`
    fetch(apiUrl).then(res => res.json()).then(data=> {
        console.log(data);
        toText.value = data.responseData.translatedText;
    });
})