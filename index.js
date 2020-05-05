window.onload = function() {
	const grid = document.querySelector(".grid");
	const result = document.querySelector("#result");
	let interval = 0;
	let score = 0;
	let currentShooterIndex = 202;
	let currentIndex = 0;
	let direction = 1;
	const invadersTakkenDown = [];
	let intervalTime = 0;
	let shootInterval = 0;
	let currentShoot = 202;
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
		let currentShooterIndex = 202;
		squares.forEach((sq) => sq.classList.remove("invaders"));
		squares.forEach((sq) => sq.classList.remove("shooter"));
		for (let i = 0; i < invaders.length; i++) {
			squares[invaders[currentIndex + i]].classList.add("invaders");
		}
		squares[202].classList.add("shooter");
		console.log(squares);
		interval = setInterval(invMove, 500);

		win();
		lose();
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

	//Shooter move
	function shooterMove(e) {
		console.log(e.keyCode);
		const squares = document.querySelectorAll(".grid div");
		const x = parseInt(document.querySelector("#dim-x").value);
		squares[currentShooterIndex].classList.remove("shooter");
		if (e.keyCode === 37 && currentShooterIndex % x > 0)
			currentShooterIndex -= 1;
		else if (e.keyCode === 39 && currentShooterIndex % x < x - 1)
			currentShooterIndex += 1;
		squares[currentShooterIndex].classList.add("shooter");
		currentShoot = currentShooterIndex;
	}

	//shooter one shoot
	function shoot(e) {
		if (e.keyCode === 13) shootInterval = setInterval(shootDown, 100);
	}

	function shootDown() {
		const squares = document.querySelectorAll(".grid div");
		const x = parseInt(document.querySelector("#dim-x").value);

		squares[currentShoot].classList.remove("shoot");
		if (currentShoot - x > 0) {
			currentShoot -= x;
			squares[currentShoot].classList.add("shoot");
			if (squares[currentShoot].classList.contains("invaders")) {
				squares[currentShoot].classList.remove("invaders");
				squares[currentShoot].classList.remove("shoot");
				squares[currentShoot].classList.add("bam");
				setTimeout(() => {
					squares[currentShoot].classList.remove("bam");
				}, 200);
				score++;
				invadersTakkenDown.push("invader");
				clearInterval(shootInterval);
				console.log("Indeksa e ", invaders.indexOf(currentShoot));
				let ind = invaders.indexOf(currentShoot);
				invaders = invaders.splice(ind, 1);
			}
		}
	}

	function win() {
		if (invadersTakkenDown.length === invaders.length) {
			alert("You win");
			clearInterval(interval);
		}
	}

	function lose() {
		const squares = document.querySelectorAll(".grid div");
		const x = parseInt(document.querySelector("#dim-x").value);
		if (
			squares[currentShooterIndex].classList.contains("invaders") ||
			squares[squares.length - x - 1].classList.contains("invaders")
		) {
			alert("You lose");
			clearInterval(interval);
		}
	}

	function clearBoard() {
		grid.innerHTML = "";
		createBoard();
	}

	document.querySelector("#newGame").addEventListener("click", start);
	document.addEventListener("keydown", shooterMove);
	document.addEventListener("keyup", shoot);
};
