Function.prototype.construct = function(aArgs) {
    let oNew = Object.create(this.prototype);
    this.apply(oNew, aArgs);
    return oNew;
  };
  
function MyConstructor() {
    for (let nProp = 0; nProp < arguments.length; nProp++) {
        this['property' + nProp] = arguments[nProp];
    }
}

let myArray = [4, 'Hello world!', false];
let myInstance = Date.construct(myArray);

console.log(myInstance.property1);                // logs 'Hello world!'
console.log(myInstance instanceof MyConstructor); // logs 'true'
console.log(myInstance.constructor);              // logs 'MyConstructor'