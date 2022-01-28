let currentUrl = window.location.href;

// Split the current window's url which contains a ? before a parameter
let paramString = currentUrl.split('?')[1]
let queryString = new URLSearchParams(paramString);

// Get the pair after splitting the url
// pair [0] : the parameter
// pair [1] : value of the parameter
for(let pair of queryString.entries()){
    document.title = `Search results for "${pair[1]}" - iNews`
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=yourAPIKey&pageSize=38&q=${pair[1]}`

    // Show message and spinner till the search results are fetched for the search query
    document.getElementById("news-root").innerHTML = `
    <h5>Please wait until we fetch the search results for ${pair[1]}...</h5>
    <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;

    // Show the news articles when the search results have been fetched for the search query
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
            document.getElementById("news-root").innerHTML = 
            `<h3>Search results for ${pair[1]}: (${articles.length} results fetched)</h3>
            <hr/>
            ${output}`;
            if (articles.length === 0){
                document.getElementById("news-root").innerHTML = `<h3>Search results for ${pair[1]}: (${articles.length} results fetched)</h3>
                <hr/>
                <h4>Sorry, we have no search results for ${pair[1]}. Try some more general keywords.</h4>`;
            }
        })
    })
}