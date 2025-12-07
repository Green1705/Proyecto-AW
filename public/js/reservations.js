(function setupReservationsToggle() {
	const toggleReservationDetails = (reservationId) => {
		const detailsRow = document.getElementById(`reservation-details-${reservationId}`);
		if (!detailsRow) return;
		const currentlyOpen = detailsRow.classList.contains("show");
		document.querySelectorAll(".reservation-details.show").forEach((openRow) => openRow.classList.remove("show"));
		if (!currentlyOpen) detailsRow.classList.add("show");
	};

	document.querySelectorAll(".reservation-view-btn").forEach((button) => {
		button.addEventListener("click", () => {
			const row = button.closest(".reservation-row");
			if (!row) return;
			toggleReservationDetails(row.getAttribute("data-reservation-id"));
		});
	});

	document.querySelectorAll(".reservation-row").forEach((row) => {
		row.addEventListener("click", (event) => {
			if (event.target.closest("button") || event.target.closest("form")) return;
			toggleReservationDetails(row.getAttribute("data-reservation-id"));
		});
		row.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				toggleReservationDetails(row.getAttribute("data-reservation-id"));
			}
		});
	});
})();
