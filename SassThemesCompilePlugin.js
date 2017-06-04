const path = require('path');
const sass = require('node-sass');
const fs = require('fs');
const RawSource = require('webpack-sources/lib/RawSource');

const themeNames = ['green', 'red'];
const themeConfigPath = path.resolve(__dirname, 'app/themes');

function SassThemesCompilePlugin(options) {

}

SassThemesCompilePlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', (compilation) => {
        compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
            const sassFileName = 'styles.scss';
            if(sassFileName in compilation.assets) {
                const sassSource = compilation.assets[sassFileName].source();
                themeNames.forEach(themeName => {
                    const themeCss = sass.renderSync({
                        data: sassSource,
                        importer: (url, prev, done) => {
                            const c = fs.readFileSync(path.resolve(themeConfigPath, `theme-${themeName}.scss`));
                            return {
                                contents: c.toString()
                            };
                        }
                    });
                    compilation.assets[`styles-${themeName}.css`] = new RawSource(themeCss.css.toString());
                });
            }
            console.log('Compilation');
            callback();
        });
    });
};

module.exports = SassThemesCompilePlugin;
