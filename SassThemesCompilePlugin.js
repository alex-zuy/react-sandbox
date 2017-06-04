const fs = require('fs');
const path = require('path');

const sass = require('node-sass');
const RawSource = require('webpack-sources/lib/RawSource');

const sassFileName = 'styles.scss';
const themeNames = ['green', 'red'];
const themeConfigPath = path.resolve(__dirname, 'app/themes');
const themeConfigImportUrl = 'theme-config.scss';
const sassImportPath = path.resolve(__dirname, 'app');

function SassThemesCompilePlugin(options) {

}

SassThemesCompilePlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', (compilation) => {
        compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
            if(sassFileName in compilation.assets) {
                const sassSource = compilation.assets[sassFileName].source();
                themeNames.forEach(themeName => {
                    const compilationResult = this.compileSass(sassSource, themeName);
                    compilation.assets[`styles-${themeName}.css`] = new RawSource(compilationResult.css.toString());
                });
            }
            console.log('Compilation');
            callback();
        });
    });
};

SassThemesCompilePlugin.prototype.compileSass = function(sassSource, themeName) {
    return sass.renderSync({
        data: sassSource,
        outputStyle: 'compressed',
        importer: (url, prev, done) => {
            if (url === themeConfigImportUrl) {
                const themeConfigFilePath = path.resolve(themeConfigPath, `theme-${themeName}.scss`);
                const configContents = fs.readFileSync(themeConfigFilePath).toString();
                return {contents: configContents};
            } else {
                const path = path.resolve(sassImportPath, url);
                return fs.existsSync(path) ? {file: path} : null;
            }
        }
    });
};

module.exports = SassThemesCompilePlugin;
