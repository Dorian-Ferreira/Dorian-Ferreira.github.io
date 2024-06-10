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

// Fonction pour afficher les projets
function display(xml) {
	const list = document.querySelector("#list");
	list.className =
		"container-fluid row w-100 m-0 p-0 justify-content-center my-5";

	const projects = xml.querySelectorAll("project");

	// Pour chaque projet dans le XML
	// on créé une balise article avec dedans le titre, le contexte, la description et les liens si il y en a
	projects.forEach((project) => {
		var element = document.createElement("article");
		element.className = "card mx-5 3 my-3 col-auto col-lg-3";

		var titre = document.createElement("h3");
		titre.textContent = project.querySelector("title").textContent;

		var context = document.createElement("h4");
		context.textContent = project.querySelector("context").textContent;

		element.appendChild(titre);
		element.appendChild(context);

		try {
			// try catch pour rajouter les liens si il y en a dans le XML
			var listElem = document.createElement("ul");

			try {
				// try catch pour rajouter le lien youtube du XML si il est présent dans le XML
				var demoLi = document.createElement("li");

				var demo = document.createElement("a");
				demo.innerHTML = "<i class='fa-brands fa-youtube fa-3x'></i>";
				demo.href = project.querySelector("demo").textContent;

				demoLi.appendChild(demo);
				listElem.appendChild(demoLi);
			} catch {}

			try {
				// try catch pour rajouter le lien git du XML si il est présent dans le XML
				var gitLi = document.createElement("li");

				var git = document.createElement("a");
				git.innerHTML = "<i class='fa-brands fa-github fa-3x'></i>";
				git.href = project.querySelector("git").textContent;

				gitLi.appendChild(git);
				listElem.appendChild(gitLi);
			} catch {}

			try {
				// try catch pour rajouter le lien du XML si il est présent dans le XML
				var linkLi = document.createElement("li");

				var link = document.createElement("a");
				link.innerHTML = "Disponible ici";
				link.href = project.querySelector("link").textContent;

				linkLi.appendChild(link);
				listElem.appendChild(linkLi);
			} catch {}

			element.appendChild(listElem);
		} catch {}

		var description = document.createElement("p");
		description.textContent =
			project.querySelector("description").textContent;

		element.appendChild(description);

		list.append(element);
	});
}

// Charger et afficher les projets au chargement de la page
window.onload = function () {
	loadXMLDoc("../data/project.xml")
		.then(display)
		.catch(function (error) {
			console.error(error);
		});
};
