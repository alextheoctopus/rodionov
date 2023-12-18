class Jordan {
    constructor(matrixAFG, columnArr, strokeArr, artificialVars) {

        this.matrixafg = [];
        matrixAFG.forEach(arr => {
            this.matrixafg.push(arr);
        })

        this.columnArr = [];
        columnArr.forEach((value) => this.columnArr.push(value.value));
        this.strokeArr = [];
        strokeArr.forEach((value) => this.strokeArr.push(value.value));
        this.matrixB = [];
        this.artificialVars = artificialVars;
        this.checkFlag = true;
    }

    /*Шаг 2*/
    checkStep2(gMatrix) {
        gMatrix.forEach((value) => { if (value < 0) this.checkFlag = false });

        console.log(gMatrix);

        if (!this.checkFlag) {
            this.checkStep3(this.matrixafg[this.matrixafg.length - 1]);//gMatrix
        } else {
            console.log("шаг7");
            /*Шаг7*/

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
        });
        console.log('минимальный столбец ', min);
        let index = gMatrix.indexOf(min);
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
                if (i < this.matrixafg.length - 2) {
                    console.log("arr[index] ", arr[index]);
                    arrMins.push(arr[0] / arr[index]);
                    console.log("arrMins ", arrMins);
                }
            });
            // k = arrMins.indexOf(arrMins.reduce((x, y) => Math.min(x, y)));//индекс разрешающей строки
            let minEl;
            arrMins.forEach((value, i) => {
                minEl = value;
                (minEl >= value && value > 0) ? k = i : '';
            });
            console.log('индекс строки', k);

            let strArrS = this.strokeArr[index];
            this.strokeArr[index] = this.columnArr[k];
            this.columnArr[k] = strArrS;

            this.switchElems(this.matrixafg, index, k);// Жордан с Aks
            this.matrixafg = [];
            this.matrixB.forEach(arr => {
                this.matrixafg.push(arr);
            });
            this.matrixB = [];
            console.log("matrixafg", this.matrixafg);
            this.checkFlag = true;
            this.checkStep2(this.matrixafg[this.matrixafg.length - 1]);
            //}// иначе неразрешима
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
        return this.matrixB;
    }
}
