REM Copy dependencies to the bin directory
mvn dependency:copy-dependencies -DoutputDirectory=bin

REM Compile the Java source code using javac
javac -cp "bin/*;src\main\java" src\main\java\com\oopproject\form\FormApplication.java