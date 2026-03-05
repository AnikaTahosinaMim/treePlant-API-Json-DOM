// const allTreeBtn = () => {
//   fetch("https://openapi.programming-hero.com/api/categories")
//     .then((res) => res.json())
//     .then((data) => displayTreeAll(data.categories));
// };
// const displayTreeAll = (trees) => {
//   const allCatagories = document.getElementById("catagory-container");
//   trees.forEach((tree) => {
//     console.log(tree);
//     const newTreeBtn = document.createElement("button");
//     newTreeBtn.innerHTML = "name";
//     newTreeBtn.className = "btn w-full"
//     allCatagories.append(newTreeBtn);
//   });
// };
// allTreeBtn();

const allCatagories = document.getElementById("catagory-container");
async function lodadCatagories() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  console.log(data);
  data.categories.forEach((item) => {
    console.log(item);
    const btn = document.createElement("button");
    btn.className = "btn btn-outline w-full";
    btn.innerHTML = item.category_name
    allCatagories.append(btn);
  });
}
lodadCatagories();
