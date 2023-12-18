class Jordan {
    constructor(matrixAFG, columnArr, strokeArr, artificialVars) {
        this.matrixAFG = matrixAFG;
        this.columnArr = [];
        columnArr.forEach((value) => this.columnArr.push(value.value));
        this.strokeArr = [];
        strokeArr.forEach((value) => this.strokeArr.push(value.value));
        this.matrixB = [];
        this.artificialVars = artificialVars;
    }

    /*Шаг 2*/
    checkStep2(gMatrix, fMatrix) {
        console.log(this.columnArr);
        console.log(this.strokeArr);
        console.log("artificialVars ", this.artificialVars);
        let checkFlag = true;
        gMatrix.forEach((value) => (value >= 0) ? checkFlag = true : checkFlag = false);
        console.log(gMatrix);

        if (checkFlag) {
            /*Шаг7*/
            // gMatrix.forEach((value, index) => {
            //     if (value == 0 && fMatrix[index] > 0) {

            //     }
            // });
            console.log('элементы нулевые');
        } else {
            /*Шаг3*/
            this.checkStep3(this.matrixAFG[this.matrixAFG.length - 1]);//gMatrix
        }
    }
    /*Шаг3*/
    checkStep3(gMatrix) {
        let min;
        gMatrix.forEach((value, ind) => {
            min = value;
            if (ind != 0) {
                value <= min ? min = value : '';//находим минимальный элемент с 1 индекса
            }
        })
        console.log('минимальный столбец ', min);
        let index = gMatrix.indexOf(min);
        let checkFlag = false;
        let k;
        let arrMins = [];
        //проверка на отрицательные элементы
        this.matrixAFG.forEach((arr, i) => {
            if (i < this.matrixAFG.length - 2) {//не проверять строку с f и g. они две последние
                arr[index] > 0 ? checkFlag = true : checkFlag;
            }
        });
        if (checkFlag) {
            // Шаг5
            this.matrixAFG.forEach((arr, i) => {
                if (i < this.matrixAFG.length - 2) {
                    arrMins.push(arr[0] / arr[index]);
                }
            });
            k = arrMins.indexOf(arrMins.reduce((x, y) => Math.min(x, y)));//индекс разрешающей строки
            console.log('индекс строки', k);
            //условие чтобы делать жордана видимо пока все искусственные перменные не будут в this.strokeArr
            if (!this.artificialVars.every(variable => this.strokeArr.includes(variable))) {//если делаешь while то зацкиливается
                let strArrS = this.strokeArr[index];
                this.strokeArr[index] = this.columnArr[k];
                this.columnArr[k] = strArrS;
                this.switchElems(this.matrixAFG, index, k);// Жордан с Aks
                this.matrixAFG = [];
                this.matrixB.forEach(arr => {
                    this.matrixAFG.push(arr);
                });
                this.matrixB = [];
                console.log("matrixAFG", this.matrixAFG);
                // надо посчитать g и f теперь самим и вызвать шаг2

            }// иначе неразрешима
        }
    }
    switchElems(matrixAFG, s, k) {
        for (let i = 0; i < matrixAFG.length; i++) {
            this.matrixB.push(matrixAFG[i].slice());
        }
        const a = matrixAFG[k][s];
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
        for (let i = 0; i < matrixAFG.length; i++) {
            if (i != k) {
                for (let j = 0; j < matrixAFG[i].length; j++) {
                    if (j != s) {
                        this.matrixB[i][j] = matrixAFG[i][j] - (matrixAFG[i][s] * matrixAFG[k][j] / a);
                    }
                }
            }
        }
        return this.matrixB;
    }
}
