declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.scss' {
  const content: any;
  export default content;
}

declare module '*.less' {
  const content: any;
  export default content;
}

declare module 'simple-universal-style-loader' {
  export type Part = {
    css: string;
    media: string;
    sourceMap: string;
  };
  export type StyleInfo = {
    id: string;
    parts: Part[];
  };
  export const getStyles: () => StyleInfo[];
}
