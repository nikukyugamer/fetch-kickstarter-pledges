// import { KsPledges } from './@types/index'
import { firefox } from 'playwright'

export class FetchKickstarterPledges {
  creator: string
  project: string

  constructor(creator: string, project: string) {
    this.creator = creator
    this.project = project
  }

  async exec() {
    const browser = await firefox.launch()
    const page = await browser.newPage()
    const baseUrl = 'https://www.kickstarter.com/projects/'
    const urlPath = `${this.creator}/${this.project}`
    const suffix = 'description'
    const url = `${baseUrl}${urlPath}/${suffix}`

    await page.goto(url)

    const pledges: any = await page
      .locator('.NS_projects__rewards_list.js-project-rewards')
      .locator('ol')
      // .pledge-selectable-sidebar で絞らないと、入れ子の reward の li も対象になってしまう
      .locator('li.pledge-selectable-sidebar')
    const countOfPledges = await pledges.count()

    const pledgesData: any = []

    for (let pledgeIndex = 0; pledgeIndex < countOfPledges; pledgeIndex++) {
      // pledgeId プロパティ（タグ上は `data-reward-id` であるが実質は pledgeId である）
      const pledgeId = await pledges
        .nth(pledgeIndex)
        .getAttribute('data-reward-id')

      // 「リワードなしでプレッジ」の場合は pledgeId が 0 になる
      // https://github.com/nikukyugamer/fetch-kickstarter-pledges/issues/20
      if (pledgeId === '0') continue

      // pledgeMinimumMoney プロパティ
      const pledgeMinimumMoney = await pledges
        .nth(pledgeIndex)
        .locator('.pledge__amount')
        .locator('.money')
        .innerText()

      // pledgeTitle プロパティ
      const pledgeTitle = await pledges
        .nth(pledgeIndex)
        .locator('.pledge__info')
        .locator('.pledge__title')
        .innerText()

      // rewardNames プロパティ
      const rewards = await pledges
        .nth(pledgeIndex)
        .locator('.pledge__info')
        .locator('.pledge__reward-description')
        .locator('ul')
        .locator('li.list-disc')

      // pledges プロパティ
      const countOfRewards = await rewards.count()
      let rewardNames = []

      for (let index = 0; index < countOfRewards; index++) {
        const element = await rewards.nth(index)
        const innerText = await element.innerText()

        rewardNames.push(innerText)
      }

      // pledgeLimitText プロパティ
      // この要素は存在しないことがある
      const pledgeLimitLocator = await pledges
        .nth(pledgeIndex)
        .locator('.pledge__info')
        .locator('.pledge__limit') // 「このリワードは選択できません」
      let pledgeLimitNote = ''

      // メモリリークの可能性がある？
      // https://github.com/puppeteer/puppeteer/issues/1149#issuecomment-782232360
      try {
        // await page.waitForSelector(pledgeLimitLocator, { timeout: 5000 })
        await pledgeLimitLocator.waitFor({ timeout: 1000 })

        pledgeLimitNote = await pledgeLimitLocator.innerText()
      } catch (error) {
        console.log(
          `[LOG] pledgeId: ${pledgeId}: pledgeLimitLocator is nothing.`
        )
      }

      // numberOfBackers プロパティ
      const numberOfBackers = await pledges
        .nth(pledgeIndex)
        .locator('.pledge__info')
        .locator('.pledge__backer-stats')
        .locator('.mr1.mb1')
        .locator('.bg-support-100') // 「数量限定（限定104個中 残り26個）」
        .innerText()

      // limitedNumberOfBackersNote プロパティ
      // この要素は存在しないことがある
      const limitedNumberOfBackersLocator = await pledges
        .nth(pledgeIndex)
        .locator('.pledge__info')
        .locator('.pledge__backer-stats')
        .locator('.mr1.mb1')
        .nth(1)
        .locator('.bg-celebrate-100')
      let limitedNumberOfBackersNote = ''

      try {
        await limitedNumberOfBackersLocator.waitFor({ timeout: 1000 })

        limitedNumberOfBackersNote =
          await limitedNumberOfBackersLocator.innerText()
      } catch (error) {
        console.log(
          `[LOG] pledgeId: ${pledgeId}: limitedNumberOfBackersLocator is nothing.`
        )
      }

      // オブジェクトに格納して配列に詰め込む
      pledgesData.push({
        pledgeId,
        pledgeMinimumMoney,
        pledgeTitle,
        pledgeLimitNote,
        numberOfBackers,
        limitedNumberOfBackersNote,
        rewardNames,
      })

      console.log(`[LOG] pledgeId: ${pledgeId}: "${pledgeTitle}" is done.`)
    }

    await browser.close()

    return pledgesData
  }
}
