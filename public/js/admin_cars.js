(function setupAdminVehicleRows() {
	const rows = document.querySelectorAll(".vehicle-row");
	const toggleRow = (row) => {
		const carId = row.getAttribute("data-car-id");
		const detailRow = document.getElementById(`vehicle-details-${carId}`);
		if (!detailRow) return;
		const isVisible = detailRow.classList.contains("show");
		document.querySelectorAll(".vehicle-details.show").forEach((openRow) => openRow.classList.remove("show"));
		if (!isVisible) detailRow.classList.add("show");
	};

	rows.forEach((row) => {
		row.addEventListener("click", () => toggleRow(row));
		row.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				toggleRow(row);
			}
		});
	});
	const editModal = document.getElementById("editCarModal");
	if (!editModal) return;

	const fillEditModal = (button) => {
		const setValue = (selector, value) => {
			const input = editModal.querySelector(selector);
			if (input) input.value = value ?? "";
		};

		setValue("#edit-car-id", button.getAttribute("data-car-id"));
		setValue("#edit-car-matricula", button.getAttribute("data-car-matricula"));
		setValue("#edit-car-marca", button.getAttribute("data-car-marca"));
		setValue("#edit-car-modelo", button.getAttribute("data-car-modelo"));
		setValue("#edit-car-anio", button.getAttribute("data-car-anio"));
		setValue("#edit-car-plazas", button.getAttribute("data-car-plazas"));
		setValue("#edit-car-autonomia", button.getAttribute("data-car-autonomia"));
		setValue("#edit-car-precio", button.getAttribute("data-car-precio"));
		setValue("#edit-car-color", button.getAttribute("data-car-color"));
		setValue("#edit-car-estado", button.getAttribute("data-car-estado"));
		setValue("#edit-car-dealership", button.getAttribute("data-car-concesionario"));
		setValue("#edit-car-current-image", button.getAttribute("data-car-imagen") || "");
		const fileInput = editModal.querySelector("#edit-car-image");
		if (fileInput) fileInput.value = "";
	};

	document.querySelectorAll("[data-edit-vehicle]").forEach((button) => {
		button.addEventListener("click", () => fillEditModal(button));
	});
})();
