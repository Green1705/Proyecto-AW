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
})();
