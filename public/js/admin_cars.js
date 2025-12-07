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

	const fieldSelectors = {
		id: "#edit-car-id",
		matricula: "#edit-car-matricula",
		marca: "#edit-car-marca",
		modelo: "#edit-car-modelo",
		anio: "#edit-car-anio",
		plazas: "#edit-car-plazas",
		autonomia: "#edit-car-autonomia",
		precio: "#edit-car-precio",
		color: "#edit-car-color",
		estado: "#edit-car-estado",
		concesionario: "#edit-car-concesionario",
	};

	const setFieldValue = (selector, value) => {
		const element = editModal.querySelector(selector);
		if (!element) return;
		element.value = typeof value === "undefined" || value === null ? "" : value;
	};

	const editButtons = document.querySelectorAll("[data-edit-vehicle]");
	editButtons.forEach((button) => {
		button.addEventListener("click", () => {
			setFieldValue(fieldSelectors.id, button.getAttribute("data-car-id"));
			setFieldValue(fieldSelectors.matricula, button.getAttribute("data-car-matricula"));
			setFieldValue(fieldSelectors.marca, button.getAttribute("data-car-marca"));
			setFieldValue(fieldSelectors.modelo, button.getAttribute("data-car-modelo"));
			setFieldValue(fieldSelectors.anio, button.getAttribute("data-car-anio"));
			setFieldValue(fieldSelectors.plazas, button.getAttribute("data-car-plazas"));
			setFieldValue(fieldSelectors.autonomia, button.getAttribute("data-car-autonomia"));
			setFieldValue(fieldSelectors.precio, button.getAttribute("data-car-precio"));
			setFieldValue(fieldSelectors.color, button.getAttribute("data-car-color"));
			setFieldValue(fieldSelectors.estado, button.getAttribute("data-car-estado"));
			setFieldValue(fieldSelectors.concesionario, button.getAttribute("data-car-concesionario"));
			const imageInput = editModal.querySelector("#edit-car-image");
			if (imageInput) imageInput.value = "";
		});
	});
})();
