import axios from "axios";
import promptSync from "prompt-sync";

const prompt = promptSync();

// HP constants
const PLAYER_HP = 300;
const BOT_HP = 300;

// 🎮 Fonction pour obtenir les infos d’un Pokémon depuis l’API
async function getPokemon(name) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const pokemon = response.data;

    // Prendre 5 attaques au hasard
    const moves = pokemon.moves
      .sort(() => 0.5 - Math.random())
      .slice(0, 10); // on prend 10 pour augmenter les chances d'avoir des moves valides

    const detailedMoves = [];

    for (let move of moves) {
      try {
        const moveData = await axios.get(move.move.url);
        const data = moveData.data;
        if (data.power && data.accuracy) {
          detailedMoves.push({
            name: data.name,
            power: data.power,
            accuracy: data.accuracy,
          });
        }
      } catch (e) {}
      if (detailedMoves.length >= 5) break;
    }

    return {
      name: pokemon.name,
      moves: detailedMoves,
    };
  } catch (error) {
    console.log(" Pokémon not found!");
    return null;
  }
}

//  Fonction d’attaque
function attack(attacker, defender, move) {
  console.log(`\n${attacker.name} uses ${move.name.toUpperCase()}!`);

  const hitChance = Math.random() * 100;
  if (hitChance > move.accuracy) {
    console.log(` ${attacker.name}'s attack missed!`);
    return 0;
  }

  const damage = Math.floor(move.power + Math.random() * 10);
  console.log(` It hits and deals ${damage} damage!`);
  return damage;
}

// Boucle principale du jeu
async function startGame() {
  console.log("🎮 Welcome to the Pokémon Battle CLI!");
  const playerName = prompt("Choose your Pokémon: ");
  const player = await getPokemon(playerName);

  if (!player || player.moves.length < 1) {
    console.log(" Could not load moves for this Pokémon. Try another one!");
    return;
  }

  const botList = ["pikachu", "charmander", "bulbasaur", "squirtle", "eevee"];
  const botName = botList[Math.floor(Math.random() * botList.length)];
  const bot = await getPokemon(botName);

  console.log(`\n The bot chose ${bot.name}!\n`);

  let playerHP = PLAYER_HP;
  let botHP = BOT_HP;

  while (playerHP > 0 && botHP > 0) {
    console.log("\nYour moves:");
    player.moves.forEach((m, i) => {
      console.log(`${i + 1}. ${m.name} (Power: ${m.power}, Acc: ${m.accuracy}%)`);
    });

    const choice = parseInt(prompt("Choose your move (1-5): "));
    const playerMove = player.moves[choice - 1];
    if (!playerMove) {
      console.log(" Invalid choice!");
      continue;
    }

    // Player attacks bot
    const dmgToBot = attack(player, bot, playerMove);
    botHP -= dmgToBot;
    if (botHP <= 0) break;

    // Bot attacks player
    const botMove = bot.moves[Math.floor(Math.random() * bot.moves.length)];
    const dmgToPlayer = attack(bot, player, botMove);
    playerHP -= dmgToPlayer;

    console.log(`\n Your HP: ${playerHP > 0 ? playerHP : 0}`);
    console.log(` Bot HP: ${botHP > 0 ? botHP : 0}`);
  }

  if (playerHP <= 0 && botHP <= 0) {
    console.log("\n It's a draw!");
  } else if (playerHP <= 0) {
    console.log("\n You lost! The bot wins!");
  } else {
    console.log("\n You won! Congratulations!");
  }
}

//  Lancer le jeu
startGame();
