# CarFinder Web Application

A modern web application for browsing and finding cars, built with React and Tailwind CSS.

## Features

- 🚗 Browse extensive car inventory
- 🌓 Dark/Light mode toggle
- 💟 Wishlist functionality
- 🔍 Advanced search and filtering
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🛣️ React Router integration
- 💾 Local storage for persistent preferences

## Tech Stack

- React.js (v19)
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React Icons
- ESLint

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd carfinderweb
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
carfinderweb/
├── public/
│   ├── caricon.gif
│   └── civicse.jpg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Browsecar.jsx
│   │   ├── Footer.jsx
│   │   ├── Herosection.jsx
│   │   └── Navbar.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Features in Detail

### Car Browsing
- Grid view of available cars
- Detailed car information
- Image galleries
- Price and specification details

### Search & Filters
- Search by car name/brand
- Filter by:
  - Brand
  - Fuel type
  - Seating capacity
  - Price range

### User Interface
- Responsive design for all devices
- Dark/Light mode toggle
- Modern and clean UI
- Loading states
- Error handling

### User Experience
- Wishlist functionality
- Persistent dark mode preference
- Pagination for car listings
- Mobile-friendly navigation

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Configuration

The application uses Vite for development and building. Configure environment variables in `.env` files:

```env
VITE_API_URL=your_api_url
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
