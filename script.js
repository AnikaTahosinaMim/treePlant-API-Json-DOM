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
    allCatagories.append(btn);
  });
}

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
  trees.forEach((tree) => {
    console.log(tree);
    const newCard = document.createElement("div");
    newCard.className = "card bg-base-100 shadow-sm";
    newCard.innerHTML = `
                            <figure>
                            <img src= "${tree.image}"
                            title="${tree.name}"
                            class = "w-full h-48 object-cover rounded-xl "
                                 />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">${tree.name}</h2>
                            <p class="line-clamp-2">A card component has a figure, a body part, and inside body there are title and actions
                                parts</p>
                            <div class="badge badge-success">${
                              tree.category
                            }</div>
                            <div class="card-actions justify-between items-center">
                                <p class="text-xl font-bold text-[#4ade80]">$ ${
                                  tree.price
                                }</p>
                                <button class="btn  bg-[#4ade80] border-none">Buy Now</button>
                            </div>
                        </div>
    `;
    // treePlantCard.apply(newCard);
    treeContainer.append(newCard);
  });
};
treePlantCard();
lodadCatagories();
