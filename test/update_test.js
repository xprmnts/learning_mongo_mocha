const assert = require("assert");
const User = require("../src/user");

describe("Update a user", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "John", postCount: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation.then(() =>
      User.find({}).then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      })
    );
  }

  it("instance type using set n save", done => {
    joe.set("name", "Alex");
    assertName(joe.save(), done);
  });

  it("a model instance can method update", done => {
    assertName(joe.update({ name: "Alex" }), done);
  });

  it("model class can update", done => {
    assertName(User.update({ name: "John" }, { name: "Alex" }), done);
  });

  it("model class can update one record", done => {
    assertName(User.findOneAndUpdate({ name: "John" }, { name: "Alex" }), done);
  });

  it("model class can update by id", done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });

  it("a user can have their postcount incremented by 1", done => {
    User.update({ name: "John" }, { $inc: { postCount: 10 } })
      .then(() => User.findOne({ name: "John" }))
      .then(user => {
        assert(user.postCount === 10);
        done();
      });
  });
});
