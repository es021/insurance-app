export function fix(item, inData) {
    let data = JSON.parse(JSON.stringify(inData));
    for (var i of item) {
        // ######################################
        // NUMBER
        if (i.type == "number") {
            try {
                data[i.key] = Number.parseInt(data[i.key]);
                if (isNaN(data[i.key])) {
                    data[i.key] = null;
                }
            } catch (err) { }
        }
        // ######################################
        // SELECT
        // else if (i.type == "select") {

        // }
        // ######################################
        else {
            if (!data[i.key]) {
                data[i.key] = "";
            }
        }
    }
    return data;
}


function getElement(formElement, name) {
    for (var i of formElement) {
        if (i.name == name) {
            return i;
        }
    }

    return null;
}
function isValEmpty(v) {
    return v === "" || v === null || typeof v === "undefined";
}
export function checkError(_this, formElement, item, inData) {
    let error = null;
    let data = JSON.parse(JSON.stringify(inData));

    // check empty
    var empty = [];
    for (var i of item) {

        if (isValEmpty(data[i.key]) && i.required) {
            empty.push({
                key: i.key,
                label: i.label,
                el: getElement(formElement, i.key)
            });
        }
    }

    if (empty.length > 0) {
        empty[0].el.focus();
        error = `Please fill in the following field(s):<br><b>${empty.map((d, i) => {
            return d.label;
        }).join(", ")}</b>`;
    }


    // if (formElement.reportValidity()) {

    // }
    return error;
}