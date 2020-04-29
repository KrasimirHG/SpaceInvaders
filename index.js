window.onload = function() {
	const grid = document.querySelector(".grid");
	const result = document.querySelector("#result");
	let interval = 0;
	let score = 0;
	let currentIndex = 0;

	let direction = 1;
	let speed = 0.9;
	let intervalTime = 0;
	const invaders = [
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		23,
		24,
		30,
		31,
		32,
		33,
		34,
		35,
		36,
		37,
		38,
		39,
	];

	function createBoard() {
		const y = parseInt(document.querySelector("#dim-y").value);
		console.log("redovete sa: ", y);
		const x = parseInt(document.querySelector("#dim-x").value);
		console.log("colonite sa: ", x);
		let wid = 20 * x;
		let hei = 20 * y;
		grid.style.width = wid;
		grid.style.height = hei;
		for (let i = 0; i < x * y; i++) {
			var block = document.createElement("div");
			grid.appendChild(block);
		}
	}

	createBoard();

	function start() {
		//reset
		clearBoard();
		const squares = document.querySelectorAll(".grid div");
		let currentIndex = 0;

		squares.forEach((sq) => sq.classList.remove("invaders"));
		squares.forEach((sq) => sq.classList.remove("shooter"));
		for (let i = 0; i < invaders.length; i++) {
			squares[invaders[currentIndex + i]].classList.add("invaders");
		}
		squares[202].classList.add("shooter");
		console.log(squares);
		setInterval(invMove, 500);
	}

	//Invaders move
	function invMove() {
		const x = parseInt(document.querySelector("#dim-x").value);
		const squares = document.querySelectorAll(".grid div");
		const aliens = document.querySelectorAll(".invaders");
		let leftEdge = 0;
		let rightEdge = x;
		let lastLeft = aliens[0];
		let lastRight = aliens[aliens.length - 1];
		if (lastRight % x === x - 1 && direction === 1) {
			currentIndex += x;
			direction = -1;
		} else if (lastLeft % x === 0 && direction === -1) {
			currentIndex += x;
			direction = 1;
		}

		squares.forEach((sq) => sq.classList.remove("invaders"));
		for (let i = 0; i <= invaders.length - 1; i++) {
			invaders[i] += direction;
		}
		for (let i = 0; i < invaders.length; i++) {
			squares[invaders[currentIndex + i]].classList.add("invaders");
		}
	}

	function clearBoard() {
		grid.innerHTML = "";
		createBoard();
	}

	document.querySelector("#newGame").addEventListener("click", start);
};
