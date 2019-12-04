const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
// import resolve from 'rollup-plugin-node-resolve';

const terser = require('rollup-plugin-terser');

const Autoprefixer = require('autoprefixer');
const CssNano = require('cssnano');
const Fs = require('fs');
const Postcss = require('postcss');
const Sass = require('node-sass');
const RootPath = process.cwd();

// The settings
const options = require('./package.json');

// ############################################################################
// ########################## The executable ##################################
// ############################################################################

// Rollup
async function build(opts) {
  // create a bundle
  const bundle = await rollup.rollup(opts);

  // or write the bundle to disk
  await bundle.write(opts);
}

const compile = () => {
  // Make sure that the dist paths exist
  if (!Fs.existsSync(`${RootPath}/dist`)) {
    Fs.mkdirSync(`${RootPath}/dist`, true);
  }

  if (!Fs.existsSync(`${RootPath}/dist/js`)) {
    Fs.mkdirSync(`${RootPath}/dist/js`, true);
  }

  if (!Fs.existsSync(`${RootPath}/dist/css`)) {
    Fs.mkdirSync(`${RootPath}/dist/css`, true);
  }

  if (!Fs.existsSync(`${RootPath}/docs/_media/css`)) {
    Fs.mkdirSync(`${RootPath}/docs/_media/css`, true);
  }

  if (!Fs.existsSync(`${RootPath}/docs/_media/js`)) {
    Fs.mkdirSync(`${RootPath}/docs/_media/js`, true);
  }

  // eslint-disable-next-line no-console
  console.log(`CSS Prefixing for: ${options.settings.es5Browsers} ♻︎  `);

  options.settings.elements.forEach((element) => {
    if (!Fs.existsSync(`${RootPath}/src/elements/${element}/${element}.js`)) {
      return;
    }

    const jsOutDist = `${RootPath}/dist/js/accessible-${element}`;
    // Build the modern part
    build({
      input: `${RootPath}/src/elements/${element}/${element}.js`,
      output: {
        file: `${jsOutDist}.es6module.js`,
        format: 'iife',
        name: `${jsOutDist}.es6.js`,
      },
      plugins: [
        // babel({
        //   presets: [
        //     [
        //       '@babel/preset-env',
        //       {
        //         modules: false,
        //         targets: {
        //           browsers: ['last 2 versions'],
        //         },
        //       },
        //     ],
        //   ],
        // }),
      ],
    });

    build({
      input: `${RootPath}/src/elements/${element}/${element}.js`,
      output: {
        file: `${jsOutDist}.es6module.min.js`,
        sourcemap: false,
        format: 'esm',
        name: element,
      },
      plugins: [
        terser.terser(),
        // babel({
        //   presets: [
        //     [
        //       '@babel/preset-env',
        //       {
        //         modules: false,
        //         targets: {
        //           browsers: ['last 2 versions'],
        //         },
        //       },
        //     ],
        //   ],
        // }),
      ],
    });

    // Build the legacy part
    // /**
    build({
      input: `${RootPath}/src/elements/${element}/${element}.js`,
      output: {
        file: `${jsOutDist}.es5.js`,
        format: 'iife',
        name: element,
      },
      plugins: [
        babel({
          externalHelpers: false,
          exclude: './node_modules/**',
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                targets: {
                  browsers: ['ie 11'],
                },
              },
            ],
          ],
        }),
      ],
    });

    build({
      input: `${RootPath}/src/elements/${element}/${element}.js`,
      output: {
        file: `${jsOutDist}.es5.min.js`,
        format: 'iife',
        name: element,
      },
      plugins: [
        terser.terser(),
        babel({
          externalHelpers: false,
          exclude: './node_modules/**',
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                targets: {
                  browsers: ['ie 11'],
                },
              },
            ],
          ],
        }),
      ],
    });
    // */
    // Check if there is a css file
    if (Fs.existsSync(`${RootPath}/src/elements/${element}/${element}.scss`)) {
      Sass.render({ file: `${RootPath}/src/elements/${element}/${element}.scss` }, (error, result) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error(`${error.column}`);
          // eslint-disable-next-line no-console
          console.error(`${error.message}`);
          // eslint-disable-next-line no-console
          console.error(`${error.line}`);
        } else {
          // Auto prefixing
          const cleaner = Postcss(
            [
              Autoprefixer({
                env: {
                  targets: {
                    browsers: [options.settings.browsers],
                  },
                },
              }),
            ],
          );

          if (typeof result === 'object' && result.css) {
            cleaner.process(result.css.toString(), { from: undefined })
              .then((res) => {
                // Custom Element, eg, the css is a static file
                if (typeof res === 'object' && res.css) {
                  const out = res.css.toString();
                  Fs.writeFileSync(
                    `${RootPath}/dist/css/joomla-${element}.css`,
                    out,
                    { encoding: 'UTF-8' },
                  );

                  // Make a copy in the docs
                  Fs.writeFileSync(
                    `${RootPath}/docs/_media/css/joomla-${element}.css`,
                    out,
                    { encoding: 'UTF-8' },
                  );

                  Postcss([CssNano])
                    .process(out, { from: undefined })
                    .then((cssMin) => {
                      Fs.writeFileSync(
                        `${RootPath}/dist/css/joomla-${element}.min.css`,
                        cssMin.css.toString(),
                        { encoding: 'UTF-8' },
                      );

                      // Make a copy in the docs
                      Fs.writeFileSync(
                        `${RootPath}/docs/_media/css/joomla-${element}.min.css`,
                        cssMin.css.toString(),
                        { encoding: 'UTF-8' },
                      );
                    });
                }
              })

              // Handle errors
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(`${err}`);
                process.exit(-1);
              });

            // eslint-disable-next-line no-console
            console.log(`joomla-${element} stylesheet was created successfully ✅   `);
          }
        }
      });
    }
  });
};

compile();
