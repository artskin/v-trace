//去除换行 
function ClearBr(key:string) { 
    key = key.replace(/<\/?.+?>/g,""); 
    key = key.replace(/[\r\n]/g, ""); 
    return key; 
}
function formatChar (c:any) {
    const replacements:any = {
        "'": "\\'",
        '"': '\\"',
        '\\': '\\\\',
        '\b': '\\b',
        '\f': '\\f',
        '\n': '\\n',
        '\r': '\\r',
        '\t': '\\t',
        '\v': '\\v',
        '\0': '\\0',
        '\u2028': '\\u2028',
        '\u2029': '\\u2029',
    }
    console.log(replacements[c])
    // if (replacements[c]) {
    //     return replacements[c]
    // }

    // if (c < ' ') {
    //     console.log('都是')
    //     const hexString = c.charCodeAt(0).toString(16)
    //     return '\\x' + ('00' + hexString).substring(hexString.length)
    // }

    return c
}

export const str_parse = (str:string)=>{
    //console.log(str.trim().split(","))
    // let resultStr = str.trim().split(",")
    // resultStr.map((item)=>{
    //     console.log(item)
    //     console.log(ClearBr(item).trim())
    // })
    console.log(formatChar(str))
    let clearStr = formatChar(str)//str.replace(/\s+/g, '')
    //console.log(clearStr);
    // clearStr.split(",").map(it=>{
    //     console.log(it)
    // })
    return clearStr.split(',').map(x => ClearBr(x).split(':').map(y => ClearBr(y).trim()))
    .reduce((a:any, x) => {
        a[x[0]] = x[1];
        return a;
    }, {});
    // return str.trim().split(",").reduce((acc, item) => {
    //     console.log(acc, item)
    //   const [key, val = ""] = item.trim().split(":");
    //   let newVal:unknown = val.trim();
  
    //   if (newVal == "null") {
    //     newVal = null;
    //   } else if (newVal == "undefined") {
    //     newVal = void 0;
    //   } else if (!Number.isNaN(Number(newVal))) {
    //     newVal = Number(newVal);
    //   }else if (newVal == "true" || newVal == "false") {
    //     newVal = Boolean(newVal);
    //   }
    //   return { ...acc, [key.trim()]: newVal };
    // }, {});
}
 