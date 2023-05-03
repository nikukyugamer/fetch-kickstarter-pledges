import { FetchKickstarterPledges } from './FetchKickstarterPledges'
import * as fs from 'fs'

async function main() {
  const firstCliArgv = process.argv[2]
  const secondCliArgv = process.argv[3]

  if (!firstCliArgv || !secondCliArgv) {
    console.log('Please input creator and project.')

    return
  }

  // https://www.kickstarter.com/projects/rabbitandbearstudios/eiyuden-chronicle-hundred-heroes/description
  const pledgesData = await new FetchKickstarterPledges(
    firstCliArgv, // Creator
    secondCliArgv // Project
  ).exec()

  const outputFilepath = process.argv[4] || './tmp/pledges.json'
  fs.writeFileSync(outputFilepath, JSON.stringify(pledgesData, null, 2))

  console.log('[LOG] Output is done.')
  console.log(`Output: ${outputFilepath}`)
  console.log(`Creator: ${firstCliArgv}, Project: ${secondCliArgv}`)
  console.log(
    `URL: https://www.kickstarter.com/projects/${firstCliArgv}/${secondCliArgv}/description`
  )
}

main()
