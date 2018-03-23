let person = {
  getGreeting() {
  return "Hello";
  }

  };
  // прототип - person
  let friend = {
  getGreeting() {
    console.log( this )
  return person.getGreeting.call(this) + ", hi!";
  }
  };
  Object.setPrototypeOf(friend, person)


  let relative = Object.create(friend);
  console.log(person.getGreeting()); // "Hello"
  console.log(friend.getGreeting()); // "Hello, hi!"
  // console.log(relative.getGreeting()); // ошибка!
