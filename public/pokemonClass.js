// Base class Pokémon
class Pokemon {
  constructor({id, name, type, level, ability, image}) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.level = level;
    this.ability = ability || 'None';
    this.image = image || 'https://via.placeholder.com/220x160?text=No+Image';
  }

  // Method untuk menampilkan info Pokémon
  displayCard() {
    return `${this.name} | ${this.type} | HP: ${this.level} | Ability: ${this.ability}`;
  }
}

// Subclass untuk Pokémon Legendary (inheritance)
class LegendaryPokemon extends Pokemon {
  constructor(props, rarity){
    super(props); // wariskan properti dari Pokemon
    this.rarity = rarity;
  }

  // Polymorphism: override method displayCard
  displayCard() {
    return `Legendary! ${this.name} | ${this.type} | HP: ${this.level} | Ability: ${this.ability} | Rarity: ${this.rarity}`;
  }
}