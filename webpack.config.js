var webpack = require("webpack"),
    path = require("path"),
    fileSystem = require("fs"),
    env = require("./utils/env"),
    CleanWebpackPlugin = require("clean-webpack-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    WriteFilePlugin = require("write-file-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

// load the secrets
var alias = {};

var secretsPath = path.join(__dirname, ("secrets." + env.NODE_ENV + ".js"));

var fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

if (fileSystem.existsSync(secretsPath)) {
  alias["secrets"] = secretsPath;
}

var options = {
  entry: {
      popup: path.join(__dirname, "src", "popup.js"),
      background: path.join(__dirname, "src", "background.js")
      


  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
          })
      },
      {
        test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'raw-loader' // add raw loader npm package to make it work.
      }
    ]
  },
  resolve: {
    alias: alias
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(["build"]),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
    }),
    new CopyWebpackPlugin([
      {
        from: "src/manifest.json",
        transform: function (content, path) {
          // generates the manifest file using the package.json informations
          return Buffer.from(JSON.stringify({
            description: process.env.npm_package_description,
            version: process.env.npm_package_version,
            ...JSON.parse(content.toString())
          }))
        }
      },
      {
        from: 'src/img/icon-16.png'
      },
      {
          from: 'src/img/icon-48.png'
      },
      {
          from: 'src/img/icon-128.png'
      }
    ]),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "popup.html"),
        filename: "popup.html",
        chunks: ["popup"]
    }),
    new ExtractTextPlugin({
        filename:"styles.css",
        allChunks:true
    }),

    new WriteFilePlugin()
  ]
};

if (env.NODE_ENV === "development") {
  options.devtool = "source-map";
}

module.exports = options;
