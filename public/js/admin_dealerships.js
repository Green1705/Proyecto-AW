(function setupDealershipRows() {
	const rows = document.querySelectorAll(".dealership-row");
	const toggleRow = (row) => {
		const dealerId = row.getAttribute("data-dealer-id");
		const detailRow = document.getElementById(`dealership-details-${dealerId}`);
		if (!detailRow) return;
		const isVisible = detailRow.classList.contains("show");
		document.querySelectorAll(".dealership-details.show").forEach((openRow) => openRow.classList.remove("show"));
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
