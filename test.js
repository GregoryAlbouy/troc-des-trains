const array = [
    { id: 0, name: 'Paul' },
    { id: 1, name: 'Paul' },
    { id: 2, name: 'Paul' }
]
console.log(array.map((person) => person.id).includes(3))