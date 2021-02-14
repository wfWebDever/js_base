var name = 'x'
var people = {
  name: 'y',
  setName: (name) => {
    this.name = name
    return () => {
      return this.name
    }
  }
}
var getName = people.setName(name)
console.log(people.name) // y
console.log(getName())  // x
console.log(name)       // x