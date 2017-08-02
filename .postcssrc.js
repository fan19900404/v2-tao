// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    // to edit target browsers: use "browserlist" field in package.json
    'postcss-px2rem': { remUnit: 100 },
    autoprefixer: {
      browsers: [
        '> 1%',
        'iOS >= 7',
        'Android >= 4',
        'IE >= 10',
        'last 2 versions',
        'not ie <= 8',
      ],
    },
  },
};
