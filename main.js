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
        // let strokeArr = ['1', '-x1', '-x2', '-x3', '-x4', '-x5']; //проверка
        // let artVars = ['-x1', '-x2', '-x3'];
        // // let result=artVars.replace('-x1', 0);
        // var string = "Six Kingdoms";
        // var result = string.replace("Six", "Seven");
        // console.log(result);
        genMatrix.genMatrix();
    });


    okBtn.addEventListener('click', () => {
        getValues.getValues();
    });
}