export class Logger {
  static log(category, message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${category} ${message}`);
  }

  static error(category, message, error = null) {
    const timestamp = new Date().toLocaleTimeString();
    console.error(`[${timestamp}] ❌ ${category} ${message}`);
    if (error) {
      console.error(error);
    }
  }

  static success(category, message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ✅ ${category} ${message}`);
  }

  static warning(category, message) {
    const timestamp = new Date().toLocaleTimeString();
    console.warn(`[${timestamp}] ⚠️ ${category} ${message}`);
  }

  static info(category, message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ℹ️ ${category} ${message}`);
  }

  static debug(category, message) {
    if (process.env.DEBUG === 'true') {
      const timestamp = new Date().toLocaleTimeString();
      console.log(`[${timestamp}] 🐛 ${category} ${message}`);
    }
  }
}

export default Logger;
