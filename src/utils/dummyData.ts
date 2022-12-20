const menuItens = [
  {
    label: `Playstation`,

    submenus: [
      {
        label: `Playstation 1`,
        href: `/playstation/playstation-1`,
      },
      {
        label: `Playstation 2`,
        href: `/playstation/playstation-2`,
      },
      {
        label: `Playstation 3`,
        href: `/playstation/playstation-3`,
      },
      {
        label: `Playstation 4`,
        href: `/playstation/playstation-4`,
      },
      {
        label: `Playstation 5`,
        href: `/playstation/playstation-5`,
      },
    ],
  },
  {
    label: `Xbox`,
    submenus: [
      {
        label: `Xbox`,
        href: `/xbox/xbox`,
      },
      {
        label: `Xbox 360`,
        href: `/xbox/xbox-360`,
      },
      {
        label: `Xbox One`,
        href: `/xbox/xbox-one`,
      },
    ],
  },
  {
    label: `Nintendo`,
    submenus: [
      {
        label: `Game Boy`,
        href: ``,
      },
      {
        label: `Game Boy Advance`,
        href: ``,
      },
      {
        label: `NES`,
        href: ``,
      },
    ],
  },
  {
    label: `Clássicos`,
    submenus: [
      {
        label: `Atari`,
        href: ``,
      },
      {
        label: `Dreamcast`,
        href: ``,
      },
      {
        label: `Dynavision`,
        href: ``,
      },
    ],
  },
];

const PopularSections = [
  {
    id: `0`,
    section: `Playstation`,
    img: `https://media.gamestop.com/i/gamestop/11206962-11206961`,
    name: `God of War Ragnarok`,
    price: 399.9,
  },
  {
    section: `Playstation`,
    img: `https://images.kabum.com.br/produtos/fotos/231699/jogo-horizon-forbidden-west-ps4_1659040566_original.jpg`,
    name: `Horizon Forbidden West`,
    price: 134,
  },
  {
    section: `Playstation`,
    img: `https://images.kabum.com.br/produtos/fotos/399160/jogo-the-callisto-protocol-day-one-edition-ps5_1668079077_original.jpg`,
    name: `The Callisto Protocol`,
    price: 399.9,
  },
  {
    section: `Xbox`,
    img: `https://images-americanas.b2w.io/produtos/01/00/img/5822743/4/5822743452_1GG.jpg`,
    name: `Gotham knights`,
    price: 250,
  },
  {
    section: `Xbox`,
    img: `https://i.zst.com.br/thumbs/45/30/33/21179930.jpg`,
    name: `GTA V`,
    price: 100,
  },
  {
    section: `Xbox`,
    img: `https://images.tcdn.com.br/img/img_prod/684553/ryse_son_of_rome_xbox_one_seminovo_2785_1_ec71f3ea2b8becf09fe307dbf2b7e938.jpg`,
    name: `Ryse Son Of Home`,
    price: 30,
  },
];

const oldGames = [
  {
    img: `https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSEy3Eyk3WLJkVY6qxihW0YfqpfGec6L1zhbWvtOQ0x8MlvAmXLtJix-ougBc7Wkeu0-bEvGcUDLyBVeC3_QhNRoJkrXaVtGES68ZLvT_A&usqp=CAE`,
    name: `Sonic: The Hedgehog`,
    price: 127,
  },
  {
    img: `https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSy0LAc0TxZR9Mp7AA00bVmw__iQSupzL9zW_5LglLPsCpO9Sozj01aimIHIAsPEwcM0aMen37bRXFMCHDFjfbR5AgJqTvFn9DHCOEVFvw&usqp=CAE`,
    name: `Super Mario Bros. 3 (nes) Nintendo`,
    price: 37,
  },
  {
    img: `https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQU3uewtNcaVTOW6ur7EBqosfvL7djNwP20xKfBb7wz5S2lMEq93YVgubyoDskgycaMrryhRXiJ8njsSIOuDxlTEAxolHvJVN1ehYsjCUa-0dWplQv_hCaNjlU&usqp=CAE`,
    name: `Super Metroid`,
    price: 140,
  },
];

const newGames = [
  {
    img: `https://media.gamestop.com/i/gamestop/11206962-11206961`,
    name: `God of War Ragnarok`,
    price: 399.9,
  },
  {
    img: `https://images.kabum.com.br/produtos/fotos/399160/jogo-the-callisto-protocol-day-one-edition-ps5_1668079077_original.jpg`,
    name: `The Callisto Protocol`,
    price: 399.9,
  },
  {
    img: `https://images-americanas.b2w.io/produtos/01/00/img/5822743/4/5822743452_1GG.jpg`,
    name: `Gotham knights`,
    price: 250,
  },
];

export { menuItens, PopularSections, oldGames, newGames };
