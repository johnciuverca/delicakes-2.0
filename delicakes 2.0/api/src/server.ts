import express from "express";

const app = express()
const port = 3100
app.use((_request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    next();
});

 const recipes = [
   {
     id: 1,
     title: "Chocolate Celebration Cake",
     category: "Cakes",
     description:
       "A rich chocolate cake finished with smooth chocolate frosting.",
     image: "/cakes/1.jpeg",
   },
   {
     id: 2,
     title: "Fresh Fruit Cake",
     category: "Cakes",
     description: "A light layered cake decorated with fresh seasonal fruit.",
     image: "/cakes/2.jpeg",
   },
   {
     id: 3,
     title: "Classic Cream Cake",
     category: "Cakes",
     description: "A soft sponge cake covered with delicate cream decoration.",
     image: "/cakes/3.jpeg",
   },
 ];

app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
})

app.get("/recipes", (_request, response) => {
    response.status(200).json(recipes);
})

app.listen(port, () => {
    console.log(`API server is listening on http://localhost:${port}`)
})
