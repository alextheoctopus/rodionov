class Jordan {
    constructor(matrixAFG, columnArr, strokeArr, artificialVars) {

        this.matrixafg = [];
        matrixAFG.forEach(arr => {
            this.matrixafg.push(arr);
        });
        this.columnArr = [];
        columnArr.forEach((value) => this.columnArr.push(value.value));
        this.strokeArr = [];
        strokeArr.forEach((value) => this.strokeArr.push(value.value));
        this.matrixB = [];
        this.artificialVars = artificialVars;
        this.checkFlag = true;
        this.roundedMatrix = [];
    }

    /*Шаг 2*/
    checkStep2(gMatrix) {
        this.checkFlag = true;
        gMatrix.forEach((value) => {
            if (value < 0) this.checkFlag = false
        });

        console.log("gMatrix ", gMatrix);

        if (!this.checkFlag) {
            this.checkStep3(this.matrixafg[this.matrixafg.length - 1]);//gMatrix
        } else {
            // this.matrixafg.forEach((arr, index) => {//ОКРУГЛЕНИЕ
            //     if (index < this.matrixafg.length - 2) {
            //         this.roundedMatrix.push(arr);
            //     } else if (index == this.matrixafg.length - 2) {
            //         this.roundedMatrix.push(this.matrixafg[index].map((elem) => elem = Math.round(elem)));
            //     } else if (index == this.matrixafg.length - 1) {
            //         this.roundedMatrix.push(this.matrixafg[index].map((elem) => elem = Math.round(elem)));
            //     }
            // })
            this.checkStep7(this.matrixafg[this.matrixafg.length - 1], this.matrixafg[this.matrixafg.length - 2]);
            console.log("шаг7 ");
        }
    }
    /*Шаг3*/
    checkStep3(gMatrix) {
        console.log("ШАГ 3");

        const newArray = gMatrix.slice(1); // создаем новый массив без первого элемента
        const minElement = Math.min(...newArray);
        let index = gMatrix.indexOf(minElement);
        // let index = gMatrix.indexOf(-1);
        console.log("Матрица перед жорданом", this.matrixafg);

        console.log('минимальное значение', minElement, " столбец номер ", index + 1);
        let flag = false;
        let k;
        let arrMins = [];
        //проверка на отрицательные элементы
        this.matrixafg.forEach((arr, i) => {
            if (i < this.matrixafg.length - 2) {//не проверять строку с f и g. они две последние
                if (arr[index] > 0) { flag = true }
            }
        });
        if (flag) {
            // Шаг5
            this.matrixafg.forEach((arr, i) => {
                if (i < this.matrixafg.length - 2 && arr[index] != 0) {
                    arrMins.push(arr[0] / arr[index]);
                }
            });

            const positiveNumbers = arrMins.filter(num => num > 0);
            const minPositive = positiveNumbers.reduce((min, num) => Math.min(min, num), Infinity);
            k = arrMins.indexOf(minPositive);
            console.log("минимальное значение", minPositive, ' строка', k + 1);

            let strArrS = this.strokeArr[index];
            this.strokeArr[index] = this.columnArr[k];
            this.columnArr[k] = strArrS;

            this.switchElems(this.matrixafg, index, k);// Жордан с Aks

            this.matrixB.forEach(arr => {
                this.matrixafg.push(arr);
            });
            this.matrixB = [];

            console.log("Матрица после жордана", this.matrixafg);

            this.checkStep2(this.matrixafg[this.matrixafg.length - 1]);
            //}// иначе неразрешима
        } else {
            console.log("Задача неразрешима, так как в основной части таблицы нет положительных элементов");

        }
    }

    checkStep7(gMatrix, fMatrix) {
        console.log("ШАГ 7");

        let optimalPlan = true;

        for (let i = 1; i < gMatrix.length; i++) {
            if (optimalPlan) {
                if (gMatrix[i] == 0 && fMatrix[i] > 0) {
                    optimalPlan = true;
                } else {
                    optimalPlan = false;
                    this.checkStep8(fMatrix, gMatrix);
                }
            }
        }
        if (optimalPlan) {
            console.log("Optimal Plan ", this.matrixafg);
        }
    }

    checkStep8(fMatrix, gMatrix) {

        console.log("ШАГ 8");
        let s;
        const negativeNumbers = fMatrix.filter((num, index) => { if (gMatrix[index] == 0) return num < 0 });
        const minNegative = negativeNumbers.reduce((min, num) => Math.min(min, num), Infinity);
        s = fMatrix.indexOf(minNegative);//столбец
        let k;
        let arrMins = [];
        //находим подходящую строку
        this.matrixafg.forEach((arr, i) => {
            if (i < this.matrixafg.length - 2 && arr[s] != 0) {
                arrMins.push(arr[0] / arr[s]);
            }
        });

        const positiveNumbers = arrMins.filter(num => num > 0);
        const minPositive = positiveNumbers.reduce((min, num) => Math.min(min, num), Infinity);
        k = arrMins.indexOf(minPositive);
        if (k != -1) {
            this.switchElems(this.matrixafg, s, k);
            this.checkStep7(this.matrixafg[this.matrixafg.length - 1], this.matrixafg[this.matrixafg.length - 2]);
        } else {
            console.log("Задача неразрешима на шаге 9");
        }
    }

    switchElems(matrixafg, s, k) {
        for (let i = 0; i < matrixafg.length; i++) {
            this.matrixB.push(matrixafg[i].slice());
        }
        const a = matrixafg[k][s];
        this.matrixB[k][s] = 1 / a;
        this.matrixB[k].forEach((elem, i) => {
            if (i != s) {
                this.matrixB[k][i] = elem / a;
            }
        }
        );
        this.matrixB.forEach((str, i) => {
            if (i != k)
                str[s] /= -a;
        });
        for (let i = 0; i < matrixafg.length; i++) {
            if (i != k) {
                for (let j = 0; j < matrixafg[i].length; j++) {
                    if (j != s) {
                        this.matrixB[i][j] = matrixafg[i][j] - (matrixafg[i][s] * matrixafg[k][j] / a);
                    }
                }
            }
        }
        this.matrixB.forEach((arr, index) => {
            if (index < this.matrixB.length - 2) {
                this.roundedMatrix.push(arr)
            } else if (index == this.matrixB.length - 2) {
                this.roundedMatrix.push(arr.map((elem) => Math.round(elem)))
            } else if (index == this.matrixB.length - 1) {
                this.roundedMatrix.push(arr.map((elem) => Math.round(elem)))
            }
        });
        this.matrixB = [];
        this.roundedMatrix.forEach((arr) => { this.matrixB.push(arr); });
        this.roundedMatrix = [];
        this.matrixafg = [];
        return this.matrixB;
    }
}
