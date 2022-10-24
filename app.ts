import { FetchKickstarterPledges } from './FetchKickstarterPledges'
import * as fs from 'fs'

async function main() {
  const pledgesData = await new FetchKickstarterPledges(
    'rabbitandbearstudios',
    'eiyuden-chronicle-hundred-heroes'
  ).exec()

  const outputFilepath = './tmp/pledges.json'
  fs.writeFileSync(outputFilepath, JSON.stringify(pledgesData))
}

main()
