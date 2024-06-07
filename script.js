// Fonction pour charger le fichier XML avec fetch
async function loadXMLDoc(filename) {
	try {
		let response = await fetch(filename);
		let data = await response.text();
		let parser = new DOMParser();
		return parser.parseFromString(data, "text/xml");
	} catch (error) {
		console.error(error);
	}
}

// Fonction pour afficher les livres
function display(xml) {
	const list = document.querySelector("#list");
	list.className =
		"container-fluid row w-100 m-0 p-0 justify-content-center my-5";

	const projects = xml.querySelectorAll("project");

	projects.forEach((project) => {
		var element = document.createElement("div");
		element.className = "card mx-5 my-3 col-md-4 col-lg-3 col-sm-auto";

		var titre = document.createElement("h3");
		titre.textContent = project.querySelector("title").textContent;

		var context = document.createElement("h4");
		context.textContent = project.querySelector("context").textContent;

		var description = document.createElement("p");
		description.textContent = project.querySelector("description").textContent;

		element.appendChild(titre);
		element.appendChild(context);

		try {
			var demo = document.createElement("a");
			demo.textContent = "Demonstration";
			demo.href = project.querySelector("demo").textContent;
			element.appendChild(demo);
		} catch {}

		try {
			var git = document.createElement("a");
			git.innerHTML = "<i class='fa-brands fa-github fa-2x'></i>";
			git.href = project.querySelector("git").textContent;
			element.appendChild(git);
		} catch {}

		try {
			var link = document.createElement("a");
			link.innerHTML = "Disponible ici";
			link.href = project.querySelector("link").textContent;
			element.appendChild(link);
		} catch {}

		element.appendChild(description);

		list.append(element);
	});
}

// Charger et afficher les livres au chargement de la page
window.onload = function () {
	loadXMLDoc("project.xml")
		.then(display)
		.catch(function (error) {
			console.error(error);
		});
};
