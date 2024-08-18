/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("games").del();

  // Inserts seed entries
  const games = [
    { name: "The Legend of Zelda: Breath of the Wild" },
    { name: "Super Mario Odyssey" },
    { name: "Red Dead Redemption 2" },
    { name: "The Witcher 3: Wild Hunt" },
    { name: "God of War" },
    { name: "Horizon Zero Dawn" },
    { name: "Spider-Man" },
    { name: "Celeste" },
    { name: "Sekiro: Shadows Die Twice" },
    { name: "Dark Souls III" },
    { name: "Overwatch" },
    { name: "Minecraft" },
    { name: "Fortnite" },
    { name: "Among Us" },
    { name: "Cyberpunk 2077" },
    { name: "Assassin’s Creed Valhalla" },
    { name: "Genshin Impact" },
    { name: "Apex Legends" },
    { name: "Call of Duty: Warzone" },
    { name: "Animal Crossing: New Horizons" },
  ];

  await knex("games").insert(games);
};
