const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "John" });
    joe.save().then(() => done());
  });

  it("model instance remove", done => {
    joe.remove().then(() => User.findOne({ name: "John" })).then(user => {
      assert(user === null);
      done();
    });
  });

  it("class method remove", done => {
    User.remove({ name: "John" })
      .then(() => User.findOne({ name: "John" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method findAndRemove", done => {
    User.findOneAndRemove({ name: "John" })
      .then(() => User.findOne({ name: "John" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method findIdAndRemove", done => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: "John" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
