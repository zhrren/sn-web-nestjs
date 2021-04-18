import {Injectable, LoggerService, Scope} from '@nestjs/common';
import {createLogger, format, transports} from "winston";
import "winston-daily-rotate-file";

const myFormat = format.printf(({level, message, context, timestamp}) => {
  return `${timestamp} [${level}][${context}]: ${message}`;
});

const errorLogger = createLogger({
  level: 'warn',
  defaultMeta: 'user-service',
  format: format.combine(
    format.timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: 'log/error-%DATE%.log',
      datePattern: 'YYMMDD'
    })
  ]
});

const infoLogger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: 'log/info-%DATE%.log',
      datePattern: 'YYMMDD'
    })
  ]
});

@Injectable({scope: Scope.TRANSIENT})
export class Logger implements LoggerService {
  context: string = ''

  setContext(context: string) {
    this.context = context
  }

  log(message: any, context?: string): any {
    infoLogger.info(message, {context: context ?? this.context})
  }

  debug(message: any, context?: string): any {
    infoLogger.debug(message, {context: context ?? this.context})
  }

  verbose(message: any, context?: string): any {
    infoLogger.verbose(message, {context: context ?? this.context})
  }

  error(message: any, trace?: string, context?: string): any {
    errorLogger.error(message, trace, {context: context ?? this.context})
  }

  warn(message: any, context?: string): any {
    errorLogger.warn(message, {context: context ?? this.context})
  }
}
