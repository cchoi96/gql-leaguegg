const { gql } = require('apollo-server');

module.exports = gql`
  type Champion {
    id: String!
    name: String!
    title: String!
    desc: String
    info: ChampInfo
    image: ChampImage
    tags: [String]
    stats: ChampStats
    allytips: [String]
    enemytips: [String]
    resourceType: String
    spells: [ChampSpell]
    passive: ChampPassive
  }

  type ChampInfo {
    attack: Int
    defense: Int
    magic: Int
    difficulty: Int
  }

  type ChampImage {
    full: String
    icon: String
  }

  type ChampStats {
    hp: Float
    hpperlevel: Float
    mp: Float
    mpperlevel: Float
    movespeed: Float
    armor: Float
    armorperlevel: Float
    spellblock: Float
    spellblockperlevel: Float
    attackrange: Float
    hpregen: Float
    hpregenperlevel: Float
    mpregen: Float
    mpregenperlevel: Float
    crit: Float
    critperlevel: Float
    attackdamage: Float
    attackdamageperlevel: Float
    attackspeedperlevel: Float
    attackspeed: Float
  }

  type ChampSpell {
    id: String
    name: String
    desc: String
    image: String
  }

  type ChampPassive {
    name: String
    desc: String
    image: String
  }

  extend type Query {
    freeChampions: [Champion]
  }
`;