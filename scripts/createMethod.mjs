/* eslint-disable no-console */
/*
 * Duffel API Javascript - Method Generator
 *
 * Node script that automatically generates a method's folder and files structure.
 * run with "yarn generate:method"
 *
 * The script generates the following files for a given method:
 *
 * index.ts`: module import/export
 * <MethodName>.ts`: class definition
 * <MethodName>.spec.ts`: tests
 * mock<MethodName>.ts`: mock data to use for tests
 * <MethodName>Types.d.ts`: type definitions file
 */

import fs from 'fs'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import colors from 'colors'
import readline from 'readline'

// init io
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let methodName = 'MethodName'
let methodPath = 'src/'
let errorMsg = ''

// method name
const methodNameQuestion = () => {
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

// method folder
const folderQuestion = () => {
  return new Promise((resolve) => {
    rl.question(`Where do you want to create the method? (default: src/): `, (answer) => {
      if (answer) {
        methodPath = answer
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
  console.log(`Folder: `.grey + methodPath)
  console.log(`Note: `.yellow + `export your method in src/index.ts when done.`.yellow)
  console.log('--------------------------------------------------------')
}
const makeHeader = () => {
  return `import { APIResponse, PaginationMeta } from 'types'
import { Resource } from '../../Resource'
import { ${methodName}Types } from './${methodName}Types'
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

}`

// mockMethodName.ts
const mockContent = () =>
  `/**
* Create your mock file
*/

export const mock${methodName} = {}`

// mockMethodName.d.ts
const definitionFileTypes = () =>
  `/**
* Create your definitions file
*/
`

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

  test("should get ${methodName}", async () => {
    //nock(/(.*)/).get('/air/endpoint').reply(200, { data: mock${methodName} })

    // uncomment these lines
    //const response = await new ${methodName}(new Client({ token: 'mockToken' })).get(mockOfferRequest.id)
    //expect(response.data?.id).toBe(mockOfferRequest.id)
    expect(true).toBe(true)
  })
});
`

const createMethodFiles = () => {
  // create folder
  methodPath = `${methodPath}${methodName}/`
  fs.existsSync(methodPath) || fs.mkdirSync(methodPath)
  // create index.ts
  createFile(`${methodPath}index.ts`, indexContent())
  // create MethodName.ts
  createFile(`${methodPath + methodName}.ts`, methodClass())
  // create MethodName.spec.ts
  createFile(`${methodPath + methodName}.spec.ts`, testContent())
  // create mockMethodName.ts
  createFile(`${methodPath + `mock${methodName}`}.ts`, mockContent())
  createFile(`${methodPath + methodName}.d.ts`, definitionFileTypes())
}

const main = async () => {
  try {
    await methodNameQuestion()
    await folderQuestion()
    createMethodFiles()
    print()
    rl.close()
  } catch (e) {
    errorMsg !== '' ? console.error(errorMsg.red) : console.error(e)
    process.exit(1)
  }
}

main()
