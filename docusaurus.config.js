const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require('path')

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Yasu',
  tagline: 'Discover New Anime',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'rickycorte', // Usually your GitHub org/user name.
  projectName: 'yasu-web', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },

    navbar: {
      title: 'Yasu',
      logo: {
        alt: 'Yasu',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Documentation',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Donate',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Roadmap',
              href: 'https://github.com/rickycorte/yasu-web/projects/1',
            },
            {
              label: 'Discussions & Support',
              href: 'https://github.com/rickycorte/yasu-web/discussions',
            },
            {
              label: 'Issues & Requests',
              href: 'https://github.com/rickycorte/yasu-web/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
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
          editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
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
