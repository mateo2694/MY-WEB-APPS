function calculate(form) {
    var x = Number(form['x'].value);
    var y = Number(form['y'].value);
    var operation = form['operation'].value;

    if (!(isNaN(x)) && !(isNaN(y)) && (operation != undefined)) {
        var result = null;

        switch (operation) {
            case 'suma':
                result = x + y;
                break;

            case 'resta':
                result = x - y;
                break;

            case 'multiplicacion':
                result = x * y;
                break;

            case 'division':
                result = x / y;
                break;

            default:
                result = 'ERROR';
                break;
        }

        if ((typeof result == 'number') && (result % 1 != 0)) {
            result = result.toFixed(5);
        }

        document.querySelector('#result').textContent = result;
    } else {
        document.querySelector('#result').textContent = 'ERROR';
    }
}