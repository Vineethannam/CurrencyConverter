const BSAE_URL = "https://cdn.jsdelivr.net/gh/fawahamed0/currency-api@1/latest/currencies"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption)
        if(select.name==="from"&&currCode==="USD"){
            newOption.selected = "selected"
        }
        else if(select.name==="to"&&currCode==="INR"){
            newOption.selected = "selected"
        }
    }
    select.addEventListener("change",(evt)=>{
        updataeFlag(evt.target)
    })
}

const updataeFlag = (element)=>{
    console.log(element);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
} 

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    console.log(amountVal );
    if(amountVal===""||amountVal<1){
        amountVal = 1;
        amount.value="1"
    }
console.log(fromCurr.value,toCurr.value);

    const URL = `${BSAE_URL}/${fromCurr.valuetoLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json()
    let rate = data[toCurr.value.toLowerCase()]
    console.log(rate);
    let finalAmount = amountVal * rate;
    msg.innerText = `${amountVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`
})