const plugins = [];

if (process.env.NODE_SERVE) {
    plugins.push('react-refresh/babel')
};

module.exports = {
    presets: [
        '@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]
    ],
    plugins: plugins
}