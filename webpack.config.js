const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

// module.exports = {
//   output: {
//     uniqueName: "billing",
//     publicPath: "auto"
//   },
//   optimization: {
//     runtimeChunk: false
//   },   
//   resolve: {
//     alias: {
//       ...sharedMappings.getAliases(),
//     }
//   },
//   experiments: {
//     outputModule: true
//   },
//   plugins: [
//     new ModuleFederationPlugin({
//         library: { type: "module" },

//         // For remotes (please adjust)
//         // name: "billing",
//         // filename: "remoteEntry.js",
//         // exposes: {
//         //     './Component': './/src/app/app.component.ts',
//         // },        

//         // For hosts (please adjust)
//         // remotes: {
//         //     "mfe1": "http://localhost:3000/remoteEntry.js",

//         // },

//         shared: share({
//           "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
//           "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
//           "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
//           "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

//           ...sharedMappings.getDescriptors()
//         })

//     }),
//     sharedMappings.getPlugin()
//   ],
// };

module.exports = {
  output: {
    uniqueName: "billing",
    publicPath: "auto",
    // Add script type for remove JS Error from console
    scriptType: "text/javascript"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      // For remotes (please Add 5 this Line)
      name: "billing",
      filename: "remoteEntry.js",
      exposes: {
        './BillingModule': './/src/app/billing/billing.module.ts',
      },

      shared: share({
        "@angular/core": {
          singleton: true, strictVersion: true,
          requiredVersion: 'auto'
        },
        "@angular/common": {
          singleton: true, strictVersion: true,
          requiredVersion: 'auto'
        },
        "@angular/common/http": {
          singleton: true, strictVersion:
            true, requiredVersion: 'auto'
        },
        "@angular/router": {
          singleton: true, strictVersion: true,
          requiredVersion: 'auto'
        },

        ...sharedMappings.getDescriptors()
      })

    }), sharedMappings.getPlugin()

  ],
};