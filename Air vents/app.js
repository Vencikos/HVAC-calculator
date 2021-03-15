///////////////////////////////////////////
////////////// Input fields ///////////////
///////////////////////////////////////////

const outletTypeInput = document.querySelector("#outlet-type");
const sizeAInput = document.querySelector(".input-sizeA");
const sizeBInput = document.querySelector(".input-sizeB");
const airVolumeInput = document.querySelector(".air-volume-input");
const airSpeedInput = document.querySelector(".air-speed-input");

///////////////////////////////////////////
////////////// Result fields //////////////
///////////////////////////////////////////

const resultSpeed = document.querySelector(".result-speed-text");
const resultMaxSpeed = document.querySelector(".result-max-speed-text");
const resultMaxVolume = document.querySelector(".result-max-volume-text");
const resultSecondSize = document.querySelector(".result-second-size-text");

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
////////// RESET INPUT FIELDS /////////////
///////////////////////////////////////////

const resetInput = () => {
  outletTypeInput.value = "";
  sizeAInput.value = "";
  sizeBInput.value = "";
  airVolumeInput.value = "";
  airSpeedInput.value = "";
};

const resetResults = () => {
  resultSpeed.textContent = `0.00 m/s`;
  resultMaxVolume.textContent = `0.00 m3/h`;
  resultSecondSize.textContent = `0.00 mm`;
};
///////////////////////////////////////////
////////////// CALC SPEED /////////////////
///////////////////////////////////////////

const calcSpeed = () => {
  let typeInput = 0.5;
  if (outletTypeInput.value === "Wall") typeInput = 0.7;

  const calc =
    +airVolumeInput.value /
    3600 /
    (+sizeAInput.value / 1000) /
    (+sizeBInput.value / 1000) /
    typeInput;
  return calc.toFixed(2);
};

///////////////////////////////////////////////
////////////// CALC MAX VOLUME ////////////////
///////////////////////////////////////////////

const calcMaxVolume = () => {
  let typeInput = 0.5;
  if (outletTypeInput.value === "Wall") typeInput = 0.7;

  const calc =
    +airSpeedInput.value *
    3600 *
    (+sizeAInput.value / 1000) *
    (+sizeBInput.value / 1000) *
    typeInput;
  return calc.toFixed(2);
};

///////////////////////////////////////////////
/////////// CALC MAX VERTICAL SIZE ////////////
///////////////////////////////////////////////

const calcMinVertical = () => {
  let typeInput = 0.5;
  if (outletTypeInput.value === "Wall") typeInput = 0.7;

  const calc =
    +airVolumeInput.value /
    3600 /
    (+sizeAInput.value / 1000) /
    +airSpeedInput.value /
    typeInput;
  return (calc * 1000).toFixed(2);
};

///////////////////////////////////////////////
//////////// ADD RESULTS TO TABLE /////////////
///////////////////////////////////////////////

const table = document.querySelector(".table");

const addResultsToTable = () => {
  const html = `
    <tr>
      <th scope="row">Air vent (${outletTypeInput.value} mounted)</th>
      <td>${sizeAInput.value}</td>
      <td>${sizeBInput.value}</td>
      <td>${airVolumeInput.value}</td>
      <td>${calcSpeed()}</td>
      <td>${calcMinVertical()}</td>
      <td>${calcMaxVolume()}</td>
      <td>${airSpeedInput.value}</td>
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
  resultSpeed.textContent = `${calcSpeed()} m/s`;
  resultMaxVolume.textContent = `${calcMaxVolume()} m3/h`;
  if (airSpeedInput.value !== "") {
    resultSecondSize.textContent = `${calcMinVertical()} mm`;
  }
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
