// lucide.dev icons
if (lucide) {
  lucide.createIcons();
}

//region Categorization setup
let categories = [];
const categorized = {};

let canChangeIndex = true;
let currentContentIndex = 0;
let currentContentName = undefined;
let currentContentCategory = undefined;

//region Helper variables
const dataJsonPath = "files/data.json";
const categoriesJsonPath = "categories.json";

const buttonsContainer = document.getElementById("buttons");
const fullscreenImage = document.getElementById("fullscreen");
const imageElement = document.getElementById("image");
const imageInformation = document.getElementById("info");

const buttonPrevious = document.getElementById("previous");
const buttonNext = document.getElementById("next");

let files = [];

//region Helper functions
function createStandardButton(text, click, style) {
  const button = document.createElement("button");

  if (style) button.classList.add(style);

  button.textContent = text;
  button.onclick = () => { click(); };

  buttonsContainer.appendChild(button);
}

async function fetchJsonData(path) {
  const response = await fetch(path);
  if (!response.ok) throw `${response.status} (${response.statusText})`;
  return await response.json();
}

async function downloadCategorizedZip() {
  const response = await fetch("/zip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categorized }),
  });

  if (!response.ok) return;
  const blob = await response.blob();

  const url = URL.createObjectURL(blob);
  const downloader = document.createElement("a");
  downloader.href = url;
  downloader.download = "Categorized-Content.zip";
  downloader.click();
}

function getContentCategoryPair(content) {
  const [namespace] = Object.entries(categorized).find(([, array]) => {
    return array.includes(content);
  }) ?? [undefined];

  if (namespace === undefined) return [undefined, undefined];
  return categories.find(([, thisNamespace]) => {
    return thisNamespace === namespace;
  });
}

function setContentCategory(content, category) {
  const namespace = currentContentCategory;

  if (namespace !== undefined && namespace !== category) {
    const array = categorized[namespace];
    const index = array.indexOf(content);
    array.splice(index, 1);
  } else if (namespace === category) {
    return;
  }

  categorized[category].push(content);
}

function exposeCurrentImage(increment = 0) {
  if (!canChangeIndex) return;

  currentContentIndex += increment;
  canChangeIndex = false;

  buttonPrevious.disabled = currentContentIndex <= 0;
  buttonNext.disabled = currentContentIndex >= files.length - 1;

  if (currentContentIndex >= files.length || currentContentIndex < 0) {
    throw '"currentContentIndex" is out of range.';
  }
  currentContentName = files[currentContentIndex];

  const imageUrl = `files/${currentContentName}`;
  imageElement.src = imageUrl;
  fullscreenImage.src = imageUrl;

  const index = `${currentContentIndex + 1}/${files.length}`;
  const [name, namespace] = getContentCategoryPair(currentContentName);
  currentContentCategory = namespace;
  imageInformation.textContent = `${index} — ${name ?? "Uncategorized"}`;
}

function toggleFullscreenImage() {
  const enable = fullscreenImage.hidden;
  const domBodyClasses = document.body.classList;

  if (enable) {
    domBodyClasses.add("fullscreen");
  } else {
    domBodyClasses.remove("fullscreen");
  }

  fullscreenImage.hidden = !enable;
}

//region DOM elements setup
fullscreenImage.ondblclick = () => toggleFullscreenImage();

imageElement.ondblclick = fullscreenImage.ondblclick;
imageElement.onload = () => {
  canChangeIndex = true;
}

buttonPrevious.onclick = () => exposeCurrentImage(-1);
buttonNext.onclick = () => exposeCurrentImage(1);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    categories = await fetchJsonData(categoriesJsonPath);
    files = await fetchJsonData(dataJsonPath);
  } catch (err) {
    console.error("Error fetching data.", err);
  }

  categories.forEach(([name, namespace]) => {
    categorized[namespace] = [];
    createStandardButton(name, () => {
      setContentCategory(currentContentName, namespace);
      exposeCurrentImage(1);
    });
  });
  createStandardButton("Download", downloadCategorizedZip, "stroked");

  exposeCurrentImage();
});
