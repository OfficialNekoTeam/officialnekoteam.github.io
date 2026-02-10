import type { FooterData } from '@theojs/lumen'

export const Footer_Data: FooterData = {
  author: { name: 'OfficialNekoTeam', link: 'https://github.com/OfficialNekoTeam' },
  group: [
    {
      title: '部署',
      icon: 'fa-solid fa-cloud',
      links: [
        { name: 'Vercel-NekoBot', link: 'https://docs.nekobot.dev/' },
        { name: 'Vercel-Docs', link: 'https://nekobot-docs.vercel.app/' },
        { name: 'Github Page', link: 'https://nekobotteam.github.io/' },
      ],
    },
    {
      title: '社区',
      icon: 'fa-solid fa-users',
      links: [
        { name: 'Neko的猫猫窝', link: 'https://qm.qq.com/q/xW235wdw2c' },
        { name: 'Neko猫猫的大学', link: 'https://qm.qq.com/q/cakIFXheeY' },
        { name: 'Neko猫猫的小窝(QQ频道)', link: 'https://pd.qq.com/s/de131bcm9' },
        { name: '开发者群聊(飞书)', link: 'https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=3d2gb6d5-1044-4376-9d84-d3c207007fce' },
        { name: '社区意见提议(飞书)', link: 'https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=f76s0727-817c-4105-888c-69e00ee36a27' },
      ],
    },
  ],
}
