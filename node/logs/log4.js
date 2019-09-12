const log4js = require('log4js')

log4js.configure({
  replaceConsole: true,
  appenders: {
    stdout: { //控制台输出
      type: 'console'
    },
    trace: {
      type: 'dateFile',
      filename: 'logs/tracelog/',
      pattern: 'trace-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    debug: {
      type: 'dateFile',
      filename: 'logs/debuglog/',
      pattern: 'debug-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    info: {
      type: 'dateFile',
      filename: 'logs/infolog/',
      pattern: 'info-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    warn: {
      type: 'dateFile',
      filename: 'logs/warnlog/',
      pattern: 'warn-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    error: {
      type: 'dateFile',
      filename: 'logs/errorlog/',
      pattern: 'error-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    fatal: {
      type: 'dateFile',
      filename: 'logs/fatallog/',
      pattern: 'fatal-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
  },
  categories: {
    trace: {
      appenders: ['stdout', 'trace'],
      level: 'trace'
    }, //appenders:采用的appender,取appenders项,level:设置级别
    debug: {
      appenders: ['stdout', 'debug'],
      level: 'debug'
    },
    default: {
      appenders: ['stdout', 'info'],
      level: 'info'
    },
    warn: {
      appenders: ['stdout', 'warn'],
      level: 'warn'
    },
    error: {
      appenders: ['stdout', 'error'],
      level: 'error'
    },
    fatal: {
      appenders: ['stdout', 'fatal'],
      level: 'fatal'
    },
  }
})

exports.getLogger = function (name) {
  //name取categories项
  return log4js.getLogger(name || 'info')
}

exports.useLogger = function (app, logger) {
  //用来与express结合
  app.use(log4js.connectLogger(logger || log4js.getLogger('info'), {
    format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]' //自定义输出格式
  }))
}