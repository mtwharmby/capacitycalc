import {elements} from './elements.js'; // assert { type: 'JSON' };

const FARADAY = 96485;  // C mol-1
const HOUR = 3600;      // s

const table = document.querySelector('table#results')
const tableBody = table.childNodes[1];

//////////////////

const elemRegex = /([A-Z][a-z]?)(\d?[,\.]?\d*)/g

function parseChemicalFormula(formulaString) {
    let matches = [...formulaString.matchAll(elemRegex)];
    let parsed = {};
    matches.forEach(function(m) {
        m[2] = m[2].replace(",", ".");  // Replace , decimal separator
        parsed[m[1]] = (Number(m[2]) === 0) ? 1 : Number(m[2]);
    });
    return parsed;
}

function calcFormulaWeight(formula) {
    let mass = 0;
    for(const elem in formula) {
        mass += formula[elem] * elements[elem].mass;
    };
    return mass;
}

function calcFormulaWeightFromString(formulaString) {
    let formula = parseChemicalFormula(formulaString);
    return calcFormulaWeight(formula);
}

/////////////////

// Calculate the "Specific Capacity" of the given material
function calc_capacity(formulaWeightNoLi) {
    // formulaWeightNoLi - Mr of the electrode compound, without Li ions (g mol-1)
    return (FARADAY / (HOUR * formulaWeightNoLi)) * 1000;
}

function calc_electrode_capacity(specificCapacity, mass, efficiency) {
    // specificCapacity of electrode compound - mAh g-1
    // mass of (active) electrode used - g
    // liFrac - degree to which Li can be removed (fraction)
    return specificCapacity * mass * efficiency;
}

function populateCell(label, result) {
    let tdResult = document.createElement('td');

    let val = result[label];
    if (typeof(val) === "number") {
        tdResult.textContent = val.toFixed(3);
    } else {
        tdResult.textContent = val;
    }

    return tdResult;
}

function populateRow(result) {
    let trResult = document.createElement('tr')

    const fields = ["composition", "fwExLi", "capacity", "efficiency", "mass", "electrodeCapacity"];
    fields.forEach(field => trResult.appendChild(populateCell(field, result)));
    
    let cValues = [1, 0.5, 0.2, 0.1];
    cValues.forEach(function(val) {
        let tdCVal = document.createElement('td');
        tdCVal.textContent = (result.electrodeCapacity * val).toFixed(3);
        trResult.appendChild(tdCVal);
    });

    return trResult;
}

function calculateAll(composition, liExtract, mass, efficiency) {
    let parsedComposition = parseChemicalFormula(composition);

    liExtract = Number(liExtract.replace(",", "."))
    let compositionExLi = parsedComposition;
    compositionExLi["Li"] = parsedComposition["Li"] - liExtract;

    let fw = calcFormulaWeight(parsedComposition);
    let fwExLi = calcFormulaWeight(compositionExLi);

    let capacity = calc_capacity(fwExLi);
    let electrodeCapacity = calc_electrode_capacity(capacity, mass / 1000, efficiency);
    
    return {
        composition: composition,
        liExtract: liExtract,
        fw: fw,             // g mol-1
        fwExLi: fwExLi,     // g mol-1
        capacity: capacity, // mAh g-1
        efficiency: efficiency,
        mass: mass,         // mg
        electrodeCapacity: electrodeCapacity,   // mAh
    }
}

const calcForm = document.querySelector("form#electrodeInput");

window.addEventListener("load", () => {

    function submitForm() {
        const FD = new FormData(calcForm);

        let result = calculateAll(FD.get("composition"), FD.get("li-extract"), FD.get("mass"), FD.get("efficiency"));
        tableBody.appendChild(populateRow(result));
    }
    
    // Submit event handler
    calcForm.addEventListener("submit", (event) => {
        event.preventDefault();

        submitForm();
    });
});