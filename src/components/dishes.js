import shrimpTemp from '../assets/images_dishes/креветка темпура.jpg';
import teriyakiWings from '../assets/images_dishes/крильця теріякі.jpg';
import chickenTemp from '../assets/images_dishes/курка темпура.jpg';
import misoSoup from '../assets/images_dishes/місо суп.jpg';
import vegetableTemp from '../assets/images_dishes/овочі темпура.jpg';
import mainTomYam from '../assets/images_dishes/основна Том Ям.jpg';
import padThaiChicken from '../assets/images_dishes/ПадТай з курою.jpg';
import riceChips from '../assets/images_dishes/рисові чіпси.jpg';
import chickenSalad from '../assets/images_dishes/салат з куркою.jpg';
import seafoodSalad from '../assets/images_dishes/салат з морепродуктами.jpg';
import sobaChicken from '../assets/images_dishes/соба з курою.jpg';
import soupSoup from '../assets/images_dishes/суп суп.jpg';
import udonShrimp from '../assets/images_dishes/удон з креветкою.jpg';
import udonChicken from '../assets/images_dishes/удон з куркою.jpg';
import udonPork from '../assets/images_dishes/удон з свинина.jpg';
import udonBeef from '../assets/images_dishes/удон з телятиною.jpg';
import udonSeafood from '../assets/images_dishes/удон мор гади.jpg';
import fitnessChicken from '../assets/images_dishes/фітнес з куркою.jpg';
import secret from '../assets/images_dishes/secretcake.png'

//  export const slides = [
//     {
//         url: shrimpTemp
//     },
//     {
//         url : teriyakiWings
//     },
//     {
//         url : chickenTemp
//     },
//     {
//         url : sobaChicken
//     },
//     {
//         url : fitnessChicken
//     }
//   ]

 export const menuItems = [
    {
      url: shrimpTemp,
      title: "Креветка темпура",
      description: "Смажена креветка в хрусткому тісті, подається з соусом.",
      price: "150.00",
    },
    {
      url: teriyakiWings,
      title: "Крильця теріякі",
      description: "Соковиті курячі крильця в соусі теріякі, запечені до золотистої скоринки.",
      price: "180.00",
    },
    {
      url: chickenTemp,
      title: "Курка темпура",
      description: "Смажена курка в хрусткому тісті, подається з соусом.",
      price: "160.00",
    },
    {
      url: misoSoup,
      title: "Місо суп",
      description: "Традиційний японський суп з місо пастою, водоростями і тофу.",
      price: "80.00",
    },
    {
      url: vegetableTemp,
      title: "Овочі темпура",
      description: "Смажені овочі в хрусткому тісті, подаються з соусом.",
      price: "120.00",
    },
    {
      url: mainTomYam,
      title: "Том Ям",
      description: "Гострий тайський суп з креветками, грибами, цитронелою та кокосовим молоком.",
      price: "200.00",
    },
    {
      url: padThaiChicken,
      title: "ПадТай з курою",
      description: "Тайська страва з рисовою локшиною, куркою, овочами і арахісом.",
      price: "170.00",
    },
    {
      url: riceChips,
      title: "Рисові чіпси",
      description: "Легкі чіпси з рису, смажені до хрусткої текстури.",
      price: "60.00",
    },
    {
      url: chickenSalad,
      title: "Салат з куркою",
      description: "Легкий салат з куркою, овочами та легким соусом.",
      price: "130.00",
    },
    {
      url: seafoodSalad,
      title: "Салат з морепродуктами",
      description: "Свіжий салат з морепродуктами, овочами та соусом.",
      price: "160.00",
    },
    {
      url: sobaChicken,
      title: "Соба з куркою",
      description: "Японська локшина соба з куркою, овочами та соусом.",
      price: "150.00",
    },
    {
      url: soupSoup,
      title: "Суп",
      description: "Легкий овочевий суп з ароматними спеціями.",
      price: "70.00",
    },
    {
      url: udonShrimp,
      title: "Удон з креветкою",
      description: "Японська локшина удон з креветками та овочами.",
      price: "190.00",
    },
    {
      url: udonChicken,
      title: "Удон з куркою",
      description: "Локшина удон з куркою, овочами та спеціями.",
      price: "170.00",
    },
    {
      url: udonPork,
      title: "Удон з свининою",
      description: "Локшина удон з смаженою свининою, овочами та соусом.",
      price: "180.00",
    },
    {
      url: udonBeef,
      title: "Удон з телятиною",
      description: "Локшина удон з телятиною, овочами та спеціями.",
      price: "200.00",
    },
    {
      url: udonSeafood,
      title: "Удон морепродукти",
      description: "Локшина удон з морепродуктами та ароматними спеціями.",
      price: "210.00",
    },
    {
      url: fitnessChicken,
      title: "Фітнес з куркою",
      description: "Легкий фітнес-салат з куркою, овочами і без масла.",
      price: "140.00",
    },
    {
      url:secret,
      title : "Печиво з передбаченням",
      description: "Хрустке печиво",
      price: "20,00"
    }
  ];

export  const sections = [
    {
      title: "Хіт продажів",
      items: [
        menuItems[0], // Креветка темпура
        menuItems[12], // Удон з креветкою
        menuItems[2], // Курка темпура
        menuItems[6], // ПадТай з курою
       
      ],
    },
    {
      title: "Локшина",
      items: [
        menuItems[6], // ПадТай з курою
        menuItems[16], // Удон з куркою
        menuItems[12], // Удон з креветкою
        menuItems[13], // Удон з свининою
        menuItems[14], // Удон з телятиною
        menuItems[15], // Удон морепродукти
      ],
    },
    {
      title: "Закуски",
      items: [
        menuItems[0], // Креветка темпура
        menuItems[1], // Крильця теріякі
        menuItems[2], // Курка темпура
        menuItems[4], // Овочі темпура
        menuItems[7], // Рисові чіпси
        menuItems[8], // Салат з куркою
        menuItems[9], // Салат з морепродуктами
      ],
    },
    {
      title: "Супи",
      items: [
        menuItems[3], // Місо суп
  
        menuItems[11], // Суп суп
      ],
    },
    {
      title: "Десерти",
      items: [
        menuItems[18]
      ],
    },
  ];

