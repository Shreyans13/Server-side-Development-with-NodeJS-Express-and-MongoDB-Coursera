let rect = require('./rectangle')
function solveRect(l,b) {
	console.log("Solving for l = " + l + " breadth = " + b)

	if (l <= 0 || b <= 0){
		console.log("The lengh or breadth cannot be zero\n")
	} else {
		console.log("The area of the rectangle is = " + rect.area(l,b))
		console.log("The perimeter of the rectangle is = " + rect.perimeter(l,b) + "\n") 
	}

}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);