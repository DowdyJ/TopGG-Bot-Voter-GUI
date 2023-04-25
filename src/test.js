(async () => {
    await fetch("https://top.gg/api/client/entities/search?platform=discord&entityType=bot&amount=100&nsfwLevel=1&newSortingOrder=TOP&query=karuta&sort=top&isMature=false", {
        "method": "GET",
        "mode": "cors"
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.results);
    });
})();




