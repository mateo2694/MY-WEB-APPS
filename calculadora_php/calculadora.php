<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Calculadora</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="style.css" rel="stylesheet">
    </head>
    <body>
        <?php
            $x = $_GET['x'];
            $y = $_GET['y'];
            $operation = $_GET['operation'];
        ?>

        <header>
            <h1>Calculadora para Dummies</h1>
        </header>
        <div id="container">
            <form action="calculadora.php" method="get" autocomplete="off">
                <input type="text" name="x" placeholder="Ingrese x" value=<?php if (isset($x)) echo $x;?>>
                <input type="text" name="y" placeholder="Ingrese y" value=<?php if (isset($y)) echo $y;?>>
                <label class="radio">+
                    <input type="radio" id="suma" name="operation" value="suma" checked>
                    <span class="checkmark"></span>
                </label>
                <label class="radio">-
                    <input type="radio" id="resta" name="operation" value="resta" <?php if (isset($operation) && $operation == "resta") echo "checked"?>>
                    <span class="checkmark"></span>
                </label>
                <label class="radio">x
                    <input type="radio" id="multiplicacion" name="operation" value="multiplicacion" <?php if (isset($operation) && $operation == "multiplicacion") echo "checked"?>>
                    <span class="checkmark"></span>
                </label>
                <label class="radio">/
                    <input type="radio" id="division" name="operation" value="division" <?php if (isset($operation) && $operation == "division") echo "checked"?>>
                    <span class="checkmark"></span>
                </label>
                <input type="submit" name="submit" value="Calcular">
            </form>
            <div id="result">
                <?php
                if (isset($x) && isset($y) && is_numeric($x) && is_numeric($y)) {
                    switch ($operation) {
                        case 'suma':
                            $ans = $x + $y;
                            break;
                        
                        case 'resta':
                            $ans = $x - $y;
                            break;
                        
                        case 'multiplicacion':
                            $ans = $x * $y;
                            break;
                        
                        case 'division':
                            $ans = $x / $y;
                            break;
                        
                        default:
                            $ans = 'ERROR';
                            break;
                    }

                    echo $ans;
                } else {
                    echo 'ERROR';
                }
                ?>
            </div>
        </div>
    </body>
</html>