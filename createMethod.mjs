/*
 * Duffel API Javascript - Method Generator
 *
 * Node script that automatically generates a method's folder and files structure.
 * run with "yarn generate:method"
 *
 * The script generates the following files:
 *
 * index.ts`: module import/export
 * <MethodName>.ts`: method class definition
 * <MethodName>.spec.ts`: method's tests
 * mock<MethodName>.ts`: mock data to use for method's tests
 * <MethodName>Types.d.ts`: method types definition file
 */

/* eslint-disable */
import fs from 'fs'
import colors from 'colors'
import readline from 'readline'

// init io
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let methodName = 'MethodName'
let componentPath = 'src/'
let errorMsg = ''

// questions
// method name
const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question(`Name of the method? (example: Offers) (default: "MethodName"): `, (answer) => {
      if (answer) {
        if (/^[a-zA-Z]+$/.test(answer)) {
          methodName = capitalise(answer.replace(/\s+/g, ''))
        } else {
          errorMsg = 'Method name should be letters only and CamelCase.'
          reject()
        }
      }
      resolve(true)
    })
  })
}

// component folder
const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question(`Where do you want to create the method? (default: src/): `, (answer) => {
      if (answer) {
        componentPath = answer
      }
      resolve(true)
    })
  })
}

// utils
const capitalise = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
const createFile = (fileName, contents) =>
  fs.writeFile(fileName, contents, (err) => {
    if (err) {
      return console.log(err)
    }
  })
const print = () => {
  console.log('\n--------------------------------------------------------')
  console.log('Method '.green + methodName.green + ' created.'.green)
  console.log('--------------------------------------------------------')
  console.log(`Method Name: `.grey + methodName)
  console.log(`Folder: `.grey + componentPath)
  console.log(`Note: `.yellow + `export your component in src/index.ts when done.`.yellow)
  console.log('--------------------------------------------------------')
}
const makeHeader = () => {
  return `
    import { APIResponse, PaginationMeta } from 'types'
    import { Resource } from '../../Resource'
    import { ${methodName} } from './${methodName}Types'
  `
}

// index.ts
const indexContent = () =>
  `export * from "./${methodName}";
`

// MethodName.ts
const methodClass = () =>
  `${makeHeader()}

  export class ${methodName} extends Resource {

  }
  `
// mockMethodName.ts
const mockContent = () =>
  `/** 
  * Create your mock file
  */`

// mockMethodName.d.ts
const definitionFileTypes = () =>
  `/** 
  * Create your definitions file
  */`

// MethodName.spec.ts
const testContent = () =>
  `
import nock from 'nock'
import { Client } from '../../Client'
import ${methodName} from "./${methodName}";
import * as mock${methodName} from './mock${methodName}'

describe("${methodName}", () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test("should get a single offer request", async () => {
    nock(/(.*)/).get('air/endpoint').reply(200, { data: mock${methodName} })

    //const response = await new ${methodName}(new Client({ token: 'mockToken' })).get(mockOfferRequest.id)
    //expect(response.data?.id).toBe(mockOfferRequest.id)
    expect(true).toBe(true)
});
`

// create methods files
const createComponent = () => {
  // create folder
  componentPath = `${componentPath}${methodName}/`
  fs.existsSync(componentPath) || fs.mkdirSync(componentPath)
  // create index.ts
  createFile(`${componentPath}index.ts`, indexContent())
  // create method.ts
  createFile(`${componentPath + methodName}.ts`, methodClass())
  // create component.test.js
  createFile(`${componentPath + methodName}.spec.ts`, testContent())
  // create component.mock.js
  createFile(`${componentPath + `mock${methodName}`}.ts`, mockContent())
  createFile(`${componentPath + methodName}Types.d.js`, definitionFileTypes())
}

const main = async () => {
  try {
    await question1()
    await question2()
    createComponent()
    print()
    rl.close()
  } catch (e) {
    errorMsg !== '' ? console.error(errorMsg.red) : console.error(e)
    process.exit(1)
  }
}

main()
