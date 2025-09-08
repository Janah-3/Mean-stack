var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function getArea(shape) {
    if (shape.kind == "circle") {
        return 3.24 * Math.pow(shape.radius, 2);
    }
    else if (shape.kind == "square") {
        return Math.pow(shape.size, 2);
    }
    else if (shape.kind == "rectangle") {
        return shape.width * shape.height;
    }
    else {
        return -1;
    }
}
var c = { kind: "circle", radius: 5 };
var s = { kind: "square", size: 4 };
var r = { kind: "rectangle", width: 3, height: 6 };
console.log(getArea(c));
console.log(getArea(s));
console.log(getArea(r));
// 5. Generics
//  • Write a generic function merge(obj1: T, obj2: U): T & U.
//  • Write a generic constraint getProperty(obj: T, key: K): T[K]
function merge(obj1, obj2) {
    return __assign(__assign({}, obj1), obj2);
}
var obj1 = { name: "Jana", age: 22 };
var obj2 = { email: "jana@gmail.com" };
var merged = merge(obj1, obj2);
console.log(merged);
function getProperty(obj, key) {
    return obj[key];
}
var user = { id: 1, name: "Jana", email: "jana@example.com" };
var Name = getProperty(user, "name");
var email = getProperty(user, "email");
console.log(Name, email);

