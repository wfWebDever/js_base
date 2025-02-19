# Install Husky to auto check the code commit
[Husky](https://github.com/typicode/husky)

 - instll husky 
 ```yarn add husky -D ```

 - create script 'prepare' to install husky 
 ```
  "scripts": {
    "prepare": "husky install",
    "lint": "eslint --ext .jsx,.js,.ts,.tsx src/ --fix "
  },

  
  
  //  yarn prepare
 
 ```
- add hook to ./husky dir, you will see the script in the ./husky/ dir

```npx husky add .husky/pre-commit "yarn lint"```

- it will exec the 'yarn lint' to fix the code when commit 
- This will find a problem that if you fix the error through the script, you have to execute ```yarn add .``` again
通过执行eslint fix修复错误后 发现文件修改了 还需要执行一次add 错误，有点繁琐，有没有一个一个工具可以直接把修复好的文件直接add呢 

- need the `lint-staged`

`yarn add lint-staged -D`
- modify the ./husky/pre-commit file 

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged

```
- add config to package.json

```
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix --config .eslintrc",
      "bash -c 'tsc --project tsconfig.json --noEmit'" //必须指定配置文件 不然会导致执行的不一致
    ]
  },
```



