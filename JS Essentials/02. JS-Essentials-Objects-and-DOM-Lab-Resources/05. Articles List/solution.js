function createArticle() {

	let title = document.getElementById("createTitle").value;
	let text = document.getElementById("createContent").value;
	let articleList = document.getElementById("articles");

	if (title !== "" && text !== "") {
		let article = document.createElement("article");
		let h3 = document.createElement("h3");
		let p = document.createElement("p");

		h3.textContent = title;
		p.textContent = text;
		article.appendChild(h3);
		article.appendChild(p);
		articleList.appendChild(article);
	}

	document.getElementById("createTitle").value = "";
	document.getElementById("createContent").value = "";
};