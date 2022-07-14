# T-systems školenie júl 2022

## nainštalovať
* [Git](https://git-scm.com/downloads)
* [NodeJS LTS (aktuálne 16.16.0)](https://nodejs.org/en/)
* [JRE albo JDK aspoň verzie 17](https://adoptium.net/)
* Nejaké vhodné IDE, ja budem používať [Visual Studio Code](https://code.visualstudio.com/Download)

## zdroje
* https://webdisk.science.upjs.sk/~peter_gursky/angular/

## rozbehanie tsc-watch
* npm i -g typescript tsc-watch
* npm i node
* npm i @types/node --save-dev
* presun countries.json, countries.ts a index.ts do adresára src/
* vytvorenie súboru tsconfig.json:

     {
      "compilerOptions": {
        "target": "esnext",
        "module": "commonjs",
        "outDir": "dist",
        "sourceMap": true,
        "resolveJsonModule": true,
        "types": [
          "node"
       ]
      },
      "include": [
        "src/**/*.ts"
      ],
      "exclude": [
        "node_modules"
      ]
   }

* spustenie **npm run start**