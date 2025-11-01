# PennyWise - Personal Expense Tracker

PennyWise is a modern expense tracking application built with React and Node.js that helps you monitor and analyze your spending habits. Track expenses, visualize spending patterns, and make informed financial decisions.

![PennyWise Dashboard](https://github.com/Kamlesh-DevOP/PennyWise/raw/master/docs/screenshots/dashboard.png)
![Add expense](https://github.com/Kamlesh-DevOP/PennyWise/raw/master/docs/screenshots/add-expense.png)
![Expenses page](https://github.com/Kamlesh-DevOP/PennyWise/raw/master/docs/screenshots/expenses.png)

## Features

- 💰 **Expense Tracking**: Log and categorize your daily expenses
- 📊 **Interactive Dashboard**: Visual representations of your spending patterns
- 📈 **Trend Analysis**: Track spending trends with interactive charts
- 🏷️ **Category Management**: Organize expenses by custom categories
- ₹ **INR Support**: Full support for Indian Rupee with proper formatting
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- React Query for server state management
- React Router for navigation
- Recharts for data visualization
- CSS Modules for styling

### Backend
- Node.js with Express
- TypeScript for type safety
- PostgreSQL database
- node-postgres for database connectivity

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kamlesh-DevOP/PennyWise.git
   cd PennyWise
   ```

2. **Set up the backend**
   ```bash
   cd backend
   cp .env.example .env  # Configure with your database details
   npm install
   npm run migrate:local
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:4000`.

## Environment Configuration

### Backend (.env)
```
DATABASE_URL=postgres://username:password@localhost:5432/pennywise
PORT=4000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:4000
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run typecheck` - Run TypeScript checks
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Backend
- `npm run dev` - Start development server
- `npm run build` - Build TypeScript files
- `npm run start` - Start production server
- `npm run migrate:local` - Run database migrations

## Project Structure

```
pennywise/
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/       # Route components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── services/    # API client
│   │   ├── utils/       # Helper functions
│   │   └── types/       # TypeScript types
│   └── ...
├── backend/
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── config/      # Configuration
│   │   └── db.ts        # Database connection
│   └── sql/            # SQL migrations
└── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Query](https://tanstack.com/query/latest) for excellent server state management
- [Recharts](https://recharts.org/) for beautiful charts
- [Vite](https://vitejs.dev/) for the fantastic dev experience