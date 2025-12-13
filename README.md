# ADAM Data Services - Premium 3D Website

A high-end, animated, 3D-enhanced company website showcasing ADAM Data Services as an innovative startup specializing in data engineering, AI solutions, cloud services, and VR development.

## 🚀 Features

- **3D Visualizations**: Lightweight Three.js scenes with floating particles and tech orbit visualizations
- **Smooth Animations**: Framer Motion animations throughout for premium feel
- **Dark/Light Mode**: Full theme support with persistent preferences
- **Responsive Design**: Mobile-first approach with optimized 3D for all devices
- **Performance Optimized**: Lazy-loaded 3D scenes and reduced motion support
- **Modern Stack**: React, Vite, Tailwind CSS, Three.js

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers
- **Recharts** - Data visualization
- **React Icons** - Icon library

## 📦 Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
adam-data-services-website/
├── public/
│   └── logo.png          # Company logo
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ScrollToTop.jsx
│   ├── sections/          # Page sections
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Skills.jsx
│   │   ├── Storytelling.jsx
│   │   ├── Projects.jsx
│   │   ├── WhyChooseUs.jsx
│   │   ├── Partners.jsx
│   │   └── Contact.jsx
│   ├── three/             # 3D components
│   │   ├── HeroScene.jsx
│   │   └── TechOrbit.jsx
│   ├── data/              # Data files
│   │   └── companyData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Customization

### Updating Company Information

Edit `src/data/companyData.js` to update:
- Company name and tagline
- Mission, vision, and values
- Services and capabilities
- Technology stack
- Differentiators

### Adding Partner Logos

1. Add partner logo images to `public/partners/` directory
2. Update the `partners` array in `src/sections/Partners.jsx`:
   ```javascript
   const partners = [
     { name: 'Partner 1', logo: '/partners/partner1.png' },
     // ... more partners
   ]
   ```

### Modifying 3D Scenes

- **Hero Scene**: Edit `src/three/HeroScene.jsx` to customize particles and shapes
- **Tech Orbit**: Edit `src/three/TechOrbit.jsx` to modify the technology visualization

### Styling

- **Colors**: Update gradient colors in `tailwind.config.js`
- **Fonts**: Modify font families in `tailwind.config.js` and `index.html`
- **Animations**: Adjust animation timings in component files

## ♿ Accessibility

- Respects `prefers-reduced-motion` for users who prefer less animation
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Mobile-optimized 3D (disabled on small screens if needed)

## 📱 Mobile Optimization

- 3D scenes are lightweight and optimized for mobile
- Touch-friendly interactions
- Responsive grid layouts
- Mobile menu navigation

## 🚀 Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Other Platforms

The `dist` folder contains static files that can be deployed to any static hosting service.

## 📝 Notes

- **VR Development**: VR services are included in the Services section
- **Partners Section**: Ready for partner logos - add images to `public/partners/` and update the component
- **Company Profile**: Update `src/data/companyData.js` with specific details from your company profile document

## 🔧 Troubleshooting

### 3D scenes not loading
- Ensure all Three.js dependencies are installed
- Check browser console for errors
- Verify WebGL support in your browser

### Animations not working
- Check if `prefers-reduced-motion` is enabled in your system
- Verify Framer Motion is properly installed

### Build errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (recommended: 18+)

## 📄 License

Proprietary - ADAM Data Services

## 👥 Contact

For questions or support, contact: contact@adamdataservices.com

---

Built with ❤️ for ADAM Data Services

