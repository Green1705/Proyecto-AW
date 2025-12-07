const cars = [
	{ name: "Nissan Leaf", matricula: "EV-001-MD", autonomia: 320, estado: "Disponible", image: "images/nissan_leaf.png" },
	{ name: "Tesla Model 3", matricula: "EV-010-MD", autonomia: 420, estado: "Reservado", image: "images/tesla_model3.png" },
	{ name: "Renault Zoe", matricula: "EV-200-BCN", autonomia: 280, estado: "Disponible", image: "images/renault_zoe.png" },
	{ name: "Hyundai Kona", matricula: "EV-555-VLC", autonomia: 360, estado: "Mantenimiento", image: "images/hyundai_kona.png" },
];

function renderCards(containerId, items, templateFn) {
	const container = document.getElementById(containerId);
	if (!container) return;
	container.innerHTML = items.map(templateFn).join("");
}

renderCards("cars-grid", cars, (car) => `
	<div class="col-12 col-md-6 d-flex mb-3 justify-content-center">
		<div class="card h-100 shadow-sm">
			<img src="${car.image}" class="card-img-top" alt="${car.name}">
			<div class="card-body">
				<h3 class="card-title h5">${car.name}</h3>
				<p class="card-text mb-1"><strong>Matrícula:</strong> ${car.matricula}</p>
				<p class="card-text mb-1"><strong>Autonomía:</strong> ${car.autonomia} km</p>
				<p class="card-text"><strong>Estado:</strong> ${car.estado}</p>
			</div>
		</div>
	</div>
`);

(function showLoginAlerts() {
	const errorInput = document.getElementById("login-error-message");
	const successInput = document.getElementById("login-success-message");

	const errorMessage = errorInput ? errorInput.value.trim() : "";
	const successMessage = successInput ? successInput.value.trim() : "";

	if (errorMessage.length > 0) {
		alert(errorMessage);
	} else if (successMessage.length > 0) {
		alert(successMessage);
	}
})();
