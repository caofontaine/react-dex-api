const app = require('./server');
const db = require('./dbConfig.js');
const supertest = require('supertest');

describe('My Test Suite', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });
});

describe('Server Launched', () => {
  it('GET /', async () => {
    await supertest(app).get('/').expect(200);
  });
});

describe('Test DB connection', () => {
  it("DB Test", async () => {
    let testConn = await db.from("pokemon").select(1);
    expect(testConn.length).toBeGreaterThan(0);
  });
});

describe('Test getting Pokemon', () => {
  const bulbasaur = {dexnum: '0001', name: 'Bulbasaur', type1: 'Grass', type2: 'Poison', region: 'Kanto'}

  it("GET /pokedex", async () => {
    await supertest(app).get('/pokedex')
      .expect(200)
      .then(response => {

        // Check type and length (to be at least 151)
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThanOrEqual(151);

        // Check valid data (first item)
        expect(response.body[0].dexnum).toBe(bulbasaur.dexnum);
        expect(response.body[0].name).toBe(bulbasaur.name);
        expect(response.body[0].type1).toBe(bulbasaur.type1);
        expect(response.body[0].type2).toBe(bulbasaur.type2);
        expect(response.body[0].region).toBe(bulbasaur.region);
      });
  });
});

describe('Test searching for Pokemon', () => {
  it('POST /searchdex', async () => {
    const searchResult = {dexnum: '0004', name: 'Charmander', type1: 'Fire', type2: null, region: 'Kanto'}
    const res = await supertest(app).post('/searchdex')
  	.send({ searchName: 'charmander'})
    .expect(200)
    .then(response => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check valid data (first item)
      expect(response.body[0].dexnum).toBe(searchResult.dexnum);
      expect(response.body[0].name).toBe(searchResult.name);
      expect(response.body[0].type1).toBe(searchResult.type1);
      expect(response.body[0].type2).toBe(searchResult.type2);
      expect(response.body[0].region).toBe(searchResult.region);
    })
  });
});

afterAll(() => {
  db.destroy();
});
