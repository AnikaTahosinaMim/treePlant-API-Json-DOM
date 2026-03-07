// loading

const loadingscan = document.getElementById("loadingscan");

const allCatagories = document.getElementById("catagory-container");
function showLoading() {
  loadingscan.classList.remove("hidden");
  loadingscan.classList.add("flex");
}
function hiddenLoading() {
  loadingscan.classList.add("hidden");
  loadingscan.classList.remove("flex");
}

async function lodadCatagories() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  // console.log(data);
  data.categories.forEach((item) => {
    // console.log(item);
    const btn = document.createElement("button");
    btn.className = "btn btn-outline w-full";
    btn.innerHTML = item.category_name;
    // select id
    btn.onclick = () => selectCatagory(item.id, btn);
    allCatagories.append(btn);
  });
}

// select id and functionality

async function selectCatagory(categoriesId, btn) {
  console.log(categoriesId, btn);
  showLoading();
  const allBtn = document.querySelectorAll(
    "#catagory-container button ,#allTreeBtn",
  );
  allBtn.forEach((Btn) => {
    Btn.classList.add("btn-outline");
    Btn.classList.remove("btn-primary");
  });
  btn.classList.add("btn-primary");
  btn.classList.remove("btn-outline");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoriesId}`,
  );
  const data = await res.json();
  console.log(data);
  displayTreeCard(data.plants);
  hiddenLoading();
}

// for alltressBnt
const allTress = document.getElementById("allTreeBtn");
allTress.addEventListener("click", () => {
  const allBtn = document.querySelectorAll(
    "#catagory-container button ,#allTreeBtn",
  );
  allBtn.forEach((Btn) => {
    Btn.classList.add("btn-outline");
    Btn.classList.remove("btn-primary");
  });
  allTress.classList.add("btn-primary");
  allTress.classList.remove("btn-outline");
  treePlantCard();
});

const treeContainer = document.getElementById("treeContainer");
async function treePlantCard() {
  showLoading();
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  hiddenLoading();
  displayTreeCard(data.plants);
}
// tree card display
const displayTreeCard = (trees) => {
  console.log(trees);
  treeContainer.innerHTML = "";
  trees.forEach((tree) => {
    // console.log(tree);
    const newCard = document.createElement("div");
    newCard.className = "card bg-base-100 shadow-sm";
    newCard.innerHTML = `
                            <figure>
                            <img onclick = openShowModal(${tree.id}) src= "${tree.image}"
                            title="${tree.name}"
                            class = "w-full h-48 object-cover rounded-xl "
                                 />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title curson-pointer hover:text-green-600" onclick = openShowModal(${tree.id}) >${tree.name}</h2>
                            <p class="line-clamp-2">A card component has a figure, a body part, and inside body there are title and actions
                                parts</p>
                            <div class="badge badge-success">${
                              tree.category
                            }</div>
                            <div class="card-actions justify-between items-center">
                                <p class="text-xl font-bold text-[#4ade80]">$ ${
                                  tree.price
                                }</p>
                                <button onclick = "addtoCard(${tree.id},'${tree.name}',${tree.price})" class="btn  bg-[#4ade80] border-none">Buy Now</button>
                            </div>
                        </div>
    `;
    // treePlantCard.apply(newCard);
    treeContainer.append(newCard);
  });
};

// show modal
const showModal = document.getElementById("tree-details-modal");
const modal = document.getElementById("tree-details-modal");
const details = document.getElementById("modalCategory");
const price = document.getElementById("modalPrice");
const img = document.getElementById("modalImage");
const title = document.getElementById("modalTitle");
let card = [];
const cardContainer = document.getElementById("card-container");
const modalDescription = document.getElementById("modalDescription");
const totalPrice = document.getElementById("totalPrice");
const emptyCard = document.getElementById("empty");
async function openShowModal(treeId) {
  console.log(treeId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/plant/${treeId}`,
  );
  const data = await res.json();
  const plantsDetails = data.plants;
  console.log(plantsDetails);
  modalDescription.textContent = plantsDetails.description;
  img.src = plantsDetails.image;
  price.textContent = plantsDetails.price;
  title.textContent = plantsDetails.name;
  details.textContent = plantsDetails.category;
  showModal.showModal();
}

// count card
function addtoCard(id, name, price) {
  console.log(id, name, price);

  const exexting = card.find((item) => item.id === id);
  if (exexting) {
    exexting.quantity++;
  } else {
    card.push({
      id,
      name,
      price,
      quantity: 1,
    });
  }

  updateCard();
}
function updateCard() {
  cardContainer.innerHTML = "";
  if (card.length === 0) {
    emptyCard.classList.remove("hidden");
    return
  }
  emptyCard.classList.add("hidden");
  let total = 0;
  console.log(card);
  card.forEach((item) => {
    total += item.price * item.quantity;
    const creatNew = document.createElement("div");
    creatNew.innerHTML = `
                        <div class="shadow-2xl mb-5 bg-white card card-body">
                        <div class="flex justify-between items-center">
                            <div class="space-y-3">
                                <h2 class="font-bold text-2xl">${item.name}</h2>
                                <div>
                                    <p class="font-extrabold">$${item.price} X ${item.quantity}</p>
                                </div>
                            </div>

                            <button onclick = "removeFromCard(${item.id})" class="btn btn-ghost font-bold">X</button>
                           
                        </div>
                         <p font-bold text-2xl>$${item.price * item.quantity}</p>
                        
                    </div>

                   
    `;
    cardContainer.append(creatNew);
  });
  totalPrice.innerText = total;
}

// removeX
function removeFromCard(id) {
  console.log(id);
  const updateElement = card.filter((item) => item.id != id);
  card = updateElement;
  updateCard();
}

// displayTreeCard()
treePlantCard();
lodadCatagories();
