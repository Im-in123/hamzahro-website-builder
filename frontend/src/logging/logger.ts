type LogLevel = 'trace' | 'log' | 'warn' | 'error';

interface LogFunctions {
  trace: (...args: any[]) => void;
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

type LogInstance = Record<LogLevel, (...args: any[]) => void>;

const createLog = (allowedLevels: LogLevel[]): LogInstance => ({
  trace: (...args) => {
    const c_type: LogLevel = "trace";
    if (allowedLevels.includes(c_type)) {
      console.trace(...args);
    }
  },
  log: (...args) => {
    const c_type: LogLevel = "log";
    if (allowedLevels.includes(c_type)) {
      console.log(...args);
    }
  },
  warn: (...args) => {
    const c_type: LogLevel = "warn";
    if (allowedLevels.includes(c_type)) {
      console.warn(...args);
    }
  },
  error: (...args) => {
    const c_type: LogLevel = "error";
    if (allowedLevels.includes(c_type)) {
      console.error(...args);
    }
  },
});

const allowedLevels: LogLevel[] = ['trace', 'log', 'warn', 'error'];
const allowed: LogLevel[] = ['trace', 'log', 'warn', 'error'];
// Create a log instance with allowed levels ['trace']
export const logger: LogInstance = createLog(allowed);
