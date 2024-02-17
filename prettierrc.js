module.exports = {
    // Specify the line length that the printer will wrap on.
    printWidth: 80,

    // Specify the number of spaces per indentation-level.
    tabWidth: 2,

    // Indent lines with tabs instead of spaces.
    useTabs: false,

    // Print semicolons at the ends of statements.
    semi: true,

    // Use single quotes instead of double quotes.
    singleQuote: true,

    // Change when properties in objects are quoted.
    quoteProps: "as-needed",

    // Use single quotes instead of double quotes in JSX.
    jsxSingleQuote: true,

    // Print trailing commas wherever possible when multi-line.
    trailingComma: "all",

    // Print spaces between brackets in object literals.
    bracketSpacing: true,

    // Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line.
    jsxBracketSameLine: false,

    // Include parentheses around a sole arrow function parameter.
    arrowParens: "always",

    // Format only a segment of a file.
    rangeStart: 0,
    rangeEnd: Infinity,

    // Specify which parser to use.
    parser: "babel",

    // Specify the file patterns to use with this configuration.
    filepath: "**/*.{js,jsx,ts,tsx,json}",
};
