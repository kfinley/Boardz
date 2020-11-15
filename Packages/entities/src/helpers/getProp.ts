function getProp (obj: { [x: string]: any }, props: any[]): any {
    const prop = props.shift()
    if (!obj[prop] || !props.length) {
      return obj[prop]
    }
    return getProp(obj[prop], props)
  }
  
  export default getProp