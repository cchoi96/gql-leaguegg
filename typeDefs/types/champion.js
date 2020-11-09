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
    recommendedItems: [ChampItemSet]
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

  type ChampItemSet {
    type: String
    items: [ChampItem]
  }

  type ChampItem {
    name: String
    desc: String
    plaintext: String
    tags: [String]
    purchaseAmount: Int
    sellAmount: Int
    stats: ItemStats
    consumed: Boolean
    image: String
  }

  type ItemStats {
    FlatHPPoolMod: Int
    rFlatHPModPerLevel: Int
    FlatMPPoolMod: Int
    rFlatMPModPerLevel: Int
    PercentHPPoolMod: Int
    PercentMPPoolMod: Int
    FlatHPRegenMod: Int
    rFlatHPRegenModPerLevel: Int
    PercentHPRegenMod: Int
    FlatMPRegenMod: Int
    rFlatMPRegenModPerLevel: Int
    PercentMPRegenMod: Int
    FlatArmorMod: Int
    rFlatArmorModPerLevel: Int
    PercentArmorMod: Int
    rFlatArmorPenetrationMod: Int
    rFlatArmorPenetrationModPerLevel: Int
    rPercentArmorPenetrationMod: Int
    rPercentArmorPenetrationModPerLevel: Int
    FlatPhysicalDamageMod: Int
    rFlatPhysicalDamageModPerLevel: Int
    PercentPhysicalDamageMod: Int
    FlatMagicDamageMod: Int
    rFlatMagicDamageModPerLevel: Int
    PercentMagicDamageMod: Int
    FlatMovementSpeedMod: Int
    rFlatMovementSpeedModPerLevel: Int
    PercentMovementSpeedMod: Int
    rPercentMovementSpeedModPerLevel: Int
    FlatAttackSpeedMod: Int
    PercentAttackSpeedMod: Int
    rPercentAttackSpeedModPerLevel: Int
    rFlatDodgeMod: Int
    rFlatDodgeModPerLevel: Int
    PercentDodgeMod: Int
    FlatCritChanceMod: Int
    rFlatCritChanceModPerLevel: Int
    PercentCritChanceMod: Int
    FlatCritDamageMod: Int
    rFlatCritDamageModPerLevel: Int
    PercentCritDamageMod: Int
    FlatBlockMod: Int
    PercentBlockMod: Int
    FlatSpellBlockMod: Int
    rFlatSpellBlockModPerLevel: Int
    PercentSpellBlockMod: Int
    FlatEXPBonus: Int
    PercentEXPBonus: Int
    rPercentCooldownMod: Int
    rPercentCooldownModPerLevel: Int
    rFlatTimeDeadMod: Int
    rFlatTimeDeadModPerLevel: Int
    rPercentTimeDeadMod: Int
    rPercentTimeDeadModPerLevel: Int
    rFlatGoldPer10Mod: Int
    rFlatMagicPenetrationMod: Int
    rFlatMagicPenetrationModPerLevel: Int
    rPercentMagicPenetrationMod: Int
    rPercentMagicPenetrationModPerLevel: Int
    FlatEnergyRegenMod: Int
    rFlatEnergyRegenModPerLevel: Int
    FlatEnergyPoolMod: Int
    rFlatEnergyModPerLevel: Int
    PercentLifeStealMod: Int
    PercentSpellVampMod: Int
  }

  extend type Query {
    freeChampions: [Champion]
    champion(name: String): Champion
  }
`;