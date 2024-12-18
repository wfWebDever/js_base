# Install Husky  lint-staged
[Husky](https://github.com/typicode/husky)

## instll `husky` `lint-staged`

 ``` yarn add husky lint-staged -D ```

## create script 'prepare' to install husky 
 ```
  "scripts": {
    "prepare": "husky",
    "lint": "eslint --ext .jsx,.js,.ts,.tsx src/ --fix "
  },
 
 ```

##  husky init
```npx husky init```

##  modify `.husky/pre-commit`

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

## add config to package.json
must use `eslint` not use `yarn lint`

```
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix"
    ]
  },
```