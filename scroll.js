const container = document.querySelector(".container");
const loadBtn = document.querySelector("button");
const spinner = document.querySelector(".spinner");

//helper function to simulate sleep
const sleep = m => new Promise(r => setTimeout(r, m));

const containerHeight = container.clientHeight;

let people = [];
let top10People = [];
let count = 0;
let loopCount = 10;
let initialLoad = false;
let isBusy = false;


//populate people array with person objects first
for (let i = 1; i <= 100; i++) {
    people.push(new Person(`FirstName ${i}`, `LastName ${i}`, i));
}

//load initial data on first click
loadBtn.onclick = InitialLoad;

//listen for the scroll event to load more content
container.addEventListener("scroll", async () => {
    if (!isBusy) {
        if (container.scrollTop + containerHeight >= container.scrollHeight) {
            if (!(count >= 100)) {
                top10People = [];
                spinner.style.animationName = "spin";
                spinner.textContent = "Loading";
                isBusy = true;
                await sleep(1000); //a custom made promise function to pretend sleep
                LoadMoreContent();
                isBusy = false;
                spinner.style.animationName = "";
                spinner.textContent = "";
            }
        }
    }
});

//helpers
function InitialLoad() {
    if (!initialLoad) {
        initialLoad = true;
        LoadContent();
    }
}
function LoadMoreContent() {
    LoadContent();
}
function LoadContent() {
    for (let i = count; i < loopCount; i++) {
        var div = document.createElement("div");
        div.style.height = (containerHeight / 10) + "px";
        div.style.background = "skyblue";
        div.style.marginBottom = "3px";
        div.style.textAlign = "center";
        div.innerHTML = people[i].firstName + ", " + people[i].lastName;
        container.appendChild(div);
        top10People.push(people[i]);
    }
    count += 10;
    loopCount += 10;
}