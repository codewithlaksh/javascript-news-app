document.title = "Home - iNews";

let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=yourAPIKey&pageSize=38";

// Show message and spinner till the news articles are fetched
document.getElementById("news-root").innerHTML = `
<h5>Please wait until we fetch the latest news articles for you...</h5>
<div class="spinner-border text-danger" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;

// Show the news articles when the news articles have been fetched
document.addEventListener("DOMContentLoaded", () => {
    fetch(url)
    .then(response => response.text())
    .then(data => {
        let myData = JSON.parse(data);
        let articles = myData.articles;
        let output = "";
        Array.from(articles).forEach((article) => {
            output += `
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-2 shadow-sm h-md-250 position-relative">
                    <div class="col p-4 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-1 text-danger">News Article</strong>
                        <h4 class="mb-1"><a href="${article.url}" class="text-dark text-decoration-none" target="_blank">${article.title}</a></h4>
                        <div class="mb-1 text-muted">Published At: ${article.publishedAt}</div>
                        <div class="mb-1 text-muted">Author: ${article.author}</div>
                        <p class="card-text mb-2">${article.description}</p>
                        <div>
                            <a href="${article.url}" class="btn btn-sm btn-outline-danger" target="_blank">Continue reading &raquo;</a>
                        </div>
                    </div>
            </div>`;
        })
        document.getElementById("news-root").innerHTML = `
        <h3>Latest news articles: (${articles.length} news articles fetched)</h3>
        <hr/>
        ${output}
        `;
    })
})