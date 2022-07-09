import { MainRuntime } from "@teambit/cli";
import {
  ReactAspect,
  ReactMain,
  UseTypescriptModifiers,
  UseWebpackModifiers,
} from "@teambit/react";
import { EnvsAspect, EnvsMain } from "@teambit/envs";
import { TailwindReactAspect } from "./tailwind-react.aspect";
import {
  previewConfigTransformer,
  devServerConfigTransformer,
} from "./webpack/webpack-transformers";

/* import {
  devConfigTransformer,
  buildConfigTransformer,
} from "./typescript/ts-transformer";
 */
export class TailwindReactMain {
  constructor(private react:ReactMain){}
  static slots = [];

  static dependencies = [ReactAspect, EnvsAspect];

  static runtime = MainRuntime;

  static async provider([react, envs]: [ReactMain, EnvsMain]) {
    const webpackModifiers: UseWebpackModifiers = {
      previewConfig: [previewConfigTransformer],
      devServerConfig: [devServerConfigTransformer],
    };

   /*  const tsModifiers: UseTypescriptModifiers = {
      devConfig: [devConfigTransformer],
      buildConfig: [buildConfigTransformer],
    }; */

    const TailwindReactEnv = envs.compose(react.reactEnv, [
      /**
       * Uncomment to override the config files for TypeScript, Webpack or Jest
       * Your config gets merged with the defaults
       */

      /* react.useTypescript(tsModifiers), */ // note: this cannot be used in conjunction with react.overrideCompiler
      react.useWebpack(webpackModifiers),
      // react.overrideJestConfig(require.resolve('./jest/jest.config')),

      /**
       * override the ESLint default config here then check your files for lint errors
       * @example
       * bit lint
       * bit lint --fix
       */
      react.useEslint({
        transformers: [
          (config) => {
            config.setRule("no-console", ["error"]);
            return config;
          },
        ],
      }),

      /**
       * override the Prettier default config here the check your formatting
       * @example
       * bit format --check
       * bit format
       */
      react.usePrettier({
        transformers: [
          (config) => {
            config.setKey("tabWidth", 2);
            return config;
          },
        ],
      }),

      /**
       * override dependencies here
       * @example
       * Uncomment types to include version 17.0.3 of the types package
       */
      // react.overrideDependencies({
      //   devDependencies: {
      //      '@types/react': '17.0.3'
      //   },
      // }),
    ]);
    envs.registerEnv(TailwindReactEnv);
    return new TailwindReactMain(react);
  }
}

TailwindReactAspect.addRuntime(TailwindReactMain);
