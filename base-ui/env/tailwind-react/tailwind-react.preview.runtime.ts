import { PreviewRuntime } from "@teambit/preview";
import { ReactAspect, ReactPreview } from "@teambit/react";
// uncomment the line below and install the theme if you want to use our theme or create your own and import it here
//import { ThemeCompositions } from '@teambit/documenter.theme.theme-compositions';

import { TailwindReactAspect } from "./tailwind-react.aspect";
//import "@buildcities/build-core-components.tailwind-styles"
import "@buildcities/base-ui.tailwind-styles"

export class TailwindReactPreviewMain {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    const tailwindReactPreviewMain = new TailwindReactPreviewMain();
    // uncomment the line below to register a new provider to wrap all compositions using this environment with a custom theme.
    // react.registerProvider([ThemeCompositions]);
    const previewDecorators = [
      /* add preview providers here */
    ];
    react.registerProvider(previewDecorators); 

    return tailwindReactPreviewMain;
  }
}

TailwindReactAspect.addRuntime(TailwindReactPreviewMain);
