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
function displayItems(items) {
  const container = document.querySelector('.items');
  container.insertAdjacentHTML(
    'afterbegin',
    items.map((item) => createHTMLString(item)).join('')
  );
}

function createHTMLString(item) {
  return `
  <li class="item">
        <img src=${item.image} alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender},${item.size}</span>
  </li>
  `;
}

//main
loadItems()
  .then((items) => {
    displayItems(items);
    // setEventListeners(items);
  })
  .catch(console.log);
