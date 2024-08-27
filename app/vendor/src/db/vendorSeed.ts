import { Vendor } from "@/vendor/schemas/vendor";

const vendorSeed = {
  async seed() {
    try {
      const vendor = [
        {
          model: Vendor,
          data: async () => [
            {
              name: "iJuice",
              location: "Campina Grande",
              recipes: [
                {
                  name: "Pink Lemonade",
                  ingredients: [
                    "lemon",
                    "sugar",
                    "water",
                    "pink food coloring",
                  ],
                  steps: [
                    "Juice the lemon",
                    "Mix all ingredients",
                    "Serve cold",
                  ],
                  price: 5,
                },
                {
                  name: "Mango Shake",
                  ingredients: ["mango", "milk", "sugar", "ice"],
                  steps: [
                    "Blend the mango",
                    "Mix all ingredients",
                    "Serve cold",
                  ],
                  price: 6,
                },
                {
                  name: "Mojito",
                  ingredients: ["mint", "sugar", "lemon", "soda", "ice"],
                  steps: [
                    "Muddle the mint",
                    "Mix all ingredients",
                    "Serve cold",
                  ],
                  price: 10,
                },
                {
                  name: "Tropical Sunrise",
                  ingredients: [
                    "pineapple",
                    "orange",
                    "mango",
                    "grenadine syrup",
                  ],
                  steps: [
                    "Juice pineapple, orange, and mango",
                    "Combine in a glass",
                    "Add a splash of grenadine syrup",
                    "Serve over ice",
                  ],
                  price: 6,
                },
                {
                  name: "Green Goddess",
                  ingredients: [
                    "spinach",
                    "cucumber",
                    "celery",
                    "apple",
                    "lemon juice",
                  ],
                  steps: [
                    "Blend spinach, cucumber, celery, and apple until smooth",
                    "Add lemon juice to taste",
                    "Strain if desired",
                    "Serve chilled",
                  ],
                  price: 7,
                },
                {
                  name: "Berry Blast",
                  ingredients: [
                    "strawberries",
                    "blueberries",
                    "raspberries",
                    "water",
                  ],
                  steps: [
                    "Combine berries in a blender",
                    "Add water to desired consistency",
                    "Blend until smooth",
                    "Strain if desired",
                    "Serve over ice",
                  ],
                  price: 8,
                },
                {
                  name: "Carrot Ginger",
                  ingredients: ["carrots", "ginger", "apple", "orange juice"],
                  steps: [
                    "Juice carrots and ginger",
                    "Combine with apple juice and orange juice",
                    "Stir well",
                    "Serve chilled",
                  ],
                  price: 9,
                },
                {
                  name: "Watermelon Cooler",
                  ingredients: ["watermelon", "lime juice", "mint leaves"],
                  steps: [
                    "Blend watermelon chunks until smooth",
                    "Add lime juice and mint leaves",
                    "Stir well",
                    "Serve over ice",
                  ],
                  price: 10,
                },
                {
                  name: "Beetroot Booster",
                  ingredients: [
                    "beets",
                    "carrots",
                    "orange juice",
                    "lemon juice",
                  ],
                  steps: [
                    "Juice beets and carrots",
                    "Combine with orange juice and lemon juice",
                    "Stir well",
                    "Serve chilled",
                  ],
                  price: 11,
                },
              ],
              isOpen: true,
              openingTime: "08:00",
              closingTime: "18:00",
            },
          ],
        },
      ];

      try {
        const count = await Vendor.countDocuments();
        const data = await vendor[0].data();

        if (count < data.length) {
          await Promise.all(
            data.map(async (item) => {
              await Vendor.create(item);
            })
          );
        }
      } catch (error) {
        console.log(`[x] Error while seeding ${vendor[0].model.modelName}.`);
      }
    } catch (error) {
      console.log("[x] It's not possible seeding vendor machine.");
    }
  },
};

export default vendorSeed;
