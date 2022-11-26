import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'example',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
        {
            name: 'Jaider',
            email: 'jaider@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
    ],
    products: [
        {
            // _id: '1',
            name: 'God Of War Ragnarok',
            classification: 'PEGI: 18',
            inStock: '5',
            consoleAvailable: 'PlayStation',
            image: '/images/GOWRagnarok.jpg',
            price: '300000',
            rating: '4.8',
            mode: 'Single Player',
            slug: 'god-of-war-ragnarok'
        },
        {
            // _id: '2',
            name: 'Halo infinite',
            classification: 'PEGI: 18',
            inStock: '30',
            consoleAvailable: 'Xbox',
            image: '/images/Halo_infinite_vertical.jpg',
            price: '240000',
            rating: '4',
            mode: 'Single Player - multi player',
            slug: 'halo-infinite'
        },
        {
            // _id: '3',
            name: 'God Of War Ragnarok',
            classification: 'PEGI: 18',
            inStock: '30',
            consoleAvailable: 'PlayStation',
            image: '/images/GOWRagnarok.jpg',
            price: '300000',
            rating: '3.8',
            mode: 'Single Player',
            slug: 'god-of-war-ragnarok3'
        },
        {
            // _id: '4',
            name: 'God Of War Ragnarok',
            classification: 'PEGI: 18',
            inStock: '30',
            consoleAvailable: 'PlayStation',
            image: '/images/GOWRagnarok.jpg',
            price: '300000',
            rating: '3.0',
            mode: 'Single Player',
            slug: 'god-of-war-ragnarok4'
        }
    ]
}
export default data;