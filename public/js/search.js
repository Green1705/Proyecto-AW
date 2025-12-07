(function registerSearchFilters() {
	const inputs = document.querySelectorAll("[data-search-row-selector]");
	if (!inputs.length) return;

	inputs.forEach((input) => {
		const rowSelector = input.getAttribute("data-search-row-selector");
		if (!rowSelector) return;
		const rows = Array.from(document.querySelectorAll(rowSelector));
		if (!rows.length) return;

		const detailPrefix = input.getAttribute("data-detail-prefix");
		const detailAttr = input.getAttribute("data-detail-attr");

		const toggleDetailDisplay = (row, matches) => {
			if (!detailPrefix || !detailAttr) return;
			const idValue = row.getAttribute(detailAttr);
			if (!idValue) return;
			const detailRow = document.getElementById(`${detailPrefix}${idValue}`);
			if (!detailRow) return;
			if (!matches) {
				detailRow.classList.remove("show");
				detailRow.style.display = "none";
			} else {
				detailRow.style.display = detailRow.classList.contains("show") ? "table-row" : "";
			}
		};

		const applyFilter = () => {
			const term = input.value.trim().toLowerCase();
			rows.forEach((row) => {
				const matches = row.textContent.toLowerCase().includes(term);
				row.style.display = matches ? "" : "none";
				toggleDetailDisplay(row, matches);
			});
		};

		input.addEventListener("input", applyFilter);
	});
})();
