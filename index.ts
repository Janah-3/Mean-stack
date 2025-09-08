// 1-Advanced Types & Conditional Types
type IsString<T> = T extends string ? "yes" : "no";

type Test1 = IsString<string>; 

// 2. Discriminated Unions
//  • Define a union type Shape with variants: circle, square, rectangle.
//  • Write a function getArea(shape: Shape): number using exhaustive type checks.
type circle = {kind: "circle"; radius: number}
type square = {kind: "square"; size: number}
type rectangle = {kind: "rectangle"; width: number; height: number}

type shape = circle| square| rectangle

function getArea(shape: shape): number {
    if (shape.kind =="circle" ){
          return 3.24 * shape.radius ** 2;
    }else if (shape.kind =="square" ){
        return shape.size ** 2;
    }else if (shape.kind =="rectangle" ){
         return shape.width * shape.height;
    }else{
        return -1;
    }

   
}

const c: circle = { kind: "circle", radius: 5 };
const s: square = { kind: "square", size: 4 };
const r: rectangle = { kind: "rectangle", width: 3, height: 6 };

console.log(getArea(c)); 
console.log(getArea(s)); 
console.log(getArea(r)); 

//  3. Mapped Types
//  • Create a mapped type Optional that makes all properties of T optional.
//  • Create another mapped type Nullable that makes all properties of T nullable

type Optional<T> = {
  [K in keyof T]?: T[K];
};


type OptionalUser = Optional<circle>

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<square>

// 4. Utility Types
//  • Given an interface User { id: number; name: string; email: string; isAdmin: boolean }:
//  • Use Pick to create a type UserPreview with only id and name.
//  • Use Omit to create a type UserWithoutEmail.
//  • Use Partial to create UserUpdate

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

type UserPreview = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;
type UserUpdate = Partial<User>;


// 5. Generics
//  • Write a generic function merge(obj1: T, obj2: U): T & U.
//  • Write a generic constraint getProperty(obj: T, key: K): T[K]
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const obj1 = { name: "Jana", age: 22 };
const obj2 = { email: "jana@gmail.com" };

const merged = merge(obj1, obj2);
console.log(merged);

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Jana", email: "jana@example.com" };

const Name = getProperty(user, "name"); 
const email = getProperty(user, "email"); 

console.log(Name,email)


//  6. Advanced Inference
//  • Create a function firstElement(arr: T[]): T | undefined.
//  • Extend it so that if the array is a non-empty tuple, TypeScript infers the exact element type.
function firstElement<T>(arr: T[]): T | undefined;
function firstElement<T extends readonly [any, ...any[]]>(arr: T): T[0];
function firstElement(arr: any[]): any {
  return arr.length > 0 ? arr[0] : undefined;
}


console.log(firstElement([10, 20, 30]));   
console.log(firstElement(["a", "b", "c"])); 


const tuple1 = firstElement([true, 42, "hi"] as const); 

console.log(tuple1);


//  6. Advanced Inference: firstElement with tuple inference

function element1<T extends readonly [any, ...any[]]>(arr: T): T[0];
function element1<T>(arr: readonly T[]): T | undefined;


function element1(arr: readonly unknown[]) {
  return arr[0];
}

const n = element1([1, 2, 3]);                  
const t = element1(["id", 42] as const);        

//  7. Key Remapping in Mapped Types

type Original = { firstName: string; lastName: string };

type Rename<T> = {
  [K in keyof T as K extends "firstName"
    ? "first_name"
    : K extends "lastName"
    ? "last_name"
    : never]: T[K];
};

type Renamed = Rename<Original>;  


// 8. Decorators (Experimental)
//     Enable: "experimentalDecorators": true
// #8 — fixed: explicit decorator types + safe ordering via metadata

const ROUTES = Symbol("routes");

function Get(path: string): MethodDecorator {
  return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    // store routes on the prototype so the class decorator can read them later
    const proto = target as any;
    proto[ROUTES] = proto[ROUTES] || [];
    proto[ROUTES].push({ methodName: propertyKey, path });
    // method decorator returns void (MethodDecorator)
  };
}

function Controller(route: string): ClassDecorator {
  return function (constructor: Function) {
    // attach baseRoute to the constructor (read-only)
    Object.defineProperty(constructor, "baseRoute", {
      value: route,
      writable: false,
      configurable: true,
    });

    // read routes that method decorators stored on prototype earlier
    const proto = constructor.prototype as any;
    const routes: Array<{ methodName: string | symbol; path: string }> = proto[ROUTES] || [];

    for (const r of routes) {
      console.log(`Register GET ${route}${r.path} -> ${String(r.methodName)}`);
    }
  };
}

/* Usage */
@Controller("/api/users")
class UserController {
  @Get("/")
  list() { /* ... */ }

  @Get("/:id")
  detail() { /* ... */ }
}


//   9. Module Augmentation
//      In a real project, you'd place these in separate files.

// ----- my-lib.ts (implementation) -----
namespace MyLib {
  // Base signature
  export function log(message: string): void;
  // Augmented signature
  export function log(
    message: string,
    level: "info" | "warn" | "error"
  ): void;
  // Implementation
  export function log(
    message: string,
    level: "info" | "warn" | "error" = "info"
  ) {
    const tag = level.toUpperCase();
    console.log(`[${tag}] ${message}`);
  }
}



  // 10. Type Guards

function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    !!value &&
    typeof (value as any).then === "function" &&
    typeof (value as any).catch === "function"
  );
}

async function handleMaybePromise<T>(x: T | Promise<T>) {
  if (isPromise<T>(x)) {
    const v = await x;              
    return v;
  }
  return x;                         
}


//  11. Template Literal Types

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = `/${string}`;

function request<M extends HTTPMethod, U extends Endpoint>(
  method: M,
  url: U
): Promise<unknown> {
 
  return Promise.resolve({ method, url });
}

request("GET", "/users");              


  // 12. infer in Conditional Types

type MyReturnType<F> = F extends (...args: any[]) => infer R ? R : never;
type FirstArg<F> = F extends (arg1: infer A, ...args: any[]) => any ? A : never;

type R1 = MyReturnType<() => number>;        
type A1 = FirstArg<(x: { id: string }, y: number) => void>; 


  // 13. Branded Types

type Brand<T, B extends string> = T & { readonly __brand: B };
type UserID = Brand<string, "UserID">;

function makeUserID(raw: string): UserID {

  return raw as UserID;
}

function getUserById(id: UserID) {
  
  return { id, name: "Jane" };
}


const goodId = makeUserID("user_123");

getUserById(goodId);                   


  // 14. Exhaustive Checks with never

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function GetArea(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.radius * s.radius;
    case "rect":
      return s.width * s.height;
    case "triangle":
      return 0.5 * s.base * s.height;
    default: {
      const _exhaustive: never = s;
      return _exhaustive; 
    }
  }
}


//  15. Advanced Generics Challenge: Strongly-typed EventEmitter

type AppEvents = {
  login: { userId: UserID };
  logout: { userId: UserID };
  message: { from: UserID; text: string };
};

class EventEmitter<E extends Record<string, any>> {
  private handlers: { [K in keyof E]?: Array<(payload: E[K]) => void> } = {};

  on<K extends keyof E>(event: K, handler: (payload: E[K]) => void): this {
    (this.handlers[event] ??= []).push(handler);
    return this;
  }

  off<K extends keyof E>(event: K, handler: (payload: E[K]) => void): this {
    const list = this.handlers[event];
    if (list) this.handlers[event] = list.filter(h => h !== handler) as any;
    return this;
  }

  emit<K extends keyof E>(event: K, payload: E[K]): void {
    this.handlers[event]?.forEach(h => h(payload));
  }
}


const bus = new EventEmitter<AppEvents>();
bus.on("login", p => {

});
bus.emit("login", { userId: makeUserID("u1") });      