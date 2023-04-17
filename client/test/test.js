// 몽고DB에서 데이터 가져올 때 사용할 로직

const jsonList = document.getElementById("json_list");
const button = document.getElementById("btn");
const btn = button.addEventListener("click", jsonHandler);

async function jsonHandler() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/ability/battle-armor"
  );

  const data = await response.json();
  console.log(data);

  const items = data["pokemon"];
  console.log("items : ", items);

  items.forEach((i) => {
    const li = document.createElement("li");
    li.textContent = `name: ${i["pokemon"]["name"]}, url: ${i["pokemon"]["url"]}`;
    jsonList.appendChild(li);
  });
}
