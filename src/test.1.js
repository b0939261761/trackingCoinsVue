let data = { price: 5, quantity: 2 }
let target = null

// This is exactly the same Dep class
class Dep {
  constructor () {
    this.subscribers = []
  }
  depend() {
    console.log( 'depend', target )
    if (target && !this.subscribers.includes(target)) {
      // Only if there is a target & it's not already subscribed
      this.subscribers.push(target)
    }
  }
  notify() {
    this.subscribers.forEach(sub => sub())
  }
}

// Go through each of our data properties
Object.keys(data).forEach(key => {
  let internalValue = data[key]

  // Each property gets a dependency instance
  const dep = new Dep()

  Object.defineProperty(data, key, {
    get() {
      console.log( 'get', target)
      dep.depend() // <-- Remember the target we're running
      return internalValue
    },
    set(newVal) {
      internalValue = newVal
      dep.notify() // <-- Re-run stored functions
    }
  })
})

// My watcher no longer calls dep.depend,
// since that gets called from inside our get method.
function watcher(myFunc) {
  target = myFunc
  target()
  target = null
}

watcher(() => {
  data.total = data.price * 2
})

// data.price = 10
// console.log( data.total )
