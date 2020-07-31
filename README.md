## kyoto-art_news4discord
[![GitHub](https://img.shields.io/github/license/redpeacock78/kyoto-art_news)](https://github.com/redpeacock78/kyoto-art_news4discord/blob/master/LICENSE)
![GitHub language count](https://img.shields.io/github/languages/count/redpeacock78/kyoto-art_news4discord)
![GitHub top language](https://img.shields.io/github/languages/top/redpeacock78/kyoto-art_news4discord)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/redpeacock78/kyoto-art_news4discord)  
[![CircleCI](https://img.shields.io/circleci/build/github/redpeacock78/kyoto-art_news)](https://circleci.com/gh/redpeacock78/kyoto-art_news4discord)
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)  
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/redpeacock78/kyoto-art_news4discord)

### 概要
　これは[redpeacock78/kyoto-art_news](https://github.com/redpeacock78/kyoto-art_news)で公開している[京都造形芸術大学 在学生専用サイト](https://www.kyoto-art.ac.jp/student/)のRSSの最新情報をDiscordに配信するものです。  
　一応Discordとは言ってはいますがSlack互換のJsonで記述を行っているのでWebhookなどの設定を変更すればSlackに流すことも可能です。 (あと[ChatWork](https://go.chatwork.com/ja/)とかのWebhookでメッセージをやりとりできるサービスであればDiscordに送る部分を上手いこと改変すれば動くかもしれません。試してないので分かりませんが。)  
　また、[公式](https://www.kyoto-art.ac.jp/student/)で設定されているOGPのDescriptionは定型文、OGPのImageは404となって死んでいるのでこちらで動的に生成するようにしました。新たに生成するImageの生成と保管・配信にはそれぞれ[Cloudinary](https://cloudinary.com)と[Imgur](https://imgur.com/)を使用しています。またGASのランタイムにはRhinoではなくV8を設定・使用しています。  

|<img src="https://i.imgur.com/7LbvCIu.png" alt="Operation image diagrams" title="Operation image diagrams"  width="1426px">|<img src="https://i.imgur.com/ylafRbF.png" alt="Operation example" title="Operation example">|
|:-:|:-:|
|実際の各サービスの連携|表示されるメッセージ例|

### 使用技術
- [GAS(Google Apps Script)](https://developers.google.com/apps-script/)
- [V8 Runtime Overview | Apps Script | Google Developers](https://developers.google.com/apps-script/guides/v8-runtime?hl=ja)
- [Cloudinary](https://cloudinary.com)
- [Imgur API](https://apidocs.imgur.com/)
- [Discord Developer Portal — Documentation — Webhook](https://discordapp.com/developers/docs/resources/webhook#execute-slackcompatible-webhook)

## License
This source code is licensed MIT.