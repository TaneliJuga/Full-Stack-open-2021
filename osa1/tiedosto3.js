Object.appendChain = function(oChain, oProto) {
    if (arguments.length < 2) {
        throw new TypeError('Object.appendChain - Not enough arguments');
    }
    if (typeof oProto !== 'object' && typeof oProto !== 'string') {
        throw new TypeError('second argument to Object.appendChain must be an object or a string');
    }

    var oNewProto = oProto,
        oReturn = o2nd = oLast = oChain instanceof this ? oChain : new oChain.constructor(oChain);

    for (var o1st = this.getPrototypeOf(o2nd);
        o1st !== Object.prototype && o1st !== Function.prototype;
        o1st = this.getPrototypeOf(o2nd)
    ) {
        o2nd = o1st;
    }

    if (oProto.constructor === String) {
        oNewProto = Function.prototype;
        oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
        this.setPrototypeOf(oReturn, oLast);
    }

    this.setPrototypeOf(o2nd, oNewProto);
    return oReturn;
}

function Mammal() {
    this.isMammal = 'yes';
}
  
function MammalSpecies(sMammalSpecies) {
    this.species = sMammalSpecies;
}
  
MammalSpecies.prototype = new Mammal();
MammalSpecies.prototype.constructor = MammalSpecies;

const oCat = new MammalSpecies('Felis');
const oCat2 = new MammalSpecies.prototype.constructor('Felis2');
test(oCat);
test(oCat2);

function test(obj){
    console.log(obj.isMammal); // 'yes'
    console.log(obj.species); // 'Felis'

    function Animal() {
        this.breathing = 'yes';
    }

    Object.appendChain(obj, new Animal());
    console.log(obj.breathing); // 'yes'
}