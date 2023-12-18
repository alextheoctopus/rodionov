class GetValues {
    constructor(artificialVars) {
        this.matrixAFG = [];
        this.matrixB = [];
        this.flag = true;
        this.matrixForbidden = [];
        this.inputs = document.querySelectorAll('.smallInputs');
        this.inputsClmn = document.querySelectorAll('.smallInputsClmn');
        this.inputsStr = document.querySelectorAll('.smallInputsStr');
        this.artificialVars = artificialVars;
    }
    getValues() {

        this.inputs = document.querySelectorAll('.smallInputs');
        this.inputsClmn = document.querySelectorAll('.smallInputsClmn');
        this.inputsStr = document.querySelectorAll('.smallInputsStr');
        // записываем значения из инпутов в двумерный массив
        if (this.flag) {
            for (let j = 0; j < this.inputsClmn.length; j++) {
                const str = [];
                for (let i = j * this.inputsStr.length; i < j * this.inputsStr.length + this.inputsStr.length; i++) {
                    str.push(this.inputs[i].value - 0);
                }
                this.matrixAFG.push(str);
            }
            // matrixF = this.matrixAFG[this.matrixAFG.length - 2];
            // matrixG = this.matrixAFG[this.matrixAFG.length - 1];
            this.jordan = new Jordan(this.matrixAFG, this.inputsClmn, this.inputsStr,this.artificialVars);
            this.jordan.checkStep2(this.matrixAFG[this.matrixAFG.length - 1]);
            console.log("this.matrixAFG", this.matrixAFG);
            console.log("matrixF", this.matrixAFG[this.matrixAFG.length - 2]);
            console.log("matrixG", this.matrixAFG[this.matrixAFG.length - 1]);
        }
    }



    // jordan() {
    //     // индексы разрешающего элемента
    //     const k = inputK.value - 1;
    //     const s = inputS.value - 1;

    //     if (this.matrixAFG[s][k] != 0 && this.matrixForbidden.indexOf(s) == -1 && k != 0) {
    //         // заполняем массивы для первой строки и первого столбца (нули и иксы)
    //         console.log(k, s);
    //         let temp = columnArr[s];
    //         console.log("Строка ", temp);
    //         columnArr[s] = strokeArr[k].split('').splice(1, 3).join('');
    //         strokeArr[k] = temp;
    //         console.log("Колонка ", strokeArr);

    //         strokeDiv.innerHTML = strokeArr;
    //         columnDiv.innerHTML = columnArr;

    //         // выполняем преобразование матрицы коэффициентов
    //         this.matrixB = [];
    //         this.matrixB = this.switchElems(this.matrixAFG, k, s);

    //         // удаляем из матрицы В столбец (каждый k-ый элемент)
    //         for (let i = 0; i < this.matrixB.length; i++) {
    //             this.matrixB[i].splice(k, 1);
    //         }

    //         // матрица А = матрица В
    //         this.matrixAFG = [];
    //         for (let i = 0; i < this.matrixB.length; i++) {
    //             this.matrixAFG.push(this.matrixB[i].slice());
    //         }

    //         // преобразуем матрицу В в одномерный массив
    //         let arr2 = this.matrixB.flat();

    //         // удаляем лишние инпуты
    //         for (let i = k; i < this.inputs.length; i += this.inputsStr.length) {
    //             this.inputs[i].remove();
    //         }
    //         this.inputsStr[k].parentElement.removeChild(this.inputsStr[k]);

    //         // заполняем первую строку и первый столбец (нули и иксы)
    //         this.inputsStr.forEach((input, index) => {
    //             input.value = strokeArr[index];
    //         });
    //         this.inputsClmn.forEach((input, index) => {
    //             input.value = columnArr[index];
    //         });

    //         // удаляем лишний элемент массива из строки первой(нулевой удаляем)
    //         let deleteSymb = strokeArr.indexOf('0');
    //         console.log(strokeArr[deleteSymb]);
    //         strokeArr.splice(deleteSymb, 1);

    //         // заполняем инпуты (матрица коэффициентов)
    //         document.querySelectorAll('.smallInputs').forEach((input, index) => {
    //             input.value = arr2[index];
    //         });

    //         //запрещаем пользователю выбирать одну строку дважды
    //         this.matrixForbidden.push(s);
    //         //тут кажись удаляем нулевую строку, я не знаю убирать это или нет
    //         let z1 = columnArr.indexOf('0');
    //         let d = 0;
    //         if (this.matrixB[z1]) {
    //             this.matrixB[z1].forEach((value) => { if (value == 0) { d++ } });
    //             if (d == strokeArr.length) {
    //                 let massiveAlpha = [];
    //                 strokeArr.forEach((strX, ind) => {
    //                     if (ind != 0) {
    //                         matrixOutput.innerHTML += `<br>${strX.replace("-", "")} = a${ind}`;
    //                         massiveAlpha.push(`a${ind}`);
    //                     }
    //                 })
    //                 //         matrixOutput.innerHTML += showAnswer(this.matrixB);
    //                 columnArr.forEach((x, i) => {
    //                     if (x != 0) {
    //                         matrixOutput.innerHTML += `<br>${x} = ${this.matrixB[i][0]}`;
    //                         massiveAlpha.forEach((value, j) => {
    //                             matrixOutput.innerHTML += ` + ${this.matrixB[i][j + 1]} * (-${value})`
    //                         });
    //                     }
    //                 });
    //             }
    //         }
    //         if (strokeArr.length === 1) {
    //             columnArr.forEach((x, ind) => {
    //                 matrixOutput.innerHTML += `<br>${x} = ${this.matrixB[ind][0]}`;
    //             })
    //         }

    //     } else {
    //         if (this.matrixAFG[s][k] == 0) alert("Введите ненулевой элемент")
    //         else if (this.matrixForbidden.indexOf(s) + 1) alert("Выберите другую строку")
    //         else if (k == 0) alert("Выберите другой столбец")
    //     }

    //     this.flag = false;

    // }
}