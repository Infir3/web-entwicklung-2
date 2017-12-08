# Übung 1
## Aufgabe 1
```javascript
console.log(Math.PI);
console.log(global.Math.PI);
```

## Aufgabe 2
```javascript
console.log(Math === global.Math);
```

## Aufgabe 3
```javascript
var foo = 'foo';
console.log(global.foo);
```

## Aufgabe 
Die Datei ist, wenn Sie mit node aufgerufen wird, ein Modul. Da jedes Modul innerhalb einer Wrapper-Funktion ausgeführt wird, handelt es sich bei `foo` um eine lokale Variable (und nicht um eine globale Variable). Entsprechend wird dem globalen Objekt `global` auch keine Eigenschaft `foo` hinzugefügt.