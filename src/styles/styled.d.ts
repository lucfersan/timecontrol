import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      white: string;
      background: string;
      text: string;
      red: string;
      done: string;
      green: string;
    };
  }
}
