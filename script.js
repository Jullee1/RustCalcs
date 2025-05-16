particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 90, // slightly fewer particles
      "density": {
        "enable": true,
        "value_area": 1000 // more spread out
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.25,
      "random": true
    },
    "size": {
      "value": 2.8, // slightly reduced size
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 130, // shorter connection distance
      "color": "#ffffff",
      "opacity": 0.2,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.8, // slower and calmer
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false
      }
    },
    "modes": {
      "grab": {
        "distance": 150,
        "line_linked": {
          "opacity": 0.3
        }
      }
    }
  },
  "retina_detect": true
});

window.addEventListener("load", () => {
  const modal = document.getElementById("changelog-modal");
  const closeBtn = document.getElementById("close-changelog");
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
});

const changelogModal = document.getElementById("changelog-modal");
const modalContent = document.querySelector(".modal-content");

changelogModal.addEventListener("click", (e) => {
  // Om man klickar direkt på bakgrunden (inte innehållet)
  if (!modalContent.contains(e.target)) {
    changelogModal.style.display = "none";
  }
});

function navigate(tab) {
  const home = document.getElementById("home");
  const tabContent = document.getElementById("tab-content");
  const tabTitle = document.getElementById("tab-title");
  const tabBody = document.getElementById("tab-body");

  const tabTitles = {
    recycling: "Recycling",
    explosives: "Explosives",
    maxcraft: "Max Craft",
    raid: "Raid Cost",
    wipe: "Wipe Summary"
  };

  home.classList.add("fade-out");

  setTimeout(() => {
    home.classList.remove("fade-out");
    home.style.display = "none";

    tabContent.classList.remove("hidden");
    tabContent.classList.remove("fade-out");
    tabContent.classList.add("fade-in");

    tabTitle.textContent = tabTitles[tab] || tab.toUpperCase();
    history.pushState({ tab }, "", `#${tab}`);

    if (tab === "recycling") {
      loadRecycling(tabBody);
      resetAllInputs(tabBody);
    } else if (tab === "explosives") {
      loadExplosives(tabBody);
      resetAllInputs(tabBody);
    } else if (tab === "raid") {
      loadRaidCost(tabBody);
    } else {
      tabBody.innerHTML = `<p style="color: #888;">${tabTitles[tab] || tab} content coming soon...</p>`;
    }

    setTimeout(() => {
      tabContent.classList.remove("fade-in");
    }, 500);
  }, 500);
}


function loadRecycling(container) {
  container.innerHTML = `
    <p class="tab-subtitle">What would you like to recycle?</p>
    <div class="recycle-tab-buttons">
      <button class="recycle-tab-btn active" data-tab="components">Components</button>
      <button class="recycle-tab-btn" data-tab="explosives">Explosives</button>
      <button class="recycle-tab-btn" data-tab="f1">F1 Grenades</button>
    </div>

    <div class="recycle-tabs">
      <div id="componentsTab" class="recycle-inner-tab active">
        <div class="components-container">
          <div class="component"><img src="icons/gears.png"><input type="number" id="gears" min="0" value="0"></div>
          <div class="component"><img src="icons/metalBlade.png"><input type="number" id="metalBlade" min="0" value="0"></div>
          <div class="component"><img src="icons/metalPipe.png"><input type="number" id="metalPipe" min="0" value="0"></div>
          <div class="component"><img src="icons/metalSpring.png"><input type="number" id="metalSpring" min="0" value="0"></div>
          <div class="component"><img src="icons/roadSigns.png"><input type="number" id="roadSigns" min="0" value="0"></div>
          <div class="component"><img src="icons/semiBody.png"><input type="number" id="semiBody" min="0" value="0"></div>
          <div class="component"><img src="icons/smgBody.png"><input type="number" id="smgBody" min="0" value="0"></div>
          <div class="component"><img src="icons/rifleBody.png"><input type="number" id="rifleBody" min="0" value="0"></div>
          <div class="component"><img src="icons/sheetMetal.png"><input type="number" id="sheetMetal" min="0" value="0"></div>
          <div class="component"><img src="icons/ttrash.png"><input type="number" id="techTrash" min="0" value="0"></div>
          <div class="component"><img src="icons/cctvcamera.png"><input type="number" id="cctvCamera" min="0" value="0"></div>
          <div class="component"><img src="icons/targetingcomputer.png"><input type="number" id="targetingComputer" min="0" value="0"></div>
        </div>

        <div class="options">
         <label class="checkbox-container">
          <input type="checkbox" id="componentSafezoneCheckbox" checked>
          <span class="checkmark"></span>
          Safezone Recycle Rates
         </label>
        </div>

        <div class="f1-results" id="componentResults">
          <div class="f1-box"><h2>Component Output</h2>
            <div class="f1-row">
              <div class="f1-result"><img src="icons/scrap.png"><span id="componentScrap">0</span></div>
              <div class="f1-result"><img src="icons/hqm.png"><span id="componentHQM">0</span></div>
              <div class="f1-result"><img src="icons/frags.png"><span id="componentFrags">0</span></div>
              <div class="f1-result"><img src="icons/ttrash.png"><span id="componentTrash">0</span></div>
            </div>
          </div>
        </div>
      </div>

      <div id="explosivesTab" class="recycle-inner-tab">
        <div class="components-container">
          <div class="component"><img src="icons/c4.png"><input type="number" id="recycleC4" min="0" value="0"></div>
          <div class="component"><img src="icons/rocket.png"><input type="number" id="recycleRocket" min="0" value="0"></div>
          <div class="component"><img src="icons/incendiary_rocket.png"><input type="number" id="recycleIncRocket" min="0" value="0"></div>
          <div class="component"><img src="icons/explosive_ammo.png"><input type="number" id="recycleExpAmmo" min="0" value="0"></div>
          <div class="component"><img src="icons/incendiary_ammo.png"><input type="number" id="recycleIncAmmo" min="0" value="0"></div>
        </div>

        <div class="options">
         <label class="checkbox-container">
          <input type="checkbox" id="explosivesSafezoneCheckbox" checked>
          <span class="checkmark"></span>
          Safezone Recycle Rates
         </label>
        </div>

        <div class="f1-results" id="explosivesResults">
          <div class="f1-box"><h2>Explosive Output</h2>
            <div class="f1-row">
              <div class="f1-result"><img src="icons/explosives.png"><span id="outExplosives">0</span></div>
              <div class="f1-result"><img src="icons/gunpowder.png"><span id="outGP">0</span></div>
              <div class="f1-result"><img src="icons/sulfur.png"><span id="outSulfur">0</span></div>
              <div class="f1-result"><img src="icons/frags.png"><span id="outFrags">0</span></div>
              <div class="f1-result"><img src="icons/metalPipe.png"><span id="outPipes">0</span></div>
              <div class="f1-result"><img src="icons/cloth.png"><span id="outCloth">0</span></div>
              <div class="f1-result"><img src="icons/ttrash.png"><span id="outTrash">0</span></div>
              <div class="f1-result"><img src="icons/lgf.png"><span id="outLGF">0</span></div>
            </div>
          </div>
        </div>
      </div>

      <div id="f1Tab" class="recycle-inner-tab">
        <div class="components-container">
          <div class="component"><img src="icons/scrap.png"><input type="number" id="gpScrapInput" min="0" value="0"></div>
        </div>

        <div class="options">
         <label class="checkbox-container">
          <input type="checkbox" id="f1SafezoneCheckbox" checked>
          <span class="checkmark"></span>
          Safezone Recycle Rates
         </label>
        </div>

        <div class="f1-results">
          <div class="f1-box"><h2>Recycled Resources</h2>
            <div class="f1-row">
              <div class="f1-result"><img src="icons/gunpowder.png"><span id="gpTotal">0</span></div>
              <div class="f1-result"><img src="icons/frags.png"><span id="gpFragsTotal">0</span></div>
            </div>
          </div>

          <div class="f1-box"><h2>Grenade Breakdown</h2>
            <div class="f1-row">
              <div class="f1-result"><img src="icons/f1.png"><span id="f1Count">0</span></div>
              <div class="f1-result"><img src="icons/stack.png"><span id="f1Stacks">0</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add tab switching functionality
const buttons = container.querySelectorAll(".recycle-tab-btn");
const tabContainer = container.querySelector(".recycle-tabs");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const selected = button.getAttribute("data-tab");
    const newTab = container.querySelector(`#${selected}Tab`);
    const currentTab = container.querySelector(".recycle-inner-tab.active");

    if (newTab === currentTab) return;

    tabContainer.classList.add("fade-out");
    resetAllInputs(newTab);

    setTimeout(() => {
      currentTab.classList.remove("active");
      newTab.classList.add("active");

      tabContainer.classList.remove("fade-out");
      tabContainer.classList.add("fade-in");

      setTimeout(() => {
        tabContainer.classList.remove("fade-in");
      }, 200);
    }, 200);

    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
setupRecyclingCalculations();
document.getElementById("gpScrapInput").addEventListener("input", updateF1Totals);
document.getElementById("f1SafezoneCheckbox").addEventListener("change", updateF1Totals);
}

function loadExplosives(container) {
  container.innerHTML = `
    <p class="tab-subtitle">What do you want to craft?</p>
    <div class="components-container">
      <div class="component"><img src="icons/c4.png"><input type="number" id="craftC4" min="0" value=""></div>
      <div class="component"><img src="icons/rocket.png"><input type="number" id="craftRocket" min="0" value=""></div>
      <div class="component"><img src="icons/incendiary_rocket.png"><input type="number" id="craftIncRocket" min="0" value=""></div>
      <div class="component"><img src="icons/satchel.png"><input type="number" id="craftSatchel" min="0" value=""></div>
      <div class="component"><img src="icons/explosive_ammo.png"><input type="number" id="craftExpAmmo" min="0" value=""></div>
    </div>

    <div class="f1-results" id="explosivesResults">
  <div class="f1-box">
    <h2>Total Crafting Cost</h2>
    <div class="f1-row">
      <div class="f1-result"><img src="icons/sulfur.png"><span id="totalSulfur">0</span></div>
      <div class="f1-result"><img src="icons/charcoal.png"><span id="totalCharcoal">0</span></div>
      <div class="f1-result"><img src="icons/frags.png"><span id="totalFrags">0</span></div>
      <div class="f1-result"><img src="icons/lgf.png"><span id="totalLGF">0</span></div>
      <div class="f1-result"><img src="icons/cloth.png"><span id="totalCloth">0</span></div>
      <div class="f1-result"><img src="icons/rope.png"><span id="totalRope">0</span></div>
      <div class="f1-result"><img src="icons/metalpipe.png"><span id="totalPipes">0</span></div>
    </div>
  </div>
</div>
  `;
  setupExplosivesCrafting();
}

function loadRaidCost(container) {
  container.innerHTML = `
    <p class="tab-subtitle">Select the structure you want to raid</p>
    <div class="raid-container">
      <div class="component"><img src="raidcosticons/woodenwall.png" onclick="showRaidCost('Wooden Wall', { c4: 1, rocket: 2, satchel: 3, ammo: 49, hvrocket: 9, molotov: 4 })"></div>
      <div class="component"><img src="raidcosticons/stonewall.png" onclick="showRaidCost('Stone Wall', { c4:  2, rocket: 4, satchel: 10, ammo: 185, hvrocket: 32 })"></div>
      <div class="component"><img src="raidcosticons/sheetmetalwall.png" onclick="showRaidCost('Sheet Metal Wall', { c4: 4, rocket: 8, satchel: 23, ammo: 400, hvrocket: 67 })"></div>
      <div class="component"><img src="raidcosticons/armoredwall.png" onclick="showRaidCost('Armored Wall', { c4: 8, rocket: 16, satchel: 46, ammo: 799, hvrocket: 134 })"></div>

      <div class="component"><img src="raidcosticons/woodendoor.png" onclick="showRaidCost('Wooden Door / Wooden Double Door', { rocket: 1, satchel: 2, ammo: 19, hvrocket: 4, molotov: 2 })"></div>
      <div class="component"><img src="raidcosticons/sheetmetaldoor.png" onclick="showRaidCost('Sheet Metal Door / Sheet Metal Double Door', { c4: 1, rocket: 2, satchel: 4, ammo: 63, hvrocket: 11 })"></div>
      <div class="component"><img src="raidcosticons/armoreddoor.png" onclick="showRaidCost('Armored Door / Armored Double Door', { c4: 3, rocket: 5, satchel: 15, ammo: 250, hvrocket: 42 })"></div>
      <div class="component"><img src="raidcosticons/garagedoor.png" onclick="showRaidCost('Garage Door', { c4: 2, rocket: 3, satchel: 9, ammo: 150, hvrocket: 25 })"></div>
      <div class="component"><img src="raidcosticons/ladderhatch.png" onclick="showRaidCost('Ladder Hatch / Triangle Ladder Hatch', { c4: 1, rocket: 2, satchel: 4, ammo: 63, hvrocket: 11 })"></div>
      <div class="component"><img src="raidcosticons/metalshopfront.png" onclick="showRaidCost('Metal Shop Front', { c4: 3, rocket: 6, satchel: 18, ammo: 300, hvrocket: 50 })"></div>
      <div class="component"><img src="raidcosticons/highexternalwoodenwall.png" onclick="showRaidCost('High External Wooden Wall/Gate', { c4: 2, rocket: 3, satchel: 6, ammo: 98, hvrocket: 18, molotov: 7 })"></div>
      <div class="component"><img src="raidcosticons/highexternalstonewall.png" onclick="showRaidCost('High External Stone Wall/Gate', { c4: 2, rocket: 4, satchel: 10, ammo: 185, hvrocket: 32 })"></div>
      <div class="component"><img src="raidcosticons/chainlinkfence.png" onclick="showRaidCost('Chainlink Fence / Chainlink Fence Gate', { c4: 1, rocket: 1, satchel: 2, ammo: 20, hvrocket: 4 })"></div>
      <div class="component"><img src="raidcosticons/floorgrill.png" onclick="showRaidCost('Floor Grill / Triangle Floor Grill', { c4: 1, rocket: 2, satchel: 4, ammo: 63, hvrocket: 11 })"></div>
      <div class="component"><img src="raidcosticons/woodenwindowbars.png" onclick="showRaidCost('Wooden Window Bars', { c4: 1, rocket: 2, satchel: 3, ammo: 49, hvrocket: 9, molotov: 4 })"></div>
      <div class="component"><img src="raidcosticons/metalwindowbars.png" onclick="showRaidCost('Metal Window Bars', { c4: 2, rocket: 4, satchel: 12, ammo: 200, hvrocket: 34 })"></div>
      <div class="component"><img src="raidcosticons/strengthenedglasswindow.png" onclick="showRaidCost('Strengthened Glass Window', { c4: 2, rocket: 3, satchel: 9, ammo: 140, hvrocket: 24 })"></div>
      <div class="component"><img src="raidcosticons/reinforcedglasswindow.png" onclick="showRaidCost('Reinforced Glass Window', { c4: 2, rocket: 4, satchel: 12, ammo: 200, hvrocket: 34 })"></div>
      <div class="component"><img src="raidcosticons/metalembrasure.png" onclick="showRaidCost('Vertical Metal Embrasure / Horizontal Metal Embrasure', { c4: 2, rocket: 4, satchel: 13, ammo: 173, hvrocket: 31 })"></div>
      <div class="component"><img src="raidcosticons/woodenbarricade.png" onclick="showRaidCost('Wooden Barricade', { c4: 1, rocket: 1, satchel: 1, ammo: 22, incenammo: 40, hvrocket: 5, molotov: 1 })"></div>
      <div class="component"><img src="raidcosticons/barbedwoodenbarricade.png" onclick="showRaidCost('Barbed Wooden Barricade', { c4: 1, rocket: 1, satchel: 1, ammo: 35, incenammo: 60, hvrocket: 7, molotov: 2 })"></div>
      <div class="component"><img src="raidcosticons/metalbarricade.png" onclick="showRaidCost('Metal Barricade', { c4: 1, rocket: 3, satchel: 4, ammo: 111, hvrocket: 20 })"></div>
      <div class="component"><img src="raidcosticons/workbenchlevel1.png" onclick="showRaidCost('Workbench Level 1', { c4: 1, rocket: 2, satchel: 1, ammo: 56, hvrocket: 3 })"></div>
      <div class="component"><img src="raidcosticons/workbenchlevel2.png" onclick="showRaidCost('Workbench Level 2', { c4: 1, rocket: 4, satchel: 7, ammo: 173, hvrocket: 31 })"></div>
      <div class="component"><img src="raidcosticons/workbenchlevel3.png" onclick="showRaidCost('Workbench Level 3', { c4: 2, rocket: 6, satchel: 10, ammo: 259, hvrocket: 46 })"></div>
      <div class="component"><img src="raidcosticons/vendingmachine.png" onclick="showRaidCost('Vending Machine', { c4: 3, rocket: 10, satchel: 15, ammo: 499, hvrocket: 84 })"></div>
      <div class="component"><img src="raidcosticons/autoturret.png" onclick="showRaidCost('Auto Turret', { c4: 1, rocket: 4, satchel: 2, ammo: 112, incenammo: 200, hvrocket: 3, molotov: 7 })"></div>
      <div class="component"><img src="raidcosticons/samsite.png" onclick="showRaidCost('SAM Site', { c4: 1, rocket: 4, satchel: 2, ammo: 200, incenammo: 250, hvrocket: 34, molotov: 2 })"></div>
      <div class="component"><img src="raidcosticons/sirenlight.png" onclick="showRaidCost('Siren Light', { c4: 1, rocket: 1, satchel: 1, ammo: 26, incenammo: 100, hvrocket: 5 })"></div>
      <div class="component"><img src="raidcosticons/windturbine.png" onclick="showRaidCost('Wind Turbine', { c4: 1, rocket: 2, satchel: 7, ammo: 100, hvrocket: 17 })"></div>
    </div>

    <div id="raid-popup" class="popup hidden">
      <div class="popup-content">
        <h2 id="popup-title">Raid Cost</h2>
        <p id="popup-description">Estimated cost for 1 target.</p>

        <div class="popup-costs" id="popup-costs-container"></div>

        <div class="popup-quantity">
          <button id="decrease" class="glass-btn small">–</button>
          <span id="popup-count">1</span>
          <button id="increase" class="glass-btn small">+</button>
        </div>

        <button id="popup-close" class="glass-btn small" style="margin-top: 2em;">Close</button>
      </div>
    </div>
  `;
  setupRaidPopup();
}


function updateF1Totals() {
  const useSafezone = document.getElementById("f1SafezoneCheckbox").checked;
  const scrapInput = parseInt(document.getElementById("gpScrapInput").value) || 0;

  // Example F1 recycling logic:
  // Assume 15 scrap = 1 F1 grenade = 30 gunpowder + 15 frags (adjust as needed)
  const grenades = Math.floor(scrapInput / 15);
  const stacks = Math.floor(grenades / 20); // assuming stack of 20

  document.getElementById("gpTotal").textContent = grenades * 30;  // gunpowder
  document.getElementById("gpFragsTotal").textContent = grenades * 15;
  document.getElementById("f1Count").textContent = grenades;
  document.getElementById("f1Stacks").textContent = stacks;
}

function resetAllInputs(container) {
  const inputs = container.querySelectorAll("input[type='number']");
  inputs.forEach(input => input.value = "");
}

const recycleRates = {
  regular: {
    techTrash: { scrap: 24, hqm: 2 },
    smgBody: { scrap: 18, hqm: 2 },
    semiBody: { scrap: 18, hqm: 2, frags: 90 },
    sheetMetal: { scrap: 9, frags: 120, hqm: 2 },
    roadSigns: { scrap: 6, hqm: 2 },
    rifleBody: { scrap: 30, hqm: 2 },
    metalBlade: { scrap: 2, frags: 18 },
    metalPipe: { scrap: 6, hqm: 2 },
    metalSpring: { scrap: 12, hqm: 2 },
    gears: { scrap: 12, frags: 15 },
    cctvCamera: { ttrash: 2, hqm: 2 },
    targetingComputer: { ttrash: 3, hqm: 2, frags: 60 },

    recycleC4: { explosives: 12, cloth: 3, ttrash: 2 },
    recycleRocket: { metalPipe: 2, gunpowder: 90, explosives: 6 },
    recycleIncRocket: { metalPipe: 2, gunpowder: 90, lgf: 45 },
    recycleExpAmmo: { frags: 3, gunpowder: 6, sulfur: 3 },
    recycleIncAmmo: { frags: 3, gunpowder: 3, sulfur: 2 },
  },

  safezone: {
    techTrash: { scrap: 16, hqm: 1 },
    smgBody: { scrap: 12, hqm: 2 },
    semiBody: { scrap: 12, hqm: 2, frags: 60 },
    sheetMetal: { scrap: 6, frags: 80, hqm: 1 },
    roadSigns: { scrap: 4, hqm: 1 },
    rifleBody: { scrap: 20, hqm: 2 },
    metalBlade: { scrap: 1, frags: 12 },
    metalPipe: { scrap: 4, hqm: 1 },
    metalSpring: { scrap: 8, hqm: 1 },
    gears: { scrap: 8, frags: 10 },
    cctvCamera: { ttrash: 2, hqm: 2 },
    targetingComputer: { ttrash: 2, hqm: 1, frags: 40 },

    recycleC4: { explosives: 8, cloth: 2, ttrash: 1 },
    recycleRocket: { metalPipe: 1, gunpowder: 60, explosives: 4 },
    recycleIncRocket: { metalPipe: 1, gunpowder: 60, lgf: 30 },
    recycleExpAmmo: { frags: 2, gunpowder: 4, sulfur: 2 },
    recycleIncAmmo: { frags: 2, gunpowder: 2, sulfur: 1 },
  }
};

const craftingCosts = {
  craftC4: { explosives: 20, gp: 0, sulfur: 0, frags: 0, cloth: 5, lgf: 0, rope: 0, smg: 0 },
  craftRocket: { explosives: 10, gp: 0, sulfur: 0, frags: 0, cloth: 0, lgf: 0, rope: 0, smg: 0 },
  craftIncRocket: { explosives: 0, gp: 80, sulfur: 0, frags: 0, cloth: 0, lgf: 40, rope: 0, smg: 0 },
  craftSatchel: { explosives: 0, gp: 240, sulfur: 480, frags: 0, cloth: 4, lgf: 0, rope: 1, smg: 0 },
  craftExpAmmo: { explosives: 0, gp: 20, sulfur: 10, frags: 5, cloth: 0, lgf: 0, rope: 0, smg: 0 }
};

const raidIconMap = {
  c4: "c4.png",
  rocket: "rocket.png",
  hvrocket: "hvrocket.png",
  satchel: "satchel.png",
  ammo: "explosive_ammo_ak.png",
  molotov: "molotov.png",
  incenammo: "incendiary_ammo_ak.png"
};

function setupRecyclingCalculations() {
  const componentInputs = [
    "techTrash", "smgBody", "semiBody", "sheetMetal", "roadSigns", "rifleBody",
    "metalBlade", "metalPipe", "metalSpring", "gears", "cctvCamera", "targetingComputer"
  ];

  const explosivesInputs = [
    "recycleC4", "recycleRocket", "recycleIncRocket", "recycleExpAmmo", "recycleIncAmmo"
  ];

  componentInputs.forEach(id => {
    document.getElementById(id).addEventListener("input", updateComponentTotals);
  });

  explosivesInputs.forEach(id => {
    document.getElementById(id).addEventListener("input", updateExplosiveTotals);
  });

  document.getElementById("componentSafezoneCheckbox").addEventListener("change", updateComponentTotals);
  document.getElementById("explosivesSafezoneCheckbox").addEventListener("change", updateExplosiveTotals);
}

function updateComponentTotals() {
  const useSafezone = document.getElementById("componentSafezoneCheckbox").checked;
  const rates = recycleRates[useSafezone ? "safezone" : "regular"];

  let scrap = 0, hqm = 0, frags = 0, ttrash = 0;

  for (const key in rates) {
    const input = document.getElementById(key);
    if (!input) continue;
    const count = parseInt(input.value) || 0;
    const rate = rates[key];

    scrap += (rate.scrap || 0) * count;
    hqm += (rate.hqm || 0) * count;
    frags += (rate.frags || 0) * count;
    ttrash += (rate.ttrash || 0) * count;
  }

  document.getElementById("componentScrap").textContent = scrap;
  document.getElementById("componentHQM").textContent = hqm;
  document.getElementById("componentFrags").textContent = frags;
  document.getElementById("componentTrash").textContent = ttrash;
}

function updateExplosiveTotals() {
  const useSafezone = document.getElementById("explosivesSafezoneCheckbox").checked;
  const rates = recycleRates[useSafezone ? "safezone" : "regular"];

  let explosives = 0, gunpowder = 0, sulfur = 0, frags = 0, metalPipe = 0, cloth = 0, ttrash = 0, lgf = 0;

  for (const key in rates) {
    if (!key.startsWith("recycle")) continue;
    const input = document.getElementById(key);
    if (!input) continue;
    const count = parseInt(input.value) || 0;
    const rate = rates[key];

    explosives += (rate.explosives || 0) * count;
    gunpowder += (rate.gunpowder || 0) * count;
    sulfur += (rate.sulfur || 0) * count;
    frags += (rate.frags || 0) * count;
    metalPipe += (rate.metalPipe || 0) * count;
    cloth += (rate.cloth || 0) * count;
    ttrash += (rate.ttrash || 0) * count;
    lgf += (rate.lgf || 0) * count;
  }

  document.getElementById("outExplosives").textContent = explosives;
  document.getElementById("outGP").textContent = gunpowder;
  document.getElementById("outSulfur").textContent = sulfur;
  document.getElementById("outFrags").textContent = frags;
  document.getElementById("outPipes").textContent = metalPipe;
  document.getElementById("outCloth").textContent = cloth;
  document.getElementById("outTrash").textContent = ttrash;
  document.getElementById("outLGF").textContent = lgf;
}

document.getElementById("back-btn").addEventListener("click", () => {
  const home = document.getElementById("home");
  const tabContent = document.getElementById("tab-content");

  tabContent.classList.remove("fade-in");
  tabContent.classList.add("fade-out");

  setTimeout(() => {
    tabContent.classList.remove("fade-out");
    tabContent.classList.add("hidden");
    home.style.display = "block";
    home.classList.remove("fade-out");
    home.classList.add("fade-in");

    history.pushState({}, '', '#');

    setTimeout(() => {
      home.classList.remove("fade-in");
    }, 500);
  }, 500);
});

window.addEventListener("popstate", (event) => {
  const home = document.getElementById("home");
  const tabContent = document.getElementById("tab-content");

  // Go back to home if navigating backward (e.g. mouse back button)
  if (!location.hash || location.hash === "#") {
    tabContent.classList.remove("fade-in");
    tabContent.classList.add("fade-out");

    setTimeout(() => {
      tabContent.classList.remove("fade-out");
      tabContent.classList.add("hidden");
      home.style.display = "block";
      home.classList.add("fade-in");

      setTimeout(() => {
        home.classList.remove("fade-in");
      }, 500);
    }, 500);
  }
});

function setupExplosivesCrafting() {
  const inputs = [
    "craftC4", "craftRocket", "craftIncRocket", "craftSatchel", "craftExpAmmo"
  ];

  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener("input", updateExplosivesCraftTotals);
    }
  });
}

function updateExplosivesCraftTotals() {
  const getVal = id => parseInt(document.getElementById(id)?.value) || 0;

  const c4 = getVal("craftC4");
  const rocket = getVal("craftRocket");
  const incRocket = getVal("craftIncRocket");
  const satchel = getVal("craftSatchel");
  const expAmmo = getVal("craftExpAmmo");

  // Totalkostnader
  let sulfur = 0, charcoal = 0, frags = 0, lgf = 0, cloth = 0, rope = 0, pipes = 0, lowGrade = 0;

  // OBS: C4 får stanna kvar som explosivbaserad (om du vill räkna ut dess kedja)
  sulfur += c4 * 2200;
  charcoal += c4 * 3000;
  frags += c4 * 200;
  cloth += c4 * 5;
  lgf += c4 * 60;

  // Rocket - direkt input
  sulfur += rocket * 1400;
  frags += rocket * 100;
  charcoal += rocket * 1950;
  lgf += rocket * 32;
  pipes += rocket * 2;

  // Incendiary Rocket
  sulfur += incRocket * 300;
  charcoal += incRocket * 450;
  lgf += incRocket * 76;
  pipes += incRocket * 2;

  // Satchel
  sulfur += satchel * 480;
  charcoal += satchel * 720;
  frags += satchel * 80;
  rope += satchel * 1;
  cloth += satchel * 10;

  // Explosive Ammo
  sulfur += expAmmo * 25;
  charcoal += expAmmo * 30;
  frags += expAmmo * 5;

  // Uppdatera DOM
  document.getElementById("totalSulfur").textContent = sulfur;
  document.getElementById("totalCharcoal").textContent = charcoal;
  document.getElementById("totalFrags").textContent = frags;
  document.getElementById("totalLGF").textContent = lgf;
  document.getElementById("totalCloth").textContent = cloth;
  document.getElementById("totalRope").textContent = rope;
  document.getElementById("totalPipes").textContent = pipes;

  // Dessa visas ej längre:
  document.getElementById("totalGP").textContent = "-";
  document.getElementById("totalExplosives").textContent = "-";
}

function setupRaidPopup() {
  document.getElementById("decrease").addEventListener("click", () => {
    if (currentRaidCount > 1) {
      currentRaidCount--;
      updateRaidPopup();
    }
  });

  document.getElementById("increase").addEventListener("click", () => {
    currentRaidCount++;
    updateRaidPopup();
  });

  document.getElementById("popup-close").addEventListener("click", () => {
    document.getElementById("raid-popup").classList.add("hidden");
  });
}

function updatePopup(id, count) {
  document.getElementById("popup-count").textContent = count;

  // Här kan du lägga specifika kostnader per objekt (exempel)
  const raidData = {
    1: { explosives: 4, rockets: 2, satchels: 10 },
    2: { explosives: 6, rockets: 3, satchels: 12 },
    3: { explosives: 10, rockets: 4, satchels: 16 },
    // ... upp till 30
  };

  const data = raidData[id] || { explosives: 0, rockets: 0, satchels: 0 };

  document.getElementById("cost-explosives").textContent = data.explosives * count;
  document.getElementById("cost-rockets").textContent = data.rockets * count;
  document.getElementById("cost-satchels").textContent = data.satchels * count;

  document.getElementById("popup-title").textContent = `Raid Cost #${id}`;
  document.getElementById("popup-description").textContent = `Estimated cost for ${count}x target(s).`;
}

let currentRaidData = {};
let currentRaidTitle = "";
let currentRaidCount = 1;

function showRaidCost(name, costData) {
  currentRaidTitle = name;
  currentRaidData = costData;
  currentRaidCount = 1;
  updateRaidPopup();

  document.getElementById("raid-popup").classList.remove("hidden");
}

function updateRaidPopup() {
  document.getElementById("popup-title").textContent = currentRaidTitle;
  document.getElementById("popup-description").textContent = `Estimated cost for ${currentRaidCount}x`;

  document.getElementById("popup-count").textContent = currentRaidCount;

  const container = document.getElementById("popup-costs-container");
  container.innerHTML = "";

  for (const [item, amount] of Object.entries(currentRaidData)) {
    container.innerHTML += `
      <div class="popup-cost">
        <img src="icons/${raidIconMap[item] || item + ".png"}">
        <span>${amount * currentRaidCount}</span>
      </div>`;
  }
}
