const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "John" });
    joe.save().then(() => done());
  });

  it("finds all users with a name of joe", done => {
    User.find({ name: "John" }).then(users => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("find a user with a particular id", done => {
    User.findOne({ name: "John" }).then(user => {
      assert(user.name === "John");
      done();
    });
  });
});
