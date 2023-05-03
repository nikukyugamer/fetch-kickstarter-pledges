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
