const request = require("supertest");

const app = require("../app");

//Fill this with many many tests YAY!! 😜😩

describe("test server", () => {
  test("Get/facsters return all facsters", (done) => {
    request(app)
      .get("/facsters")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        done();
      });
  });

  test("Get specific facster", (done) => {
    request(app)
      .get("/facsters/amelie")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(typeof res.body).toBe("object");
        expect(res.body.id).toBe(2);
        expect(res.body.firstname).toBe("Amelie");
        done();
      });
  });

  test("Get specific facster/:name/superpower", (done) => {
    request(app)
      .get("/facsters/amelie/superpower")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("superpower");
        done();
      });
  });

  test("Get specific facster/:name/hobby", (done) => {
    request(app)
      .get("/facsters/Amelie/hobby")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("hobby");
        done();
      });
  });

  test("Post new facster", (done) => {
    request(app)
      .post("/facster/new")
      .send({
        firstname: "aysha",
        surname: "volidis",
        cohort: 11,
      })
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toBe(201);
        expect(typeof res.body).toBe("object");
        done();
      });
  });
});
