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

		const getDetailRow = (row) => {
			if (!detailPrefix || !detailAttr) return null;
			const idValue = row.getAttribute(detailAttr);
			if (!idValue) return null;
			return document.getElementById(`${detailPrefix}${idValue}`);
		};

		const toggleDetailDisplay = (detailRow, matches) => {
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
				const detailRow = getDetailRow(row);
				const combinedText = (
					row.textContent +
					(detailRow ? ` ${detailRow.textContent}` : "")
				).toLowerCase();
				const matches = combinedText.includes(term);
				row.style.display = matches ? "" : "none";
				toggleDetailDisplay(detailRow, matches);
			});
		};

		input.addEventListener("input", applyFilter);
	});
})();
