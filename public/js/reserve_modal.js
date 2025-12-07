(function setupReserveModal() {
	const modal = document.getElementById("reserveModal");
	if (!modal) return;
	const startInput = modal.querySelector("#reserve-start");
	const endInput = modal.querySelector("#reserve-end");
	const rateInput = modal.querySelector("#reserve-daily-rate");
	const priceInput = modal.querySelector("#reserve-price");
	const vehicleInput = modal.querySelector("#reserve-vehicle-id");
	const summary = modal.querySelector(".reserve-modal-summary");
	const clientFields = modal.querySelectorAll(".reserve-client-field");

	if (!startInput || !endInput || !rateInput || !priceInput || !vehicleInput) return;

	const updatePrice = () => {
		if (!startInput.value || !endInput.value) {
			priceInput.value = "";
			return;
		}
		const startDate = new Date(startInput.value);
		const endDate = new Date(endInput.value);
		const rate = parseFloat(rateInput.value || "0");
		if (isNaN(startDate) || isNaN(endDate) || endDate <= startDate || rate <= 0) {
			priceInput.value = "";
			return;
		}
		const diffMs = endDate.getTime() - startDate.getTime();
		const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
		const price = Math.round(diffDays * rate * 100) / 100;
		priceInput.value = price.toFixed(2);
	};

	["input", "change"].forEach((evt) => {
		startInput.addEventListener(evt, updatePrice);
		endInput.addEventListener(evt, updatePrice);
	});

	modal.addEventListener("show.bs.modal", (event) => {
		const button = event.relatedTarget;
		if (!button) return;
		const carId = button.getAttribute("data-car-id");
		const rate = button.getAttribute("data-car-rate");
		const carName = button.getAttribute("data-car-name") || "Vehículo seleccionado";
		const carPlate = button.getAttribute("data-car-matricula") || "Sin matrícula";

		vehicleInput.value = carId || "";
		rateInput.value = rate || "0";
		if (summary) summary.textContent = `Reserva para vehículo #${carId || "--"} — ${carName} (${carPlate})`;
		clientFields.forEach((field) => {
			field.value = "";
		});
		startInput.value = "";
		endInput.value = "";
		priceInput.value = "";
	});
})();
