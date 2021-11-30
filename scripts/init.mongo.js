/**
 * This script is to insert initial data inside the collection users of the database quizzine
 * You can use it with mongo-shell or a tool like Robo3T
 */

db.getCollection('questions').drop();
db.getCollection('questions').insertMany([
  {
    question: 'Comment est votre blanquette ?',
    answers: ['Bonne', 'Mauvaise', "Il a dit qu'elle était bonne, il l'a dit"],
    tags: ['viande', 'france'],
    date: new Date(),
  },
  {
    question: 'De quel fruit, la Spanish lisse est-elle une variété ?',
    answers: ["L'ananas", "L'orange", 'La mûre', 'La framboise'],
    date: new Date(),
    tags: ['fruit'],
  },
  {
    question: "Quel est le nom le plus courant pour l'ataca du Québec ?",
    answers: ['La canneberge', 'La groseille', 'La framboise', 'La mûre'],
    date: new Date(),
    tags: ['fruit'],
  },
  {
    question: 'Quel pays est le premier producteur mondial de bananes ?',
    answers: ["L'inde", 'La chine', 'La Tanzanie', 'Le Costa Rica'],
    date: new Date(),
    tags: ['fruit'],
  },
  {
    question:
      'À partir de quel fruit confectionne-t-on le burgou, un gâteau limousin ?',
    answers: ['La châteigne', 'La pomme', 'La cerise', 'La poire'],
    date: new Date(),
    tags: ['fruit', 'france', 'dessert'],
  },
  {
    question: "De quel fruit l'Eureka est-il une variété ?",
    answers: ['Le citron', 'Le pamplemousse', 'Le raisin', 'Le cassis'],
    date: new Date(),
    tags: ['fruit'],
  },
  {
    question:
      "À base de quel fruit confectionne-t-on l'eau-de-vie la Williamine ?",
    answers: ['La poire', 'La mirabelle', 'La pomme', 'La prune'],
    date: new Date(),
    tags: ['fruit', 'alcool'],
  },
  {
    question: 'À qui doit-on le nom de clémentine ?',
    answers: [
      'Du frère Clément',
      'De la fille de Napoléon',
      "De l'épouse de Henri 4",
      'Du pape Clément VII',
    ],
    date: new Date(),
    tags: ['fruit'],
  },
  {
    question:
      "De quelle région de France sont originaires les sarments, petits bâtonnets de chocolat et d'orange ?",
    answers: ['Du Médoc', "D'Alsace", 'Du Languedoc', 'De Bretagne'],
    date: new Date(),
    tags: ['fruit', 'france', 'dessert'],
  },
  {
    question:
      'Quelle ville de Bretagne abrite le « musée de la fraise et du patrimoine » ?',
    answers: ['Plougastel', 'Quimper', 'Bénodet', 'Roscoff'],
    date: new Date(),
    tags: ['fruit'],
  },
  {
    question:
      'À partir de quel fruit fabrique-t-on traditionnellement le bonbon belge appelé « cuberdon » ?',
    answers: ['La framboise', 'La mirabelle', 'La bergamote', 'Le cassis'],
    date: new Date(),
    tags: ['fruit', 'dessert', 'belgique'],
  },
  {
    question:
      'À partir de quel fruit fabrique-t-on le gâteau appelé le congolais ?',
    answers: ['La noix de coco', 'La tomate', 'La prune', "L'orange"],
    date: new Date(),
    tags: ['fruit'],
  },
  {
    question: 'Dans quel pays est principalement cultivée la bergamote ?',
    answers: ["L'Italie", "L'Espagne", "L'Inde", 'La Thaïlande'],
    date: new Date(),
    tags: ['fruit'],
  },
  {
    question: 'De quel fruit, la Brunswick est-elle une variété ?',
    answers: ['La figue', 'La datte', 'La prune', 'La fraise'],
    date: new Date(),
    tags: ['fruit'],
  },
  {
    question: 'Quel fruit porte également le nom de plaquemine ?',
    answers: ['Le kaki', 'Le kumquat', 'Le kiwi', 'La groseille'],
    date: new Date(),
    tags: ['fruit'],
  },
  {
    question:
      "Quel fruit originaire des Andes pousse sur un arbre chargé d'épines qui peut mesurer jusqu'à 7 m de haut ?",
    answers: ['La chérimole', "L'annanas", 'Le litchi', 'La mangue'],
    date: new Date(),
    tags: ['fruit'],
  },
  {
    question:
      " Avec le lait de quel animal produit-on le fromage l'Abondance ?",
    answers: ['La vache', 'La brebis', 'La chèvre', 'La buffone'],
    date: new Date(),
    tags: ['fromage', 'france'],
  },
  {
    question: "De quelle région est originaire le fromage la fourme d'Ambert ?",
    answers: ['Auvergne', 'Limousin', 'Corse', 'Rhône-Alpes'],
    date: new Date(),
    tags: ['france', 'fromage'],
  },
  {
    question: 'De quelle couleur est la mimolette ?',
    answers: ['Orange', 'Rouge', 'Blanc', 'Noir'],
    date: new Date(),
    tags: ['fromage', 'france'],
  },
  {
    question: "D'après la légende qui aurait créé le camembert ?",
    answers: [
      'Marie Harel',
      "Jeanne d'Arc",
      'Olympe de Gouges',
      'Charlotte Corday',
    ],
    date: new Date(),
    tags: ['fromage', 'france'],
  },
  {
    question: 'À quel type de fromages appartient le comté ?',
    answers: [
      'Fromage à pâte pressée cuite',
      'Fromage à pâte filée',
      'Fromage à pâte molle à croûte fleurie',
      'Fromage à pâte molle',
    ],
    date: new Date(),
    tags: ['fromage', 'france'],
  },
  {
    question:
      'Quel fromage est dégusté dans une scène culte du film "Bienvenue chez les Chti\'s" ?',
    answers: ['Le maroilles', 'Le camembert', 'Le morbier', 'Le munster'],
    date: new Date(),
    tags: ['fromage', 'france'],
  },
  {
    question: "De quelle région est originaire le Mont d'Or ?",
    answers: [
      'Franche-Comté',
      'Poitou-Charentes',
      'Midi-Pyrénées',
      'Haute-Normandie',
    ],
    date: new Date(),
    tags: ['fromage', 'france'],
  },
  {
    question:
      'Avec le lait de quel animal fabrique-t-on le fromage le pélardon ?',
    answers: ['La chèvre', 'La vache', 'La bufflonne', 'La brebis'],
    date: new Date(),
    tags: ['fromage', 'france'],
  },
  {
    question: 'À quel type de fromage appartient le roquefort ?',
    answers: [
      'Fromage à pâte persillée',
      'Fromage à pâte pressée non cuite',
      'Fromage à pâte molle à croûte fleurie',
      'Fromage à pâte molle à croûte nature',
    ],
    date: new Date(),
    tags: ['fromage', 'france'],
  },
  {
    question: 'De quelle région est originaire le fromage le saint-nectaire ?',
    answers: [
      "L'Auvergne",
      "L'Aquitaine",
      'La Haute-Normandie',
      'La Bourgogne',
    ],
    date: new Date(),
    tags: ['fromage', 'france'],
  },
  {
    question:
      "Est ce qu'il a été mis au point un robot qui detek une mouche qui a été sur un cadav en campagne, qui rentre dans les maisons, qui va sur du pain ou du beurre ?",
    answers: [
      "J'entends pas l'interlocuteur",
      'Non pas encore',
      "Oui biensûr, et c'est robotcop qui met la mouche en prison même",
    ],
    date: new Date(),
    tags: ['secret'],
  },
  {
    question: 'Quand la série "Derrick" s\'est arrêtée, son scénariste avait ?',
    answers: ['84 ans', 'Honte', '74 ans', '94 ans'],
    date: new Date(),
    tags: ['secret'],
  },
  {
    question:
      'En 1945 un groupe clandestin de combattants juifs fut fondé pour punir les criminels de guerre nazis. Quel était leur nom ?',
    answers: [
      'Les Inglorious Basterds',
      'Les Avengers',
      'La justice League',
      'Les Rabbins des bois',
    ],
    date: new Date(),
    tags: ['secret'],
  },
  {
    question: "Qu'est ce que le parapluie Bulgare ?",
    answers: [
      'Un parapluie armé développé par le KGB',
      'Un parapluie en Bulgarie',
      'Un resto-basket en Slovénie',
      'Une position sexuelle en Ukraine',
    ],
    date: new Date(),
    tags: ['secret'],
  },
]);

db.getCollection('tags').drop();
db.getCollection('tags').insertMany([
  {
    name: 'fruit',
    image: 'image/default',
  },
  {
    name: 'dessert',
    image: 'image/default',
  },
  {
    name: 'viande',
    image: 'image/default',
  },
  {
    name: 'fromage',
    image: 'image/default',
  },
  {
    name: 'france',
    image: 'image/default',
  },
]);
db.getCollection('users').drop();
db.getCollection('users').insertMany([
  {
    image: 'https://randomuser.me/portraits/men/55.jpg',
    email: 'michel.berger@gmail.com',
    username: 'Michel',
    password: '$2b$10$9liPLo1XzP8tauPmwjNpVOoPV.bahf/i5LaUlXF6EeItm0tbQ93QG',
    stats: {
      exp: 200,
      goodAnswers: 1000,
      totalAnswers: 2000,
    },
    isAdmin: true,
  },
  {
    image: 'https://randomuser.me/portraits/men/56.jpg',
    email: 'france.gall@gmail.com',
    username: 'France',
    password: '$2b$10$arLzcPaQoVQCdqxmz.cmCOE.KHOu0SXXSvatC.WhNV1zrRV7POVAi',
    stats: {
      exp: 160,
      goodAnswers: 990,
      totalAnswers: 2000,
    },
    isAdmin: false,
  },
]);

db.getCollection('questions').insertMany([
  {
    question: 'Comment est votre blanquette ?',
    answers: ['oui', 'non', 'pourquoi pas'],
    tags: ['viande', 'Gastronomie française'],
  },
  {
    tags: ['viande', 'Gastronomie française', 'oss117'],
    answers: ['oui', 'non', 'pourquoi pas'],
    question: 'Comment est votre blanquette ?',
  },
]);

db.getCollection('users').find({});

db.getCollection('questions').find({});
