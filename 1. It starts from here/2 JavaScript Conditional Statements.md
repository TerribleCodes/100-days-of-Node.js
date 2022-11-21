# Conditional Statements

A basic decision making method.

```javascript
var age = window.prompt("Enter your age");

if (age<18){
    console.log("Hello 12 y/o")
}

else if (age==18){
    console.log("Legal")
}

else if (age>18){
    console.log("Boomerang")
}

else{
    console.log("4th Dimension")
}
```

# Switch Statements

```javascript
var grade = window.prompt("Enter your grade")
grade = grade.toUpperCase();

switch (grade){
    case "A":
        console.log("75-100");
        break;
    case "B":
        console.log("65-75");
        break;
    case "C":
        console.log("45-65");
        break;
    default:
        console.log("invalid grade");
        break;
}
```

# Logical Operators

`&&` - And  
`||` - Or  
`!` - Not  

```javascript
var temp = ;

if (temp>0 && temp<15){
    console.log("It's cold outside");
}
else if (temp>15 && temp<100){
    console.log("It's warm outside");
}
else if (temp<0 || temp>100){
    console.log("Prepare to die");
}
```

# A small verification logic
```javascript
var myName = window.prompt("Enetr a name")

if (myName==""){
    console.log("You did not enter anything")
}
else {
    console.log("Hello", myName)
}
```


