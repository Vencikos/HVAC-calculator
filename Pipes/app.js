///////////////////////////////////////////
////////////// Input fields ///////////////
///////////////////////////////////////////

const pipeSizeInput = document.querySelector("#pipe-size");
const consumptionInputCooling = document.querySelector(
  ".input-consumption-cooling"
);
const consumptionInputHeating = document.querySelector(
  ".input-consumption-heating"
);
const waterVolumeInput = document.querySelector(".input-water-volume");

///////////////////////////////////////////
////////////// Result fields //////////////
///////////////////////////////////////////

const resultWaterVolumeH = document.querySelector(
  ".result-water-volume-H-text"
);
const resultWaterVolumeC = document.querySelector(
  ".result-water-volume-C-text"
);
const resultMaxWaterVolumeH = document.querySelector(
  ".result-max-water-volume-H-text"
);
const resultMaxWaterVolumeC = document.querySelector(
  ".result-max-water-volume-C-text"
);
const resultPipeSizeH = document.querySelector(".result-pipe-size-H-text");
const resultPipeTypeH = document.querySelector(".result-pipe-type-H-text");
const resultPipeSizeC = document.querySelector(".result-pipe-size-C-text");
const resultPipeTypeC = document.querySelector(".result-pipe-type-C-text");

///////////////////////////////////////////
//////////// Calculate button /////////////
///////////////////////////////////////////

const calcBtn = document.querySelector(".btn-calc");
const addBtn = document.querySelector(".btn-add");
const resetBtn = document.querySelector(".btn-reset");
const btnPrint = document.querySelector(".btn-print");

///////////////////////////////////////////
////////////// FUNCTIONS //////////////////
///////////////////////////////////////////

///////////////////////////////////////////
//////// RESET INPUT AND RESULT ///////////
///////////////////////////////////////////

const resetInput = () => {
  pipeSizeInput.value = "";
  consumptionInputCooling.value = "";
  consumptionInputHeating.value = "";
  waterVolumeInput.value = "";
};

const resetResults = () => {
  resultWaterVolumeH.textContent = "0.00 m3/h";
  resultWaterVolumeC.textContent = "0.00 m3/h";
  resultMaxWaterVolumeH.textContent = "0.00 m3/h";
  resultMaxWaterVolumeC.textContent = "0.00 m3/h";
  resultPipeSizeH.textContent = "0.00 mm";
  resultPipeTypeH.textContent = "";
  resultPipeSizeC.textContent = "0.00 mm";
  resultPipeTypeC.textContent = "";
};
///////////////////////////////////////////
////////// CALC WATER VOLUME //////////////
///////////////////////////////////////////

const calcWaterVolumeH = () => {
  const calc = (+consumptionInputHeating.value * 0.86) / 12;
  return calc.toFixed(2);
};

const calcWaterVolumeC = () => {
  const calc = (+consumptionInputCooling.value * 0.86) / 5;
  return calc.toFixed(2);
};

///////////////////////////////////////////////
////////// CALC MAX WATER VOLUME //////////////
///////////////////////////////////////////////

// const calcMaxWaterVolume = () => {
//   const calc =

//   return calc;
// };

///////////////////////////////////////////////
/////////////// CALC PIPE SIZE ////////////////
///////////////////////////////////////////////

const calcPipeSizeH = () => {
  const calc = Math.sqrt((calcWaterVolumeH() * 4) / 3600 / 3.14) * 1000;
  return calc.toFixed(2);
};

const calcPipeSizeC = () => {
  const calc = Math.sqrt((calcWaterVolumeC() * 4) / 3600 / 3.14) * 1000;
  return calc.toFixed(2);
};

///////////////////////////////////////////////
/////////////// CALC PIPE TYPE ////////////////
///////////////////////////////////////////////

//TODO Find table with diameters of the pipes and calculate the inner diameters for the functions

// const calcPipeTypeH = () => {
//   const pipeSize = calcPipeSizeH();
//   if (pipeSize) return "DN6";
// };

///////////////////////////////////////////////
//////////// ADD RESULTS TO TABLE /////////////
///////////////////////////////////////////////

const table = document.querySelector(".table");

const addResultsToTable = () => {
  const html = `
    <tr>
      <th scope="row">Pipe</th>
      <td>${resultWaterVolumeH.value}</td>
      <td>${resultWaterVolumeC.value}</td>
      <td>${resultPipeSizeH.value}</td>
      <td>${resultPipeTypeH.value}</td>
      <td>${resultPipeSizeC.value}</td>
      <td>${resultPipeTypeC.value}</td>
      <td><button class='btn-close' onclick="deleteRow(this)"><i class="far fa-minus-square fa-lg"></i></button></td>
    </tr>`;

  table.insertAdjacentHTML("afterend", html);
};

///////////////////////////////////////////////
///////////// DELETE TABLE ROW ////////////////
///////////////////////////////////////////////

function deleteRow(r) {
  const i = r.parentNode.parentNode.rowIndex;
  document.getElementById("tab").deleteRow(i);
}

///////////////////////////////////////////////
////////////// EVENT LISTENERS ////////////////
///////////////////////////////////////////////

calcBtn.addEventListener("click", function () {
  resultWaterVolumeH.textContent = `${calcWaterVolumeH()} m3/h`;
  resultWaterVolumeC.textContent = `${calcWaterVolumeC()} m3/h`;
  // resultMaxWaterVolumeH.textContent = `${} m3/h`;
  // resultMaxWaterVolumeC.textContent = `${} m3/h`;
  resultPipeSizeH.textContent = `${calcPipeSizeH()} mm`;
  // resultPipeTypeH.textContent = `DN ${calcPipeTypeH}`;
  resultPipeSizeC.textContent = `${calcWaterVolumeC()} mm`;
  // resultPipeTypeC.textContent = `DN ${calcPipeTypeC}`;
});

addBtn.addEventListener("click", () => addResultsToTable());

resetBtn.addEventListener("click", function () {
  resetInput();
  resetResults();
});

btnPrint.addEventListener("click", function () {
  var divToPrint = document.getElementById("tab");
  newWin = window.open("");
  newWin.document.write(divToPrint.outerHTML);
  newWin.print();
  newWin.close();
});
