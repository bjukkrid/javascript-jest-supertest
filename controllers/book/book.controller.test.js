import request from "../../utils/client";

describe("Books", () => {
  describe("List books", () => {
    it("list all books", () => {
      return request.get("/books").expect(200);
    });

    it("gets book by id", async () => {
      return request
        .get("/books/1")
        .expect(200)
        .then((response) => {
          expect(response.body.result.book_id).toEqual(1);
          expect(response.body.result.title).toEqual("Foreign Affair, A");
          expect(response.body.result.subtitle).toEqual("Final Destination");
        });
    });
  });

  describe(`Create book`, () => {
    it("create book", async () => {
      return request
        .post("/books")
        .send({ title: "xxx01", subtitle: "xxx01" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
    });
  });

  //   describe(`Delete book`, () => {
  //     it("create book", async () => {
  //       return request.delete("/books/1").expect(200);
  //     });
  //   });
});
