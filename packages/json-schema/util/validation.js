const validationFilter = data => {
  let resultData = data;
  resultData = resultData.map(item => {
    let returnItem;
    switch (item.type) {
      case "minLength": {
        returnItem = {
          ...item,
          min: Number(item.param)
        };
        delete returnItem.type;
        break;
      }
      case "maxLength": {
        returnItem = {
          ...item,
          max: Number(item.param)
        };
        delete returnItem.type;
        break;
      }
      case "minimum": {
        returnItem = {
          validator: (rule, value, callback) => {
            if (value < Number(item.param)) {
              callback(new Error(item.message));
            } else {
              callback();
            }
          }
        };
        break;
      }
      case "maximum": {
        returnItem = {
          validator: (rule, value, callback) => {
            if (value > Number(item.param)) {
              callback(new Error(item.message));
            } else {
              callback();
            }
          }
        };
        break;
      }
      //   正则表达式
      case "pattern": {
        returnItem = {
          ...item,
          pattern: item.param
        };
        delete returnItem.type;
        break;
      }
      case "required": {
        returnItem = {
          ...item,
          required: true
        };
        delete returnItem.type;
        break;
      }
      case "customValidate": {
        returnItem = {
          validator: item.param.compiled
        };
      }
    }
    return returnItem;
  });
  return resultData;
};
export default validationFilter;
