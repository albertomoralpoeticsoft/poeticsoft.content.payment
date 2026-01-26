const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pluginname = 'poeticsoft-content-payment'
const destdir = path.join(__dirname, pluginname)
const pluginpublic = '/wp-content/plugins/' + pluginname

module.exports = env => {  
                                                    
  const input = Object.keys(env)[2] || ''

  const params = input.split('-')
  const type = params[0] || 'block' // block 
  const name = params[1] || 'base' // base | etc.

  let mode = params[2] || 'dev' // dev | prod
  let watch = params[3] || 'si' // si | no

  const paths = {
    output: destdir  + '/' + type + '/' + name,
    public: pluginpublic,
    cssfilename: '[name].css'
  }
  let entry = {}
  let externals = {}  

  const wpblockexternals = {
    '@wordpress/element': 'wp.element',
    '@wordpress/i18n': 'wp.i18n',
    '@wordpress/blocks': 'wp.blocks'
  }
  const wpcompexternals = {          
    react: 'wp.element',
    'react-dom': 'wp.element'
  }

  switch (type) {

    case 'block':
      
      paths.output = destdir  + '/block/' + name + '/build'

      entry = {
        editor: './src/block/' + name + '/editor.js',
        view: './src/block/' + name + '/view.js'
      }

      externals = wpblockexternals

      break;

    case 'ui':
      
      paths.output = destdir + '/ui/' + name 

      entry = {
        main: './src/ui/' + name + '/main.js'
      }

      console.log(name)

      if(name == 'admin/calendar') {

        externals = wpcompexternals
      }

      break;

    default:

      break
  }

  const config = {
    context: __dirname,
    stats: 'minimal',
    watch: watch == 'si',
    name: 'minimal',
    entry: entry,
    output: {
      path: paths.output,
      publicPath: paths.public,
      filename: '[name].js'
    },
    mode: mode == 'prod' ? 'production' : 'development',
    devtool: mode == 'prod' ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [          
            { 
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react'
                ]
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            { 
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [
            { 
              loader: MiniCssExtractPlugin.loader
            },
            'style-loader',
            'css-loader'
          ]
        },
        // Assets
        {
          test: /\.(jpg|jpeg|png|gif|svg|woff|ttf|eot|mp3|woff|woff2|webm|mp4)$/,
          type: 'asset/resource',
          generator: {
            emit: false,
            filename: content => { 

              return content.filename.replace(pluginname, '')
            }
          }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: paths.cssfilename
      })
    ],
    resolve: {
      extensions: ['.js'],
      alias: {
        assets: path.resolve(destdir + '/assets'),       
        blocks: path.join(__dirname, pluginname, 'block'),       
        styles: path.join(__dirname, 'src', 'styles'),
        uiutils: path.join(__dirname, 'src', 'ui', 'utils'),
      }
    },
    externals: externals
  }

  return config
}