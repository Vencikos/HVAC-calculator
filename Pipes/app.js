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

const calcPipeType = (pipesize) => {
  const pipeSize = +pipesize;
  if (pipeSize <= 9.1) return 9.1 - pipeSize < Math.abs(6.2 - pipeSize) ? 8 : 6;
  else if (pipeSize <= 12.6)
    return 12.6 - pipeSize < Math.abs(9.1 - pipeSize) ? 10 : 8;
  else if (pipeSize <= 14.9)
    return 14.9 - pipeSize < Math.abs(12.6 - pipeSize) ? 15 : 10;
  else if (pipeSize <= 20.4)
    return 20.4 - pipeSize < Math.abs(14.9 - pipeSize) ? 20 : 15;
  else if (pipeSize <= 25.5)
    return 25.5 - pipeSize < Math.abs(20.4 - pipeSize) ? 25 : 20;
  else if (pipeSize <= 34.3)
    return 34.3 - pipeSize < Math.abs(25.5 - pipeSize) ? 32 : 25;
  else if (pipeSize <= 40)
    return 40 - pipeSize < Math.abs(34.3 - pipeSize) ? 40 : 32;
  else if (pipeSize <= 51)
    return 51 - pipeSize < Math.abs(40 - pipeSize) ? 50 : 40;
  else if (pipeSize <= 66.5)
    return 66.5 - pipeSize < Math.abs(51 - pipeSize) ? 65 : 50;
  else if (pipeSize <= 79.5)
    return 79.5 - pipeSize < Math.abs(66.5 - pipeSize) ? 80 : 65;
  else if (pipeSize <= 92.3)
    return 92.3 - pipeSize < Math.abs(79.5 - pipeSize) ? 90 : 80;
  else if (pipeSize <= 104)
    return 104 - pipeSize < Math.abs(92.3 - pipeSize) ? 100 : 90;
  else if (pipeSize <= 129)
    return 129 - pipeSize < Math.abs(104 - pipeSize) ? 125 : 100;
  else if (pipeSize <= 154)
    return 154 - pipeSize < Math.abs(129 - pipeSize) ? 150 : 125;
};

///////////////////////////////////////////////
//////////// ADD RESULTS TO TABLE /////////////
///////////////////////////////////////////////

const table = document.querySelector(".table");

const addResultsToTable = () => {
  const html = `
    <tr>
      <th scope="row">Black seamless pipe</th>
      <td>${consumptionInputHeating.value}</td>
      <td>${consumptionInputCooling.value}</td>
      <td>${resultWaterVolumeH.textContent}</td>
      <td>${resultWaterVolumeC.textContent}</td>
      <td>${resultPipeSizeH.textContent}</td>
      <td>${resultPipeTypeH.textContent}</td>
      <td>${resultPipeSizeC.textContent}</td>
      <td>${resultPipeTypeC.textContent}</td>
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
  resultPipeTypeH.textContent = `DN ${calcPipeType(calcPipeSizeH())}`;
  resultPipeSizeC.textContent = `${calcPipeSizeC()} mm`;
  resultPipeTypeC.textContent = `DN ${calcPipeType(calcPipeSizeC())}`;
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
