// - Palabra reservada que no puede ser llamada en alguna variable -
// const name = "Miguel" = Cannot redeclare block-scoped variable 'name'.
let person = "Miguel";

// - inferencia: Se da cuanta de que tipo de dato es sin declararlo como JS -

// Todos numeros
const a = 1;
const b = 2;
const c = a + b;

const objectPersona = {
  name: "Ivi",
  age: 26,
  fachero: true,
};

// - : sirve para declarar el tipo de variable -
const number = 1;
const n: number = 2;

// - tipo any hace que ignore el inferir de la variable y no lo trata como lo que deberia ser -
let anyvalue: any = "hola";

// Estos no son nada pero los permite
anyvalue.aa();
anyvalue();
anyvalue.aa = 100;
const uwu: number = anyvalue;

let noSe: unknown; // Para cuando no sabes que tipo va a ser

// FUNCIONES

// - implicitamente la variable de la funcion tendra un tipo any, conviene declarar el tipo -
function saludar(name: string) {
  console.log(`Hola ${name}`);
}
saludar("ivi");

// Declarar objeto en funcion
function saludar2({ name, age }: { name: string; age: number }) {
  console.log(`Hola ${name}, tienes ${age} años`);
}

saludar2({ name: "uwu", age: 69 });

// - Se declara que se pasa una funcion con el nombre de variables y sus tipos, y lo que se retorna
// Incluso se agrega void si no se espera que se devuelva algo, de no ser necesario no ponerlo
// ya que puede inferirlo ts -
const funcionConFuncion = (fn: (name: string) => void) => {
  fn("Pepito");
};

const saludar3 = (name: string) => {
  console.log(`Hola ${name}`);
};

// Tipados de arrow functions
const sumar = (a: number, b: number): number => {
  return a + b;
};

const restar: (a: number, b: number) => number = (a, b) => {
  return a - b;
};

// NEVER - Funciones que nunca van a devolver nada como los throw error, el never es asignable a todo
// No es muy relevante, la diferencia con el void es que con el void si puede llegar a devolver algo, pero no es relevante, no le damos bola (return implicito)
function throwError(message: string): never {
  throw new Error(message);
}

// TYPE ALIAS
// Tipos personalizados

// Propiedades opcionales => propiedad?: tipo
// readonly, tira error si queres modificar propiedades

type Facha = {
  readonly id?: Id;
  name: string;
  age: number;
  isPijudo?: boolean;
  nivelFacha?: NivelFacha;
};

let ivi: Facha = {
  name: "Ivi",
  age: 26,
};

function createFacha(name: string, age: number): Facha {
  return { id: crypto.randomUUID(), name, age, isPijudo: false };
}

const mateo = createFacha("Mateo", 26);

// - optional chaining = si tiene la propiedad ejecuta el toString(), si no, no -
ivi.id?.toString();

// template union types. Creacion de tipos para ser usado en otros tipos, valida que se cree
// un id como el que crypto devuelve
type Id = `${string}-${string}-${string}-${string}-${string}`;
type HexColor = `#${string}`;

// Union types
// Tipos con distintos valores validos

type NivelFacha = "Feo" | "Pasable" | "Fachero" | "NANANANashe";

let variableDeVariosPosiblesValores: number | string;

ivi.nivelFacha = "NANANANashe";

// intersection types
// Union de distintos tipos
type FachaInfoBasica = {
  name: "string";
  age: number;
};

type FachaInfoAvanzada = {
  readonly id?: Id;
  isPijudo?: boolean;
  nivelFacha?: NivelFacha;
};

type Facherito = FachaInfoBasica & FachaInfoAvanzada;

// type from value

const place = {
  planet: "Earth",
  continent: "Asia",
};

type Lugar = typeof place;

const lugarMagico: Lugar = {
  planet: "Mi cama",
  continent: "BB",
};

// type from function return

function createPlace() {
  return {
    planet: "Earth",
    continent: "Asia",
  };
}

type lugarMagico2 = ReturnType<typeof createPlace>;

// ARRAYS

const languagesNo = []; // = una array que siempre va a estar vacia, no tiene tipo

const languages: string[] = []; // = array de strings

languages.push("JavaScript");

const languagesYNumeros: (string | number)[] = []; // = array de strings y numeros

languagesYNumeros.push(2);
languagesYNumeros.push("ola");

const arrayDeFacheros: Facherito[] = []; // = array de tipos personalizados

// matrices
// Tateti
/*
[
  ['x', 'o', 'x'],
  ['o', 'x', ''],
  ['x', '', 'o']
]
*/

type ValorTateti = "X" | "O" | "";

const gameBoard: ValorTateti[][] = [
  ["X", "O", "X"],
  ["O", "X", ""],
  ["X", "", "O"],
]; //esta bien, pero se pueden seguir agregando espacios al tablero

// Tonces usamos Tupla = array con limite fijado de longitud

type GameBoardPosta = [
  [ValorTateti, ValorTateti, ValorTateti],
  [ValorTateti, ValorTateti, ValorTateti],
  [ValorTateti, ValorTateti, ValorTateti]
];

const gameBoardPosta = [
  ["X", "O", "X"],
  ["O", "X", ""],
  ["X", "", "O"],
];

// tupla en react = El UseState
// type State = [string, (newName: string) => void]

// const [nombre, setNombre]: State = useState('ivi')

type RGB = [number, number, number];
const rgb: RGB = [255, 255, 0];
