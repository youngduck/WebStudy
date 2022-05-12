"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person_1 = require("./person");
class Student extends person_1.Person {
    study() {
        return `${this.name} is studying`;
    }
}
const student = new Student('lee');
console.log(student.sayHello());
console.log(student.study());
console.log('hi');
console.log('bye');
