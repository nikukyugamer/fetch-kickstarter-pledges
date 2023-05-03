# Fetch Kickstarter Pledges

## プロジェクト詳細URL例
- https://www.kickstarter.com/projects/rabbitandbearstudios/eiyuden-chronicle-hundred-heroes/description
  - クリエイター名は `rabbitandbearstudios`
  - プロジェクト名は `eiyuden-chronicle-hundred-heroes`

## 実行方法

```bash
$ yarn install
```

```bash
# 実行時間は約6分
$ ts-node app.ts rabbitandbearstudios eiyuden-chronicle-hundred-heroes /path/to/result.json
```

```bash
$ cat tmp/pledges.json
```

## 対象場所のスクリーンショット

![プレッジリスト](/pledges.png)

## コマンド例

```bash
$ ts-node app.ts rabbitandbearstudios eiyuden-chronicle-hundred-heroes /path/to/result.json
```

## 出力結果例

```json
[
  {
    "pledgeId": "7768062",
    "pledgeMinimumMoney": "¥4,000",
    "pledgeTitle": "Digital Version",
    "pledgeLimitNote": "",
    "numberOfBackers": "15,668 backers",
    "limitedNumberOfBackersNote": "",
    "rewardNames": [
      "Digital Version of Eiyuden Chronicle",
      "Unique \"Knight\", \"Ranger\", or \"Wizard\" Discord role"
    ]
  },
  {
    "pledgeId": "7770924",
    "pledgeMinimumMoney": "¥6,000",
    "pledgeTitle": "Physical Version",
    "pledgeLimitNote": "",
    "numberOfBackers": "10,404 backers",
    "limitedNumberOfBackersNote": "",
    "rewardNames": [
      "Physical Version of Eiyuden Chronicle",
      "Beta Access",
      "Unique \"Knight\", \"Ranger\", or \"Wizard\" Discord role"
    ]
  },
  {
    "pledgeId": "7838192",
    "pledgeMinimumMoney": "¥6,000",
    "pledgeTitle": "Digital and Digital OST",
    "pledgeLimitNote": "",
    "numberOfBackers": "3,088 backers",
    "limitedNumberOfBackersNote": "",
    "rewardNames": [
      "Digital Version of Eiyuden Chronicle",
      "Digital Soundtrack",
      "Beta Access",
      "Unique \"Knight\", \"Ranger\", or \"Wizard\" Discord role"
    ]
  }
]
```
