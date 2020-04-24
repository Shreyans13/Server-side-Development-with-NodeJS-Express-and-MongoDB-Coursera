// var rect = {
// 	perimeter: (x,y) => (2*(x+y)),
// 	area: (x,y) => (x*y)
// };

var rect = require('./rectangle')
function solveRect(l,b) {
	console.log("Solving for l = " + l + "breadth = " + b)

// 	if (l <= 0 || b <= 0){
// 		console.log("")
// 	} else {
// 		console.log("The area of the rectangle is = " + rect.area(l,b) + "\n")
// 		console.log("The perimeter of the rectangle is = " + rect.perimeter(l,b) + "\n") 
// 	}


rect(l,b, (err, rectangle) => {
	if (err) {
		console.log("ERROR: " + err.message);
	} else {
		console.log("The area of the rectangle is = " + rectangle.area() + "\n")
		console.log("The perimeter of the rectangle is = " + rectangle.perimeter() + "\n") 
	}
});
console.log("This statement is after the call to rect")
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);