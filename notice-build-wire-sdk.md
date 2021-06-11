# Build and wire `sushiswap-sdk`

.
Install `sushiswap/sdk` lib from local file

The github repo `sushiswap-sdk` must be set at revision `v5.0.0-canary.7`
Run the below cmds to build and generate the ZIP pack file

```
yarn
rm -rf dist
yarn build
rm -rf sushiswap-sdk-5.0.0-canary.7.tgz
npm pack
```

Copy the ZIP pack file to the folder `sushiswap-interface`

cd folder `sushiswap-interface`
In file `package.json`, replace `"@sushiswap/sdk": "5.0.0-canary.7"`
with `"@sushiswap/sdk": "file:sushiswap-sdk-5.0.0-canary.7.tgz",`
Remember to run `yarn cache clean` befor `yarn`.
Otherwise, legacy cache won't take the new change of ZIP pack file into account.
So, run the below cmds

```
rm -rf node_modules
rm -rf yarn.lock
yarn cache clean
yarn
```
