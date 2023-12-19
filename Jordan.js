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
            this.matrixafg.forEach((arr, index) => {
                if (index != this.matrixafg.length - 1) {
                    this.roundedMatrix.push(arr);
                } else {
                    this.roundedMatrix.push(this.matrixafg[this.matrixafg.length - 1].map((elem) => elem = Math.round(elem)));
                }
            })

            console.log("шаг7 ", this.roundedMatrix);
        }
    }
    /*Шаг3*/
    checkStep3(gMatrix) {

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
                if (i < this.matrixafg.length - 2) {
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
            this.matrixafg = [];
            this.matrixB.forEach(arr => {
                this.matrixafg.push(arr);
            });
            this.matrixB = [];

            console.log("Матрица после жордана", this.matrixafg);

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
