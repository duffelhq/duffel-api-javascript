type TransformFn = (key: string) => string

export const transformDataKeys = (value: any, transformFunction: TransformFn): any => {
  if (Array.isArray(value)) return value.map((v) => transformDataKeys(v, transformFunction))

  if (value && typeof value === 'object') {
    return Object.keys(value).reduce((collected, key) => {
      const newKey = transformFunction(key)
      const updatedValue = transformDataKeys(value[key], transformFunction)
      collected[newKey] = updatedValue
      return collected
    }, {} as { [key: string]: any })
  }

  return value
}
