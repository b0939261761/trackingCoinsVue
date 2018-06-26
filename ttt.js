function onError(callback) {
  return (target, name, descriptor) => {
    const originalFunction = descriptor.value;

    descriptor.value = function(...args) {
      try {
        const result = originalFunction.apply(this, args);
        if (result instanceof Promise) {
          return result.catch(e => callback(e));
        }
        return result;
      } catch (e) {
        return callback(e);
      }
    };
  }
}

function defaultOnError(defaultValue) {
  return onError(() => defaultValue)
}

class Test {

  @onError(e => -100)
  async asyncFunctionCanThrowsError(error) {
    await new Promise(resolve => setTimeout(resolve, 100));
    if (error) {
      throw new Error();
    }
    return 10;
  }

  @defaultOnError(-1)
  async defaultOnThrow() {
  await new Promise(resolve => setTimeout(resolve, 100));
    throw new Error();
  }

}

(async () => {
  const t = new Test();

  console.log('regular', await t.asyncFunctionCanThrowsError());
  console.log('with exception', await t.asyncFunctionCanThrowsError(true));
  console.log('default on error', await t.defaultOnThrow())
})()
