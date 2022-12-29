const FARADAY = 96485;  // C mol-1
const HOUR = 3600;      // s

const table = document.querySelector('table#results')
const tableBody = table.childNodes[1];

//////////////////

const elemRegex = /([A-Z][a-z]?)(\d?)/g
const elements = {"H": {"mass": 1.007975, "name": "Hydrogen", "number": 1}, "He": {"mass": 4.002602, "name": "Helium", "number": 2}, "Li": {"mass": 6.967499999999999, "name": "Lithium", "number": 3}, "Be": {"mass": 9.0121831, "name": "Beryllium", "number": 4}, "B": {"mass": 10.8135, "name": "Boron", "number": 5}, "C": {"mass": 12.0106, "name": "Carbon", "number": 6}, "N": {"mass": 14.006855, "name": "Nitrogen", "number": 7}, "O": {"mass": 15.9994, "name": "Oxygen", "number": 8}, "F": {"mass": 18.998403162, "name": "Fluorine", "number": 9}, "Ne": {"mass": 20.1797, "name": "Neon", "number": 10}, "Na": {"mass": 22.98976928, "name": "Sodium", "number": 11}, "Mg": {"mass": 24.3055, "name": "Magnesium", "number": 12}, "Al": {"mass": 26.9815384, "name": "Aluminium", "number": 13}, "Si": {"mass": 28.085, "name": "Silicon", "number": 14}, "P": {"mass": 30.973761998, "name": "Phosphorus", "number": 15}, "S": {"mass": 32.067499999999995, "name": "Sulfur", "number": 16}, "Cl": {"mass": 35.451499999999996, "name": "Chlorine", "number": 17}, "Ar": {"mass": 39.8775, "name": "Argon", "number": 18}, "K": {"mass": 39.0983, "name": "Potassium", "number": 19}, "Ca": {"mass": 40.078, "name": "Calcium", "number": 20}, "Sc": {"mass": 44.955907, "name": "Scandium", "number": 21}, "Ti": {"mass": 47.867, "name": "Titanium", "number": 22}, "V": {"mass": 50.9415, "name": "Vanadium", "number": 23}, "Cr": {"mass": 51.9961, "name": "Chromium", "number": 24}, "Mn": {"mass": 54.938043, "name": "Manganese", "number": 25}, "Fe": {"mass": 55.845, "name": "Iron", "number": 26}, "Co": {"mass": 58.933194, "name": "Cobalt", "number": 27}, "Ni": {"mass": 58.6934, "name": "Nickel", "number": 28}, "Cu": {"mass": 63.546, "name": "Copper", "number": 29}, "Zn": {"mass": 65.38, "name": "Zinc", "number": 30}, "Ga": {"mass": 69.723, "name": "Gallium", "number": 31}, "Ge": {"mass": 72.63, "name": "Germanium", "number": 32}, "As": {"mass": 74.921595, "name": "Arsenic", "number": 33}, "Se": {"mass": 78.971, "name": "Selenium", "number": 34}, "Br": {"mass": 79.904, "name": "Bromine", "number": 35}, "Kr": {"mass": 83.798, "name": "Krypton", "number": 36}, "Rb": {"mass": 85.4678, "name": "Rubidium", "number": 37}, "Sr": {"mass": 87.62, "name": "Strontium", "number": 38}, "Y": {"mass": 88.905838, "name": "Yttrium", "number": 39}, "Zr": {"mass": 91.224, "name": "Zirconium", "number": 40}, "Nb": {"mass": 92.90637, "name": "Niobium", "number": 41}, "Mo": {"mass": 95.95, "name": "Molybdenum", "number": 42}, "Tc": {"mass": null, "name": "Technetium", "number": 43}, "Ru": {"mass": 101.07, "name": "Ruthenium", "number": 44}, "Rh": {"mass": 102.90549, "name": "Rhodium", "number": 45}, "Pd": {"mass": 106.42, "name": "Palladium", "number": 46}, "Ag": {"mass": 107.8682, "name": "Silver", "number": 47}, "Cd": {"mass": 112.414, "name": "Cadmium", "number": 48}, "In": {"mass": 114.818, "name": "Indium", "number": 49}, "Sn": {"mass": 118.71, "name": "Tin", "number": 50}, "Sb": {"mass": 121.76, "name": "Antimony", "number": 51}, "Te": {"mass": 127.6, "name": "Tellurium", "number": 52}, "I": {"mass": 126.90447, "name": "Iodine", "number": 53}, "Xe": {"mass": 131.293, "name": "Xenon", "number": 54}, "Cs": {"mass": 132.90545196, "name": "Caesium", "number": 55}, "Ba": {"mass": 137.327, "name": "Barium", "number": 56}, "La": {"mass": 138.90547, "name": "Lanthanum", "number": 57}, "Ce": {"mass": 140.116, "name": "Cerium", "number": 58}, "Pr": {"mass": 140.90766, "name": "Praseodymium", "number": 59}, "Nd": {"mass": 144.242, "name": "Neodymium", "number": 60}, "Pm": {"mass": null, "name": "Promethium", "number": 61}, "Sm": {"mass": 150.36, "name": "Samarium", "number": 62}, "Eu": {"mass": 151.964, "name": "Europium", "number": 63}, "Gd": {"mass": 157.25, "name": "Gadolinium", "number": 64}, "Tb": {"mass": 158.925354, "name": "Terbium", "number": 65}, "Dy": {"mass": 162.5, "name": "Dysprosium", "number": 66}, "Ho": {"mass": 164.930329, "name": "Holmium", "number": 67}, "Er": {"mass": 167.259, "name": "Erbium", "number": 68}, "Tm": {"mass": 168.934219, "name": "Thulium", "number": 69}, "Yb": {"mass": 173.045, "name": "Ytterbium", "number": 70}, "Lu": {"mass": 174.9668, "name": "Lutetium", "number": 71}, "Hf": {"mass": 178.486, "name": "Hafnium", "number": 72}, "Ta": {"mass": 180.94788, "name": "Tantalum", "number": 73}, "W": {"mass": 183.84, "name": "Tungsten", "number": 74}, "Re": {"mass": 186.207, "name": "Rhenium", "number": 75}, "Os": {"mass": 190.23, "name": "Osmium", "number": 76}, "Ir": {"mass": 192.217, "name": "Iridium", "number": 77}, "Pt": {"mass": 195.084, "name": "Platinum", "number": 78}, "Au": {"mass": 196.96657, "name": "Gold", "number": 79}, "Hg": {"mass": 200.592, "name": "Mercury", "number": 80}, "Tl": {"mass": 204.3835, "name": "Thallium", "number": 81}, "Pb": {"mass": 207.04, "name": "Lead", "number": 82}, "Bi": {"mass": 208.9804, "name": "Bismuth", "number": 83}, "Po": {"mass": null, "name": "Polonium", "number": 84}, "At": {"mass": null, "name": "Astatine", "number": 85}, "Rn": {"mass": null, "name": "Radon", "number": 86}, "Fr": {"mass": null, "name": "Francium", "number": 87}, "Ra": {"mass": null, "name": "Radium", "number": 88}, "Ac": {"mass": null, "name": "Actinium", "number": 89}, "Th": {"mass": 232.0377, "name": "Thorium", "number": 90}, "Pa": {"mass": 231.03588, "name": "Protactinium", "number": 91}, "U": {"mass": 238.02891, "name": "Uranium", "number": 92}, "Np": {"mass": null, "name": "Neptunium", "number": 93}, "Pu": {"mass": null, "name": "Plutonium", "number": 94}, "Am": {"mass": null, "name": "Americium", "number": 95}, "Cm": {"mass": null, "name": "Curium", "number": 96}, "Bk": {"mass": null, "name": "Berkelium", "number": 97}, "Cf": {"mass": null, "name": "Californium", "number": 98}, "Es": {"mass": null, "name": "Einsteinium", "number": 99}, "Fm": {"mass": null, "name": "Fermium", "number": 100}, "Md": {"mass": null, "name": "Mendelevium", "number": 101}, "No": {"mass": null, "name": "Nobelium", "number": 102}, "Lr": {"mass": null, "name": "Lawrencium", "number": 103}, "Rf": {"mass": null, "name": "Rutherfordium", "number": 104}, "Db": {"mass": null, "name": "Dubnium", "number": 105}, "Sg": {"mass": null, "name": "Seaborgium", "number": 106}, "Bh": {"mass": null, "name": "Bohrium", "number": 107}, "Hs": {"mass": null, "name": "Hassium", "number": 108}, "Mt": {"mass": null, "name": "Meitnerium", "number": 109}, "Ds": {"mass": null, "name": "Darmstadtium", "number": 110}, "Rg": {"mass": null, "name": "Roentgenium ", "number": 111}, "Cn": {"mass": null, "name": "Copernicium", "number": 112}, "Nh": {"mass": null, "name": "Nihonium", "number": 113}, "Fl": {"mass": null, "name": "Flerovium", "number": 114}, "Mc": {"mass": null, "name": "Moscovium", "number": 115}, "Lv": {"mass": null, "name": "Livermorium", "number": 116}, "Ts": {"mass": null, "name": "Tennessine", "number": 117}, "Og": {"mass": null, "name": "Oganesson", "number": 118}};

function parseChemicalFormula(formulaString) {
    let matches = [...formulaString.matchAll(elemRegex)];
    let parsed = {};
    matches.forEach(function(m) {
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

function calc_electrode_capacity(specificCapacity, mass, liFrac) {
    // specificCapacity of electrode compound - mAh g-1
    // mass of (active) electrode used - g
    // liFrac - degree to which Li can be removed (fraction)
    return specificCapacity * mass * liFrac;
}

function populateRow(result) {
    let trResult = document.createElement('tr')

    for(const col in result) {
        let tdResult = document.createElement('td');
        let val;
        if (typeof(result[col]) === "number") {
            val = result[col].toFixed(3);
        } else {
            val = result[col]
        }
        tdResult.textContent = val;
        trResult.appendChild(tdResult);
    };
    
    let cValues = [1, 0.5, 0.2, 0.1];
    cValues.forEach(function(val) {
        let tdCVal = document.createElement('td');
        tdCVal.textContent = (result.electrodeCapacity * val).toFixed(3);
        trResult.appendChild(tdCVal);
    });

    return trResult;
}

function calculateAll(composition, mass, liFrac) {
    let parsedComposition = parseChemicalFormula(composition);
    delete parsedComposition["Li"];
    let fwNoLi = calcFormulaWeight(parsedComposition);

    let capacity = calc_capacity(fwNoLi);
    let electrodeCapacity = calc_electrode_capacity(capacity, mass / 1000, liFrac);
    
    return {
        composition: composition,
        fwNoLi: fwNoLi,     // g mol-1
        capacity: capacity, // mAh g-1
        liFrac: liFrac,
        mass: mass,         // mg
        electrodeCapacity: electrodeCapacity,
    }
}

const calcForm = document.querySelector("form#electrodeInput");

window.addEventListener("load", () => {

    function submitForm() {
        const FD = new FormData(calcForm);

        let result = calculateAll(FD.get("composition"), FD.get("mass"), FD.get("liFrac"));
        tableBody.appendChild(populateRow(result));
    }
    
    // Submit event handler
    calcForm.addEventListener("submit", (event) => {
        event.preventDefault();

        submitForm();
    });
});