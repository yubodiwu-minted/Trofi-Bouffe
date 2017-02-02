exports.seed = function(knex, Promise) {
    return knex("ingredients").del().then(function() {
        return Promise.all([
            knex("ingredients").insert([
                {
                    id: 1,
                    upc: "072250037129",
                    plu: null,
                    product_name: "Nature\"s Own 100% Whole Wheat (20 oz.)"
                }, {
                    id: 2,
                    upc: "447000305306",
                    plu: null,
                    product_name: "Oscar Mayer Deli Fresh Smoked Turkey (9 oz.)"
                }, {
                    id: 3,
                    upc: "492100100818",
                    plu: null,
                    product_name: "Oscar Mayer Deli Fresh Smoked Turkey (16 oz.)"
                }, {
                    id: 4,
                    upc: "051500241912",
                    plu: null,
                    product_name: "JIF Creamy Peanut Butter (12 oz.)"
                }, {
                    id: 5,
                    upc: "051500255162",
                    plu: null,
                    product_name: "JIF Creamy Peanut Butter (16 oz.)"
                }, {
                    id: 6,
                    upc: "015141503495",
                    plu: null,
                    product_name: "Eggland\"s Best Grade A, White, Large Eggs (dozen)"
                }, {
                    id: 7,
                    upc: "037000876243",
                    plu: null,
                    product_name: "Tide Original Scent Liquid (40 oz.)"
                }, {
                    id: 8,
                    upc: "037000138815",
                    plu: null,
                    product_name: "Tide Original Scent Liquid (75 oz.)"
                }, {
                    id: 9,
                    upc: "663157244378",
                    plu: null,
                    product_name: "Tide Original Scent Liquid (100 oz.)"
                }, {
                    id: 10,
                    upc: "492840614033",
                    plu: null,
                    product_name: "Horizon Organic Whole Milk (1/2 gallon)"
                }, {
                    id: 11,
                    upc: "742365228407",
                    plu: null,
                    product_name: "Horizon Organic Whole Milk (Gallon)"
                }, {
                    id: 12,
                    upc: "492840614026",
                    plu: null,
                    product_name: "Horizon Organic 2% Reduced Fat Milk (1/2 gallon)"
                }, {
                    id: 13,
                    upc: "742365228209",
                    plu: null,
                    product_name: "Horizon Organic 2% Reduced Fat Milk (Gallon)"
                }, {
                    id: 14,
                    upc: "492840614019",
                    plu: null,
                    product_name: "Horizon Organic 1% Lowfat Milk (1/2 gallon)"
                }, {
                    id: 15,
                    upc: "492840220616",
                    plu: null,
                    product_name: "Horizon Organic 1% Lowfat Milk (Gallon)"
                }, {
                    id: 16,
                    upc: "492840614002",
                    plu: null,
                    product_name: "Horizon Organic Fat-Free Milk (1/2 gallon)"
                }, {
                    id: 17,
                    upc: "742365024399",
                    plu: null,
                    product_name: "Horizon Organic Fat-Free Milk (Gallon)"
                }, {
                    id: 18,
                    upc: "028400598125",
                    plu: null,
                    product_name: "Lay\"s Classic Potato Chips (10.25 oz.)"
                }, {
                    id: 19,
                    upc: "028400421775",
                    plu: null,
                    product_name: "Lay\"s Classic Potato Chips (15.75 oz.)"
                }, {
                    id: 20,
                    upc: "013800558121",
                    plu: null,
                    product_name: "Stouffer\"s Lasagna with Meat Sauce (19 oz.)"
                }, {
                    id: 21,
                    upc: "138001433340",
                    plu: null,
                    product_name: "Stouffer\"s Lasagna with Meat Sauce (38 oz.)"
                }, {
                    id: 22,
                    upc: "013800232601",
                    plu: null,
                    product_name: "Stouffer\"s Lasagna with Meat Sauce (57 oz.)"
                }, {
                    id: 23,
                    upc: "016000665903",
                    plu: null,
                    product_name: "Honey Nut Cheerios (12.25 oz.)"
                }, {
                    id: 24,
                    upc: "016000275713",
                    plu: null,
                    product_name: "Honey Nut Cheerios (17 oz.)"
                }, {
                    id: 25,
                    upc: "016000483668",
                    plu: null,
                    product_name: "Honey Nut Cheerios (21.06 oz.)"
                }, {
                    id: 26,
                    upc: "049000000443",
                    plu: null,
                    product_name: "Coca-Cola Classic (20 oz.)"
                }, {
                    id: 27,
                    upc: "049000050103",
                    plu: null,
                    product_name: "Coca-Cola Classic (2 L)"
                }, {
                    id: 28,
                    upc: null,
                    plu: "4011",
                    product_name: "Bananas (yellow)"
                }, {
                    id: 29,
                    upc: null,
                    plu: "4011",
                    product_name: "Bananas (yellow) [organic]"
                }, {
                    id: 30,
                    upc: null,
                    plu: "4050",
                    product_name: "Cantaloupe (large)"
                }, {
                    id: 31,
                    upc: "048001353565",
                    plu: null,
                    product_name: "Best Foods Real Mayonnaise (11.5 oz.)"
                }, {
                    id: 32,
                    upc: "048001354494",
                    plu: null,
                    product_name: "Best Foods Real Mayonnaise (20 oz.)"
                }, {
                    id: 33,
                    upc: "048001354715",
                    plu: null,
                    product_name: "Best Foods Light Mayonnaise (11.5 oz.)"
                }, {
                    id: 34,
                    upc: "048001353862",
                    plu: null,
                    product_name: "Best Foods Light Mayonnaise (20 oz.)"
                }, {
                    id: 35,
                    upc: "044800001478",
                    plu: null,
                    product_name: "Sugar in the Raw Natural Cane Sugar (4 lb.)"
                }, {
                    id: 36,
                    upc: "015800030119",
                    plu: null,
                    product_name: "C&H Pure Cane Granulated White Sugar (1 lb.)"
                }, {
                    id: 37,
                    upc: "015800030584",
                    plu: null,
                    product_name: "C&H Pure Cane Granulated White Sugar (4 lb.)"
                }, {
                    id: 38,
                    upc: "089836185136",
                    plu: null,
                    product_name: "Simply Organic Ground Cinnamon (2.45 oz.)"
                }, {
                    id: 39,
                    upc: "052100004389",
                    plu: null,
                    product_name: "McCormick Ground Cinnamon (2.37 oz.)"
                }, {
                    id: 40,
                    upc: "052100090054",
                    plu: null,
                    product_name: "McCormick Ground Cinnamon (8.75 oz.)"
                }, {
                    id: 41,
                    upc: "052100071039",
                    plu: null,
                    product_name: "McCormick Pure Vanilla Extract (2 oz.)"
                }, {
                    id: 42,
                    upc: "052100071060",
                    plu: null,
                    product_name: "McCormick Pure Vanilla Extract (4 oz.)"
                }, {
                    id: 43,
                    upc: "89836185310",
                    plu: null,
                    product_name: "Simply Organic Vanilla Extract (2 oz.)"
                }, {
                    id: 44,
                    upc: "089836187567",
                    plu: null,
                    product_name: "Simply Organic Vanilla Extract (4 oz.)"
                }, {
                    id: 45,
                    upc: null,
                    plu: "4049",
                    product_name: "Cantaloupe (small)"
                }, {
                    id: 46,
                    upc: null,
                    plu: "94049",
                    product_name: "Cantaloupe (small) [organic]"
                }, {
                    id: 47,
                    upc: null,
                    plu: "94050",
                    product_name: "Cantaloupe (large) [organic]"
                }, {
                    id: 48,
                    upc: "0034500151023",
                    plu: null,
                    product_name: "Land o\" Lakes Unsalted Butter (1 lb.)",
                    name: "unsalted butter"
                }, {
                    id: 49,
                    upc: "0003450015136",
                    plu: null,
                    product_name: "Land o\" Lakes Salted Butter (1 lb.)"
                }, {
                    id: 50,
                    upc: "0767707001067",
                    plu: null,
                    product_name: "Kerrygold Pure Irish Butter (8 oz.)"
                }, {
                    id: 51,
                    upc: "0742365416002",
                    plu: null,
                    product_name: "Horizon Organic Butter (1 lb.)"
                }, {
                    id: 52,
                    upc: "078433490903",
                    plu: null,
                    product_name: "Tostitos Mild Chunky Salsa (15.5 oz.)"
                }, {
                    id: 53,
                    upc: "028400055987",
                    plu: null,
                    product_name: "Tostitos Medium Chunky Salsa (15.5 oz.)"
                }, {
                    id: 54,
                    upc: "028400055994",
                    plu: null,
                    product_name: "Tostitos Hot Chunky Salsa (15.5 oz.)"
                }, {
                    id: 55,
                    upc: "072878275514",
                    plu: null,
                    product_name: "Herdez Salsa Casera Mild (12 oz.)"
                }, {
                    id: 56,
                    upc: "0072878275545",
                    plu: null,
                    product_name: "Herdez Salsa Casera Medium (12 oz.)"
                }, {
                    id: 57,
                    upc: "0044300106321",
                    plu: null,
                    product_name: "Rosarita Refried Beans Traditional 98% Fat Free (16 oz.)"
                }, {
                    id: 58,
                    upc: "0044300106253",
                    plu: null,
                    product_name: "Rosarita Vegetarian Refried Beans (16 oz.)"
                }, {
                    id: 59,
                    upc: "0011195207723",
                    plu: null,
                    product_name: "Sun-Vista Pinto Beans (29 oz.)"
                }, {
                    id: 60,
                    upc: "0011195207808",
                    plu: null,
                    product_name: "Sun-Vista Pinto Beans (40 oz.)"
                }, {
                    id: 61,
                    upc: null,
                    plu: "6074",
                    product_name: "Pinto Beans"
                }, {
                    id: 62,
                    upc: "492122603878",
                    plu: null,
                    product_name: "Guerrero White Corn Tortillas 6\" (18 Ct.)"
                }, {
                    id: 63,
                    upc: "492122607401",
                    plu: null,
                    product_name: "Mission White Corn Tortillas (30 Ct.)"
                }, {
                    id: 64,
                    upc: "0073731008201",
                    plu: null,
                    product_name: "Mission Flour Tortillas (10 Ct.)"
                }, {
                    id: 65,
                    upc: "0073731008201",
                    plu: null,
                    product_name: "Mission Tortillas Flour (20 Ct.)"
                }, {
                    id: 66,
                    upc: "0073731071168",
                    plu: null,
                    product_name: "Mission Whole Wheat Tortillas 96% Fat-free (8 Ct.)"
                }, {
                    id: 67,
                    upc: "492123803154",
                    plu: null,
                    product_name: "Barilla Spaghetti Pasta (16 oz.)",
                    name: "spaghetti"
                }, {
                    id: 68,
                    upc: "492123803161",
                    plu: null,
                    product_name: "Barilla Penne Pasta (16 oz.)"
                }, {
                    id: 69,
                    upc: "492123800122",
                    plu: null,
                    product_name: "Barilla Fettuccine Pasta (16 oz.)"
                }, {
                    id: 70,
                    upc: "033400721152",
                    plu: null,
                    product_name: "Ronzoni Healthy Harvest Thin Spaghetti Ancient Grains (12 oz.)"
                }, {
                    id: 71,
                    upc: "492124003287",
                    plu: null,
                    product_name: "Dave\"s Gourmet Organic Red Heirloom Pasta Sauce (26 oz.)"
                }, {
                    id: 72,
                    upc: "492124002945",
                    plu: null,
                    product_name: "Dave\"s Gourmet Butternut Squash Pasta Sauce (25.5 oz.)"
                }, {
                    id: 73,
                    upc: "747479000079",
                    plu: null,
                    product_name: "Rao\"s Homemade Marinara Sauce (24 oz.)"
                }, {
                    id: 74,
                    upc: "492124004260",
                    plu: null,
                    product_name: "Barilla Traditional Pasta Sauce (24 oz.)"
                }, {
                    id: 75,
                    upc: "492841109316",
                    plu: null,
                    product_name: "Horizon Organic Shreds Monterey Jack Finely Shredded Cheese (6 oz.)"
                }, {
                    id: 76,
                    upc: "492841109323",
                    plu: null,
                    product_name: "Horizon Organic Shreds Mexican Blend Finely Shredded Cheese (6 oz.)"
                }, {
                    id: 77,
                    upc: "492841102492",
                    plu: null,
                    product_name: "Sargento Reduced Fat 4 Cheese Mexican Shredded Cheese (8 oz.)"
                }, {
                    id: 78,
                    upc: "492841100665",
                    plu: null,
                    product_name: "Kraft Big Slice Pepper Jack Cheese Slices (10 ct.)"
                }, {
                    id: 79,
                    upc: "021000054541",
                    plu: null,
                    product_name: "Kraft Finely Shredded Mild Cheddar Cheese Made with 2% Reduced Fat Milk and Added Calcium (7 oz.)"
                }, {
                    id: 80,
                    upc: "021000054398",
                    plu: null,
                    product_name: "Kraft Finely Shredded Sharp Cheddar Cheese Made with 2% Reduced Fat Milk and Added Calcium (7 oz.)"
                }, {
                    id: 81,
                    upc: "715141113570",
                    plu: null,
                    product_name: "Eggland\"s Best Eggs Large (18 Ct.)"
                }, {
                    id: 82,
                    upc: "492840300219",
                    plu: null,
                    product_name: "Vital Farms Alfresco Large Eggs (12 Ct.)"
                }, {
                    id: 83,
                    upc: "852810488123",
                    plu: null,
                    product_name: "Land o\" Lakes Brown Eggs (12 Ct.)"
                }, {
                    id: 84,
                    upc: "300000614048",
                    plu: null,
                    product_name: "Quaker Cap\"n Crunch Crunch Berries Cereal (18.7 oz.)"
                }, {
                    id: 85,
                    upc: "492310004159",
                    plu: null,
                    product_name: "General Mills Cinnamon Toast Crunch Cereal (17 oz.)"
                }, {
                    id: 86,
                    upc: "492310012048",
                    plu: null,
                    product_name: "Post Fruity Pebbles (11 oz.)"
                }, {
                    id: 87,
                    upc: "492310004142",
                    plu: null,
                    product_name: "General Mills Lucky Charms Original Cereal (16 oz.)"
                }, {
                    id: 88,
                    upc: "492610106256",
                    plu: null,
                    product_name: "Papa Pita Organic Multigrain with Flax Seeds (24 oz.)"
                }, {
                    id: 89,
                    upc: "031493021609",
                    plu: null,
                    product_name: "Rudi\"s Organic 100% Whole Wheat Bread (22 oz.)"
                }, {
                    id: 90,
                    upc: "492610105501",
                    plu: null,
                    product_name: "Wonder Round Top White Sliced Bread (20 oz.)"
                }, {
                    id: 91,
                    upc: "073435093305",
                    plu: null,
                    product_name: "King\"s Hawaiian Sweet Sliced Bread (16 oz.)"
                }, {
                    id: 92,
                    upc: "051500700204",
                    plu: null,
                    product_name: "Adams 100% Natural Peanut Butter Creamy (26 oz.)"
                }, {
                    id: 93,
                    upc: "https://images-na.ssl-images-amazon.com/images/I/51c8unpWcWL.jpg",
                    plu: null,
                    product_name: "Adams 100% Natural Peanut Butter Crunchy (26 oz.)"
                }, {
                    id: 94,
                    upc: "037600110723",
                    plu: null,
                    product_name: "Skippy Chunky Peanut Butter (16.3 oz.)"
                }, {
                    id: 95,
                    upc: "048001270640",
                    plu: null,
                    product_name: "Skippy Creamy Peanut Butter Original (16.3 oz.)"
                }, {
                    id: 96,
                    upc: "037600106184",
                    plu: null,
                    product_name: "Skippy Chunky Peanut Butter (40 oz.)"
                }, {
                    id: 97,
                    upc: "037600106252",
                    plu: null,
                    product_name: "Skippy Creamy Peanut Butter Original (40 oz.)"
                }
            ])
        ]);
    }).then(() => {
        return knex.raw("SELECT setval('ingredients_id_seq', (SELECT MAX(id) FROM ingredients));");
    });
};
