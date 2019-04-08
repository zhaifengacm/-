export const isArray = (arr) => {
  return Object.prototype.toString.call(arr) === '[object Array]';
};


export const isPlain = (obj) => {
  let hasOwnProperty = Object.prototype.hasOwnProperty;
  let key;

  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]' || !('isPrototypeOf' in obj)) {
    return false;
  }
  // 判断new fun()自定义对象的情况
  // constructor不是继承自原型链的
  // 并且原型中有isPrototypeOf方法才是Object
  if (obj.constructor && !hasOwnProperty.call(obj, 'constructor') && !hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false;
  }
  // 判断有继承的情况
  // 如果有一项是继承过来的，那么一定不是字面量Object
  // OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
  for (key in obj) {}
  return key === undefined || hasOwnProperty.call(obj, key);
};



export const cloneObject = (src) => {
  let tar = src;
  let i;
  let len;
  if (!src || src instanceof Number || src instanceof String || src instanceof Boolean) {
    return src;
  } else if (isArray(src)) {
    tar = [];
    var tarLen = 0;
    for (i = 0, len = src.length; i < len; i++) {
      tar[tarLen++] = cloneObject(src[i]);
    }
  } else if (isPlain(src)) {
    tar = {};
    for (i in src) {
      if (src.hasOwnProperty(i)) {
        tar[i] = cloneObject(src[i]);
      }
    }
  }
  return tar;
};


