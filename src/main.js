function loadItems(){
    return fetch('../data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}

//받은 아이템 업데이트
function displayItems(items){
    const container = document.querySelector('.shopping_box ul');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

//아이템을 html으로 생성
function createHTMLString(item){
    return `
        <li class="item_description"><img src="${item.image}"/> <span>${item.color}</span></li>
    `;
}

function onMenuClick(event, items){
    event.preventDefault();
    const dataset = event.target.dataset
    const key = dataset.key;
    const value = dataset.value;
    if(key == null || value ==null){
        return;
    }

    const filtered = items.filter(item => item[key] === value);
    console.log(filtered);
    displayItems(filtered);
}

function setEventListeners(items){
    const title = document.querySelector('h1');
    const menu = document.querySelector('.shopping_list');

    title.addEventListener('click', () => displayItems(items));
    menu.addEventListener('click', event => onMenuClick(event, items));
}

function init(){
    loadItems()
        .then(items => {
            console.log(items);
            displayItems(items);
            setEventListeners(items);
        })
        .catch(console.log);
}

init();

