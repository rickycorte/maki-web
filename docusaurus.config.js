const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require('path')

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Maki',
  tagline: 'Discover New Anime',
  url: 'https://makichan.xyz',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'rickycorte', // Usually your GitHub org/user name.
  projectName: 'maki-web', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },

    navbar: {
      title: 'Maki',
      logo: {
        alt: 'Maki',
        src: 'img/logo.png',
      },
      items: [
        { 
          to: '/search',
          position: 'left',
          label: 'Discover',
        },
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Documentation',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Roadmap',
              href: 'https://github.com/rickycorte/maki-web/projects/1',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/rickycorte/maki-web/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/rickycorte/maki-web/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Status',
              href: 'https://statuspage.freshping.io/56354-Maki'
            },
            {
              label: 'Terms of Service',
              to: '/tos',
            },
            {
              label: 'Privacy',
              to: '/privacy',
            },
            {
              label: 'Credits',
              to: '/credits',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://github.com/rickycorte">rickycorte</a>. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  stylesheets: [
    "https://fonts.googleapis.com/icon?family=Material+Icons",
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/rickycorte/maki-web',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
        path.resolve(__dirname, 'plugin-dynamic-routes'),
        { 
            routes: [
                {
                    path: '/search',
                    exact: false, 
                    component: '@site/src/components/search'
                }
            ]
        }
    ],
],
};
