var should = require('should'),
	util = require('util'),
	ConsoleClass = require('./_console'),
	_console = new ConsoleClass(),
	index = require('../'),
	chalk = require('chalk'),
	ConsoleLogger = index.ConsoleLogger,
	defaultTravis = process.env.TRAVIS,
	defaultArgs = process.argv;

describe("console", function(){

	before(function(){
		ConsoleLogger.resetColorize();
	});

	after(function(){
		_console.stop();
		ConsoleLogger.resetColorize();
		process.env.TRAVIS = defaultTravis;
		process.argv = defaultArgs;
	});

	it("should be able to log at info", function(callback){
		should(ConsoleLogger).be.an.object;
		try {
			_console.start();
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal('INFO   | hello');
				callback();
			});
			var logger = index.createDefaultLogger();
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.info('hello');
		}
		finally {
			_console.stop();
		}
	});

	it("should be able to log at debug", function(callback){
		should(ConsoleLogger).be.an.object;
		try {
			_console.start();
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal('DEBUG  | hello');
				callback();
			});
			var logger = index.createDefaultLogger();
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.debug('hello');
		}
		finally {
			_console.stop();
		}
	});

	it("should be able to log at trace", function(callback){
		should(ConsoleLogger).be.an.object;
		try {
			_console.start();
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal('TRACE  | hello');
				callback();
			});
			var logger = index.createDefaultLogger();
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.trace('hello');
		}
		finally {
			_console.stop();
		}
	});

	it("should be able to log at warn", function(callback){
		should(ConsoleLogger).be.an.object;
		try {
			_console.start();
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal('WARN   | hello');
				callback();
			});
			var logger = index.createDefaultLogger();
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.warn('hello');
		}
		finally {
			_console.stop();
		}
	});

	it("should be able to log at error", function(callback){
		should(ConsoleLogger).be.an.object;
		try {
			_console.start();
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal('ERROR  | hello');
				callback();
			});
			var logger = index.createDefaultLogger();
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.error('hello');
		}
		finally {
			_console.stop();
		}
	});

	it("should be able to log at fatal", function(callback){
		should(ConsoleLogger).be.an.object;
		try {
			_console.start();
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal('FATAL  | hello');
				callback();
			});
			var logger = index.createDefaultLogger();
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.fatal('hello');
		}
		finally {
			_console.stop();
		}
	});

	it("should be able to log with object but have it ignored", function(callback){
		should(ConsoleLogger).be.an.object;
		try {
			_console.start();
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal('INFO   | hello');
				callback();
			});
			var logger = index.createDefaultLogger();
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.info({a:1},'hello');
		}
		finally {
			_console.stop();
		}
	});

	it("should be able to use format symbols", function(callback){
		try {
			_console.start();
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal('INFO   | hello world 1');
				callback();
			});
			var logger = index.createDefaultLogger();
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.info('hello %s %d','world',1);
		}
		finally {
			_console.stop();
		}
	});

	it("should remove color coding", function(callback){
		var console_ = new ConsoleClass(false);
		try {
			console_.start();
			console_.on('data',function(buf){
				console_.stop();
				should(buf).equal('INFO   | hello world 1');
				callback();
			});
			process.env.TRAVIS = 1; // force log coloring off
			ConsoleLogger.resetColorize();
			var logger = index.createDefaultLogger();
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			var chalk = require('chalk');
			logger.info('hello %s %d',chalk.red('world'),1);
		}
		finally {
			console_.stop();
		}
	});


	it("should remove log level", function(callback){
		var console_ = new ConsoleClass(false);
		try {
			console_.start();
			console_.on('data',function(buf){
				console_.stop();
				should(buf).equal('hello world');
				callback();
			});
			var logger = index.createLogger({prefix:false});
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.info('hello world');
		}
		finally {
			console_.stop();
		}
	});

	it("should remove carriage return marker", function(callback){
		try {
			_console.start();
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal('hello\nworld');
				callback();
			});
			var logger = index.createLogger({prefix:false,showcr:false});
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.info('hello\nworld');
		}
		finally {
			_console.stop();
		}
	});

	it("should show carriage return marker", function(callback){
		try {
			_console.start();
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal('hello↩\nworld↩');
				callback();
			});
			var logger = index.createLogger({prefix:false, showcr:true});
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.info('hello\nworld');
		}
		finally {
			_console.stop();
		}
	});

	it("should show tab marker", function(callback){
		try {
			_console.start();
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal('hello\t↠world');
				callback();
			});
			var logger = index.createLogger({prefix:false});
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.info('hello\tworld');
		}
		finally {
			_console.stop();
		}
	});

	it("should remove tab marker", function(callback){
		try {
			_console.start();
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal('hello\tworld');
				callback();
			});
			var logger = index.createLogger({prefix:false, showtab:false});
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.info('hello\tworld');
		}
		finally {
			_console.stop();
		}
	});

	it("should log the record if there is no message", function(callback){
		try {
			this.timeout(1000);
			_console.start(1000);
			_console.on('data',function(buf){
				_console.stop();
				should(buf).equal(util.format({'hello':'world'}));
				callback();
			});
			var logger = index.createLogger({prefix:false, showtab:false});
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.info({'hello':'world'});
		}
		finally {
			_console.stop();
		}
	});

	it("should mask log record if only argument", function(callback){
		try {
			this.timeout(1000);
			_console.start(1000);
			_console.on('data',function(buf){
				_console.stop();
				should(buf).not.equal(util.format({'password':'1234'}));
				should(buf).equal(util.format({'password':'[HIDDEN]'}));
				callback();
			});
			var logger = index.createLogger({prefix:false, showtab:false});
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.info({'password':'1234'});
		}
		finally {
			_console.stop();
		}
	});

	it("should color code if colorize is specified", function(callback){
		var console_ = new ConsoleClass(false);
		try {
			console_.start();
			console_.on('data',function(buf){
				console_.stop();
				should(buf).equal('\u001b[32mINFO  \u001b[39m \u001b[1m\u001b[90m|\u001b[39m\u001b[22m hello \u001b[31mworld\u001b[39m 1');
				callback();
			});
			var logger = index.createDefaultLogger({colorize:true});
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			logger.info('hello %s %d',chalk.red('world'),1);
		}
		finally {
			console_.stop();
		}
	});

	it("should not color code if colorize is specified as false", function(callback){
		var console_ = new ConsoleClass(false);
		try {
			console_.start();
			console_.on('data',function(buf){
				console_.stop();
				should(buf).equal('INFO   | hello world 1');
				callback();
			});
			var logger = index.createDefaultLogger({colorize:false});
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			var chalk = require('chalk');
			logger.info('hello %s %d',chalk.red('world'),1);
		}
		finally {
			console_.stop();
		}
	});

	it("should not color code if --no-colors is specified", function(callback){
		var console_ = new ConsoleClass(false);
		var args = process.argv;
		try {
			console_.start();
			console_.on('data',function(buf){
				console_.stop();
				should(buf).equal('INFO   | hello world 1');
				callback();
			});
			process.argv = ['node','--no-colors'];
			ConsoleLogger.resetColorize();
			var logger = index.createDefaultLogger();
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			var chalk = require('chalk');
			logger.info('hello %s %d',chalk.red('world'),1);
		}
		finally {
			console_.stop();
			process.argv = args;
		}
	});

	it("should not color code if --no-color is specified", function(callback){
		var console_ = new ConsoleClass(false);
		var args = process.argv;
		try {
			console_.start();
			console_.on('data',function(buf){
				console_.stop();
				should(buf).equal('INFO   | hello world 1');
				callback();
			});
			process.argv = ['node','--no-color'];
			ConsoleLogger.resetColorize();
			var logger = index.createDefaultLogger();
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			var chalk = require('chalk');
			logger.info('hello %s %d',chalk.red('world'),1);
		}
		finally {
			console_.stop();
			process.argv = args;
		}
	});

	it("should color code if --colorize is specified", function(callback){
		var console_ = new ConsoleClass(false);
		var args = process.argv;
		try {
			console_.start();
			console_.on('data',function(buf){
				console_.stop();
				should(buf).equal('\u001b[32mINFO  \u001b[39m \u001b[1m\u001b[90m|\u001b[39m\u001b[22m hello \u001b[31mworld\u001b[39m 1');
				callback();
			});
			process.argv = ['node','--colorize'];
			ConsoleLogger.resetColorize();
			var logger = index.createDefaultLogger();
			should(logger).be.an.object;
			should(logger.info).be.a.function;
			var chalk = require('chalk');
			logger.info('hello %s %d',chalk.red('world'),1);
		}
		finally {
			console_.stop();
			process.argv = args;
		}
	});

});