import { Client } from './Client'
import { Aircraft } from './resources'

interface Config {
  token: string
}

export const DuffelAPI = ({ token }: Config) => {
  const client = new Client({ token })

  return { aircraft: new Aircraft(client) }
}
