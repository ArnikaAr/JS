const Handlebars = require('handlebars');

Handlebars.registerHelper('checkCategory', function(category, item) {
    if (category === item.type && category !== "Logs") {
        return `
<li class="category__item" data-path = ".${item.path}">
    <p class="category__heading">${item.name}</p>
    <a class="category__link category__link_type_download" href=".${item.path}">download</a>
    <a class="category__link category__link_type_delete" href=".${item.path}">delete</a>
</li>`;} else if (category === item.type && category === "Logs") {
        const month = ("0" + (item.date.getMonth())).slice(-2);
        const year = item[0].date.getFullYear();
        const date = `${year}-${month}`;
        let listItems = '';
        item.forEach(file => {
            listItems += `
<li class="category__item" data-path = ".${item.path}">
    <p class="category__heading">${file.name}</p>
    <a class="category__link category__link_type_download" href=".${item.path}">download</a>
    <a class="category__link category__link_type_delete" href=".${item.path}">delete</a>
</li>
`;});
        return `
<li class="category__item category__item_type_date">
    <h3 class="category__item-heading">${date}</h3>
    <ul class="category__list">` + listItems + `</ul>
</li>
`;}
});