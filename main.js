window.onload = () => {


    const genMatrixBtn = document.getElementById("genMatrix");
    const okBtn = document.createElement('button');
    let artificialVars = [];
    const genMatrix = new GenMatrix(okBtn, artificialVars);
    const inputs = document.querySelectorAll('.smallInputs');
    const inputsClmn = document.querySelectorAll('.smallInputsClmn');
    const inputsStr = document.querySelectorAll('.smallInputsStr');
    const getValues = new GetValues(artificialVars);

    genMatrixBtn.addEventListener('click', () => {
        let matrixB = [[0.3333333333333333, 0.1111111111111111, -0.4444444444444444, 0.2222222222222222, -0.5555555555555556, 0.1111111111111111],
        [7.666666666666667, 0.5555555555555556, -1.2222222222222223, -1.8888888888888888, 1.2222222222222223, 0.5555555555555556],
        [1.3333333333333333, 0.1111111111111111, 0.5555555555555556, -0.7777777777777778, 0.4444444444444444, 0.1111111111111111],
        [-1.3333333333333333, 1.5555555555555556, 7.777777777777778, -5.888888888888889, 3.2222222222222223, -0.4444444444444444],
        [-9, -0.6666666666666667, 0.6666666666666667, 2.6666666666666665, -1.6666666666666667, 0.3333333333333333]];
        let roundedMatrix = [];
        matrixB.forEach((arr) => {
            roundedMatrix.push(arr.map((elem) => Math.round(elem * 100) / 100))
        });
        matrixB = [];
        roundedMatrix.forEach((arr) => { matrixB.push(arr); });
        console.log("MATRIXB ", matrixB);
        genMatrix.genMatrix();
    });


    okBtn.addEventListener('click', () => {
        getValues.getValues();
    });
}