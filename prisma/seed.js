// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const initialProducts = [
    { name: "Pure Glow Radiance Serum", price: 89, description: "A powerful serum that brightens and evens out skin tone.", image: "/RadiantSerum.jpg", category: "star", rating: 4.9, reviews: 120 },
    { name: "HydroBlast Moisture Lock", price: 65, description: "Intense hydration for dry and tired skin.", image: "/moisturazer.jpg", category: "star", rating: 4.8, reviews: 95 },
    { name: "Vitamin C Glow Cream", price: 75, description: "Boosts collagen and protects against UV damage.", image: "/vitC_cream.jpg", category: "star", rating: 4.7, reviews: 80 },
    { name: "Gentle Facial Wash", price: 70, description: "Deeply cleanses while maintaining skin moisture balance.", image: "/fw.jpg", category: "star", rating: 4.9, reviews: 100 },
    { name: "Clear Rose Body Soap", price: 47, description: "Gentle cleansing with a refreshing rose scent.", image: "/bodysoap.jpg", category: "star", rating: 4.8, reviews: 180 },
    { name: "Hydrating Moisturizer", price: 58, description: "Intense moisture for a soft and supple feel.", image: "/mois2.jpg", category: "star", rating: 4.9, reviews: 232 },
    { name: "Anti Aging Retinol Serum", price: 50, description: "Reduces fine lines and improves skin texture.", image: "/serumRetinol.jpg", category: "star", rating: 4.7, reviews: 98 },
    { name: "Soothing Gentle Cleanser", price: 45, description: "Removes impurities without stripping natural oils.", image: "/fw2.jpg", category: "bestseller", rating: 4.9, reviews: 150 },
    { name: "Night Repair Oil", price: 95, description: "Restores skin barrier while you sleep.", image: "/RepairOil.jpg", category: "bestseller", rating: 5.0, reviews: 200 },
    { name: "Exfoliating Toner", price: 35, description: "Gently exfoliates dead skin cells for a smooth texture.", image: "/expoToner.jpg", category: "bestseller", rating: 4.6, reviews: 70 },
];

async function main() {
    console.log('🌱 Starting seed...');

    // Seed products
    for (const product of initialProducts) {
        await prisma.product.upsert({
            where: { id: initialProducts.indexOf(product) + 1 },
            update: {},
            create: product,
        });
    }
    console.log(`✅ Seeded ${initialProducts.length} products`);

    // Seed admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.admin.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: hashedPassword,
        },
    });
    console.log('✅ Seeded admin user (username: admin, password: admin123)');
    console.log('🎉 Seed completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
