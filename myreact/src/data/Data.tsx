import { Brand } from "../interfaces/BrandInterface";
import { Category } from "../interfaces/CategoryInterface";
import { Product } from "../interfaces/ProductInterface";
import { Review } from "../interfaces/ReviewInterface";

export const brands: Brand[] = [
  {
    brandId: "b1",
    brandName: "GlowEssence",
    brandDescription:
      "GlowEssence blends modern dermatology with the essence of nature to deliver luxurious skincare solutions. Each product is crafted with premium natural ingredients like aloe vera, green tea extract, and vitamin C, designed to rejuvenate, hydrate, and enhance your skin’s natural glow.",
    brandQuote: "Glow is the essence of beauty.",
    isDeleted: false,
    createdAt: "2025-05-01T10:00:00Z",
    brandImage: "src/assets/images/logo2-removebg-preview.png"
  },
  {
    brandId: "b2",
    brandName: "DermaPure",
    brandDescription:
      "DermaPure offers clinically tested skincare products developed by dermatologists to target acne, hyperpigmentation, and sensitive skin. With a science-backed approach, DermaPure ensures every formula provides maximum effectiveness with minimal irritation.",
    brandQuote: "Where science meets skin.",
    isDeleted: false,
    createdAt: "2025-05-01T10:30:00Z",
    brandImage: "src/assets/images/logo3-removebg-preview.png"
  },
  {
    brandId: "b3",
    brandName: "NatureBloom",
    brandDescription:
      "NatureBloom celebrates sustainability and skincare by harnessing the power of plant-based ingredients. Free from harsh chemicals and parabens, our products are gentle, cruelty-free, and ideal for those seeking a natural skincare journey.",
    brandQuote: "Beauty rooted in nature.",
    isDeleted: false,
    createdAt: "2025-05-01T11:00:00Z",
    brandImage: "src/assets/images/logo4-removebg-preview.png"
  },
  {
    brandId: "b4",
    brandName: "AquaRevive",
    brandDescription:
      "AquaRevive is the ultimate hydration specialist. Formulated with hyaluronic acid, marine minerals, and hydra-boosting peptides, our range restores moisture balance and plumps skin for a youthful, dewy finish.",
    brandQuote: "Hydration that speaks volumes.",
    isDeleted: false,
    createdAt: "2025-05-01T11:15:00Z",
    brandImage: "src/assets/images/logo2-removebg-preview.png"
  },
  {
    brandId: "b5",
    brandName: "SkinAlchemy",
    brandDescription:
      "At SkinAlchemy, we blend ancient herbal wisdom with cutting-edge skincare science to create transformative products. Whether you're dealing with dullness, blemishes, or aging, our alchemical blends restore harmony to your skin.",
    brandQuote: "Transform your skin, naturally.",
    isDeleted: false,
    createdAt: "2025-05-01T11:30:00Z",
    brandImage: "src/assets/images/logo3-removebg-preview.png"
  },
  {
    brandId: "b6",
    brandName: "UrbanDerma",
    brandDescription:
      "UrbanDerma is crafted for the modern lifestyle. With pollution-defense technology and antioxidant-rich formulas, our skincare fights daily environmental stressors to keep your skin fresh and vibrant in the urban jungle.",
    brandQuote: "City-proof your skin.",
    isDeleted: false,
    createdAt: "2025-05-01T11:45:00Z",
    brandImage: "src/assets/images/logo4-removebg-preview.png"
  }
];

  export const categories: Category[] = [
    {
      categoryId: "c1",
      categoryName: "Moisturizers",
      categoryColor: "#A3D2CA",
      createdAt: "2025-05-01T13:00:00Z"
    },
    {
      categoryId: "c2",
      categoryName: "Cleansers",
      categoryColor: "#F7D9C4",
      createdAt: "2025-05-01T13:10:00Z"
    },
    {
      categoryId: "c3",
      categoryName: "Sunscreens",
      categoryColor: "#FFE066",
      createdAt: "2025-05-01T13:20:00Z"
    }
  ];
  export const products: Product[] = [
    {
        productId: "p1",
        productName: "HydraGlow Moisturizer",
        productDescription: "Lightweight daily moisturizer for all skin types",
        brandId: "b1",
        brand: brands[0],
        categoryId: "c1",
        category: categories[0],
        isDeleted: false,
        productImages: [],
        productprice: "22",
        rating: 2
    },
    {
        productId: "p2",
        productName: "DeepClean Gel Cleanser",
        productDescription: "Gentle gel-based cleanser for oily skin",
        brandId: "b2",
        brand: brands[1],
        categoryId: "c2",
        category: categories[1],
        isDeleted: false,
        productImages: [],
        productprice: "22",
        rating: 3
    },
    {
        productId: "p3",
        productName: "SunShield SPF 50",
        productDescription: "Non-greasy broad-spectrum sunscreen",
        brandId: "b2",
        brand: brands[1],
        categoryId: "c3",
        category: categories[2],
        isDeleted: false,
        productImages: [],
        productprice: "22",
        rating: 4
    },

    {
      productId: "p1",
      productName: "HydraGlow Moisturizer",
      productDescription: "Lightweight daily moisturizer for all skin types",
      brandId: "b1",
      brand: brands[0],
      categoryId: "c1",
      category: categories[0],
      isDeleted: false,
      productImages: [],
      productprice: "22",
      rating: 2
  },
  {
      productId: "p2",
      productName: "DeepClean Gel Cleanser",
      productDescription: "Gentle gel-based cleanser for oily skin",
      brandId: "b2",
      brand: brands[1],
      categoryId: "c2",
      category: categories[1],
      isDeleted: false,
      productImages: [],
      productprice: "22",
      rating: 3
  },
  {
      productId: "p3",
      productName: "SunShield SPF 50",
      productDescription: "Non-greasy broad-spectrum sunscreen",
      brandId: "b2",
      brand: brands[1],
      categoryId: "c3",
      category: categories[2],
      isDeleted: false,
      productImages: [],
      productprice: "22",
      rating: 4
  }
  ];
  

  export const sampleReviews: Review[] = [
    {
      reviewer: "Alice Johnson",
      rating: 5,
      comment: "Amazing quality, totally worth the price!",
      date: "2025-05-01"
    },
    {
      reviewer: "Bob Smith",
      rating: 4,
      comment: "Very good product but delivery was slow.",
      date: "2025-04-28"
    },
    {
      reviewer: "Clara Lee",
      rating: 3,
      comment: "It's okay. Not bad, not great.",
      date: "2025-03-30"
    },
    {
      reviewer: "David Kim",
      rating: 2,
      comment: "Didn't meet my expectations. Quality could be better.",
      date: "2025-02-20"
    },
    {
      reviewer: "Ella Brown",
      rating: 5,
      comment: "Perfect! Will definitely buy again.",
      date: "2025-01-15"
    }
  ];