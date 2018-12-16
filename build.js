const Autoprefixer = require('autoprefixer');
const CssNano = require('cssnano');
const Fs = require('fs');
const Postcss = require('postcss');
const Sass = require('node-sass');
const Babel = require('./src/build/babel.js');
const RootPath = require('./src/build/rootpath.js')._();

// The settings
const options = require('./package.json');

// ############################################################################
// ########################## The executable ##################################
// ############################################################################
const createJsFiles = (element, es6File) => {
  // Define some settings
  const settings = [
    {
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['last 1 Chrome version'],
          },
        }],
      ],
      comments: true,
    },
    {
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['last 1 Chrome version'],
          },
        }],
        ['minify'],
      ],
      comments: false,
    },
    {
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['ie 11'],
          },
        }],
      ],
      plugins: [
        '@babel/plugin-transform-classes',
      ],
      comments: true,

    },
    {
      presets: [

        ['@babel/preset-env', {
          targets: {
            browsers: ['ie 11'],
          },
        }],
        ['minify'],
      ],
      plugins: [
        ['@babel/plugin-transform-classes'],
      ],
      comments: false,

    },
  ];

  const outputFiles = [
    `${RootPath}/dist/js/accessible-${element}.js`,
    `${RootPath}/dist/js/accessible-${element}.min.js`,
    `${RootPath}/dist/js/accessible-${element}-es5.js`,
    `${RootPath}/dist/js/accessible-${element}-es5.min.js`,
  ];

  const docFiles = [
    `${RootPath}/docs/_media/js/accessible-${element}.js`,
    `${RootPath}/docs/_media/js/accessible-${element}.min.js`,
    `${RootPath}/docs/_media/js/accessible-${element}-es5.js`,
    `${RootPath}/docs/_media/js/accessible-${element}-es5.min.js`,
  ];

  settings.forEach((setting, index) => {
    Babel.run(es6File, setting, outputFiles[index]);
    Babel.run(es6File, setting, docFiles[index]);
  });
};

const compile = () => {
  // Make sure that the dist paths exist
  if (!Fs.existsSync(`${RootPath}/dist/js`)) {
    Fs.mkdirSync(`${RootPath}/dist/js`, true);
  }

  if (!Fs.existsSync(`${RootPath}/dist/css`)) {
    Fs.mkdirSync(`${RootPath}/dist/css`, true);
  }

  // eslint-disable-next-line no-console
  console.log(`CSS Prefixing for: ${options.settings.browsers} ♻︎  `);

  options.settings.elements.forEach((element) => {
    // Get the contents of the ES-XXXX file
    let es6File = Fs.readFileSync(`${RootPath}/src/elements/js/${element}/${element}.js`, 'utf8');

    if (!es6File) {
      return;
    }

    // Check if there is a css file
    if (Fs.existsSync(`${RootPath}/src/elements/scss/${element}/${element}.scss`)) {
      Sass.render({ file: `${RootPath}/src/elements/scss/${element}/${element}.scss` }, (error, result) => {
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
                // Web Component, eg, the css is part of the shadow dom contents
                if (/{{CSS_CONTENTS_PLACEHOLDER}}/.test(es6File)) {
                  if (typeof res === 'object' && res.css) {
                    Postcss([CssNano])
                      .process(res.css.toString(), { from: undefined })
                      .then((cssMin) => {
                        es6File = es6File.replace('{{CSS_CONTENTS_PLACEHOLDER}}', cssMin.css.toString());
                        createJsFiles(element, es6File);
                      });
                  }
                } else {
                  // Custom Element, eg, the css is a static file
                  if (typeof res === 'object' && res.css) {
                    const out = res.css.toString();
                    Fs.writeFileSync(
                      `${RootPath}/dist/css/accessible-${element}.css`,
                      out,
                      { encoding: 'UTF-8' },
                    );

                    // Make a copy in the docs
                    Fs.writeFileSync(
                      `${RootPath}/docs/_media/css/accessible-${element}.css`,
                      out,
                      { encoding: 'UTF-8' },
                    );

                    Postcss([CssNano])
                      .process(out, { from: undefined })
                      .then((cssMin) => {
                        Fs.writeFileSync(
                          `${RootPath}/dist/css/accessible-${element}.min.css`,
                          cssMin.css.toString(),
                          { encoding: 'UTF-8' },
                        );

                        // Make a copy in the docs
                        Fs.writeFileSync(
                          `${RootPath}/docs/_media/css/accessible-${element}.min.css`,
                          cssMin.css.toString(),
                          { encoding: 'UTF-8' },
                        );
                      });
                  }

                  createJsFiles(element, es6File);
                }
              })

              // Handle errors
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(`${err}`);
                process.exit(-1);
              });

            // eslint-disable-next-line no-console
            console.log(`accessible-${element} was created successfully ✅   `);
          }
        }
      });
    } else {
      createJsFiles(element, es6File);
    }
  });
};

compile();
