class GenMatrix {
    constructor(okButton,artificialVars) {
        this.matrixOutput = document.getElementById("matrixOutput");
        this.genMatrixBtn = document.getElementById("genMatrix");
        this.matrixWidthInput = document.getElementById("matrixWidth");
        this.matrixHeightInput = document.getElementById("matrixHeight");
        this.okBtn = okButton;
        this.inputK = document.createElement('input');
        this.inputS = document.createElement('input');
        this.strokeDiv = document.createElement('div');
        this.columnDiv = document.createElement('div');
        this.artificialVars = artificialVars;
        this.width;
        this.height;
        this.columnArr = [];
        this.strokeArr = [];
    }
    genMatrix() {
        this.matrixOutput.innerHTML = '';
        this.matrixOutput.innerHTML += 'Задайте матрицу коэффициентов: ';
        this.width = this.matrixWidthInput.value - 0;
        this.height = this.matrixHeightInput.value - 0;
        this.columnDiv.width = '30px';
        this.matrixOutput.appendChild(this.strokeDiv);
        this.matrixOutput.appendChild(this.columnDiv);
        for (let i = 0; i <= this.height + 2; i++) {
            const str = document.createElement('div');
            for (let j = 0; j < this.width + 1; j++) {
                const field = document.createElement('input');
                if (j == 0 && i == 0) {
                    field.setAttribute('class', 'smallInputsReadOnly');
                    field.setAttribute('value', '');
                    str.appendChild(field);
                }// пустой квадратик
                if (i == 0 && j != 0) {
                    let ind = j;
                    field.setAttribute('readonly', 'true');
                    field.setAttribute('class', 'smallInputsStr');
                    if (j == 1) {
                        field.setAttribute('value', '1');
                        this.strokeArr.push('1');
                    } else {
                        field.setAttribute('value', '-x' + (ind - 1));
                        this.strokeArr.push('-x' + (ind - 1));
                    }
                    str.appendChild(field);
                }
                if (j == 0 && i != 0 && i != this.height + 1 && i != this.height + 2) {
                    let name = 'x' + (this.width - 1 + i);
                    this.columnArr.push(name);
                    field.setAttribute('readonly', 'true');
                    field.setAttribute('class', 'smallInputsClmn');
                    field.setAttribute('value', name);
                    str.appendChild(field);
                    if (i < this.height + 1) {
                        this.artificialVars.push(name);
                    }
                }
                if (j != 0 && i != 0 && i != this.height + 1 && i != this.height + 2) {
                    field.setAttribute('class', 'smallInputs');
                    field.setAttribute('placeholder', '0');
                    str.appendChild(field);
                }
                if (i == this.height + 1) {//f , для них отдельные инпуты
                    field.setAttribute('class', 'smallInputs');
                    if (j == 0) {
                        field.setAttribute('class', 'smallInputsClmn');
                        field.setAttribute('value', 'f');
                        field.setAttribute('readonly', 'true');
                        // strokeArr.push('f');
                    } else {
                        // field.setAttribute('class', 'fInputs');
                        field.setAttribute('placeholder', '0');
                    }
                    str.appendChild(field);
                }
                if (i == this.height + 2) {//g, для них отдельные инпуты
                    field.setAttribute('class', 'smallInputs');
                    if (j == 0) {
                        field.setAttribute('class', 'smallInputsClmn');
                        field.setAttribute('value', 'g');
                        field.setAttribute('readonly', 'true');
                        // strokeArr.push('g');
                    } else {
                        // field.setAttribute('class', 'smallInputs');
                        field.setAttribute('placeholder', '0');
                    }
                    str.appendChild(field);
                }
            }
            this.matrixOutput.appendChild(str);
        }
        this.matrixOutput.innerHTML += 'Задайте разрешающий элемент: ';

        const inputs = document.querySelectorAll('.smallInputs');
        inputs.forEach((input, i, inputs) => input.addEventListener('keydown', () => {
            if (event.keyCode == '39') {
                if (inputs[i + 1]) inputs[i + 1].focus();
            } else if (event.keyCode == '37') {
                if (inputs[i - 1]) inputs[i - 1].focus();
            }
        }));

        this.inputK.setAttribute('placeholder', 'столбец');
        this.matrixOutput.appendChild(this.inputK);

        this.inputS.setAttribute('placeholder', 'строка');
        this.matrixOutput.appendChild(this.inputS);

        this.okBtn.innerHTML = 'OK';
        this.matrixOutput.appendChild(this.okBtn);
    }
}