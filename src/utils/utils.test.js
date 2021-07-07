import React from 'react';
import deepCopy from './copy';
import getOptionsValues from './misc';
import format_title_string from './formats';

describe("Utils", () => {

  it(" copy > deepCopy()", () => {
     const objToCopy = {
       a: 1,
       b: 2,
       c: 3
     };
     const copiedObj = deepCopy(objToCopy);

     expect(copiedObj).toStrictEqual(objToCopy);
   })

   it("misc > getOptionsValues()", () => {

    const options = [{
      key: "comments",
      value: "OFF"
    },
    {
      key: "otheroption",
      value: "somevalue"
    }];

    const optionValues = getOptionsValues(options, 'comments');

    expect(optionValues).toStrictEqual("OFF");
   })

   it("formats > format_title_string()", () => {
    const title = "Formatear la cadena del titulo";
    const formatted = "formatear-la-cadena-del-titulo";

    expect(format_title_string(title)).toStrictEqual(formatted);
   })

})
