const getOptionsValues = (options, optGroup) => {
  const optsValue = options.filter(o => o.key === optGroup);
  if(optsValue.length === 0){
    return [];
  }
  else {
    return optsValue[0].value
  }
}

export default getOptionsValues;
