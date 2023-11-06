const convertArrayIntoObject = (data) => {
    const resp = [];
    for (let i = 1; i < data.length; i += 1) {
      const obj = {};
  
      for (let j = 0; j < data[i].length; j += 1) {
        const key = data[0][j];
        obj[`${key}`] = data[i][j];
      }
  
      const newObj = convert(obj);
      const {
        name: { firstName, lastName },
        age,
        address,
        gender,
        additional_info,
      } = obj;
  
      resp.push({
        name: `${firstName} ${lastName}`,
        age: parseInt(age, 10),
        address,
        gender,
        additional_info,
      });
      console.log(newObj);
    }
  
    return resp;
  };
  
module.exports = { convertArrayIntoObject };
  