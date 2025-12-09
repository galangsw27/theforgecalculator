export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythical' | 'relic';
export type Area = 'stonewake' | 'kingdom' | 'goblin' | 'enemy';
export type TraitType = 'weapon' | 'armor' | 'all' | null;
export type ForgeMode = 'weapon' | 'armor';

export interface TraitScaling {
  [key: string]: { min: number; max: number };
}

export interface Trait {
  description: string;
  scaling: TraitScaling;
  type: TraitType;
}

export interface Ore {
  id: number;
  name: string;
  multiplier: number;
  rarity: Rarity;
  area: Area;
  color: string;
  traitType: TraitType;
  traits: Trait[];
  image?: string;
}

export interface Slot {
  id: number;
  oreId: number | null;
  count: number;
}

export interface ItemStat {
  damage?: number;
  atkSpeed?: number;
  range?: number;
  price: number;
  type: string;
  health?: number;
  def?: number;
}

export interface ForgedItem {
  id: number;
  itemName: string;
  itemType: string;
  multiplier: number;
  mainOre: Ore;
  stats: ItemStat;
  traits: { oreName: string; description: string; percentage: number; color: string }[];
  timestamp: string;
  mode: ForgeMode;
}
