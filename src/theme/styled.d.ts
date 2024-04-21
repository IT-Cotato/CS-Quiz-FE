import 'styled-components';
import { LegacyThemeType, CotatoDarkThemeType, CotatoLightThemeType } from './theme';

/**
 * Will be deprecated in v2.
 */
declare module 'styled-components' {
  export interface DefaultTheme extends LegacyThemeType {}
}

/**
 * Will be replaced this in v2.
 */
// declare module 'styled-components' {
//   export interface DefaultTheme extends CotatoLightThemeType, CotatoDarkThemeType {}
// }
