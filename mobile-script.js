// mobile-script.js

let pixelCount = 0;
let pixelsPerClick = 1;
let buildings = [
    { name: "Pixel Factory", cost: 50, production: 1, count: 0 },
    { name: "Pixel Workshop", cost: 200, production: 5, count: 0 },
    { name: "Pixel Mine", cost: 500, production: 10, count: 0 },
    { name: "Pixel Laboratory", cost: 1500, production: 25, count: 0 },
    { name: "Pixel Forge", cost: 5000, production: 50, count: 0 },
    { name: "Pixel Reactor", cost: 10000, production: 100, count: 0 },
    { name: "Pixel Generator", cost: 25000, production: 200, count: 0 },
    { name: "Pixel Tower", cost: 50000, production: 500, count: 0 },
    { name: "Pixel City", cost: 100000, production: 1000, count: 0 },
    { name: "Pixel Kingdom", cost: 250000, production: 2000, count: 0 },
    { name: "Pixel Empire", cost: 500000, production: 5000, count: 0 },
    { name: "Pixel Galaxy", cost: 1000000, production: 10000, count: 0 },
    { name: "Pixel Universe", cost: 2500000, production: 20000, count: 0 },
    { name: "Pixel Multiverse", cost: 5000000, production: 50000, count: 0 },
    { name: "Pixel Reality Engine", cost: 10000000, production: 100000, count: 0 },
    { name: "Pixel Dimension", cost: 25000000, production: 200000, count: 0 },
    { name: "Pixel Quantum Core", cost: 50000000, production: 500000, count: 0 },
    { name: "Pixel Infinity", cost: 100000000, production: 1000000, count: 0 },
    { name: "Pixel Omniverse", cost: 250000000, production: 2000000, count: 0 }
];

// Load game data from localStorage
window.onload = () => {
    loadGame();
    displayBuildings();
    setInterval(producePixels, 1000); // Automatic pixel production
    updatePixelsPerSecond();
    setInterval(saveGame, 30000); // Auto-save every 30 seconds
};

// Tab switching function
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[onclick="switchTab('${tabId}')"]`).classList.add('active');
}

// Save Game to localStorage
function saveGame() {
    const gameData = { pixelCount, pixelsPerClick, buildings };
    localStorage.setItem("pixelClickerMobileSave", JSON.stringify(gameData));
    console.log("Game saved!");
}

// Load Game from localStorage
function loadGame() {
    const savedData = JSON.parse(localStorage.getItem("pixelClickerMobileSave"));
    if (savedData) {
        pixelCount = savedData.pixelCount;
        pixelsPerClick = savedData.pixelsPerClick;
        buildings = savedData.buildings;
        updatePixelCount();
        updatePixelsPerSecond();
        console.log("Game loaded!");
    }
}

// Click Sprite
function clickSprite() {
    pixelCount += pixelsPerClick;
    updatePixelCount();
    showClickEffect();
}

// Show Click Effect
function showClickEffect() {
    const effect = document.createElement("div");
    effect.className = "click-effect";
    effect.innerText = `+${pixelsPerClick}`;
    document.getElementById("click-effect-container").appendChild(effect);
    setTimeout(() => effect.remove(), 1000);
}

// Update Pixel Count Display
function updatePixelCount() {
    document.getElementById("pixel-count").innerText = pixelCount;
}

// Calculate Pixels Per Second
function calculatePixelsPerSecond() {
    return buildings.reduce((totalPPS, building) => totalPPS + building.count * building.production, 0);
}

// Update Pixels Per Second Display
function updatePixelsPerSecond() {
    document.getElementById("pixels-per-second").innerText = calculatePixelsPerSecond();
}

// Display Buildings
function displayBuildings() {
    const buildingContainer = document.getElementById("buildings");
    buildingContainer.innerHTML = "";

    buildings.forEach((building, index) => {
        const div = document.createElement("div");
        div.className = "building";
        div.innerHTML = `
            <strong>${building.name}</strong><br>
            Cost: ${building.cost} pixels<br>
            Produces: ${building.production} pixels/sec<br>
            Owned: ${building.count}<br>
            <button onclick="buyBuilding(${index})">Buy</button>
        `;
        buildingContainer.appendChild(div);
    });
}

// Buy Building
function buyBuilding(index) {
    const building = buildings[index];
    if (pixelCount >= building.cost) {
        pixelCount -= building.cost;
        building.count += 1;
        pixelsPerClick += 1;
        building.cost = Math.round(building.cost * 1.15);
        updatePixelCount();
        displayBuildings();
        updatePixelsPerSecond();
    } else {
        alert("Not enough pixels!");
    }
}

// Produce Pixels Automatically
function producePixels() {
    pixelCount += calculatePixelsPerSecond();
    updatePixelCount();
}