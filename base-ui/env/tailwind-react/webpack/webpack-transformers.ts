import {
  WebpackConfigTransformer,
  WebpackConfigMutator,
  WebpackConfigTransformContext,
} from "@teambit/webpack";
import * as stylesRegexps from "@teambit/webpack.modules.style-regexps";
import tailwindcssPlugin from "tailwindcss";
import { tailwindConfigPath } from "@buildcities/base-ui.tailwind-styles";
/**
 * Transformation to apply for both preview and dev server
 * @param config
 * @param _context
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function commonTransformation(
  config: WebpackConfigMutator,
  _context: WebpackConfigTransformContext
) {
  // console.log("i ran")
  // Merge config with the webpack.config.js file if you choose to import a module export format config.
  // config.merge([webpackConfig]);
  // config.addAliases({});
  // config.addModuleRule(youRuleHere);
  const oneOfRule = findOneOfRuleInPreviewConfig(config?.raw?.module?.rules);
  const cssRule = findCssRuleByCssNoModuleRegexp(oneOfRule);
  if (!cssRule) {
    throw new Error(
      "css rule not found. this probably means the webpack config of bit itself has changed"
    );
  }
  // throw new Error("i failed")
  // we already have a postcss loader
  // we already have a postcss loader
  
  const postcssLoader = findPostcssLoaderInRule(cssRule.use);
  if (!postcssLoader) {
    throw new Error(
      "postcss loader not found. this probably means the webpack config of bit itself has changed"
    );
  }
  postcssLoader.options.postcssOptions.plugins.unshift(
    tailwindcssPlugin(tailwindConfigPath)
  );

  return config;
}

/**
 * Transformation for the preview only
 * @param config
 * @param context
 * @returns
 */
export const previewConfigTransformer: WebpackConfigTransformer = (
  config: WebpackConfigMutator,
  context: WebpackConfigTransformContext
) => {
  const newConfig = commonTransformation(config, context);
  return newConfig;
};

/**
 * Transformation for the dev server only
 * @param config
 * @param context
 * @returns
 */
export const devServerConfigTransformer: WebpackConfigTransformer = (
  config: WebpackConfigMutator,
  context: WebpackConfigTransformContext
) => {
  const newConfig = commonTransformation(config, context);
  return newConfig;
};

function findCssRuleByCssNoModuleRegexp(rules: Array<any> = []) {
  return rules.find(
    (rule) => rule.test.toString() === stylesRegexps.cssNoModulesRegex.toString()
  );
}

function findOneOfRuleInPreviewConfig(rules: Array<any> = []) {
  const rule = rules.find((rule) => !!rule.oneOf);
  return rule.oneOf;
}

function findPostcssLoaderInRule(loaders: Array<any>) {
  return loaders.find((loader) => loader.loader.includes("postcss"));
}
