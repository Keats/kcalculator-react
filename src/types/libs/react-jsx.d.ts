// Fake API for https://github.com/jbrantly/ts-jsx-loader
declare module React {
    interface TopLevelAPI {
        jsx: (jsx?: string) => React.ReactElement<any>;

        __spread: any; // for JSX Spread Attributes
    }
}
