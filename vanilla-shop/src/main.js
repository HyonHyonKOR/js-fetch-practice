/*
fetch()로 data.json을 가져오기

 1. fetch(url)을 입력한다
 2.반환된 response를 json() 함수를 통해 JS의 Object로 변환한다
 3. JS의 Object에서 items 배열을 리턴한다.
*/

function loadItems() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

/*
items 배열에 html 넣기

1. ul 클래스 안에 자식 요소인 li를 넣기 위해 쿼리 셀럭터로 element를 불러온다.
2. items는 배열이므로 map을 통해 반복문을 만든다.
3. html에는 items의 value인 각 element의 속성에 접근해 값을 넣는다.
4. join('')을 반드시 넣는다, 안넣으면 각각은 배열이 되므로 , 표시가 html 문서에 생긴다.
   이를 다시 하나의 문자열로 합칠 필요가 있다.
*/
function writeItems(items) {
  const container = document.querySelector('.items');
  container.insertAdjacentHTML(
    'afterbegin',
    items.map((item) => createHTMLString(item)).join('')
  );
}

//data item을 HTML 리스트 아이템으로 만들기
function createHTMLString(item) {
  return `
  <li class="item" data-type="${item.type}" data-color="${item.color}">
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `;
}

//invisble 제거하기
function showAllItems() {
  const itemElements = document.querySelectorAll('.item');
  itemElements.forEach((itemElement) => {
    itemElement.classList.remove('invisible');
  });
}

// item의 key와 value가 일치하는 것만 display:none 클래스를 삭제 , 추가
function updateItems(key, value) {
  const itemElements = document.querySelectorAll('.item');
  itemElements.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}

function onButtonClick(event) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  updateItems(key, value);
  //const filtered = items.filter((item) => item[key] === value);
  //displayItems(filtered);
}

/*이벤트 위임(btn이 아닌 부모인 section에 걸기*/

function setEventListeners() {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');

  logo.addEventListener('click', () => {
    showAllItems();
  });

  buttons.addEventListener('click', (event) => {
    onButtonClick(event);
  });
}

//main
loadItems()
  .then((items) => {
    writeItems(items);
    showAllItems();
    setEventListeners();
  })
  .catch(console.log);
