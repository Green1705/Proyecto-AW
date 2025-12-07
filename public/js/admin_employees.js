(function setupEmployeeRows() {
	const rows = document.querySelectorAll(".employee-row");
	const toggleRow = (row) => {
		const employeeId = row.getAttribute("data-employee-id");
		const detailRow = document.getElementById(`employee-details-${employeeId}`);
		if (!detailRow) return;
		const isVisible = detailRow.classList.contains("show");
		document.querySelectorAll(".employee-details.show").forEach((openRow) => openRow.classList.remove("show"));
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
