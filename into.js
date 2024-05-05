
document.addEventListener("DOMContentLoaded", function () {
    const units = {
        gn: {
            femto: 1e-15,
            pico: 1e-12,
            nano: 1e-9,
            micro: 1e-6,
            milli: 1e-3,
            centi: 1e-2,
            deci: 1e-1,
            basic: 1,
            kilo: 1e3,
            mega: 1e6,
            giga: 1e9,
            tera: 1e12,
            peta: 1e15
        },
        tp: {
            C: [1, 0],
            K: [1, 273.15],
            F: [9 / 5, 32]
        },
        ps: {
            Bar: 100000,
            Pascal: 1,
            IncM: 3386.388
        },
        en: {
            watt: 1,
            Joule: 100,
            hp: 745.7
        }
    };

    const Measurement = document.getElementById("Measurement");
    const enterInput = document.getElementById('enter');
    const productionOutput = document.getElementById('production');
    const dropdownContent1 = document.getElementById('dropdown_content');
    const dropdownContent2 = document.getElementById('dropdown_content_2');

    function populateDropdowns(unitType) {
        const unitData = units[unitType];
        [dropdownContent1, dropdownContent2].forEach(dropdown => {
            dropdown.innerHTML = ''; // Clear previous options
            for (let unit in unitData) {
                const li = document.createElement('li');
                li.textContent = unit;
                li.onclick = function () { updateUnits(dropdown, unit); };
                dropdown.appendChild(li);
            }
        });
    }

    Measurement.addEventListener('change', function () {
        // Reset the input field and production output
        enterInput.value = '';
        productionOutput.textContent = '';

        // Reset the text content of the buttons to "Select"
        document.querySelectorAll(".dropbtn").forEach(button => {
            button.textContent = "Select";
        });

        // Populate the dropdowns with the new units
        populateDropdowns(this.value);
    });


    function updateUnits(dropdown, newUnit) {
        dropdown.previousElementSibling.textContent = newUnit;
        calculateAndDisplay();
    }
    
    enterInput.addEventListener('input', function () {
        calculateAndDisplay();
    });

    function calculateAndDisplay() {
        const fromUnit = dropdownContent1.previousElementSibling.textContent;
        const toUnit = dropdownContent2.previousElementSibling.textContent;
        const value = parseFloat(enterInput.value);
        if (!isNaN(value) && fromUnit && toUnit) {
            let convertedValue = convertUnits(value, fromUnit, toUnit, Measurement.value);
            productionOutput.textContent = `${value} ${fromUnit} = ${convertedValue} ${toUnit}`;
        } else {
            productionOutput.textContent = 'Invalid input or unit selection'; // Handle invalid input
        }
    }
    function convertUnits(value, from, to, type) {
        const unitData = units[type];
        if (type === 'tp') { // Temperature needs special handling
            return (value * unitData[from][0] + unitData[from][1] - unitData[to][1]) / unitData[to][0];
        } else { // Other unit conversions
            return value * (unitData[from] / unitData[to]);
        }
    }

    // Initialize dropdowns with 'general' units by default
    populateDropdowns('gn');
});

