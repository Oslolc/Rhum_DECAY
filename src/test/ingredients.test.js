const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Ingredient = require("../models/ingredient");

const { connectDB, disconnectDB } = require("../config/db");

let token;
let ingredientId;

beforeAll(async () => {
    await connectDB(process.env.MONGO_URI);
  // Créer un utilisateur de test
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test User",
      email: "test@example.com",
      password: "123456"
    });

  // Connexion pour obtenir un token
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@example.com",
      password: "123456"
    });

  token = res.body.token;
});

afterAll(async () => {
  await disconnectDB();
});

describe("Tests des routes Ingrédients", () => {
  test("POST /api/ingredients - Ajouter un ingrédient (protégé)", async () => {
    const res = await request(app)
      .post("/api/ingredients")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Citron vert",
        type: "fruit",
        storeAddress: "Monoprix, Rue des Plantes",
        price: 0.7
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Citron vert");
    ingredientId = res.body._id;
  });

  test("GET /api/ingredients - Lister les ingrédients avec pagination", async () => {
    const res = await request(app)
      .get("/api/ingredients?page=1&limit=5");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/ingredients/search - Rechercher un ingrédient par nom", async () => {
    const res = await request(app)
      .get("/api/ingredients/search?name=Citron");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toMatch(/Citron/i);
  });

  test("GET /api/ingredients/search - Rechercher un ingrédient par type", async () => {
    const res = await request(app)
      .get("/api/ingredients/search?type=fruit");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].type).toBe("fruit");
  });
});