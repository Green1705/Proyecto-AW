document.addEventListener("keydown", (event) => {
	if (!event.ctrlKey || event.altKey || event.metaKey) return;

	const key = event.key.toLowerCase();
	if (key === "h") {
		event.preventDefault();
		window.location.href = "/perfil";
	} else if (key === "r") {
		event.preventDefault();
		window.location.href = "/vehiculos";
	}
});
