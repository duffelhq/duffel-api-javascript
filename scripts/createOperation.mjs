/* eslint-disable no-console */
/*
 * Duffel API Javascript - Operation Generator
 *
 * Node script that automatically generates a operation's folder and files structure.
 * run with "yarn generate:operation"
 *
 * The script generates the following files for a given operation:
 *
 * index.ts`: module import/export
 * <OperationName>.ts`: class definition
 * <OperationName>.spec.ts`: tests
 * mock<OperationName>.ts`: mock data to use for tests
 * <OperationName>Types.d.ts`: type definitions file
 */

import fs from 'fs'
import path from 'path'
import readline from 'readline'

// init io
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let operationName = 'OperationName'
const __dirname = 'src'
let operationPath = path.resolve(__dirname, 'src')
let errorMsg = ''

// operation name
const methodNameQuestion = () => {
  return new Promise((resolve, reject) => {
    rl.question(
      `Name of the operation? (example: Offers) (default: "OperationName"): `,
      (answer) => {
        operationPath = path.join(__dirname, operationName)
        if (answer) {
          if (/^[A-z]+$/.test(answer)) {
            operationName = capitalise(answer)
          } else {
            errorMsg = 'Method name should be letters only and CamelCase.'
            reject()
          }
        }
        resolve(true)
      },
    )
  })
}

// operation folder
const folderQuestion = () => {
  return new Promise((resolve) => {
    rl.question(
      `Where do you want to create the operation? (default/root: src): `,
      (answer) => {
        if (answer) {
          operationPath = path.join(__dirname, answer, operationName)
        }
        resolve(true)
      },
    )
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
  console.log('Method '.green + operationName.green + ' created.'.green)
  console.log('--------------------------------------------------------')
  console.log(`Method Name: `.grey + operationName)
  console.log(`Folder: `.grey + operationPath)
  console.log(
    `Note: `.yellow + `export your operation in src/index.ts when done.`.yellow,
  )
  console.log('--------------------------------------------------------')
}
const makeHeader = () => {
  return `import { DuffelResponse } from '../../types'
import { Resource } from '../../Resource'
`
}

// index.ts
const indexContent = () =>
  `export * from "./${operationName}";
`

// OperationName.ts
const methodClass = () =>
  `${makeHeader()}
export class ${operationName} extends Resource {

  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'air/endpoint'
  }

}`

// mockMethodName.ts
const mockContent = () =>
  `/**
* Create your mock file
*/

export const mock${operationName} = {}`

// mockMethodNameType.ts
const definitionFileTypes = () =>
  `/**
* Create your definitions file
*/
`

// OperationName.spec.ts
const testContent = () =>
  `
import nock from 'nock'
import { Client } from '../../Client'
import ${operationName} from "./${operationName}";
import * as mock${operationName} from './mock${operationName}'

describe("${operationName}", () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test("should get ${operationName}", async () => {
    //nock(/(.*)/).get('/air/endpoint').reply(200, { data: mock${operationName} })

    // uncomment these lines
    //const response = await new ${operationName}(new Client({ token: 'mockToken' })).get(mockOfferRequest.id)
    //expect(response.data?.id).toBe(mockOfferRequest.id)
    expect(true).toBe(true)
  })
});
`

const createMethodFiles = () => {
  // create folder
  console.log(operationPath)
  fs.existsSync(operationPath) ||
    fs.mkdirSync(operationPath, { recursive: true })
  // create index.ts
  createFile(`${operationPath}/index.ts`, indexContent())
  // create OperationName.ts
  createFile(`${operationPath}/${operationName}.ts`, methodClass())
  // create OperationName.spec.ts
  createFile(`${operationPath}/${operationName}.spec.ts`, testContent())
  // create mockMethodName.ts
  createFile(`${operationPath}/${`mock${operationName}`}.ts`, mockContent())
  // create src/types/OperationName.d.ts
  createFile(`${operationPath}/${operationName}Type.ts`, definitionFileTypes())
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
