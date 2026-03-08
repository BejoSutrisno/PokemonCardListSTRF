class Card {
  constructor(name, type, level) {
    this.name = name;
    this.type = type;
    this.level = level; // HP
  }

  display() {
    return `${this.name} (${this.type}) - HP ${this.level}`;
  }
}

class PokemonCard extends Card {
  constructor(name, type, level, ability, image) {
    super(name, type, level);
    this.ability = ability || 'None';
    this.image = image || null;
  }

  display() {
    return `${super.display()} | Ability: ${this.ability}`;
  }
}

module.exports = PokemonCard;