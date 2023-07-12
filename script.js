const draggable_list = document.getElementById("draggable-list")
const check = document.getElementById("check")

const top10country = [
  "China",
  "India",
  "US",
  "Indonasia",
  "Pakistan",
  "Brazil",
  "Nigeria",
  "Bangladesh",
  "Russia",
  "Mexico",
]

const listItem = []

createList()

function createList() {
  top10country
    .map((a) => {
      return { value: a, sort: Math.random() }
    })
    .sort((a, b) => a.sort - b.sort)
    .map((a) => {
      return a.value
    })
    .forEach((value, index) => {
      const item = document.createElement("li")
      item.setAttribute("data-index", index)
      item.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="country-name">${value}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `
      listItem.push(item)
      draggable_list.appendChild(item)
    })

  addEventListeners()
}

let dragStartIndex

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index")
  console.log(dragStartIndex)
  console.log("dragStart")
}
function dragOver(e) {
  e.preventDefault()
  console.log("dragOver")
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index")
  swapItems(dragStartIndex, dragEndIndex)
  this.classList.remove("over")
  console.log("dragDrop")
}
function dragEnter() {
  this.classList.add("over")
}
function dragLeave() {
  this.classList.remove("over")
}

function swapItems(from, to) {
  const itemOne = listItem[from].querySelector(".draggable")
  const itemTwo = listItem[to].querySelector(".draggable")

  listItem[from].appendChild(itemTwo)
  listItem[to].appendChild(itemOne)
}

function checkOrder() {
    listItem.forEach((listItem, index) => {
      const countryName = listItem.querySelector('.country-name').innerText.trim();
      if (countryName !== top10country[index]) {
        listItem.classList.add('wrong');
      } else {
        listItem.classList.remove('wrong');
        listItem.classList.add('right');
      }
    });
  }

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable")
  const dragListItems = document.querySelectorAll(".draggable-list li")

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart)
  })

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver)
    item.addEventListener("drop", dragDrop)
    item.addEventListener("dragenter", dragEnter)
    item.addEventListener("dragleave", dragLeave)
  })
}

check.addEventListener("click", checkOrder)
